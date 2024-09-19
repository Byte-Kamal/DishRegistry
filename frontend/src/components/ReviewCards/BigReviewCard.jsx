import React from "react";

const BigReviewCard = ({
  imageUrl,
  rating,
  comments,
  authorName,
  profileImage,
  authorTag,
}) => {
  return (
    <div className="w-full max-w-3xl bg-gray-800 text-white p-6 rounded-lg shadow-xl">
      {/* Top Image */}
      <div className="relative w-full h-80">
        <img
          src={imageUrl}
          alt="Review"
          className="object-cover w-full h-full rounded-t-lg"
        />
      </div>

      {/* Rating Section */}
      <div className="flex items-center justify-center my-4">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            className={`w-8 h-8 ${
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

      {/* Comments */}
      <p className="text-lg mb-6">{comments}</p>

      {/* Author Details */}
      <div className="flex items-center">
        <img
          src={profileImage}
          alt={`${authorName}'s profile`}
          className="w-16 h-16 mr-4 rounded-full"
        />
        <div>
          <h4 className="text-2xl font-semibold">{authorName}</h4>
          <span className="text-gray-400">{authorTag}</span>
        </div>
      </div>
    </div>
  );
};

export default BigReviewCard;
