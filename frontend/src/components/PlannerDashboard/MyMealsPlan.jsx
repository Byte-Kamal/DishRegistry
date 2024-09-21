import React, { useEffect, useState } from "react";

const MyMealsPlan = ({ setActiveSection, setMealPlanToEdit }) => {
  const [mealPlans, setMealPlans] = useState([]);

  useEffect(() => {
    // Fetch meal plans from the server
    const fetchMealPlans = async () => {
      try {
        const token = localStorage.getItem('accessToken'); // Retrieve the token from local storage
        const response = await fetch("http://localhost:8000/api/mealplans/", {
          headers: {
            'Authorization': `Bearer ${token}` // Include the token in the request headers
          }
        });
        const data = await response.json();
        console.log(data);
        setMealPlans(data);
      } catch (error) {
        console.error("Error fetching meal plans:", error);
      }
    };

    fetchMealPlans();
  }, []);

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
        {mealPlans.map((plan, index) => (
          <div key={index} className="bg-gray-800 p-4 rounded-lg shadow">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-lg font-bold mb-2">{plan.day}</h4>
                <ul className="list-disc pl-4">
                  {plan.recipes.length > 0 ? (
                    plan.recipes.map((recipe) => (
                      <li key={recipe.id}>
                        {recipe.title} (ID: {recipe.id})
                      </li>
                    ))
                  ) : (
                    <li>No recipes</li>
                  )}
                </ul>
              </div>
              <button
                onClick={() => {
                  setMealPlanToEdit(plan);
                  setActiveSection("CreateEditMealPlan");
                }}
                className="bg-blue-500 text-white px-4 py-2"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyMealsPlan;