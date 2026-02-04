
import React, { useState, useEffect } from 'react';

interface HeroVideoProps {
  title: string;
  subtitle?: string;
  videoUrl?: string; // Optional custom video URL or Image URL
}

const HeroVideo: React.FC<HeroVideoProps> = ({ title, subtitle, videoUrl }) => {
  // Default fallback video if none provided or if local file fails
  const DEFAULT_VIDEO = "https://assets.mixkit.co/videos/preview/mixkit-hands-working-on-a-sewing-machine-35070-large.mp4";
  
  const [currentSrc, setCurrentSrc] = useState(videoUrl || DEFAULT_VIDEO);
  const [isImage, setIsImage] = useState(false);

  useEffect(() => {
    // Detect if the provided URL is an image based on extension
    if (currentSrc) {
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif', '.svg'];
        const isImg = imageExtensions.some(ext => currentSrc.toLowerCase().endsWith(ext));
        setIsImage(isImg);
    }
  }, [currentSrc]);

  const handleError = () => {
    // If the custom media fails (e.g., file not found), revert to default video
    if (currentSrc !== DEFAULT_VIDEO) {
      console.warn(`Media not found at ${currentSrc}. Falling back to default.`);
      setCurrentSrc(DEFAULT_VIDEO);
      setIsImage(false);
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-brand-navy">
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {isImage ? (
            <img
                src={currentSrc}
                alt={title}
                className="w-full h-full object-cover animate-slow-zoom-out"
                onError={handleError}
            />
        ) : (
            <video
                key={currentSrc} // Key forces re-render if src changes
                className="w-full h-full object-cover animate-slow-zoom-out"
                autoPlay
                muted
                loop
                playsInline
                poster="https://picsum.photos/1920/1080?grayscale"
                onError={handleError}
            >
                <source src={currentSrc} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        )}
      </div>
      
      {/* Darker gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-black/40 to-black/20 flex flex-col items-center justify-center text-center px-4">
        <div className="max-w-5xl mx-auto transform translate-y-0 transition-all duration-1000 ease-out">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 animate-fade-in-up drop-shadow-lg tracking-wide leading-tight">
            {title}
          </h1>
          {subtitle && (
            <div className="h-1 w-24 bg-brand-green mx-auto mb-8 rounded-full"></div>
          )}
          {subtitle && (
            <p className="text-lg md:text-2xl text-gray-100 font-light max-w-4xl mx-auto leading-relaxed drop-shadow-md tracking-wider">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroVideo;
