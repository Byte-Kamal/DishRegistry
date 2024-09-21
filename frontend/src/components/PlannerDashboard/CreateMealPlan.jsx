import React from 'react';

const CreateMealPlan = ({
    daysOfWeek,
    newMealPlan,
    setNewMealPlan,
    recipes,
    selectedRecipes,
    setSelectedRecipes,
    createOrUpdateMealPlan,
    error
}) => {
    return (
        <div className="mb-6 p-6 bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <h2 className="text-xl mb-4 text-blue-400 font-semibold">Plan Your Meals</h2>

            {/* Day Input with Dropdown */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-400 mb-1">Select Day</label>
                <select
                    value={newMealPlan.day}
                    onChange={(e) => setNewMealPlan({ ...newMealPlan, day: e.target.value })}
                    className="w-full p-3 border border-gray-700 rounded bg-gray-900 focus:outline-none focus:border-blue-500 transition-colors"
                >
                    <option value="">Choose a Day</option>
                    {daysOfWeek.map((day) => (
                        <option key={day} value={day}>
                            {day}
                        </option>
                    ))}
                </select>
            </div>

            {/* Recipe Selection */}
            <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-400 mb-2">Select Recipes</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {recipes.map((recipe) => (
                        <div
                            key={recipe.id}
                            onClick={() => {
                                const id = recipe.id;
                                setSelectedRecipes((prev) =>
                                    prev.includes(id) ? prev.filter((rId) => rId !== id) : [...prev, id]
                                );
                            }}
                            className={`p-4 rounded-lg cursor-pointer transition-transform transform hover:scale-105 border-2 ${selectedRecipes.includes(recipe.id)
                                ? 'border-blue-500 bg-gray-700'
                                : 'border-gray-700 bg-gray-800'
                                }`}
                        >
                            <h4 className="text-lg font-semibold">{recipe.title}</h4>
                        </div>
                    ))}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between space-x-4 mt-4">
                <button
                    onClick={createOrUpdateMealPlan}
                    className="w-full p-3 bg-blue-600 hover:bg-blue-500 rounded-lg text-lg transition-transform transform hover:scale-105"
                >
                    {newMealPlan.id ? 'Update Meal Plan' : 'Create Meal Plan'}
                </button>
            </div>

            {error && <div className="text-red-500 mt-2">{JSON.stringify(error)}</div>}
        </div>
    );
};

export default CreateMealPlan;