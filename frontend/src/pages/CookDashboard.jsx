import React, { useEffect, useState } from "react";

const CookDashboard = () => {
  const [activeSection, setActiveSection] = useState("MyRecipes");

  const renderSection = () => {
    switch (activeSection) {
      case "MyRecipes":
        return <MyRecipes />;
      case "RecipeLikesComments":
        return <RecipeLikesComments />;
      case "SubmitNewRecipe":
        return <SubmitNewRecipe />;
      default:
        return <MyRecipes />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <div className="flex flex-1">
        <div className="w-1/4 bg-gray-800 p-4">
          <h2 className="text-2xl mb-4">Cook Dashboard</h2>
          <ul>
            <li
              className="mb-2 cursor-pointer"
              onClick={() => setActiveSection("MyRecipes")}
            >
              My Recipes
            </li>
            <li
              className="mb-2 cursor-pointer"
              onClick={() => setActiveSection("RecipeLikesComments")}
            >
              Recipe Likes & Comments
            </li>
            <li
              className="mb-2 cursor-pointer"
              onClick={() => setActiveSection("SubmitNewRecipe")}
            >
              Submit New Recipe
            </li>
          </ul>
        </div>
        <div className="w-3/4 p-4">{renderSection()}</div>
      </div>
    </div>
  );
};

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/recipe/");
      const data = await response.json();
      setRecipes(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const deleteRecipe = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/recipe/${id}/`, {
        method: "DELETE",
      });
      if (response.ok) {
        setRecipes(recipes.filter((recipe) => recipe.id !== id));
      } else {
        alert("Failed to delete recipe.");
      }
    } catch (error) {
      console.error("Error deleting recipe:", error);
      alert("Error deleting recipe.");
    }
  };

  return (
    <div>
      <h3 className="text-xl mb-4">My Recipes</h3>
      <table className="min-w-full bg-gray-800 text-white border-collapse">
        <thead>
          <tr>
            <th className="py-2 px-4 border border-gray-700 text-left">ID</th>
            <th className="py-2 px-4 border border-gray-700 text-left">
              Title
            </th>
            <th className="py-2 px-4 border border-gray-700 text-left">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {recipes.map((recipe) => (
            <tr key={recipe.id}>
              <td className="py-2 px-4 border border-gray-700">{recipe.id}</td>
              <td className="py-2 px-4 border border-gray-700">
                {recipe.title}
              </td>
              <td className="py-2 px-4 border border-gray-700">
                <button className="bg-blue-500 text-white px-2 py-1 mr-2">
                  Read
                </button>
                <button className="bg-yellow-500 text-white px-2 py-1 mr-2">
                  Update
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1"
                  onClick={() => deleteRecipe(recipe.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const RecipeLikesComments = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/review/");
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  return (
    <div>
      <h3 className="text-xl mb-4">Recipe Likes & Comments</h3>
      <table className="min-w-full bg-gray-800 text-white border-collapse">
        <thead>
          <tr>
            <th className="py-2 px-4 border border-gray-700 text-left">
              Recipe
            </th>
            <th className="py-2 px-4 border border-gray-700 text-left">
              Likes
            </th>
            <th className="py-2 px-4 border border-gray-700 text-left">
              Comments
            </th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr key={review.id}>
              <td className="py-2 px-4 border border-gray-700">
                {review.recipe.title}
              </td>
              <td className="py-2 px-4 border border-gray-700">
                {review.likes}
              </td>
              <td className="py-2 px-4 border border-gray-700">
                {review.comment}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const SubmitNewRecipe = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Appetizer");
  const [cookingTime, setCookingTime] = useState("");
  const [serving, setServing] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [ingredients, setIngredients] = useState([
    { name: "", quantity: "", unit: "" },
  ]);
  const [instructions, setInstructions] = useState([
    { step_number: 1, instruction_text: "" },
  ]);
  const [image, setImage] = useState(null);

  const addIngredient = () =>
    setIngredients([...ingredients, { name: "", quantity: "", unit: "" }]);
  const addInstruction = () =>
    setInstructions([
      ...instructions,
      { step_number: instructions.length + 1, instruction_text: "" },
    ]);

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
  };

  const handleInstructionChange = (index, value) => {
    const newInstructions = [...instructions];
    newInstructions[index].instruction_text = value;
    setInstructions(newInstructions);
  };

  const handleRemoveIngredient = (index) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(
      newIngredients.length
        ? newIngredients
        : [{ name: "", quantity: "", unit: "" }]
    );
  };

  const handleRemoveInstruction = (index) => {
    const newInstructions = instructions.filter((_, i) => i !== index);
    setInstructions(
      newInstructions.length
        ? newInstructions
        : [{ step_number: 1, instruction_text: "" }]
    );
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("prep_time", prepTime);
    formData.append("cooking_time", cookingTime);
    formData.append("serving_people", serving);
    formData.append("ingredients", JSON.stringify(ingredients));
    formData.append("instructions", JSON.stringify(instructions));
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await fetch("http://localhost:8000/api/recipe/", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        alert("Recipe submitted successfully!");
      } else {
        alert("Failed to submit recipe.");
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 bg-gray-700 text-white"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 bg-gray-700 text-white"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-300">Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full p-2 bg-gray-700 text-white"
          />
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="Recipe"
              className="mt-4"
              style={{ width: "200px", height: "200px" }}
            />
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-300">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 bg-gray-700 text-white"
          >
            <option>Appetizer</option>
            <option>Main Course</option>
            <option>Dessert</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-300">Cooking Time (minutes)</label>
          <input
            type="number"
            value={cookingTime}
            onChange={(e) => setCookingTime(e.target.value)}
            className="w-full p-2 bg-gray-700 text-white"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300">
            Serving for Number of People
          </label>
          <input
            type="number"
            value={serving}
            onChange={(e) => setServing(e.target.value)}
            className="w-full p-2 bg-gray-700 text-white"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300">
            Preparation Time (minutes)
          </label>
          <input
            type="number"
            value={prepTime}
            onChange={(e) => setPrepTime(e.target.value)}
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
                type="text"
                value={instruction.instruction_text}
                onChange={(e) => handleInstructionChange(index, e.target.value)}
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

export default CookDashboard;
