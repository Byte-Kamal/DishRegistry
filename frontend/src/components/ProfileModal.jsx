import React from "react";

const ProfileModal = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-11/12 max-w-lg">
        <h2 className="text-2xl font-bold text-white mb-4">User Profile</h2>
        <div className="space-y-2">
          <p>
            <span className="font-bold text-gray-400">ID:</span> {user.id}
          </p>
          <p>
            <span className="font-bold text-gray-400">Name:</span> {user.name}
          </p>
          <p>
            <span className="font-bold text-gray-400">Email:</span> {user.email}
          </p>
          <p>
            <span className="font-bold text-gray-400">Role:</span> {user.role}
          </p>
          <p>
            <span className="font-bold text-gray-400">Joined:</span> {new Date(user.date_joined).toLocaleDateString()}
          </p>
        </div>
        <button
          onClick={onClose}
          className="mt-4 bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ProfileModal;
