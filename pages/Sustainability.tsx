import React, { useState, useEffect, useRef } from 'react';
import { ASSETS } from '../config/assets';
import { Link } from 'react-router-dom';
import HeroVideo from '../components/HeroVideo';
import { useLanguage } from '../contexts/LanguageContext';

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

const Sustainability = () => {
  const { t } = useLanguage();
  return (
    <div className="bg-white font-sans overflow-x-hidden">
      
      {/* 1. Hero Section - VIDEO */}
      <HeroVideo 
        title={t('sus_hero_title')} 
        videoUrl={ASSETS.videos.sustainability}
      />

      {/* Intro Text */}
      <section className="py-16 bg-white">
        <div className="max-w-[95%] mx-auto px-4 lg:px-8">
            <FadeInSection>
                <p className="text-gray-700 text-lg md:text-xl leading-relaxed font-light text-justify">
                    {t('sus_intro_desc')}
                </p>
            </FadeInSection>
        </div>
      </section>

      {/* Building A Green Future Together */}
      <section className="pb-16 bg-white">
          <div className="max-w-[95%] mx-auto px-4 lg:px-8">
              <FadeInSection className="mb-12">
                  <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#1e3a8a] mb-6">{t('sus_green_title')}</h2>
                  <p className="text-gray-700 text-lg md:text-xl leading-relaxed font-light text-justify">
                    {t('sus_green_desc')}
                  </p>
              </FadeInSection>

              <FadeInSection>
                  <div className="grid md:grid-cols-2 gap-8">
                      <div className="h-[400px] overflow-hidden rounded-sm shadow-lg">
                          <img src={ASSETS.images.sustainabilityPage.img1} alt="Green Forest" className="w-full h-full object-cover" />
                      </div>
                      <div className="h-[400px] overflow-hidden rounded-sm shadow-lg bg-gray-100 flex items-center justify-center relative">
                          <img src={ASSETS.images.sustainabilityPage.img2} alt="Recycling Fashion" className="w-full h-full object-cover" />
                      </div>
                  </div>
              </FadeInSection>
          </div>
      </section>

      {/* Green Quote Banner */}
      <section className="py-12 bg-[#88c057] text-center px-4">
          <FadeInSection>
              <h2 className="text-2xl md:text-4xl font-serif font-bold text-white italic">{t('sus_revive_earth')}</h2>
          </FadeInSection>
      </section>

      {/* Responsibility & Diagram */}
      <section className="py-20 bg-[#f4faff]">
          <div className="max-w-[95%] mx-auto px-4 lg:px-8 grid md:grid-cols-2 gap-16 items-center">
              <FadeInSection>
                  {/* Visual representation of the diagram */}
                  <div className="bg-white p-8 rounded-xl shadow-xl border border-gray-100">
                      <img src={ASSETS.images.sustainabilityPage.img3} alt="Sustainability Cycle" className="w-full h-auto object-contain mix-blend-multiply opacity-80" />
                  </div>
              </FadeInSection>
              <FadeInSection>
                  <h3 className="text-3xl md:text-4xl font-serif font-bold text-[#1e3a8a] mb-6">{t('sus_env_resp_title')}</h3>
                  <div className="space-y-6">
                    <p className="text-gray-700 leading-relaxed text-lg md:text-xl font-light text-justify">
                        {t('sus_growth_strategy')}
                    </p>
                    <p className="text-gray-700 leading-relaxed text-lg md:text-xl font-light text-justify">
                        {t('sus_priority')}
                    </p>
                  </div>
              </FadeInSection>
          </div>
      </section>

      {/* Partnering Sections */}
      <section className="py-20 bg-white">
          <div className="max-w-[95%] mx-auto px-4 lg:px-8">
              <FadeInSection className="mb-16">
                  <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#1e3a8a] mb-4">{t('sus_partner_title')}</h2>
              </FadeInSection>

              <div className="grid md:grid-cols-2 gap-12 items-start mb-24">
                   <FadeInSection>
                       <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#1e3a8a] mb-6">{t('sus_standards_title')}</h3>
                       <p className="text-gray-700 leading-relaxed text-lg md:text-xl font-light text-justify">
                           {t('sus_standards_desc')}
                       </p>
                   </FadeInSection>
                   <FadeInSection>
                       <div className="h-[350px] overflow-hidden rounded-sm shadow-md">
                           <img src={ASSETS.images.sustainabilityPage.img4} alt="Environmental Standards" className="w-full h-full object-cover" />
                       </div>
                   </FadeInSection>
              </div>

              <FadeInSection className="mb-8">
                  <h3 className="text-3xl md:text-4xl font-serif font-bold text-[#1e3a8a] mb-6">{t('sus_partnering_title')}</h3>
                  <p className="text-gray-700 leading-relaxed text-lg md:text-xl font-light text-justify mb-8">
                      {t('sus_partnering_desc')}
                  </p>
              </FadeInSection>

              <FadeInSection>
                  <div className="relative h-[400px] md:h-[500px] w-full rounded-sm overflow-hidden shadow-xl group">
                      <img src={ASSETS.images.sustainabilityPage.img5} alt="Green Initiative" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <h2 className="text-white text-3xl md:text-5xl font-serif font-bold text-center px-4 drop-shadow-lg italic">{t('sus_crafting_tomorrow')}</h2>
                      </div>
                  </div>
              </FadeInSection>
          </div>
      </section>

      {/* Redefining Fashion */}
      <section className="py-20 bg-[#f8f9fa]">
          <div className="max-w-[95%] mx-auto px-4 lg:px-8">
              <FadeInSection className="mb-16">
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1e3a8a] mb-6">{t('sus_redefining_title')}</h2>
                  <div className="space-y-4">
                    <p className="text-gray-700 text-lg md:text-xl font-light text-justify">{t('sus_redefining_p1')}</p>
                    <p className="text-gray-700 text-lg md:text-xl font-light text-justify">{t('sus_redefining_p2')}</p>
                  </div>
              </FadeInSection>

              <div className="grid md:grid-cols-2 gap-12 items-center">
                   <FadeInSection>
                       <div className="h-[400px] bg-[#2d5a3f] rounded-sm overflow-hidden shadow-xl flex items-center justify-center p-4">
                           <img src={ASSETS.images.sustainabilityPage.img6} alt="Green Initiatives Sketch" className="w-full h-full object-cover opacity-90" />
                       </div>
                   </FadeInSection>
                   <FadeInSection>
                       <div className="text-right md:text-left">
                           <h3 className="text-3xl md:text-4xl font-serif font-bold text-[#1e3a8a] mb-4">{t('sus_conscious_title')}</h3>
                           <h4 className="text-2xl md:text-3xl font-bold text-[#88c057] mb-6">{t('sus_conscious_sub')}</h4>
                       </div>
                   </FadeInSection>
              </div>
          </div>
      </section>

      {/* Green Bar Quote */}
      <section className="py-12 bg-[#88c057] text-center px-4">
          <FadeInSection>
              <h2 className="text-2xl md:text-4xl font-serif font-bold text-white italic">{t('sus_green_bar_2')}</h2>
          </FadeInSection>
      </section>

      {/* Carbon Footprint */}
      <section className="py-20 bg-white">
          <div className="max-w-[95%] mx-auto px-4 lg:px-8">
              <FadeInSection className="mb-12">
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1e3a8a] mb-6">{t('sus_commit_change_title')}</h2>
                  <p className="text-gray-700 text-lg md:text-xl font-light text-justify leading-relaxed">
                    {t('sus_commit_change_desc')}
                  </p>
              </FadeInSection>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                  <FadeInSection className="h-[350px] overflow-hidden rounded-sm shadow-md">
                      <img src={ASSETS.images.sustainabilityPage.img7} alt="Green Industry" className="w-full h-full object-cover" />
                  </FadeInSection>
                   <FadeInSection className="h-[350px] overflow-hidden rounded-sm shadow-md relative">
                      <img src={ASSETS.images.sustainabilityPage.img8} alt="CO2 Reduction" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                          <h3 className="text-white text-5xl font-bold drop-shadow-lg">CO2</h3>
                      </div>
                  </FadeInSection>
              </div>
              
              <FadeInSection className="text-center mt-12">
                  <p className="text-2xl font-serif font-bold text-black italic">{t('sus_source_quote')}</p>
              </FadeInSection>
          </div>
      </section>

      {/* Crafted with Care */}
      <section className="py-20 bg-[#f0fff4]">
          <div className="max-w-[95%] mx-auto px-4 lg:px-8">
              <FadeInSection className="mb-12">
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1e3a8a] mb-8">{t('sus_crafted_care_title')}</h2>
                  
                  <div className="space-y-6 text-lg md:text-xl text-gray-700 leading-relaxed text-justify font-light">
                      <p>{t('sus_crafted_p1')}</p>
                      
                      <p>{t('sus_crafted_p2')}</p>
                      
                      <p>{t('sus_crafted_p3')}</p>
                  </div>
              </FadeInSection>

              <FadeInSection className="mt-12">
                  <div className="w-full h-[400px] md:h-[500px] relative overflow-hidden rounded-sm shadow-xl">
                      <img src={ASSETS.images.sustainabilityPage.img9} alt="Sustainable Hands" className="w-full h-full object-cover" />
                  </div>
              </FadeInSection>
          </div>
      </section>

      {/* Call to Action Enquire */}
      <section 
        className="relative h-[60vh] w-full flex items-center justify-center bg-fixed bg-center bg-cover"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=1974&auto=format&fit=crop')",
          backgroundAttachment: 'fixed'
        }} 
      >
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-12 w-full text-left">
              <FadeInSection>
                  <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg leading-tight max-w-4xl">
                      {t('sus_discover_partner')}
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

    </div>
  );
};

export default Sustainability;