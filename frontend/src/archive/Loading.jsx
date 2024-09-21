import React from 'react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="text-center">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32 mb-4"></div>
        <h2 className="text-2xl font-semibold">Loading...</h2>
        <p className="text-gray-400">Please wait while we load the content.</p>
      </div>
    </div>
  );
};

export default Loading;