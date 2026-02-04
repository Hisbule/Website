import React, { useState, useEffect, useRef } from 'react';
import { ASSETS } from '../config/assets';
import { TrendingUp, Clock, Users, Handshake, PenTool, Leaf, Scissors, Layers, CheckCircle } from 'lucide-react';
import HeroVideo from '../components/HeroVideo';
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

const MarketIntel = () => {
  const { t } = useLanguage();
  // Slideshow state for Fashion Evolution
  const [currentFashionIndex, setCurrentFashionIndex] = useState(0);
  const fashionImages = [
     ASSETS.images.marketIntelPage.img1,
     ASSETS.images.marketIntelPage.img2,
     ASSETS.images.marketIntelPage.img3
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFashionIndex((prev) => (prev + 1) % fashionImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white font-sans overflow-x-hidden">
      {/* Hero Section - VIDEO */}
      <HeroVideo 
        title={t('mi_hero_title')} 
        subtitle={t('mi_hero_sub')}
        videoUrl={ASSETS.videos.marketIntel}
      />

      {/* Section 1: FASHION EVOLUTION */}
      <section className="py-20 bg-white">
        <div className="max-w-[90%] mx-auto px-4">
          <FadeInSection className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1e3a8a] mb-4 uppercase tracking-tight">{t('mi_fe_title')}</h2>
            <p className="text-lg md:text-xl text-gray-800 italic font-medium mb-6">
              {t('mi_fe_sub')}
            </p>
            <p className="text-gray-700 leading-relaxed text-lg md:text-xl text-justify font-light">
              {t('mi_fe_text')}
            </p>
          </FadeInSection>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Image Slideshow Frame */}
            <FadeInSection>
              {/* White style frame, matching uploaded design size (generous height), object-contain for fit */}
              <div className="w-full h-[600px] bg-white relative">
                 {fashionImages.map((img, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out flex items-center justify-center ${
                           index === currentFashionIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        }`}
                    >
                        <img 
                            src={img} 
                            className="w-full h-full object-contain" 
                            alt={`Fashion Evolution ${index + 1}`} 
                        />
                    </div>
                 ))}
              </div>
            </FadeInSection>

            {/* Right Text */}
            <FadeInSection className="flex flex-col justify-center h-full">
               <h3 className="text-2xl md:text-3xl font-bold text-black mb-6">{t('mi_lang_title')}</h3>
               <p className="text-gray-700 leading-relaxed text-lg md:text-xl text-justify font-light mb-6">
                 {t('mi_lang_p1')}
               </p>
               <p className="text-gray-700 leading-relaxed text-lg md:text-xl text-justify font-light mb-6">
                 {t('mi_lang_p2')}
               </p>
               <p className="text-[#1e3a8a] font-bold text-xl italic">{t('mi_lang_footer')}</p>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Quote Banner */}
      <section className="py-16 bg-gray-50 text-center px-4">
        <FadeInSection>
          <h2 className="text-2xl md:text-4xl font-serif font-bold text-[#1e3a8a] italic leading-relaxed">
            {t('mi_quote_1')}
          </h2>
        </FadeInSection>
      </section>

      {/* Section 2: R&D */}
      <section className="py-20 bg-white">
        <div className="max-w-[90%] mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
           <FadeInSection>
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">{t('mi_rd_title')}</h2>
              <p className="text-gray-600 italic font-medium mb-6">{t('mi_rd_sub')}</p>
              
              <div className="space-y-6 text-gray-700 leading-relaxed text-lg md:text-xl text-justify font-light">
                 <p>
                   {t('mi_rd_desc')}
                 </p>
                 <p>
                   {t('mi_rd_desc_2')}
                 </p>
              </div>

              <div className="mt-8 border-l-4 border-[#88c057] pl-4">
                 <h3 className="text-xl font-bold text-black mb-2">{t('mi_vision_precision')}</h3>
                 <p className="text-gray-700 text-lg font-light">{t('mi_shaping_future')}</p>
              </div>
           </FadeInSection>

           <FadeInSection>
              <div className="h-[500px] w-full rounded-sm overflow-hidden shadow-xl border-8 border-gray-100">
                  <img src={ASSETS.images.marketIntelPage.img4} alt="Fabric Shelves" className="w-full h-full object-cover" />
              </div>
           </FadeInSection>
        </div>
      </section>

      {/* Section 3: Design Innovation */}
      <section className="py-20 bg-[#f8f9fa]">
        <div className="max-w-[90%] mx-auto px-4">
           <FadeInSection className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-2">{t('mi_design_title')}</h2>
              <p className="text-gray-600 font-bold mb-6">{t('mi_design_expedition')}</p>
              <p className="text-gray-700 leading-relaxed text-lg md:text-xl text-justify font-light mb-6">
                 {t('mi_design_exp_desc')}
              </p>
              <p className="text-gray-700 leading-relaxed text-lg md:text-xl text-justify font-light">
                 {t('mi_co_creation')}
              </p>
           </FadeInSection>

           <div className="grid lg:grid-cols-2 gap-12 items-center">
              <FadeInSection>
                 <div className="h-[400px] rounded-sm overflow-hidden shadow-lg">
                    <img src={ASSETS.images.marketIntelPage.img5} alt="Design Team" className="w-full h-full object-cover" />
                 </div>
              </FadeInSection>
              
              <FadeInSection className="bg-white p-8 rounded-sm shadow-md border-l-4 border-[#1e3a8a]">
                 <p className="text-xl font-bold text-black italic mb-6">
                   {t('mi_crafting_future')}
                 </p>
                 <div className="mb-6">
                    <span className="font-bold text-black text-lg block mb-1">{t('mi_join_us')}</span>
                    <span className="text-gray-700 text-lg font-light">{t('mi_join_us_desc')}</span>
                 </div>
                 <p className="text-lg font-bold text-[#88c057]">
                   {t('mi_spark_creativity')}
                 </p>
              </FadeInSection>
           </div>
        </div>
      </section>

      {/* Section 4: Trend Analysis */}
      <section className="py-20 bg-white">
        <div className="max-w-[90%] mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
            <FadeInSection>
               <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a8a] mb-8">{t('mi_trend_title')}</h2>
               <ul className="space-y-6">
                  <li className="text-gray-700 text-lg md:text-xl font-light text-justify">
                      {t('mi_trend_1')}
                  </li>
                  <li className="text-gray-700 text-lg md:text-xl font-light text-justify">
                      {t('mi_trend_2')}
                  </li>
                  <li className="text-gray-700 text-lg md:text-xl font-light text-justify">
                      {t('mi_trend_3')}
                  </li>
                  <li className="text-gray-700 text-lg md:text-xl font-light text-justify">
                      {t('mi_trend_4')}
                  </li>
                  <li className="text-gray-700 text-lg md:text-xl font-light text-justify">
                      {t('mi_trend_5')}
                  </li>
               </ul>
            </FadeInSection>

            <FadeInSection>
               <div className="h-[400px] md:h-[500px] rounded-sm overflow-hidden shadow-2xl border-4 border-white transform rotate-1 hover:rotate-0 transition-transform duration-500">
                  <img src={ASSETS.images.marketIntelPage.img6} alt="Trend Board" className="w-full h-full object-cover" />
               </div>
            </FadeInSection>
        </div>
      </section>

      {/* Quote Banner 2 */}
      <section className="py-12 bg-[#e6f4ff] text-center px-4">
        <FadeInSection>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#1e3a8a] italic">
            {t('mi_insight_quote')}
          </h2>
        </FadeInSection>
      </section>

      {/* Section 5: Design Studio */}
      <section className="py-20 bg-white">
         <div className="max-w-[90%] mx-auto px-4">
            <FadeInSection className="text-left mb-16">
               <h2 className="text-4xl md:text-5xl font-bold text-[#1e3a8a] mb-2 uppercase">{t('mi_studio_title')}</h2>
               <p className="text-gray-600 italic font-bold mb-6">{t('mi_studio_sub')}</p>
               <p className="text-gray-700 leading-relaxed text-lg md:text-xl text-justify font-light">
                 {t('mi_studio_desc')}
               </p>
            </FadeInSection>

            {/* London Studio */}
            <div className="mb-24">
               <FadeInSection>
                  <h3 className="text-3xl font-bold text-black mb-2">{t('mi_london_title')}</h3>
                  <p className="text-gray-600 italic font-bold mb-6">{t('mi_london_leading')}</p>
                  <p className="text-gray-700 leading-relaxed text-lg md:text-xl text-justify font-light mb-6">
                    {t('mi_london_desc_long')}
                  </p>
               </FadeInSection>
               
               <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <FadeInSection className="text-gray-700 leading-relaxed text-lg md:text-xl text-justify font-light space-y-6">
                     <p>
                       {t('mi_uk_designers_desc')}
                     </p>
                     <p className="font-bold text-black italic">{t('mi_build_future')}</p>
                  </FadeInSection>
                  <FadeInSection>
                     <div className="h-[350px] rounded-sm overflow-hidden shadow-lg">
                        <img src={ASSETS.images.home.marketIntel.studio} alt="London Studio" className="w-full h-full object-cover" />
                     </div>
                  </FadeInSection>
               </div>
            </div>

            {/* Studio Highlights */}
            <div className="mb-24">
               <FadeInSection className="mb-10">
                  <h3 className="text-3xl font-bold text-[#1e3a8a] uppercase border-b-2 border-gray-200 pb-2 inline-block">{t('mi_studio_highlight_title')}</h3>
               </FadeInSection>
               
               <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                  {[
                      { icon: <TrendingUp size={40} className="text-[#eab308]" />, title: t('mi_sh_trend_title'), items: [t('mi_sh_trend_items_1'), t('mi_sh_trend_items_2')] },
                      { icon: <Clock size={40} className="text-[#3b82f6]" />, title: t('mi_sh_timeless_title'), items: [t('mi_sh_timeless_items_1'), t('mi_sh_timeless_items_2')] },
                      { icon: <Users size={40} className="text-[#22c55e]" />, title: t('mi_sh_brand_title'), items: [t('mi_sh_brand_items_1'), t('mi_sh_brand_items_2')] },
                      { icon: <Handshake size={40} className="text-[#ef4444]" />, title: t('mi_sh_co_title'), items: [t('mi_sh_co_items_1'), t('mi_sh_co_items_2')] }
                  ].map((card, i) => (
                      <FadeInSection key={i} className="bg-white p-8 rounded-sm shadow-lg border border-gray-100 flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300">
                         <div className="mb-6">{card.icon}</div>
                         <h4 className="font-bold text-lg mb-4">{card.title}</h4>
                         <ul className="text-sm text-gray-600 space-y-2">
                            {card.items.map((item, idx) => <li key={idx}>{item}</li>)}
                         </ul>
                      </FadeInSection>
                  ))}
               </div>

               <div className="grid md:grid-cols-2 gap-8">
                  <FadeInSection>
                      <div className="h-[400px] rounded-sm overflow-hidden shadow-xl">
                          <img src={ASSETS.images.marketIntelPage.img7} alt="Mannequins" className="w-full h-full object-cover" />
                      </div>
                  </FadeInSection>
                  <FadeInSection>
                      <div className="h-[400px] rounded-sm overflow-hidden shadow-xl">
                          <img src={ASSETS.images.marketIntelPage.img8} alt="Sketching" className="w-full h-full object-cover" />
                      </div>
                  </FadeInSection>
               </div>
               
               <FadeInSection className="text-center mt-12">
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#1e3a8a] italic">
                     {t('mi_london_innovation_quote')}
                  </h3>
               </FadeInSection>
            </div>

            {/* Dhaka Studio */}
            <div className="mb-24">
               <FadeInSection className="mb-8">
                  <h3 className="text-3xl font-bold text-black mb-2">{t('mi_dhaka_title')}</h3>
                  <p className="text-gray-600 italic font-bold mb-6">{t('mi_dhaka_sub')}</p>
                  <p className="text-gray-700 leading-relaxed text-lg md:text-xl text-justify font-light">
                    {t('mi_dhaka_text')}
                  </p>
               </FadeInSection>

               <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                   <FadeInSection>
                       <div className="h-[400px] rounded-sm overflow-hidden shadow-xl">
                           <img src={ASSETS.images.home.marketIntel.dhaka} alt="Dhaka Studio" className="w-full h-full object-cover" />
                       </div>
                   </FadeInSection>
                   <FadeInSection>
                       <ul className="space-y-4 text-gray-700 text-lg font-light">
                           {[
                               t('mi_dhaka_list_1'),
                               t('mi_dhaka_list_2'),
                               t('mi_dhaka_list_3'),
                               t('mi_dhaka_list_4'),
                               t('mi_dhaka_list_5'),
                               t('mi_dhaka_list_6')
                           ].map((item, i) => (
                               <li key={i} className="font-bold text-gray-800">{item}</li>
                           ))}
                       </ul>
                   </FadeInSection>
               </div>
               
               <div className="grid lg:grid-cols-3 gap-8">
                   <FadeInSection className="bg-gray-50 p-6 rounded-sm">
                       <h4 className="font-bold text-black mb-4 text-lg">{t('mi_dhaka_highlights_title')}</h4>
                       <ul className="space-y-2 text-gray-700 font-light">
                           <li>{t('mi_dhaka_hl_1')}</li>
                           <li>{t('mi_dhaka_hl_2')}</li>
                           <li>{t('mi_dhaka_hl_3')}</li>
                           <li>{t('mi_dhaka_hl_4')}</li>
                           <li>{t('mi_dhaka_hl_5')}</li>
                       </ul>
                   </FadeInSection>
                   <FadeInSection>
                        <div className="h-[300px] rounded-sm overflow-hidden shadow-md">
                            <img src={ASSETS.images.marketIntelPage.img9} alt="Easel" className="w-full h-full object-cover" />
                        </div>
                   </FadeInSection>
                   <FadeInSection>
                        <div className="h-[300px] rounded-sm overflow-hidden shadow-md">
                            <img src={ASSETS.images.marketIntelPage.img10} alt="Sewing Kit" className="w-full h-full object-cover" />
                        </div>
                   </FadeInSection>
               </div>
            </div>

            {/* From Dhaka */}
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
                <FadeInSection>
                    <div className="h-[400px] rounded-sm overflow-hidden shadow-xl">
                        <img src={ASSETS.images.marketIntelPage.img11} alt="Working Fabric" className="w-full h-full object-cover" />
                    </div>
                </FadeInSection>
                <FadeInSection>
                    <h3 className="text-3xl font-bold text-black mb-4">{t('mi_from_dhaka_title')}</h3>
                    <p className="text-gray-700 leading-relaxed text-lg md:text-xl text-justify font-light mb-6">
                      {t('mi_from_dhaka_text')}
                    </p>
                    <p className="text-gray-700 leading-relaxed text-lg md:text-xl text-justify font-light">
                      {t('mi_from_dhaka_quote')}
                    </p>
                </FadeInSection>
            </div>
            
            {/* Approaches */}
            <div className="mb-24">
                <FadeInSection>
                    <h2 className="text-3xl font-bold text-black mb-8">{t('mi_approaches_title')}</h2>
                </FadeInSection>
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <FadeInSection>
                        <div className="h-[400px] rounded-sm overflow-hidden shadow-xl border-4 border-white">
                            <img src={ASSETS.images.marketIntelPage.img4} alt="Approaches" className="w-full h-full object-cover" />
                        </div>
                    </FadeInSection>
                    <FadeInSection className="space-y-6">
                        {[
                           { title: t('mi_app_1_title'), desc: t('mi_app_1_desc') },
                           { title: t('mi_app_2_title'), desc: t('mi_app_2_desc') },
                           { title: t('mi_app_3_title'), desc: t('mi_app_3_desc') },
                           { title: t('mi_app_4_title'), desc: t('mi_app_4_desc') },
                           { title: t('mi_app_5_title'), desc: t('mi_app_5_desc') }
                        ].map((item, i) => (
                            <div key={i}>
                                <h4 className="font-bold text-black text-lg">{item.title}</h4>
                                <p className="text-gray-600 font-light">{item.desc}</p>
                            </div>
                        ))}
                    </FadeInSection>
                </div>
            </div>

            {/* Our Process */}
            <div className="mb-24">
                <FadeInSection>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a8a] mb-12">{t('mi_process_title')}</h2>
                </FadeInSection>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                     {[
                        { icon: <PenTool size={48} className="text-[#1e3a8a]" />, title: t('mi_proc_1_title'), desc: t('mi_proc_1_desc') },
                        { icon: <Leaf size={48} className="text-[#22c55e]" />, title: t('mi_proc_2_title'), desc: t('mi_proc_2_desc') },
                        { icon: <Scissors size={48} className="text-[#eab308]" />, title: t('mi_proc_3_title'), desc: t('mi_proc_3_desc') },
                        { icon: <Users size={48} className="text-[#ef4444]" />, title: t('mi_proc_4_title'), desc: t('mi_proc_4_desc') }
                     ].map((item, i) => (
                         <FadeInSection key={i} className="border border-green-400 p-8 rounded-sm text-center flex flex-col items-center hover:shadow-lg transition-shadow bg-white">
                             <div className="mb-6">{item.icon}</div>
                             <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                             <p className="text-gray-600 text-sm font-light">{item.desc}</p>
                         </FadeInSection>
                     ))}
                </div>
                
                <FadeInSection className="text-center mt-12">
                     <h3 className="text-xl md:text-2xl font-bold text-black uppercase">
                         {t('mi_process_footer')}
                     </h3>
                </FadeInSection>
            </div>

            {/* Design Support & Co-Creation */}
            <div className="mb-24">
                <FadeInSection className="mb-8">
                    <h2 className="text-3xl font-bold text-black mb-2">{t('mi_support_title')}</h2>
                    <p className="text-gray-600 italic font-bold mb-6">{t('mi_support_sub')}</p>
                    <p className="text-gray-700 leading-relaxed text-lg md:text-xl text-justify font-light">
                      {t('mi_support_text')}
                    </p>
                </FadeInSection>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                     <FadeInSection>
                         <div className="h-[300px] rounded-sm overflow-hidden shadow-lg">
                             <img src={ASSETS.images.marketIntelPage.img12} alt="Rack" className="w-full h-full object-cover" />
                         </div>
                         <p className="mt-4 font-bold text-gray-800">{t('mi_support_list_1')}</p>
                     </FadeInSection>
                     <FadeInSection>
                         <ul className="space-y-3 text-lg font-light text-gray-700">
                             <li>{t('mi_support_list_2')}</li>
                             <li>{t('mi_support_list_3')}</li>
                             <li>{t('mi_support_list_4')}</li>
                             <li>{t('mi_support_list_5')}</li>
                             <li>{t('mi_support_list_6')}</li>
                         </ul>
                     </FadeInSection>
                </div>
                
                <FadeInSection className="mt-12">
                     <h3 className="text-2xl md:text-3xl font-bold text-[#1e3a8a] text-center">
                        {t('mi_support_quote')}
                     </h3>
                </FadeInSection>
            </div>

            {/* Philosophy & Approach */}
            <div className="mb-24">
                <div className="grid lg:grid-cols-2 gap-16">
                    <FadeInSection>
                        <h2 className="text-2xl font-bold text-black mb-4">{t('mi_phil_title')}</h2>
                        <p className="text-gray-600 italic font-bold mb-4">{t('mi_phil_sub')}</p>
                        <p className="text-gray-700 leading-relaxed text-lg font-light text-justify mb-10">
                          {t('mi_phil_text')}
                        </p>

                        <h2 className="text-2xl font-bold text-black mb-6">{t('mi_approach_built_on')}</h2>
                        <ul className="space-y-4 text-gray-700 font-light">
                            <li><span className="font-bold text-black">{t('mi_app_built_1')}</span><br/>{t('mi_app_built_1_sub')}</li>
                            <li><span className="font-bold text-black">{t('mi_app_built_2')}</span><br/>{t('mi_app_built_2_sub')}</li>
                            <li><span className="font-bold text-black">{t('mi_app_built_3')}</span><br/>{t('mi_app_built_3_sub')}</li>
                            <li><span className="font-bold text-black">{t('mi_app_built_4')}</span><br/>{t('mi_app_built_4_sub')}</li>
                        </ul>
                    </FadeInSection>

                    <FadeInSection>
                        <div className="h-[500px] bg-gray-100 rounded-sm overflow-hidden shadow-xl flex items-center justify-center p-8">
                            <img src={ASSETS.images.marketIntelPage.img13} alt="Photo Studio" className="w-full h-full object-cover" />
                        </div>
                    </FadeInSection>
                </div>
            </div>
         </div>
      </section>

      {/* Final Banner */}
      <section 
        className="relative h-[500px] w-full bg-cover bg-center bg-fixed" 
        style={{ 
          backgroundImage: `url('${ASSETS.images.marketIntelPage.finalBanner}')`,
          backgroundAttachment: 'fixed'
        }}
      >
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-6 text-center">
              <FadeInSection>
                  <h2 className="text-white text-2xl md:text-4xl font-serif font-bold italic leading-relaxed max-w-5xl">
                    {t('mi_final_banner')}
                  </h2>
                  <div className="mt-8">
                        <a href="mailto:info@apparelbd.com" className="inline-block border-2 border-[#88c057] text-[#88c057] px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-[#88c057] hover:text-white transition-all duration-300">
                            {t('start_collaborate')}
                        </a>
                  </div>
              </FadeInSection>
          </div>
      </section>
    </div>
  );
};

export default MarketIntel;