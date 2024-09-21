import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import AdminDashboard from "../pages/AdminDashboard";
import CookDashboard from "../pages/CookDashboard";
import Home from "../pages/Home";
import Loading from "../pages/Loading";
import Login from "../pages/Login";
import MealPlannerDashboard from "../pages/MealPlannerDashboard";
import NotFound from "../pages/NotFound";
import Profile from "../pages/Profile";
import ProfileEdit from "../pages/ProfileEdit";
import RecipeDetails from "../pages/RecipeDetails";
import Recipes from "../pages/Recipes";
import Register from "../pages/Register";
import SearchRecipe from "../pages/SearchRecipe";

const RouteConfig = () => {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/search" element={<SearchRecipe />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<ProfileEdit />} />
        <Route path="/planner-dashboard" element={<MealPlannerDashboard />} />
        <Route path="/cook-dashboard" element={<CookDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default RouteConfig;