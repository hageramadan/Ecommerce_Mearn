import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import UserLayout from "./Layouts/UserLayout";
import Home from "./Pages/Home/Home";
import Products from "./Pages/Products/Products";
import Cart from "./Pages/Cart/Cart";
import AdminLayout from "./Layouts/AdminLayout";
import Dashboard from "./Pages/Admin/Dashboard";
import Orders from "./Pages/Admin/Orders";
import Register from "./Pages/Register/RefactorRegister.js";
import Order from "./Pages/Orders/Order";
import ProductDetails from "./Pages/Product-Details/ProductDetails.js";
import Login from "./Pages/Login/RefactorLogin.js";
import MangeProducts from "./Pages/Admin/Products.js";
import ProtectedRoute from "./Components/Router/ProtectedRoute.js";
import { ToastContainer } from "react-toastify";
import Wishlist from "./Pages/Wishlist/WishlistRefactor.js";
import Categories from "./Pages/Admin/Categories.js";

function AppContent() {
  const theme = useSelector((state) => state.themeReducer);

  // Define classes based on theme
  const bgClass = theme === "dark" ? "bg-gray-900" : "bg-gray-50";
  const textClass = theme === "dark" ? "text-gray-100" : "text-gray-900";

  return (
    <div className={`min-h-screen ${bgClass} ${textClass} transition-colors duration-300`}>
      <Routes>
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/details/:id" element={<ProductDetails />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<Products />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/Order" element={<Order />} />
          </Route>
        </Route>
        {/* Routes للادمن */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<MangeProducts />} />
          <Route path="categories" element={<Categories />} />
          <Route path="orders" element={<Orders />} />
        </Route>
      </Routes>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;