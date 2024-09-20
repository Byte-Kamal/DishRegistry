import React from "react";
import { useNavigate } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();

  const handleViewRecipe = (e) => {
    e.preventDefault();
    navigate(`/recipe-details/${recipe.id}`);
  };

  return (
    <div className="w-[432px]">
      <div className="border border-gray-400 bg-white rounded-lg p-6 flex flex-col justify-between leading-normal shadow-lg">
        <div className="mb-8">
          <img
            className="w-full h-64 object-cover rounded-lg"
            src="https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Recipe"
          />
          <div className="text-gray-900 font-bold text-2xl mt-4 mb-2">Recipe Title</div>
          <p className="text-gray-700 text-base">Recipe Description</p>
        </div>
        <div className="flex items-center">
          <img
            className="w-12 h-12 rounded-full mr-4"
            src="https://via.placeholder.com/150"
            alt="Author"
          />
          <div className="text-sm">
            <p className="text-gray-900 leading-none">Author Name</p>
            <p className="text-gray-600">Date</p>
          </div>
        </div>
        <div className="mt-6 flex justify-between">
          <button className="bg-green-500 text-white font-semibold py-3 px-6 rounded hover:bg-green-600 transition-colors duration-300" onClick={handleViewRecipe}>
            View Recipe
          </button>
          <button className="ml-2 bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded hover:bg-gray-300 transition-colors duration-300">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
