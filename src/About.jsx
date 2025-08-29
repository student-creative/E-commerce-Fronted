import React from "react";
import { FaShippingFast, FaHeadset, FaShieldAlt } from "react-icons/fa";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-indigo-600 text-white py-32 px-6 text-center">
        <h1 className="text-6xl font-bold mb-6">About Our E-Commerce Store</h1>
        <p className="text-2xl max-w-3xl mx-auto leading-relaxed">
          Delivering quality products with amazing customer service. Experience seamless shopping from your home with confidence and convenience.
        </p>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-24 px-6 md:px-24 flex flex-col md:flex-row items-center gap-16">
        <div className="md:w-1/2">
          <img
            src={require('./img/mission.jpg')}
            alt="Our Mission"
            className="w-full h-auto rounded-3xl shadow-2xl transform hover:scale-105 transition duration-500"
          />
        </div>
        <div className="md:w-1/2 space-y-8">
          <h2 className="text-5xl font-bold text-gray-800">Our Mission</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            To provide customers with top-quality products at unbeatable prices, backed by exceptional service and support. We aim to make every shopping experience smooth and enjoyable.
          </p>
          <h2 className="text-5xl font-bold text-gray-800">Our Vision</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            To be the most loved online shopping destination, where convenience meets trust and quality. We envision a world where everyone can shop confidently from anywhere.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-24 px-6 md:px-24 text-center">
        <h2 className="text-5xl font-bold mb-16">Why Shop With Us?</h2>
        <div className="flex flex-col md:flex-row justify-center gap-12">
          <div className="bg-gray-100 p-12 rounded-3xl shadow-xl hover:shadow-2xl transition duration-500">
            <FaShippingFast className="text-indigo-600 text-6xl mx-auto mb-6" />
            <h3 className="text-3xl font-semibold mb-3">Fast Delivery</h3>
            <p className="text-gray-600 text-lg">Get your orders delivered quickly and safely, right to your doorstep.</p>
          </div>
          <div className="bg-gray-100 p-12 rounded-3xl shadow-xl hover:shadow-2xl transition duration-500">
            <FaHeadset className="text-indigo-600 text-6xl mx-auto mb-6" />
            <h3 className="text-3xl font-semibold mb-3">24/7 Support</h3>
            <p className="text-gray-600 text-lg">Our friendly support team is here to help anytime, every day.</p>
          </div>
          <div className="bg-gray-100 p-12 rounded-3xl shadow-xl hover:shadow-2xl transition duration-500">
            <FaShieldAlt className="text-indigo-600 text-6xl mx-auto mb-6" />
            <h3 className="text-3xl font-semibold mb-3">Secure Payments</h3>
            <p className="text-gray-600 text-lg">Shop safely with multiple secure payment options for peace of mind.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
