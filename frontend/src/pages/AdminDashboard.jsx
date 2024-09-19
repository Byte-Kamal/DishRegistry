import React, { useState } from "react";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("Dashboard");

  const renderSection = () => {
    switch (activeSection) {
      case "UserManagement":
        return <UserManagement />;
      case "RecipeManagement":
        return <RecipeManagement />;
      case "RecipeReviews":
        return <RecipeReviews />;
      case "Dashboard":
        return <Dashboard setActiveSection={setActiveSection} />;
      default:
        return <Dashboard setActiveSection={setActiveSection} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <div className="flex flex-1">
        <div className="w-1/4 bg-gray-800 p-4">
          <h2 className="text-2xl mb-4">Admin Dashboard</h2>
          <ul>
            <li
              className="mb-2 cursor-pointer"
              onClick={() => setActiveSection("Dashboard")}
            >
              Dashboard
            </li>
            <li
              className="mb-2 cursor-pointer"
              onClick={() => setActiveSection("UserManagement")}
            >
              User Management
            </li>
            <li
              className="mb-2 cursor-pointer"
              onClick={() => setActiveSection("RecipeManagement")}
            >
              Recipe Management
            </li>
            <li
              className="mb-2 cursor-pointer"
              onClick={() => setActiveSection("RecipeReviews")}
            >
              Recipe Reviews
            </li>
          </ul>
        </div>
        <div className="w-3/4 p-4">{renderSection()}</div>
      </div>
    </div>
  );
};

const Dashboard = ({ setActiveSection }) => (
  <div>
    <h3 className="text-xl mb-4">Dashboard</h3>
    <div className="grid grid-cols-3 gap-4 mb-8">
      <div className="bg-gray-700 p-4 rounded">
        <h4 className="text-lg">Total Users</h4>
        <p className="text-2xl">150</p>
      </div>
      <div className="bg-gray-700 p-4 rounded">
        <h4 className="text-lg">Total Recipes</h4>
        <p className="text-2xl">75</p>
      </div>
      <div className="bg-gray-700 p-4 rounded">
        <h4 className="text-lg">Total Reviews</h4>
        <p className="text-2xl">300</p>
      </div>
    </div>
    <div>
      <h4 className="text-lg mb-2">Recent Users</h4>
      <UserManagement limit={10} />
      <button
        className="bg-blue-500 text-white px-4 py-2 mt-2"
        onClick={() => setActiveSection("UserManagement")}
      >
        View More
      </button>
    </div>
    <div className="mt-8">
      <h4 className="text-lg mb-2">Recent Recipes</h4>
      <RecipeManagement limit={10} />
      <button
        className="bg-blue-500 text-white px-4 py-2 mt-2"
        onClick={() => setActiveSection("RecipeManagement")}
      >
        View More
      </button>
    </div>
    <div className="mt-8">
      <h4 className="text-lg mb-2">Recent Reviews</h4>
      <RecipeReviews limit={10} />
      <button
        className="bg-blue-500 text-white px-4 py-2 mt-2"
        onClick={() => setActiveSection("RecipeReviews")}
      >
        View More
      </button>
    </div>
  </div>
);

const UserManagement = ({ limit }) => {
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    // Add more user data as needed
  ];

  return (
    <div>
      <h3 className="text-xl mb-4">User Management</h3>
      <table className="min-w-full bg-gray-800 text-white border-collapse">
        <thead>
          <tr>
            <th className="py-2 px-4 border border-gray-700 text-left">ID</th>
            <th className="py-2 px-4 border border-gray-700 text-left">Name</th>
            <th className="py-2 px-4 border border-gray-700 text-left">
              Email
            </th>
            <th className="py-2 px-4 border border-gray-700 text-left">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users.slice(0, limit).map((user) => (
            <tr key={user.id}>
              <td className="py-2 px-4 border border-gray-700">{user.id}</td>
              <td className="py-2 px-4 border border-gray-700">{user.name}</td>
              <td className="py-2 px-4 border border-gray-700">{user.email}</td>
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

const RecipeManagement = ({ limit }) => {
  const recipes = [
    { id: 1, title: "Spaghetti Bolognese", author: "Jane Doe" },
    // Add more recipe data as needed
  ];

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
          {recipes.slice(0, limit).map((recipe) => (
            <tr key={recipe.id}>
              <td className="py-2 px-4 border border-gray-700">{recipe.id}</td>
              <td className="py-2 px-4 border border-gray-700">
                {recipe.title}
              </td>
              <td className="py-2 px-4 border border-gray-700">
                {recipe.author}
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

const RecipeReviews = ({ limit }) => {
  const reviews = [
    {
      id: 1,
      recipe: "Spaghetti Bolognese",
      reviewer: "John Smith",
      review: "Delicious recipe!",
    },
    // Add more review data as needed
  ];

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
          {reviews.slice(0, limit).map((review) => (
            <tr key={review.id}>
              <td className="py-2 px-4 border border-gray-700">{review.id}</td>
              <td className="py-2 px-4 border border-gray-700">
                {review.recipe}
              </td>
              <td className="py-2 px-4 border border-gray-700">
                {review.reviewer}
              </td>
              <td className="py-2 px-4 border border-gray-700">
                {review.review}
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

export default AdminDashboard;
