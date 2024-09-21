import React from 'react';
import { useNavigate } from 'react-router-dom';

const RecipeCardHorizontal = ({ recipe }) => {

  const navigate = useNavigate();

  const { title, description, prep_time, cooking_time, category } = recipe;
  const baseURL = "http://localhost:8000/";
  const imageUrl = `${baseURL}${recipe.image}`;

  const handleOnClick = () => {
    navigate(`/recipe-details/${recipe.id}`);
  };

  return (
    <div className="flex max-w-2xl bg-gray-900 text-white rounded-lg overflow-hidden shadow-md">
    <img className="w-1/3 h-60 object-cover" src={imageUrl} alt={title} />
      <div className="p-6 w-1/2">
        <h2 className="text-2xl font-semibold mb-2">{title}</h2>
        <span className="block text-sm text-gray-500 uppercase mb-2">{category}</span>
        <p className="text-gray-300 mb-4">{description}</p>
        <span className="block text-gray-400">Cooking Time: {cooking_time} mins</span>
        <span className="block text-gray-400">Preparation Time: {prep_time} mins</span>
        <button className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={handleOnClick}>View Recipe</button>
      </div>
    </div>
  );
};

export default RecipeCardHorizontal;
