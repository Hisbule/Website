import React, { useState, useEffect, useRef } from 'react';
import { ASSETS } from '../config/assets';
import { TrendingUp, Clock, Users, Handshake, PenTool, Leaf, Scissors, Layers, CheckCircle } from 'lucide-react';
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

const MarketIntel = () => {
  // Slideshow state for Fashion Evolution
  const [currentFashionIndex, setCurrentFashionIndex] = useState(0);
  const fashionImages = [
     "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2000&auto=format&fit=crop",
     "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?q=80&w=2000&auto=format&fit=crop",
     "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2000&auto=format&fit=crop"
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
        title="Market Intel Design" 
        subtitle="Design Expedition"
        videoUrl={ASSETS.videos.marketIntel}
      />

      {/* Section 1: FASHION EVOLUTION */}
      <section className="py-20 bg-white">
        <div className="max-w-[90%] mx-auto px-4">
          <FadeInSection className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1e3a8a] mb-4 uppercase tracking-tight">FASHION EVOLUTION</h2>
            <p className="text-lg md:text-xl text-gray-800 italic font-medium mb-6">
              Redefining Style in Motion, Where the Future Wears Us !!
            </p>
            <p className="text-gray-700 leading-relaxed text-lg md:text-xl text-justify font-light">
              Fashion Evolution is not just a movement—it’s a metamorphosis. A realm where imagination dances with science, and every silhouette tells a story of tomorrow. Here, visionary design, fearless research, and boundless innovation converge to reimagine fashion for a world in motion.
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
               <h3 className="text-2xl md:text-3xl font-bold text-black mb-6">Fashion is no longer just fabric— it’s a Language!!</h3>
               <p className="text-gray-700 leading-relaxed text-lg md:text-xl text-justify font-light mb-6">
                 A living reflection of shifting identities, a tapestry woven with values, where ancient threads intertwine with future forms.
               </p>
               <p className="text-gray-700 leading-relaxed text-lg md:text-xl text-justify font-light mb-6">
                 At APPARELBD, evolution is in our DNA. Our designers blend ethics with elegance, tradition with technology, crafting timeless, future-forward pieces. Using next-gen materials and zero-waste design, we create a new era where style meets sustainability.
               </p>
               <p className="text-[#1e3a8a] font-bold text-xl italic">Meaningful, Mesmerizing, Mindfully Made!!</p>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Quote Banner */}
      <section className="py-16 bg-gray-50 text-center px-4">
        <FadeInSection>
          <h2 className="text-2xl md:text-4xl font-serif font-bold text-[#1e3a8a] italic leading-relaxed">
            “ Fashion moves at the speed of thought and flows with the mind —Evolution is its Essence.”
          </h2>
        </FadeInSection>
      </section>

      {/* Section 2: R&D */}
      <section className="py-20 bg-white">
        <div className="max-w-[90%] mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
           <FadeInSection>
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Research & Development and Innovation</h2>
              <p className="text-gray-600 italic font-medium mb-6">“Innovating Style. Inspiring Change..”</p>
              
              <div className="space-y-6 text-gray-700 leading-relaxed text-lg md:text-xl text-justify font-light">
                 <p>
                    At Fashion Evolution, we fuse cutting-edge R&D with creative innovation to redefine fashion—crafting durable, artistic pieces through advanced fabrics, embellishments, and wash techniques.
                 </p>
                 <p>
                    “Fast sampling and design refinement are enabled by our agile process through close collaboration and ongoing experimentation, with top-tier quality and comfort ensured by expert fitting and technical support.”
                 </p>
              </div>

              <div className="mt-8 border-l-4 border-[#88c057] pl-4">
                 <h3 className="text-xl font-bold text-black mb-2">“Where Vision Meets Precision.”</h3>
                 <p className="text-gray-700 text-lg font-light">We’re not just adapting to the future of fashion —we’re shaping it.</p>
              </div>
           </FadeInSection>

           <FadeInSection>
              <div className="h-[500px] w-full rounded-sm overflow-hidden shadow-xl border-8 border-gray-100">
                  <img src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=2274&auto=format&fit=crop" alt="Fabric Shelves" className="w-full h-full object-cover" />
              </div>
           </FadeInSection>
        </div>
      </section>

      {/* Section 3: Design Innovation */}
      <section className="py-20 bg-[#f8f9fa]">
        <div className="max-w-[90%] mx-auto px-4">
           <FadeInSection className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-2">Design Innovation, Elevating Creative Elegance-</h2>
              <p className="text-gray-600 font-bold mb-6">Welcome to Our Design Expedition-</p>
              <p className="text-gray-700 leading-relaxed text-lg md:text-xl text-justify font-light mb-6">
                 This is more than fashion—it’s a movement. A bold commitment to pushing creative boundaries, embracing responsible design, and igniting global change. Whether you’re launching a new label, redefining your brand, or seeking a design partner to bring your vision to life, APPARELBD is your creative ally.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg md:text-xl text-justify font-light">
                 Co-creation is core to our process. By collaborating with diverse design talent, we merge creativity with market insight—amplifying our clients’ capabilities while preserving brand authenticity.
              </p>
           </FadeInSection>

           <div className="grid lg:grid-cols-2 gap-12 items-center">
              <FadeInSection>
                 <div className="h-[400px] rounded-sm overflow-hidden shadow-lg">
                    <img src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=2070&auto=format&fit=crop" alt="Design Team" className="w-full h-full object-cover" />
                 </div>
              </FadeInSection>
              
              <FadeInSection className="bg-white p-8 rounded-sm shadow-md border-l-4 border-[#1e3a8a]">
                 <p className="text-xl font-bold text-black italic mb-6">
                    Crafting the Future of Fashion- Elevating Style.... <br/>Redefining Elegance...!!
                 </p>
                 <div className="mb-6">
                    <span className="font-bold text-black text-lg block mb-1">Join us-</span>
                    <span className="text-gray-700 text-lg font-light">Where innovation thrives and fashion is redefined.</span>
                 </div>
                 <p className="text-lg font-bold text-[#88c057]">
                    Let’s spark creativity, inspire change, and shape the future together!!
                 </p>
              </FadeInSection>
           </div>
        </div>
      </section>

      {/* Section 4: Trend Analysis */}
      <section className="py-20 bg-white">
        <div className="max-w-[90%] mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
            <FadeInSection>
               <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a8a] mb-8">Trend Analysis: Insight-Driven Design-</h2>
               <ul className="space-y-6">
                  <li className="text-gray-700 text-lg md:text-xl font-light text-justify">
                     <span className="font-bold text-black">Fashion evolves quickly,</span> and staying ahead requires strategic insight.
                  </li>
                  <li className="text-gray-700 text-lg md:text-xl font-light text-justify">
                     <span className="font-bold text-black">Global Trend Forecasting,</span> We predict emerging trends worldwide.
                  </li>
                  <li className="text-gray-700 text-lg md:text-xl font-light text-justify">
                     <span className="font-bold text-black">Seasonal Color & Silhouette Insights,</span> Precise predictions for the season’s colors and shapes.
                  </li>
                  <li className="text-gray-700 text-lg md:text-xl font-light text-justify">
                     <span className="font-bold text-black">Consumer Behavior Analysis,</span> We track shifting consumer preferences.
                  </li>
                  <li className="text-gray-700 text-lg md:text-xl font-light text-justify">
                     <span className="font-bold text-black">Competitive Benchmarking,</span> Insights to keep your brand ahead of the competition.
                  </li>
               </ul>
            </FadeInSection>

            <FadeInSection>
               <div className="h-[400px] md:h-[500px] rounded-sm overflow-hidden shadow-2xl border-4 border-white transform rotate-1 hover:rotate-0 transition-transform duration-500">
                  <img src="https://images.unsplash.com/photo-1542060748-10c287222651?q=80&w=2340&auto=format&fit=crop" alt="Trend Board" className="w-full h-full object-cover" />
               </div>
            </FadeInSection>
        </div>
      </section>

      {/* Quote Banner 2 */}
      <section className="py-12 bg-[#e6f4ff] text-center px-4">
        <FadeInSection>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#1e3a8a] italic">
            “Stay Ahead with Insight-Driven Design, Shaping Tomorrow’s Fashion Today.”
          </h2>
        </FadeInSection>
      </section>

      {/* Section 5: Design Studio */}
      <section className="py-20 bg-white">
         <div className="max-w-[90%] mx-auto px-4">
            <FadeInSection className="text-left mb-16">
               <h2 className="text-4xl md:text-5xl font-bold text-[#1e3a8a] mb-2 uppercase">DESIGN STUDIO:</h2>
               <p className="text-gray-600 italic font-bold mb-6">Where Global Ideas Become Iconic Fashion</p>
               <p className="text-gray-700 leading-relaxed text-lg md:text-xl text-justify font-light">
                  At APPARELBD, design is more than a process — it’s a cross-continental collaboration. Our London and Dhaka studios work in harmony to transform insights, craftsmanship, and creativity into future-ready, ethically made fashion collections. Together, they form a design ecosystem where ideas evolve, aesthetics are refined, and sustainability leads every step
               </p>
            </FadeInSection>

            {/* London Studio */}
            <div className="mb-24">
               <FadeInSection>
                  <h3 className="text-3xl font-bold text-black mb-2">APPARELBD London, UK Design Studio:</h3>
                  <p className="text-gray-600 italic font-bold mb-6">Leading with Insight, Elegance. Creativity...!!</p>
                  <p className="text-gray-700 leading-relaxed text-lg md:text-xl text-justify font-light mb-6">
                     Located in the heart of the UK, our London studio leads with a unique blend of market intelligence, design innovation, cultural fluency, and timeless aesthetics. We craft collections that inspire, reflect your brand’s essence, and set new trends.
                  </p>
               </FadeInSection>
               
               <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <FadeInSection className="text-gray-700 leading-relaxed text-lg md:text-xl text-justify font-light space-y-6">
                     <p>
                        Driven by UK-origin designers with global experience across renowned fashion brands, our team fuses creative vision with commercial strategy to deliver insightful, striking, and sustainable designs. Through collaborative co-creation, we amplify your brand’s voice with global relevance—partnering from concept to final product.
                     </p>
                     <p className="font-bold text-black italic">Let’s build the future of fashion together!!</p>
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
                  <h3 className="text-3xl font-bold text-[#1e3a8a] uppercase border-b-2 border-gray-200 pb-2 inline-block">STUDIO HIGHLIGHT:</h3>
               </FadeInSection>
               
               <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                  {[
                     { icon: <TrendingUp size={40} className="text-[#eab308]" />, title: 'Trend Intelligence', items: ['-Advanced trend foresight', '-Cultural fluency'] },
                     { icon: <Clock size={40} className="text-[#3b82f6]" />, title: 'Timeless Design', items: ['-Ethical Elegance', '-Elevated, Conscious Design'] },
                     { icon: <Users size={40} className="text-[#22c55e]" />, title: 'Brand Synergy', items: ['-Brand-Centric Innovation', '-Worldwide Brand Focus'] },
                     { icon: <Handshake size={40} className="text-[#ef4444]" />, title: 'Co-Creation', items: ['-Collective Collaboration', '-Design Together'] }
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
                          <img src="https://images.unsplash.com/photo-1596482103565-d603a1163152?q=80&w=2000&auto=format&fit=crop" alt="Mannequins" className="w-full h-full object-cover" />
                      </div>
                  </FadeInSection>
                  <FadeInSection>
                      <div className="h-[400px] rounded-sm overflow-hidden shadow-xl">
                          <img src="https://images.unsplash.com/photo-1606041008023-472dfb5e530f?q=80&w=1976&auto=format&fit=crop" alt="Sketching" className="w-full h-full object-cover" />
                      </div>
                  </FadeInSection>
               </div>
               
               <FadeInSection className="text-center mt-12">
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#1e3a8a] italic">
                     “Innovation meets elegance at our London hub — shaping trends with integrity.”
                  </h3>
               </FadeInSection>
            </div>

            {/* Dhaka Studio */}
            <div className="mb-24">
               <FadeInSection className="mb-8">
                  <h3 className="text-3xl font-bold text-black mb-2">APPARELBD Dhaka, Bangladesh Design Studio:</h3>
                  <p className="text-gray-600 italic font-bold mb-6">Crafting the Future: Heritage, Vision, and Scalable Design!!</p>
                  <p className="text-gray-700 leading-relaxed text-lg md:text-xl text-justify font-light">
                     In Dhaka, Bangladesh — a city known for its rich textile heritage — our studio brings together traditional craftsmanship with cutting-edge global design. Here, creativity is grounded in cultural depth and enhanced by close integration with our London team.
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
                               '-Agile Design, Global Standards',
                               '-Scalable Solutions with Local Expertise',
                               '-Authentic Collections, Worldwide Impact',
                               '-From Concept to Collection',
                               '-Rooted in Culture, Built for Scale',
                               '-Designing with Purpose for a Global Stage'
                           ].map((item, i) => (
                               <li key={i} className="font-bold text-gray-800">{item}</li>
                           ))}
                       </ul>
                   </FadeInSection>
               </div>
               
               <div className="grid lg:grid-cols-3 gap-8">
                   <FadeInSection className="bg-gray-50 p-6 rounded-sm">
                       <h4 className="font-bold text-black mb-4 text-lg">Studio Highlights:</h4>
                       <ul className="space-y-2 text-gray-700 font-light">
                           <li>Globally Tuned Artistry</li>
                           <li>Trend Driven – Product Development</li>
                           <li>Sustainable innovation</li>
                           <li>Globally Connected</li>
                           <li>Concept to Collection</li>
                       </ul>
                   </FadeInSection>
                   <FadeInSection>
                        <div className="h-[300px] rounded-sm overflow-hidden shadow-md">
                            <img src="https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=2070&auto=format&fit=crop" alt="Easel" className="w-full h-full object-cover" />
                        </div>
                   </FadeInSection>
                   <FadeInSection>
                        <div className="h-[300px] rounded-sm overflow-hidden shadow-md">
                            <img src="https://images.unsplash.com/photo-1537832816519-689ad163238b?q=80&w=2059&auto=format&fit=crop" alt="Sewing Kit" className="w-full h-full object-cover" />
                        </div>
                   </FadeInSection>
               </div>
            </div>

            {/* From Dhaka */}
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
                <FadeInSection>
                    <div className="h-[400px] rounded-sm overflow-hidden shadow-xl">
                        <img src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2127&auto=format&fit=crop" alt="Working Fabric" className="w-full h-full object-cover" />
                    </div>
                </FadeInSection>
                <FadeInSection>
                    <h3 className="text-3xl font-bold text-black mb-4">From Dhaka,</h3>
                    <p className="text-gray-700 leading-relaxed text-lg md:text-xl text-justify font-light mb-6">
                        Cultural heritage meets modern fashion Crafted with precision, delivered with purpose.
                    </p>
                    <p className="text-gray-700 leading-relaxed text-lg md:text-xl text-justify font-light">
                        “The soul of heritage, Fashion redefined with care.
                    </p>
                </FadeInSection>
            </div>
            
            {/* Approaches */}
            <div className="mb-24">
                <FadeInSection>
                    <h2 className="text-3xl font-bold text-black mb-8">APPARELBD Approaches-</h2>
                </FadeInSection>
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <FadeInSection>
                        <div className="h-[400px] rounded-sm overflow-hidden shadow-xl border-4 border-white">
                            <img src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=2274&auto=format&fit=crop" alt="Approaches" className="w-full h-full object-cover" />
                        </div>
                    </FadeInSection>
                    <FadeInSection className="space-y-6">
                        {[
                            { title: '-Innovation and creativity', desc: 'Driving every step of our design process.' },
                            { title: '-Market Insight & Cultural Awareness', desc: 'Grounded in global trends and consumer behavior' },
                            { title: '-Sustainable Materials & Responsible Production', desc: 'Thoughtful choices from fabric to finish' },
                            { title: '-Advanced Design Technologies', desc: 'From digital tools to textile innovation' },
                            { title: '-Timeless Aesthetics', desc: 'Beauty that works in everyday life' }
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
                    <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a8a] mb-12">Our Process:</h2>
                </FadeInSection>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                     {[
                        { icon: <PenTool size={48} className="text-[#1e3a8a]" />, title: 'Concept to Collection', desc: '– Mood boards, storytelling and brand themes.' },
                        { icon: <Leaf size={48} className="text-[#22c55e]" />, title: 'Sustainable Detailing', desc: '– Every component chosen with care.' },
                        { icon: <Scissors size={48} className="text-[#eab308]" />, title: 'Silhouette & Fit', desc: '– Innovative shapes across diverse categories.' },
                        { icon: <Users size={48} className="text-[#ef4444]" />, title: 'Collaborative Craftsmanship', desc: 'CADs, spec packs, co-creation for precision.' }
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
                         APPARELBD — driven by purpose, defined by collaboration, designed to resonate
                     </h3>
                </FadeInSection>
            </div>

            {/* Design Support & Co-Creation */}
            <div className="mb-24">
                <FadeInSection className="mb-8">
                    <h2 className="text-3xl font-bold text-black mb-2">Design Support and Co-Creation:</h2>
                    <p className="text-gray-600 italic font-bold mb-6">End-to-End Creative Partnership</p>
                    <p className="text-gray-700 leading-relaxed text-lg md:text-xl text-justify font-light">
                        At APPARELBD, co-creation is a shared journey of innovation. We partner with brands to merge their identity with our design expertise, crafting authentic, market-ready collections. By uniting diverse perspectives and strategic insight, we help clients lead fashion with purpose and originality.
                    </p>
                </FadeInSection>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                     <FadeInSection>
                         <div className="h-[300px] rounded-sm overflow-hidden shadow-lg">
                             <img src="https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=2000&auto=format&fit=crop" alt="Rack" className="w-full h-full object-cover" />
                         </div>
                         <p className="mt-4 font-bold text-gray-800">• Rapid sampling keeps your collection on schedule.</p>
                     </FadeInSection>
                     <FadeInSection>
                         <ul className="space-y-3 text-lg font-light text-gray-700">
                             <li>• Fit and design consults ensure quality and performance.</li>
                             <li>• Trend insights align your designs with the market.</li>
                             <li>• Sustainable guidance supports purpose-driven creation.</li>
                             <li>• Support both new and existing line development.</li>
                             <li>• Ensure each design reflects the brand’s vision</li>
                         </ul>
                     </FadeInSection>
                </div>
                
                <FadeInSection className="mt-12">
                     <h3 className="text-2xl md:text-3xl font-bold text-[#1e3a8a] text-center">
                         “Crafted Together: Partnered in Creativity, Designed to Lead!!
                     </h3>
                </FadeInSection>
            </div>

            {/* Philosophy & Approach */}
            <div className="mb-24">
                <div className="grid lg:grid-cols-2 gap-16">
                    <FadeInSection>
                        <h2 className="text-2xl font-bold text-black mb-4">Our Design Philosophy</h2>
                        <p className="text-gray-600 italic font-bold mb-4">Creative Intelligence with Purpose</p>
                        <p className="text-gray-700 leading-relaxed text-lg font-light text-justify mb-10">
                            At APPARELBD, design is a fusion of imagination, strategy, and responsibility. We believe every collection should be visually striking, ethically sound, and commercially smart — built not just for now, but for the future.
                        </p>

                        <h2 className="text-2xl font-bold text-black mb-6">Our Approach Is Built On-</h2>
                        <ul className="space-y-4 text-gray-700 font-light">
                            <li><span className="font-bold text-black">Creative Fusion</span><br/>Where culture, tech, and story meet.</li>
                            <li><span className="font-bold text-black">Trend-Led Thinking</span><br/>Designs shaped by global insight and data.</li>
                            <li><span className="font-bold text-black">Collaborative Creation</span><br/>Co-creating with clients for on-brand results.</li>
                            <li><span className="font-bold text-black">Sustainable Innovation</span><br/>Eco methods and materials built to last.</li>
                        </ul>
                    </FadeInSection>

                    <FadeInSection>
                        <div className="h-[500px] bg-gray-100 rounded-sm overflow-hidden shadow-xl flex items-center justify-center p-8">
                            <img src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2070&auto=format&fit=crop" alt="Photo Studio" className="w-full h-full object-cover" />
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
          backgroundImage: "url('https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=2070&auto=format&fit=crop')",
          backgroundAttachment: 'fixed'
        }}
      >
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-6 text-center">
              <FadeInSection>
                  <h2 className="text-white text-2xl md:text-4xl font-serif font-bold italic leading-relaxed max-w-5xl">
                      Timeless Design, Future-Ready Fashion — Crafted by APPARELBD, Partnered in Creativity. Let’s build the future of fashion together!
                  </h2>
                  <div className="mt-8">
                       <a href="mailto:info@apparelbd.com" className="inline-block border-2 border-[#88c057] text-[#88c057] px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-[#88c057] hover:text-white transition-all duration-300">
                           Start to Collaborate
                       </a>
                  </div>
              </FadeInSection>
          </div>
      </section>
    </div>
  );
};

export default MarketIntel;