import React, { useState, useEffect, useRef } from 'react';
import HeroVideo from '../components/HeroVideo';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Users, Award, Leaf, CheckCircle, Scissors, Package, Ship, Truck, ClipboardCheck, Layers, Settings, Sparkles, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { ASSETS } from '../config/assets';
import { useLanguage } from '../contexts/LanguageContext';

interface Product {
  id: string;
  name: string;
  images: string[];
}

// Animated Counter Component
const AnimatedCounter = ({ target, duration = 2000, prefix = "" }: { target: number, duration?: number, prefix?: string }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Only animate once
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing: easeOutQuart for smooth effect
      const ease = 1 - Math.pow(1 - progress, 4);
      
      setCount(Math.floor(target * ease));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, target, duration]);

  return (
    <h3 ref={elementRef} className="text-5xl md:text-6xl font-bold text-brand-navy mb-4">
      {prefix}{count}
    </h3>
  );
};

// FadeInSection Component for Scroll Animation
const FadeInSection: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (domRef.current) observer.unobserve(domRef.current);
        }
      });
    }, { threshold: 0.1 });

    const currentElement = domRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`${className} ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}
      style={{ transition: 'opacity 0.5s, transform 0.5s' }}
    >
      {children}
    </div>
  );
};

// Internal Component for the Product Slider Card
const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    }, 3500); // Slide every 3.5 seconds
    return () => clearInterval(interval);
  }, [product.images.length]);

  return (
    <div className="relative w-full aspect-[3/4] overflow-hidden rounded-sm shadow-md group bg-gray-100">
      {/* Image Slider Container */}
      <div className="absolute inset-0 w-full h-full">
        {product.images.map((img, index) => {
          // Logic for slide positioning
          let positionClass = 'translate-x-full'; 
          
          if (index === currentImageIndex) {
            positionClass = 'translate-x-0 z-10'; 
          } else if (
            index === (currentImageIndex - 1 + product.images.length) % product.images.length
          ) {
            positionClass = '-translate-x-full z-0'; 
          }

          return (
            <img
              key={index}
              src={img}
              alt={`${product.name} view ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-in-out ${positionClass}`}
            />
          );
        })}
      </div>

      {/* Overlay - Gradient for better text visibility */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>

      {/* Clickable Overlay Name */}
      <div className="absolute inset-x-0 bottom-0 flex justify-center pb-6 z-20">
        <Link 
          to={`/products#${product.id}`}
          className="bg-black/40 backdrop-blur-md border border-white/20 text-white font-bold uppercase tracking-wider px-8 py-3 text-sm hover:bg-brand-blue hover:border-brand-blue transition-all duration-300 rounded-sm"
        >
          {product.name}
        </Link>
      </div>
    </div>
  );
};

const Home = () => {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentAboutSlide, setCurrentAboutSlide] = useState(0);
  
  // Use images from ASSETS config
  const sliderImages = ASSETS.images.home.slider;

  const productCategories = [
    { 
      id: 'knit',
      name: t('knit'), 
      images: ASSETS.images.products.knit
    },
    { 
      id: 'woven',
      name: t('woven'), 
      images: ASSETS.images.products.woven
    },
    { 
      id: 'nightwear',
      name: t('nightwear'), 
      images: ASSETS.images.products.nightwear
    },
    { 
      id: 'denim',
      name: t('denim'), 
      images: ASSETS.images.products.denim
    },
    { 
      id: 'outerwear',
      name: t('outerwear'), 
      images: ASSETS.images.products.outerwear
    },
    { 
      id: 'lingerie',
      name: t('lingerie'), 
      images: ASSETS.images.products.lingerie
    },
    { 
      id: 'activewear',
      name: t('activewear'), 
      images: ASSETS.images.products.activewear
    },
    { 
      id: 'hometextile',
      name: t('hometextile'), 
      images: ASSETS.images.products.hometextile
    },
    { 
      id: 'uniform',
      name: t('uniform'), 
      images: ASSETS.images.products.uniform
    },
    { 
      id: 'sweater',
      name: t('sweater'), 
      images: ASSETS.images.products.sweater
    },
    { 
      id: 'disney',
      name: t('disney'), 
      images: ASSETS.images.products.license
    },
    { 
      id: 'jute',
      name: t('jute'), 
      images: ASSETS.images.products.jute
    },
  ];

  const aboutSliderImages = ASSETS.images.home.aboutSlider;

  // Slide content for About Us slider
  const aboutSlidesData = [
    {
      title: t('home_slide_1_title'),
      description: t('home_slide_1_desc')
    },
    {
      title: t('home_slide_2_title'),
      description: t('home_slide_2_desc')
    },
    {
      title: t('home_slide_3_title'),
      description: t('home_slide_3_desc')
    },
    {
      title: t('home_slide_4_title'),
      description: t('home_slide_4_desc')
    },
    {
      title: t('home_slide_5_title'),
      description: t('home_slide_5_desc')
    },
    {
      title: t('home_slide_6_title'),
      description: t('home_slide_6_desc')
    },
    {
      title: t('home_slide_7_title'),
      description: t('home_slide_7_desc')
    },
    {
      title: t('home_slide_8_title'),
      description: t('home_slide_8_desc')
    },
    {
      title: t('home_slide_9_title'),
      description: t('home_slide_9_desc')
    },
    {
      title: t('home_slide_10_title'),
      description: t('home_slide_10_desc')
    },
    {
      title: t('home_slide_11_title'),
      description: t('home_slide_11_desc')
    },
    {
      title: t('home_slide_12_title'),
      description: t('home_slide_12_desc')
    }
  ];

  // Defined Logo Rows - 8 logos each
  const logosRow1 = [
    { name: 'RSC', url: ASSETS.images.logos.rsc },
    { name: 'BetterWork', url: ASSETS.images.logos.betterwork },
    { name: 'SMETA', url: ASSETS.images.logos.smeta },
    { name: 'amfori', url: ASSETS.images.logos.amfori },
    { name: 'GOTS', url: ASSETS.images.logos.gots },
    { name: 'Disney', url: ASSETS.images.logos.disney },
    { name: 'GRS', url: ASSETS.images.logos.grs },
    { name: 'Higg', url: ASSETS.images.logos.higg }
  ];

  const logosRow2 = [
    { name: 'BCI', url: ASSETS.images.logos.bci },
    { name: 'CTPAT', url: ASSETS.images.logos.ctpat },
    { name: 'NIRAPON', url: ASSETS.images.logos.nirapon },
    { name: 'ZDHC', url: ASSETS.images.logos.zdhc },
    { name: 'Oeko-Tex', url: ASSETS.images.logos.oekotex },
    { name: 'WRAP', url: ASSETS.images.logos.wrap },
    { name: 'ISO', url: ASSETS.images.logos.iso },
    { name: 'SA8000', url: ASSETS.images.logos.sa8000 }
  ];

  // Triple the logos for smooth marquee effect
  const marqueeLogos1 = [...logosRow1, ...logosRow1, ...logosRow1];
  const marqueeLogos2 = [...logosRow2, ...logosRow2, ...logosRow2];

  const marqueeStyles = `
    @keyframes scrollLeft {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    @keyframes scrollRight {
      0% { transform: translateX(-50%); }
      100% { transform: translateX(0); }
    }
    .animate-scroll-left {
      animation: scrollLeft 30s linear infinite;
    }
    .animate-scroll-right {
      animation: scrollRight 30s linear infinite;
    }
    .pause-hover:hover {
      animation-play-state: paused;
    }
  `;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 4000); 
    return () => clearInterval(timer);
  }, [sliderImages.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAboutSlide((prev) => (prev + 1) % aboutSliderImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [aboutSliderImages.length]);

  const nextAboutSlide = () => {
    setCurrentAboutSlide((prev) => (prev + 1) % aboutSliderImages.length);
  };

  const prevAboutSlide = () => {
    setCurrentAboutSlide((prev) => (prev - 1 + aboutSliderImages.length) % aboutSliderImages.length);
  };

  return (
    <div className="overflow-x-hidden">
      <style>{marqueeStyles}</style>

      {/* 1. Hero Video Section 
      */}
      <HeroVideo 
        title={t('home_hero_title')} 
        subtitle={t('home_hero_subtitle')}
        videoUrl={ASSETS.videos.home}
      />

      {/* 2. Quote Section */}
      <section className="bg-white py-16 border-b">
        <FadeInSection>
          <div className="max-w-[85%] mx-auto text-center px-4">
            <p className="text-2xl md:text-4xl font-serif italic text-brand-blue font-semibold leading-relaxed">
              "{t('home_quote')}"
            </p>
            <div className="w-20 h-1 bg-brand-green mx-auto mt-6 mb-4"></div>
            <p className="text-gray-500 font-bold uppercase tracking-[0.2em] text-sm md:text-base">{t('quote_author')}</p>
          </div>
        </FadeInSection>
      </section>

      {/* 3. Stats Section */}
      <section className="py-16 bg-white">
        <FadeInSection>
          <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-[#e7f9fd] py-12 px-8 rounded-3xl text-center shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-brand-light">
                  <AnimatedCounter target={5} prefix="+" />
                  <p className="text-base md:text-lg text-gray-600 uppercase tracking-widest font-bold">{t('stats_global')}</p>
              </div>
              <div className="bg-[#e7f9fd] py-12 px-8 rounded-3xl text-center shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-brand-light">
                  <AnimatedCounter target={40} prefix="+" />
                  <p className="text-base md:text-lg text-gray-600 uppercase tracking-widest font-bold">{t('stats_staff')}</p>
              </div>
              <div className="bg-[#e7f9fd] py-12 px-8 rounded-3xl text-center shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-brand-light">
                  <AnimatedCounter target={20} prefix="+" />
                  <p className="text-base md:text-lg text-gray-600 uppercase tracking-widest font-bold">{t('stats_rec')}</p>
              </div>
          </div>
        </FadeInSection>
      </section>

      {/* 4. About Us Section */}
      <section className="min-h-screen flex flex-col justify-center py-20 bg-white">
        <div className="w-full max-w-[90%] mx-auto px-4 flex flex-col gap-20">
            <FadeInSection>
              <div className="text-left w-full">
                  <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-1 bg-brand-navy"></div>
                      <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-navy tracking-tight">{t('home_about_title')}</h2>
                  </div>
                  <h3 className="text-2xl md:text-3xl text-gray-400 italic mb-8 font-light">{t('home_about_subtitle')}</h3>
                  <p className="text-gray-700 leading-relaxed text-lg md:text-xl text-justify font-light border-l-4 border-brand-green pl-6">
                      {t('home_about_text')}
                  </p>
              </div>
            </FadeInSection>

            <FadeInSection>
              <div className="w-full h-[50vh] md:h-[70vh] overflow-hidden rounded-2xl shadow-2xl relative group">
                    <img src={ASSETS.images.home.about.showroom} alt="ApparelBD Showroom" className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-[2s]" />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
              </div>
            </FadeInSection>

            <FadeInSection>
              <div className="w-full py-16 border-y border-gray-100 bg-gray-50/50">
                  <div className="w-full px-4">
                      <p className="font-serif italic text-brand-navy font-bold text-center leading-normal text-lg md:text-2xl">
                          "{t('home_about_quote')}"
                      </p>
                  </div>
              </div>
            </FadeInSection>

            <FadeInSection>
              <div className="w-full h-[50vh] md:h-[70vh] overflow-hidden rounded-2xl shadow-2xl">
                    <img src={ASSETS.images.home.about.process} alt="Design Process" className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-[2s]" />
              </div>
            </FadeInSection>

            <FadeInSection>
              <div className="w-full text-left">
                  <div className="mb-8">
                      <h4 className="font-bold text-black text-xl md:text-2xl mb-4">
                          {t('home_about_section_title')}
                      </h4>
                      <p className="text-gray-700 leading-relaxed text-lg md:text-xl text-justify font-light md:text-left">
                          {t('home_about_section_text')}
                      </p>
                  </div>
                  
                  <div className="w-full bg-[#eeffff] py-10 px-4 mb-10">
                      <p className="text-brand-navy font-bold text-lg md:text-2xl text-center font-serif">
                          {t('home_about_value_prop')}
                      </p>
                  </div>

                  <div className="text-left">
                      <Link to="/about" className="inline-block border border-brand-green px-6 py-2 text-xs font-medium uppercase tracking-wider text-black hover:bg-brand-green hover:text-white transition duration-300 rounded-sm">
                          {t('explore_more')}
                      </Link>
                  </div>
              </div>
            </FadeInSection>
        </div>
      </section>

      {/* 5. Fashion Evolution */}
      <section className="py-20 bg-[#e6e6e6]">
        <div className="max-w-[95%] mx-auto px-4">
            <FadeInSection>
              <div className="mb-12 text-left w-full">
                    <h2 className="text-4xl md:text-5xl font-bold text-[#1e3a8a] mb-2 font-sans tracking-tight">{t('home_fashion_title')}</h2>
                    <p className="text-sm font-bold text-gray-800 italic mb-4">{t('home_fashion_subtitle')}</p>
                    <p className="text-gray-700 leading-relaxed text-lg md:text-xl text-justify font-light w-full">
                      {t('home_fashion_text')}
                    </p>
              </div>
            </FadeInSection>

            <FadeInSection>
              <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
                  <div className="lg:col-span-5 flex flex-col justify-center">
                        <ul className="space-y-6 text-lg md:text-xl font-bold text-gray-800 mb-20">
                          {[
                              t('fashion_list_1'),
                              t('fashion_list_2'),
                              t('fashion_list_3'),
                              t('fashion_list_4'),
                              t('fashion_list_5'),
                          ].map((item, i) => (
                              <li key={i} className="flex items-start">
                                  <span className="mr-3 transform scale-125 text-[#1e3a8a]">•</span>
                                  <span>{item}</span>
                              </li>
                          ))}
                      </ul>
                      <div>
                            <Link to="/market-intel" className="inline-block border-2 border-gray-600 px-8 py-3 text-xs md:text-sm font-bold text-gray-800 hover:bg-[#1e3a8a] hover:text-white hover:border-[#1e3a8a] transition uppercase tracking-wider bg-transparent">
                              {t('explore_more')}
                          </Link>
                      </div>
                  </div>

                  {/* Fashion Evolution Slide Images - Updated: No frame, auto height, no logo */}
                  <div className="lg:col-span-7 w-full relative">
                        {sliderImages.map((src, index) => (
                          <img 
                            key={index}
                            src={src} 
                            className={`w-full h-auto object-contain transition-opacity duration-1000 ease-in-out block rounded-sm shadow-2xl ${
                                currentSlide === index 
                                    ? 'relative opacity-100 z-10' 
                                    : 'absolute top-0 left-0 opacity-0 z-0'
                            }`}
                            alt={`Fashion Slide ${index + 1}`} 
                          />
                        ))}
                  </div>
              </div>
            </FadeInSection>
        </div>
      </section>

      {/* 6. Market Intel Design */}
      <section className="pt-20 pb-0 bg-[#f3f4f6]">
          <div className="max-w-[95%] mx-auto px-4">
              <FadeInSection>
                <div className="mb-12">
                    <h2 className="text-4xl font-bold text-[#1e3a8a] uppercase tracking-tight mb-1">{t('marketIntel')}</h2>
                    <p className="text-[11px] font-medium text-gray-800 italic mb-10">{t('mi_subtitle')}</p>
                    
                    <div className="space-y-6">
                        <h3 className="text-lg font-bold text-black leading-tight">{t('mi_innovation_title')}</h3>
                        <p className="text-sm font-bold text-black italic">{t('mi_revolution_text')}</p>
                        <p className="text-gray-700 leading-relaxed text-lg md:text-xl text-justify font-light">
                            {t('mi_desc_text')}
                        </p>

                        <p className="text-[11px] md:text-[12px] font-bold italic text-gray-500">"{t('mi_final_banner')}</p>
                    </div>
                </div>
              </FadeInSection>

              <div className="mt-16">
                  <FadeInSection>
                    <h2 className="text-4xl font-bold text-[#1e3a8a] mb-1">{t('mi_studio_header')}</h2>
                    <p className="text-[11px] font-medium text-gray-800 italic mb-8">{t('mi_studio_sub')}</p>
                  </FadeInSection>

                  <FadeInSection>
                    <div className="grid lg:grid-cols-12 gap-8 items-center mb-16">
                        <div className="lg:col-span-8">
                            <div className="w-full h-[300px] md:h-[500px] rounded-sm overflow-hidden shadow-sm">
                                <img src={ASSETS.images.home.marketIntel.studio} alt="Design Studio Showroom" className="w-full h-full object-cover" />
                            </div>
                        </div>
                        <div className="lg:col-span-4">
                            <h3 className="text-2xl font-bold text-[#1e3a8a] mb-4">{t('mi_london_title')}</h3>
                            <div className="space-y-4">
                                <p className="text-gray-700 leading-relaxed text-lg md:text-xl text-justify font-light">
                                    {t('mi_london_text')}
                                </p>
                                <p className="text-[11px] md:text-[12px] font-bold italic text-black">{t('mi_build_future')}</p>
                            </div>
                        </div>
                    </div>
                  </FadeInSection>

                  <FadeInSection>
                    <div className="grid lg:grid-cols-12 gap-8 items-center mb-16">
                        <div className="lg:col-span-5">
                            <h3 className="text-2xl font-bold text-[#1e3a8a] mb-2">{t('mi_dhaka_title')}</h3>
                            <p className="text-[11px] font-medium text-gray-500 italic mb-4">{t('mi_dhaka_sub')}</p>
                            <div className="space-y-4">
                                <p className="text-gray-700 leading-relaxed text-lg md:text-xl text-justify font-light">
                                    {t('mi_dhaka_text')}
                                </p>
                                <p className="text-[11px] md:text-[12px] font-bold italic text-black">{t('mi_from_dhaka_text')}</p>
                            </div>
                        </div>
                        <div className="lg:col-span-7">
                            <div className="w-full h-[300px] md:h-[500px] rounded-sm overflow-hidden shadow-sm">
                                <img src={ASSETS.images.home.marketIntel.dhaka} alt="Dhaka Design Studio" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                  </FadeInSection>
              </div>

              <div className="mt-20 pt-10 pb-20 border-t border-gray-200 text-left">
                  <FadeInSection>
                    <Link to="/market-intel" className="inline-block border border-brand-green px-6 py-1.5 text-[10px] font-bold text-gray-700 hover:bg-brand-green hover:text-white transition uppercase tracking-widest rounded-sm">
                        {t('explore_more')}
                    </Link>
                  </FadeInSection>
              </div>
          </div>
      </section>

      {/* New Parallax Quote Section */}
      <section 
        className="relative h-[70vh] flex items-center justify-center bg-center bg-cover"
        style={{ 
          // This is where the local image is applied
          backgroundImage: `url('${ASSETS.images.home.fashionQuoteParallax}')`,
          backgroundAttachment: 'fixed'
        }} 
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
              <FadeInSection>
                <h3 className="text-white font-serif text-2xl md:text-5xl italic leading-relaxed font-semibold shadow-black/50 drop-shadow-2xl">
                  "{t('home_fashion_quote_parallax')}"
               </h3>
              </FadeInSection>
        </div>
      </section>

      {/* 7. Ethical & Responsive Sourcing */}
      <section className="py-16 bg-[#f4fff4]">
          <div className="max-w-[95%] mx-auto px-4 lg:px-8">
              <FadeInSection>
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    <div className="pt-10">
                        <h2 className="text-4xl md:text-6xl font-bold text-[#88c057] mb-8">{t('eth_hero_title')}</h2>
                        <p className="text-gray-700 leading-relaxed text-lg md:text-xl text-justify font-light mb-10">
                          {t('eth_desc_home')}
                        </p>
                        <Link to="/ethical-sourcing" className="inline-block border border-gray-400 px-6 py-2 text-[10px] font-bold text-black uppercase tracking-widest hover:bg-brand-green hover:text-white transition-all">
                          {t('explore_more')}
                        </Link>
                    </div>
                    
                    {/* Updated Right Side: Background Image + 2 Rows of Scrolling Logos */}
                    <div className="relative pt-6">
                        <div className="relative w-full aspect-[16/9] overflow-hidden rounded-sm border-4 border-white shadow-sm">
                            <img src={ASSETS.images.home.ethical} alt="Nature" className="w-full h-full object-cover opacity-80" />
                            {/* Logo Overlay with Scrolling Rows */}
                            <div className="absolute inset-0 flex flex-col justify-center gap-6 py-4 bg-black/10">
                                {/* Row 1: Right to Left */}
                                <div className="w-full overflow-hidden">
                                      <div className="flex gap-4 w-max animate-scroll-left pause-hover px-4">
                                         {marqueeLogos1.map((logo, i) => (
                                             <div key={`r1-${i}`} className="w-24 h-16 md:w-32 md:h-20 bg-white/90 p-2 rounded-sm flex items-center justify-center shadow-sm shrink-0">
                                                  <img 
                                                     src={logo.url} 
                                                     alt={logo.name} 
                                                     className="max-w-full max-h-full object-contain mix-blend-multiply" 
                                                     onError={(e) => {
                                                         const target = e.target as HTMLImageElement;
                                                         target.style.display = 'none';
                                                         // Optional: Add text fallback if image fails
                                                     }}
                                                  />
                                             </div>
                                         ))}
                                      </div>
                                </div>
                                {/* Row 2: Left to Right (Opposite) */}
                                <div className="w-full overflow-hidden">
                                      <div className="flex gap-4 w-max animate-scroll-right pause-hover px-4">
                                         {marqueeLogos2.map((logo, i) => (
                                             <div key={`r2-${i}`} className="w-24 h-16 md:w-32 md:h-20 bg-white/90 p-2 rounded-sm flex items-center justify-center shadow-sm shrink-0">
                                                  <img 
                                                     src={logo.url} 
                                                     alt={logo.name} 
                                                     className="max-w-full max-h-full object-contain mix-blend-multiply" 
                                                     onError={(e) => {
                                                         const target = e.target as HTMLImageElement;
                                                         target.style.display = 'none';
                                                     }}
                                                  />
                                             </div>
                                         ))}
                                      </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 bg-[#88c057] py-4 px-6 text-center">
                            <p className="text-white font-serif italic text-lg md:text-2xl font-bold">
                              {t('eth_banner_text')}
                            </p>
                        </div>
                    </div>
                </div>
              </FadeInSection>
          </div>
      </section>

      {/* 8. Sustainability Section */}
      <section className="pt-20 pb-32 bg-[#f4fff4] overflow-hidden border-t border-gray-100">
        <div className="max-w-[95%] mx-auto px-4 lg:px-8">
          <div className="relative">
            {/* Top Row */}
            <FadeInSection>
              <div className="grid lg:grid-cols-2 gap-8 items-start mb-24 relative z-0">
                <div className="pt-10">
                  <h2 className="text-4xl md:text-6xl font-bold text-[#88c057] mb-8 tracking-tight">{t('sustainability')}</h2>
                  <div className="space-y-6">
                    <p className="text-gray-700 leading-relaxed text-lg md:text-xl text-justify font-light">
                      {t('sus_desc_1')}
                    </p>
                    <p className="text-gray-700 leading-relaxed text-lg md:text-xl text-justify font-light">
                      {t('sus_desc_2')}
                    </p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="w-full max-w-[550px] aspect-square rounded-sm overflow-hidden shadow-2xl border-4 border-white transform translate-x-8">
                    <img src={ASSETS.images.home.sustainability.forest} alt="Forest" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </FadeInSection>

            {/* Middle Image - Stones */}
            <FadeInSection>
              <div className="relative z-20 -mt-48 md:-mt-80 mb-24 flex justify-center">
                <div className="relative w-full max-w-4xl aspect-[21/9] rounded-sm overflow-hidden shadow-2xl border-4 border-white">
                  <img src={ASSETS.images.home.sustainability.stones} alt="Stones" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-6 text-center">
                    <p className="text-white font-bold text-lg md:text-3xl leading-tight drop-shadow-lg whitespace-pre-line">
                      {t('sus_image_text')}
                    </p>
                  </div>
                </div>
              </div>
            </FadeInSection>

            {/* Bottom Row */}
            <FadeInSection>
              <div className="grid lg:grid-cols-2 gap-8 items-end relative z-0 -mt-20 md:-mt-48">
                <div className="transform translate-x-8 md:translate-x-32">
                  <div className="w-full max-w-[550px] aspect-[4/3] rounded-sm overflow-hidden shadow-2xl border-4 border-white">
                    <img src={ASSETS.images.home.sustainability.tree} alt="Tree" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="pb-8 pl-10">
                  <div className="space-y-6">
                    <p className="text-gray-700 leading-relaxed text-lg md:text-xl text-justify font-light">
                      {t('sus_desc_3')}
                    </p>
                    <p className="text-gray-700 leading-relaxed text-lg md:text-xl text-justify font-light">
                      {t('sus_heading')}
                    </p>
                    <Link to="/sustainability" className="inline-block border border-brand-green px-8 py-3 text-xs font-bold text-black uppercase tracking-widest hover:bg-brand-green hover:text-white transition-all shadow-sm">
                      {t('explore_more')}
                    </Link>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* 9. Green Banner Quote */}
      <div className="bg-[#88c057] py-12 text-center text-white px-4 border-t-2 border-white/20">
          <FadeInSection>
            <div className="max-w-7xl mx-auto">
               <p className="text-xl md:text-2xl lg:text-3xl font-serif italic font-bold tracking-tight leading-none drop-shadow-md whitespace-nowrap overflow-hidden text-ellipsis">
                  "{t('earth_quote')}"
               </p>
            </div>
          </FadeInSection>
      </div>

      {/* 10. Manufacturing Excellence */}
       <section className="py-24 bg-[#e6e6e6]">
        <div className="max-w-[95%] mx-auto px-4 lg:px-8">
           {/* Top Text Block */}
           <FadeInSection>
             <div className="mb-24 text-left">
                   <h2 className="text-4xl md:text-6xl font-bold text-[#1e3a8a] mb-2 font-sans tracking-tight uppercase">{t('manufacturing')}</h2>
                   <p className="text-sm font-bold text-gray-800 italic mb-6">{t('mfg_subtitle_home')}</p>
                   <p className="text-gray-700 leading-relaxed text-lg md:text-xl text-justify font-light w-full">
                     {t('mfg_desc_home')}
                   </p>
             </div>
           </FadeInSection>

           {/* Content Grid 1: Fitting/Garment */}
           <FadeInSection>
             <div className="grid lg:grid-cols-12 gap-12 items-center mb-32">
                {/* Left: Text */}
                <div className="lg:col-span-5 text-left">
                   <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a8a] mb-2 font-sans tracking-tight">{t('mfg_fitting_title')}</h2>
                   <p className="text-sm font-bold text-gray-800 italic mb-8">{t('mfg_fitting_sub')}</p>
                   <p className="text-gray-700 leading-relaxed text-lg md:text-xl text-justify font-light mb-8">
                     {t('mfg_fitting_desc')}
                   </p>
                   <Link to="/manufacturing" className="inline-block bg-[#1e3a8a] text-white px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-[#1e3a8a]/90 transition-all shadow-xl rounded-sm">
                     {t('explore_more')}
                   </Link>
                </div>

                {/* Right: Single Image Area */}
                <div className="lg:col-span-7 relative h-[500px] bg-[#f8f8f8] shadow-2xl rounded-sm overflow-hidden border-4 border-white group">
                    <img 
                        src={ASSETS.images.manufacturing.fitting} 
                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                        alt="Manufacturing Excellence"
                    />
                </div>
             </div>
           </FadeInSection>
           
           {/* Content Grid 2: Production Control */}
           <FadeInSection>
             <div className="grid lg:grid-cols-2 gap-16 items-center">
                 {/* Diagram Side (Left) - Now just an image without overlays */}
                 <div className="relative w-full aspect-[4/3] md:aspect-video bg-gray-100 rounded-sm overflow-hidden shadow-2xl border-4 border-white group">
                    <img 
                      src={ASSETS.images.manufacturing.production} 
                      className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105" 
                      alt="Production Control" 
                    />
                 </div>

                 {/* Text Side (Right) */}
                 <div className="flex flex-col justify-center">
                      <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a8a] mb-4">{t('mfg_prod_ctrl_title')}</h2>
                      <p className="text-black italic font-medium mb-8 text-lg">
                          {t('mfg_prod_sub')}
                      </p>
                      <div className="space-y-6 text-gray-700 leading-relaxed text-lg md:text-xl text-justify font-light">
                          <p>
                              {t('mfg_prod_desc_1')}
                          </p>
                          <p>
                              {t('mfg_prod_desc_2')}
                          </p>
                      </div>
                 </div>
             </div>
           </FadeInSection>

            {/* Content Grid 3: Capacity Planning Details */}
           <FadeInSection>
             <div className="grid lg:grid-cols-2 gap-12 items-center mt-20">
                 {/* Left: Text */}
                 <div>
                     <p className="text-gray-700 leading-relaxed text-lg md:text-xl text-justify font-light mb-8">
                         {t('mfg_capacity_desc_1')}
                     </p>
                     <p className="text-gray-700 leading-relaxed text-lg md:text-xl text-justify font-light mb-8">
                         {t('mfg_capacity_desc_2')}
                     </p>
                     <Link to="/manufacturing" className="inline-block border border-gray-500 px-6 py-2 text-[10px] font-bold text-black uppercase tracking-widest hover:bg-[#1e3a8a] hover:text-white hover:border-[#1e3a8a] transition-all bg-[#e6e6e6]">
                         {t('explore_more')}
                      </Link>
                 </div>
                 
                 {/* Right: Image */}
                 <div className="w-full h-[400px] rounded-sm overflow-hidden shadow-xl border-4 border-white">
                     <img 
                          src={ASSETS.images.manufacturing.capacity} 
                          alt="Garment Factory Production" 
                          className="w-full h-full object-cover"
                     />
                 </div>
             </div>
           </FadeInSection>

           {/* Top Quote for QA */}
           <FadeInSection>
             <div className="text-center mt-24 mb-12">
                  <p className="font-serif italic font-bold text-black text-lg md:text-xl tracking-wide">
                      "{t('mfg_qa_quote')}"
                  </p>
             </div>
           </FadeInSection>

           {/* Content Grid 4: Quality Assurance */}
           <FadeInSection>
             <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
                 {/* Left: Image */}
                 <div className="w-full h-[500px] bg-gray-100 rounded-sm overflow-hidden shadow-2xl border-4 border-white relative group">
                     <img 
                          src={ASSETS.images.manufacturing.qa} 
                          alt="Quality Assurance Team" 
                          className="w-full h-full object-cover"
                     />
                 </div>

                 {/* Right: Text */}
                 <div>
                      <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a8a] mb-2 font-sans tracking-tight">{t('mfg_qa_title')}</h2>
                      <p className="text-sm font-bold text-gray-800 italic mb-8">{t('mfg_qa_sub')}</p>
                      <p className="text-gray-700 leading-relaxed text-lg md:text-xl text-justify font-light mb-8">
                          {t('mfg_qa_desc')}
                      </p>
                      <Link to="/manufacturing" className="inline-block border border-gray-500 px-6 py-2 text-[10px] font-bold text-black uppercase tracking-widest hover:bg-[#1e3a8a] hover:text-white hover:border-[#1e3a8a] transition-all bg-[#e6e6e6]">
                          {t('explore_more')}
                      </Link>
                 </div>
             </div>
           </FadeInSection>
           
           {/* Fair Traceability Section - New Addition */}
           <FadeInSection>
             <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
               {/* Left: Text */}
               <div>
                  <h2 className="text-4xl md:text-5xl font-bold text-[#1e3a8a] mb-2 font-sans tracking-tight">{t('mfg_trace_title')}</h2>
                  <p className="text-sm font-bold text-gray-800 italic mb-8">{t('mfg_trace_sub')}</p>
                  <p className="font-bold text-gray-900 mb-6 italic text-sm md:text-base">
                      {t('mfg_trace_bold')}
                  </p>
                  <p className="text-gray-700 leading-relaxed text-lg md:text-xl text-justify font-light mb-8">
                      {t('mfg_trace_desc')}
                  </p>
                  <Link to="/ethical-sourcing" className="inline-block border border-gray-500 px-6 py-2 text-[10px] font-bold text-black uppercase tracking-widest hover:bg-[#1e3a8a] hover:text-white hover:border-[#1e3a8a] transition-all bg-[#e6e6e6]">
                      {t('explore_more')}
                  </Link>
               </div>

               {/* Right: Picture Only */}
               <div className="relative w-full aspect-[4/3] bg-white border-4 border-white rounded-sm overflow-hidden shadow-2xl">
                   <img 
                      src={ASSETS.images.manufacturing.traceability} 
                      alt="Traceability Diagram"
                      className="w-full h-full object-cover" 
                   />
               </div>
             </div>
           </FadeInSection>

           {/* Shipping And Logistics */}
           <FadeInSection>
             <div className="grid lg:grid-cols-2 gap-16 items-center">
                 {/* Left: Image */}
                 <div className="w-full h-[400px] md:h-[500px] rounded-sm overflow-hidden shadow-2xl border-4 border-white relative group">
                     <img 
                          src={ASSETS.images.manufacturing.logistics} 
                          alt="Shipping and Logistics" 
                          className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                     />
                 </div>

                 {/* Right: Text */}
                 <div>
                      <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a8a] mb-2 font-sans tracking-tight">{t('mfg_logistics_title')}</h2>
                      <p className="text-sm font-bold text-gray-800 italic mb-8">{t('mfg_logistics_sub')}</p>
                      <p className="text-gray-700 leading-relaxed text-lg md:text-xl text-justify font-light mb-8">
                          {t('mfg_logistics_desc')}
                      </p>
                      <Link to="/manufacturing" className="inline-block border border-gray-500 px-6 py-2 text-[10px] font-bold text-black uppercase tracking-widest hover:bg-[#1e3a8a] hover:text-white hover:border-[#1e3a8a] transition-all bg-[#e6e6e6]">
                          {t('explore_more')}
                      </Link>
                 </div>
             </div>
           </FadeInSection>

           {/* New Quote Banner */}
           <FadeInSection>
             <div className="mt-24 w-full bg-[#e0f7fa] py-12 px-6 text-center shadow-md border-y border-white">
                 <p className="text-[#3b6d8f] text-xl md:text-2xl font-serif italic font-bold leading-relaxed">
                     "{t('mfg_logistics_quote')}"
                 </p>
             </div>
           </FadeInSection>

        </div>
      </section>

      {/* 11. Products Section */}
      <section className="py-20 bg-gray-200">
        <div className="max-w-[95%] mx-auto px-4">
             <FadeInSection>
               <div className="text-center mb-16">
                   <h2 className="text-4xl md:text-5xl font-bold text-[#1e3a8a] mb-6">{t('products')}</h2>
                   <p className="text-gray-700 mx-auto leading-relaxed text-lg md:text-xl text-justify font-light">
                     {t('prod_desc_home')} {t('prod_desc_home_2')}
                   </p>
               </div>
             </FadeInSection>

             <FadeInSection>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {productCategories.map((product, idx) => (
                      <ProductCard key={idx} product={product} />
                  ))}
               </div>
             </FadeInSection>
        </div>
      </section>
      
      {/* 12. Inquiry Parallax Section */}
      <section 
        className="relative h-[60vh] w-full flex items-center justify-center bg-fixed bg-center bg-cover"
        style={{ 
          backgroundImage: `url('${ASSETS.images.home.inquiry}')`,
          backgroundAttachment: 'fixed'
        }} 
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-12 w-full text-left">
             <FadeInSection>
               <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
                 {t('inquiry_title')}
               </h2>
               <h3 className="text-2xl md:text-3xl font-bold text-white mb-10 drop-shadow-lg">
                 {t('inquiry_subtitle')}
               </h3>
               <a href="mailto:info@apparelbd.com" className="inline-block border border-[#88c057] text-white px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-[#88c057] transition-all bg-[#88c057]/20 backdrop-blur-sm rounded-sm">
                 {t('click_here')}
               </a>
             </FadeInSection>
        </div>
      </section>

      {/* 13. All About Us - 12 Image Slider Section */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-[95%] mx-auto px-4">
            <FadeInSection>
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                  
                  {/* Left Side: Text */}
                  <div className="text-left">
                      <h2 className="text-4xl md:text-5xl font-bold text-[#1e3a8a] mb-8 font-sans">{t('all_about_us_title')}</h2>
                      <p className="text-gray-700 leading-relaxed text-lg md:text-xl text-justify font-light">
                          {t('all_about_us_desc')}
                      </p>
                  </div>

                  {/* Right Side: Image Slider */}
                  <div className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-2xl group bg-[#f0f9f0]">
                      {/* Slides Container */}
                      <div className="relative w-full h-full">
                          {aboutSliderImages.map((img, index) => {
                              let positionClass = 'translate-x-full opacity-0'; 
                              let textClass = 'opacity-0 scale-50 translate-y-10'; // Default start state for animation

                              if (index === currentAboutSlide) {
                                  positionClass = 'translate-x-0 opacity-100 z-10';
                                  // Active State: Fade in, scale up to 100%, move to original Y. Added delay so it appears after image slide.
                                  textClass = 'opacity-100 scale-100 translate-y-0 transition-all duration-1000 ease-out delay-500';
                              } else if (
                                  index === (currentAboutSlide - 1 + aboutSliderImages.length) % aboutSliderImages.length
                              ) {
                                  positionClass = '-translate-x-full opacity-0 z-0';
                                  textClass = 'opacity-0 scale-50 translate-y-10 transition-all duration-300';
                              } else {
                                  textClass = 'opacity-0 scale-50 translate-y-10 transition-all duration-300';
                              }
                              
                              // Safe access to slide data, fallback if data missing
                              const slideInfo = aboutSlidesData[index % aboutSlidesData.length] || { title: "", description: "" };

                              return (
                                  <div 
                                      key={index}
                                      className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out ${positionClass}`}
                                  >
                                      <img 
                                          src={img} 
                                          alt={`About Us Slide ${index + 1}`} 
                                          className="w-full h-full object-cover"
                                      />
                                      {/* Overlay Text with Animation */}
                                      <div className={`absolute bottom-10 left-10 text-white drop-shadow-md z-20 max-w-[90%] md:max-w-[70%] ${textClass}`}>
                                          <h3 className="text-2xl md:text-3xl font-bold mb-2 leading-tight">{slideInfo.title}</h3>
                                          <p className="text-sm md:text-base font-medium leading-relaxed">{slideInfo.description}</p>
                                      </div>
                                  </div>
                              );
                          })}
                      </div>

                      {/* Navigation Arrows */}
                      <button 
                          onClick={prevAboutSlide}
                          className="absolute left-4 top-1/2 -translate-y-1/2 bg-transparent hover:bg-black/20 text-white p-2 rounded-full transition-all z-20"
                      >
                          <ChevronLeft className="w-8 h-8" />
                      </button>
                      <button 
                          onClick={nextAboutSlide}
                          className="absolute right-4 top-1/2 -translate-y-1/2 bg-transparent hover:bg-black/20 text-white p-2 rounded-full transition-all z-20"
                      >
                          <ChevronRight className="w-8 h-8" />
                      </button>

                      {/* Dot Indicators */}
                      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
                          {aboutSliderImages.map((_, idx) => (
                              <button
                                  key={idx}
                                  onClick={() => setCurrentAboutSlide(idx)}
                                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                      currentAboutSlide === idx ? 'bg-black w-4' : 'bg-gray-400/50 hover:bg-white'
                                  }`}
                              />
                          ))}
                      </div>
                  </div>
              </div>
            </FadeInSection>
        </div>
      </section>
    </div>
  );
};

export default Home;