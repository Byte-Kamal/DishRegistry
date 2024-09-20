import React, { useContext } from "react";
import { ReviewContext } from "../../contexts/ReviewContext";
const RecipeLikesComments = () => {

  const {reviews, loadingReviews} = useContext(ReviewContext);

  if (loadingReviews) { return <div>Loading...</div>; }
  return (
    <div>
      <h3 className="text-xl mb-4">Recipe Rating & Comments</h3>
      <table className="min-w-full bg-gray-800 text-white border-collapse">
        <thead>
          <tr>
            <th className="py-2 px-4 border border-gray-700 text-left">
              Recipe
            </th>
            <th className="py-2 px-4 border border-gray-700 text-left">
              Rating
            </th>
            <th className="py-2 px-4 border border-gray-700 text-left">
              Comments
            </th>
          </tr>
        </thead>
        <tbody>

          {reviews.map((review) => (
            <tr key={review.id}>
              <td className="py-2 px-4 border border-gray-700">
                {review.recipe}
              </td>
              <td className="py-2 px-4 border border-gray-700">
                {review.rating}
              </td>
              <td className="py-2 px-4 border border-gray-700">
                {review.review_text}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecipeLikesComments;