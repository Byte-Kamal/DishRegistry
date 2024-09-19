import React from "react";

const SmallReviewCard = ({ profileImage, authorName, rating, comments }) => {
  return (
    <div className="w-full max-w-md bg-gray-800 text-white p-4 rounded-lg shadow-lg flex flex-col sm:flex-row items-start sm:items-center">
      <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
        <img
          src={profileImage}
          alt={`${authorName}'s profile`}
          className="w-16 h-16 sm:w-12 sm:h-12 rounded-full"
        />
      </div>
      <div className="flex-1">
        <h4 className="text-xl font-semibold mb-2">{authorName}</h4>
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, index) => (
            <svg
              key={index}
              className={`w-5 h-5 ${
                index < rating ? "text-yellow-500" : "text-gray-500"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.392 2.46a1 1 0 00-.364 1.118l1.286 3.97c.3.921-.755 1.688-1.54 1.118l-3.392-2.46a1 1 0 00-1.176 0l-3.392 2.46c-.784.57-1.838-.197-1.54-1.118l1.286-3.97a1 1 0 00-.364-1.118L2.245 9.397c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.97z" />
            </svg>
          ))}
        </div>
        <p className="text-base">{comments}</p>
      </div>
    </div>
  );
};

export default SmallReviewCard;
