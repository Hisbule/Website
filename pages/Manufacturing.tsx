import React, { useState, useEffect, useRef } from 'react';
import { Shield, Zap, Users, CheckCircle, Truck } from 'lucide-react';
import { ASSETS } from '../config/assets';
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

const Manufacturing = () => {
  const { t } = useLanguage();
  return (
    <div className="bg-white font-sans overflow-x-hidden">
      
      {/* 1. Hero Section - VIDEO */}
      <HeroVideo 
        title={t('mfg_hero_title')} 
        videoUrl={ASSETS.videos.manufacturing}
      />
      
      {/* 2. Intro Section */}
      <section className="py-16 bg-white">
        <div className="max-w-[95%] mx-auto px-4 lg:px-8">
            <FadeInSection className="mb-12">
                <h2 className="text-2xl md:text-4xl font-bold text-[#1e3a8a] mb-6 font-serif">
                    {t('mfg_intro_title')}
                </h2>
                <div className="space-y-6 text-gray-700 leading-relaxed text-lg md:text-xl font-light text-justify">
                    <p>
                        {t('mfg_page_intro_1')}
                    </p>
                    <p>
                        {t('mfg_page_intro_2')}
                    </p>
                </div>
            </FadeInSection>
        </div>
      </section>

      {/* 3. Excellence Mission */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-[95%] mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
                <FadeInSection>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1e3a8a] mb-6">{t('mfg_mission_title')}</h2>
                    <p className="text-gray-800 font-bold italic mb-6 text-lg">{t('mfg_mission_sub')}</p>
                    
                    <div className="space-y-6">
                        <div>
                            <h4 className="font-bold text-black text-xl mb-2">{t('mfg_mission_precision')}</h4>
                            <p className="text-gray-700 text-lg font-light text-justify">
                                {t('mfg_mission_precision_desc')}
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-black text-xl mb-2">{t('mfg_mission_efficient_title')}</h4>
                            <p className="text-gray-700 text-lg font-light text-justify">
                                {t('mfg_mission_efficient_desc')}
                            </p>
                        </div>
                    </div>
                </FadeInSection>

                {/* Staggered Image Layout */}
                <FadeInSection>
                      <div className="relative h-[450px] w-full mt-8 lg:mt-0">
                        <div className="absolute top-0 left-0 w-3/5 h-[300px] z-10 shadow-2xl rounded-sm border-4 border-white overflow-hidden transform hover:scale-105 transition-transform duration-500">
                            <img 
                                src={ASSETS.images.manufacturing.mission1} 
                                className="w-full h-full object-cover" 
                                alt="Manufacturing Mission 1" 
                            />
                        </div>
                        <div className="absolute bottom-0 right-0 w-3/5 h-[300px] z-0 shadow-xl rounded-sm border-4 border-white overflow-hidden transform hover:scale-105 transition-transform duration-500">
                             <img 
                                src={ASSETS.images.manufacturing.mission2} 
                                className="w-full h-full object-cover" 
                                alt="Manufacturing Mission 2" 
                            />
                        </div>
                      </div>
                </FadeInSection>
            </div>

            <FadeInSection>
                <div className="grid md:grid-cols-3 gap-8 text-gray-700 text-lg font-light text-justify border-t border-gray-200 pt-8">
                    <div>
                        <h4 className="font-bold text-black text-lg mb-2">{t('mfg_mission_empowered_title')}</h4>
                        <p className="mb-2 font-bold text-sm text-gray-500">{t('mfg_mission_empowered_sub')}</p>
                        <p>{t('mfg_mission_empowered_desc')}</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-black text-lg mb-2">{t('mfg_mission_improvement_title')}</h4>
                        <p>{t('mfg_mission_improvement_desc')}</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-black text-lg mb-2">{t('mfg_mission_flexibility_title')}</h4>
                        <p className="mb-2 font-bold text-sm text-gray-500">{t('mfg_mission_flexibility_sub')}</p>
                        <p>{t('mfg_mission_flexibility_desc')}</p>
                    </div>
                </div>
            </FadeInSection>

             <FadeInSection className="mt-12 bg-white p-6 shadow-sm border-l-4 border-[#1e3a8a]">
                  <h3 className="text-xl md:text-2xl font-serif font-bold text-[#1e3a8a] italic text-center">
                      {t('mfg_excellence_mission_banner')}
                  </h3>
             </FadeInSection>
        </div>
      </section>

      {/* 4. Manufacturing Services - R&D */}
      <section className="py-20 bg-white">
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
                   <button onClick={() => window.location.href = 'mailto:info@apparelbd.com'} className="inline-block bg-[#1e3a8a] text-white px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-[#1e3a8a]/90 transition-all shadow-xl rounded-sm">
                     {t('explore_more')}
                   </button>
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
                     <button className="inline-block border border-gray-500 px-6 py-2 text-[10px] font-bold text-black uppercase tracking-widest hover:bg-[#1e3a8a] hover:text-white hover:border-[#1e3a8a] transition-all bg-[#e6e6e6]">
                         {t('explore_more')}
                      </button>
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
                      <button className="inline-block border border-gray-500 px-6 py-2 text-[10px] font-bold text-black uppercase tracking-widest hover:bg-[#1e3a8a] hover:text-white hover:border-[#1e3a8a] transition-all bg-[#e6e6e6]">
                          {t('explore_more')}
                      </button>
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
                  <button onClick={() => window.location.href = '#/ethical-sourcing'} className="inline-block border border-gray-500 px-6 py-2 text-[10px] font-bold text-black uppercase tracking-widest hover:bg-[#1e3a8a] hover:text-white hover:border-[#1e3a8a] transition-all bg-[#e6e6e6]">
                      {t('explore_more')}
                  </button>
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
                      <button className="inline-block border border-gray-500 px-6 py-2 text-[10px] font-bold text-black uppercase tracking-widest hover:bg-[#1e3a8a] hover:text-white hover:border-[#1e3a8a] transition-all bg-[#e6e6e6]">
                          {t('explore_more')}
                      </button>
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

      {/* 5. Production Efficiency Diagram Section */}
      <section className="py-20 bg-gray-50">
           <div className="max-w-[95%] mx-auto px-4 lg:px-8">
               <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
                   {/* Simulating the diagram with a grid of cards */}
                   <FadeInSection>
                       <div className="relative bg-white p-8 rounded-sm shadow-xl border border-gray-200">
                           <div className="grid grid-cols-2 gap-4 text-center">
                               <div className="bg-[#e6f4ff] p-4 rounded border border-blue-100 flex items-center justify-center flex-col">
                                   <Zap className="w-6 h-6 text-blue-500 mb-2" />
                                   <span className="font-bold text-sm">{t('mfg_eff_opt')}</span>
                               </div>
                               <div className="bg-[#f0f9f0] p-4 rounded border border-green-100 flex items-center justify-center flex-col">
                                   <Users className="w-6 h-6 text-green-500 mb-2" />
                                   <span className="font-bold text-sm">{t('mfg_collab_partners')}</span>
                               </div>
                               <div className="bg-[#fff9e6] p-4 rounded border border-yellow-100 flex items-center justify-center flex-col">
                                   <Shield className="w-6 h-6 text-yellow-500 mb-2" />
                                   <span className="font-bold text-sm">{t('mfg_qc_culture')}</span>
                               </div>
                               <div className="bg-[#ffe6e6] p-4 rounded border border-red-100 flex items-center justify-center flex-col">
                                   <CheckCircle className="w-6 h-6 text-red-500 mb-2" />
                                   <span className="font-bold text-sm">{t('mfg_mat_supply')}</span>
                               </div>
                               <div className="col-span-2 bg-[#1e3a8a] text-white p-4 rounded font-bold ">
                                   ApparelBD 
                               </div>
                           </div>
                       </div>
                   </FadeInSection>

                   <FadeInSection>
                       <div className="space-y-6 text-gray-700 text-lg md:text-xl font-light text-justify">
                           <p>
                               {t('mfg_eff_p1')}
                           </p>
                           <p>
                               {t('mfg_eff_p2')}
                           </p>
                           <p>
                               {t('mfg_eff_p3')}
                           </p>
                       </div>
                   </FadeInSection>
               </div>

               <FadeInSection>
                   <h3 className="text-xl md:text-2xl font-serif font-bold text-[#1e3a8a] text-center italic">
                       "{t('mfg_qa_quote')}"
                   </h3>
               </FadeInSection>
           </div>
      </section>

      {/* 6. Quality Assurance */}
      <section className="py-20 bg-white">
          <div className="max-w-[95%] mx-auto px-4 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
                  <FadeInSection>
                      <h3 className="text-3xl font-bold text-black mb-4">{t('mfg_qa_title')}</h3>
                      <p className="text-gray-800 italic font-bold mb-6">{t('mfg_qa_sub')}</p>
                      <div className="space-y-6 text-gray-700 text-lg md:text-xl font-light text-justify">
                          <p>
                              {t('mfg_qa_section_desc_1')}
                          </p>
                          <p>
                              {t('mfg_qa_section_desc_2')}
                          </p>
                          <p>
                              {t('mfg_qa_section_desc_3')}
                          </p>
                      </div>
                  </FadeInSection>
                  <FadeInSection>
                      {/* Updated for responsiveness: h-auto on mobile, fixed on lg */}
                      <div className="w-full h-auto lg:h-[500px] bg-gray-100 rounded-sm overflow-hidden shadow-2xl border-4 border-white relative group">
                           <img 
                              src={ASSETS.images.manufacturing.qa} 
                              alt="Quality Assurance Team" 
                              className="w-full h-full object-cover" 
                           />
                      </div>
                  </FadeInSection>
              </div>

               {/* Real Time Inspection */}
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <FadeInSection>
                      <div className="w-full">
                           <img 
                              src={ASSETS.images.manufacturing.inspection} 
                              alt="Real Time Inspection" 
                              className="w-full h-auto rounded-sm" 
                           />
                      </div>
                  </FadeInSection>
                  <FadeInSection>
                      <h4 className="font-bold text-black text-xl mb-4">{t('mfg_realtime_title')}</h4>
                      <div className="space-y-4 text-gray-700 text-lg md:text-xl font-light text-justify">
                          <p>
                              {t('mfg_realtime_desc')}
                          </p>
                          <p className="font-bold text-gray-800 italic">{t('mfg_realtime_quote')}</p>
                      </div>
                  </FadeInSection>
              </div>
          </div>
      </section>

      {/* 7. Quality Philosophy */}
      <section className="py-20 bg-white border-t border-gray-100">
          <div className="max-w-[95%] mx-auto px-4 lg:px-8">
              <FadeInSection className="mb-12">
                   <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1e3a8a] mb-8">{t('mfg_phil_title')}</h2>
              </FadeInSection>
              
              <FadeInSection>
                  <div className="grid md:grid-cols-4 gap-6 mb-16">
                      {[
                          { title: t('mfg_phil_1_title'), desc: t('mfg_phil_1_desc') },
                          { title: t('mfg_phil_2_title'), desc: t('mfg_phil_2_desc') },
                          { title: t('mfg_phil_3_title'), desc: t('mfg_phil_3_desc') },
                          { title: t('mfg_phil_4_title'), desc: t('mfg_phil_4_desc') },
                          { title: t('mfg_phil_5_title'), desc: t('mfg_phil_5_desc') },
                          { title: t('mfg_phil_6_title'), desc: t('mfg_phil_6_desc') },
                          { title: t('mfg_phil_7_title'), desc: t('mfg_phil_7_desc') },
                          { title: t('mfg_phil_8_title'), desc: t('mfg_phil_8_desc') }
                      ].map((item, i) => (
                          <div key={i} className="bg-white border border-gray-300 p-6 rounded-sm shadow-sm hover:border-[#88c057] transition-colors">
                              <h4 className="font-bold text-black text-sm md:text-base mb-2">{item.title}</h4>
                              <p className="text-gray-600 text-xs md:text-sm">{item.desc}</p>
                          </div>
                      ))}
                  </div>
              </FadeInSection>
              
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                   <FadeInSection>
                       <div className="w-full">
                           <img 
                              src={ASSETS.images.manufacturing.philosophy} 
                              alt="Quality Philosophy" 
                              className="w-full h-auto rounded-sm" 
                           />
                       </div>
                   </FadeInSection>
                   <FadeInSection>
                       <h3 className="text-2xl md:text-3xl font-bold text-black tracking-wide mb-6">{t('mfg_believe_title')}</h3>
                       <p className="text-2xl md:text-4xl font-bold text-black leading-tight font-sans">
                         {t('mfg_believe_quote')}
                       </p>
                   </FadeInSection>
              </div>
          </div>
      </section>

      {/* 8. Fair Traceability */}
      <section className="py-20 bg-[#e7f1e9]">
          <div className="max-w-[95%] mx-auto px-4 lg:px-8">
              <FadeInSection className="mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a8a] mb-2">{t('mfg_trace_title')}</h2>
                  <p className="text-gray-800 italic font-bold text-sm">{t('mfg_qa_sub')}</p>
              </FadeInSection>

              <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <FadeInSection>
                      {/* Using object-contain to avoid cutting off diagram info */}
                      <div className="w-full flex justify-center">
                          <img 
                              src={ASSETS.images.manufacturing.traceability} 
                              alt="Traceability Diagram" 
                              className="w-full max-w-[500px] h-auto rounded-full object-contain mix-blend-multiply" 
                          />
                      </div>
                  </FadeInSection>
                  <FadeInSection>
                      <div className="space-y-6 text-gray-700 text-lg md:text-xl font-light text-justify">
                          <p>
                              {t('mfg_trace_p1')}
                          </p>
                          <p>
                              {t('mfg_trace_p2')}
                          </p>
                          <p>
                              {t('mfg_trace_p3')}
                          </p>
                      </div>
                  </FadeInSection>
              </div>

              <FadeInSection className="mt-12 text-center">
                  <h3 className="text-xl md:text-3xl font-serif font-bold text-[#1e3a8a] italic">
                      {t('mfg_trace_quote_2')}
                  </h3>
              </FadeInSection>
          </div>
      </section>

      {/* 9. Shipping and Logistics (Redesigned to avoid overlap look) */}
      <section className="py-20 bg-white">
          <div className="max-w-[95%] mx-auto px-4 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <FadeInSection>
                      <h2 className="text-3xl font-bold text-black mb-4">{t('mfg_logistics_title')}</h2>
                      <p className="text-gray-800 italic font-bold mb-6">{t('mfg_logistics_sub')}</p>
                      <p className="text-gray-700 text-lg md:text-xl font-light text-justify mb-8">
                          {t('mfg_log_p1')}
                      </p>
                      <p className="text-gray-700 text-lg md:text-xl font-light text-justify mb-8">
                          {t('mfg_log_p2')}
                      </p>
                      <div className="p-4 bg-gray-50 border-l-4 border-black">
                          <p className="text-black font-bold text-lg italic">
                             {t('mfg_log_quote_2')}
                          </p>
                      </div>
                  </FadeInSection>
                  
                  {/* Image Grid Side */}
                  <FadeInSection>
                      <div className="w-full h-[400px] md:h-[500px] rounded-sm overflow-hidden shadow-2xl border-4 border-white group">
                          <img 
                              src={ASSETS.images.manufacturing.logistics} 
                              alt="Shipping Logistics" 
                              className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105" 
                          />
                      </div>
                  </FadeInSection>
              </div>
          </div>
      </section>
      
      {/* 10. Call to Action Banner */}
      <section 
          className="relative h-[400px] w-full bg-cover bg-center bg-fixed" 
          style={{ backgroundImage: `url('${ASSETS.images.manufacturing.cta}')` }}
      >
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-6 text-center">
              <FadeInSection>
                  <p className="text-white text-xl md:text-2xl font-serif italic font-bold mb-4">
                      {t('mfg_cta_text')}
                  </p>
                  <h2 className="text-white text-2xl md:text-4xl font-bold mb-10">
                      {t('mfg_welcome_banner')}
                  </h2>
                  <button onClick={() => window.location.href = 'mailto:info@apparelbd.com'} className="border-2 border-[#88c057] text-[#88c057] px-10 py-3 text-sm font-bold uppercase tracking-widest hover:bg-[#88c057] hover:text-white transition-all duration-300">
                      {t('click_here')}
                  </button>
              </FadeInSection>
          </div>
      </section>

    </div>
  );
};

export default Manufacturing;