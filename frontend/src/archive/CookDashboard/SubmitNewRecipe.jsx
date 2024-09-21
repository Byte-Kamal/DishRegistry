import React, { useRef, useState } from "react";

const SubmitNewRecipe = () => {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const cookingTimeRef = useRef();
  const servingRef = useRef();
  const prepTimeRef = useRef();
  const imageRef = useRef();
  const tagsRef = useRef();
  const [ingredients, setIngredients] = useState([{ name: "", quantity: "", unit: "" }]);
  const [instructions, setInstructions] = useState([{ step_number: 1, instruction_text: "" }]);

  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", quantity: "", unit: "" }]);
  };

  const addInstruction = () => {
    setInstructions([...instructions, { step_number: instructions.length + 1, instruction_text: "" }]);
  };

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
  };

  const handleInstructionChange = (index, field, value) => {
    const newInstructions = [...instructions];
    newInstructions[index][field] = value;
    setInstructions(newInstructions);
  };

  const handleRemoveIngredient = (index) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  const handleRemoveInstruction = (index) => {
    const newInstructions = instructions.filter((_, i) => i !== index);
    setInstructions(newInstructions.map((instruction, i) => ({ ...instruction, step_number: i + 1 })));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const recipeData = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      category: categoryRef.current.value,
      cooking_time: cookingTimeRef.current.value,
      servings: servingRef.current.value,
      prep_time: prepTimeRef.current.value,
      tags: tagsRef.current.value,
      ingredients: ingredients,
      instructions: instructions,
    };
    console.log("Recipe Data:", recipeData);
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("http://localhost:8000/api/recipes/", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipeData),
      });
  
      if (response.ok) {
        alert("Recipe submitted successfully!");
        titleRef.current.value = "";
        descriptionRef.current.value = "";
        categoryRef.current.value = "Appetizer";
        cookingTimeRef.current.value = "";
        servingRef.current.value = "";
        prepTimeRef.current.value = "";
        tagsRef.current.value = "";
        setIngredients([{ name: "", quantity: "", unit: "" }]);
        setInstructions([{ step_number: 1, instruction_text: "" }]);

      } else {
        console.log("Recipe Data:", recipeData);
        const errorData = await response.json();
        console.error("Failed to submit recipe:", errorData);
        alert(`Failed to submit recipe: ${JSON.stringify(errorData)}`);
      }
    } catch (error) {
      console.error("Error submitting recipe:", error);
      alert("Error submitting recipe.");
    }
  };
  

  return (
    <div>
      <h3 className="text-xl mb-4">Submit New Recipe</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-300">Recipe Title</label>
          <input
            type="text"
            ref={titleRef}
            className="w-full p-2 bg-gray-700 text-white"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300">Description</label>
          <textarea
            ref={descriptionRef}
            className="w-full p-2 bg-gray-700 text-white"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-300">Image</label>
          <input
            type="file"
            ref={imageRef}
            className="w-full p-2 bg-gray-700 text-white"
          />
          {imageRef.current && imageRef.current.files[0] && (
            <img
              src={URL.createObjectURL(imageRef.current.files[0])}
              alt="Recipe"
              className="mt-4"
              style={{ width: "200px", height: "200px" }}
            />
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-300">Category</label>
          <select
            ref={categoryRef}
            className="w-full p-2 bg-gray-700 text-white"
          >
            <option>Appetizer</option>
            <option>Main Course</option>
            <option>Dessert</option>
            <option>Drinks</option>
            <option>Snacks</option>
            <option>Salad</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-300">Cooking Time (minutes)</label>
          <input
            type="number"
            ref={cookingTimeRef}
            className="w-full p-2 bg-gray-700 text-white"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300">
            Serving for Number of People
          </label>
          <input
            type="number"
            ref={servingRef}
            className="w-full p-2 bg-gray-700 text-white"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300">
            Preparation Time (minutes)
          </label>
          <input
            type="number"
            ref={prepTimeRef}
            className="w-full p-2 bg-gray-700 text-white"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300">Tags</label>
          <input
            type="text"
            ref={tagsRef}
            className="w-full p-2 bg-gray-700 text-white"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300">Ingredients</label>
          {ingredients.map((ingredient, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="text"
                value={ingredient.name}
                onChange={(e) =>
                  handleIngredientChange(index, "name", e.target.value)
                }
                placeholder="Name"
                className="w-full p-2 bg-gray-700 text-white mr-2"
              />
              <input
                type="number"
                value={ingredient.quantity}
                onChange={(e) =>
                  handleIngredientChange(index, "quantity", e.target.value)
                }
                placeholder="Quantity"
                className="w-full p-2 bg-gray-700 text-white mr-2"
              />
              <input
                type="text"
                value={ingredient.unit}
                onChange={(e) =>
                  handleIngredientChange(index, "unit", e.target.value)
                }
                placeholder="Unit"
                className="w-full p-2 bg-gray-700 text-white mr-2"
              />
              <button
                type="button"
                onClick={addIngredient}
                className="bg-green-500 text-white px-4 py-2 mr-2"
              >
                Add
              </button>
              {ingredient.name && (
                <button
                  type="button"
                  onClick={() => handleRemoveIngredient(index)}
                  className="bg-red-500 text-white px-4 py-2"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="mb-4">
          <label className="block text-gray-300">Instructions</label>
          {instructions.map((instruction, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="number"
                value={instruction.step_number}
                onChange={(e) => handleInstructionChange(index, "step_number", e.target.value)}
                placeholder="Step Number"
                className="w-1/4 p-2 bg-gray-700 text-white mr-2"
              />
              <input
                type="text"
                value={instruction.instruction_text}
                onChange={(e) => handleInstructionChange(index, "instruction_text", e.target.value)}
                placeholder="Instruction"
                className="w-full p-2 bg-gray-700 text-white mr-2"
              />
              <button
                type="button"
                onClick={addInstruction}
                className="bg-green-500 text-white px-4 py-2 mr-2"
              >
                Add
              </button>
              {instruction.instruction_text && (
                <button
                  type="button"
                  onClick={() => handleRemoveInstruction(index)}
                  className="bg-red-500 text-white px-4 py-2"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SubmitNewRecipe;