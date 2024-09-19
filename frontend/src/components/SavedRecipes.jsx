
const SavedRecipes = () => {

  return (
    <div>
      <h3 className="text-xl mb-4">Saved Recipes</h3>
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

export default SavedRecipes;