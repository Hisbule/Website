import React from 'react';
import HeroVideo from '../components/HeroVideo';
import { ShieldCheck, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ASSETS } from '../config/assets';

const EthicalSourcing = () => {
  const logos = [
    { name: 'RSC', url: 'https://seeklogo.com/images/R/rsc-logo-7B8B1A2A6C-seeklogo.com.png' },
    { name: 'BetterWork', url: 'https://betterwork.org/wp-content/uploads/2016/04/BW-Logo-300x100.png' },
    { name: 'SMETA', url: 'https://www.sedex.com/wp-content/uploads/2021/03/SMETA-Logo-1.png' },
    { name: 'amfori', url: 'https://www.amfori.org/sites/default/files/amfori_logo_blue_rgb.png' },
    { name: 'GOTS', url: 'https://global-standard.org/images/GOTS_Logo_Global_Organic_Textile_Standard.png' },
    { name: 'BCI', url: 'https://bettercotton.org/wp-content/themes/bettercotton/assets/img/bci-logo.png' },
    { name: 'CTPAT', url: 'https://www.cbp.gov/sites/default/files/ctpat-logo.png' },
    { name: 'NIRAPON', url: 'https://nirapon.org/wp-content/uploads/2019/04/Nirapon-Logo-Final-01-300x127.png' }
  ];

  return (
    <div className="bg-white">
      {/* Hero Video - First thing is video as requested */}
      <HeroVideo 
        title="Ethical and Responsive Sourcing" 
        subtitle="Where Fashion Meets Integrity"
        videoUrl={ASSETS.videos.ethical}
      />
       
      <section className="min-h-screen py-20 bg-[#f4fff4]">
        <div className="max-w-[95%] mx-auto px-4 lg:px-8">
           <div className="grid lg:grid-cols-2 gap-12 items-start">
               
               {/* Left Side Content */}
               <div className="pt-10">
                  <h2 className="text-4xl md:text-6xl font-bold text-[#88c057] mb-8 font-sans">
                    Ethical & Responsive Sourcing
                  </h2>
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed text-justify mb-10 font-medium">
                    Though out the Supply Chain, we are dedicated to ensure Ethical and Responsive Sourcing practices to protect the Individual and Environment. We prioritize transparency, fair labor practices, environmental sustainability, and corporate social responsibility, demonstrating our commitment to ethical business practices and the welfare of all stakeholders. We actively collaborate with our manufacturing partners to incorporate green initiatives and sustainability practices, different CSR programs, promoting for the use of organic, eco-friendly, and recycled materials while leveraging our extensive networks across diverse product categories to promote responsible sourcing and production.
                  </p>
                  <Link 
                    to="/about" 
                    className="inline-block border border-gray-400 px-6 py-2 text-[10px] font-bold text-black uppercase tracking-widest hover:bg-brand-green hover:text-white hover:border-brand-green transition-all"
                  >
                    EXPLORE MORE
                  </Link>
               </div>

               {/* Right Side Image & Logos Grid */}
               <div className="relative pt-6">
                  {/* Background Sunset Image */}
                  <div className="relative w-full aspect-[16/9] md:aspect-[21/9] lg:aspect-[16/9] overflow-hidden rounded-sm border-4 border-white shadow-sm">
                      <img 
                        src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=2070&auto=format&fit=crop" 
                        alt="Sunset Nature Background" 
                        className="w-full h-full object-cover opacity-80" 
                      />
                      
                      {/* Logo Overlays - Simulating the provided image style */}
                      <div className="absolute inset-0 grid grid-cols-4 grid-rows-2 gap-2 p-6 md:p-10">
                          {logos.map((logo, i) => (
                              <div key={i} className="bg-white p-2 flex items-center justify-center shadow-sm h-full max-h-[80px]">
                                  <img 
                                    src={logo.url} 
                                    alt={logo.name} 
                                    className="max-w-full max-h-full object-contain mix-blend-multiply" 
                                    onError={(e) => {
                                        // Fallback if logo fails to load
                                        const target = e.target as HTMLImageElement;
                                        target.style.display = 'none';
                                        target.parentElement!.innerHTML = `<span class="text-[10px] font-bold text-gray-400">${logo.name}</span>`;
                                    }}
                                  />
                              </div>
                          ))}
                      </div>
                  </div>

                  {/* Green Compliance Banner below image */}
                  <div className="mt-6 bg-[#88c057] py-4 px-6 text-center shadow-sm">
                      <p className="text-white font-serif italic text-lg md:text-2xl font-bold tracking-tight">
                        Our partners are compliant with international social and environmental standards to protect both People and the Planet.
                      </p>
                  </div>
               </div>
           </div>

           {/* Additional Detail Section */}
           <div className="mt-32 grid md:grid-cols-3 gap-12">
               <div className="bg-white p-10 shadow-sm border border-gray-100 rounded-sm">
                   <ShieldCheck className="w-12 h-12 text-[#88c057] mb-6" />
                   <h3 className="text-xl font-bold text-brand-navy mb-4 uppercase">Supplier Audits</h3>
                   <p className="text-gray-600 text-sm leading-relaxed text-justify">
                       We conduct rigorous third-party and internal audits across our entire manufacturing network to ensure 100% compliance with labor and environmental laws.
                   </p>
               </div>
               <div className="bg-white p-10 shadow-sm border border-gray-100 rounded-sm">
                   <CheckCircle className="w-12 h-12 text-[#88c057] mb-6" />
                   <h3 className="text-xl font-bold text-brand-navy mb-4 uppercase">Fair Wages</h3>
                   <p className="text-gray-600 text-sm leading-relaxed text-justify">
                       Our commitment extends to ensuring all workers within our supply chain receive fair living wages and benefit from empowering socio-economic programs.
                   </p>
               </div>
               <div className="bg-white p-10 shadow-sm border border-gray-100 rounded-sm">
                   <ShieldCheck className="w-12 h-12 text-[#88c057] mb-6" />
                   <h3 className="text-xl font-bold text-brand-navy mb-4 uppercase">Traceability</h3>
                   <p className="text-gray-600 text-sm leading-relaxed text-justify">
                       We provide end-to-end traceability for raw materials, ensuring that fibers used in production are sustainably sourced and ethically processed.
                   </p>
               </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default EthicalSourcing;