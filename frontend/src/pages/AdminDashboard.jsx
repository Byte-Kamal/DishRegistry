import React, { useContext, useState } from "react";
import Dashboard from "../components/AdminDashboard/Dashboard";
import RecipeManagement from "../components/AdminDashboard/RecipeManagement";
import RecipeReviews from "../components/AdminDashboard/RecipeReviews";
import UserManagement from "../components/AdminDashboard/UserManagement";
import { RecipeContext } from "../contexts/RecipeContext";
import { ReviewContext } from "../contexts/ReviewContext";
import { UserContext } from "../contexts/UserContext";

const AdminDashboard = () => {
  const { recipes, loadingRecipe } = useContext(RecipeContext);
  const { reviews, loadingReview } = useContext(ReviewContext);
  const { users, loadingUser } = useContext(UserContext);
  const accessToken = localStorage.getItem("accessToken");

  const [activeSection, setActiveSection] = useState("Dashboard");

  if (loadingRecipe) return <p>Loading recipes...</p>;
  if (loadingReview) return <p>Loading reviews...</p>;
  if (loadingUser) return <p>Loading users...</p>;

  const renderSection = () => {
    switch (activeSection) {
      case "UserManagement":
        return <UserManagement users={users} accessToken={accessToken} />;
      case "RecipeManagement":
        return <RecipeManagement recipes={recipes} accessToken={accessToken} />;
      case "RecipeReviews":
        return <RecipeReviews reviews={reviews} />;
      case "Dashboard":
        return <Dashboard setActiveSection={setActiveSection} />;
      default:
        return <Dashboard setActiveSection={setActiveSection} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <div className="flex flex-1">
        <div className="w-1/4 bg-gray-800 p-4">
          <h2 className="text-2xl mb-4">Admin Dashboard</h2>
          <ul>
            <li
              className="mb-2 cursor-pointer"
              onClick={() => setActiveSection("Dashboard")}
            >
              Dashboard
            </li>
            <li
              className="mb-2 cursor-pointer"
              onClick={() => setActiveSection("UserManagement")}
            >
              User Management
            </li>
            <li
              className="mb-2 cursor-pointer"
              onClick={() => setActiveSection("RecipeManagement")}
            >
              Recipe Management
            </li>
            <li
              className="mb-2 cursor-pointer"
              onClick={() => setActiveSection("RecipeReviews")}
            >
              Recipe Reviews
            </li>
          </ul>
        </div>
        <div className="w-3/4 p-4">{renderSection()}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
