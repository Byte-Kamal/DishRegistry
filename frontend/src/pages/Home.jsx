import { useContext } from "react";
import HeroSection from "../components/HeroSection";
import OverlayRecipeCard from "../components/RecipeCards/OverlayRecipeCard";
import RecipeCard from "../components/RecipeCards/RecipeCard";
import { RecipeContext } from "../contexts/RecipeContext";

const Home = () => {

  const { recipes, loading } = useContext(RecipeContext);

  if (loading) return <p>Loading recipes...</p>;
  const featuredRecipes = recipes.slice(0, 4);
  const recentRecipes = recipes.slice(4, 10);

  return (
    <>
      <HeroSection />
      <div className="featureRecipeContainer text-center my-10">
        <h2 className="text-2xl font-bold mb-4">Featured Recipes</h2>
        <div className="recipeCardRow flex flex-row justify-center gap-4">
          {featuredRecipes.map((recipe) => (
            <OverlayRecipeCard key={recipe.id} id={recipe.id} image={recipe.image} title={recipe.title} />
          ))  
          }
        </div>
      </div>
      <div className="featureRecipeContainer text-center my-10">
      <h2 className="text-2xl font-bold mb-4">Recent Recipes</h2>
      <div className="recipeCardRow flex flex-wrap justify-center gap-4">
        {recentRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
    </>
  );
};

export default Home;
