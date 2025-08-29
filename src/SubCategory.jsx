import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function SubCategory({ cart, setCart }) {
  const { categoryId, productId } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);

  // Fetch single product
  useEffect(() => {
    fetch(`https://e-commerce-website-tpxn.onrender.com/${categoryId}/${productId}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => setProduct(data))
      .catch((err) => console.error("Fetch error:", err));
  }, [categoryId, productId]);

  // Fetch related products
  useEffect(() => {
    if (categoryId && product) {
      fetch(`https://e-commerce-website-tpxn.onrender.com/${categoryId}`)
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
          return res.json();
        })
        .then((data) => {
          setRelated(data.products.filter((p) => p._id !== product._id));
        })
        .catch((err) => console.error("Fetch error:", err));
    }
  }, [categoryId, product]);

  if (!product)
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-gray-600 text-lg">Loading product...</p>
      </div>
    );

  // ✅ Add to Cart
  const handleAddToCart = async (product) => {
    try {
      const res = await fetch("https://e-commerce-website-tpxn.onrender.com/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "123",
          productId: product.id || product._id,
          title: product.title,
          price: product.price,
          description: product.description,
          image: product.image,
          quantity: 1,
        }),
      });

      const data = await res.json();
      setCart(
        data.cart.products.map((p) => ({
          id: p.productId,
          title: p.title,
          price: p.price,
          description: p.description,
          image: p.image,
          quantity: p.quantity,
        }))
      );
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  return (
    <div className="bg-gray-50 py-10 px-4 md:px-10 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Product Detail */}
        <div className="grid md:grid-cols-2 gap-10 bg-white rounded-xl shadow-md p-6 mb-16">
       <div className="flex justify-center items-center">
  <img
    src={`${process.env.REACT_APP_API_URL}/img/${product.image}`}
    alt={product.title}
    className="max-w-md w-full max-h-[400px] object-contain rounded-lg"
  />
</div>

          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-4">{product.title}</h2>
              <p className="text-gray-600 text-lg mb-4">{product.description}</p>
              <p className="text-indigo-600 text-3xl font-bold mb-6">₹{product.price}</p>
            </div>
            <button
              onClick={() => handleAddToCart(product)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg transition w-full md:w-2/3"
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-10">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Related Products</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {related.map((p) => (
                <div
                  key={p._id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-4 flex flex-col justify-between h-full"
                >
                  <img
                    src={`${process.env.REACT_APP_API_URL}/img/${p.image}`}
                    alt={p.title}
                    className="w-full h-48 object-contain mb-4 rounded"
                  />
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-1">{p.title}</h4>
                    <p className="text-indigo-600 font-bold text-lg mb-2">₹{p.price}</p>
                  </div>
                  <button
                    onClick={() => handleAddToCart(p)}
                    className="mt-auto bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-lg transition w-full"
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
