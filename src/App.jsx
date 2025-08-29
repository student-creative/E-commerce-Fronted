import React, { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route, Navigate } from "react-router-dom";

import Register from "./Register";
import Home from "./Home";
import ProductDetails from "./ProductDetails";
import Cart from "./Cart";
import Orders from "./Orders";
import Payment from "./Payment";
import Category from "./Category";
import CategoryDetail from "./CategoryDetail";
import SubCategory from "./SubCategory";
import About from "./About";
import Contact from "./Contact";

import Navbar from "./Navbar";
import { OrderProvider } from "./OrderContext";

import AdminLogin from "./AdminPanel/AdminLogin";
import AdminDashboard from "./AdminPanel/AdminDashboard";
import AdminPanel from "./AdminPanel/AdminPanel";
import AdminOrders from "./AdminPanel/AdminOrders";

function App() {
  // ✅ User login persist
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // ✅ Admin token persist
  const [adminToken, setAdminToken] = useState(localStorage.getItem("adminToken"));

  // ✅ Cart persist
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      return savedCart && savedCart !== "undefined" ? JSON.parse(savedCart) : [];
    } catch (err) {
      console.error("Failed to parse cart from localStorage:", err);
      return [];
    }
  });

  // ✅ Save cart in localStorage on change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ✅ Set Axios auth header on mount if token exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  return (
    <OrderProvider>
      <Routes>
        {/* ==================== General routes (with Navbar) ==================== */}
        <Route
          path="/*"
          element={
            <>
              <Navbar cart={cart} user={user} setUser={setUser} setCart={setCart} />
              <Routes>
                <Route path="/" element={<Home cart={cart} setCart={setCart} />} />
                <Route path="/product/:id" element={<ProductDetails cart={cart} setCart={setCart} />} />
                <Route path="/cart" element={<Cart cart={cart} setCart={setCart} user={user} />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/category" element={<Category />} />
                <Route path="/category/:id" element={<CategoryDetail />} />
                <Route path="/subcategory/:categoryId/:productId" element={<SubCategory cart={cart} setCart={setCart} />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route
                  path="/register"
                  element={<Register setUser={setUser} redirectPath="/cart" setCart={setCart} />}
                />
              </Routes>
            </>
          }
        />

        {/* ==================== Admin routes (without Navbar) ==================== */}
        <Route path="/admin" element={<Navigate to="/admin/login" />} />
        <Route path="/admin/login" element={<AdminLogin setToken={setAdminToken} />} />
        <Route
          path="/admin/dashboard"
          element={adminToken ? <AdminDashboard /> : <Navigate to="/admin/login" />}
        />
        <Route
          path="/admin-panel"
          element={adminToken ? <AdminPanel /> : <Navigate to="/admin/login" />}
        />
        <Route
          path="/admin-orders"
          element={adminToken ? <AdminOrders /> : <Navigate to="/admin/login" />}
        />
        <Route path="/admin/*" element={<Navigate to="/admin/login" />} />
      </Routes>
    </OrderProvider>
  );
}

export default App;
