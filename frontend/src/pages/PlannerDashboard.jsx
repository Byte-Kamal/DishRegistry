import React, { useState } from "react";
import CreateEditMealPlan from "../components/PlannerDashboard/CreateEditMealPlan";
import MyMealsPlan from "../components/PlannerDashboard/MyMealsPlan";
import RecommendRecipe from "../components/PlannerDashboard/RecommendRecipe";
import SavedRecipe from "../components/PlannerDashboard/SavedRecipe";
import ShoppingList from "../components/PlannerDashboard/ShoppingList";


const PlannerDashboard = () => {
  const [activeSection, setActiveSection] = useState("MyMealsPlan");
  const [mealPlanToEdit, setMealPlanToEdit] = useState(null);

  const renderSection = () => {
    switch (activeSection) {
      case "MyMealsPlan":
        return (
          <MyMealsPlan
            setActiveSection={setActiveSection}
            setMealPlanToEdit={setMealPlanToEdit}
          />
        );
      case "RecommendRecipe":
        return <RecommendRecipe />;
      case "ShoppingList":
        return <ShoppingList />;
      case "SavedRecipe":
        return <SavedRecipe />;
      case "CreateEditMealPlan":
        return (
          <CreateEditMealPlan
            setActiveSection={setActiveSection}
            mealPlanToEdit={mealPlanToEdit}
            setMealPlanToEdit={setMealPlanToEdit}
          />
        );
      default:
        return (
          <MyMealsPlan
            setActiveSection={setActiveSection}
            setMealPlanToEdit={setMealPlanToEdit}
          />
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <div className="flex flex-1">
        <div className="w-1/4 bg-gray-800 p-4">
          <h2 className="text-2xl mb-4">Planner Dashboard</h2>
          <ul>
            <li
              className="mb-2 cursor-pointer"
              onClick={() => setActiveSection("MyMealsPlan")}
            >
              My Meals Plan
            </li>
            <li
              className="mb-2 cursor-pointer"
              onClick={() => setActiveSection("RecommendRecipe")}
            >
              Recommend Recipe
            </li>
            <li
              className="mb-2 cursor-pointer"
              onClick={() => setActiveSection("ShoppingList")}
            >
              Shopping List
            </li>
            <li
              className="mb-2 cursor-pointer"
              onClick={() => setActiveSection("SavedRecipe")}
            >
              Saved Recipe
            </li>
          </ul>
        </div>
        <div className="w-3/4 p-4">{renderSection()}</div>
      </div>
    </div>
  );
};


export default PlannerDashboard;
