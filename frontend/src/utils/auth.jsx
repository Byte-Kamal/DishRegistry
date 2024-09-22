export const isAuthenticated = () => {
  const token = localStorage.getItem("accessToken");
  // return false if token is not available 
  return !!token;
};