import { Link } from "react-router-dom";

const OverlayRecipeCard = ({ id, image, title }) => {

  return (
    <>
        <Link to={`/recipe/${id}`} className="group">
          <div className="relative w-80 h-[32rem] rounded-lg overflow-hidden shadow-lg group bg-gray-800">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <h2 className="text-2xl font-bold">{title}</h2>
            </div>
          </div>
        </Link>
    </>
  );
};

export default OverlayRecipeCard;