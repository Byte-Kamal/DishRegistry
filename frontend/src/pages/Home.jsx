import React, { useContext } from 'react';
import LatestRecipeCard from '../components/RecipeCards/LatestRecipeCard';
import OverlayRecipeCard from '../components/RecipeCards/OverlayRecipeCard';
import { RecipeContext } from '../contexts/RecipeContext';
import Loading from './Loading';

const Home = () => {
    const { recipes, loading } = useContext(RecipeContext);
    console.log(recipes);
    if (loading) return <><Loading /></>;
    const featuredRecipes = recipes.slice(0, 4);
    const latestRecipes = recipes.slice(4, 10);

    const followUsImages = [
        'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/842571/pexels-photo-842571.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/2641886/pexels-photo-2641886.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg',
        'https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/1391487/pexels-photo-1391487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/1639556/pexels-photo-1639556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    ];

    const handleSubmit = () => {
        window.location.href = '/recipes';
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Hero Section */}
            <div className="hero bg-cover bg-center h-96 flex items-center" style={{ backgroundImage: 'url(https://images.pexels.com/photos/1907227/pexels-photo-1907227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)' }}>
                <div className="container mx-auto text-left px-6">
                    <h1 className="text-5xl font-bold mb-4">Welcome to the Recipe Website</h1>
                    <p className="text-xl mb-6">Discover delicious recipes and culinary inspiration</p>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={()=> handleSubmit()}>Get Started</button>
                </div>
            </div>

            {/* Featured Recipes */}
            <div className="p-6">
                <h2 className="text-4xl font-bold mb-6">Featured Recipes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featuredRecipes.map(recipe => (
                        <OverlayRecipeCard
                            key={recipe.id}
                            id={recipe.id}
                            image={recipe.image_url}
                            title={recipe.title}
                        />
                    ))}
                </div>
            </div>

            {/* Latest Recipes */}
            <div className="p-6 bg-gray-800">
                <h2 className="text-4xl font-bold mb-6">Latest Recipes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {latestRecipes.map(recipe => (
                        <LatestRecipeCard
                            key={recipe.id}
                            id={recipe.id}
                            image_url={recipe.image_url}
                            title={recipe.title}
                            description={recipe.description}
                        />
                    ))}
                </div>
            </div>

            {/* Follow Us Section */}
            <div className="bg-gray-900 py-24">
                <div className="container mx-auto flex flex-col lg:flex-row items-center">
                    <div className="lg:w-1/2 text-left mb-12 lg:mb-0 px-6">
                        <h2 className="text-4xl font-bold text-white mb-6">Follow Us</h2>
                        <div className="flex space-x-6">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white text-3xl hover:text-gray-400 transition duration-300">
                                <i className="fab fa-facebook"></i>
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white text-3xl hover:text-gray-400 transition duration-300">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white text-3xl hover:text-gray-400 transition duration-300">
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-white text-3xl hover:text-gray-400 transition duration-300">
                                <i className="fab fa-youtube"></i>
                            </a>
                        </div>
                    </div>
                    <div className="lg:w-1/2 grid grid-cols-3 gap-4 pr-4">
                        {followUsImages.slice(0, 9).map((image, index) => (
                            <div key={index} className="relative w-full h-32 overflow-hidden bg-gray-700 rounded-lg transform transition duration-300 hover:scale-105">
                                <img src={image} alt={`Follow us image-${index + 1}`} className="object-cover w-full h-full transition duration-300 hover:scale-110" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;