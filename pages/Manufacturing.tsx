import React, { useState, useEffect, useRef } from 'react';
import { Shield, Zap, Users, CheckCircle, Truck } from 'lucide-react';
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

const Manufacturing = () => {
  return (
    <div className="bg-white font-sans overflow-x-hidden">
      
      {/* 1. Hero Section - VIDEO */}
      <HeroVideo 
        title="Manufacturing Excellence" 
        videoUrl={ASSETS.videos.manufacturing}
      />
      
      {/* 2. Intro Section */}
      <section className="py-16 bg-white">
        <div className="max-w-[95%] mx-auto px-4 lg:px-8">
            <FadeInSection className="mb-12">
                <h2 className="text-2xl md:text-4xl font-bold text-[#1e3a8a] mb-6 font-serif">
                    Welcome to APPARELBD, Where Excellence is Crafted into Every Stitch!!
                </h2>
                <div className="space-y-6 text-gray-700 leading-relaxed text-lg md:text-xl font-light text-justify">
                    <p>
                        ApparelBD Sourcing stands as a lighthouse of manufacturing fineness. Our journey begins with the belief that manufacturing isn't just about machines and factories; it's about fostering a culture of precision, safety, and empowerment at every turn.
                    </p>
                    <p>
                        Stepping into a world where manufacturing becomes an art form, with industry standards challenged and surpassed, and every stage—from fabric cut to delivery—transformed into a testament to precision, quality, and integrity.
                    </p>
                </div>
            </FadeInSection>
        </div>
      </section>

      {/* 3. Excellence Mission */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-[95%] mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-start mb-12">
                <FadeInSection>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1e3a8a] mb-6">Excellence Mission:</h2>
                    <p className="text-gray-800 font-bold italic mb-6 text-lg">Defining Manufacturing Excellence:</p>
                    
                    <div className="space-y-6">
                        <div>
                            <h4 className="font-bold text-black text-xl mb-2">Precision, Safety, Empowerment-</h4>
                            <p className="text-gray-700 text-lg font-light text-justify">
                                Quality is a core value, backed by advanced testing, skilled QC teams and collaboration with partner factories to ensure excellence.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-black text-xl mb-2">Efficient and Safe Processes:</h4>
                            <p className="text-gray-700 text-lg font-light text-justify">
                                Innovation in Motion- Efficiency and safety are prioritized through streamlined methods and automation, ensuring garments are made quickly and accurately.
                            </p>
                        </div>
                    </div>
                </FadeInSection>

                <FadeInSection>
                     <div className="grid grid-cols-2 gap-4">
                        <img 
                            src={ASSETS.images.manufacturing.mission1} 
                            className="w-full h-auto object-cover rounded-sm" 
                            alt="Mission Image 1" 
                        />
                         <img 
                            src={ASSETS.images.manufacturing.mission2} 
                            className="w-full h-auto object-cover rounded-sm" 
                            alt="Mission Image 2" 
                        />
                     </div>
                </FadeInSection>
            </div>

            <FadeInSection>
                <div className="grid md:grid-cols-3 gap-8 text-gray-700 text-lg font-light text-justify border-t border-gray-200 pt-8">
                    <div>
                        <h4 className="font-bold text-black text-lg mb-2">Empowered and Capable Teams:</h4>
                        <p className="mb-2 font-bold text-sm text-gray-500">The Heartbeat of Excellence-</p>
                        <p>Skilled, empowered teams drive improvement through training, feedback, and recognition, creating a culture of shared success.</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-black text-lg mb-2">Commitment to Continuous Improvement-</h4>
                        <p>We pursue excellence by refining processes, embracing innovation, and investing in people to craft exceptional garments</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-black text-lg mb-2">Flexibility:</h4>
                        <p className="mb-2 font-bold text-sm text-gray-500">Competitive Price, Competitive Quality, Order Quantity-</p>
                        <p>We deliver premium clothing with great prices, Quick turnarounds, and flexible orders enabled by smart partnerships and a lean supply chain.</p>
                    </div>
                </div>
            </FadeInSection>

             <FadeInSection className="mt-12 bg-white p-6 shadow-sm border-l-4 border-[#1e3a8a]">
                  <h3 className="text-xl md:text-2xl font-serif font-bold text-[#1e3a8a] italic text-center">
                      "Excellence Mission: Driven by Precision- Empowering Quality, Converging Innovation!!"
                  </h3>
             </FadeInSection>
        </div>
      </section>

      {/* 4. Manufacturing Services - R&D */}
      <section className="py-20 bg-white">
        <div className="max-w-[95%] mx-auto px-4 lg:px-8">
            <FadeInSection className="mb-12">
                 <h2 className="text-4xl md:text-5xl font-bold text-[#1e3a8a] uppercase mb-12">MANUFACTURING SERVICES:</h2>
            </FadeInSection>

            {/* Fabric R&D */}
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
                <FadeInSection>
                    <div className="w-full">
                        <img 
                            src={ASSETS.images.manufacturing.fabric} 
                            alt="Fabric R&D" 
                            className="w-full h-auto rounded-sm" 
                        />
                    </div>
                </FadeInSection>
                <FadeInSection>
                    <h3 className="text-3xl font-bold text-black mb-4">Fabric R&D and Innovation:</h3>
                    <p className="text-gray-800 italic font-bold mb-6">Innovation, Tailored to Trend. Designed to Drive Fashion Forward!!</p>
                    <p className="text-gray-700 text-lg md:text-xl font-light text-justify mb-8">
                        At the heart of our innovation lies a passion for pushing fashion forward. Through cutting-edge R&D, we craft next-gen fabrics, daring new designs, advanced embellishments, and progressive wash techniques. Our agile sampling, expert garment fitting, and technical precision ensure we stay ahead of trends—delivering standout style with speed, creativity, and craftsmanship. In a world that never stops evolving, we don't just keep up—we lead.
                    </p>
                    <div className="bg-gray-100 p-6 border-l-4 border-[#88c057]">
                        <p className="text-black font-bold text-lg mb-2">"Ahead of the Curve-</p>
                        <p className="text-black font-bold text-xl italic">Designing Tomorrow's Fashion, Today."</p>
                    </div>
                </FadeInSection>
            </div>

            {/* Fitting / Technical Support */}
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
                 <FadeInSection className="lg:order-2">
                    <div className="w-full">
                         <img 
                            src={ASSETS.images.manufacturing.fitting} 
                            alt="Garment Fitting" 
                            className="w-full h-auto rounded-sm" 
                        />
                    </div>
                </FadeInSection>
                <FadeInSection className="lg:order-1">
                    <h3 className="text-3xl font-bold text-black mb-4">Fitting / Garment Technical Support</h3>
                    <p className="text-gray-800 italic font-bold mb-6">Redefining Comfort, Style and Functionality!!</p>
                    <p className="text-gray-700 text-lg md:text-xl font-light text-justify mb-8">
                        Garments that not only look stunning but fit like a dream and move with effortless grace are envisioned. Every aspect of the garment—its craftsmanship, fit, and aesthetic attributes—is meticulously perfected by a dedicated in-house technical team. Personalized fitting assistance and garment technical support are provided, ensuring that expectations are not only met but consistently exceeded, enhancing comfort, style, and functionality.
                    </p>
                </FadeInSection>
            </div>

            <FadeInSection className="mb-24 text-center">
                 <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#1e3a8a] italic">
                     Precision Fit, Precision Style: Your Style, Our Expertise, Where Comfort Meets Fashion!!
                 </h2>
            </FadeInSection>

             {/* Production Control */}
             <div className="grid lg:grid-cols-2 gap-12 items-start">
                 <FadeInSection>
                    <h3 className="text-3xl font-bold text-black mb-4">Production Control</h3>
                    <p className="text-gray-800 italic font-bold mb-6">Streamlining Operations, Ensuring Quality, Orchestrating Excellence!!</p>
                    <div className="space-y-6 text-gray-700 text-lg md:text-xl font-light text-justify">
                        <p>
                            Behind every flawless garment lies a sophisticated and well-coordinated framework of production control, designed to uphold the highest standards of quality and efficiency.
                        </p>
                        <p>
                             At the heart of this system are robust methodologies such as Material Requirement Planning (MRP), Capacity Planning, Production Scheduling, and Rigorous Quality Control.
                        </p>
                        <p>
                            These elements work in harmony to create a seamless manufacturing process—one that transforms concepts into impeccably crafted clothing.
                        </p>
                    </div>
                 </FadeInSection>
                 <FadeInSection>
                    <div className="w-full">
                         <img 
                            src={ASSETS.images.manufacturing.production} 
                            alt="Production Control" 
                            className="w-full h-auto rounded-sm" 
                        />
                    </div>
                </FadeInSection>
             </div>
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
                                   <span className="font-bold text-sm">Efficiency Optimization</span>
                               </div>
                               <div className="bg-[#f0f9f0] p-4 rounded border border-green-100 flex items-center justify-center flex-col">
                                   <Users className="w-6 h-6 text-green-500 mb-2" />
                                   <span className="font-bold text-sm">Collaboration With Partners</span>
                               </div>
                               <div className="bg-[#fff9e6] p-4 rounded border border-yellow-100 flex items-center justify-center flex-col">
                                   <Shield className="w-6 h-6 text-yellow-500 mb-2" />
                                   <span className="font-bold text-sm">Quality Control as Culture</span>
                               </div>
                               <div className="bg-[#ffe6e6] p-4 rounded border border-red-100 flex items-center justify-center flex-col">
                                   <CheckCircle className="w-6 h-6 text-red-500 mb-2" />
                                   <span className="font-bold text-sm">Material Supply Chain</span>
                               </div>
                               <div className="col-span-2 bg-[#1e3a8a] text-white p-4 rounded font-bold uppercase">
                                   APPARELBD Sourcing Limited
                               </div>
                           </div>
                       </div>
                   </FadeInSection>

                   <FadeInSection>
                       <div className="space-y-6 text-gray-700 text-lg md:text-xl font-light text-justify">
                           <p>
                               Every step—from raw material procurement to final finishing—is carefully monitored and optimized. Through meticulous supply chain management, we reduce lead times, minimize waste, and boost productivity.
                           </p>
                           <p>
                               This enables us to offer exceptional craftsmanship, competitive pricing, and flexible order quantities tailored to your needs.
                           </p>
                           <p>
                               Our approach goes beyond efficiency—built on precision, reliability, and a drive to exceed expectations. Your vision is realized with exceptional detail, delivered on time and to the highest standards.
                           </p>
                       </div>
                   </FadeInSection>
               </div>

               <FadeInSection>
                   <h3 className="text-xl md:text-2xl font-serif font-bold text-[#1e3a8a] text-center italic">
                       "Crafting Excellence: Refined Control, Flawless Garments, Excellence in Every Stitch, Efficiency in Every Step"
                   </h3>
               </FadeInSection>
           </div>
      </section>

      {/* 6. Quality Assurance */}
      <section className="py-20 bg-white">
          <div className="max-w-[95%] mx-auto px-4 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
                  <FadeInSection>
                      <h3 className="text-3xl font-bold text-black mb-4">Quality Assurance:</h3>
                      <p className="text-gray-800 italic font-bold mb-6">Redefining Excellence in Craftsmanship and Enduring Durability!!</p>
                      <div className="space-y-6 text-gray-700 text-lg md:text-xl font-light text-justify">
                          <p>
                              The highest standards of quality are upheld through strict control measures, implemented in close collaboration with our trusted partners.
                          </p>
                          <p>
                              From the careful selection of raw materials to final production, every step is closely monitored to meet our quality standards. This collaborative approach ensures real-time oversight, continuous improvement, and seamless supply chain integration.
                          </p>
                          <p>
                              Each phase is guided by a shared commitment to excellence, precision, and consistency—ensuring that every product delivered meets or exceeds expectations
                          </p>
                      </div>
                  </FadeInSection>
                  <FadeInSection>
                      <div className="w-full">
                           <img 
                              src={ASSETS.images.manufacturing.qa} 
                              alt="Quality Assurance Team" 
                              className="w-full h-auto rounded-sm" 
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
                      <h4 className="font-bold text-black text-xl mb-4">Real-Time Inspections, Rigorous Quality Controls, Lab-Certified Validation</h4>
                      <div className="space-y-4 text-gray-700 text-lg md:text-xl font-light text-justify">
                          <p>
                              From the factory floor to final dispatch, our quality assurance system integrates in-process checks, tight procedural oversight, and accredited lab testing—ensuring every product meets global standards of performance and reliability.
                          </p>
                          <p className="font-bold text-gray-800 italic">"Driven by Precision, Crafted with Care.. Built on Quality. Delivered with Confidence.</p>
                      </div>
                  </FadeInSection>
              </div>
          </div>
      </section>

      {/* 7. Quality Philosophy */}
      <section className="py-20 bg-white border-t border-gray-100">
          <div className="max-w-[95%] mx-auto px-4 lg:px-8">
              <FadeInSection className="mb-12">
                   <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1e3a8a] mb-8">Quality Philosophy</h2>
              </FadeInSection>
              
              <FadeInSection>
                  <div className="grid md:grid-cols-4 gap-6 mb-16">
                      {[
                          { title: 'Dependable Products-', desc: 'Every piece reflects our integrity.' },
                          { title: 'More Than a Garment', desc: 'Lasting promise of Quality!!' },
                          { title: 'Precision at Every Stage-', desc: 'Advanced QA protocols guide each step.' },
                          { title: 'Integrated Quality Systems –', desc: 'Quality control is embedded as Culture, not added.' },
                          { title: 'Proactive Prevention –', desc: 'Issues are eliminated before they arise.' },
                          { title: 'Comprehensive Testing –', desc: 'Standardize Laboratory testing of materials.' },
                          { title: 'Rigorous Inspections –', desc: 'All Details are inspected properly.' },
                          { title: 'Continuous Refinement', desc: '– Real-time feedback powers improvement.' }
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
                       <h3 className="text-2xl md:text-3xl font-bold text-black uppercase tracking-wide">APPARELBD SOURCING believe-</h3>
                   </FadeInSection>
              </div>
          </div>
      </section>

      {/* 8. Fair Traceability */}
      <section className="py-20 bg-[#e7f1e9]">
          <div className="max-w-[95%] mx-auto px-4 lg:px-8">
              <FadeInSection className="mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a8a] mb-2">Fair Traceability</h2>
                  <p className="text-gray-800 italic font-bold text-sm">Redefining Excellence in Craftsmanship - Enduring Durability!!</p>
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
                              Fair traceability is prioritized through transparent, real-time updates shared with customers at every stage of the product's journey—from the sourcing of raw materials to the final moments of manufacturing.
                          </p>
                          <p>
                              Ethical practices and unwavering accountability are upheld across the entire supply chain.
                          </p>
                          <p>
                              We cultivate more than just compliance; we nurture trust, uphold integrity, and build relationships rooted in openness, responsibility, and enduring respect
                          </p>
                      </div>
                  </FadeInSection>
              </div>

              <FadeInSection className="mt-12 text-center">
                  <h3 className="text-xl md:text-3xl font-serif font-bold text-[#1e3a8a] italic">
                      “Trace The Journey, Trust the Process- Where Transparency meets Fashion !!”
                  </h3>
              </FadeInSection>
          </div>
      </section>

      {/* 9. Shipping and Logistics */}
      <section className="pt-20 pb-0 bg-white">
          <div className="max-w-[95%] mx-auto px-4 lg:px-8 mb-16">
              <FadeInSection>
                  <h2 className="text-3xl font-bold text-black mb-4">Shipping and Logistics</h2>
                  <p className="text-gray-800 italic font-bold mb-6">Streamlined Delivery, Global Reach-</p>
                  <p className="text-gray-700 text-lg md:text-xl font-light text-justify mb-8">
                      Supply chain processes are streamlined, and shipping logistics are meticulously managed by our experienced in-house team. From manufacturing to final delivery, we ensure seamless transportation across global destinations. Every stage is carefully coordinated to optimize efficiency, reduce delays, and maintain strict quality controls.
                  </p>
                  <p className="text-gray-700 text-lg md:text-xl font-light text-justify">
                      Our commitment to precision and reliability guarantees timely delivery, with customer satisfaction always at the forefront of our operations.
                  </p>
              </FadeInSection>
          </div>

          {/* Frameless full width image */}
          <div className="relative w-full">
              <img 
                  src={ASSETS.images.manufacturing.logistics} 
                  alt="Shipping Logistics" 
                  className="w-full h-auto object-cover" 
              />
              <div className="absolute top-10 left-10 bg-white/90 p-8 max-w-2xl rounded-sm shadow-xl hidden md:block">
                   <FadeInSection>
                       <h3 className="text-2xl font-bold text-black leading-tight">
                           “Seamless Shipping, Global Reach-Precision in Fashion Supply Chain, Streamlining Solutions for Your Needs.”
                       </h3>
                   </FadeInSection>
              </div>
          </div>
      </section>
      
      {/* 10. Call to Action Banner */}
      <section 
          className="relative h-[400px] w-full bg-cover bg-center" 
          style={{ backgroundImage: `url('${ASSETS.images.manufacturing.cta}')` }}
      >
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-6 text-center">
              <FadeInSection>
                  <p className="text-white text-xl md:text-2xl font-serif italic font-bold mb-4">
                      We ensure excellence at every stage, from material Sourcing to Shipping. Experience our commitment to precision and integrity.
                  </p>
                  <h2 className="text-white text-2xl md:text-4xl font-bold mb-10">
                      Welcome to APPARELBD Sourcing Limited: Where craftsmanship meets innovation!!!
                  </h2>
                  <button onClick={() => window.location.href = 'mailto:info@apparelbd.com'} className="border-2 border-[#88c057] text-[#88c057] px-10 py-3 text-sm font-bold uppercase tracking-widest hover:bg-[#88c057] hover:text-white transition-all duration-300">
                      CLICK HERE
                  </button>
              </FadeInSection>
          </div>
      </section>

    </div>
  );
};

export default Manufacturing;