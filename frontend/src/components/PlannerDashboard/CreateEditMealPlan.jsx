import React, { useContext, useEffect, useRef, useState } from "react";
import { RecipeContext } from "../../contexts/RecipeContext";

const CreateEditMealPlan = ({
  setActiveSection,
  mealPlanToEdit,
  setMealPlanToEdit,
}) => {
  const dayRef = useRef();
  const [recipes, setRecipes] = useState(mealPlanToEdit ? mealPlanToEdit.recipes.map(recipe => recipe.id) : []);
  const { recipes: allRecipes, loading } = useContext(RecipeContext); // Use the RecipeContext to get all recipes and loading state

  useEffect(() => {
    if (mealPlanToEdit) {
      dayRef.current.value = mealPlanToEdit.day;
      setRecipes(mealPlanToEdit.recipes.map(recipe => recipe.id));
    }
  }, [mealPlanToEdit]);

  const handleRecipeChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setRecipes(selectedOptions);
  };

  const saveMealPlan = async () => {
    if (recipes.length === 0) {
      alert("The recipes list cannot be empty.");
      return;
    }

    const selectedRecipes = recipes.map(recipeId => {
      const recipe = allRecipes.find(r => r.id === Number(recipeId));
      return { id: recipe.id, title: recipe.title };
    });

    const mealPlan = {
      day: dayRef.current.value,
      recipes: selectedRecipes.map(recipe => recipe.id), // Send only the id to the backend
    };

    console.log('Saving meal plan:', mealPlan);

    try {
      const token = localStorage.getItem('accessToken'); // Retrieve the token from local storage
      const response = await fetch(`http://localhost:8000/api/mealplans/${mealPlanToEdit ? mealPlanToEdit.id + '/' : ''}`, {
        method: mealPlanToEdit ? "PUT" : "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Include the token in the request headers
        },
        body: JSON.stringify(mealPlan),
      });
      if (response.ok) {
        alert("Meal plan saved successfully!");
        setActiveSection("viewMealPlans");
        setMealPlanToEdit(null);
      } else {
        const errorData = await response.json();
        console.error("Failed to save meal plan:", errorData);
        alert(`Failed to save meal plan: ${JSON.stringify(errorData)}`);
      }
    } catch (error) {
      console.error("Error saving meal plan:", error);
      alert("Error saving meal plan.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3 className="text-xl mb-4">{mealPlanToEdit ? "Edit Meal Plan" : "Create Meal Plan"}</h3>
      <form onSubmit={(e) => { e.preventDefault(); saveMealPlan(); }}>
        <div className="mb-4">
          <label className="block text-gray-300">Day</label>
          <input
            type="text"
            ref={dayRef}
            className="w-full p-2 bg-gray-700 text-white"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300">Recipes</label>
          <select
            multiple
            value={recipes}
            onChange={handleRecipeChange}
            className="w-full p-2 bg-gray-700 text-white"
          >
            {allRecipes.map((recipe) => (
              <option key={recipe.id} value={recipe.id}>
                {recipe.title}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Save
        </button>
      </form>
    </div>
  );
};

export default CreateEditMealPlan;