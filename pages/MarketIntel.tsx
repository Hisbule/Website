import React from 'react';
import HeroVideo from '../components/HeroVideo';
import { Lightbulb, TrendingUp, Users, Eye } from 'lucide-react';
import { ASSETS } from '../config/assets';

const MarketIntel = () => {
  return (
    <div>
      {/* Unique Video: Designer checking designs */}
      <HeroVideo 
        title="Market Intel Design" 
        subtitle="Fashion Evolution - Redefining Style in Motion"
        videoUrl={ASSETS.videos.marketIntel}
      />
      
      <section className="min-h-screen flex flex-col justify-center py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-fade-in-up">
                <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-navy mb-6">Fashion is no longer just fabric — it's a Language!</h2>
                <div className="w-24 h-1 bg-brand-green mx-auto mb-8"></div>
                <p className="text-xl text-gray-500 font-light max-w-4xl mx-auto">
                    A living reflection of shifting identities, a tapestry woven with values, and where ancient threads intertwine with future forms. At COUTURETEX, evolution is in our DNA.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
                <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl group">
                    <img 
                        src="https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=2070&auto=format&fit=crop" 
                        alt="Fashion Design Board" 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                    <div className="absolute bottom-0 left-0 bg-brand-navy/80 text-white p-6 w-full">
                        <p className="font-serif italic text-lg">"Meaningful, Mesmerizing, Mindfully Made!!"</p>
                    </div>
                </div>
                <div className="space-y-8">
                    <div className="border-l-4 border-brand-green pl-6">
                        <h3 className="text-2xl font-bold text-brand-navy mb-2">Research & Development and Innovation</h3>
                        <p className="text-brand-blue font-bold italic text-lg">"Innovating Style. Inspiring Change."</p>
                    </div>
                    <p className="text-gray-600 leading-relaxed text-lg text-justify">
                        At Fashion Evolution, we fuse cutting-edge R&D with creative innovation to redefine fashion—crafting durable, artistic pieces through advanced fabrics, embellishments, and wash techniques. Our dedicated teams explore new frontiers in sustainable materials and functional aesthetics.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className="bg-brand-light p-4 rounded-lg flex items-center gap-3">
                            <Lightbulb className="text-brand-green w-8 h-8" />
                            <span className="font-bold text-brand-navy">Material Innovation</span>
                        </div>
                        <div className="bg-brand-light p-4 rounded-lg flex items-center gap-3">
                            <TrendingUp className="text-brand-blue w-8 h-8" />
                            <span className="font-bold text-brand-navy">Trend Forecasting</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-20">
                <div className="bg-brand-navy rounded-3xl p-10 md:p-16 text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    
                    <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
                        <div>
                            <h3 className="text-3xl font-serif font-bold mb-6">Market Intel Design</h3>
                            <p className="text-gray-300 mb-6 text-lg">Fashion evolves quickly, and staying ahead requires strategic insight.</p>
                            <ul className="space-y-4">
                                {[
                                    'Global Trend Forecasting',
                                    'Seasonal Color & Silhouette Insights',
                                    'Consumer Behavior Analysis',
                                    'Competitive Benchmarking'
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-brand-green flex items-center justify-center">
                                            <Eye className="w-3 h-3 text-white" />
                                        </div>
                                        <span className="text-lg font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <img src="https://images.unsplash.com/photo-1550973886-8969dd3ed8d1?q=80&w=2235&auto=format&fit=crop" className="rounded-xl shadow-lg transform translate-y-4" alt="Trend Analysis" />
                            <img src="https://images.unsplash.com/photo-1542060748-10c287222651?q=80&w=2340&auto=format&fit=crop" className="rounded-xl shadow-lg transform -translate-y-4" alt="Color Board" />
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="mt-24 text-center">
                 <h2 className="text-3xl font-serif font-bold text-brand-navy mb-12">Innovation meets elegance at our London hub</h2>
                 <div className="grid md:grid-cols-3 gap-8">
                     <div className="group relative overflow-hidden rounded-xl shadow-lg h-64">
                        <img src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="London Studio" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-white font-bold text-xl">London Studio</span>
                        </div>
                     </div>
                     <div className="group relative overflow-hidden rounded-xl shadow-lg h-64">
                        <img src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Fabric Library" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-white font-bold text-xl">Fabric Library</span>
                        </div>
                     </div>
                     <div className="group relative overflow-hidden rounded-xl shadow-lg h-64">
                        <img src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2127&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Design Review" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-white font-bold text-xl">Design Review</span>
                        </div>
                     </div>
                 </div>
            </div>
        </div>
      </section>
    </div>
  );
};

export default MarketIntel;