import React, { useRef } from "react";
// import RecipeList from "../components/OldrecipeCare/RecipeList";
// import { useRecipes } from "../contexts/RecipeContext";
import OverlayRecipeCard from "../components/RecipeCards/OverlayRecipeCard";

const Search = () => {
  const searchRef = useRef(null);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Search Recipes</h1>
      <div className="flex flex-col items-center">
        <input
          type="text"
          placeholder="Search by title"
          ref={searchRef}
          className="border border-gray-300 rounded-md p-2 mb-4 w-full max-w-md"
        />
        {/* <RecipeList recipes={recipes} /> */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {<OverlayRecipeCard />}
        {<OverlayRecipeCard />}
        {<OverlayRecipeCard />}
        </div>
      </div>
    </div>
  );
};

export default Search;
