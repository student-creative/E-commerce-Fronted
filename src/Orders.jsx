  import React, { useContext, useEffect, useState } from "react";
  import { OrderContext } from "./OrderContext";

  function Orders() {
    const { orders, setOrders } = useContext(OrderContext);
    const [loading, setLoading] = useState(false);
  

useEffect(() => {
  const userId = localStorage.getItem("userId");
  if (!userId) return;

  setLoading(true);
  fetch(`https://e-commerce-website-tpxn.onrender.com/order/${userId}`)
    .then((res) => res.json())
    .then((data) => {
      setOrders(data.orders || []);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Fetch error:", err);
      setLoading(false);
    });
}, [setOrders]); // ✅ add setOrders




    const handleCancel = async (orderId) => {
      if (!window.confirm("Are you sure you want to cancel this order?")) return;

      try {
        const res = await fetch(`https://e-commerce-website-tpxn.onrender.com/order/${orderId}`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (res.ok) {
          alert("Order cancelled successfully!");
          setOrders(orders.filter((o) => o._id !== orderId));
        } else {
          alert(data.message || "Failed to cancel order");
        }
      } catch (err) {
        console.error(err);
        alert("Something went wrong");
      }
    };

    return (
      <div className="p-6 max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-10 text-gray-800 text-center">
          My Orders
        </h1>

        {loading ? (
          <p className="text-gray-500 text-center">Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="text-gray-500 text-center">No orders placed yet.</p>
        ) : (
          <div className="space-y-8">
            {orders.map((order, idx) => (
              <div
                key={idx}
                className="bg-white border rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1"
              >
                {/* Order Header */}
                <div className="flex justify-between items-center p-5 border-b">
                  <h2 className="font-semibold text-lg text-gray-700">
                    Order ID: {order._id}
                  </h2>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : order.status === "Delivered"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* Order Info */}
                <div className="flex flex-col md:flex-row p-5 gap-6">
                  {/* Shipping Details */}
                  <div className="md:w-1/2 bg-gray-50 p-4 rounded-lg shadow-inner">
                    <h3 className="font-semibold text-gray-700 mb-3">
                      Shipping Details
                    </h3>
                    <p><b>Name:</b> {order.shippingDetails.fullName}</p>
                    <p><b>Email:</b> {order.shippingDetails.email}</p>
                    <p><b>Phone:</b> {order.shippingDetails.phone}</p>
                    <p>
                      <b>Address:</b> {order.shippingDetails.address},{" "}
                      {order.shippingDetails.city}, {order.shippingDetails.state} -{" "}
                      {order.shippingDetails.zip}
                    </p>
                    <p><b>Payment:</b> {order.shippingDetails.paymentMethod}</p>
                    <p className="mt-2">
                      <b>Total:</b> ₹{order.totalAmount} &nbsp;|&nbsp;{" "}
                      <b>Date:</b> {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>

                  {/* Products */}
                  <div className="md:w-1/2 p-4 rounded-lg border bg-white shadow-inner">
                    <h3 className="font-semibold text-gray-700 mb-3">Products</h3>
                    <ul className="list-disc pl-5 text-gray-600 space-y-1">
                      {order.products.map((p, i) => (
                        <li key={i}>
                          {p.title} x {p.quantity} = ₹{p.price * p.quantity}
                        </li>
                      ))}
                    </ul>
                    <div className="text-right mt-4">
                      <button
                        onClick={() => handleCancel(order._id)}
                        className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 shadow-md transition duration-200"
                      >
                        Cancel Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  export default Orders;
