const OverlayRecipeCard = ({ image, title, style = "overlay" }) => {
    return (
      <>
        {/* Overlay Card Style: Title shows only on hover */}
        {style === "overlay" && (
          <div className="relative w-80 h-[32rem] rounded-lg overflow-hidden shadow-lg group">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <h2 className="text-2xl font-bold">{title}</h2>
            </div>
          </div>
        )}
  
        {/* Bottom Text Card Style */}
        {style === "bottom" && (
          <div className="relative w-80 h-[32rem] rounded-lg overflow-hidden shadow-lg">
            <img src={image} alt={title} className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-70 text-white">
              <h2 className="text-xl font-bold">{title}</h2>
            </div>
          </div>
        )}
      </>
    );
  };
  export default OverlayRecipeCard;
  