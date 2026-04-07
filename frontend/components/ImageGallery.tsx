'use client';

import Image from 'next/image';
import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageItem {
  src: string;
  alt: string;
  title?: string;
}

interface ImageGalleryProps {
  images: ImageItem[];
  columns?: 2 | 3 | 4;
}

export default function ImageGallery({ images, columns = 3 }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + images.length) % images.length);
    }
  };

  return (
    <>
      <div className={`grid grid-cols-1 ${gridCols[columns]} gap-4`}>
        {images.map((image, idx) => (
          <div
            key={idx}
            className="relative group cursor-pointer overflow-hidden rounded-xl border transition-all duration-300 hover:scale-[1.02]"
            style={{
              borderColor: '#cfe0fb',
              boxShadow: '0 14px 26px rgba(13, 49, 103, 0.14)',
            }}
            onClick={() => setSelectedImage(idx)}
          >
            <div className="aspect-square relative">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            {image.title && (
              <div className="absolute bottom-0 left-0 right-0 bg-[#0f2f6366] p-2 text-white backdrop-blur-sm transition-transform duration-300 group-hover:translate-y-0 md:translate-y-full">
                <p className="text-sm font-bold">{image.title}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a1d3dd9] p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute right-4 top-4 z-10 rounded-full border border-[#d2e3ff] bg-white p-2 text-[#1e5daf] transition-all duration-300 hover:bg-[#ecf4ff]"
            >
              <X size={24} />
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-[#d2e3ff] bg-white p-2 text-[#1e5daf] transition-all duration-300 hover:bg-[#ecf4ff]"
            >
              <ChevronLeft size={24} />
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-[#d2e3ff] bg-white p-2 text-[#1e5daf] transition-all duration-300 hover:bg-[#ecf4ff]"
            >
              <ChevronRight size={24} />
            </button>

            <div className="relative h-[80vh] w-full overflow-hidden rounded-xl border border-[#c7dbfb] bg-[#f6f9ff]">
              <Image
                src={images[selectedImage].src}
                alt={images[selectedImage].alt}
                fill
                className="object-contain"
              />
            </div>
            
            {images[selectedImage].title && (
              <p className="mt-4 text-center text-xl font-bold text-white">
                {images[selectedImage].title}
              </p>
            )}
            
            <p className="mt-2 text-center text-sm text-[#d8e5ff]">
              {selectedImage + 1} / {images.length}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

