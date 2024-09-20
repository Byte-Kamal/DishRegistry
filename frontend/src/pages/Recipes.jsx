import axios from "axios";
import { useEffect, useState } from "react";

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
    <>
      {recipes.map((recipe) => (
        <div key={recipe.id}>
          <h2>{recipe.title}</h2>
          {/* <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul> */}
        </div>
      ))}
    </>
  );
}

export default Recipes;
