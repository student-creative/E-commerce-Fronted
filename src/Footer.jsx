import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 w-full">
      {/* Footer Top */}
      <div className="w-full px-6 md:px-16 py-16 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* About Us */}
        <div>
          <h3 className="font-bold text-xl mb-4">About Us</h3>
          <p className="text-gray-400 text-sm">
            We are a leading e-commerce store providing quality products at affordable prices.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-bold text-xl mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><a href="#" className="hover:text-white transition">Home</a></li>
            <li><a href="#" className="hover:text-white transition">Shop</a></li>
            <li><a href="#" className="hover:text-white transition">Categories</a></li>
            <li><a href="#" className="hover:text-white transition">Deals</a></li>
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <h3 className="font-bold text-xl mb-4">Customer Support</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>FAQ</li>
            <li>Shipping & Returns</li>
            <li>Order Tracking</li>
            <li>Contact Us</li>
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className="font-bold text-xl mb-4">Follow Us</h3>
          <div className="flex gap-4 mt-2">
            <a href="#" className="hover:text-white transition">Facebook</a>
            <a href="#" className="hover:text-white transition">Instagram</a>
            <a href="#" className="hover:text-white transition">Twitter</a>
            <a href="#" className="hover:text-white transition">LinkedIn</a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 text-center text-gray-400 text-sm py-6 w-full">
        © 2025 My E-Commerce. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
