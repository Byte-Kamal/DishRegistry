import axios from 'axios';
import React, { useContext, useRef, useState } from 'react';
import { RecipeContext } from '../contexts/RecipeContext';

const CookDashboard = () => {
  const { recipes, loading } = useContext(RecipeContext);
  const [editRecipeId, setEditRecipeId] = useState(null);
  const titleRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const cookingTimeRef = useRef();
  const servingRef = useRef();
  const prepTimeRef = useRef();
  const tagsRef = useRef();
  const [ingredients, setIngredients] = useState([{ name: '', quantity: '', unit: '' }]);
  const [instructions, setInstructions] = useState([{ step_number: 1, instruction_text: '' }]);

  const handleAddIngredient = () => setIngredients([...ingredients, { name: '', quantity: '', unit: '' }]);
  const handleAddInstruction = () => setInstructions([...instructions, { step_number: instructions.length + 1, instruction_text: '' }]);

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

  const handleRemoveIngredient = (index) => setIngredients(ingredients.filter((_, i) => i !== index));
  const handleRemoveInstruction = (index) => setInstructions(instructions.filter((_, i) => i !== index).map((instruction, i) => ({ ...instruction, step_number: i + 1 })));

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
      ingredients,
      instructions,
    };

    const token = localStorage.getItem('accessToken'); // Get the token from local storage

    try {
      if (editRecipeId) {
        // Edit Recipe
        await axios.put(`http://localhost:8000/api/recipes/${editRecipeId}/`, recipeData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert('Recipe updated successfully!');
      } else {
        // Add New Recipe
        await axios.post('http://localhost:8000/api/recipes/', recipeData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert('Recipe submitted successfully!');
      }
      resetForm();
      window.location.reload();
    } catch (error) {
      console.error('Error submitting recipe:', error);
      alert('Error submitting recipe.');
    }
  };

  const handleEdit = (recipe) => {
    setEditRecipeId(recipe.id);
    titleRef.current.value = recipe.title;
    descriptionRef.current.value = recipe.description;
    categoryRef.current.value = recipe.category;
    cookingTimeRef.current.value = recipe.cooking_time;
    servingRef.current.value = recipe.servings;
    prepTimeRef.current.value = recipe.prep_time;
    tagsRef.current.value = recipe.tags;
    setIngredients(recipe.ingredients);
    setInstructions(recipe.instructions);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('accessToken'); // Get the token from local storage

    try {
      await axios.delete(`http://localhost:8000/api/recipes/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Recipe deleted successfully!');
    } catch (error) {
      console.error('Error deleting recipe:', error);
      alert('Error deleting recipe.');
    }
  };

  const resetForm = () => {
    setEditRecipeId(null);
    titleRef.current.value = '';
    descriptionRef.current.value = '';
    categoryRef.current.value = 'Appetizer';
    cookingTimeRef.current.value = '';
    servingRef.current.value = '';
    prepTimeRef.current.value = '';
    tagsRef.current.value = '';
    setIngredients([{ name: '', quantity: '', unit: '' }]);
    setInstructions([{ step_number: 1, instruction_text: '' }]);
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <div className="flex-1 p-6">
        <h2 className="text-4xl font-bold mb-6">{editRecipeId ? 'Edit Recipe' : 'Submit New Recipe'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300">Recipe Title</label>
            <input type="text" ref={titleRef} className="w-full p-2 bg-gray-700 text-white" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">Description</label>
            <textarea ref={descriptionRef} className="w-full p-2 bg-gray-700 text-white"></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">Category</label>
            <select ref={categoryRef} className="w-full p-2 bg-gray-700 text-white">
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
            <input type="number" ref={cookingTimeRef} className="w-full p-2 bg-gray-700 text-white" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">Serving for Number of People</label>
            <input type="number" ref={servingRef} className="w-full p-2 bg-gray-700 text-white" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">Preparation Time (minutes)</label>
            <input type="number" ref={prepTimeRef} className="w-full p-2 bg-gray-700 text-white" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">Tags</label>
            <input type="text" ref={tagsRef} className="w-full p-2 bg-gray-700 text-white" />
          </div>

          {/* Ingredients */}
          <div className="mb-4">
            <label className="block text-gray-300">Ingredients</label>
            {ingredients.map((ingredient, index) => (
              <div key={index} className="flex mb-2">
                <input
                  type="text"
                  value={ingredient.name}
                  onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                  placeholder="Name"
                  className="w-full p-2 bg-gray-700 text-white mr-2"
                />
                <input
                  type="number"
                  value={ingredient.quantity}
                  onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                  placeholder="Quantity"
                  className="w-full p-2 bg-gray-700 text-white mr-2"
                />
                <input
                  type="text"
                  value={ingredient.unit}
                  onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                  placeholder="Unit"
                  className="w-full p-2 bg-gray-700 text-white mr-2"
                />
                <button type="button" onClick={handleAddIngredient} className="bg-green-500 text-white px-4 py-2 mr-2">Add</button>
                {ingredient.name && (
                  <button type="button" onClick={() => handleRemoveIngredient(index)} className="bg-red-500 text-white px-4 py-2">Remove</button>
                )}
              </div>
            ))}
          </div>

          {/* Instructions */}
          <div className="mb-4">
            <label className="block text-gray-300">Instructions</label>
            {instructions.map((instruction, index) => (
              <div key={index} className="flex mb-2">
                <input
                  type="text"
                  value={instruction.instruction_text}
                  onChange={(e) => handleInstructionChange(index, 'instruction_text', e.target.value)}
                  placeholder={`Step ${index + 1}`}
                  className="w-full p-2 bg-gray-700 text-white mr-2"
                />
                <button type="button" onClick={handleAddInstruction} className="bg-green-500 text-white px-4 py-2 mr-2">Add</button>
                {instruction.instruction_text && (
                  <button type="button" onClick={() => handleRemoveInstruction(index)} className="bg-red-500 text-white px-4 py-2">Remove</button>
                )}
              </div>
            ))}
          </div>

          <button type="submit" className="bg-blue-500 text-white px-4 py-2">{editRecipeId ? 'Update Recipe' : 'Submit Recipe'}</button>
        </form>

        {/* Recipe List */}
        <h2 className="text-2xl font-bold mt-10">Recipe List</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          recipes.map((recipe) => (
            <div key={recipe.id} className="border border-gray-700 p-4 mb-4">
              <h3 className="text-xl">{recipe.title}</h3>
              <p>{recipe.description}</p>
              <button onClick={() => handleEdit(recipe)} className="bg-yellow-500 text-white px-2 py-1 mr-2">Edit</button>
              <button onClick={() => handleDelete(recipe.id)} className="bg-red-500 text-white px-2 py-1">Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CookDashboard;
