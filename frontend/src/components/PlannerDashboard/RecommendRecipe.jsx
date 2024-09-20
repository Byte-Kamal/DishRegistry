import React from "react";

const RecommendRecipe = () => {

  return (
    <div>
      <h3 className="text-xl mb-4">Recommend Recipe</h3>
      <div className="grid grid-cols-3 gap-4">
        {/* {recommendedRecipes.map((recipe, index) => (
          <RecipeCard key={index} {...recipe} />
        ))} */}
      </div>
    </div>
  );
};

export default RecommendRecipe;