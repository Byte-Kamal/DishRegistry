const SavedMealPlan = () => {

  return (
    <div>
      <h3 className="text-xl mb-4">Saved Meal Plan</h3>
      <div className="space-y-4">
        {/* {mealPlans.map((plan, index) => (
          <div key={index} className="bg-gray-800 p-4 rounded-lg shadow">
            <h4 className="text-lg mb-2">{plan.day}</h4>
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

export default SavedMealPlan;