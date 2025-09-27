import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "./Layouts/UserLayout";
import Home from "./Pages/Home/Home";
import Products from "./Pages/Products/Products";
import Cart from "./Pages/Cart/Cart";
import Wishlist from "./Pages/Wishlist/Wishlist";
import AdminLayout from "./Layouts/AdminLayout";
import Dashboard from "./Pages/Admin/Dashboard";
import Orders from "./Pages/Admin/Orders";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Order from "./Pages/Orders/Order";
import ProductDetails from "./Pages/Product-Details/ProductDetails.js";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Order" element={<Order />} />
          <Route path="/details" element={<ProductDetails />} />
       
        </Route>
        {/* Routes للادمن */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
