import React, { useState, useRef, useEffect } from 'react';
import HeroVideo from '../components/HeroVideo';
import { ASSETS } from '../config/assets';
import { X, ZoomIn, ChevronRight, ChevronLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

// ==========================================
// Lightbox Modal Component
// ==========================================
interface ImageModalProps {
  isOpen: boolean;
  src: string;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, src, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md transition-all duration-300"
      onClick={onClose}
    >
      {/* Close Button */}
      <button 
        onClick={onClose} 
        className="absolute top-6 right-6 text-white hover:text-brand-green transition-colors z-[110]"
      >
        <X size={40} />
      </button>

      {/* Image Container */}
      <div 
        className="relative max-w-[90vw] max-h-[90vh] p-2 bg-white/10 rounded-sm shadow-2xl animate-fade-in-up"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
      >
        <img 
          src={src} 
          alt="Full view" 
          className="max-w-full max-h-[85vh] object-contain rounded-sm"
        />
      </div>
    </div>
  );
};

// ==========================================
// Interactive Gallery Component
// ==========================================
interface ProductSectionProps {
  id: string;
  title: string;
  images: string[];
  onImageClick: (src: string) => void;
}

const ProductGallery: React.FC<ProductSectionProps> = ({ id, title, images, onImageClick }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate images multiple times to create an "infinite" feel
  // We repeat the array 4 times to ensure enough scrollable content
  const displayImages = [...images, ...images, ...images, ...images];

  // Auto-Scroll Logic
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animationFrameId: number;

    const scroll = () => {
      if (!isDragging && !isPaused) {
        // If we've scrolled past the first set of images (approx), reset to 0 to loop
        // (Simplified infinite loop logic: if close to end, jump back to start)
        if (el.scrollLeft >= (el.scrollWidth - el.clientWidth - 10)) {
           el.scrollLeft = 0; 
        } else {
           el.scrollLeft += 1; // Adjust speed here (pixels per frame)
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isDragging, isPaused]);

  // Drag Events
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setIsPaused(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setIsPaused(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsPaused(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll-fastness
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section id={id} className="py-16 border-b border-gray-100 last:border-0 scroll-mt-20 overflow-hidden">
      <div className="max-w-[95%] mx-auto px-4 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div className="flex items-center gap-4">
            <div className="w-2 h-10 bg-brand-green rounded-sm"></div>
            <h2 className="text-3xl font-bold text-brand-navy uppercase tracking-wide">{title}</h2>
         </div>
         <div className="flex items-center gap-2 text-sm text-gray-400 italic font-light animate-pulse">
            <ChevronLeft size={16} /> Drag to explore <ChevronRight size={16} />
         </div>
      </div>
      
      {/* Draggable & Auto-scrolling Container */}
      <div 
        ref={scrollRef}
        className="w-full overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsPaused(true)}
      >
        <div className="flex gap-6 min-w-max pb-4 pl-4 pr-4">
          {displayImages.map((img, index) => (
            <div 
              key={`${id}-${index}`} 
              className="relative w-[280px] md:w-[320px] aspect-[3/4] flex-shrink-0 overflow-hidden rounded-sm bg-gray-100 group shadow-md hover:shadow-2xl transition-all duration-500 select-none"
              onClick={() => onImageClick(img)}
            >
              <img 
                src={img} 
                alt={`${title} product`} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 pointer-events-none" 
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center cursor-pointer">
                 <ZoomIn className="text-white w-10 h-10 mb-2 drop-shadow-md" />
                 <span className="text-white font-bold uppercase tracking-widest text-sm border-b-2 border-brand-green pb-1 drop-shadow-md">
                   View Detail
                 </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ==========================================
// Main Products Page
// ==========================================
const Products = () => {
  const { t } = useLanguage();
  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const openLightbox = (src: string) => {
    setSelectedImage(src);
    setModalOpen(true);
  };

  // Use productPage assets
  const products = [
    { id: 'knit', title: t('knit'), images: ASSETS.images.productPage.knit },
    { id: 'woven', title: t('woven'), images: ASSETS.images.productPage.woven },
    { id: 'nightwear', title: t('nightwear'), images: ASSETS.images.productPage.nightwear },
    { id: 'denim', title: t('denim'), images: ASSETS.images.productPage.denim },
    { id: 'outerwear', title: t('outerwear'), images: ASSETS.images.productPage.outerwear },
    { id: 'lingerie', title: t('lingerie'), images: ASSETS.images.productPage.lingerie },
    { id: 'activewear', title: t('activewear'), images: ASSETS.images.productPage.activewear },
    { id: 'hometextile', title: t('hometextile'), images: ASSETS.images.productPage.hometextile },
    { id: 'uniform', title: t('uniform'), images: ASSETS.images.productPage.uniform },
    { id: 'sweater', title: t('sweater'), images: ASSETS.images.productPage.sweater },
    { id: 'disney', title: t('disney'), images: ASSETS.images.productPage.license },
    { id: 'jersey', title: t('jersey'), images: ASSETS.images.productPage.jersey },
  ];

  return (
    <div>
      {/* Lightbox Modal */}
      <ImageModal 
        isOpen={modalOpen} 
        src={selectedImage} 
        onClose={() => setModalOpen(false)} 
      />

      {/* Hero Video */}
      <HeroVideo 
        title={t('prod_hero_title')} 
        subtitle={t('prod_hero_subtitle')}
        videoUrl={ASSETS.videos.products}
      />
      
      <div className="bg-white min-h-screen">
        <div className="max-w-[95%] mx-auto px-4 py-16 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1e3a8a] mb-6 font-serif">{t('prod_cat_title')}</h2>
            <p className="text-gray-700 max-w-4xl mx-auto leading-relaxed text-lg md:text-xl font-light">
                {t('prod_intro')}
                <br/><span className="text-sm text-gray-500 italic mt-2 block">{t('prod_drag_hint')}</span>
            </p>
        </div>

        {products.map(product => (
          <ProductGallery 
            key={product.id} 
            id={product.id} 
            title={product.title} 
            images={product.images} 
            onImageClick={openLightbox}
          />
        ))}

        {/* Call to Action at bottom */}
         <section className="py-20 bg-gray-50 text-center">
             <h2 className="text-2xl md:text-3xl font-bold text-brand-navy mb-6">{t('prod_custom_sol')}</h2>
             <a href="mailto:ceo@apparelbd.com" className="inline-block bg-brand-green text-white px-10 py-4 text-sm font-bold uppercase tracking-widest hover:bg-brand-navy transition-all shadow-lg rounded-sm">
                 {t('contactUs')}
             </a>
         </section>
      </div>
    </div>
  );
};

export default Products;