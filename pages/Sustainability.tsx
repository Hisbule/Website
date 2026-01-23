import React, { useState, useEffect, useRef } from 'react';
import { ASSETS } from '../config/assets';
import { Link } from 'react-router-dom';

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
  return (
    <div className="bg-white font-sans overflow-x-hidden">
      
      {/* 1. Hero Section - IMAGE (Not Video) with Title Bottom Left */}
      <div className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden bg-brand-navy">
        <img 
            src="https://images.unsplash.com/photo-1524125877861-55c58102377c?q=80&w=2070&auto=format&fit=crop" 
            alt="Sustainability Ferns"
            className="w-full h-full object-cover object-center"
        />
        {/* Dark Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30"></div>
        
        {/* Title Positioned Bottom Left */}
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 lg:px-24 lg:py-20">
             <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-2 tracking-wide animate-fade-in-up">Sustainability</h1>
        </div>
      </div>

      {/* Intro Text */}
      <section className="py-16 bg-white">
        <div className="max-w-[95%] mx-auto px-4 lg:px-8">
            <FadeInSection>
                <p className="text-gray-700 text-lg md:text-xl leading-relaxed font-light text-justify">
                    We prioritize social and ecological balance, valuing well-being and environmental health. Our mission focuses on ethical sourcing and sustainability, ensuring fair treatment for workers and minimizing our footprint. We emphasize circular thinking, emission reduction, water conservation, and responsible consumption while partnering with organizations that share our commitment to sustainability.
                </p>
            </FadeInSection>
        </div>
      </section>

      {/* Building A Green Future Together */}
      <section className="pb-16 bg-white">
          <div className="max-w-[95%] mx-auto px-4 lg:px-8">
              <FadeInSection className="mb-12">
                  <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#1e3a8a] mb-6">Building A Greener Future Together</h2>
                  <p className="text-gray-700 text-lg md:text-xl leading-relaxed font-light text-justify">
                    Transformative Potential of Sustainable Fashion, we believe in the power of sustainable fashion. Committed to sustainability, our operations focus on positive environmental and social outcomes, from sourcing to manufacturing.
                  </p>
              </FadeInSection>

              <FadeInSection>
                  <div className="grid md:grid-cols-2 gap-8">
                      <div className="h-[400px] overflow-hidden rounded-sm shadow-lg">
                          <img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2071&auto=format&fit=crop" alt="Green Forest" className="w-full h-full object-cover" />
                      </div>
                      <div className="h-[400px] overflow-hidden rounded-sm shadow-lg bg-gray-100 flex items-center justify-center relative">
                          {/* Conceptual image for Recycling */}
                          <img src="https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?q=80&w=1964&auto=format&fit=crop" alt="Recycling Fashion" className="w-full h-full object-cover" />
                      </div>
                  </div>
              </FadeInSection>
          </div>
      </section>

      {/* Green Quote Banner */}
      <section className="py-12 bg-[#88c057] text-center px-4">
          <FadeInSection>
              <h2 className="text-2xl md:text-4xl font-serif font-bold text-white italic">"Revive the Earth, Renew Our Future and Choose Today for a Greener Tomorrow"</h2>
          </FadeInSection>
      </section>

      {/* Responsibility & Diagram */}
      <section className="py-20 bg-[#f4faff]">
          <div className="max-w-[95%] mx-auto px-4 lg:px-8 grid md:grid-cols-2 gap-16 items-center">
              <FadeInSection>
                  {/* Visual representation of the diagram */}
                  <div className="bg-white p-8 rounded-xl shadow-xl border border-gray-100">
                      <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb7d5c73?q=80&w=1974&auto=format&fit=crop" alt="Sustainability Cycle" className="w-full h-auto object-contain mix-blend-multiply opacity-80" />
                  </div>
              </FadeInSection>
              <FadeInSection>
                  <h3 className="text-3xl md:text-4xl font-serif font-bold text-[#1e3a8a] mb-6">Environmental Responsibility and Accountability</h3>
                  <div className="space-y-6">
                    <p className="text-gray-700 leading-relaxed text-lg md:text-xl font-light text-justify">
                        Our growth strategy revolves around environmental responsibility and accountability.
                    </p>
                    <p className="text-gray-700 leading-relaxed text-lg md:text-xl font-light text-justify">
                        We prioritize sourcing eco-friendly, circular, sustainable, and recycled materials to minimize our environmental footprint while promoting growth that benefits both our business and the planet.
                    </p>
                  </div>
              </FadeInSection>
          </div>
      </section>

      {/* Partnering Sections */}
      <section className="py-20 bg-white">
          <div className="max-w-[95%] mx-auto px-4 lg:px-8">
              <FadeInSection className="mb-16">
                  <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#1e3a8a] mb-4">Together We Thrive: Partnering for a Greener, Sustainable Future</h2>
              </FadeInSection>

              <div className="grid md:grid-cols-2 gap-12 items-start mb-24">
                   <FadeInSection>
                       <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#1e3a8a] mb-6">Environmental Standards & Compliance</h3>
                       <p className="text-gray-700 leading-relaxed text-lg md:text-xl font-light text-justify">
                           We maintain high standards of compliance and environmental stewardship by partnering with suppliers who ensure fair labor practices and safe workplaces. Our in-house compliance team upholds these standards across our supply chain, ensuring operational integrity.
                       </p>
                   </FadeInSection>
                   <FadeInSection>
                       <div className="h-[350px] overflow-hidden rounded-sm shadow-md">
                           <img src="https://images.unsplash.com/photo-1518531933037-9a847e0f3886?q=80&w=1974&auto=format&fit=crop" alt="Environmental Standards" className="w-full h-full object-cover" />
                       </div>
                   </FadeInSection>
              </div>

              <FadeInSection className="mb-8">
                  <h3 className="text-3xl md:text-4xl font-serif font-bold text-[#1e3a8a] mb-6">Partnering for a Sustainable and Greener Future</h3>
                  <p className="text-gray-700 leading-relaxed text-lg md:text-xl font-light text-justify mb-8">
                      Collaborating with partners in Sustainability and Green initiatives programs, we organize various Corporate Social Responsibility (CSR) programs aimed at creating positive impacts in communities. By working together, we can amplify our efforts and make a meaningful difference in society.
                  </p>
              </FadeInSection>

              <FadeInSection>
                  <div className="relative h-[400px] md:h-[500px] w-full rounded-sm overflow-hidden shadow-xl group">
                      <img src="https://images.unsplash.com/photo-1596392927818-23f42199042b?q=80&w=2070&auto=format&fit=crop" alt="Green Initiative" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <h2 className="text-white text-3xl md:text-5xl font-serif font-bold text-center px-4 drop-shadow-lg italic">"Crafting Tomorrow: Innovative Solutions for a Greener Fashion Industry."</h2>
                      </div>
                  </div>
              </FadeInSection>
          </div>
      </section>

      {/* Redefining Fashion */}
      <section className="py-20 bg-[#f8f9fa]">
          <div className="max-w-[95%] mx-auto px-4 lg:px-8">
              <FadeInSection className="mb-16">
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1e3a8a] mb-6">Redefining Fashion: Green Initiatives for a Sustainable Future</h2>
                  <div className="space-y-4">
                    <p className="text-gray-700 text-lg md:text-xl font-light text-justify">Green Initiatives, we are fervently dedicated to spearheading green initiatives that transcend conventional sustainability practices.</p>
                    <p className="text-gray-700 text-lg md:text-xl font-light text-justify">From pioneering eco-friendly packaging innovations to actively championing carbon offset programs, we are committed to driving impactful change within the fashion industry. Our unwavering pursuit of innovative solutions underscores our dedication to creating a more sustainable and environmentally conscious future for fashion.</p>
                  </div>
              </FadeInSection>

              <div className="grid md:grid-cols-2 gap-12 items-center">
                   <FadeInSection>
                       <div className="h-[400px] bg-[#2d5a3f] rounded-sm overflow-hidden shadow-xl flex items-center justify-center p-4">
                           {/* Chalkboard style graphic */}
                           <img src="https://img.freepik.com/free-vector/hand-drawn-ecology-concept_23-2148532452.jpg" alt="Green Initiatives Sketch" className="w-full h-full object-cover opacity-90" />
                       </div>
                   </FadeInSection>
                   <FadeInSection>
                       <div className="text-right md:text-left">
                           <h3 className="text-3xl md:text-4xl font-serif font-bold text-[#1e3a8a] mb-4">Conscious COUTURETEX</h3>
                           <h4 className="text-2xl md:text-3xl font-bold text-[#88c057] mb-6">Wear the Change for a Sustainable and Green Tomorrow!</h4>
                       </div>
                   </FadeInSection>
              </div>
          </div>
      </section>

      {/* Green Bar Quote */}
      <section className="py-12 bg-[#88c057] text-center px-4">
          <FadeInSection>
              <h2 className="text-2xl md:text-4xl font-serif font-bold text-white italic">"Driving Eco-Friendly Fashion: Where Innovation Meets Responsibility."</h2>
          </FadeInSection>
      </section>

      {/* Carbon Footprint */}
      <section className="py-20 bg-white">
          <div className="max-w-[95%] mx-auto px-4 lg:px-8">
              <FadeInSection className="mb-12">
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1e3a8a] mb-6">Commit to Change: Lower Carbon Footprint to Safeguard the Planet!</h2>
                  <p className="text-gray-700 text-lg md:text-xl font-light text-justify leading-relaxed">
                    Carbon Footprint, we are steadfastly committed to assisting you in minimizing your carbon footprint in apparel sourcing. Partnering with us grants you access to a comprehensive range of sustainable materials, eco-friendly manufacturing processes, and renewable energy solutions. Through these initiatives, we actively contribute to fostering a more sustainable fashion industry while safeguarding our planet for future generations to thrive.
                  </p>
              </FadeInSection>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                  <FadeInSection className="h-[350px] overflow-hidden rounded-sm shadow-md">
                      <img src="https://images.unsplash.com/photo-1470723710355-171b4ebce6ca?q=80&w=2070&auto=format&fit=crop" alt="Green Industry" className="w-full h-full object-cover" />
                  </FadeInSection>
                   <FadeInSection className="h-[350px] overflow-hidden rounded-sm shadow-md relative">
                      <img src="https://images.unsplash.com/photo-1621451537084-482c73073a0f?q=80&w=1974&auto=format&fit=crop" alt="CO2 Reduction" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                          <h3 className="text-white text-5xl font-bold drop-shadow-lg">CO2</h3>
                      </div>
                  </FadeInSection>
              </div>
              
              <FadeInSection className="text-center mt-12">
                  <p className="text-2xl font-serif font-bold text-black italic">"Source Sustainably: Together, We Lower Carbon Footprints."</p>
              </FadeInSection>
          </div>
      </section>

      {/* Crafted with Care */}
      <section className="py-20 bg-[#f0fff4]">
          <div className="max-w-[95%] mx-auto px-4 lg:px-8">
              <FadeInSection className="mb-12">
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1e3a8a] mb-8">Crafted with Care: Committed to Impact through Sustainability, Renewal and Circularity</h2>
                  
                  <div className="space-y-6 text-lg md:text-xl text-gray-700 leading-relaxed text-justify font-light">
                      <p><span className="font-bold text-brand-navy">Commitment to Sustainable Materials,</span> we meticulously select natural and organic fibers, recycled materials, non-hazardous chemicals, eco-friendly dyes, and waterless processing techniques to minimize our environmental impact. Our commitment to sustainable materials is evident in the quality and integrity of our products.</p>
                      
                      <p><span className="font-bold text-brand-navy">Renewable Energy,</span> we are committed to reducing our reliance on fossil fuels and combating climate change by incorporating solar, wind, and other renewable energy technologies into our operations. Transitioning to renewable energy is a crucial step towards a more sustainable future.</p>
                      
                      <p><span className="font-bold text-brand-navy">Circular Economy Practices,</span> embracing circular economy practices, we implement waste reduction strategies, champion recycling and upcycling initiatives, and invest in energy-efficient technologies. By closing the loop, we strive to create a more sustainable and resource-efficient fashion industry.</p>
                  </div>
              </FadeInSection>

              <FadeInSection className="mt-12">
                  <div className="w-full h-[400px] md:h-[500px] relative overflow-hidden rounded-sm shadow-xl">
                      <img src="https://images.unsplash.com/photo-1623126908029-58cb08a2b272?q=80&w=2070&auto=format&fit=crop" alt="Sustainable Hands" className="w-full h-full object-cover" />
                  </div>
              </FadeInSection>
          </div>
      </section>

      {/* Call to Action Enquire */}
      <section className="relative h-[600px] w-full bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=1974&auto=format&fit=crop')" }}>
          <div className="absolute inset-0 bg-[#e0f2f1]/90 flex flex-col items-center justify-center p-6 text-center">
              <div className="bg-[#b3e5fc] w-full py-8 mb-0 absolute top-0 left-0 shadow-sm">
                  <p className="text-[#1e3a8a] italic font-serif font-bold text-lg md:text-xl">"We dedicated to offer sustainable sourcing solutions aligned with your values, transforming the fashion industry one eco-friendly garment at a time."</p>
              </div>

              <div className="relative w-full h-full flex items-center justify-center pt-24 pb-8 max-w-[95%] mx-auto">
                   {/* Background Image inside the section */}
                   <div className="relative w-full h-full overflow-hidden rounded-sm shadow-2xl">
                       <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb7d5c73?q=80&w=1974&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-100" />
                       <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent flex flex-col justify-center px-8 md:px-20 text-left">
                           <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight max-w-3xl">Discover our services and partner with us on the journey towards responsible fashion and a more sustainable world.</h2>
                           <h3 className="text-2xl font-bold text-[#88c057] mb-8 uppercase tracking-wide">To Enquire with Us</h3>
                           <div>
                                <button onClick={() => window.location.href = 'mailto:info@couturetex.com'} className="border-2 border-white text-white px-10 py-3 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300">
                                    CLICK HERE
                                </button>
                           </div>
                       </div>
                   </div>
              </div>
          </div>
      </section>

    </div>
  );
};

export default Sustainability;