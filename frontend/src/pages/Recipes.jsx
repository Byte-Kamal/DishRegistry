import React, { useContext } from 'react';
import RecipeCardHorizontal from '../components/RecipeCards/RecipeCardHorizontal';
import { RecipeContext } from '../contexts/RecipeContext';

const Recipes = () => {
  const { recipes, loading } = useContext(RecipeContext);

  if (loading) {
    return <div className="container mx-auto p-4 bg-gray-900 text-white min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Recipes</h1>
      <div className="flex flex-wrap -mx-2">
        {recipes.map(recipe => (
          <div key={recipe.id} className="w-full sm:w-1/2 p-2">
            <RecipeCardHorizontal recipe={recipe} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recipes;