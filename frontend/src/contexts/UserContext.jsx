import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('accessToken')
        if (token !== "Admin") {
          return;
        }
        const response = await axios.get("http://localhost:8000/api-auth/admin/profiles/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        console.log("Users fetched:", response.data);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <UserContext.Provider value={{ users, loadingUser }}>
      {children}
    </UserContext.Provider>
  );
};
