import React, { useState, useEffect, useRef } from 'react';
import { Target, Eye, Users, Lightbulb, ShieldCheck, Heart, Leaf, Globe, CheckCircle, TrendingUp, Handshake, DollarSign, Award, Truck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ASSETS } from '../config/assets';
import { useLanguage } from '../contexts/LanguageContext';

// Styles for the Flip Card effect
const flipCardStyles = `
  .flip-card {
    perspective: 1000px;
  }
  .flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
  }
  .flip-card:hover .flip-card-inner {
    transform: rotateY(180deg);
  }
  .flip-card-front, .flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }
  .flip-card-back {
    transform: rotateY(180deg);
  }
`;

// Animation Component (reused from Home.tsx)
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

// Helper component for Value Cards
const ValueCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300 h-full">
    <div className="w-16 h-16 mb-6 flex items-center justify-center">
      {icon}
    </div>
    <h3 className="text-lg font-bold text-brand-navy mb-4">{title}</h3>
    <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
  </div>
);

// New Flip Card Component for Services
interface ServiceFlipCardProps {
  title: string;
  subtitle?: string;
  frontImage: string;
  backImage: string;
  heading?: string;
  points: string[];
  link: string;
  exploreMoreText: string;
}

const ServiceFlipCard: React.FC<ServiceFlipCardProps> = ({ title, subtitle, frontImage, backImage, heading, points, link, exploreMoreText }) => (
  <div className="flip-card h-[550px] w-full group cursor-pointer">
    <div className="flip-card-inner rounded-sm shadow-xl">
      
      {/* Front Side */}
      <div className="flip-card-front bg-gray-100 overflow-hidden relative">
        <img src={frontImage} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 text-left">
           <h3 className="text-white font-bold text-2xl md:text-3xl drop-shadow-md border-l-4 border-[#88c057] pl-4 mb-2">{title}</h3>
           {subtitle && <p className="text-white/90 text-sm pl-4 font-medium tracking-wide">{subtitle}</p>}
        </div>
      </div>

      {/* Back Side */}
      <div className="flip-card-back bg-brand-navy overflow-hidden relative text-left">
        <img src={backImage} alt={title} className="w-full h-full object-cover opacity-20 absolute inset-0" />
        <div className="absolute inset-0 bg-brand-navy/95 p-8 flex flex-col justify-center h-full">
            <div className="overflow-y-auto scrollbar-hide w-full h-full flex flex-col justify-center pt-8">
                {heading && (
                    <h4 className="text-[#88c057] font-bold text-xl md:text-2xl leading-tight mb-6 uppercase tracking-wide">
                        {heading}
                    </h4>
                )}
                <ul className="space-y-3 text-left w-full mb-8">
                    {points.map((point, idx) => (
                        <li key={idx} className="text-white text-sm md:text-base flex items-start leading-relaxed">
                            <span className="text-[#88c057] mr-2 mt-1">•</span>
                            <span className="opacity-95 font-medium">{point}</span>
                        </li>
                    ))}
                </ul>
                <div className="mt-2 mb-4">
                    <Link to={link} className="group/btn inline-flex items-center gap-2 bg-[#88c057] border-2 border-[#88c057] text-white px-6 py-2 text-xs md:text-sm font-medium uppercase tracking-widest hover:bg-transparent hover:text-[#88c057] transition-all duration-300 rounded-sm shadow-lg">
                        {exploreMoreText} <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </Link>
                </div>
            </div>
        </div>
      </div>

    </div>
  </div>
);

const About = () => {
  const { t } = useLanguage();

  // Service Data Definition - Using local assets from ASSETS.images.about.services
  const services: ServiceFlipCardProps[] = [
    {
      title: t('svc_mi_title'),
      frontImage: ASSETS.images.about.services.marketIntel.front,
      backImage: ASSETS.images.about.services.marketIntel.back, 
      link: "/market-intel",
      heading: t('svc_mi_heading'),
      exploreMoreText: t('explore_more'),
      points: [
        t('svc_mi_p1'),
        t('svc_mi_p2'),
        t('svc_mi_p3'),
        t('svc_mi_p4'),
        t('svc_mi_p5'),
        t('svc_mi_p6'),
      ]
    },
    {
      title: t('svc_rd_title'),
      subtitle: t('svc_rd_sub'),
      frontImage: ASSETS.images.about.services.rd.front,
      backImage: ASSETS.images.about.services.rd.back,
      link: "/market-intel",
      heading: t('svc_rd_heading'),
      exploreMoreText: t('explore_more'),
      points: [
        t('svc_rd_p1'),
        t('svc_rd_p2'),
        t('svc_rd_p3'),
        t('svc_rd_p4'),
        t('svc_rd_p5'),
        t('svc_rd_p6'),
        t('svc_rd_p7'),
        t('svc_rd_p8'),
      ]
    },
    {
      title: t('svc_eth_title'),
      subtitle: t('svc_eth_sub'),
      frontImage: ASSETS.images.about.services.ethical.front,
      backImage: ASSETS.images.about.services.ethical.back,
      link: "/ethical-sourcing",
      heading: t('svc_eth_heading'),
      exploreMoreText: t('explore_more'),
      points: [
        t('svc_eth_p1'),
        t('svc_eth_p2'),
        t('svc_eth_p3'),
        t('svc_eth_p4'),
      ]
    },
    {
      title: t('svc_mfg_title'),
      subtitle: t('svc_mfg_sub'),
      frontImage: ASSETS.images.about.services.manufacturing.front,
      backImage: ASSETS.images.about.services.manufacturing.back,
      link: "/manufacturing",
      heading: t('svc_mfg_heading'),
      exploreMoreText: t('explore_more'),
      points: [
        t('svc_mfg_p1'),
        t('svc_mfg_p2'),
        t('svc_mfg_p3'),
        t('svc_mfg_p4'),
        t('svc_mfg_p5'),
        t('svc_mfg_p6'),
        t('svc_mfg_p7'),
      ]
    },
    {
      title: t('svc_sus_title'),
      subtitle: t('svc_sus_sub'),
      frontImage: ASSETS.images.about.services.sustainability.front,
      backImage: ASSETS.images.about.services.sustainability.back,
      link: "/sustainability",
      heading: t('svc_sus_heading'),
      exploreMoreText: t('explore_more'),
      points: [
        t('svc_sus_p1'),
        t('svc_sus_p2'),
        t('svc_sus_p3'),
        t('svc_sus_p4'),
        t('svc_sus_p5'),
      ]
    },
    {
      title: t('svc_disney_title'),
      frontImage: ASSETS.images.about.services.disney.front,
      backImage: ASSETS.images.about.services.disney.back,
      link: "/products#disney",
      heading: t('svc_disney_heading'),
      exploreMoreText: t('explore_more'),
      points: [
        t('svc_disney_p1'),
        t('svc_disney_p2'),
      ]
    },
    {
      title: t('svc_div_title'),
      subtitle: t('svc_div_sub'),
      frontImage: ASSETS.images.about.services.diversified.front,
      backImage: ASSETS.images.about.services.diversified.back,
      link: "/products",
      heading: t('svc_div_heading'),
      exploreMoreText: t('explore_more'),
      points: [
        t('svc_div_p1'),
        t('svc_div_p2'),
        t('svc_div_p3'),
        t('svc_div_p4'),
        t('svc_div_p5'),
      ]
    },
    {
      title: t('svc_price_title'),
      subtitle: t('svc_price_sub'),
      frontImage: ASSETS.images.about.services.competitive.front,
      backImage: ASSETS.images.about.services.competitive.back,
      link: "/manufacturing",
      heading: t('svc_price_heading'),
      exploreMoreText: t('explore_more'),
      points: [
        t('svc_price_p1'),
        t('svc_price_p2'),
        t('svc_price_p3'),
        t('svc_price_p4'),
        t('svc_price_p5'),
      ]
    },
    {
      title: t('svc_jute_title'),
      frontImage: ASSETS.images.about.services.jute.front,
      backImage: ASSETS.images.about.services.jute.back,
      link: "/products#jute",
      heading: t('svc_jute_heading'),
      exploreMoreText: t('explore_more'),
      points: [
        t('svc_jute_p1'),
        t('svc_jute_p2'),
        t('svc_jute_p3'),
        t('svc_jute_p4'),
        t('svc_jute_p5'),
        t('svc_jute_p6'),
      ]
    }
  ];

  return (
    <div className="bg-white overflow-x-hidden font-sans">
      <style>{flipCardStyles}</style>

      {/* 1. Hero Section */}
      <div className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden bg-brand-navy">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover animate-slow-zoom-out"
          autoPlay
          muted
          loop
          playsInline
          poster={ASSETS.images.about.heroPoster}
        >
          <source src={ASSETS.videos.about} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 lg:px-32 lg:py-24">
          <div className="max-w-[95%] mx-auto w-full animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-2 tracking-wide uppercase">{t('about_hero_title')}</h1>
            <p className="text-xl md:text-2xl text-white/90 font-medium tracking-wide font-sans">{t('about_hero_sub')}</p>
          </div>
        </div>
      </div>

      {/* 2. Intro Section - OVERVIEW */}
      <section id="overview" className="py-16 md:py-24 bg-white scroll-mt-20">
        <div className="max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="mb-12">
            <h2 className="text-2xl md:text-4xl font-serif font-bold text-brand-navy mb-4">
              {t('about_welcome')}
            </h2>
            <h3 className="text-xl md:text-2xl font-bold text-black mb-8">
              {t('about_intro_title')}
            </h3>
            <div className="space-y-6 text-gray-700 text-lg md:text-xl leading-relaxed text-justify font-light">
              <p>
                {t('about_intro_p1')}
              </p>
              <p>
                {t('about_intro_p2')}
              </p>
            </div>
          </FadeInSection>

          {/* Large Showroom Image */}
          <FadeInSection className="w-full h-[300px] md:h-[500px] overflow-hidden rounded-sm shadow-xl mb-12">
            <img 
              src={ASSETS.images.about.introShowroom} 
              alt="ApparelBD Showroom" 
              className="w-full h-full object-cover"
            />
          </FadeInSection>

          {/* Green Banner */}
          <FadeInSection className="bg-[#88c057] py-8 px-4 text-center">
            <p className="text-white font-serif font-bold italic text-xl md:text-3xl leading-relaxed">
              {t('about_banner_green')}
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* 3. Expertise Section */}
      <section className="py-16 bg-white">
        <div className="max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Row 1 */}
          <FadeInSection className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="h-[350px] overflow-hidden rounded-sm shadow-lg">
               <img src={ASSETS.images.about.expertise1} alt="Office Interior" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="text-3xl font-serif font-bold text-brand-navy mb-8 uppercase">{t('about_expertise')}</h2>
              <ul className="space-y-4">
                {[
                  t('about_exp_1'),
                  t('about_exp_2'),
                  t('about_exp_3'),
                  t('about_exp_4'),
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="mr-3 text-black text-2xl">•</span>
                    <span className="text-xl text-gray-800 font-light pt-1">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeInSection>

          {/* Row 2 */}
          <FadeInSection className="grid md:grid-cols-2 gap-12 items-center">
             <div className="h-[350px] overflow-hidden rounded-sm shadow-lg md:order-1">
               <img src={ASSETS.images.about.expertise2} alt="Waiting Area" className="w-full h-full object-cover" />
            </div>
            <div className="md:order-2">
               <ul className="space-y-4">
                {[
                  t('about_exp_5'),
                  t('about_exp_6'),
                  t('about_exp_7'),
                  t('about_exp_8'),
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="mr-3 text-black text-2xl">•</span>
                    <span className="text-xl text-gray-800 font-light pt-1">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* 4. Design Studio Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-serif font-bold text-brand-navy mb-8 uppercase">{t('about_ds_title')}</h2>
              
              <div className="mb-8">
                <h3 className="text-xl font-bold text-black mb-2">{t('about_ds_london')}</h3>
                <p className="text-gray-700 text-lg leading-relaxed font-light">
                  {t('about_ds_london_desc')}
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold text-black mb-2">{t('about_ds_dhaka')}</h3>
                <p className="text-gray-700 text-lg leading-relaxed font-light">
                  {t('about_ds_dhaka_desc')}
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold text-black mb-2">{t('about_ds_focus')}</h3>
                <p className="font-bold text-gray-800 text-base mb-1">{t('about_ds_focus_1_label')}</p>
                <p className="text-gray-700 text-lg mb-2 font-light">{t('about_ds_focus_1_text')}</p>
                <p className="font-bold text-gray-800 text-base mb-1">{t('about_ds_focus_2_label')}</p>
                <p className="text-gray-700 text-lg font-light">{t('about_ds_focus_2_text')}</p>
              </div>
            </div>

            <div className="h-[400px] md:h-[500px] bg-white p-4 shadow-xl rounded-sm rotate-2 hover:rotate-0 transition-transform duration-500">
               <img src={ASSETS.images.about.designStudio} alt="Design Studio Work" className="w-full h-full object-cover" />
            </div>
          </FadeInSection>
        </div>
      </section>

      <div className="bg-[#88c057] py-8 px-4 text-center">
        <FadeInSection>
            <p className="text-white font-serif font-bold italic text-xl md:text-3xl leading-relaxed">
            {t('about_banner_green')}
            </p>
        </FadeInSection>
      </div>

      {/* 5. Our People Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8">
           <FadeInSection>
               <h2 className="text-4xl font-serif font-bold text-brand-navy mb-2 uppercase">{t('about_people')}</h2>
               <p className="text-gray-800 font-bold italic mb-6 text-lg">{t('about_people_sub')}</p>
               
               <div className="mb-12 text-justify">
                 <p className="text-gray-700 text-lg md:text-xl leading-relaxed font-light mb-4">
                   {t('about_people_desc')}
                 </p>
                 <p className="text-gray-700 text-lg md:text-xl leading-relaxed font-light">
                   {t('about_people_desc_2')}
                 </p>
               </div>
           </FadeInSection>

           <FadeInSection className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                 <h3 className="text-2xl font-bold text-brand-navy mb-4">{t('about_global_pres_title')}</h3>
                 <p className="text-gray-700 text-lg leading-relaxed mb-4 text-justify font-light">
                   {t('about_global_pres_desc')}
                 </p>
                 <p className="text-gray-700 text-lg leading-relaxed text-justify font-light">
                   {t('about_global_pres_desc_2')}
                 </p>
              </div>
              <div className="h-[400px] rounded-sm overflow-hidden shadow-2xl">
                 <img src={ASSETS.images.about.people1} alt="Team Meeting" className="w-full h-full object-cover" />
              </div>
           </FadeInSection>

           {/* Roles List */}
           <FadeInSection className="grid md:grid-cols-2 gap-12 items-center mt-20">
              <div className="h-[500px] rounded-sm overflow-hidden shadow-2xl">
                  <img src={ASSETS.images.about.people2} alt="Checking Clothes" className="w-full h-full object-cover" />
              </div>
              <div>
                  <ul className="space-y-6">
                      {[
                          { title: t('role_designers'), desc: t('role_designers_desc') },
                          { title: t('role_sourcing'), desc: t('role_sourcing_desc') },
                          { title: t('role_product'), desc: t('role_product_desc') },
                          { title: t('role_merch'), desc: t('role_merch_desc') },
                          { title: t('role_garment'), desc: t('role_garment_desc') },
                          { title: t('role_qa'), desc: t('role_qa_desc') },
                          { title: t('role_compliance'), desc: t('role_compliance_desc') },
                          { title: t('role_logistics'), desc: t('role_logistics_desc') }
                      ].map((role, i) => (
                          <li key={i}>
                              <p className="font-bold text-brand-navy text-lg">-{role.title}</p>
                              <p className="text-gray-600 text-base font-light pl-2">{role.desc}</p>
                          </li>
                      ))}
                  </ul>
              </div>
           </FadeInSection>
        </div>
      </section>

      {/* 6. Mission & Vision */}
      <section className="relative py-32 bg-gray-200 overflow-hidden">
        {/* Background Image of Wall with Clock */}
        <div className="absolute inset-0 z-0">
             <img src={ASSETS.images.about.missionBg} alt="Office Wall" className="w-full h-full object-cover opacity-20" />
        </div>
        
        <div className="max-w-[95%] mx-auto px-4 relative z-10 grid md:grid-cols-1 gap-12">
            
            {/* Mission Bubble */}
            <div id="mission" className="scroll-mt-24">
                <FadeInSection className="bg-white/90 backdrop-blur-sm p-8 rounded-full shadow-xl flex items-center gap-8 max-w-4xl mx-auto transform -translate-x-4 md:-translate-x-12 border-l-8 border-[#88c057]">
                    <div className="bg-[#88c057] p-4 rounded-full flex-shrink-0">
                        <TrendingUp className="text-white w-8 h-8" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-brand-navy mb-2">{t('about_mission')}</h3>
                        <p className="text-gray-700 leading-relaxed text-base md:text-lg font-light">
                           {t('about_mission_desc')}
                        </p>
                    </div>
                </FadeInSection>
            </div>

             {/* Vision Bubble */}
            <div id="vision" className="scroll-mt-24">
                 <FadeInSection className="bg-white/90 backdrop-blur-sm p-8 rounded-full shadow-xl flex items-center gap-8 max-w-4xl mx-auto transform translate-x-4 md:translate-x-12 border-l-8 border-[#88c057] mt-8">
                    <div className="bg-[#88c057] p-4 rounded-full flex-shrink-0">
                        <Eye className="text-white w-8 h-8" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-brand-navy mb-2">{t('about_vision')}</h3>
                        <p className="text-gray-700 leading-relaxed text-base md:text-lg font-light">
                           {t('about_vision_desc')}
                        </p>
                    </div>
                </FadeInSection>
            </div>

        </div>
      </section>

      {/* 7. Services Grid (Updated with Flip Cards) */}
      <section className="py-20 bg-white" id="services">
        <div className="max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8">
           <FadeInSection className="text-center mb-16">
               <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-navy mb-2">{t('services')}</h2>
               <p className="text-gray-500 italic text-xl">{t('about_services_sub')}</p>
           </FadeInSection>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {services.map((service, index) => (
                   <FadeInSection key={index}>
                       <ServiceFlipCard {...service} />
                   </FadeInSection>
               ))}
           </div>
        </div>
      </section>

      {/* 8. Values and Philosophy */}
      <section id="values" className="py-20 bg-brand-navy scroll-mt-20">
        <div className="max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8">
           <FadeInSection>
               <h2 className="text-4xl font-serif font-bold text-white text-center mb-16">{t('about_values_title')}</h2>
           </FadeInSection>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               <FadeInSection className="h-full"><ValueCard 
                  icon={<Users className="w-12 h-12 text-blue-500" />}
                  title={t('val_customer_title')}
                  description={t('val_customer_desc')}
               /></FadeInSection>
               <FadeInSection className="h-full"><ValueCard 
                  icon={<ShieldCheck className="w-12 h-12 text-blue-500" />}
                  title={t('val_integrity_title')}
                  description={t('val_integrity_desc')}
               /></FadeInSection>
               <FadeInSection className="h-full"><ValueCard 
                  icon={<Handshake className="w-12 h-12 text-yellow-500" />}
                  title={t('val_transparency_title')}
                  description={t('val_transparency_desc')}
               /></FadeInSection>
               <FadeInSection className="h-full"><ValueCard 
                  icon={<DollarSign className="w-12 h-12 text-red-500" />}
                  title={t('val_price_title')}
                  description={t('val_price_desc')}
               /></FadeInSection>
               <FadeInSection className="h-full"><ValueCard 
                  icon={<Award className="w-12 h-12 text-blue-400" />}
                  title={t('val_quality_title')}
                  description={t('val_quality_desc')}
               /></FadeInSection>
               <FadeInSection className="h-full"><ValueCard 
                  icon={<ShieldCheck className="w-12 h-12 text-orange-500" />}
                  title={t('val_safety_title')}
                  description={t('val_safety_desc')}
               /></FadeInSection>
               <FadeInSection className="h-full"><ValueCard 
                  icon={<TrendingUp className="w-12 h-12 text-green-600" />}
                  title={t('val_improvement_title')}
                  description={t('val_improvement_desc')}
               /></FadeInSection>
               <FadeInSection className="h-full"><ValueCard 
                  icon={<Lightbulb className="w-12 h-12 text-yellow-400" />}
                  title={t('val_innovation_title')}
                  description={t('val_innovation_desc')}
               /></FadeInSection>
               <FadeInSection className="h-full"><ValueCard 
                  icon={<Leaf className="w-12 h-12 text-green-500" />}
                  title={t('val_social_title')}
                  description={t('val_social_desc')}
               /></FadeInSection>
           </div>
        </div>
      </section>

      {/* 9. Collaboration Banner */}
      <section 
        className="relative h-[400px] w-full bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url('${ASSETS.images.about.collaboration}')` }}
      >
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-4">
               <FadeInSection>
                   <h2 className="text-white font-bold text-xl md:text-3xl max-w-4xl leading-relaxed mb-6">
                      {t('about_collab_title')}
                   </h2>
                   <p className="text-white font-serif font-bold italic text-xl md:text-2xl">
                      {t('about_collab_sub')}
                   </p>
               </FadeInSection>
          </div>
      </section>

    </div>
  );
};

export default About;