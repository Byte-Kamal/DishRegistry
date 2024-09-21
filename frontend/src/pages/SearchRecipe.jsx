import axios from "axios";
import React, { useEffect, useState } from "react";
import RecipeCardMinimalist from "../components/RecipeCards/RecipeCardMinimalist";

const SearchRecipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:8000/api/recipes/?search=${searchTerm}`);
        setRecipes(response.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    if (searchTerm) {
      fetchRecipes();
    } else {
      setRecipes([]);
    }
  }, [searchTerm]);

  return (
    <div className="container mx-auto p-4 bg-gray-900 text-white min-h-screen">
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search for recipes..."
          className="w-full px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <h1 className="text-3xl font-bold mb-6 text-center">Search Results</h1>
      {loading ? (
        <div className="text-center text-gray-400">Loading...</div>
      ) : (
        <div className="flex flex-wrap -mx-2">
          {recipes.length > 0 ? (
            recipes.map(recipe => (
              <div key={recipe.id} className="w-full sm:w-1/2 lg:w-1/3 p-2">
                <RecipeCardMinimalist recipe={recipe} />
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center w-full">
              {searchTerm ? "No recipes found" : "Start searching for recipes!"}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchRecipe;