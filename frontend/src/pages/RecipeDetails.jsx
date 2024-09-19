import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LargeReviewCard from "../components/ReviewCard/LargeReviewCard";
import SmallReviewCard from "../components/ReviewCard/SmallReviewCard";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handleSubmitReview = () => {
    if (rating && review) {
      setReviews([...reviews, { rating, review }]);
      setRating(0);
      setReview("");
    }
  };

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/recipe/${id}/`
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

      {/* Ingredients List */}
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
      <section className="p-8">
        <h3 className="mb-4 text-3xl font-bold">Instructions</h3>
        <div className="space-y-4">
          {recipe.instructions.map((instruction) => (
            <li key={instruction.id}>{instruction.instruction_text}</li>
          ))}
        </div>
      </section>

      {/* Small Review Cards */}
      <div className="flex items-center justify-center bg-gray-900">
        <SmallReviewCard
          profileImage="https://source.unsplash.com/random/100x100?profile"
          authorName="John Doe"
          rating={4}
          comments="This is a sample comment. The recipe was amazing and easy to follow!"
        />
        <SmallReviewCard
          profileImage="https://source.unsplash.com/random/100x100?profile"
          authorName="John Doe"
          rating={4}
          comments="This is a sample comment. The recipe was amazing and easy to follow!"
        />
        <SmallReviewCard
          profileImage="https://source.unsplash.com/random/100x100?profile"
          authorName="John Doe"
          rating={4}
          comments="This is a sample comment. The recipe was amazing and easy to follow!"
        />
      </div>

      {/* Large Review Card */}
      <div className="flex items-center justify-center min-h-screen bg-gray-900 p-6">
        <LargeReviewCard
          imageUrl="https://source.unsplash.com/random/800x400?review"
          rating={4}
          comments="This is a detailed review comment. The recipe was amazing and easy to follow!"
          authorName="Jane Doe"
          profileImage="https://source.unsplash.com/random/100x100?profile"
          authorTag="Food Blogger"
          className="shadow-lg rounded-lg overflow-hidden"
        />
      </div>

      {/* Rate and Review Section */}
      <div className="border p-4 rounded-md">
        <label className="block mb-2">Your Rating:</label>
        <select
          value={rating}
          onChange={handleRatingChange}
          className="block w-full mb-4 p-2 border rounded-md"
        >
          <option value="0">Select rating</option>
          {[1, 2, 3, 4, 5].map((star) => (
            <option key={star} value={star}>
              {star} ⭐
            </option>
          ))}
        </select>

        <label className="block mb-2">Your Review:</label>
        <textarea
          value={review}
          onChange={handleReviewChange}
          className="block w-full mb-4 p-2 border rounded-md"
          rows="3"
          placeholder="Write your review..."
        ></textarea>

        <button
          onClick={handleSubmitReview}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Submit Review
        </button>
      </div>

      {/* Share Recipe Section */}
      <section className="p-8">
        <h3 className="mb-4 text-3xl font-bold">Share Recipe</h3>
        <div className="flex space-x-4 mt-2">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Share on Facebook
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Share on Twitter
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Share on Pinterest
          </button>
        </div>
      </section>
    </div>
  );
};

export default RecipeDetail;
