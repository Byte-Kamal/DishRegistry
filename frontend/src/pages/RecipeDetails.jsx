import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const baseURL = "http://localhost:8000/";
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/recipes/${id}/`
        );
        setImageUrl(response.data.image ? `${baseURL}${response.data.image}` : "");
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
        style={{ 
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}
      >
        <div className="container mx-auto px-4 flex items-center justify-between h-screen">
          <div className="md:w-1/2 mt-1 md:mt-0">
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold text-white mb-4">
                {recipe.title}
              </h1>
              <p className="text-lg text-white mb-4">{recipe.description}</p>
              <p className="text-sm text-white">Category: {recipe.category}</p>
              <p className="text-sm text-white">Tags: {recipe.tags}</p>
            </div>
          </div>
          <div className="md:w-1/2 mt-1 md:mt-0">
            <img
              src={imageUrl}
              alt="Recipe-Picture"
              className="w-full h-auto max-h-screen object-cover rounded-lg"
              style={{ maxHeight: '500px' }}
            />
          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="p-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-gray-800 p-4 rounded-lg text-center">
            <p className="text-lg font-semibold text-white">Cooking Time</p>
            <p className="text-sm text-white">{recipe.cooking_time} minutes</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg text-center">
            <p className="text-lg font-semibold text-white">Prep Time</p>
            <p className="text-sm text-white">{recipe.prep_time} minutes</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg text-center">
            <p className="text-lg font-semibold text-white">Servings</p>
            <p className="text-sm text-white">{recipe.servings}</p>
          </div>
        </div>
      </section>

      {/* Ingredients List */}
      <section className="p-8">
        <h3 className="mb-4 text-3xl font-bold">Ingredients</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {recipe.ingredients.map((ingredient) => (
            <div key={ingredient.id} className="bg-gray-800 p-4 rounded-lg">
              <p>{ingredient.quantity} {ingredient.unit} {ingredient.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Instructions Section */}
      <section className="p-8">
        <h3 className="mb-4 text-3xl font-bold">Instructions</h3>
        <div className="bg-gray-800 p-4 rounded-lg">
          <ol className="space-y-4 list-decimal list-inside">
            {recipe.instructions.map((instruction) => (
              <li key={instruction.id} className="mb-2">{instruction.instruction_text}</li>
            ))}
          </ol>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="p-8">
        <h3 className="mb-4 text-3xl font-bold">Reviews</h3>
        <div className="space-y-4">
          {recipe.reviews.map((review) => (
            <div key={review.id} className="p-4 bg-gray-800 rounded-lg">
              <p className="text-lg font-semibold">{review.title}</p>
              <p className="text-sm">{review.comment}</p>
              <p className="text-sm text-gray-400">Rating: {review.rating}/5</p>
              <p className="text-sm text-gray-400">Date: {new Date(review.created_at).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default RecipeDetail;