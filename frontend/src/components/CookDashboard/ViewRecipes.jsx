import React from 'react';
import { useNavigate } from 'react-router-dom';

const ViewRecipes = ({ recipes, loading, handleEdit, handleDelete }) => {

    const navigate = useNavigate();

    const handleViewRecipe = (id) => {
        navigate(`/recipe/${id}`);
    }

  return (
    <div className="flex-1 pl-6">
      <h2 className="text-2xl font-bold mb-5">Recipe List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        recipes.map((recipe) => (
          <div key={recipe.id} className="bg-gray-800 text-white rounded-lg shadow-lg p-4 mb-4 flex flex-col lg:flex-row justify-between items-center lg:items-start space-y-4 lg:space-y-0 lg:space-x-6">
            {/* Left Section: Text Information */}
            <div className="flex-grow space-y-2">
              <h3 className="text-2xl font-bold">{recipe.title}</h3>
              <p className="text-gray-400">{recipe.description}</p>
              <div className="text-sm text-gray-500 space-y-1">
                <p>Category: {recipe.category}</p>
                <p>Cooking Time: {recipe.cooking_time} mins</p>
                <p>Servings: {recipe.servings}</p>
              </div>
              {/* Action Buttons */}
              <div className="flex space-x-4 mt-4">
                <button
                  onClick={() => handleEdit(recipe)}
                  className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(recipe.id)}
                  className="bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded"
                >
                  Delete
                </button>
                <button
                onClick={() => handleViewRecipe(recipe.id)}
                  className="bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded"
                >
                  View Recipe
                </button>
              </div>
            </div>

            {/* Right Section: Recipe Image */}
            {recipe.image && (
              <div className="lg:w-1/3 flex-shrink-0">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-48 object-cover rounded-lg shadow-md"
                />
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ViewRecipes;