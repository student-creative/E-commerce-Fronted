import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Category() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://e-commerce-website-tpxn.onrender.com/category")
      .then((res) => res.json())
      .then((data) => setCategories(data.categories || []))
      .catch((err) => console.error(err));
  }, []);

  const handleCategoryClick = (cat) => {
    navigate(`/category/${cat._id}`);
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-5xl font-extrabold mb-12 text-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent drop-shadow-lg">
          Shop by Categories
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {categories.map((cat) => (
            <div
              key={cat._id}
              className="group relative cursor-pointer rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-white flex flex-col min-h-[380px]"
            >
              {/* Category Image */}
              <div className="w-full h-64 overflow-hidden rounded-t-3xl">
                <img
                  src={`${process.env.REACT_APP_API_URL}/img/${product.image}`}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Info Box */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-2xl text-gray-800 group-hover:text-purple-600 transition-colors duration-300">
                    {cat.name}
                  </h3>
                  <p className="text-gray-600 mt-3 text-sm md:text-base line-clamp-3">
                    {cat.description}
                  </p>
                </div>
                <button
                  onClick={() => handleCategoryClick(cat)}
                  className="mt-6 w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition duration-300 shadow-md"
                >
                  Shop Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
