import React from 'react';

const RecipeCardClassic = ({ image, title, time, category, description, servings, prep_time, cooking_time }) => {
  return (
    <div className="max-w-sm bg-gray-900 text-white rounded-lg shadow-lg">
      <div className="relative">
        <img className="w-full h-48 object-cover" src={image} alt={title} />
        <div className="absolute top-0 left-0 bg-black bg-opacity-50 p-2 text-xs uppercase text-gray-300">{category}</div>
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-sm text-gray-400 mb-4">{description}</p>
        <div className="flex justify-between text-gray-400 text-sm">
          <span>Prep: {prep_time} mins</span>
          <span>Cook: {cooking_time} mins</span>
          <span>Servings: {servings}</span>
        </div>
        <button className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">View Recipe</button>
      </div>
    </div>
  );
};

export default RecipeCardClassic;
