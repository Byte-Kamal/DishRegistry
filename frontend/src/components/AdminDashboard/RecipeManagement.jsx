const RecipeManagement = ({ recipes }) => {

  return (
    <div>
      <h3 className="text-xl mb-4">Recipe Management</h3>
      <table className="min-w-full bg-gray-800 text-white border-collapse">
        <thead>
          <tr>
            <th className="py-2 px-4 border border-gray-700 text-left">ID</th>
            <th className="py-2 px-4 border border-gray-700 text-left">
              Title
            </th>
            <th className="py-2 px-4 border border-gray-700 text-left">
              Author
            </th>
            <th className="py-2 px-4 border border-gray-700 text-left">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {recipes.map((recipe) => (
            <tr key={recipe.id}>
              <td className="py-2 px-4 border border-gray-700">{recipe.id}</td>
              <td className="py-2 px-4 border border-gray-700">
                {recipe.title}
              </td>
              <td className="py-2 px-4 border border-gray-700">
                {recipe.created_by}
              </td>
              <td className="py-2 px-4 border border-gray-700">
                <button className="bg-blue-500 text-white px-2 py-1 mr-2">
                  View
                </button>
                <button className="bg-yellow-500 text-white px-2 py-1 mr-2">
                  Edit
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

export default RecipeManagement;