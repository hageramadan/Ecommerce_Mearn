import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "./Layouts/UserLayout";
import Home from "./Pages/Home/Home";
import Products from "./Pages/Products/Products";
import Cart from "./Pages/Cart/Cart";
// import Wishlist from "./Pages/Wishlist/Wishlist";
// import Wishlist from "./Pages/Wishlist/WishlistRefactor";
import AdminLayout from "./Layouts/AdminLayout";
import Dashboard from "./Pages/Admin/Dashboard";
import Orders from "./Pages/Admin/Orders";
import Register from "./Pages/Register/RefactorRegister.js";

// import Login from "./Pages/Login/Login";
// import Register from "./Pages/Register/Register";
import Order from "./Pages/Orders/Order";
import ProductDetails from "./Pages/Product-Details/ProductDetails.js";
import Login from "./Pages/Login/RefactorLogin.js";
import MangeProducts from "./Pages/Admin/Products.js";
import ProtectedRoute from "./Components/Router/ProtectedRoute.js";
import Wishlist from "./Pages/Wishlist/WishlistRefactor.js";

function App() {
  return (
    <BrowserRouter>
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
          <Route path="orders" element={<Orders />} />
        </Route>
      </Routes>
      <ToastContainer position="top-right" autoClose={2000} />
    </BrowserRouter>
    
  );
}

export default App;
