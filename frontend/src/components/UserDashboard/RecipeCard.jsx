const RecipeCard = ({ title, description, image, onDelete }) => (
  <div className="bg-gray-800 p-4 rounded-lg shadow-lg relative">
    <img
      src={image}
      alt={title}
      className="w-full h-48 object-cover rounded-t-lg"
    />
    <div className="p-4">
      <h3 className="text-xl mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
    {onDelete && (
      <button
        onClick={onDelete}
        className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
      >
        Delete
      </button>
    )}
  </div>
);

export default RecipeCard;