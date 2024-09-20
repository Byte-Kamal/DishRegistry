import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const ReviewContext = createContext();

export const ReviewProvider = ({ children }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/reviews/");
        console.log("Reviews fetched:", response.data);
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
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
}