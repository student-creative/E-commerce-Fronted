import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { OrderContext } from "./OrderContext";

function Cart({ cart, setCart, user }) {
  const { setOrders } = useContext(OrderContext);
  const [showCheckout, setShowCheckout] = useState(false);
  const navigate = useNavigate();

  const [checkoutData, setCheckoutData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    paymentMethod: "",
  });

  const [errors, setErrors] = useState({});

  // Fetch cart from backend if logged in
  useEffect(() => {
    if (!user) return;
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("https://e-commerce-website-tpxn.onrender.com/cart", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setCart(data.products || []))
      .catch((err) => console.error("Cart fetch error:", err));
  }, [user, setCart]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCheckoutData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({
      ...prev,
      [name]: value.trim() === "" ? `${name} is required` : "",
    }));
  };

  const validateCheckout = () => {
    const newErrors = {};
    Object.keys(checkoutData).forEach((key) => {
      if (!checkoutData[key].trim()) newErrors[key] = `${key} is required`;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleOrder = async () => {
    if (!validateCheckout()) return;

     localStorage.setItem("userId", user._id || user.id);
    try {
      const orderData = {
        userId: user.id,
        products: cart.map((item) => ({
          productId: item._id || item.id,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
        })),
        totalAmount: totalPrice,
        paymentMethod: checkoutData.paymentMethod,
        ...checkoutData,
      };

      if (checkoutData.paymentMethod === "online") {
        navigate("/payment", { state: { orderData } });
        return;
      }

      const res = await fetch("https://e-commerce-website-tpxn.onrender.com/order/place", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      await res.json();
      setOrders((prev) => [...prev, orderData]);
      alert("Order placed successfully!");
      setShowCheckout(false);
      setCart([]);
    } catch (err) {
      console.error("Order Error:", err);
    }
  };

  const updateBackendCart = async (updatedCart) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      await fetch("https://e-commerce-website-tpxn.onrender.com/cart/clear", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      for (let item of updatedCart) {
        await fetch("https://e-commerce-website-tpxn.onrender.com/cart/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ productId: item._id || item.id, quantity: item.quantity }),
        });
      }
    } catch (err) {
      console.error("Update Backend Cart Error:", err);
    }
  };

  const clearCart = async () => {
    setCart([]);
    const token = localStorage.getItem("token");
    if (token) {
      await fetch("https://e-commerce-website-tpxn.onrender.com/cart/clear", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
    }
  };

  const increaseQty = async (idx) => {
    const newCart = [...cart];
    newCart[idx].quantity += 1;
    setCart(newCart);
    await updateBackendCart(newCart);
  };

  const decreaseQty = async (idx) => {
    const newCart = [...cart];
    if (newCart[idx].quantity > 1) newCart[idx].quantity -= 1;
    setCart(newCart);
    await updateBackendCart(newCart);
  };

  const removeItem = async (idx) => {
    const newCart = [...cart];
    newCart.splice(idx, 1);
    setCart(newCart);
    await updateBackendCart(newCart);
  };

  // ➤ New: Show checkout only if user is logged in
  const handleCheckoutClick = () => {
    if (!user) {
      // Redirect to login/register page if not logged in
      navigate("/register", { state: { redirectPath: "/cart" } });
    } else {
      setShowCheckout(true);
    }
  };

  const isCheckoutValid = Object.values(checkoutData).every((v) => v.trim() !== "");

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900 transition"
        >
          ← Back to Home
        </button>
      </div>

      <h1 className="text-3xl font-extrabold mb-6 text-gray-800">Shopping Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500 text-lg text-center mt-10">Your cart is empty</p>
      ) : (
        <div className="space-y-6">
          {cart.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col md:flex-row items-center gap-4 border rounded-xl p-4 shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <img
                 src={item.image.startsWith("http") ? item.image : `${process.env.REACT_APP_API_URL}/uploads/${item.image}`}
                alt={item.title}
                className="w-28 h-28 object-contain rounded-lg"
              />
              <div className="flex-1 flex flex-col gap-2">
                <p className="font-semibold text-xl text-gray-800">{item.title}</p>
                <p className="text-gray-500 text-sm line-clamp-2">{item.description}</p>
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() => decreaseQty(idx)}
                    className="border px-3 py-1 rounded-lg hover:bg-gray-200 transition"
                  >
                    -
                  </button>
                  <span className="font-medium">{item.quantity}</span>
                  <button
                    onClick={() => increaseQty(idx)}
                    className="border px-3 py-1 rounded-lg hover:bg-gray-200 transition"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <p className="font-bold text-indigo-600 text-xl">
                  ₹{item.price * item.quantity}
                </p>
                <button
                  onClick={() => removeItem(idx)}
                  className="text-red-600 hover:text-red-800 font-medium"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="flex flex-col md:flex-row justify-between items-center mt-8 bg-gray-100 p-4 rounded-lg shadow-inner">
            <span className="text-2xl font-bold text-gray-800">Total: ₹{totalPrice}</span>
            <div className="flex gap-3 mt-3 md:mt-0">
              <button
                onClick={clearCart}
                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Clear Cart
              </button>
              <button
                onClick={handleCheckoutClick}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-lg p-8 relative shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Checkout Details</h2>
            <button
              onClick={() => setShowCheckout(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 font-bold text-xl"
            >
              ×
            </button>

            <div className="space-y-4">
              {Object.entries(checkoutData).map(([key, value]) => {
                if (key === "paymentMethod") return null;
                return (
                  <div key={key}>
                    <input
                      type={key === "email" ? "email" : key === "phone" ? "tel" : "text"}
                      name={key}
                      placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                      value={value}
                      onChange={handleChange}
                      className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                    />
                    {errors[key] && (
                      <p className="text-red-500 text-sm mt-1">{errors[key]}</p>
                    )}
                  </div>
                );
              })}

              <select
                value={checkoutData.paymentMethod}
                onChange={(e) =>
                  setCheckoutData({ ...checkoutData, paymentMethod: e.target.value })
                }
                className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              >
                <option value="">Select Payment Method</option>
                <option value="COD">Cash on Delivery</option>
                <option value="card">Card</option>
                <option value="upi">UPI</option>
                <option value="netbanking">Net Banking</option>
              </select>
              {errors.paymentMethod && (
                <p className="text-red-500 text-sm">{errors.paymentMethod}</p>
              )}

              <button
                onClick={handleOrder}
                disabled={!isCheckoutValid}
                className={`w-full py-3 mt-4 rounded-lg text-white font-semibold transition ${
                  isCheckoutValid
                    ? "bg-indigo-600 hover:bg-indigo-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
