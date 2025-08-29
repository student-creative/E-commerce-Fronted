// AdminPanel.jsx
import React, { useState, useEffect } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminPanel() {
  const [form, setForm] = useState({
    id: "",
    title: "",
    description: "",
    price: "",
    image: null,
  });
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Check token on mount
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) navigate("/admin/login");
    else axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "https://e-commerce-website-tpxn.onrender.com/product/api"
      );
      setProducts(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const handleFileChange = (e) =>
    setForm({ ...form, image: e.target.files[0] });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", form.id);
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("image", form.image);

    try {
      await axios.post(
        "https://e-commerce-website-tpxn.onrender.com/product/admin",
        formData
      );

      setForm({ id: "", title: "", description: "", price: "", image: null });
      fetchProducts(); // Refresh products
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow-md transition"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Back
        </button>
      </div>

      <h2 className="text-4xl font-extrabold mb-6 text-center bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
        Admin Panel
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-8 flex flex-col gap-4"
        encType="multipart/form-data"
      >
        <input
          name="id"
          type="number"
          placeholder="ID"
          value={form.id}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          required
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="submit"
          className="bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition duration-300 shadow-md"
        >
          Add Product
        </button>
      </form>

      <h3 className="mt-10 text-2xl font-bold text-gray-800 mb-4">Added Products</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <div
            key={p._id}
            className="border rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 bg-white"
          >
            <div className="h-56 flex items-center justify-center bg-gray-50 overflow-hidden rounded-t-2xl">
              <img
                src={`https://e-commerce-website-tpxn.onrender.com${p.image}`}
                alt={p.title}
                className="h-full object-contain transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="p-4">
              <p className="font-semibold text-lg text-gray-800">{p.title}</p>
              <p className="text-purple-600 font-bold mt-2">₹{p.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
