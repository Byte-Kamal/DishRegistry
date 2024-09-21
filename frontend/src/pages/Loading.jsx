import React from 'react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 border-4 border-purple-500 border-dashed rounded-full animate-spin"></div>
        <div className="text-xl font-medium text-white">Loading...</div>
      </div>
    </div>
  );
};

export default Loading;