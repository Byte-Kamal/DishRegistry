import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";
import Alert from "./Alert";
import SuccessAlert from "./SuccessAlert";


const Register = () => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const roleRef = useRef(null);
  const navigate = useNavigate();

  const [alertMessage, setAlertMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      role: roleRef.current.value,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api-auth/register/",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (response.data.user && response.data.token) {
        setSuccessMessage("Register successful! Please login.");
        setTimeout(() => {
          navigate("/login");
        }, 1000); // Redirect after 2 seconds
      } else {
        console.error("Unexpected response:", response.data);
      }
    } catch (error) {
      if (error.response) {
        console.error("Registration error:", error.response.data);
        setAlertMessage(error.response.data.detail || "Registration failed.");
      } else if (error.request) {
        console.error("No response received:", error.request);
        setAlertMessage("No response received. Please try again.");
      } else {
        console.error("Error", error.message);
        setAlertMessage("An error occurred during registration.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      {alertMessage && (
        <Alert message={alertMessage} onClose={() => setAlertMessage(null)} />
      )}
          {successMessage && <SuccessAlert message={successMessage} onClose={() => setSuccessMessage(null)} />}

      <div className="relative flex w-full max-w-4xl h-[500px] bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        <div className="flex flex-col justify-center flex-1 p-10 text-white">
          <h1 className="mb-6 text-3xl font-bold">Register</h1>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <label htmlFor="name" className="mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              ref={nameRef}
              className="p-2 mb-4 text-white bg-gray-700 border border-gray-600 rounded"
              required
            />
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
            <label htmlFor="group" className="mb-2">
              Role
            </label>
            <select
              ref={roleRef}
              required
              className="p-2 mb-4 text-white bg-gray-700 border border-gray-600 rounded"
            >
              <option value="Admin">Admin</option>
              <option value="Cooks">Cook</option>
              <option value="Planners">Planner</option>
              <option value="Users">Users</option>
            </select>
            <button
              type="submit"
              className="p-2 mb-6 text-white bg-blue-500 rounded"
            >
              Register
            </button>
          </form>
        </div>
        <div className="flex-1 bg-gray-700">
          <img
            src="https://images.pexels.com/photos/35661/pasta-cheese-egg-food.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Register"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
