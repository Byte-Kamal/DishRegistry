import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CreateMealPlan from '../components/PlannerDashboard/CreateMealPlan';
import ViewMealPlans from '../components/PlannerDashboard/ViewMealPlans';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const MealPlannerDashboard = () => {
    const [mealPlans, setMealPlans] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipes, setSelectedRecipes] = useState([]);
    const [newMealPlan, setNewMealPlan] = useState({ day: '', id: null });
    const [shoppingList, setShoppingList] = useState('');
    const [error, setError] = useState('');
    const [currentView, setCurrentView] = useState('view'); // State to manage current view

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
        setCurrentView('create'); // Switch to create view when editing
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
        // eslint-disable-next-line
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6 flex">
            {/* Sidebar */}
            <div className="w-1/4 p-4 bg-gray-800 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-8 text-center">Meal Planner</h2>
                <button
                    onClick={() => setCurrentView('view')}
                    className={`w-full p-3 mb-4 ${currentView === 'view' ? 'bg-blue-600' : 'bg-gray-700'} hover:bg-blue-500 rounded-lg text-lg transition-transform transform hover:scale-105`}
                >
                    View Meal Plan
                </button>
                <button
                    onClick={() => setCurrentView('create')}
                    className={`w-full p-3 ${currentView === 'create' ? 'bg-blue-600' : 'bg-gray-700'} hover:bg-blue-500 rounded-lg text-lg transition-transform transform hover:scale-105`}
                >
                    Create Meal Plan
                </button>
            </div>

            {/* Main Content */}
            <div className="w-3/4 p-6">
                {currentView === 'create' && (
                    <CreateMealPlan
                        daysOfWeek={daysOfWeek}
                        newMealPlan={newMealPlan}
                        setNewMealPlan={setNewMealPlan}
                        recipes={recipes}
                        selectedRecipes={selectedRecipes}
                        setSelectedRecipes={setSelectedRecipes}
                        createOrUpdateMealPlan={createOrUpdateMealPlan}
                        error={error}
                    />
                )}

                {currentView === 'view' && (
                    <ViewMealPlans
                        mealPlans={mealPlans}
                        editMealPlan={editMealPlan}
                        deleteMealPlan={deleteMealPlan}
                        generateShoppingList={generateShoppingList}
                        shoppingList={shoppingList}
                    />
                )}
            </div>
        </div>
    );
};

export default MealPlannerDashboard;