import React from "react";

const MyMealsPlan = ({ setActiveSection, setMealPlanToEdit }) => {

  return (
    <div>
      <h3 className="text-xl mb-4">My Meals Plan</h3>
      <button
        onClick={() => setActiveSection("CreateEditMealPlan")}
        className="bg-green-500 text-white px-4 py-2 mb-4"
      >
        Create New Meal Plan
      </button>
      <div className="space-y-4">
        {/* {mealPlans.map((plan, index) => (
          <div key={index} className="bg-gray-800 p-4 rounded-lg shadow">
            <div className="flex justify-between items-center">
              <h4 className="text-lg mb-2">{plan.day}</h4>
              <div>
                <button
                  onClick={() => startEditing(index)}
                  className="bg-yellow-500 text-white px-4 py-2 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteMealPlan(index)}
                  className="bg-red-500 text-white px-4 py-2"
                >
                  Delete
                </button>
              </div>
            </div>
            <ul className="list-disc list-inside">
              {plan.meals.map((meal, mealIndex) => (
                <li key={mealIndex} className="text-gray-400">
                  {meal}
                </li>
              ))}
            </ul>
          </div>
        ))} */}
      </div>
    </div>
  );
};
export default MyMealsPlan;