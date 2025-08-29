import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state?.orderData;

  const handlePayment = async () => {
    try {
      const res = await fetch("https://e-commerce-website-tpxn.onrender.com/order/place", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();
      console.log("Payment Order Response:", data);

      alert("Payment Successful! Order placed.");
      navigate("/home"); // ✅ Redirect back to home/cart
    } catch (err) {
      console.error("Payment Error:", err);
    }
  };

  if (!orderData) {
    return <p>No order data found</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-4">Online Payment</h2>
      <p className="mb-2">Total Amount: ₹{orderData.totalAmount}</p>
      <button
        onClick={handlePayment}
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
      >
        Pay Now
      </button>
    </div>
  );
}

export default Payment;
