import React, { useContext } from "react";
import { RecipeContext } from "../../contexts/RecipeContext";


const MyRecipes = () => {

  const {recipes, loadingRecipes, deleteRecipe} = useContext(RecipeContext);
  if (loadingRecipes) { return <div>Loading...</div>; }


  return (
    <div>
      <h3 className="text-xl mb-4">My Recipes</h3>
      <table className="min-w-full bg-gray-800 text-white border-collapse">
        <thead>
          <tr>
            <th className="py-2 px-4 border border-gray-700 text-left">ID</th>
            <th className="py-2 px-4 border border-gray-700 text-left">
              Title
            </th>
            <th className="py-2 px-4 border border-gray-700 text-left">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {recipes.map((recipe) => (
            <tr key={recipe.id}>
              <td className="py-2 px-4 border border-gray-700">{recipe.id}</td>
              <td className="py-2 px-4 border border-gray-700">
                {recipe.title}
              </td>
              <td className="py-2 px-4 border border-gray-700">
                <button className="bg-blue-500 text-white px-2 py-1 mr-2">
                  Read
                </button>
                <button className="bg-yellow-500 text-white px-2 py-1 mr-2">
                  Update
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1"
                  onClick={() => deleteRecipe(recipe.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyRecipes;