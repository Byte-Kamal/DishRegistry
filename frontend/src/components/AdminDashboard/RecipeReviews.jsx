import React from "react";

const RecipeReviews = ({ reviews }) => {

  return (
    <div>
      <h3 className="text-xl mb-4">Recipe Reviews</h3>
      <table className="min-w-full bg-gray-800 text-white border-collapse">
        <thead>
          <tr>
            <th className="py-2 px-4 border border-gray-700 text-left">ID</th>
            <th className="py-2 px-4 border border-gray-700 text-left">Recipe</th>
            <th className="py-2 px-4 border border-gray-700 text-left">Reviewer</th>
            <th className="py-2 px-4 border border-gray-700 text-left">Review</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr key={review.id}>
              <td className="py-2 px-4 border border-gray-700">{review.id}</td>
              <td className="py-2 px-4 border border-gray-700">{review.recipe}</td>
              <td className="py-2 px-4 border border-gray-700">{review.user}</td>
              <td className="py-2 px-4 border border-gray-700">{review.comment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecipeReviews;
