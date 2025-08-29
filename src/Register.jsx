import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL || "https://e-commerce-website-tpxn.onrender.com";

function Register({ setUser, redirectPath = "/", setCart }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [isForgot, setIsForgot] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (location.state?.mode === "login") {
      setIsLogin(true);
      setIsForgot(false);
    } else if (location.state?.mode === "signup") {
      setIsLogin(false);
      setIsForgot(false);
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isForgot) {
        const res = await axios.post(`${API_URL}/forgot`, { email });
        alert(res.data.message || "Password reset link sent!");
        setIsForgot(false);
      } else if (isLogin) {
        const res = await axios.post(`${API_URL}/login`, { email, password });
        localStorage.setItem("user", JSON.stringify(res.data.user));

        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
          axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;

          if (res.data.user) setUser(res.data.user);

          const userCartKey = "cart_" + res.data.user.id;
          const guestCart = JSON.parse(localStorage.getItem("cart")) || [];
          const backendCart = res.data.cart?.products || [];

          const mergedCart = [...backendCart];
          guestCart.forEach((item) => {
            if (!backendCart.find((p) => p.productId === item.productId)) {
              mergedCart.push(item);
            }
          });

          setCart(mergedCart);
          localStorage.setItem(userCartKey, JSON.stringify(mergedCart));
          localStorage.removeItem("cart");

          navigate(redirectPath);
        }
      } else {
        const res = await axios.post(`${API_URL}/register`, { name, email, password });
        alert(res.data.message || "Registration successful!");

        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
          axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
        }

        if (res.data.user) setUser(res.data.user);

        try {
          const cartRes = await axios.get(`${API_URL}/cart`, {
            headers: { Authorization: `Bearer ${res.data.token}` },
          });

          const userCartKey = "cart_" + res.data.user.id;
          const cartProducts = cartRes.data.products || [];
          setCart(cartProducts);
          localStorage.setItem(userCartKey, JSON.stringify(cartProducts));
        } catch (err) {
          console.error("Failed to fetch cart after register:", err);
          setCart([]);
        }

        setIsLogin(true);
        navigate(redirectPath);
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // Fetch user-specific cart
  useEffect(() => {
    if (!setUser) return;
    const token = localStorage.getItem("token");
    if (!token || !setCart) return;

    const userId = JSON.parse(localStorage.getItem("token_userId"));
    if (!userId) return;

    const userCartKey = "cart_" + userId;
    const savedCart = localStorage.getItem(userCartKey);

    if (savedCart) {
      setCart(JSON.parse(savedCart));
      return;
    }

    fetch(`${API_URL}/cart`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch cart");
        return res.json();
      })
      .then((data) => {
        const cartProducts = data.products || [];
        setCart(cartProducts);
        localStorage.setItem(userCartKey, JSON.stringify(cartProducts));
      })
      .catch((err) => {
        console.error("Cart fetch error:", err);
        setCart([]);
        localStorage.removeItem(userCartKey);
      });
  }, [setCart, setUser]); // ✅ dependencies added

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          {isForgot ? "Forgot Password" : isLogin ? "Login" : "Register"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!isLogin && !isForgot && (
            <input
              className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}

          <input
            className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {!isForgot && (
            <input
              className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          )}

          <button
            type="submit"
            disabled={loading}
            className={`${loading ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"} text-white p-3 rounded font-semibold transition`}
          >
            {loading
              ? "Please wait..."
              : isForgot
              ? "Send Reset Link"
              : isLogin
              ? "Login"
              : "Register"}
          </button>
        </form>

        {error && <p className="text-red-500 mt-3 text-center">{error}</p>}

        {isLogin && !isForgot && (
          <p
            onClick={() => setIsForgot(true)}
            className="mt-3 text-sm text-blue-500 cursor-pointer hover:underline text-center"
          >
            Forgot Password?
          </p>
        )}

        <p className="mt-6 text-center text-gray-600">
          {isForgot
            ? "Remember password?"
            : isLogin
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <span
            onClick={() => {
              setIsForgot(false);
              setIsLogin(isForgot ? true : !isLogin);
            }}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            {isForgot ? "Login here" : isLogin ? "Register here" : "Login here"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
