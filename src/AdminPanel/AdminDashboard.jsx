import React from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-10 text-center">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
        {/* Add Product Card */}
        <div
          onClick={() => navigate("/admin-panel")}
          className="bg-white rounded-xl shadow-lg p-10 flex flex-col items-center justify-center hover:shadow-2xl transform hover:scale-105 transition duration-300 cursor-pointer"
        >
          <div className="bg-blue-100 text-blue-600 rounded-full p-6 mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold mb-2">Add Product</h2>
          <p className="text-gray-500 text-center">
            Click here to add new products to your store
          </p>
        </div>

        {/* Manage Orders Card */}
        <div
          onClick={() => navigate("/admin-orders")}
          className="bg-white rounded-xl shadow-lg p-10 flex flex-col items-center justify-center hover:shadow-2xl transform hover:scale-105 transition duration-300 cursor-pointer"
        >
          <div className="bg-green-100 text-green-600 rounded-full p-6 mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold mb-2">Manage Orders</h2>
          <p className="text-gray-500 text-center">
            Click here to view and update orders
          </p>
        </div>
      </div>
    </div>
  );
}
