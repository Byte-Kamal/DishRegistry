import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import AdminDashboard from "../pages/AdminDashboard";
import CookDashboard from "../pages/CookDashboard";
import Home from "../pages/Home";
import Login from "../pages/Login";
import PlannerDashboard from "../pages/PlannerDashboard";
import Recipes from "../pages/Recipes";
import Register from "../pages/Register";
// import Search from "../pages/Search";
import RecipeDetails from "../pages/RecipeDetails";
import RecipeSearch from "../pages/RecipeSearch";
import UserDashboard from "../pages/UserDashboard";

const RouteConfig = () => {
  return (
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/recipes" element={<Recipes />} />
          {/* <Route path="/search" element={<Search />} /> */}
          <Route path="/recipe-details/:id" element={<RecipeDetails />} />
          <Route path="/search" element={<RecipeSearch />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/cook-dashboard" element={<CookDashboard />} />
          <Route path="/planner-dashboard" element={<PlannerDashboard />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
        </Routes>
        <Footer />
      </Router>
  );
};

export default RouteConfig;