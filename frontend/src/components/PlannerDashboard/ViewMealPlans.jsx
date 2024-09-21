import React from 'react';

const ViewMealPlans = ({ mealPlans, editMealPlan, deleteMealPlan, generateShoppingList, shoppingList }) => {
    return (
        <div>
            <h2 className="text-2xl mb-4 font-bold">Existing Meal Plans</h2>
            {mealPlans.map((plan) => (
                <div key={plan.id} className="mb-4 p-4 bg-gray-800 rounded-lg shadow-lg">
                    <h3 className="text-xl font-bold">{plan.day}</h3>
                    <div className="mt-2">
                        <h4 className="text-lg font-semibold">Recipes:</h4>
                        {plan.recipes.length > 0 ? (
                            plan.recipes.map((recipe) => (
                                <span key={recipe.id} className="mr-2 inline-block p-1 bg-gray-700 rounded-lg">
                                    {recipe.title}
                                </span>
                            ))
                        ) : (
                            <span>No recipes selected</span>
                        )}
                    </div>

                    <div className="flex space-x-4 mt-4">
                        <button
                            onClick={() => editMealPlan(plan)}
                            className="w-1/3 p-2 bg-green-600 hover:bg-green-500 rounded-lg"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => deleteMealPlan(plan.id)}
                            className="w-1/3 p-2 bg-red-600 hover:bg-red-500 rounded-lg"
                        >
                            Delete
                        </button>
                        <button
                            onClick={() => generateShoppingList(plan.day)}
                            className="w-1/3 p-2 bg-yellow-600 hover:bg-yellow-500 rounded-lg"
                        >
                            Generate Shopping List
                        </button>
                    </div>
                </div>
            ))}

            {/* Shopping List Display */}
            {shoppingList && (
                <div className="mt-6 p-6 bg-gray-800 rounded-lg shadow-lg">
                    <h4 className="text-lg font-semibold text-yellow-400">Shopping List:</h4>
                    <ul className="list-disc list-inside">
                        {shoppingList.map((item, index) => (
                            <li key={index} className="text-gray-300">
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ViewMealPlans;