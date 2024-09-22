import React from 'react';

const LatestRecipeCard = ({ id, image, title, description }) => {
    const handleViewRecipe = () => {
        window.location.href = `/recipe/${id}`;
    };
    return (
        <>
            <div key={id} className="bg-gray-700 p-4 rounded-lg shadow-lg h-80 flex flex-col justify-between">
                <div>
                    <img src={image} alt={title} className="w-full h-32 object-cover rounded-lg mb-4" />
                    <h2 className="text-2xl font-bold mb-2">{title}</h2>
                    <p className="text-gray-400">{description}</p>
                </div>
                <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" onClick={() => { handleViewRecipe() }}>View Recipe</button>
            </div>
        </>
    );
};

export default LatestRecipeCard;