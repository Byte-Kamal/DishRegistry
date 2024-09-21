import React, { useEffect, useState } from "react";

const ShoppingList = () => {
  const [shoppingItems, setShoppingItems] = useState([]);

  useEffect(() => {
    // Fetch shopping list from the server
    const fetchShoppingList = async () => {
      try {
        const token = localStorage.getItem('accessToken'); // Retrieve the token from local storage
        const response = await fetch("http://localhost:8000/api/mealplans/generate-shopping-list/", {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`, // Include the token in the request headers
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ meal_plan_day: "Monday" }) // Replace "Monday" with the desired day
        });
        const data = await response.json();
        setShoppingItems(data.ingredients);
      } catch (error) {
        console.error("Error fetching shopping list:", error);
      }
    };

    fetchShoppingList();
  }, []);

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

export default ShoppingList;