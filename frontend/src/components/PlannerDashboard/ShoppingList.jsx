const ShoppingList = () => {

  return (
    <div>
      <h3 className="text-xl mb-4">Shopping List</h3>
      <ul className="list-disc list-inside bg-gray-800 p-4 rounded-lg shadow">
        {/* {shoppingItems.map((item, index) => (
          <li key={index} className="text-gray-400">
            {item}
          </li>
        ))} */}
      </ul>
    </div>
  );
};

export default ShoppingList;