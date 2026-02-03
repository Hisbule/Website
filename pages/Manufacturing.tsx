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
                    Welcome to ApparelBD, Where Excellence is Crafted into Every Stitch!!
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
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
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
           {/* Top Text Block */}
           <FadeInSection>
             <div className="mb-24 text-left">
                   <h2 className="text-4xl md:text-6xl font-bold text-[#1e3a8a] mb-2 font-sans tracking-tight uppercase">MANUFACTURING EXCELLENCE</h2>
                   <p className="text-sm font-bold text-gray-800 italic mb-6">Where Expertise Ignites Precision and Artistry!!</p>
                   <p className="text-gray-700 leading-relaxed text-lg md:text-xl text-justify font-light w-full">
                      ApparelBD Sourcing stands as a Cornerstone of Manufacturing excellence, where the craft transcends machinery to embody precision, safety, and empowerment. From the initial fabric cut to the final stitch, every stage reflects a commitment to surpassing industry standards, delivering garments distinguished by exceptional quality, integrity, and artistry.
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
                      Garments are designed to look stunning, fit flawlessly, and move with effortless grace. Every detail—craftsmanship, fit, and aesthetics—is meticulously refined by a dedicated in-house technical team. Personalized fitting support and technical assistance are provided, ensuring that expectations are not only met but consistently exceeded, enhancing comfort, style, and functionality for greater customer satisfaction.
                   </p>
                   <button onClick={() => window.location.href = 'mailto:info@apparelbd.com'} className="inline-block bg-[#1e3a8a] text-white px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-[#1e3a8a]/90 transition-all shadow-xl rounded-sm">
                      EXPLORE MORE
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
                      <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a8a] mb-4">Production Control</h2>
                      <p className="text-black italic font-medium mb-8 text-lg">
                          Optimizing Efficiency, Ensuring Quality, Orchestrating Excellence!!
                      </p>
                      <div className="space-y-6 text-gray-700 leading-relaxed text-lg md:text-xl text-justify font-light">
                          <p>
                              At the core of our production control framework are four key components: Material Requirement Planning (MRP), Capacity Planning, Production Scheduling, and Rigorous Quality Control. These elements work together to ensure a seamless, efficient manufacturing process, managing everything from material sourcing to final product inspection.
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
                     <button className="inline-block border border-gray-500 px-6 py-2 text-[10px] font-bold text-black uppercase tracking-widest hover:bg-[#1e3a8a] hover:text-white hover:border-[#1e3a8a] transition-all bg-[#e6e6e6]">
                          EXPLORE MORE
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
                          src={ASSETS.images.manufacturing.qa} 
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
                      <button className="inline-block border border-gray-500 px-6 py-2 text-[10px] font-bold text-black uppercase tracking-widest hover:bg-[#1e3a8a] hover:text-white hover:border-[#1e3a8a] transition-all bg-[#e6e6e6]">
                          EXPLORE MORE
                      </button>
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
                  <button onClick={() => window.location.href = '#/ethical-sourcing'} className="inline-block border border-gray-500 px-6 py-2 text-[10px] font-bold text-black uppercase tracking-widest hover:bg-[#1e3a8a] hover:text-white hover:border-[#1e3a8a] transition-all bg-[#e6e6e6]">
                      EXPLORE MORE
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
                      <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a8a] mb-2 font-sans tracking-tight">Shipping And Logistics</h2>
                      <p className="text-sm font-bold text-gray-800 italic mb-8">Streamlined Delivery, Global Reach!!</p>
                      <p className="text-gray-700 leading-relaxed text-lg md:text-xl text-justify font-light mb-8">
                          ApparelBD Sourcing ensures a seamless end-to-end logistics experience through our dedicated in-house shipping and logistics team. We streamline supply chain processes and manage all shipping and forwarder formalities with precision. From manufacturing facilities to global destinations, we oversee every step to guarantee efficient delivery and the highest level of customer satisfaction.
                      </p>
                      <button className="inline-block border border-gray-500 px-6 py-2 text-[10px] font-bold text-black uppercase tracking-widest hover:bg-[#1e3a8a] hover:text-white hover:border-[#1e3a8a] transition-all bg-[#e6e6e6]">
                          EXPLORE MORE
                      </button>
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
                                   ApparelBD 
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
                       <h3 className="text-2xl md:text-3xl font-bold text-black tracking-wide mb-6">ApparelBD believe-</h3>
                       <p className="text-2xl md:text-4xl font-bold text-black leading-tight font-sans">
                         “Standards You Trust;<br/>
                         Quality You Feel –<br/>
                         Crafting Perfection, Built to Last."
                       </p>
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

      {/* 9. Shipping and Logistics (Redesigned to avoid overlap look) */}
      <section className="py-20 bg-white">
          <div className="max-w-[95%] mx-auto px-4 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <FadeInSection>
                      <h2 className="text-3xl font-bold text-black mb-4">Shipping and Logistics</h2>
                      <p className="text-gray-800 italic font-bold mb-6">Streamlined Delivery, Global Reach-</p>
                      <p className="text-gray-700 text-lg md:text-xl font-light text-justify mb-8">
                          Supply chain processes are streamlined, and shipping logistics are meticulously managed by our experienced in-house team. From manufacturing to final delivery, we ensure seamless transportation across global destinations. Every stage is carefully coordinated to optimize efficiency, reduce delays, and maintain strict quality controls.
                      </p>
                      <p className="text-gray-700 text-lg md:text-xl font-light text-justify mb-8">
                          Our commitment to precision and reliability guarantees timely delivery, with customer satisfaction always at the forefront of our operations.
                      </p>
                      <div className="p-4 bg-gray-50 border-l-4 border-black">
                          <p className="text-black font-bold text-lg italic">
                             “Seamless Shipping, Global Reach-Precision in Fashion Supply Chain, Streamlining Solutions for Your Needs.”
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
                      We ensure excellence at every stage, from material Sourcing to Shipping. Experience our commitment to precision and integrity.
                  </p>
                  <h2 className="text-white text-2xl md:text-4xl font-bold mb-10">
                      Welcome to ApparelBD : Where craftsmanship meets innovation!!!
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
