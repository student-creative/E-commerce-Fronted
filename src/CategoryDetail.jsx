import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function CategoryDetail() {
  const { id } = useParams(); // categoryId
  const [category, setCategory] = useState(null);
  const navigate = useNavigate();

  // Fetch category with products
  useEffect(() => {
    fetch(`https://e-commerce-website-tpxn.onrender.com/category/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => setCategory(data))
      .catch((err) => console.error("Fetch error:", err));
  }, [id]);

  if (!category)
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-gray-600 text-lg">Loading category details...</p>
      </div>
    );

  // Navigate to SubCategory/Product Detail
  const handleProductClick = (productId) => {
    navigate(`/subcategory/${id}/${productId}`);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-gray-800">{category.name}</h2>
          <p className="mt-2 text-gray-600 text-lg">{category.description}</p>
        </div>

        {category.products?.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {category.products.map((p) => (
              <div
                key={p._id}
                onClick={() => handleProductClick(p._id)}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 cursor-pointer overflow-hidden group"
              >
                <div className="w-full h-52 overflow-hidden">
                  <img
                    src={`https://e-commerce-website-tpxn.onrender.com/img/${p.image}`}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800">{p.title}</h3>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">{p.description}</p>
                  <p className="text-indigo-600 font-bold mt-3 text-lg">₹{p.price}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No products available in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
