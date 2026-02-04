import React, { useState, useEffect, useRef } from 'react';
import { ASSETS } from '../config/assets';
import HeroVideo from '../components/HeroVideo';
import { ShieldCheck, Recycle, Leaf } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

// FadeInSection Component
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

const EthicalSourcing = () => {
  const { t } = useLanguage();
  const [currentEnvIndex, setCurrentEnvIndex] = useState(0);
  
  // Using the new local assets Ethical_5, Ethical_6, Ethical_7
  const envImages = [
    ASSETS.images.ethical.img5,
    ASSETS.images.ethical.img6,
    ASSETS.images.ethical.img7
  ];

  // Defined Logo Rows - Matching Home Page
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

  // Auto-play for Environmental images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEnvIndex((prev) => (prev + 1) % envImages.length);
    }, 4000); // Change image every 4 seconds
    return () => clearInterval(interval);
  }, [envImages.length]);

  // CSS for Marquee Animation
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
      animation: scrollLeft 40s linear infinite;
    }
    .animate-scroll-right {
      animation: scrollRight 40s linear infinite;
    }
    .pause-hover:hover {
      animation-play-state: paused;
    }
  `;

  // Triple the logos to ensure smooth scrolling on wide screens
  const marqueeLogos1 = [...logosRow1, ...logosRow1, ...logosRow1];
  const marqueeLogos2 = [...logosRow2, ...logosRow2, ...logosRow2];

  return (
    <div className="bg-white font-sans overflow-x-hidden">
      <style>{marqueeStyles}</style>

      {/* 1. Hero Section - Video Background */}
      <HeroVideo 
        title={t('eth_hero_title')} 
        subtitle={t('eth_hero_sub')}
        videoUrl={ASSETS.videos.ethical}
      />

      {/* 2. Intro Text Section */}
      <section className="py-16 bg-white">
        <div className="max-w-[95%] mx-auto px-4 lg:px-8">
             <FadeInSection>
                <div className="space-y-6 text-gray-700 leading-relaxed text-lg md:text-xl font-light text-justify">
                    <p>
                        {t('eth_intro')} {t('eth_intro_text')}
                    </p>
                    <p>
                        {t('eth_page_intro_1')}
                    </p>
                </div>
             </FadeInSection>
        </div>
      </section>

      {/* 3. Girl with Flowers Image & Transparency Text */}
      <section className="pb-16 bg-white">
        <div className="max-w-[95%] mx-auto px-4 lg:px-8">
           <FadeInSection>
               {/* Updated: h-auto for mobile to prevent cropping, fixed height for desktop */}
               <div className="w-full h-auto md:h-[700px] rounded-sm overflow-hidden mb-12 shadow-md">
                   {/* Ethical_1 */}
                   <img 
                      src={ASSETS.images.ethical.img1} 
                      alt="Girl holding flowers in nature" 
                      className="w-full h-full object-cover object-center"
                   />
               </div>
           </FadeInSection>

           <FadeInSection>
                <div className="space-y-6 text-gray-700 leading-relaxed text-lg md:text-xl font-light text-justify">
                    <p>
                        {t('eth_transparency')} {t('eth_transparency_p1')}
                    </p>
                    <p>
                        {t('eth_traceability_desc')}
                    </p>
                </div>
           </FadeInSection>
           
           {/* Protection Icons (Replaced external images with Lucide Icons) */}
           <FadeInSection className="mt-16 flex justify-center gap-12 md:gap-24 text-[#88c057] opacity-80 hover:opacity-100 transition-all">
                <div className="flex flex-col items-center gap-2">
                    <ShieldCheck className="h-16 md:h-20 w-16 md:w-20" strokeWidth={1} />
                    <span className="text-xs uppercase font-bold tracking-widest text-gray-500">{t('protection_label')}</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <Recycle className="h-16 md:h-20 w-16 md:w-20" strokeWidth={1} />
                    <span className="text-xs uppercase font-bold tracking-widest text-gray-500">{t('recycle_label')}</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <Leaf className="h-16 md:h-20 w-16 md:w-20" strokeWidth={1} />
                    <span className="text-xs uppercase font-bold tracking-widest text-gray-500">{t('eco_label')}</span>
                </div>
           </FadeInSection>
        </div>
      </section>

      {/* 4. Business Ethics Diagram & Hands Sorting */}
      <section className="py-16 bg-white">
          <div className="max-w-[95%] mx-auto px-4 lg:px-8">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                  <FadeInSection>
                      {/* Business Ethics Diagram Representation (Ethical_2) */}
                      <div className="bg-white p-4 rounded-sm flex items-center justify-center">
                          <img 
                            src={ASSETS.images.ethical.img2} 
                            alt="Business Ethics Diagram" 
                            className="w-full h-auto object-contain max-h-[400px]"
                          />
                      </div>
                  </FadeInSection>
                  <FadeInSection>
                      {/* Updated: h-auto for mobile to allow full image visibility */}
                      <div className="h-auto md:h-[400px] overflow-hidden rounded-sm shadow-md">
                          {/* Ethical_3 */}
                          <img 
                            src={ASSETS.images.ethical.img3} 
                            alt="Hands Checking Clothes" 
                            className="w-full h-auto md:h-full object-cover" 
                          />
                      </div>
                  </FadeInSection>
              </div>
          </div>
      </section>

      {/* 5. Green Banner */}
      <section className="py-12 bg-[#88c057] text-center px-4">
          <FadeInSection>
              <h2 className="text-xl md:text-3xl font-serif font-bold text-white uppercase leading-snug">
                  {t('eth_banner_integrity')}
              </h2>
          </FadeInSection>
      </section>

      {/* 6. Fair Labour Practice Section */}
      <section className="py-16 bg-[#e6f4ff]">
          <div className="max-w-[95%] mx-auto px-4 lg:px-8">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                  <FadeInSection>
                      <h3 className="text-2xl md:text-3xl font-bold text-brand-navy mb-4">{t('eth_fair_labour')}</h3>
                      <p className="text-gray-700 leading-relaxed text-lg md:text-xl font-light text-justify mb-4">
                        {t('eth_fair_labour_p1')}
                      </p>

                      <p className="text-gray-700 leading-relaxed text-lg md:text-xl font-light text-justify">
                        {t('eth_fair_labour_p2')}
                      </p>
                  </FadeInSection>
                  <FadeInSection>
                      {/* Updated: h-auto for mobile */}
                      <div className="h-auto md:h-[400px] overflow-hidden rounded-sm shadow-xl border-4 border-white">
                          {/* Ethical_4 */}
                          <img 
                            src={ASSETS.images.ethical.img4} 
                            alt="Factory Workers" 
                            className="w-full h-auto md:h-full object-cover"
                          />
                      </div>
                  </FadeInSection>
              </div>
          </div>
      </section>

      {/* 7. Environmental Concern (Single Image Full Width Slideshow) */}
      <section className="py-16 bg-white overflow-hidden">
          <div className="max-w-[95%] mx-auto px-4 lg:px-8">
              <FadeInSection className="mb-12">
                  <p className="text-gray-700 leading-relaxed text-lg md:text-xl font-light text-justify">
                      <span className="font-bold text-black">{t('eth_env_concern')}</span> {t('eth_env_concern_text')}
                  </p>
              </FadeInSection>
              
              {/* Full Width Single Image Slider (Ethical_5, Ethical_6, Ethical_7) */}
              <FadeInSection>
                  {/* Updated height for mobile to avoid cropping */}
                  <div className="relative w-full h-[300px] sm:h-[400px] md:h-[700px] rounded-sm overflow-hidden shadow-2xl group">
                       {envImages.map((img, index) => (
                           <div
                             key={index}
                             className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                               index === currentEnvIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                             }`}
                           >
                              <img 
                                src={img} 
                                alt={`Sustainable Initiative ${index + 1}`} 
                                className="w-full h-full object-cover" 
                              />
                              {/* Overlay Gradient */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                              <div className="absolute bottom-10 left-10 text-white z-20">
                                   <h3 className="text-3xl font-bold drop-shadow-md">{t('eth_sustainable_initiative')} {index + 1}</h3>
                              </div>
                           </div>
                       ))}
                       
                       {/* Navigation Dots */}
                       <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
                          {envImages.map((_, idx) => (
                            <button
                              key={idx}
                              onClick={() => setCurrentEnvIndex(idx)}
                              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                idx === currentEnvIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'
                              }`}
                              aria-label={`Go to slide ${idx + 1}`}
                            />
                          ))}
                       </div>
                  </div>
              </FadeInSection>
          </div>
      </section>

      {/* NEW: Social Engagement & CSR Programs */}
      <section className="py-20 bg-[#eaf8ff]">
          <div className="max-w-[95%] mx-auto px-4 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <FadeInSection>
                      {/* Updated: h-auto for mobile */}
                      <div className="h-auto md:h-[500px] rounded-sm overflow-hidden shadow-xl border-4 border-white">
                          {/* Ethical_8 */}
                          <img
                            src={ASSETS.images.ethical.img8}
                            alt="Social Engagement and CSR"
                            className="w-full h-auto md:h-full object-cover"
                          />
                      </div>
                  </FadeInSection>
                  <FadeInSection>
                      <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a8a] mb-6">{t('eth_social_engagement_title')}</h2>
                      <p className="text-gray-700 leading-relaxed text-lg md:text-xl font-light text-justify">
                          {t('eth_social_engagement_text')}
                      </p>
                  </FadeInSection>
              </div>
          </div>
      </section>

      {/* 8. Supplier Audits and Certifications */}
      <section className="py-20 bg-white">
          <div className="max-w-[95%] mx-auto px-4 lg:px-8">
              <FadeInSection className="mb-12">
                  <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#1e3a8a] mb-6">{t('eth_supplier_audits_title')}</h2>
                  <div className="space-y-4 text-gray-700 leading-relaxed text-lg md:text-xl font-light text-justify">
                      <p>
                          {t('eth_supplier_audits_p1')}
                      </p>
                      <p>
                          {t('eth_supplier_audits_p2')}
                      </p>
                  </div>
              </FadeInSection>

              {/* Logos on Forest Background with Dual Marquee (Ethical_9) */}
              <FadeInSection className="relative w-full h-[300px] md:h-[500px] rounded-sm overflow-hidden shadow-xl mb-16 group">
                  <img 
                      src={ASSETS.images.ethical.img9} 
                      alt="Forest Background" 
                      className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-black/40 flex flex-col justify-center gap-6 md:gap-12 py-10">
                      
                      {/* Row 1: Right to Left Animation (Matches Home) */}
                      <div className="w-full overflow-hidden relative">
                           <div className="flex gap-4 md:gap-6 w-max animate-scroll-right pause-hover">
                               {marqueeLogos1.map((logo, index) => (
                                   <div key={`row1-${index}`} className="w-[120px] md:w-[220px] h-20 md:h-28 bg-white/95 p-4 rounded-sm flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-300">
                                           <img 
                                              src={logo.url} 
                                              alt={logo.name} 
                                              className="max-w-full max-h-full object-contain"
                                              onError={(e) => {
                                                  const target = e.target as HTMLImageElement;
                                                  target.style.display = 'none';
                                                  target.parentElement!.innerHTML = `<span class="text-xs font-bold text-gray-600">${logo.name}</span>`;
                                              }}
                                           />
                                    </div>
                               ))}
                           </div>
                      </div>

                      {/* Row 2: Left to Right Animation (Matches Home) */}
                      <div className="w-full overflow-hidden relative">
                           <div className="flex gap-4 md:gap-6 w-max animate-scroll-left pause-hover">
                               {marqueeLogos2.map((logo, index) => (
                                   <div key={`row2-${index}`} className="w-[120px] md:w-[220px] h-20 md:h-28 bg-white/95 p-4 rounded-sm flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-300">
                                           <img 
                                              src={logo.url} 
                                              alt={logo.name} 
                                              className="max-w-full max-h-full object-contain"
                                              onError={(e) => {
                                                  const target = e.target as HTMLImageElement;
                                                  target.style.display = 'none';
                                                  target.parentElement!.innerHTML = `<span class="text-xs font-bold text-gray-600">${logo.name}</span>`;
                                              }}
                                           />
                                    </div>
                               ))}
                           </div>
                      </div>

                  </div>
              </FadeInSection>

              {/* Continuous Improvement */}
              <FadeInSection className="mb-12">
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1e3a8a] mb-6">{t('eth_continuous_title')}</h2>
                  <p className="text-gray-700 leading-relaxed text-lg md:text-xl font-light text-justify">
                      {t('eth_continuous_desc')}
                  </p>
              </FadeInSection>
          </div>
      </section>

      {/* 9. Enquiry Call to Action (Ethical_10) */}
      <section className="relative h-[600px] w-full bg-cover bg-center bg-fixed" style={{ backgroundImage: `url('${ASSETS.images.ethical.img10}')` }}>
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center p-6 text-center">
              <FadeInSection>
                  <h2 className="text-white text-3xl md:text-5xl font-serif font-bold mb-6 max-w-4xl leading-tight">
                      {t('eth_final_banner')}
                  </h2>
                  <h3 className="text-[#88c057] text-2xl md:text-4xl font-bold mb-10 uppercase tracking-widest">
                      {t('inquiry_subtitle')}
                  </h3>
                  <button onClick={() => window.location.href = 'mailto:info@apparelbd.com'} className="border-2 border-white text-white px-10 py-3 text-sm font-bold uppercase tracking-widest hover:bg-[#88c057] hover:border-[#88c057] transition-all duration-300">
                      {t('click_here')}
                  </button>
              </FadeInSection>
          </div>
      </section>

      {/* 10. Footer Text */}
      <section className="py-12 bg-white text-center">
          <div className="max-w-[95%] mx-auto px-4">
              <FadeInSection>
                  <p className="text-gray-600 text-sm md:text-base font-light">
                      {t('eth_footer_text')}
                  </p>
              </FadeInSection>
          </div>
      </section>

    </div>
  );
};

export default EthicalSourcing;