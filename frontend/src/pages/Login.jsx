import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      // Send login request
      const response = await axios.post(
        "http://localhost:8000/api/auth/login/",
        JSON.stringify(formData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      console.log("Login response:", response.data);
    
      // Extract access and refresh tokens from the response
      const { access, refresh } = response.data;
      console.log("Access token:", access);
      console.log("Refresh token:", refresh);
    
      // Fetch profile data
      const profileResponse = await axios.get(
        "http://localhost:8000/api/profile/",
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        },
      );
      console.log("Profile response:", profileResponse.data);

      localStorage.setItem("userGroup", profileResponse.data.role);
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);

      navigate("/");
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response.data);
      } else {
        console.error("Error:", error.message);
      }
    }
  }
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="relative flex w-full max-w-4xl h-[500px] bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        <button className="absolute top-4 left-4 text-2xl text-white">
          <i className="fas fa-times"></i>
        </button>
        <div className="flex flex-col justify-center flex-1 p-10 text-white">
          <h1 className="mb-6 text-3xl font-bold">Login</h1>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <label htmlFor="email" className="mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              ref={emailRef}
              className="p-2 mb-4 text-white bg-gray-700 border border-gray-600 rounded"
              required
            />
            <label htmlFor="password" className="mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              ref={passwordRef}
              className="p-2 mb-4 text-white bg-gray-700 border border-gray-600 rounded"
              required
            />
            <button
              type="submit"
              className="p-2 mb-6 text-white bg-blue-500 rounded"
            >
              Login
            </button>
          </form>
          <p className="mb-4 text-center">or login with</p>
          <div className="flex space-x-2">
            <button className="flex items-center justify-center w-1/2 p-2 text-white bg-blue-600 rounded">
              <i className="mr-2 fab fa-facebook-f"></i> Facebook
            </button>
            <button className="flex items-center justify-center w-1/2 p-2 text-white bg-red-500 rounded">
              <i className="mr-2 fab fa-google"></i> Google
            </button>
          </div>
        </div>
        <div className="flex-1 bg-gray-700">
          <img
            src="https://images.pexels.com/photos/35661/pasta-cheese-egg-food.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Login"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
