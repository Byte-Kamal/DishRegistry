import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import CreateRecipe from '../components/CookDashboard/CreateRecipe';
import ViewRecipes from '../components/CookDashboard/ViewRecipes';
import { RecipeContext } from '../contexts/RecipeContext';

const CookDashboard = () => {
  // eslint-disable-next-line
  const { recipes, loading } = useContext(RecipeContext);
  const [editRecipeId, setEditRecipeId] = useState(null);
  const [currentView, setCurrentView] = useState('view'); // State to manage current view
  const [fetchedRecipes, setRecipes] = useState([]); // Define setRecipes using useState

  const fetchRecipes = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/recipes/');
      console.log('Recipes fetched:', response.data);
      setRecipes(response.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const handleEdit = (recipe) => {
    setEditRecipeId(recipe.id);
    setCurrentView('create'); // Switch to create view when editing
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('accessToken'); // Get the token from local storage

    try {
      await axios.delete(`http://localhost:8000/api/recipes/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Recipe deleted successfully!');
      fetchRecipes();
    } catch (error) {
      console.error('Error deleting recipe:', error);
      alert('Error deleting recipe.');
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex">
      {/* Sidebar */}
      <div className="w-1/4 p-4 bg-gray-800 rounded-lg shadow-lg">
        <button
          onClick={() => setCurrentView('view')}
          className={`w-full p-3 mb-4 ${currentView === 'view' ? 'bg-blue-600' : 'bg-gray-700'} hover:bg-blue-500 rounded-lg text-lg transition-transform transform hover:scale-105`}
        >
          View Recipes
        </button>
        <button
          onClick={() => setCurrentView('create')}
          className={`w-full p-3 ${currentView === 'create' ? 'bg-blue-600' : 'bg-gray-700'} hover:bg-blue-500 rounded-lg text-lg transition-transform transform hover:scale-105`}
        >
          Create / Update Recipe
        </button>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-4 mt-4">
        {currentView === 'create' && (
          <CreateRecipe
            editRecipeId={editRecipeId}
            setEditRecipeId={setEditRecipeId}
            fetchRecipes={fetchRecipes}
          />
        )}

        {currentView === 'view' && (
          <ViewRecipes
            recipes={fetchedRecipes}
            loading={loading}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
};

export default CookDashboard;