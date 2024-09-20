import React from "react";

const SavedRecipe = () => {

  return (
    <div>
      <h3 className="text-xl mb-4">Saved Recipe</h3>
      <div className="grid grid-cols-3 gap-4">
        {/* {savedRecipes.map((recipe, index) => (
          <RecipeCard
            key={index}
            {...recipe}
            onDelete={() => deleteSavedRecipe(index)}
          />
        ))} */}
      </div>
    </div>
  );
};

export default SavedRecipe;