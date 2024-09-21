import React from "react";

const RecipeCardDetailed = ({ recipe }) => {
  return (
    <div className="border rounded-lg p-4 bg-white shadow-md">
      <h2 className="text-xl font-bold">{recipe.title}</h2>
      <p>{recipe.description}</p>

      <h3 className="font-semibold mt-4">Ingredients:</h3>
      <ul>
        {recipe.ingredients.map((ingredient) => (
          <li key={ingredient.id}>
            {ingredient.quantity} {ingredient.unit} of {ingredient.name}
          </li>
        ))}
      </ul>

      <h3 className="font-semibold mt-4">Instructions:</h3>
      <ol>
        {recipe.instructions.map((instruction) => (
          <li key={instruction.id}>
            Step {instruction.step_number}: {instruction.instruction_text}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default RecipeCardDetailed;
