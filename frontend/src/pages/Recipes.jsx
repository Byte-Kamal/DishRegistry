import axios from "axios";
import { useEffect, useState } from "react";
import RecipeCardHorizontal from "../components/RecipeCards/RecipeCardHorizontal";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Function to fetch recipes from the API
    const fetchRecipes = async () => {
      try {
        // Make a GET request to the API endpoint
        const response = await axios.get(`http://localhost:8000/api/recipes/`);
        console.log(response.data);
        // Update the state with the fetched recipes
        setRecipes(response.data);
      } catch (error) {
        // Log any errors that occur during the fetch
        console.error("Error fetching recipes:", error);
      }
    };
  
    // Call the fetchRecipes function when the component mounts
    fetchRecipes();
  }, []);
  
  return (
    <div className="bg-gray-800 min-h-screen text-white">
      <div className= "text-white text-center py-4">
        <h1 className="text-3xl font-semibold">Recipes</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        {recipes.map((recipe) => (
          <div key={recipe.id}>
            <RecipeCardHorizontal recipe={recipe} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recipes;
