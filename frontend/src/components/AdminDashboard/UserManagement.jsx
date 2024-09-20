const UserManagement = ({ users }) => {

  return (
    <div>
      <h3 className="text-xl mb-4">User Management</h3>
      <table className="min-w-full bg-gray-800 text-white border-collapse">
        <thead>
          <tr>
            <th className="py-2 px-4 border border-gray-700 text-left">ID</th>
            <th className="py-2 px-4 border border-gray-700 text-left">Name</th>
            <th className="py-2 px-4 border border-gray-700 text-left">
              Email
            </th>
            <th className="py-2 px-4 border border-gray-700 text-left">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="py-2 px-4 border border-gray-700">{user.id}</td>
              <td className="py-2 px-4 border border-gray-700">{user.name}</td>
              <td className="py-2 px-4 border border-gray-700">{user.email}</td>
              <td className="py-2 px-4 border border-gray-700">
                <button className="bg-blue-500 text-white px-2 py-1 mr-2">
                  View
                </button>
                <button className="bg-yellow-500 text-white px-2 py-1 mr-2">
                  Edit
                </button>
                <button className="bg-red-500 text-white px-2 py-1">
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