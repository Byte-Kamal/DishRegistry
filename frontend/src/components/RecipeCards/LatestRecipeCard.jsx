import React from 'react';
import { Link } from 'react-router-dom';

const LatestRecipeCard = ({ id, image_url, title, description }) => {
    return (
        <>
            <Link to={`/recipe/${id}`} className="group">
                <div key={id} className="bg-gray-700 p-4 rounded-lg shadow-lg">
                    <img src={image_url} alt={title} className="w-full h-48 object-cover rounded-lg mb-4" />
                    <h2 className="text-2xl font-bold mb-2">{title}</h2>
                    <p className="text-gray-400">{description}</p>
                    <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">View Recipe</button>
                </div>
            </Link>
        </>
    );
};

export default LatestRecipeCard;