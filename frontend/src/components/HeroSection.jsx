import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <>
      <section
        className="bg-gray-100 py-5 size-max bg-cover bg-center w-full h-[90vh]"
        style={{
          backgroundImage: `url("https://images.pexels.com/photos/1907227/pexels-photo-1907227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")`,
        }}
      >
        <div className="container mx-auto px-4 flex items-center justify-between h-full">
          <div className="md:w-1/2 mt-1 md:mt-0">
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold text-white mb-4">
                Welcome to Dish<span className="text-red-600">Registry</span>
              </h1>
              <p className="text-lg text-white mb-4 text-justify mr-20">
              DishRegistry is a curated platform for discovering, organizing, and sharing diverse recipes, making it easy for users to explore and personalize their culinary journey.
              </p>
              <Link to={"/recipes"}>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
                  View Recipes
                </button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 mt-1 md:mt-0">
            <img
              src="https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Hero-Image"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
