import React from 'react';
import { useNavigate } from 'react-router-dom';

const RecipeCardMinimalist = ({ recipe }) => {
  const navigate = useNavigate();

  const { title, creator, created_at, description, prep_time, cooking_time, servings } = recipe;
  const baseURL = "http://localhost:8000/";
  const imageUrl = `${baseURL}${recipe.image}`;

  const handleOnClick = () => {
    navigate(`recipe/${recipe.id}`);
  };

  return (
    <div className="max-w-sm bg-gray-800 text-white shadow-md rounded-lg overflow-hidden">
      <img className="w-full h-48 object-cover" src={imageUrl} alt={title} />
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-2 text-white">{title}</h2>
        <p className="text-sm text-gray-400 mb-1">By {creator} • {created_at}</p>
        <p className="text-gray-300 mb-4">{description}</p>
        <div className="flex justify-between mb-2 text-gray-400">
          <span>Prep: {prep_time} mins</span>
          <span>Cook: {cooking_time} mins</span>
          <span>Servings: {servings}</span>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleOnClick}>View Recipe</button>
      </div>
    </div>
  );
};

export default RecipeCardMinimalist;