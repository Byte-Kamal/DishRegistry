import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserManagement = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleView = (e, userId) => {
    e.preventDefault();
    navigate(`/profile/${userId}`);
  };

  const handleDelete = async (e, userId) => {
    e.preventDefault();
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      try {
        const accessToken = localStorage.getItem("accessToken");
        await axios.delete(`http://localhost:8000/api-auth/profiles/${userId}/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        alert("User deleted successfully");
        // Refresh the user list
        setUsers(users.filter(user => user.id !== userId));
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("An error occurred. Please try again later.");
      }
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p>Loading users...</p>;

  return (
    <div>
      <h3 className="text-xl mb-4">User Management</h3>
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border border-gray-700 bg-gray-800 text-white"
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
                <button className="bg-blue-500 text-white px-2 py-1 mr-2" onClick={(e) => handleView(e, user.id)}>
                  View
                </button>
                <button className="bg-red-500 text-white px-2 py-1" onClick={(e) => handleDelete(e, user.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
