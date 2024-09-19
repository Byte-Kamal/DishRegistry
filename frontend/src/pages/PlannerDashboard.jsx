import React, { useState } from "react";

const PlannerDashboard = () => {
  const [activeSection, setActiveSection] = useState("MyMealsPlan");
  const [mealPlanToEdit, setMealPlanToEdit] = useState(null);

  const renderSection = () => {
    switch (activeSection) {
      case "MyMealsPlan":
        return (
          <MyMealsPlan
            setActiveSection={setActiveSection}
            setMealPlanToEdit={setMealPlanToEdit}
          />
        );
      case "RecommendRecipe":
        return <RecommendRecipe />;
      case "ShoppingList":
        return <ShoppingList />;
      case "SavedRecipe":
        return <SavedRecipe />;
      case "CreateEditMealPlan":
        return (
          <CreateEditMealPlan
            setActiveSection={setActiveSection}
            mealPlanToEdit={mealPlanToEdit}
            setMealPlanToEdit={setMealPlanToEdit}
          />
        );
      default:
        return (
          <MyMealsPlan
            setActiveSection={setActiveSection}
            setMealPlanToEdit={setMealPlanToEdit}
          />
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <div className="flex flex-1">
        <div className="w-1/4 bg-gray-800 p-4">
          <h2 className="text-2xl mb-4">Planner Dashboard</h2>
          <ul>
            <li
              className="mb-2 cursor-pointer"
              onClick={() => setActiveSection("MyMealsPlan")}
            >
              My Meals Plan
            </li>
            <li
              className="mb-2 cursor-pointer"
              onClick={() => setActiveSection("RecommendRecipe")}
            >
              Recommend Recipe
            </li>
            <li
              className="mb-2 cursor-pointer"
              onClick={() => setActiveSection("ShoppingList")}
            >
              Shopping List
            </li>
            <li
              className="mb-2 cursor-pointer"
              onClick={() => setActiveSection("SavedRecipe")}
            >
              Saved Recipe
            </li>
          </ul>
        </div>
        <div className="w-3/4 p-4">{renderSection()}</div>
      </div>
    </div>
  );
};

const MyMealsPlan = ({ setActiveSection, setMealPlanToEdit }) => {
  const [mealPlans, setMealPlans] = useState([
    {
      day: "Monday",
      meals: [
        "Breakfast: Pancakes",
        "Lunch: Chicken Salad",
        "Dinner: Spaghetti Bolognese",
      ],
    },
    {
      day: "Tuesday",
      meals: [
        "Breakfast: Omelette",
        "Lunch: Tuna Sandwich",
        "Dinner: Beef Stir Fry",
      ],
    },
    {
      day: "Wednesday",
      meals: [
        "Breakfast: Smoothie",
        "Lunch: Caesar Salad",
        "Dinner: Grilled Salmon",
      ],
    },
  ]);

  const deleteMealPlan = (index) => {
    const updatedMealPlans = mealPlans.filter((_, i) => i !== index);
    setMealPlans(updatedMealPlans);
  };

  const startEditing = (index) => {
    setMealPlanToEdit({ ...mealPlans[index], index });
    setActiveSection("CreateEditMealPlan");
  };

  return (
    <div>
      <h3 className="text-xl mb-4">My Meals Plan</h3>
      <button
        onClick={() => setActiveSection("CreateEditMealPlan")}
        className="bg-green-500 text-white px-4 py-2 mb-4"
      >
        Create New Meal Plan
      </button>
      <div className="space-y-4">
        {mealPlans.map((plan, index) => (
          <div key={index} className="bg-gray-800 p-4 rounded-lg shadow">
            <div className="flex justify-between items-center">
              <h4 className="text-lg mb-2">{plan.day}</h4>
              <div>
                <button
                  onClick={() => startEditing(index)}
                  className="bg-yellow-500 text-white px-4 py-2 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteMealPlan(index)}
                  className="bg-red-500 text-white px-4 py-2"
                >
                  Delete
                </button>
              </div>
            </div>
            <ul className="list-disc list-inside">
              {plan.meals.map((meal, mealIndex) => (
                <li key={mealIndex} className="text-gray-400">
                  {meal}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

const CreateEditMealPlan = ({
  setActiveSection,
  mealPlanToEdit,
  setMealPlanToEdit,
}) => {
  const [mealPlan, setMealPlan] = useState(
    mealPlanToEdit || { day: "", meals: ["", "", ""] }
  );

  const handleMealPlanChange = (mealIndex, value) => {
    const updatedMealPlan = { ...mealPlan };
    updatedMealPlan.meals[mealIndex] = value;
    setMealPlan(updatedMealPlan);
  };

  const saveMealPlan = () => {
    if (mealPlanToEdit) {
      // Update existing meal plan
      setMealPlanToEdit((prevMealPlans) => {
        const updatedMealPlans = [...prevMealPlans];
        updatedMealPlans[mealPlanToEdit.index] = mealPlan;
        return updatedMealPlans;
      });
    } else {
      // Create new meal plan
      setMealPlanToEdit((prevMealPlans) => [...prevMealPlans, mealPlan]);
    }
    setMealPlanToEdit(null);
    setActiveSection("MyMealsPlan");
  };

  return (
    <div>
      <h3 className="text-xl mb-4">
        {mealPlanToEdit ? "Edit Meal Plan" : "Create New Meal Plan"}
      </h3>
      <input
        type="text"
        placeholder="Day"
        value={mealPlan.day}
        onChange={(e) => setMealPlan({ ...mealPlan, day: e.target.value })}
        className="bg-gray-700 text-white p-2 rounded mb-2 w-full"
      />
      <ul className="list-disc list-inside">
        {mealPlan.meals.map((meal, mealIndex) => (
          <li key={mealIndex} className="text-gray-400">
            <input
              type="text"
              placeholder={`Meal ${mealIndex + 1}`}
              value={meal}
              onChange={(e) => handleMealPlanChange(mealIndex, e.target.value)}
              className="bg-gray-700 text-white p-2 rounded mb-2 w-full"
            />
          </li>
        ))}
      </ul>
      <button
        onClick={saveMealPlan}
        className="bg-blue-500 text-white px-4 py-2 mt-2"
      >
        {mealPlanToEdit ? "Update Meal Plan" : "Create Meal Plan"}
      </button>
      <button
        onClick={() => setActiveSection("MyMealsPlan")}
        className="bg-gray-500 text-white px-4 py-2 mt-2 ml-2"
      >
        Cancel
      </button>
    </div>
  );
};

const RecommendRecipe = () => {
  const recommendedRecipes = [
    {
      title: "Spaghetti Bolognese",
      description: "A classic Italian pasta dish.",
      image: "path/to/image1.jpg",
    },
    {
      title: "Chicken Curry",
      description: "A spicy and flavorful dish.",
      image: "path/to/image2.jpg",
    },
    {
      title: "Grilled Salmon",
      description: "A healthy and delicious fish dish.",
      image: "path/to/image3.jpg",
    },
  ];

  return (
    <div>
      <h3 className="text-xl mb-4">Recommend Recipe</h3>
      <div className="grid grid-cols-3 gap-4">
        {recommendedRecipes.map((recipe, index) => (
          <RecipeCard key={index} {...recipe} />
        ))}
      </div>
    </div>
  );
};

const ShoppingList = () => {
  const shoppingItems = [
    "Milk",
    "Eggs",
    "Bread",
    "Chicken Breast",
    "Broccoli",
    "Tomatoes",
    "Olive Oil",
    "Garlic",
    "Onions",
    "Pasta",
  ];

  return (
    <div>
      <h3 className="text-xl mb-4">Shopping List</h3>
      <ul className="list-disc list-inside bg-gray-800 p-4 rounded-lg shadow">
        {shoppingItems.map((item, index) => (
          <li key={index} className="text-gray-400">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

const SavedRecipe = () => {
  const [savedRecipes, setSavedRecipes] = useState([
    {
      title: "Chocolate Cake",
      description: "A rich and moist chocolate cake.",
      image: "path/to/image4.jpg",
    },
    {
      title: "Caesar Salad",
      description: "A fresh and healthy salad.",
      image: "path/to/image5.jpg",
    },
    {
      title: "Beef Stroganoff",
      description: "A creamy and savory beef dish.",
      image: "path/to/image6.jpg",
    },
  ]);

  const deleteSavedRecipe = (index) => {
    const updatedSavedRecipes = savedRecipes.filter((_, i) => i !== index);
    setSavedRecipes(updatedSavedRecipes);
  };

  return (
    <div>
      <h3 className="text-xl mb-4">Saved Recipe</h3>
      <div className="grid grid-cols-3 gap-4">
        {savedRecipes.map((recipe, index) => (
          <RecipeCard
            key={index}
            {...recipe}
            onDelete={() => deleteSavedRecipe(index)}
          />
        ))}
      </div>
    </div>
  );
};

const RecipeCard = ({ title, description, image, onDelete }) => (
  <div className="bg-gray-800 p-4 rounded-lg shadow-lg relative">
    <img
      src={image}
      alt={title}
      className="w-full h-48 object-cover rounded-t-lg"
    />
    <div className="p-4">
      <h3 className="text-xl mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
    {onDelete && (
      <button
        onClick={onDelete}
        className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
      >
        Delete
      </button>
    )}
  </div>
);

export default PlannerDashboard;
