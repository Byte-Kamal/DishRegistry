import axios from 'axios';
import React, { useEffect, useState } from 'react';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const MealPlannerDashboard = () => {
    const [mealPlans, setMealPlans] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipes, setSelectedRecipes] = useState([]);
    const [newMealPlan, setNewMealPlan] = useState({ day: '', id: null });
    const [shoppingList, setShoppingList] = useState('');
    const [error, setError] = useState('');

    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    };

    const fetchMealPlans = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/mealplans/', config);
            setMealPlans(response.data);
        } catch (error) {
            console.error('Error fetching meal plans:', error);
            setError('Error fetching meal plans');
        }
    };

    const fetchRecipes = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/recipes/', config);
            setRecipes(response.data);
        } catch (error) {
            console.error('Error fetching recipes:', error);
            setError('Error fetching recipes');
        }
    };

    const createOrUpdateMealPlan = async () => {
        const mealPlanData = {
            day: newMealPlan.day,
            recipe_ids: selectedRecipes,
        };

        try {
            if (newMealPlan.id) {
                await axios.put(`http://localhost:8000/api/mealplans/${newMealPlan.id}/`, mealPlanData, config);
            } else {
                await axios.post('http://localhost:8000/api/mealplans/', mealPlanData, config);
            }
            fetchMealPlans();
            setNewMealPlan({ day: '', id: null });
            setSelectedRecipes([]);
            setError('');
        } catch (error) {
            console.error('Error creating/updating meal plan:', error.response?.data);
            setError(error.response?.data || 'Error creating/updating meal plan');
        }
    };

    const deleteMealPlan = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/mealplans/${id}/`, config);
            fetchMealPlans();
        } catch (error) {
            console.error('Error deleting meal plan:', error);
            setError('Error deleting meal plan');
        }
    };

    const editMealPlan = (plan) => {
        setNewMealPlan({ day: plan.day, id: plan.id });
        setSelectedRecipes(plan.recipes.map((recipe) => recipe.id));
    };

    const generateShoppingList = async (day) => {
        try {
            const response = await axios.post(
                'http://localhost:8000/api/mealplans/generate-shopping-list/',
                { meal_plan_day: day },
                config
            );
            setShoppingList(response.data.ingredients);
        } catch (error) {
            console.error('Error generating shopping list:', error);
            setError('Error generating shopping list');
        }
    };

    useEffect(() => {
        fetchMealPlans();
        fetchRecipes();
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <h1 className="text-3xl mb-6 font-bold text-blue-500 text-center">Meal Planner Dashboard</h1>

            {/* Form Section */}
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
                                className={`p-4 rounded-lg cursor-pointer transition-transform transform hover:scale-105 border-2 ${
                                    selectedRecipes.includes(recipe.id)
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

            {/* Existing Meal Plans Section */}
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

export default MealPlannerDashboard;
