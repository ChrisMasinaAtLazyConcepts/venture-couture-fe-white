import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Optional: for arrows

const ImageSlider = () => {
  const images = [
    { src: "/assets/images/promo.PNG", alt: "Promo 1" },
    { src: "/assets/images/promo2.PNG", alt: "Promo 2" },
    { src: "/assets/images/promo3.PNG", alt: "Promo 3" },
    { src: "/assets/images/promo4.PNG", alt: "Promo 4" }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextSlide = () => {
    setFade(false);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      setFade(true);
    }, 300);
  };

  const prevSlide = () => {
    setFade(false);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
      setFade(true);
    }, 300);
  };

  const goToSlide = (index) => {
    setFade(false);
    setTimeout(() => {
      setCurrentIndex(index);
      setFade(true);
    }, 300);
  };

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Main Image Container */}
      <div className="relative overflow-hidden rounded-2xl shadow-2xl">
        <div className="aspect-square md:aspect-video flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
          <img
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            className={`w-full max-w-md md:max-w-2xl object-contain transition-opacity duration-500 ${
              fade ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Image Indicators/Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-white w-8' 
                  : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

      </div>

      {/* Optional: Thumbnail Navigation */}
      <div className="flex justify-center space-x-4 mt-6">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`overflow-hidden rounded-lg border-2 transition-all duration-300 ${
              index === currentIndex 
                ? 'border-red-500 scale-110' 
                : 'border-transparent hover:border-gray-300'
            }`}
          >
            <img
              src={image.src}
              alt={`Thumbnail ${index + 1}`}
              className="w-20 h-20 object-cover opacity-80 hover:opacity-100"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;