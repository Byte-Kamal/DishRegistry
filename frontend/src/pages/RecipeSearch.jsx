import axios from "axios";
import React, { useEffect, useState } from "react";
import RecipeCardDetailed from "../components/RecipeCards/RecipeCardDetailed";

const RecipeSearch = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch recipes from API when searchTerm changes
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/recipes/?search=${searchTerm}`);
        setRecipes(response.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    if (searchTerm) {
      fetchRecipes();
    } else {
      setRecipes([]); // Clear recipes when no search term
    }
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        {/* Search Input */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search for recipes..."
            className="w-full px-4 py-2 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Recipes List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <RecipeCardDetailed key={recipe.id} recipe={recipe} />
            ))
          ) : (
            <p className="text-gray-600 text-center col-span-3">
              {searchTerm ? "No recipes found" : "Start searching for recipes!"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeSearch;
