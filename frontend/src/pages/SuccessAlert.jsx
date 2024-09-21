import React from 'react';

const SuccessAlert = ({ message, onClose }) => {
  return (
    <div className="fixed top-4 right-4 p-4 bg-green-600 text-white rounded shadow-lg">
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button onClick={onClose} className="ml-4 text-xl">
          &times;
        </button>
      </div>
    </div>
  );
};

export default SuccessAlert;