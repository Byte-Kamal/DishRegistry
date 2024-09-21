import React, { useState } from "react";
import RateAndReview from "./UserDashboard/RateAndReview";
import SavedMealPlan from "./UserDashboard/SavedMealPlan";
import SavedRecipes from "./UserDashboard/SavedRecipes";


const UserDashboard = () => {
  const [activeSection, setActiveSection] = useState("SavedRecipes");

  const renderSection = () => {
    switch (activeSection) {
      case "SavedRecipes":
        return <SavedRecipes />;
      case "SavedMealPlan":
        return <SavedMealPlan />;
      case "RateAndReview":
        return <RateAndReview />;
      default:
        return <SavedRecipes />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <div className="flex flex-1">
        <div className="w-1/4 bg-gray-800 p-4">
          <h2 className="text-2xl mb-4">User Dashboard</h2>
          <ul>
            <li
              className="mb-2 cursor-pointer"
              onClick={() => setActiveSection("SavedRecipes")}
            >
              Saved Recipes
            </li>
            <li
              className="mb-2 cursor-pointer"
              onClick={() => setActiveSection("SavedMealPlan")}
            >
              Saved Meal Plan
            </li>
            <li
              className="mb-2 cursor-pointer"
              onClick={() => setActiveSection("RateAndReview")}
            >
              Rate and Review
            </li>
          </ul>
        </div>
        <div className="w-3/4 p-4">{renderSection()}</div>
      </div>
    </div>
  );
};

export default UserDashboard;
