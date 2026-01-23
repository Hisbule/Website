import React, { useState, useEffect, useRef } from 'react';
import HeroVideo from '../components/HeroVideo';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Users, Award, Leaf, CheckCircle, Scissors, Package, Ship, Truck, ClipboardCheck, Layers, Settings, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { ASSETS } from '../config/assets';

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
          // Active image is at 0. Previous image slides to -100%. Next/Others wait at 100%.
          let positionClass = 'translate-x-full'; // Default: waiting on the right
          
          if (index === currentImageIndex) {
            positionClass = 'translate-x-0 z-10'; // Active: center
          } else if (
            index === (currentImageIndex - 1 + product.images.length) % product.images.length
          ) {
            positionClass = '-translate-x-full z-0'; // Previous: moved to left
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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentAboutSlide, setCurrentAboutSlide] = useState(0);
  
  const sliderImages = [
    "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2000&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1529139574466-a302d27460ae?q=80&w=2000&auto=format&fit=crop"
  ];

  const productCategories = [
    { 
      id: 'knit',
      name: 'Knit', 
      images: [
        'https://images.unsplash.com/photo-1620799140408-ed5341cd2431?q=80&w=2000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=2000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=2000&auto=format&fit=crop'
      ]
    },
    { 
      id: 'woven',
      name: 'Woven', 
      images: [
        'https://images.unsplash.com/photo-1520218508822-998633d997a6?q=80&w=2000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=2000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=2000&auto=format&fit=crop'
      ]
    },
    { 
      id: 'nightwear',
      name: 'Nightwear', 
      images: [
        'https://images.unsplash.com/photo-1571513722275-4b41940954b3?q=80&w=2000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1512413316925-fd4b93f31521?q=80&w=2000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1596356453261-0d265ae2520a?q=80&w=2000&auto=format&fit=crop'
      ]
    },
    { 
      id: 'denim',
      name: 'Denim', 
      images: [
        'https://images.unsplash.com/photo-1542272617-08f08630329f?q=80&w=2000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1582552938357-32b906df40cb?q=80&w=2000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?q=80&w=2000&auto=format&fit=crop'
      ]
    },
    { 
      id: 'outerwear',
      name: 'Outer Wear', 
      images: [
        'https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=2000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=2000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1551028919-ac66c9a3d683?q=80&w=2000&auto=format&fit=crop'
      ]
    },
    { 
      id: 'lingerie',
      name: 'Lingerie', 
      images: [
        'https://images.unsplash.com/photo-1596482103565-d603a1163152?q=80&w=2000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1616149562385-1d84e79478bb?q=80&w=2000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1546200231-c0353c829e24?q=80&w=2000&auto=format&fit=crop'
      ]
    },
    { 
      id: 'activewear',
      name: 'Activewear', 
      images: [
        'https://images.unsplash.com/photo-1518459031867-a89b944bffe4?q=80&w=2000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1483721310020-03333e577078?q=80&w=2000&auto=format&fit=crop'
      ]
    },
    { 
      id: 'hometextile',
      name: 'Home Textile', 
      images: [
        'https://images.unsplash.com/photo-1522771753035-4a503f3a6352?q=80&w=2000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=2000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1505693416388-b03467220886?q=80&w=2000&auto=format&fit=crop'
      ]
    },
    { 
      id: 'uniform',
      name: 'Uniform', 
      images: [
        'https://images.unsplash.com/photo-1584467541268-b040f83be3dd?q=80&w=2000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2000&auto=format&fit=crop'
      ]
    },
    { 
      id: 'sweater',
      name: 'Sweater', 
      images: [
        'https://images.unsplash.com/photo-1611090159492-3866d936e788?q=80&w=2000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1572495532056-8583af1cbae0?q=80&w=2000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1453486030486-0a5ffcd82cd9?q=80&w=2000&auto=format&fit=crop'
      ]
    },
    { 
      id: 'disney',
      name: 'License Products', 
      images: [
        'https://images.unsplash.com/photo-1535572290543-523a3d6e1b0c?q=80&w=2000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=2000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1515488042361-25f468213b6e?q=80&w=2000&auto=format&fit=crop'
      ]
    },
    { 
      id: 'jute',
      name: 'Jute & Crafts', 
      images: [
        'https://images.unsplash.com/photo-1550974797-0dc2a420952d?q=80&w=2000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1617325247661-675ab4b64ae4?q=80&w=2000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1544367563-12123d832e34?q=80&w=2000&auto=format&fit=crop'
      ]
    },
  ];

  const aboutSliderImages = [
    "https://images.unsplash.com/photo-1596700874052-b8833917d05c?q=80&w=2070&auto=format&fit=crop", // Traceability Diagram style
    "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2070&auto=format&fit=crop", // Factory
    "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=2070&auto=format&fit=crop", // Fabric
    "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=2274&auto=format&fit=crop", // Showroom
    "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=2000&auto=format&fit=crop", // Knit
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop", // Data
    "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop", // Office
    "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2340&auto=format&fit=crop", // Planning
    "https://images.unsplash.com/photo-1529139574466-a302d27460ae?q=80&w=2000&auto=format&fit=crop", // Fashion
    "https://images.unsplash.com/photo-1605256585681-455837661b18?q=80&w=2070&auto=format&fit=crop", // Sewing
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2000&auto=format&fit=crop", // Active
    "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=2000&auto=format&fit=crop"  // Texture
  ];

  const logos = [
    { name: 'RSC', url: 'https://seeklogo.com/images/R/rsc-logo-7B8B1A2A6C-seeklogo.com.png' },
    { name: 'BetterWork', url: 'https://betterwork.org/wp-content/uploads/2016/04/BW-Logo-300x100.png' },
    { name: 'SMETA', url: 'https://www.sedex.com/wp-content/uploads/2021/03/SMETA-Logo-1.png' },
    { name: 'amfori', url: 'https://www.amfori.org/sites/default/files/amfori_logo_blue_rgb.png' },
    { name: 'GOTS', url: 'https://global-standard.org/images/GOTS_Logo_Global_Organic_Textile_Standard.png' },
    { name: 'BCI', url: 'https://bettercotton.org/wp-content/themes/bettercotton/assets/img/bci-logo.png' },
    { name: 'CTPAT', url: 'https://www.cbp.gov/sites/default/files/ctpat-logo.png' },
    { name: 'NIRAPON', url: 'https://nirapon.org/wp-content/uploads/2019/04/Nirapon-Logo-Final-01-300x127.png' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 4000); // Change slide every 4 seconds
    return () => clearInterval(timer);
  }, []);

  // Auto slide for About Section
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAboutSlide((prev) => (prev + 1) % aboutSliderImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const nextAboutSlide = () => {
    setCurrentAboutSlide((prev) => (prev + 1) % aboutSliderImages.length);
  };

  const prevAboutSlide = () => {
    setCurrentAboutSlide((prev) => (prev - 1 + aboutSliderImages.length) % aboutSliderImages.length);
  };

  return (
    <div className="overflow-x-hidden">
      {/* 
        1. Hero Video Section 
      */}
      <HeroVideo 
        title="Committed for Fashion Evolution through..." 
        subtitle="Market Intel Design Support, Product Innovation & Newness, Wide Ranging Versatile Products"
        videoUrl={ASSETS.videos.home}
      />

      {/* 2. Quote Section */}
      <section className="bg-white py-16 border-b">
        <FadeInSection>
          <div className="max-w-[85%] mx-auto text-center px-4">
            <p className="text-2xl md:text-4xl font-serif italic text-brand-blue font-semibold leading-relaxed">
              "The way to get started is to quit talking and begin doing."
            </p>
            <div className="w-20 h-1 bg-brand-green mx-auto mt-6 mb-4"></div>
            <p className="text-gray-500 font-bold uppercase tracking-[0.2em] text-sm md:text-base">- Walt Disney</p>
          </div>
        </FadeInSection>
      </section>

      {/* 3. Stats Section */}
      <section className="py-16 bg-white">
        <FadeInSection>
          <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-[#e7f9fd] py-12 px-8 rounded-3xl text-center shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-brand-light">
                  <AnimatedCounter target={5} prefix="+" />
                  <p className="text-base md:text-lg text-gray-600 uppercase tracking-widest font-bold">Global Presence</p>
              </div>
              <div className="bg-[#e7f9fd] py-12 px-8 rounded-3xl text-center shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-brand-light">
                  <AnimatedCounter target={40} prefix="+" />
                  <p className="text-base md:text-lg text-gray-600 uppercase tracking-widest font-bold">Staff World Wide</p>
              </div>
              <div className="bg-[#e7f9fd] py-12 px-8 rounded-3xl text-center shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-brand-light">
                  <AnimatedCounter target={20} prefix="+" />
                  <p className="text-base md:text-lg text-gray-600 uppercase tracking-widest font-bold">Recommended</p>
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
                      <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-navy tracking-tight">ABOUT US</h2>
                  </div>
                  <h3 className="text-2xl md:text-3xl text-gray-400 italic mb-8 font-light">Who We Are... !!</h3>
                  <p className="text-gray-700 leading-relaxed text-lg md:text-xl text-justify font-light border-l-4 border-brand-green pl-6">
                      At Couture Tex Sourcing Ltd, we believe fashion is not just about Clothing, it's an ever evolving statement, an expression of Identity. Culture context of time and place, perception, aspiration, creativity and innovation, value and belief of individual and community. We drive fashion forward through market intelligence, trend analysis, innovative design, ethical sourcing, diverse products, sustainability, and responsible manufacturing. Backed by strong quality assurance, reliable logistics, and exceptional service, we aim to deliver outstanding value to our customers.
                  </p>
              </div>
            </FadeInSection>

            <FadeInSection>
              <div className="w-full h-[50vh] md:h-[70vh] overflow-hidden rounded-2xl shadow-2xl relative group">
                   <img src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=2274&auto=format&fit=crop" alt="CoutureTex Showroom" className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-[2s]" />
                   <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
              </div>
            </FadeInSection>

            <FadeInSection>
              <div className="w-full py-16 border-y border-gray-100 bg-gray-50/50">
                  <div className="w-full px-4">
                      <p className="font-serif italic text-brand-navy font-bold text-center leading-normal text-lg md:text-2xl">
                          "Our commitment to fashion progression spans market intelligence, trend analysis, innovative design and R&D."
                      </p>
                  </div>
              </div>
            </FadeInSection>

            <FadeInSection>
              <div className="w-full h-[50vh] md:h-[70vh] overflow-hidden rounded-2xl shadow-2xl">
                   <img src="https://images.unsplash.com/photo-1550614000-4b9519e00315?q=80&w=2340&auto=format&fit=crop" alt="Design Process" className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-[2s]" />
              </div>
            </FadeInSection>

            <FadeInSection>
              <div className="w-full text-left">
                  <div className="mb-8">
                      <h4 className="font-bold text-black text-xl md:text-2xl mb-4">
                          Trend-Driven, Ethically Sourced, Trusted & Traceable – Your Fashion Manufacturing Partner-
                      </h4>
                      <p className="text-gray-700 leading-relaxed text-lg md:text-xl text-justify font-light md:text-left">
                          We collaborate with globally compliant manufacturers to ensure traceability, quality, and process control. Our design studios in London and Dhaka blend Global Creativity with local talent, focusing on R&D, trend-driven products, and iconic licensed characters like Disney and others. Onsite inspections and full logistics support highlight our commitment to responsible, innovative manufacturing.
                      </p>
                  </div>
                  
                  <div className="w-full bg-[#eeffff] py-10 px-4 mb-10">
                      <p className="text-brand-navy font-bold text-lg md:text-2xl text-center font-serif">
                          "Ethical sourcing, sustainability, manufacturing excellence and superior service- delivers added Customer value."
                      </p>
                  </div>

                  <div className="text-left">
                      <Link to="/about" className="inline-block border border-brand-green px-6 py-2 text-xs font-medium uppercase tracking-wider text-black hover:bg-brand-green hover:text-white transition duration-300 rounded-sm">
                          Explore More
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
                   <h2 className="text-4xl md:text-5xl font-bold text-[#1e3a8a] mb-2 font-sans tracking-tight">Fashion Evolution</h2>
                   <p className="text-sm font-bold text-gray-800 italic mb-4">Where Trends Begin — Designing Fashion in Motion... !!</p>
                   <p className="text-gray-700 leading-relaxed text-lg md:text-xl text-justify font-light w-full">
                      Embark on the journey of Fashion Evolution — where trendsetting design and cutting-edge technology shape the future of style. At COUTURETEX, fashion speaks the language of shifting identities, where imagination meets science and tradition blends with innovation.
                   </p>
              </div>
            </FadeInSection>

            <FadeInSection>
              <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
                  <div className="lg:col-span-5 flex flex-col justify-center">
                       <ul className="space-y-6 text-lg md:text-xl font-bold text-gray-800 mb-20">
                          {[
                              "Bold minds. Breakthrough fashion.",
                              "Timeless style, built for tomorrow.",
                              "Where ethics dress like elegance.",
                              "Next-gen materials. Zero waste. Pure impact.",
                              "Evolution isn't a trend — it's our blueprint."
                          ].map((item, i) => (
                              <li key={i} className="flex items-start">
                                  <span className="mr-3 transform scale-125 text-[#1e3a8a]">•</span>
                                  <span>{item}</span>
                              </li>
                          ))}
                      </ul>
                      <div>
                           <Link to="/market-intel" className="inline-block border-2 border-gray-600 px-8 py-3 text-xs md:text-sm font-bold text-gray-800 hover:bg-[#1e3a8a] hover:text-white hover:border-[#1e3a8a] transition uppercase tracking-wider bg-transparent">
                              Explore More
                          </Link>
                      </div>
                  </div>

                  <div className="lg:col-span-7 w-full h-[500px] md:h-[650px] relative overflow-hidden shadow-2xl rounded-sm">
                       {sliderImages.map((src, index) => (
                          <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${currentSlide === index ? 'opacity-100' : 'opacity-0'}`}>
                              <img src={src} className="w-full h-full object-cover" alt={`Fashion Slide ${index + 1}`} />
                          </div>
                       ))}
                        <div className="absolute top-6 left-6 flex items-center gap-3 z-10 bg-white/80 p-2 rounded-sm shadow-sm">
                            <img 
                                src={ASSETS.logo} 
                                alt="CoutureTex" 
                                className="h-10 w-auto object-contain"
                            />
                        </div>
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
                    <h2 className="text-4xl font-bold text-[#1e3a8a] uppercase tracking-tight mb-1">MARKET INTEL DESIGN</h2>
                    <p className="text-[11px] font-medium text-gray-800 italic mb-10">Crafting the Future of Fashion — Elevating Style, Redefining Elegance...!!</p>
                    
                    <div className="space-y-6">
                        <h3 className="text-lg font-bold text-black leading-tight">Design Innovation, Elevating Creation, Embracing Co-Creation-</h3>
                        <p className="text-sm font-bold text-black italic">This is more than fashion — it's a revolution !!</p>
                        <p className="text-gray-700 leading-relaxed text-lg md:text-xl text-justify font-light">
                            A fearless pursuit of creativity. A commitment to responsible design. A force for global transformation. Whether launching a label or reimagining your brand, COUTURETEX is your visionary partner. Rooted in London and Dhaka, we blend artistry, innovation, and sustainability to redefine fashion. From concept to runway, every stitch reflects purpose where imagination meets intention. At COUTURETEX, co-creation is a shared journey. We partner with brands to merge identity and expertise, creating collections that are authentic, relevant, and future-ready.
                        </p>
                        <p className="text-[11px] md:text-[12px] font-bold italic text-gray-500">"Timeless Design, Future-Ready Fashion, Crafted by COUTURETEX!!</p>
                    </div>
                </div>
              </FadeInSection>

              <div className="mt-16">
                  <FadeInSection>
                    <h2 className="text-4xl font-bold text-[#1e3a8a] mb-1">Design Studio</h2>
                    <p className="text-[11px] font-medium text-gray-800 italic mb-8">Creative Hub where Fashion Inspiration turns in Wearable Art..!!</p>
                  </FadeInSection>

                  <FadeInSection>
                    <div className="grid lg:grid-cols-12 gap-8 items-center mb-16">
                        <div className="lg:col-span-8">
                            <div className="w-full h-[300px] md:h-[500px] rounded-sm overflow-hidden shadow-sm">
                                <img src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=2274&auto=format&fit=crop" alt="Design Studio Showroom" className="w-full h-full object-cover" />
                            </div>
                        </div>
                        <div className="lg:col-span-4">
                            <h3 className="text-2xl font-bold text-[#1e3a8a] mb-4">London, UK Design Studio:</h3>
                            <div className="space-y-4">
                                <p className="text-gray-700 leading-relaxed text-lg md:text-xl text-justify font-light">
                                    The Global Epicenter of Fashion Innovation Based in the heart of the UK, our London studio blends market insight, creative innovation, and cultural fluency to craft timeless, trend-setting collections that embody your brand. Led by UK-born designers with top-brand experience, our team fuses artistic vision with commercial strategy to create striking, sustainable, market-ready collections. At COUTURETEX, we co-create from concept to product—amplifying your brand through purposeful design and innovation.
                                </p>
                                <p className="text-[11px] md:text-[12px] font-bold italic text-black">Let's build the Future of Fashion together!!</p>
                            </div>
                        </div>
                    </div>
                  </FadeInSection>

                  <FadeInSection>
                    <div className="grid lg:grid-cols-12 gap-8 items-center mb-16">
                        <div className="lg:col-span-5">
                            <h3 className="text-2xl font-bold text-[#1e3a8a] mb-2">Dhaka, Bangladesh Design Studio:</h3>
                            <p className="text-[11px] font-medium text-gray-500 italic mb-4">Where Blending Heritage, Innovation and Global Vision</p>
                            <div className="space-y-4">
                                <p className="text-gray-700 leading-relaxed text-lg md:text-xl text-justify font-light">
                                    Nestled in Dhaka's textile hub, our studio fuses generational craft with modern design. Together with our London team, we deliver authentic, scalable fashion that meets global standards.
                                </p>
                                <p className="text-gray-700 leading-relaxed text-lg md:text-xl text-justify font-light">
                                    From concept to production, we deliver sustainable, innovative designs with global insight. At COUTURETEX, we create purpose-driven collections that honor artisanship and shape responsible fashion.
                                </p>
                                <p className="text-[11px] md:text-[12px] font-bold italic text-black">Let's shape the future of fashion — From Dhaka to the world!</p>
                            </div>
                        </div>
                        <div className="lg:col-span-7">
                            <div className="w-full h-[300px] md:h-[500px] rounded-sm overflow-hidden shadow-sm">
                                <img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2340&auto=format&fit=crop" alt="Dhaka Design Studio" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                  </FadeInSection>
              </div>

              <div className="mt-20 pt-10 pb-20 border-t border-gray-200 text-left">
                  <FadeInSection>
                    <Link to="/market-intel" className="inline-block border border-brand-green px-6 py-1.5 text-[10px] font-bold text-gray-700 hover:bg-brand-green hover:text-white transition uppercase tracking-widest rounded-sm">
                        EXPLORE MORE
                    </Link>
                  </FadeInSection>
              </div>
          </div>
      </section>

      {/* New Parallax Quote Section */}
      <section 
        className="relative h-[70vh] bg-fixed bg-center bg-cover flex items-center justify-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544551763-47a0159f9234?q=80&w=2070&auto=format&fit=crop')" }} 
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
             <FadeInSection>
               <h3 className="text-white font-serif text-2xl md:text-5xl italic leading-relaxed font-semibold shadow-black/50 drop-shadow-2xl">
                  "Fashion is not static; it's an ever-evolving art form. To stay ahead, we must embrace change and innovation."
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
                        <h2 className="text-4xl md:text-6xl font-bold text-[#88c057] mb-8">Ethical & Responsive Sourcing</h2>
                        <p className="text-gray-700 leading-relaxed text-lg md:text-xl text-justify font-light mb-10">
                          Though out the Supply Chain, we are dedicated to ensure Ethical and Responsive Sourcing practices to protect the Individual and Environment. We prioritize transparency, fair labor practices, environmental sustainability, and corporate social responsibility, demonstrating our commitment to ethical business practices and the welfare of all stakeholders. We actively collaborate with our manufacturing partners to incorporate green initiatives and sustainability practices, different CSR programs, promoting for the use of organic, eco-friendly, and recycled materials while leveraging our extensive networks across diverse product categories to promote responsible sourcing and production.
                        </p>
                        <Link to="/ethical-sourcing" className="inline-block border border-gray-400 px-6 py-2 text-[10px] font-bold text-black uppercase tracking-widest hover:bg-brand-green hover:text-white transition-all">
                          EXPLORE MORE
                        </Link>
                    </div>
                    <div className="relative pt-6">
                        <div className="relative w-full aspect-[16/9] overflow-hidden rounded-sm border-4 border-white shadow-sm">
                            <img src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=2070&auto=format&fit=crop" alt="Nature" className="w-full h-full object-cover opacity-80" />
                            <div className="absolute inset-0 grid grid-cols-4 grid-rows-2 gap-2 p-4 md:p-8">
                                {logos.map((logo, i) => (
                                    <div key={i} className="bg-white/90 p-1 flex items-center justify-center shadow-sm">
                                        <span className="text-[10px] font-bold text-gray-500 uppercase">{logo.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="mt-6 bg-[#88c057] py-4 px-6 text-center">
                            <p className="text-white font-serif italic text-lg md:text-2xl font-bold">
                              Our partners are compliant with international social and environmental standards to protect both People and the Planet.
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
                  <h2 className="text-4xl md:text-6xl font-bold text-[#88c057] mb-8 tracking-tight">Sustainability</h2>
                  <div className="space-y-6">
                    <p className="text-gray-700 leading-relaxed text-lg md:text-xl text-justify font-light">
                      Our operations are guided by a vision of achieving social and ecological equilibrium, where the well-being of both humanity and the environment are prioritized and sustained.
                    </p>
                    <p className="text-gray-700 leading-relaxed text-lg md:text-xl text-justify font-light">
                      Ethically sourcing products and nurturing sustainability are fundamental to our mission, ensuring equitable treatment for workers and actively reducing our environmental impact
                    </p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="w-full max-w-[550px] aspect-square rounded-sm overflow-hidden shadow-2xl border-4 border-white transform translate-x-8">
                    <img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2071&auto=format&fit=crop" alt="Forest" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </FadeInSection>

            {/* Middle Image - Stones */}
            {/* Reduced width from max-w-5xl to max-w-4xl */}
            <FadeInSection>
              <div className="relative z-20 -mt-48 md:-mt-80 mb-24 flex justify-center">
                <div className="relative w-full max-w-4xl aspect-[21/9] rounded-sm overflow-hidden shadow-2xl border-4 border-white">
                  <img src="https://images.unsplash.com/photo-1505118380757-91f5f45d8de4?q=80&w=2000&auto=format&fit=crop" alt="Stones" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-6 text-center">
                    <p className="text-white font-bold text-lg md:text-3xl leading-tight drop-shadow-lg">
                      Sustainability is not only a Tagline, it's a life style<br/>and at the core of our business operation.
                    </p>
                  </div>
                </div>
              </div>
            </FadeInSection>

            {/* Bottom Row */}
            {/* Increased negative margin (-mt-48) and moved image right (translate-x-32) */}
            <FadeInSection>
              <div className="grid lg:grid-cols-2 gap-8 items-end relative z-0 -mt-20 md:-mt-48">
                <div className="transform translate-x-8 md:translate-x-32">
                  <div className="w-full max-w-[550px] aspect-[4/3] rounded-sm overflow-hidden shadow-2xl border-4 border-white">
                    <img src="https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=1976&auto=format&fit=crop" alt="Tree" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="pb-8 pl-10">
                  <div className="space-y-6">
                    <p className="text-gray-700 leading-relaxed text-lg md:text-xl text-justify font-light">
                      Our growth focuses on environmental responsibility, with an emphasis on circular thinking, emission reduction, water conservation, and responsible consumption. We collaborate with partners committed to ethical sourcing and environmental compliance.
                    </p>
                    <p className="text-gray-700 leading-relaxed text-lg md:text-xl text-justify font-light">
                      Sustainability is at the core of our growth plan, influencing every decision and action we take, as we collaborate with the likeminded dedicated partners!!
                    </p>
                    <Link to="/sustainability" className="inline-block border border-brand-green px-8 py-3 text-xs font-bold text-black uppercase tracking-widest hover:bg-brand-green hover:text-white transition-all shadow-sm">
                      EXPLORE MORE
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
                  "The Earth does not belong to us, We belong to the Earth!"
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
                   <h2 className="text-4xl md:text-6xl font-bold text-[#1e3a8a] mb-2 font-sans tracking-tight uppercase">MANUFACTURING EXCELLENCE</h2>
                   <p className="text-sm font-bold text-gray-800 italic mb-6">Where Expertise Ignites Precision and Artistry!!</p>
                   <p className="text-gray-700 leading-relaxed text-lg md:text-xl text-justify font-light w-full">
                      COUTURETEX Sourcing stands as a Cornerstone of Manufacturing excellence, where the craft transcends machinery to embody precision, safety, and empowerment. From the initial fabric cut to the final stitch, every stage reflects a commitment to surpassing industry standards, delivering garments distinguished by exceptional quality, integrity, and artistry.
                   </p>
             </div>
           </FadeInSection>

           {/* Content Grid 1: Fitting/Garment */}
           <FadeInSection>
             <div className="grid lg:grid-cols-12 gap-12 items-center mb-32">
                {/* Left: Text */}
                <div className="lg:col-span-5 text-left">
                   <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a8a] mb-2 font-sans tracking-tight">Fitting/Garment Technical Support</h2>
                   <p className="text-sm font-bold text-gray-800 italic mb-8">Elevating Wearability, Style and Functionality...!!</p>
                   <p className="text-gray-700 leading-relaxed text-lg md:text-xl text-justify font-light mb-8">
                      Garments are designed to look stunning, fit flawlessly, and move with effortless grace. Every detail—craftsmanship, fit, and aesthetics—is meticulously refined by a dedicated in-house technical team. Personalized fitting support and technical assistance are provided to ensure expectations are exceeded, enhancing comfort, style, and functionality for greater customer satisfaction.
                   </p>
                   <Link to="/manufacturing" className="inline-block bg-[#1e3a8a] text-white px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-[#1e3a8a]/90 transition-all shadow-xl rounded-sm">
                      EXPLORE MORE
                   </Link>
                </div>

                {/* Right: Single Image Area */}
                <div className="lg:col-span-7 relative h-[500px] bg-[#f8f8f8] shadow-2xl rounded-sm overflow-hidden border-4 border-white group">
                    <img 
                        src="https://plus.unsplash.com/premium_photo-1664202526559-e21e9c0fb46a?q=80&w=2070&auto=format&fit=crop" 
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
                      src="https://images.unsplash.com/photo-1596700874052-b8833917d05c?q=80&w=2070&auto=format&fit=crop" 
                      className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105" 
                      alt="Production Control" 
                    />
                 </div>

                 {/* Text Side (Right) */}
                 <div className="flex flex-col justify-center">
                      <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a8a] mb-4">Production Control</h2>
                      <p className="text-black italic font-medium mb-8 text-lg">
                          Optimizing Efficiency, Ensuring Quality, Orchestrating Excellence!!
                      </p>
                      <div className="space-y-6 text-gray-700 leading-relaxed text-lg md:text-xl text-justify font-light">
                          <p>
                              At the core of our production control framework are four key components: Material Requirement Planning (MRP), Capacity Planning, Production Scheduling, and Quality Control. These elements work together to ensure a seamless, efficient manufacturing process, managing everything from material sourcing to final product inspection.
                          </p>
                          <p>
                              Material Requirement Planning (MRP) manages material needs to maintain optimal inventory and avoid shortages or excess.
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
                          Capacity Planning aligns production with demand to optimize resources and balance workloads. Production Scheduling organizes tasks to maximize output and minimize downtime. Quality Control upholds standards to ensure every product meets or exceeds expectations.
                     </p>
                     <p className="text-gray-700 leading-relaxed text-lg md:text-xl text-justify font-light mb-8">
                          The supply chain is managed to reduce waste and boost productivity. Competitive pricing and flexible lead times are achieved through this careful oversight. Operational excellence and exceptional client value are ensured by integrating these elements
                     </p>
                     <Link to="/manufacturing" className="inline-block border border-gray-500 px-6 py-2 text-[10px] font-bold text-black uppercase tracking-widest hover:bg-[#1e3a8a] hover:text-white hover:border-[#1e3a8a] transition-all bg-[#e6e6e6]">
                          EXPLORE MORE
                     </Link>
                 </div>
                 
                 {/* Right: Image */}
                 <div className="w-full h-[400px] rounded-sm overflow-hidden shadow-xl border-4 border-white">
                     <img 
                          src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2070&auto=format&fit=crop" 
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
                      "Crafting Excellence: Refined Control, Flawless Garments, Excellence in Every Stitch, Efficiency in Every Step."
                  </p>
             </div>
           </FadeInSection>

           {/* Content Grid 4: Quality Assurance */}
           <FadeInSection>
             <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
                 {/* Left: Image */}
                 <div className="w-full h-[500px] bg-gray-100 rounded-sm overflow-hidden shadow-2xl border-4 border-white relative group">
                     <img 
                          src="https://images.unsplash.com/photo-1576158189852-181dd0663458?q=80&w=2670&auto=format&fit=crop" 
                          alt="Quality Assurance Team" 
                          className="w-full h-full object-cover"
                     />
                 </div>

                 {/* Right: Text */}
                 <div>
                      <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a8a] mb-2 font-sans tracking-tight">Quality Assurance:</h2>
                      <p className="text-sm font-bold text-gray-800 italic mb-8">Redefining Excellence in Craftsmanship and Enduring Durability</p>
                      <p className="text-gray-700 leading-relaxed text-lg md:text-xl text-justify font-light mb-8">
                          Committed to upholding impeccable standards through rigorous quality control, we ensure every garment exceeds expectations for craftsmanship and durability. In collaboration with our partners, we apply advanced protocols— including lab testing and onsite inspections—at every stage of production, reinforcing confidence in the integrity and excellence of our products.
                      </p>
                      <Link to="/manufacturing" className="inline-block border border-gray-500 px-6 py-2 text-[10px] font-bold text-black uppercase tracking-widest hover:bg-[#1e3a8a] hover:text-white hover:border-[#1e3a8a] transition-all bg-[#e6e6e6]">
                          EXPLORE MORE
                      </Link>
                 </div>
             </div>
           </FadeInSection>
           
           {/* Fair Traceability Section - New Addition */}
           <FadeInSection>
             <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
               {/* Left: Text */}
               <div>
                  <h2 className="text-4xl md:text-5xl font-bold text-[#1e3a8a] mb-2 font-sans tracking-tight">Fair Traceability</h2>
                  <p className="text-sm font-bold text-gray-800 italic mb-8">Transparency across the Supply Chain!!</p>
                  <p className="font-bold text-gray-900 mb-6 italic text-sm md:text-base">
                     Real-Time Updates Promote-Transparency, Ethics, and Accountability—Fostering Trust Across the Supply Chain.
                  </p>
                  <p className="text-gray-700 leading-relaxed text-lg md:text-xl text-justify font-light mb-8">
                     We prioritize fair traceability by providing real-time updates at every stage of the product journey—from raw material sourcing to manufacturing—ensuring ethical practices and supply chain accountability.
                  </p>
                  <Link to="/ethical-sourcing" className="inline-block border border-gray-500 px-6 py-2 text-[10px] font-bold text-black uppercase tracking-widest hover:bg-[#1e3a8a] hover:text-white hover:border-[#1e3a8a] transition-all bg-[#e6e6e6]">
                      EXPLORE MORE
                  </Link>
               </div>

               {/* Right: Picture Only */}
               <div className="relative w-full aspect-[4/3] bg-white border-4 border-white rounded-sm overflow-hidden shadow-2xl">
                   <img 
                      src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" 
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
                          src="https://images.unsplash.com/photo-1494412574643-35d324688b08?q=80&w=2070&auto=format&fit=crop" 
                          alt="Shipping and Logistics" 
                          className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                      />
                  </div>

                  {/* Right: Text */}
                  <div>
                      <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a8a] mb-2 font-sans tracking-tight">Shipping And Logistics</h2>
                      <p className="text-sm font-bold text-gray-800 italic mb-8">Streamlined Delivery, Global Reach!!</p>
                      <p className="text-gray-700 leading-relaxed text-lg md:text-xl text-justify font-light mb-8">
                          COUTURETEX Sourcing ensures a seamless end-to-end logistics experience through our dedicated in-house shipping and logistics team. We streamline supply chain processes and manage all shipping and forwarder formalities with precision. From manufacturing facilities to global destinations, we oversee every step to guarantee efficient delivery and the highest level of customer satisfaction.
                      </p>
                      <Link to="/manufacturing" className="inline-block border border-gray-500 px-6 py-2 text-[10px] font-bold text-black uppercase tracking-widest hover:bg-[#1e3a8a] hover:text-white hover:border-[#1e3a8a] transition-all bg-[#e6e6e6]">
                          EXPLORE MORE
                      </Link>
                  </div>
             </div>
           </FadeInSection>

           {/* New Quote Banner */}
           <FadeInSection>
             <div className="mt-24 w-full bg-[#e0f7fa] py-12 px-6 text-center shadow-md border-y border-white">
                  <p className="text-[#3b6d8f] text-xl md:text-2xl font-serif italic font-bold leading-relaxed">
                      "Manufacturing excellence is never an accident It is always the result of high intention, sincere effort, intelligent direction, and skillful execution."
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
                   <h2 className="text-4xl md:text-5xl font-bold text-[#1e3a8a] mb-6">Products</h2>
                   <p className="text-gray-700 mx-auto leading-relaxed text-lg md:text-xl text-justify font-light">
                      At the crossroads of innovation and style, we provide an extensive range of products to meet diverse fashion preferences, blending timeless elegance with the latest trends. Our mission is to enhance your sourcing supply chain from design to delivery. With a focus on 12 distinct categories, we tailor sourcing solutions to meet your needs effectively.
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
        className="relative h-[60vh] bg-fixed bg-center bg-cover flex items-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1605256585681-455837661b18?q=80&w=2070&auto=format&fit=crop')" }} 
      >
        <div className="absolute inset-0 bg-gray-900/40"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-12 w-full text-left">
             <FadeInSection>
               <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 shadow-black/50 drop-shadow-lg">
                  We are eager to deliver you Superior Value
               </h2>
               <h3 className="text-2xl md:text-3xl font-bold text-white mb-10 shadow-black/50 drop-shadow-lg">
                  To Enquire with Us
               </h3>
               <a href="mailto:info@couturetex.com" className="inline-block border border-[#88c057] text-white px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-[#88c057] transition-all bg-[#88c057]/20 backdrop-blur-sm rounded-sm">
                  CLICK HERE
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
                      <h2 className="text-4xl md:text-5xl font-bold text-[#1e3a8a] mb-8 font-sans">All About Us</h2>
                      <p className="text-gray-700 leading-relaxed text-lg md:text-xl text-justify font-light">
                          We believe that Fashion is not just about Clothing, it's an ever evolving statement, an expression of Identity, Culture context of time and place, perception, aspiration, creativity and innovation, value and belief of individual and community.
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
                                      <div className={`absolute bottom-10 left-10 text-white drop-shadow-md z-20 ${textClass}`}>
                                          <h3 className="text-3xl font-bold mb-2">Fair Traceability</h3>
                                          <p className="text-sm font-medium">Innovating Transparency, Fair Traceability in Action....</p>
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