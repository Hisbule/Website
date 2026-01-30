import React, { useState, useEffect, useRef } from 'react';
import { ASSETS } from '../config/assets';
import HeroVideo from '../components/HeroVideo';

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
  const [currentEnvIndex, setCurrentEnvIndex] = useState(0);
  const envImages = ASSETS.images.ethical.environmental;

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
        title="Ethical and Responsive Sourcing" 
        subtitle="Ensuring integrity, transparency, and responsibility in every stitch."
        videoUrl={ASSETS.videos.ethical}
      />

      {/* 2. Intro Text Section */}
      <section className="py-16 bg-white">
        <div className="max-w-[95%] mx-auto px-4 lg:px-8">
             <FadeInSection>
                <div className="space-y-6 text-gray-700 leading-relaxed text-lg md:text-xl font-light text-justify">
                    <p>
                        <span className="font-bold text-black">Ethical sourcing</span> is our corner stone of responsible business practices. As consumers increasingly demand transparency and accountability, fashion brands are recognizing the importance of ensuring that every thread in their supply chain is merged with integrity.
                    </p>
                    <p>
                        At APPARELBD Sourcing, we are dedicated to ethical and responsive sourcing practices that protect both individuals and the environment.
                    </p>
                </div>
             </FadeInSection>
        </div>
      </section>

      {/* 3. Girl with Flowers Image & Transparency Text */}
      <section className="pb-16 bg-white">
        <div className="max-w-[95%] mx-auto px-4 lg:px-8">
           <FadeInSection>
               <div className="w-full h-[500px] md:h-[700px] rounded-sm overflow-hidden mb-12 shadow-md">
                   <img 
                      src="https://images.unsplash.com/photo-1606041008023-472dfb5e530f?q=80&w=1976&auto=format&fit=crop" 
                      alt="Girl holding flowers in nature" 
                      className="w-full h-full object-cover object-center"
                   />
               </div>
           </FadeInSection>

           <FadeInSection>
                <div className="space-y-6 text-gray-700 leading-relaxed text-lg md:text-xl font-light text-justify">
                    <p>
                        <span className="font-bold text-black">Transparency and traceability</span> are fundamental principles guiding our operations. We believe in providing full visibility into the journey of each garment, from the sourcing of raw materials to the final production stage. This commitment ensures that consumers and buyers can make informed choices, knowing where and how their garments were produced.
                    </p>
                    <p>
                        Our traceability measures ensure accountability across the supply chain, allowing us to quickly address any ethical concerns. With transparency at our core, customers can trust our commitment to sourcing ethically and responsibly. These principles build trust in our brand and enable customers to make sustainable, ethical fashion choices with every purchase.
                    </p>
                </div>
           </FadeInSection>
           
           {/* Protection Icons (Placeholder for the icons in PDF page 1 bottom) */}
           <FadeInSection className="mt-12 flex justify-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all">
                <img src="https://cdn-icons-png.flaticon.com/512/2910/2910795.png" alt="Protection" className="h-16 md:h-20 w-auto" />
                <img src="https://cdn-icons-png.flaticon.com/512/1165/1165674.png" alt="Recycle" className="h-16 md:h-20 w-auto" />
                <img src="https://cdn-icons-png.flaticon.com/512/3176/3176366.png" alt="Eco" className="h-16 md:h-20 w-auto" />
           </FadeInSection>
        </div>
      </section>

      {/* 4. Business Ethics Diagram & Hands Sorting */}
      <section className="py-16 bg-white">
          <div className="max-w-[95%] mx-auto px-4 lg:px-8">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                  <FadeInSection>
                      {/* Business Ethics Diagram Representation */}
                      <div className="bg-white p-4 rounded-sm flex items-center justify-center">
                          <img 
                            src="https://cdn.pixabay.com/photo/2019/06/19/07/13/email-4284157_1280.png" 
                            alt="Business Ethics Diagram" 
                            className="w-full h-auto object-contain max-h-[400px]"
                          />
                      </div>
                  </FadeInSection>
                  <FadeInSection>
                      <div className="h-[400px] overflow-hidden rounded-sm shadow-md">
                          <img 
                            src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=2070&auto=format&fit=crop" 
                            alt="Hands Checking Clothes" 
                            className="w-full h-full object-cover" 
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
                  APPARELBD Sourcing, Where Fashion Meets Integrity!!<br/>
                  Elevate Your Wardrobe, Elevate Your Values!!
              </h2>
          </FadeInSection>
      </section>

      {/* 6. Fair Labour Practice Section */}
      <section className="py-16 bg-[#e6f4ff]">
          <div className="max-w-[95%] mx-auto px-4 lg:px-8">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                  <FadeInSection>
                      <h3 className="text-2xl md:text-3xl font-bold text-brand-navy mb-4">Fair Labour Practice</h3>
                      <p className="text-gray-700 leading-relaxed text-lg md:text-xl font-light text-justify mb-4">
                        We stand firmly committed to upholding fair labor practices across our supply chain.
                      </p>
                      <p className="text-gray-700 leading-relaxed text-lg md:text-xl font-light text-justify">
                        This commitment ensures workers are treated with dignity and respect, receiving fair wages, safe working conditions, and reasonable hours. Through active engagement with our suppliers, we promote fair labor practices and support initiatives that enhance workers' rights and welfare.
                      </p>
                  </FadeInSection>
                  <FadeInSection>
                      <div className="h-[400px] overflow-hidden rounded-sm shadow-xl border-4 border-white">
                          <img 
                            src="https://images.unsplash.com/photo-1565532525700-111162657e28?q=80&w=1974&auto=format&fit=crop" 
                            alt="Factory Workers" 
                            className="w-full h-full object-cover"
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
                      <span className="font-bold text-black">Environmental Concern</span> at ApparelBD Sourcing, we're committed to minimizing our environmental impact by partnering with like-minded collaborators. We prioritize sustainable materials like organic cotton, recycled polyester, and ecofriendly fibers, aiming to reduce energy use, waste, and pollution across our supply chain. With a focus on environmental stewardship, we strive to lead the way toward a more sustainable, eco-conscious fashion industry. Join us in creating a greener tomorrow, one stitch at a time.
                  </p>
              </FadeInSection>
              
              {/* Full Width Single Image Slider */}
              <FadeInSection>
                  <div className="relative w-full h-[500px] md:h-[700px] rounded-sm overflow-hidden shadow-2xl group">
                       {envImages.map((img, index) => (
                           <div
                              key={index}
                              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                                index === currentEnvIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                              }`}
                           >
                              <img 
                                src={img} 
                                alt={`Environmental Initiative ${index + 1}`} 
                                className="w-full h-full object-cover" 
                              />
                              {/* Overlay Gradient */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                              <div className="absolute bottom-10 left-10 text-white z-20">
                                   <h3 className="text-3xl font-bold drop-shadow-md">Sustainable Initiative {index + 1}</h3>
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
                      <div className="h-[400px] md:h-[500px] rounded-sm overflow-hidden shadow-xl border-4 border-white">
                          <img
                            src={ASSETS.images.ethical.csr}
                            alt="Social Engagement and CSR"
                            className="w-full h-full object-cover"
                          />
                      </div>
                  </FadeInSection>
                  <FadeInSection>
                      <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a8a] mb-6">Social Engagement & CSR Programs</h2>
                      <p className="text-gray-700 leading-relaxed text-lg md:text-xl font-light text-justify">
                          We prioritize social engagement and CSR programs to positively impact our communities. We collaborate with local artisans, support education and healthcare, and empower individuals through fair-trade partnerships and a commitment to diversity and inclusion. Our dedication to social responsibility drives us to create a sustainable future where fashion fosters positive change.
                      </p>
                  </FadeInSection>
              </div>
          </div>
      </section>

      {/* 8. Supplier Audits and Certifications */}
      <section className="py-20 bg-white">
          <div className="max-w-[95%] mx-auto px-4 lg:px-8">
              <FadeInSection className="mb-12">
                  <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#1e3a8a] mb-6">Supplier Audits and Certifications</h2>
                  <div className="space-y-4 text-gray-700 leading-relaxed text-lg md:text-xl font-light text-justify">
                      <p>
                          We prioritize ethical practices and sustainability across our supply chain. Our compliance team conducts thorough audits to ensure suppliers meet our high standards for labor practices, worker safety, and environmental impact. We seek certifications that validate our commitment to ethical sourcing, providing assurance to clients and stakeholders that our products are responsibly sourced with respect for social and environmental values.
                      </p>
                      <p>
                          Our partners are with Social, Technical and Environmental standard and certifications to comply with Word Standard.
                      </p>
                  </div>
              </FadeInSection>

              {/* Logos on Forest Background with Dual Marquee */}
              <FadeInSection className="relative w-full h-[500px] rounded-sm overflow-hidden shadow-xl mb-16 group">
                  <img 
                      src="https://images.unsplash.com/photo-1448375240586-dfd8d395ea6c?q=80&w=2070&auto=format&fit=crop" 
                      alt="Forest Background" 
                      className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-black/40 flex flex-col justify-center gap-12 py-10">
                      
                      {/* Row 1: Right to Left Animation (Matches Home) */}
                      <div className="w-full overflow-hidden relative">
                           <div className="flex gap-6 w-max animate-scroll-right pause-hover">
                               {marqueeLogos1.map((logo, index) => (
                                   <div key={`row1-${index}`} className="w-[180px] md:w-[220px] h-28 bg-white/95 p-4 rounded-sm flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-300">
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
                           <div className="flex gap-6 w-max animate-scroll-left pause-hover">
                               {marqueeLogos2.map((logo, index) => (
                                   <div key={`row2-${index}`} className="w-[180px] md:w-[220px] h-28 bg-white/95 p-4 rounded-sm flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-300">
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
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1e3a8a] mb-6">Continuous Improvement</h2>
                  <p className="text-gray-700 leading-relaxed text-lg md:text-xl font-light text-justify">
                      we are committed to proactive sustainability practices. Through ongoing assessments and audits, we monitor our performance, making necessary improvements to minimize our environmental impact. Collaboration is central to our sustainability efforts, as we engage with stakeholders to drive forward sustainable practices collectively. Additionally, we embrace innovation to enhance our sustainability efforts, always seeking new solutions and technologies to advance ethical sourcing and environmental responsibility.
                  </p>
              </FadeInSection>
          </div>
      </section>

      {/* 9. Enquiry Call to Action */}
      <section className="relative h-[600px] w-full bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1537832816519-689ad163238b?q=80&w=2059&auto=format&fit=crop')" }}>
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center p-6 text-center">
              <FadeInSection>
                  <h2 className="text-white text-3xl md:text-5xl font-serif font-bold mb-6 max-w-4xl leading-tight">
                      ApparelBD Sourcing, Where Fashion Meets Integrity!! Elevate Your Wardrobe, Elevate Your Values!!
                  </h2>
                  <h3 className="text-[#88c057] text-2xl md:text-4xl font-bold mb-10 uppercase tracking-widest">
                      To Enquire with Us
                  </h3>
                  <button onClick={() => window.location.href = 'mailto:info@apparelbd.com'} className="border-2 border-white text-white px-10 py-3 text-sm font-bold uppercase tracking-widest hover:bg-[#88c057] hover:border-[#88c057] transition-all duration-300">
                      CLICK HERE
                  </button>
              </FadeInSection>
          </div>
      </section>

      {/* 10. Footer Text */}
      <section className="py-12 bg-white text-center">
          <div className="max-w-[95%] mx-auto px-4">
              <FadeInSection>
                  <p className="text-gray-600 text-sm md:text-base font-light">
                      <span className="font-bold text-black">Ethical and responsive sourcing</span> is at the core of ApparelBD Sourcing's mission. With our dedication to transparency, fair practices, sustainability, and adherence to international standards, we surpass ethical expectations. Choosing us means opting for responsible sourcing that values both people and the planet. Together, we pave the way for a future of ethical business practices.
                  </p>
              </FadeInSection>
          </div>
      </section>

    </div>
  );
};

export default EthicalSourcing;