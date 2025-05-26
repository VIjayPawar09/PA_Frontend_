import React, { useState, useEffect } from "react";

import img1 from "/images/image2.jpg";
import img2 from "/images/image4.jpg";
import img3 from "/images/image5.jpg";
// import img4 from "/images/image4.jpg";

const ImageSlider = () => {
  const images = [img1, img2, img3];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically change the image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [images.length]);

  return (
    <div className="relative bg-gray-100 py-8 mt-0 w-full">
      {/* Slider */}
      <div className="relative w-full h-[650px] overflow-hidden">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentIndex === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-[650px] object-cover"
            />
          </div>
        ))}
      </div>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? "bg-blue-500" : "bg-gray-400"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
