import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import SmallReviewCard from '../components/ReviewCard/SmallReviewCard';
import { RecipeContext } from '../contexts/RecipeContext';
import Alert from "./Alert";
import Loading from './Loading';
const RecipeDetails = () => {
  const { id } = useParams();
  const { recipes, loading } = useContext(RecipeContext);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [title, setTitle] = useState('');
  const [shareMessage, setShareMessage] = useState('');
  const [error, setError] = useState(null);

  if (loading) {
    return <Loading />;
  }

  const recipe = recipes.find(recipe => recipe.id === parseInt(id));

  if (!recipe) {
    return <div className="min-h-screen bg-gray-900 text-white p-6 flex items-center justify-center">Recipe not found</div>;
  }

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (rating > 0 && comment && title) {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        console.error('No token found');
        setError('No token found');
        window.location.href = '/login';
        return;
      }

      try {
        const response = await axios.post(`http://localhost:8000/api/recipes/${id}/reviews/`, {
          rating,
          comment,
          title,
        }, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Review submitted successfully:', response.data);
        // Add the new review to the recipe's reviews array
        recipe.reviews.push(response.data);
        setRating(0);
        setComment('');
        setTitle('');
        setError(null);
      } catch (error) {
        console.error('Error submitting review:', error.response ? error.response.data : error.message);
        setError(error.response ? error.response.data.detail : error.message);
      }
    }
  };

  const handleShare = (platform) => {
    let url = window.location.href;
    let message = `Check out this recipe: ${recipe.title} on ${url}`;

    switch (platform) {
      case 'email':
        window.location.href = `mailto:?subject=Check out this recipe&body=${message}`;
        break;
      case 'twitter':
        window.open(`https://twitter.com/share?text=${encodeURIComponent(message)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
        break;
      default:
        setShareMessage('Unsupported platform');
    }
  };

  // Split tags string into an array
  const tagsArray = recipe.tags ? recipe.tags.split(',').map(tag => tag.trim()) : [];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="container mx-auto">
        {error && <Alert variant="danger">{error}</Alert>}
        {/* Recipe Card */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          {/* Recipe Image */}
          <div className="mb-6">
            <img src={recipe.image} alt={recipe.title} className="w-full h-96 object-cover rounded-lg shadow-lg" />
          </div>

          {/* Recipe Title and Tags */}
          <div className="mb-6">
            <h1 className="text-4xl font-bold mb-2">{recipe.title}</h1>
            <div className="flex flex-wrap gap-2 mb-4">
              {tagsArray.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-700 text-gray-300 py-1 px-3 rounded-lg text-sm hover:bg-gray-600 transition"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-lg text-gray-400">{recipe.description}</p>
          </div>

          {/* Recipe Metadata */}
          <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <h2 className="text-xl font-semibold">Category</h2>
              <p className="text-gray-400">{recipe.category}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Cooking Time</h2>
              <p className="text-gray-400">{recipe.cooking_time} minutes</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Prep Time</h2>
              <p className="text-gray-400">{recipe.prep_time} minutes</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Servings</h2>
              <p className="text-gray-400">{recipe.servings}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Created At</h2>
              <p className="text-gray-400">{new Date(recipe.created_at).toLocaleDateString()}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Updated At</h2>
              <p className="text-gray-400">{new Date(recipe.updated_at).toLocaleDateString()}</p>
            </div>
          </div>

          {/* Ingredients */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4">Ingredients</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recipe.ingredients.map(ingredient => (
                <div key={ingredient.id} className="bg-gray-900 p-4 rounded-lg shadow-md">
                  <p className="text-gray-400">{ingredient.quantity} {ingredient.unit} {ingredient.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4">Instructions</h2>
            <div className="space-y-4">
              {recipe.instructions.map(instruction => (
                <div key={instruction.id} className="bg-gray-900 p-4 rounded-lg shadow-md">
                  <p className="text-gray-400">Step {instruction.step_number}: {instruction.instruction_text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4">Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recipe.reviews.slice(0, 6).map(review => (
                <SmallReviewCard
                  key={review.id}
                  authorName={review.user}
                  rating={review.rating}
                  comments={review.comment}
                />
              ))}
            </div>
          </div>

          {/* Leave a Review and Share Recipe */}
          <div className="flex flex-col lg:flex-row gap-6 mt-6">
            {/* Leave a Review */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-md flex-1">
              <h2 className="text-2xl font-bold mb-4">Leave a Review</h2>
              <form onSubmit={handleReviewSubmit}>
                <div className="flex flex-col gap-4 mb-4">
                  <label className="text-gray-400">
                    Title
                    <input
                      type="text"
                      placeholder="Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="bg-gray-900 text-white py-2 px-4 rounded w-full mt-1"
                      required
                    />
                  </label>
                  <label className="text-gray-400">
                    Rating
                    <select
                      value={rating}
                      onChange={(e) => setRating(parseInt(e.target.value))}
                      className="bg-gray-900 text-white py-2 px-4 rounded mt-1"
                      required
                    >
                      <option value="">Rate this recipe</option>
                      {[1, 2, 3, 4, 5].map(num => (
                        <option key={num} value={num}>
                          {num} Star{num > 1 ? 's' : ''}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="text-gray-400">
                    Comment
                    <textarea
                      placeholder="Your comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="bg-gray-900 text-white py-2 px-4 rounded w-full mt-1"
                      rows="4"
                      required
                    />
                  </label>
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-6 rounded"
                >
                  Submit Review
                </button>
              </form>
            </div>

            {/* Share Recipe */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-md flex-1">
              <h2 className="text-2xl font-bold mb-4">Share this Recipe</h2>
              <div className="flex flex-col gap-4">
                <button
                  className="bg-blue-500 hover:bg-blue-400 text-white py-2 px-4 rounded flex items-center justify-center"
                  onClick={() => handleShare('twitter')}
                >
                  <i className="fab fa-twitter mr-2"></i> Share on Twitter
                </button>
                <button
                  className="bg-blue-700 hover:bg-blue-600 text-white py-2 px-4 rounded flex items-center justify-center"
                  onClick={() => handleShare('facebook')}
                >
                  <i className="fab fa-facebook-f mr-2"></i> Share on Facebook
                </button>
                <button
                  className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded flex items-center justify-center"
                  onClick={() => handleShare('email')}
                >
                  <i className="fas fa-envelope mr-2"></i> Share via Email
                </button>
              </div>
              {shareMessage && <p className="mt-4 text-red-400">{shareMessage}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;