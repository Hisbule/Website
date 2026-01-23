import React from 'react';
import HeroVideo from '../components/HeroVideo';
import { Settings, CheckCircle, Shield, Truck, Zap, PenTool, Users } from 'lucide-react';
import { ASSETS } from '../config/assets';

const Manufacturing = () => {
  return (
    <div>
      <HeroVideo 
        title="Manufacturing Excellence" 
        subtitle="Where Excellence is Crafted into Every Stitch"
        videoUrl={ASSETS.videos.manufacturing}
      />
      
      <section className="min-h-screen flex flex-col justify-center py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Mission Section */}
            <div className="grid md:grid-cols-2 gap-16 mb-24 items-center">
                <div>
                    <span className="text-brand-green font-bold tracking-widest uppercase text-sm mb-4 block">Our Standard</span>
                    <h2 className="text-4xl font-serif font-bold text-brand-navy mb-8">Defining Manufacturing Excellence</h2>
                    
                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="w-12 h-12 bg-brand-light rounded-full flex items-center justify-center flex-shrink-0">
                                <Shield className="w-6 h-6 text-brand-navy" />
                            </div>
                            <div>
                                <h4 className="font-bold text-brand-navy text-xl">Precision & Safety</h4>
                                <p className="text-gray-600 text-sm mt-1">Quality is a core value, backed by advanced testing and skilled QC teams. Safety is non-negotiable.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-12 h-12 bg-brand-light rounded-full flex items-center justify-center flex-shrink-0">
                                <Zap className="w-6 h-6 text-brand-navy" />
                            </div>
                            <div>
                                <h4 className="font-bold text-brand-navy text-xl">Efficient Processes</h4>
                                <p className="text-gray-600 text-sm mt-1">Innovation in Motion. We prioritize efficiency through LEAN manufacturing and streamlined workflows.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-12 h-12 bg-brand-light rounded-full flex items-center justify-center flex-shrink-0">
                                <Users className="w-6 h-6 text-brand-navy" />
                            </div>
                            <div>
                                <h4 className="font-bold text-brand-navy text-xl">Empowered Teams</h4>
                                <p className="text-gray-600 text-sm mt-1">The Heartbeat of Excellence. Skilled, happy teams drive continuous improvement and quality.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 h-[500px]">
                    <img src="https://images.unsplash.com/photo-1565532525700-111162657e28?q=80&w=1974&auto=format&fit=crop" className="rounded-2xl shadow-lg w-full h-full object-cover transform translate-y-8" alt="Factory Floor" />
                    <img src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2070&auto=format&fit=crop" className="rounded-2xl shadow-lg w-full h-full object-cover transform -translate-y-8" alt="Quality Control" />
                </div>
            </div>

            {/* Services Title */}
            <div className="text-center mb-16">
                 <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-navy mb-4">Manufacturing Services</h2>
                 <div className="w-24 h-1 bg-brand-green mx-auto"></div>
            </div>
            
            {/* Service Cards */}
            <div className="space-y-20 mb-24">
                {[
                    { 
                        title: 'Fabric R&D and Innovation', 
                        subtitle: '"Ahead of the Curve"', 
                        desc: 'We source and develop cutting-edge fabrics that meet global standards for sustainability and performance.',
                        img: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=2274&auto=format&fit=crop',
                        align: 'right'
                    },
                    { 
                        title: 'Fitting & Technical Support', 
                        subtitle: 'Redefining Comfort, Style and Functionality', 
                        desc: 'Our technical teams ensure perfect fit and construction, bridging the gap between design and production.',
                        img: 'https://images.unsplash.com/photo-1550614000-4b9519e00315?q=80&w=2340&auto=format&fit=crop',
                        align: 'left'
                    },
                    { 
                        title: 'Production Control', 
                        subtitle: 'Streamlining Operations, Ensuring Quality', 
                        desc: 'Rigorous oversight from cutting to finishing ensures on-time delivery and zero defects.',
                        img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop',
                        align: 'right'
                    }
                ].map((srv, i) => (
                    <div key={i} className={`flex flex-col md:flex-row items-center gap-12 ${srv.align === 'left' ? 'md:flex-row-reverse' : ''}`}>
                        <div className="flex-1">
                            <h3 className="text-3xl font-bold text-brand-navy mb-2">{srv.title}</h3>
                            <p className="text-brand-blue font-serif italic text-xl mb-4">{srv.subtitle}</p>
                            <p className="text-gray-600 text-lg leading-relaxed">{srv.desc}</p>
                            <button className="mt-6 px-6 py-2 border border-brand-navy text-brand-navy font-bold uppercase text-sm hover:bg-brand-navy hover:text-white transition-colors">
                                Learn More
                            </button>
                        </div>
                        <div className="flex-1 h-[400px] w-full">
                            <img src={srv.img} alt={srv.title} className="w-full h-full object-cover rounded-xl shadow-xl hover:shadow-2xl transition-shadow" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Quality Philosophy */}
            <div className="bg-brand-navy text-white rounded-3xl p-10 md:p-20 relative overflow-hidden mb-20">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                <div className="relative z-10">
                    <h3 className="text-3xl md:text-4xl font-serif font-bold mb-12 text-center">Our Quality Philosophy</h3>
                    <div className="grid md:grid-cols-3 gap-8">
                        {['Dependable Products', 'More Than a Garment', 'Precision at Every Stage', 'Integrated Quality Systems', 'Proactive Prevention', 'Rigorous Inspections'].map((q, i) => (
                            <div key={i} className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:bg-brand-green/20 transition-colors">
                                <CheckCircle className="w-8 h-8 text-brand-green mb-4" />
                                <h4 className="font-bold text-xl mb-2">{q}</h4>
                                <p className="text-sm text-gray-300">Ensuring excellence in every aspect of production.</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Fair Traceability */}
            <div className="text-center max-w-4xl mx-auto">
                 <div className="w-20 h-20 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-6">
                    <Truck className="w-10 h-10 text-brand-navy" />
                 </div>
                 <h2 className="text-3xl font-bold text-brand-navy mb-4">Fair Traceability</h2>
                 <p className="text-brand-green font-bold text-2xl italic mb-6">"Trace The Journey, Trust the Process"</p>
                 <p className="text-gray-600 text-lg leading-relaxed">
                     Fair traceability is prioritized through transparent, real-time updates shared with customers at every stage of the product's journey—from the sourcing of raw materials to the final moments of manufacturing.
                 </p>
            </div>

        </div>
      </section>
    </div>
  );
};

export default Manufacturing;