import React, { useState } from "react";
import { ShoppingCartIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ cart = [], user, setUser, setCart }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  // ✅ Use localStorage fallback for refresh-safe login
  const currentUser = user || JSON.parse(localStorage.getItem("user"));

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchTerm(query);

    if (query.length > 1) {
      try {
        const res = await fetch(`https://e-commerce-website-tpxn.onrender.com/${encodeURIComponent(query)}`);
        const data = await res.json();
        setSuggestions(data);
      } catch (err) {
        console.error(err);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setCart([]);
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 text-2xl font-bold text-indigo-600">ShopEase</div>

          {/* Search Input */}
          <div className="hidden md:block flex-1 px-4 relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-indigo-400 outline-none"
            />
            {suggestions.length > 0 && (
              <div className="absolute bg-white border w-full mt-1 rounded shadow-lg z-50 max-h-80 overflow-y-auto">
                {suggestions.map((item) => (
                  <div
                    key={item.id || item._id}
                    className="p-2 hover:bg-indigo-100 cursor-pointer flex items-center gap-2"
                    onClick={() => navigate(`/product/${item.id || item._id}`)}
                  >
                    <img
                      src={`https://e-commerce-website-tpxn.onrender.com${item.image}`}
                      alt={item.title}
                      className="w-12 h-12 object-contain rounded"
                    />
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-700">{item.title}</span>
                      <span className="text-sm text-gray-500">{item.description?.substring(0, 30)}...</span>
                      <span className="text-green-600 font-semibold">₹{item.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-indigo-600">Shop</Link>
            <Link to="/category" className="text-gray-700 hover:text-indigo-600">Categories</Link>
            <Link to="/about" className="text-gray-700 hover:text-indigo-600">About</Link>
            <Link to="/contact" className="text-gray-700 hover:text-indigo-600">Contact</Link>
            <Link to="/orders" className="text-gray-700 hover:text-indigo-600">Orders</Link>

            <div className="relative cursor-pointer" onClick={() => navigate("/cart")}>
              <ShoppingCartIcon className="h-6 w-6 text-gray-700" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cart.length}
                </span>
              )}
            </div>

            {currentUser ? (
              <button
                onClick={handleLogout}
                className="px-4 py-1 border border-red-600 text-red-600 rounded-full hover:bg-red-600 hover:text-white transition"
              >
                Logout
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate("/register", { state: { mode: "login" } })}
                  className="px-4 py-1 border border-indigo-600 text-indigo-600 rounded-full hover:bg-indigo-600 hover:text-white transition"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/register", { state: { mode: "signup" } })}
                  className="px-4 py-1 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
                >
                  Signup
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <XMarkIcon className="h-6 w-6 text-gray-700" /> : <Bars3Icon className="h-6 w-6 text-gray-700" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-2 space-y-2">
            <Link to="/" className="text-gray-700 hover:text-indigo-600">Shop</Link>
            <Link to="/category" className="text-gray-700 hover:text-indigo-600">Categories</Link>
            <Link to="/about" className="text-gray-700 hover:text-indigo-600">About</Link>
            <Link to="/contact" className="text-gray-700 hover:text-indigo-600">Contact</Link>
            <Link to="/orders" className="text-gray-700 hover:text-indigo-600">Orders</Link>

            <div className="flex items-center space-x-2">
              <ShoppingCartIcon className="h-6 w-6 text-gray-700" />
              <span className="text-gray-700">Cart ({cart.length})</span>
            </div>

            {currentUser ? (
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 border border-red-600 text-red-600 rounded-full hover:bg-red-600 hover:text-white transition"
              >
                Logout
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate("/register", { state: { mode: "login" } })}
                  className="w-full px-4 py-2 border border-indigo-600 text-indigo-600 rounded-full hover:bg-indigo-600 hover:text-white transition"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/register", { state: { mode: "signup" } })}
                  className="w-full px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
                >
                  Signup
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
