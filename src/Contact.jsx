import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-indigo-600 text-white py-32 px-6 text-center">
        <h1 className="text-6xl font-bold mb-6">Contact Us</h1>
        <p className="text-2xl max-w-3xl mx-auto leading-relaxed">
          Have questions or need assistance? Reach out to us anytime and we’ll help you out!
        </p>
      </section>

      {/* Contact Info Section */}
      <section className="py-24 px-6 md:px-24 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        <div className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition duration-500">
          <FaMapMarkerAlt className="text-indigo-600 text-5xl mx-auto mb-6" />
          <h3 className="text-3xl font-semibold mb-2">Our Address</h3>
          <p className="text-gray-600">123 E-Commerce St, Shopping City, India</p>
        </div>
        <div className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition duration-500">
          <FaPhoneAlt className="text-indigo-600 text-5xl mx-auto mb-6" />
          <h3 className="text-3xl font-semibold mb-2">Call Us</h3>
          <p className="text-gray-600">+91 98765 43210</p>
        </div>
        <div className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition duration-500">
          <FaEnvelope className="text-indigo-600 text-5xl mx-auto mb-6" />
          <h3 className="text-3xl font-semibold mb-2">Email Us</h3>
          <p className="text-gray-600">support@ecommerce.com</p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-24 px-6 md:px-24">
        <div className="max-w-4xl mx-auto bg-white p-12 rounded-3xl shadow-2xl">
          <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">Send Us a Message</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Full Name"
              className="border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              placeholder="Subject"
              className="border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 md:col-span-2"
            />
            <textarea
              placeholder="Your Message"
              rows="6"
              className="border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 md:col-span-2"
            ></textarea>
            <button
              type="submit"
              className="md:col-span-2 bg-indigo-600 text-white font-semibold py-4 rounded-xl hover:bg-indigo-700 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
