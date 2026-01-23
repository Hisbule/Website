import React from 'react';
import HeroVideo from '../components/HeroVideo';
import { Leaf, Recycle, Heart } from 'lucide-react';
import { ASSETS } from '../config/assets';

const Sustainability = () => {
  return (
    <div className="bg-[#f4fff4]">
      {/* 1. Hero Video Section */}
      <HeroVideo 
        title="Sustainability" 
        subtitle="Revive the Earth, Renew Our Future"
        videoUrl={ASSETS.videos.sustainability}
      />
      
      {/* 2. Main Content Section - Matching the reference image exactly */}
      <section className="py-24 px-4 lg:px-12 max-w-[1400px] mx-auto overflow-hidden">
        <div className="relative">
          
          {/* Top Row: Title/Text and Image 1 */}
          <div className="grid lg:grid-cols-2 gap-8 items-start mb-20">
            <div className="pt-10">
              <h2 className="text-5xl md:text-6xl font-bold text-[#88c057] mb-8">Sustainability</h2>
              <div className="space-y-6 max-w-xl">
                <p className="text-sm md:text-base text-gray-700 leading-relaxed font-medium">
                  Our operations are guided by a vision of achieving social and ecological equilibrium, where the well-being of both humanity and the environment are prioritized and sustained.
                </p>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed font-medium">
                  Ethically sourcing products and nurturing sustainability are fundamental to our mission, ensuring equitable treatment for workers and actively reducing our environmental impact.
                </p>
              </div>
            </div>
            
            <div className="flex justify-end">
              <div className="w-full max-w-[500px] aspect-square rounded-sm overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2071&auto=format&fit=crop" 
                  alt="Forest Canopy" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Middle Banner: Overlapping Quote Banner */}
          <div className="relative z-10 -mt-32 md:-mt-48 mb-20 flex justify-center lg:justify-start lg:ml-[20%]">
            <div className="relative w-full max-w-2xl aspect-[21/9] rounded-sm overflow-hidden shadow-2xl border-4 border-white">
              <img 
                src="https://images.unsplash.com/photo-1505118380757-91f5f45d8de4?q=80&w=2000&auto=format&fit=crop" 
                alt="Beach Stones" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-6 text-center">
                <p className="text-white font-bold text-lg md:text-2xl leading-tight">
                  Sustainability is not only a Tagline, it's a life style<br/>and at the core of our business operation.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Row: Image 3 and Bottom Text */}
          <div className="grid lg:grid-cols-2 gap-8 items-end">
            <div className="lg:pl-10">
              <div className="w-full max-w-[500px] aspect-[4/3] rounded-sm overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=1976&auto=format&fit=crop" 
                  alt="Lone Tree" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="pb-10 lg:pl-10">
              <div className="space-y-6 max-w-xl">
                <p className="text-sm md:text-base text-gray-700 leading-relaxed font-medium">
                  Our growth focuses on environmental responsibility, with an emphasis on circular thinking, emission reduction, water conservation, and responsible consumption. We collaborate with partners committed to ethical sourcing and environmental compliance.
                </p>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed font-medium">
                  Sustainability is at the core of our growth plan, influencing every decision and action we take, as we collaborate with the likeminded dedicated partners!!
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Icons Section */}
      <section className="py-20 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-12">
               <div className="text-center group p-8 hover:bg-[#f4fff4] transition-colors rounded-2xl">
                   <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-green group-hover:bg-brand-green group-hover:text-white transition-all">
                       <Leaf className="w-8 h-8" />
                   </div>
                   <h4 className="font-bold text-brand-navy text-xl mb-3">Eco-friendly</h4>
                   <p className="text-sm text-gray-500 uppercase tracking-widest font-bold">Conscious Fashion</p>
               </div>
               <div className="text-center group p-8 hover:bg-[#f4fff4] transition-colors rounded-2xl">
                   <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-all">
                       <Recycle className="w-8 h-8" />
                   </div>
                   <h4 className="font-bold text-brand-navy text-xl mb-3">Recyclable</h4>
                   <p className="text-sm text-gray-500 uppercase tracking-widest font-bold">Circular Fashion</p>
               </div>
               <div className="text-center group p-8 hover:bg-[#f4fff4] transition-colors rounded-2xl">
                   <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6 text-pink-500 group-hover:bg-pink-500 group-hover:text-white transition-all">
                       <Heart className="w-8 h-8" />
                   </div>
                   <h4 className="font-bold text-brand-navy text-xl mb-3">Sustainable</h4>
                   <p className="text-sm text-gray-500 uppercase tracking-widest font-bold">Vegan & Ethical</p>
               </div>
          </div>
      </section>

      {/* 4. Footer Banner - Font Reduced and ensured single line */}
      <div className="bg-brand-green py-12 text-center text-white px-4">
          <div className="max-w-7xl mx-auto">
             <p className="text-xl md:text-2xl lg:text-3xl font-serif italic font-bold tracking-tight leading-none drop-shadow-lg whitespace-nowrap overflow-hidden text-ellipsis">
                "The Earth does not belong to us, We belong to the Earth!"
             </p>
          </div>
      </div>
    </div>
  );
};

export default Sustainability;