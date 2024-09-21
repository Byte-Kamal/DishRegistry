import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RecipeManagement = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/recipes/");
        setRecipes(response.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const handleView = (e, id) => {
    e.preventDefault();
    navigate(`/recipe-details/${id}`);
  };

  const handleDelete = async (e, id) => {
    e.preventDefault();
    const confirmDelete = window.confirm("Are you sure you want to delete this recipe?");
    if (confirmDelete) {
      try {
        const accessToken = localStorage.getItem("accessToken");
        await axios.delete(`http://localhost:8000/api/recipes/${id}/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        // Remove the deleted recipe from the state
        setRecipes(recipes.filter(recipe => recipe.id !== id));
        alert("Recipe deleted successfully");
      } catch (error) {
        console.error("Error deleting recipe:", error.response?.data || error);
        alert("An error occurred. Please try again later.");
      }
    }
  };

  if (loading) return <p>Loading recipes...</p>;

  return (
    <div>
      <h3 className="text-xl mb-4">Recipe Management</h3>
      <table className="min-w-full bg-gray-800 text-white border-collapse">
        <thead>
          <tr>
            <th className="py-2 px-4 border border-gray-700 text-left">ID</th>
            <th className="py-2 px-4 border border-gray-700 text-left">Title</th>
            <th className="py-2 px-4 border border-gray-700 text-left">Author</th>
            <th className="py-2 px-4 border border-gray-700 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {recipes.map((recipe) => (
            <tr key={recipe.id}>
              <td className="py-2 px-4 border border-gray-700">{recipe.id}</td>
              <td className="py-2 px-4 border border-gray-700">{recipe.title}</td>
              <td className="py-2 px-4 border border-gray-700">{recipe.created_by}</td>
              <td className="py-2 px-4 border border-gray-700">
                <button className="bg-blue-500 text-white px-2 py-1 mr-2" onClick={(e) => handleView(e, recipe.id)}>
                  View
                </button>
                <button className="bg-red-500 text-white px-2 py-1" onClick={(e) => handleDelete(e, recipe.id)}>
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
