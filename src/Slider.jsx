import React, { useState, useEffect } from "react";
import gaming from './img/gaming.jpg';
import led from './img/led.jpg';
import fashion from './img/fashion.jpg';
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const slides = [
  {
    id: 1,
    title: "Upgrade Your Gaming Setup",
    subtitle: "Best Chairs & Accessories for Comfort",
    description: "Experience the ultimate gaming comfort with ergonomic design and premium quality materials.",
    image: gaming,
    cta: "Shop Now",
  },
  {
    id: 2,
    title: "Smart TVs For Your Home",
    subtitle: "Crystal Clear 4K Display",
    description: "Bring the cinema experience to your living room with ultra HD TVs and smart features.",
    image: led,
    cta: "Explore Now",
  },
  {
    id: 3,
    title: "Stylish Fashion Collection",
    subtitle: "Trendy & Comfortable",
    description: "Upgrade your wardrobe with the latest fashion trends at unbeatable prices.",
    image: fashion,
    cta: "Check Collection",
  },
];

export default function Slider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent((current + 1) % slides.length);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-r from-indigo-700 via-indigo-500 to-indigo-400">
      {slides.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 flex flex-col md:flex-row transition-opacity duration-1000 ease-in-out ${
            idx === current ? "opacity-100 z-20" : "opacity-0 z-0"
          }`}
        >
          {/* Left: Text (50%) */}
          <div className="md:w-1/2 flex flex-col justify-center items-start px-8 md:px-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-4 text-yellow-400 drop-shadow-lg">{slide.title}</h2>
            <h3 className="text-3xl md:text-4xl font-semibold mb-4 text-pink-400 drop-shadow-lg">{slide.subtitle}</h3>
            <p className="text-lg md:text-xl mb-6 text-white drop-shadow-lg max-w-md">{slide.description}</p>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full shadow-lg transition font-semibold">
              {slide.cta}
            </button>
          </div>

          {/* Right: Image (50%) */}
         {/* Right: Image (50%) */}
{/* Right: Image (50%) */}
<div className="md:w-1/2 flex justify-center items-center px-8 md:px-16">
  <img
    src={slide.image}
    alt={slide.title}
    className="h-full w-full max-w-[600px] object-contain rounded-xl"
  />
</div>


        </div>
      ))}

      {/* Arrows */}
    {/* Left Arrow */}
<button
  onClick={prevSlide}
  className="absolute top-1/2 left-4 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition z-30"
>
  <AiOutlineLeft size={24} />
</button>

{/* Right Arrow */}
<button
  onClick={nextSlide}
  className="absolute top-1/2 right-4 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition z-30"
>
  <AiOutlineRight size={24} />
</button>


      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
        {slides.map((_, idx) => (
          <span
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-4 h-4 rounded-full cursor-pointer ${
              idx === current ? "bg-indigo-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
