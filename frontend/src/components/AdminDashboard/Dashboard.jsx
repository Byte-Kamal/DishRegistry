
  import React, { useContext } from "react";
import { RecipeContext } from "../../contexts/RecipeContext";
import { ReviewContext } from "../../contexts/ReviewContext";
import { UserContext } from "../../contexts/UserContext";

  const Dashboard = () => {
    const { recipes, loadingRecipe } = useContext(RecipeContext);
    const { reviews, loadingReview } = useContext(ReviewContext);
    const { users, loadingUser } = useContext(UserContext);
  
    if (loadingRecipe) return <p>Loading recipes...</p>;
    if (loadingReview) return <p>Loading reviews...</p>;
    if (loadingUser) return <p>Loading users...</p>;
  
  return (
    <div>
      <h3 className="text-xl mb-4">Dashboard</h3>
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-700 p-4 rounded">
          <h4 className="text-lg">Total Users</h4>
          <p className="text-2xl">{users ? users.length : 0}</p>
        </div>
        <div className="bg-gray-700 p-4 rounded">
          <h4 className="text-lg">Total Recipes</h4>
          <p className="text-2xl">{recipes ? recipes.length : 0}</p>
        </div>
        <div className="bg-gray-700 p-4 rounded">
          <h4 className="text-lg">Total Reviews</h4>
          <p className="text-2xl">{reviews ? reviews.length : 0}</p>
        </div>
      </div>
      
    </div>
  );
};

export default Dashboard;