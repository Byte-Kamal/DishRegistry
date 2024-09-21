import React from 'react';
import { useNavigate } from 'react-router-dom';

const RecipeCardHorizontal = ({ recipe }) => {
  const navigate = useNavigate();

  const { title, description, image, prep_time, cooking_time, category } = recipe;

  const handleOnClick = () => {
    navigate(`/recipe/${recipe.id}`);
  };

  return (
    <div className="flex h-80 bg-gray-800 text-white rounded-lg overflow-hidden shadow-md">
      <img className="w-2/5 object-cover" src={image} alt={title} />
      <div className="p-6 w-3/5 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-semibold mb-2 text-white">{title}</h2>
          <span className="block text-sm text-gray-400 uppercase mb-2">{category}</span>
          <p className="text-gray-300 mb-4">{description}</p>
        </div>
        <div>
          <span className="block text-gray-400">Cooking Time: {cooking_time} mins</span>
          <span className="block text-gray-400">Preparation Time: {prep_time} mins</span>
          <button className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={handleOnClick}>View Recipe</button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCardHorizontal;