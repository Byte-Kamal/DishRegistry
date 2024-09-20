import React, { useState } from "react";

const CreateEditMealPlan = ({
  setActiveSection,
  mealPlanToEdit,
  setMealPlanToEdit,
}) => {
  const [mealPlan, setMealPlan] = useState(
    mealPlanToEdit || { day: "", meals: ["", "", ""] }
  );

  const handleMealPlanChange = (mealIndex, value) => {
    const updatedMealPlan = { ...mealPlan };
    updatedMealPlan.meals[mealIndex] = value;
    setMealPlan(updatedMealPlan);
  };

  const saveMealPlan = () => {
    if (mealPlanToEdit) {
      // Update existing meal plan
      setMealPlanToEdit((prevMealPlans) => {
        const updatedMealPlans = [...prevMealPlans];
        updatedMealPlans[mealPlanToEdit.index] = mealPlan;
        return updatedMealPlans;
      });
    } else {
      // Create new meal plan
      setMealPlanToEdit((prevMealPlans) => [...prevMealPlans, mealPlan]);
    }
    setMealPlanToEdit(null);
    setActiveSection("MyMealsPlan");
  };

  return (
    <div>
      <h3 className="text-xl mb-4">
        {mealPlanToEdit ? "Edit Meal Plan" : "Create New Meal Plan"}
      </h3>
      <input
        type="text"
        placeholder="Day"
        value={mealPlan.day}
        onChange={(e) => setMealPlan({ ...mealPlan, day: e.target.value })}
        className="bg-gray-700 text-white p-2 rounded mb-2 w-full"
      />
      <ul className="list-disc list-inside">
        {mealPlan.meals.map((meal, mealIndex) => (
          <li key={mealIndex} className="text-gray-400">
            <input
              type="text"
              placeholder={`Meal ${mealIndex + 1}`}
              value={meal}
              onChange={(e) => handleMealPlanChange(mealIndex, e.target.value)}
              className="bg-gray-700 text-white p-2 rounded mb-2 w-full"
            />
          </li>
        ))}
      </ul>
      <button
        onClick={saveMealPlan}
        className="bg-blue-500 text-white px-4 py-2 mt-2"
      >
        {mealPlanToEdit ? "Update Meal Plan" : "Create Meal Plan"}
      </button>
      <button
        onClick={() => setActiveSection("MyMealsPlan")}
        className="bg-gray-500 text-white px-4 py-2 mt-2 ml-2"
      >
        Cancel
      </button>
    </div>
  );
};

export default CreateEditMealPlan;