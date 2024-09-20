const RecipeReviews = ({ reviews }) => {

  return (
    <div>
      <h3 className="text-xl mb-4">Recipe Reviews</h3>
      <table className="min-w-full bg-gray-800 text-white border-collapse">
        <thead>
          <tr>
            <th className="py-2 px-4 border border-gray-700 text-left">ID</th>
            <th className="py-2 px-4 border border-gray-700 text-left">
              Recipe
            </th>
            <th className="py-2 px-4 border border-gray-700 text-left">
              Reviewer
            </th>
            <th className="py-2 px-4 border border-gray-700 text-left">
              Review
            </th>
            <th className="py-2 px-4 border border-gray-700 text-left">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr key={review.id}>
              <td className="py-2 px-4 border border-gray-700">{review.id}</td>
              <td className="py-2 px-4 border border-gray-700">
                {review.recipe}
              </td>
              <td className="py-2 px-4 border border-gray-700">
                {review.user}
              </td>
              <td className="py-2 px-4 border border-gray-700">
                {review.review_text}
              </td>
              <td className="py-2 px-4 border border-gray-700">
                <button className="bg-blue-500 text-white px-2 py-1 mr-2">
                  View
                </button>
                <button className="bg-red-500 text-white px-2 py-1">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecipeReviews;