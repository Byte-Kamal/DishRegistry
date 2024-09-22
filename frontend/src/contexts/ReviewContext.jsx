import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const ReviewContext = createContext();

export const ReviewProvider = ({ children }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const userGroup = localStorage.getItem('userGroup');
        if (!token) {
          setLoading(false);
          return;
        } else if (userGroup !== "Admin") {
          setLoading(false);
          return;
        }

        const response = await axios.get("http://localhost:8000/api/reviews/", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        console.log("Reviews fetched:", response.data);
        setReviews(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.error("Unauthorized: Redirecting to login...");
          // Handle redirect to login or show a message
        } else {
          console.error("Error fetching reviews:", error);
        }
      } finally {
        setLoading(false);
      }
    };


    fetchReviews();

  }, []);

  return (
    <ReviewContext.Provider value={{ reviews, loading }}>
      {children}
    </ReviewContext.Provider>
  );
};
