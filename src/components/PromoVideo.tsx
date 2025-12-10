import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

export default function PromoVideo() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // Show the video after 2 seconds of page load
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => {
      clearTimeout(showTimer);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (isVisible && videoRef.current) {
      // Auto-play the video when it becomes visible
      videoRef.current.play().catch(console.error);
      
      // Auto-hide after 15 seconds (or when video ends)
      timeoutRef.current = setTimeout(() => {
        setIsVisible(false);
        setHasPlayed(true);
      }, 15000);
    }
  }, [isVisible]);

  const handleClose = () => {
    setIsVisible(false);
    setHasPlayed(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const handleVideoEnd = () => {
    setIsVisible(false);
    setHasPlayed(true);
  };

  // Don't show if user has already seen it in this session
  if (hasPlayed || !isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-fade-in-up">
      <div className="relative w-[190px] h-[160px] rounded-lg overflow-hidden shadow-2xl border-2 border-white/20 hover:scale-105 transition-transform duration-300">
        {/* Video Player */}
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          muted
          autoPlay
          playsInline
          onEnded={handleVideoEnd}
          title="Fashion Promotion"
        >
          {/* You can replace this with your actual video source */}
          <source
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors z-10"
          aria-label="Close promotion"
          title="Close video"
        >
          <X size={12} />
        </button>

        {/* Promotion Badge */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-1">
          <p className="text-[8px] font-bold text-white text-center truncate">
            FASHION SALE
          </p>
          <p className="text-[6px] text-white/90 text-center truncate">
            UP TO 50% OFF
          </p>
        </div>
      </div>
    </div>
  );
}