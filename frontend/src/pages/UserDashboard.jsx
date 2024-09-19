import React, { useState } from "react";

const UserDashboard = () => {
  const [activeSection, setActiveSection] = useState("ExploreRecipes");

  const renderSection = () => {
    switch (activeSection) {
      case "ExploreRecipes":
        return <ExploreRecipes />;
      case "SavedRecipes":
        return <SavedRecipes />;
      case "SavedMealPlan":
        return <SavedMealPlan />;
      case "RateAndReview":
        return <RateAndReview />;
      default:
        return <ExploreRecipes />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <div className="flex flex-1">
        <div className="w-1/4 bg-gray-800 p-4">
          <h2 className="text-2xl mb-4">User Dashboard</h2>
          <ul>
            <li
              className="mb-2 cursor-pointer"
              onClick={() => setActiveSection("ExploreRecipes")}
            >
              Explore Recipes
            </li>
            <li
              className="mb-2 cursor-pointer"
              onClick={() => setActiveSection("SavedRecipes")}
            >
              Saved Recipes
            </li>
            <li
              className="mb-2 cursor-pointer"
              onClick={() => setActiveSection("SavedMealPlan")}
            >
              Saved Meal Plan
            </li>
            <li
              className="mb-2 cursor-pointer"
              onClick={() => setActiveSection("RateAndReview")}
            >
              Rate and Review
            </li>
          </ul>
        </div>
        <div className="w-3/4 p-4">{renderSection()}</div>
      </div>
    </div>
  );
};

const ExploreRecipes = () => {
  const recipes = [
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
      <h3 className="text-xl mb-4">Explore Recipes</h3>
      <div className="grid grid-cols-3 gap-4">
        {recipes.map((recipe, index) => (
          <RecipeCard key={index} {...recipe} />
        ))}
      </div>
    </div>
  );
};

const SavedRecipes = () => {
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
      <h3 className="text-xl mb-4">Saved Recipes</h3>
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

const SavedMealPlan = () => {
  const mealPlans = [
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
  ];

  return (
    <div>
      <h3 className="text-xl mb-4">Saved Meal Plan</h3>
      <div className="space-y-4">
        {mealPlans.map((plan, index) => (
          <div key={index} className="bg-gray-800 p-4 rounded-lg shadow">
            <h4 className="text-lg mb-2">{plan.day}</h4>
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

const RateAndReview = () => {
  const reviews = [
    {
      recipe: "Spaghetti Bolognese",
      rating: 5,
      comment: "Delicious and easy to make!",
    },
    {
      recipe: "Chicken Curry",
      rating: 4,
      comment: "Very flavorful, but a bit too spicy for me.",
    },
    {
      recipe: "Grilled Salmon",
      rating: 5,
      comment: "Perfectly cooked and very healthy.",
    },
  ];

  return (
    <div>
      <h3 className="text-xl mb-4">Rate and Review</h3>
      <div className="space-y-4">
        {reviews.map((review, index) => (
          <div key={index} className="bg-gray-800 p-4 rounded-lg shadow">
            <h4 className="text-lg mb-2">{review.recipe}</h4>
            <p className="text-gray-400">Rating: {review.rating} / 5</p>
            <p className="text-gray-400">Comment: {review.comment}</p>
          </div>
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

export default UserDashboard;
