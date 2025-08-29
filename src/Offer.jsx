import React, { useEffect, useState } from "react";

export default function Offer() {
  const [offers, setOffers] = useState([]);

  // Mock fetch function, aap isko API call se replace kar sakte ho
  useEffect(() => {
    const fetchOffers = async () => {
      const data = [
        {
          id: 1,
          title: "50% OFF on Electronics",
          description: "Get half price on select electronics",
          image: "https://via.placeholder.com/300x200",
          link: "/category/electronics",
        },
        {
          id: 2,
          title: "Buy 1 Get 1 Free",
          description: "On all fashion products",
          image: "https://via.placeholder.com/300x200",
          link: "/category/fashion",
        },
        // Aur offers add kar sakte ho
      ];
      setOffers(data);
    };

    fetchOffers();
  }, []);

  return (
    <div className="offers-container p-4">
      <h2 className="text-3xl font-bold text-center mb-6">Today's Offers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="offer-card border rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-300"
          >
            <img src={offer.image} alt={offer.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{offer.title}</h3>
              <p className="text-gray-600 mb-4">{offer.description}</p>
              <a
                href={offer.link}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Shop Now
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
