import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";
import Alert from "./Alert";
import SuccessAlert from "./SuccessAlert";

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api-auth/login/",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { access, refresh } = response.data;
      const profileResponse = await axios.get(
        "http://localhost:8000/api-auth/profile/",
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );

      localStorage.setItem("userGroup", profileResponse.data.role);
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
      localStorage.setItem("userId", profileResponse.data.id);

      setSuccessMessage("Login successful!");
      console.log("Success message set:", "Login successful!");

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      if (error.response && error.response.data.detail) {
        setError(error.response.data.detail);
      } else {
        setError("An error occurred during login.");
      }
    }
  };


  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      {error && <Alert message={error} onClose={() => setError(null)} />}
      {successMessage && <SuccessAlert message={successMessage} onClose={() => setSuccessMessage(null)} />}

      <div className="relative flex w-full max-w-4xl h-[500px] bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        <div className="flex flex-col justify-center flex-1 p-10 text-white">
          <h1 className="mb-6 text-3xl font-bold">Login</h1>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <label htmlFor="email" className="mb-2">Email</label>
            <input
              type="email"
              id="email"
              ref={emailRef}
              className="p-2 mb-4 text-white bg-gray-700 border border-gray-600 rounded"
              required
            />
            <label htmlFor="password" className="mb-2">Password</label>
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
