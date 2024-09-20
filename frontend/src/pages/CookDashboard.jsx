import React, { useState } from "react";
import MyRecipes from "../components/CookDashboard/MyRecipes";
import RecipeLikesComments from "../components/CookDashboard/RecipeLikesComments";
import SubmitNewRecipe from "../components/CookDashboard/SubmitNewRecipe";


const CookDashboard = () => {
  const [activeSection, setActiveSection] = useState("MyRecipes");

  const renderSection = () => {
    switch (activeSection) {
      case "MyRecipes":
        return <MyRecipes />;
      case "RecipeLikesComments":
        return <RecipeLikesComments />;
      case "SubmitNewRecipe":
        return <SubmitNewRecipe />;
      default:
        return <MyRecipes />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <div className="flex flex-1">
        <div className="w-1/4 bg-gray-800 p-4">
          <h2 className="text-2xl mb-4">Cook Dashboard</h2>
          <ul>
            <li
              className="mb-2 cursor-pointer"
              onClick={() => setActiveSection("MyRecipes")}
            >
              My Recipes
            </li>
            <li
              className="mb-2 cursor-pointer"
              onClick={() => setActiveSection("RecipeLikesComments")}
            >
              Recipe Likes & Comments
            </li>
            <li
              className="mb-2 cursor-pointer"
              onClick={() => setActiveSection("SubmitNewRecipe")}
            >
              Submit New Recipe
            </li>
          </ul>
        </div>
        <div className="w-3/4 p-4">{renderSection()}</div>
      </div>
    </div>
  );
};


export default CookDashboard;
