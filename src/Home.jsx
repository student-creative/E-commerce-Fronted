import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import Category from "./Category";
import Slider from "./Slider";

function Home({ cart, setCart }) {
  const [products, setProducts] = useState([]);

  // Fetch Products
  useEffect(() => {
    fetch("https://e-commerce-website-tpxn.onrender.com/product/api")
      .then((res) => res.json())
      .then((data) => setProducts(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <>
      {/* Hero Slider */}
      <Slider />

      {/* Category Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <Category />
      </div>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-5xl font-extrabold mb-12 text-center bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
          Featured Products
        </h1>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {products.map((product) => (
            <Link
              key={product._id || product.id}
              to={`/product/${product._id || product.id}`}
              className="group relative bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 border border-gray-200 overflow-hidden"
            >
              {/* Product Image */}
              <div className="relative w-full h-72 flex justify-center items-center bg-gray-50 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                />
                <span className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  New
                </span>
              </div>

              {/* Product Info */}
              <div className="p-6 flex flex-col justify-between h-48">
                <h2 className="font-semibold text-lg text-gray-800 mb-3 line-clamp-2 group-hover:text-yellow-500 transition-colors duration-300">
                  {product.title}
                </h2>
                <div className="flex items-center justify-between">
                  <p className="text-red-600 font-extrabold text-xl">
                    ₹{product.price}
                  </p>
                  <button className="bg-yellow-400 text-gray-800 font-semibold px-4 py-2 rounded-lg shadow hover:bg-yellow-500 transition duration-300">
                    Add to Cart
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;
