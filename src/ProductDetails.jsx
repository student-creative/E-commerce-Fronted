import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

function ProductDetails({ cart, setCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [quantity, setQuantity] = useState(1);

  // Fetch product & suggestions
  useEffect(() => {
    fetch(`https://e-commerce-website-tpxn.onrender.com/product/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error(err));

    fetch(`https://e-commerce-website-tpxn.onrender.com/product/suggestions/${id}`)
      .then((res) => res.json())
      .then((data) => setSuggestions(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) return <p className="p-6 text-center">Loading...</p>;

  // Add product to cart (backend + local state)
  const handleAddToCart = async (item, qty = quantity) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to add to cart");
      navigate("/register", { state: { redirectPath: `/product/${id}` } });
      return;
    }

    try {
      const res = await fetch("https://e-commerce-website-tpxn.onrender.com/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: item._id || item.id,
          quantity: qty,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setCart(data.cart.products); // backend से updated cart state
        alert("Product added to cart successfully!");
      } else {
        alert(data.message || "Failed to add product");
      }
    } catch (err) {
      console.error("Add to Cart Error:", err);
      alert("Server error");
    }
  };

  const incrementQty = () => setQuantity(quantity + 1);
  const decrementQty = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  return (
    <div>
      <div className="p-6 max-w-6xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow-md transition"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Product Image */}
          <div className="md:w-1/3 flex justify-center items-start">
            <div className="border rounded-lg p-4 bg-white shadow hover:shadow-lg transition">
              <img
                src={`https://e-commerce-website-tpxn.onrender.com/img/${product.image}`}
                alt={product.title}
                className="w-full h-80 object-contain"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="md:w-2/3 flex flex-col gap-4">
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-2xl font-semibold text-green-600">₹{product.price}</p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mt-4">
              <span className="font-medium">Quantity:</span>
              <div className="flex items-center border rounded">
                <button
                  onClick={decrementQty}
                  className="px-3 py-1 bg-gray-200 hover:bg-gray-300 transition"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  readOnly
                  className="w-16 text-center border-l border-r"
                />
                <button
                  onClick={incrementQty}
                  className="px-3 py-1 bg-gray-200 hover:bg-gray-300 transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={() => handleAddToCart(product)}
              className="mt-4 px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg shadow-md transition transform hover:-translate-y-1"
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* Suggested Products */}
        {suggestions.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              You may also like
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {suggestions.map((item) => (
                <div
                  key={item.id}
                  className="border rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col items-center bg-white"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-40 object-contain rounded-lg mb-2"
                  />
                  <h3 className="text-sm font-semibold text-gray-700 mb-1 text-center">
                    {item.title}
                  </h3>
                  <p className="text-green-600 font-semibold mb-2">₹{item.price}</p>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-black text-xs px-3 py-1.5 rounded shadow transition"
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;
