import axios from "axios";
import React, { useEffect, useState } from "react";
import ProfileModal from "../ProfileModal";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get("http://localhost:8000/api-auth/admin/profiles/", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleView = (user) => {
    setSelectedUser(user); // Open modal with user details
  };

  const closeModal = () => {
    setSelectedUser(null); // Close modal
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p>Loading users...</p>;

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h3 className="text-2xl mb-6">User Management</h3>

      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6 p-2 border border-gray-700 bg-gray-800 text-white rounded w-full lg:w-1/2"
      />

      <table className="min-w-full bg-gray-800 text-white border-collapse">
        <thead>
          <tr>
            <th className="py-2 px-4 border border-gray-700 text-left">ID</th>
            <th className="py-2 px-4 border border-gray-700 text-left">Name</th>
            <th className="py-2 px-4 border border-gray-700 text-left">Email</th>
            <th className="py-2 px-4 border border-gray-700 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td className="py-2 px-4 border border-gray-700">{user.id}</td>
              <td className="py-2 px-4 border border-gray-700">{user.name}</td>
              <td className="py-2 px-4 border border-gray-700">{user.email}</td>
              <td className="py-2 px-4 border border-gray-700">
                <button
                  className="bg-blue-500 text-white px-4 py-1 rounded"
                  onClick={() => handleView(user)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Render Modal */}
      {selectedUser && <ProfileModal user={selectedUser} onClose={closeModal} />}
    </div>
  );
};

export default UserManagement;
