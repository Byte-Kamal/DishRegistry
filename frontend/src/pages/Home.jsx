import React, { useContext } from "react";
import HeroSection from "../components/HeroSection";
import OverlayRecipeCard from "../components/RecipeCards/OverlayRecipeCard";
import RecipeCardMinimalist from "../components/RecipeCards/RecipeCardMinimalist";
import { RecipeContext } from "../contexts/RecipeContext";

const Home = () => {
  const { recipes, loading } = useContext(RecipeContext);

  if (loading) return <p>Loading recipes...</p>;
  const featuredRecipes = recipes.slice(0, 4);
  const recentRecipes = recipes.slice(4, 10);

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <HeroSection />
      <div className="featureRecipeContainer text-center my-10">
        <h2 className="text-2xl font-bold mb-4">Featured Recipes</h2>
        <div className="recipeCardRow grid grid-cols-1 md:grid-cols-4 gap-4">
          {featuredRecipes.map((recipe) => (
            <OverlayRecipeCard key={recipe.id} id={recipe.id} image={recipe.image} title={recipe.title} />
          ))}
        </div>
      </div>
      <div className="featureRecipeContainer text-center my-10">
        <h2 className="text-2xl font-bold mb-4">Recent Recipes</h2>
        <div className="recipeCardRow grid grid-cols-1 md:grid-cols-3 gap-4">
          {recentRecipes.map((recipe) => (
            <RecipeCardMinimalist key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;