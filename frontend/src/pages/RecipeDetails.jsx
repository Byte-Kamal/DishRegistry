import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/recipes/${id}/`
        );
        setRecipe(response.data);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      }
    };

    fetchRecipe();
  }, [id]);
  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="min-h-screen text-white bg-gray-900">
      <section
        className="bg-gray-100 py-5 h-screen"
        style={{ backgroundImage: `url(${recipe.image})` }}
      >
        <div className="container mx-auto px-4 flex items-center justify-between h-screen">
          <div className="md:w-1/2 mt-1 md:mt-0">
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold text-white mb-4">
                {recipe.title}
              </h1>
              <p className="text-lg text-white mb-4">{recipe.description}</p>
            </div>
          </div>
          <div className="md:w-1/2 mt-1 md:mt-0">
            <img
              src={recipe.image}
              alt="Recipe-Picture"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Additional Information */}
      <section className="p-8">
        <div className="flex justify-between mb-4">
          <div>Prep Time: {recipe.prep_time} mins</div>
          <div>Cooking Time: {recipe.cooking_time} mins</div>
          <div>Servings: {recipe.serving_people} people</div>
        </div>
      </section>

      {/* Ingredients List
      <section className="p-8">
        <h3 className="mb-4 text-3xl font-bold">Ingredients</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {recipe.ingredients.map((ingredient) => (
            <li key={ingredient.id}>
              {ingredient.name} - {ingredient.quantity} {ingredient.unit}
            </li>
          ))}
        </div>
      </section>

      {/* Instructions Section */}
      {/* <section className="p-8">
        <h3 className="mb-4 text-3xl font-bold">Instructions</h3>
        <div className="space-y-4">
          {recipe.instructions.map((instruction) => (
            <li key={instruction.id}>{instruction.instruction_text}</li>
          ))}
        </div>
      </section> */}

    </div>
  );
};

export default RecipeDetail;
