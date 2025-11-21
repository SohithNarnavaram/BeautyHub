import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface PortfolioGalleryProps {
  images: string[];
  vendorName: string;
}

export const PortfolioGallery = ({ images, vendorName }: PortfolioGalleryProps) => {
  const { theme } = useTheme();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const bgColor = theme === 'dark' ? 'bg-dark-card' : 'bg-pink-card';
  const textColor = theme === 'dark' ? 'text-dark-text' : 'text-pink-text';
  const overlayBg = theme === 'dark' ? 'bg-black/90' : 'bg-white/95';

  if (images.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            onClick={() => setSelectedIndex(index)}
            className="relative aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition group"
          >
            <img
              src={image}
              alt={`${vendorName} portfolio ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition" />
          </div>
        ))}
      </div>

      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedIndex(null)}
        >
          <div className={`${overlayBg} absolute inset-0`} />
          <div className="relative z-10 max-w-4xl w-full">
            <button
              onClick={() => setSelectedIndex(null)}
              className={`absolute top-4 right-4 ${textColor} hover:opacity-80 z-20`}
              aria-label="Close"
            >
              <X size={32} />
            </button>
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
                  }}
                  className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${textColor} hover:opacity-80 z-20`}
                  aria-label="Previous"
                >
                  <ChevronLeft size={32} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIndex((selectedIndex + 1) % images.length);
                  }}
                  className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${textColor} hover:opacity-80 z-20`}
                  aria-label="Next"
                >
                  <ChevronRight size={32} />
                </button>
              </>
            )}
            <img
              src={images[selectedIndex]}
              alt={`${vendorName} portfolio ${selectedIndex + 1}`}
              className="w-full h-auto rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <div className={`${textColor} text-center mt-4`}>
              {selectedIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

