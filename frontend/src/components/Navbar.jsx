import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/img/Logo.jpg";

const Navbar = () => {

  const userGroup = localStorage.getItem("userGroup");
  const isAuthenticated = userGroup ? true : false;
  const navigate = useNavigate();


  const logout = () => {
    localStorage.removeItem("userGroup");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/")
  }


  return (
    <nav className="bg-gray-900 p-4 flex justify-between items-center shadow-lg">
      {/* Logo and Text */}
      <div className="flex items-center space-x-4">
        <img
          src={logo}
          alt="Logo"
          className="w-12 h-12 object-cover rounded-full shadow-xl transform transition-transform hover:scale-110"
        />
        <Link
          to="/"
          className="text-3xl font-bold text-white relative group transition-all duration-300"
        >
          <span className="text-red-500">Dish</span>
          <span className="text-white">Network</span>
          <span className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-orange-500 to-yellow-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
        </Link>
      </div>
      {/* Hamburger Menu */}
      <div className="hidden md:flex space-x-8">
        <Link
          to="/"
          className="text-white text-lg font-medium px-3 py-2 rounded-md transition-transform transform hover:scale-105 hover:bg-gray-700"
        >
          Home
        </Link>
        <Link
          to="/recipes"
          className="text-white text-lg font-medium px-3 py-2 rounded-md transition-transform transform hover:scale-105 hover:bg-gray-700"
        >
          Recipes
        </Link>
        <Link
          to="/search"
          className="text-white text-lg font-medium px-3 py-2 rounded-md transition-transform transform hover:scale-105 hover:bg-gray-700"
        >
          Search
        </Link>

        {isAuthenticated ? (
          <>
            {userGroup === "Admin" && (
              <Link
                to="/admin-dashboard"
                className="text-white text-lg font-medium px-3 py-2 rounded-md transition-transform transform hover:scale-105 hover:bg-gray-700"
              >
                Dashboard
              </Link>
            )}
            {/* {userGroup === "Users" && (
              <Link
                to="/user-dashboard"
                className="text-white text-lg font-medium px-3 py-2 rounded-md transition-transform transform hover:scale-105 hover:bg-gray-700"
              >
                Dashboard
              </Link>
            )} */}
            {userGroup === "Cooks" && (
              <Link
                to="/cook-dashboard"
                className="text-white text-lg font-medium px-3 py-2 rounded-md transition-transform transform hover:scale-105 hover:bg-gray-700"
              >
                Dashboard
              </Link>
            )}
            {userGroup === "Planners" && (
              <Link
                to="/planner-dashboard"
                className="text-white text-lg font-medium px-3 py-2 rounded-md transition-transform transform hover:scale-105 hover:bg-gray-700"
              >
                Dashboard
              </Link>
            )}
            <Link
              to="/profile"
              className="text-white text-lg font-medium px-3 py-2 rounded-md transition-transform transform hover:scale-105 hover:bg-gray-700"
            >
              Profile
            </Link>

            <button
              onClick={logout}
              className="text-white text-lg font-medium px-3 py-2 rounded-md transition-transform transform hover:scale-105 hover:bg-gray-700"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-white text-lg font-medium px-3 py-2 rounded-md transition-transform transform hover:scale-105 hover:bg-gray-700"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-white text-lg font-medium px-3 py-2 rounded-md transition-transform transform hover:scale-105 hover:bg-gray-700"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
