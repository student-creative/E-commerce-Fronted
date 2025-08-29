import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const userId = "123";
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch(`https://e-commerce-website-tpxn.onrender.com/order/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.orders || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await fetch(`https://e-commerce-website-tpxn.onrender.com/order/${orderId}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (res.ok) {
        setOrders(
          orders.map((o) =>
            o._id === orderId ? { ...o, status: newStatus } : o
          )
        );
        alert("Order status updated!");
      } else {
        alert(data.message || "Failed to update status");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  const statusActions = {
    pending: ["Completed", "Cancelled"],
    completed: ["Pending", "Cancelled"],
    cancelled: ["Pending", "Completed"],
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Back Button */}
       <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow-md transition"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back
          </button>
        </div>

      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
        Admin Orders
      </h1>

      {loading ? (
        <p className="text-gray-500 text-center">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-500 text-center">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white border rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1"
            >
              {/* Order Header */}
              <div className="flex justify-between items-center p-5 border-b">
                <h2 className="font-semibold text-lg text-gray-700">
                  Order ID: {order._id}
                </h2>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full font-medium text-sm ${
                      order.status.toLowerCase() === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : order.status.toLowerCase() === "completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                  {statusActions[order.status.toLowerCase()].map((action) => (
                    <button
                      key={action}
                      onClick={() =>
                        handleStatusChange(order._id, action.toLowerCase())
                      }
                      className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 text-sm transition"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </div>

              {/* Order Details */}
              <div className="flex flex-col md:flex-row p-5 gap-6">
                {/* Shipping Info */}
                <div className="md:w-1/2 bg-gray-50 p-4 rounded-lg shadow-inner">
                  <h3 className="font-semibold text-gray-700 mb-3">
                    Shipping Details
                  </h3>
                  <p>
                    <b>Name:</b> {order.shippingDetails.fullName}
                  </p>
                  <p>
                    <b>Email:</b> {order.shippingDetails.email}
                  </p>
                  <p>
                    <b>Phone:</b> {order.shippingDetails.phone}
                  </p>
                  <p>
                    <b>Address:</b> {order.shippingDetails.address},{" "}
                    {order.shippingDetails.city}, {order.shippingDetails.state} -{" "}
                    {order.shippingDetails.zip}
                  </p>
                  <p>
                    <b>Payment:</b> {order.shippingDetails.paymentMethod}
                  </p>
                  <p className="mt-2">
                    <b>Total:</b> ₹{order.totalAmount} &nbsp;|&nbsp;{" "}
                    <b>Date:</b> {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>

                {/* Products Info */}
                <div className="md:w-1/2 p-4 rounded-lg border bg-white shadow-inner">
                  <h3 className="font-semibold text-gray-700 mb-3">Products</h3>
                  <ul className="list-disc pl-5 text-gray-600 space-y-1">
                    {order.products.map((p, i) => (
                      <li key={i}>
                        {p.title} x {p.quantity} = ₹{p.price * p.quantity}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
