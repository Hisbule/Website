import React, { useState, useEffect, useRef } from 'react';
import { Target, Eye, Users, Lightbulb, ShieldCheck, Heart, Leaf, Globe, CheckCircle, TrendingUp, Handshake, DollarSign, Award, Truck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ASSETS } from '../config/assets';

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
}

const ServiceFlipCard: React.FC<ServiceFlipCardProps> = ({ title, subtitle, frontImage, backImage, heading, points, link }) => (
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
                        Explore More <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </Link>
                </div>
            </div>
        </div>
      </div>

    </div>
  </div>
);

const About = () => {
  // Service Data Definition - Using local assets from ASSETS.images.about.services
  const services: ServiceFlipCardProps[] = [
    {
      title: "Market Intel Design Support",
      frontImage: ASSETS.images.about.services.marketIntel.front,
      backImage: ASSETS.images.about.services.marketIntel.back, 
      link: "/market-intel",
      heading: "Crafting the Future of Fashion - Redefining Style in Motion",
      points: [
        "Global Trend Forecasting & Analysis.",
        "Seasonal Color & Silhouette Insights.",
        "Consumer Behavior Analysis.",
        "Competitive Benchmarking.",
        "Design Studio support in London & Dhaka.",
        "Co-creation from concept to product."
      ]
    },
    {
      title: "Research& Development (R&D)",
      subtitle: "Innovation , Product Development",
      frontImage: ASSETS.images.about.services.rd.front,
      backImage: ASSETS.images.about.services.rd.back,
      link: "/market-intel",
      heading: "To Stay Ahead in the ever evolving Fashion Industry",
      points: [
        "Empowering fashion forward thinking.",
        "Cutting Edge R&D service.",
        "Fabric Innovation and new fabric design.",
        "Product newness on both fabric and design.",
        "Embellishment new technique.",
        "Wash, Garment Dye & Laundry newness.",
        "Sample Development & Quick support.",
        "Fitting and Garment technical support."
      ]
    },
    {
      title: "Ethical Sourcing",
      subtitle: "Garment, Fabric, Yarn, Trims and Accessories",
      frontImage: ASSETS.images.about.services.ethical.front,
      backImage: ASSETS.images.about.services.ethical.back,
      link: "/ethical-sourcing",
      heading: "Ensuring Ethical and Responsive Sourcing",
      points: [
        "Prioritize Transparency, Fair & Ethical Labour Practice.",
        "Encourage for Organic, Eco-friendly & Recycled material.",
        "Collaboration with wide ranges manufacturing partners.",
        "Fostering Sustainability, CSR, Green initiatives."
      ]
    },
    {
      title: "Manufacturing Excellence",
      subtitle: "Fabric Manufacturing, Production Control, Quality Assurance",
      frontImage: ASSETS.images.about.services.manufacturing.front,
      backImage: ASSETS.images.about.services.manufacturing.back,
      link: "/manufacturing",
      heading: "Overseeing Every Stage of Manufacturing process and control.",
      points: [
        "Overseeing all Stage of Manufacturing process.",
        "Guiding in operation, Manufacturing process.",
        "Collaboration for assuring Quality Standard.",
        "Rigorous Laboratory Testing & onsite inspection.",
        "Top-Notch Quality in Manufacturing Process.",
        "Craftsmanship, Quality & aesthetic attributes.",
        "Augmented support in Streamlined supply Chain."
      ]
    },
    {
      title: "Sustainability",
      subtitle: "Corporate Social Responsibility",
      frontImage: ASSETS.images.about.services.sustainability.front,
      backImage: ASSETS.images.about.services.sustainability.back,
      link: "/sustainability",
      heading: "Sustainability is core of our growth plan",
      points: [
        "Committed to Source product ethically.",
        "Fostering Environmental Responsibility & Accountability.",
        "Prioritizing Eco-friendly, Sustainable & Recycled materials.",
        "Partnering for arranging different CSR programs.",
        "Collaboration for Compliance, Fair Labor, and Safety."
      ]
    },
    {
      title: "Disney and Popular License Character Products",
      frontImage: ASSETS.images.about.services.disney.front,
      backImage: ASSETS.images.about.services.disney.back,
      link: "/products#disney",
      heading: "Walt Disney and popular Iconic Character Products to your customer Wardrobe !",
      points: [
        "Collaboration with Disney & Character products manufacturer.",
        "Bringing the Magic of Timeless iconic Character Products."
      ]
    },
    {
      title: "Diversified Wide Ranging Product Categories",
      subtitle: "Knit, Denim, Woven, Sweater, etc.",
      frontImage: ASSETS.images.about.services.diversified.front,
      backImage: ASSETS.images.about.services.diversified.back,
      link: "/products",
      heading: "Committed for diverse and extensive latest trend and timeless classic arrays of product categories",
      points: [
        "Partnering to meet your Sourcing Requirement.",
        "Providing a wide-ranging Clothing Categories.",
        "Casual to Formal Attire, Athleisure to Accessories.",
        "Offering a wide selection to suit Every Need.",
        "Diverse assortment of Tastes and References."
      ]
    },
    {
      title: "Competitive Price",
      subtitle: "Competitive Lead time, Flexibility in Quantity",
      frontImage: ASSETS.images.about.services.competitive.front,
      backImage: ASSETS.images.about.services.competitive.back,
      link: "/manufacturing",
      heading: "Dedicate to Competitive Price offering maintaining Top Notch Quality",
      points: [
        "Committed to offering premium clothing.",
        "Affordable price keeping you ahead in the market.",
        "Competitive Lead Times and Prices with Top-Notch Quality.",
        "Partnerships & Supply Chain efficiency ensure competitive lead times.",
        "We manage flexible minimum quantities."
      ]
    },
    {
      title: "Jute Crafts",
      frontImage: ASSETS.images.about.services.jute.front,
      backImage: ASSETS.images.about.services.jute.back,
      link: "/products#jute",
      heading: "Jute Creations, Where Art Meets Sustainability Eco-Chic Craftsmanship for a Better Tomorrow",
      points: [
        "Promoting jute crafts as sustainable and biodegradable.",
        "Offering personalized customized jute items.",
        "Sustainable Style, Timeless Craft.",
        "Eco-Friendly Elegance in Every Weave.",
        "Handmade Beauty, Naturally.",
        "Crafted for the Earth, Designed for You."
      ]
    }
  ];

  return (
    <div className="bg-white overflow-x-hidden font-sans">
      <style>{flipCardStyles}</style>

      {/* 1. Hero Section */}
      <div className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden bg-brand-navy">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
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
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-2 tracking-wide uppercase">ABOUT US</h1>
            <p className="text-xl md:text-2xl text-white/90 font-medium tracking-wide font-sans">Who we are</p>
          </div>
        </div>
      </div>

      {/* 2. Intro Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="mb-12">
            <h2 className="text-2xl md:text-4xl font-serif font-bold text-brand-navy mb-4">
              Welcome to ApparelBD, Where Fashion Meets Integrity!!
            </h2>
            <h3 className="text-xl md:text-2xl font-bold text-black mb-8">
              Reliable Strategic, Sustainable and Ethical Global Sourcing Partner!!
            </h3>
            <div className="space-y-6 text-gray-700 text-lg md:text-xl leading-relaxed text-justify font-light">
              <p>
                We believe that Fashion is not just about Clothing, it's an ever evolving statement, an expression of Identity, Culture context of time and place, perception, aspiration, creativity and innovation, value and belief of individual and community. Founded in 2024, we blend creativity, sustainability, and manufacturing excellence to deliver innovative global sourcing solutions.
              </p>
              <p>
                We drive fashion evolution through market intelligence, trend analysis, innovative design, and versatile product categories. Our commitment spans ethical sourcing, sustainability, social responsibility, and international compliance. With trusted manufacturing partners, quality assurance, licensed character production, and end-to-end logistics, we deliver superior service and exceptional customer value.
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
              "Elevating Sourcing, Strengthening Partnership- Together We Achieve More!!"
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
              <h2 className="text-3xl font-serif font-bold text-brand-navy mb-8 uppercase">OUR EXPERTISE-</h2>
              <ul className="space-y-4">
                {[
                  'Market Intelligence, Design Support.',
                  'R&D & Product Innovation.',
                  'Ethical & Responsible Sourcing,',
                  'Sustainability & CSR'
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
                  'Quality Assurance & Manufacturing Excellence',
                  'Diversified Product Management',
                  'Licensed Character Product Sourcing',
                  'Leadership & Industry Expertise'
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
              <h2 className="text-3xl font-serif font-bold text-brand-navy mb-8 uppercase">DESIGN STUDIO:</h2>
              
              <div className="mb-8">
                <h3 className="text-xl font-bold text-black mb-2">Design Studio in London, UK</h3>
                <p className="text-gray-700 text-lg leading-relaxed font-light">
                  APPARELBD London Studio creates elegant, trend-driven collections guided by in-house expert British designers.
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold text-black mb-2">Design Studio in Dhaka, Bangladesh</h3>
                <p className="text-gray-700 text-lg leading-relaxed font-light">
                  Our Dhaka studio fuses local craftsmanship with global trends, delivering innovative, high-quality designs.
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold text-black mb-2">We Focus</h3>
                <p className="font-bold text-gray-800 text-base mb-1">Design & Collaboration:</p>
                <p className="text-gray-700 text-lg mb-2 font-light">Sustainable, trend-driven designs powered by expertise Designers based in London and Dhaka Studio.</p>
                <p className="font-bold text-gray-800 text-base mb-1">Shaping the Future:</p>
                <p className="text-gray-700 text-lg font-light">Pushing fashion boundaries for change and sustainability.</p>
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
            "Elevating Sourcing, Strengthening Partnership- Together We Achieve More!!"
            </p>
        </FadeInSection>
      </div>

      {/* 5. Our People Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8">
           <FadeInSection>
               <h2 className="text-4xl font-serif font-bold text-brand-navy mb-2 uppercase">OUR PEOPLE:</h2>
               <p className="text-gray-800 font-bold italic mb-6 text-lg">Our People, Our Strength: Expertise that Powers Us..!!</p>
               
               <div className="mb-12 text-justify">
                 <p className="text-gray-700 text-lg md:text-xl leading-relaxed font-light mb-4">
                    At APPARELBD, purposeful fashion is driven by passionate people. Our greatest strength is our diverse, globally connected team—innovators who power every stage of the fashion lifecycle. From trend-forward design and ethical sourcing to precision product development, rigorous quality assurance, and seamless logistics, our experts lead with creativity, integrity, and a commitment to sustainability.
                 </p>
                 <p className="text-gray-700 text-lg md:text-xl leading-relaxed font-light">
                    Collaboration is our foundation. Together, we deliver solutions that blend artistry, ethics, and excellence—ensuring every piece we create carries purpose.
                 </p>
               </div>
           </FadeInSection>

           <FadeInSection className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                 <h3 className="text-2xl font-bold text-brand-navy mb-4">Global Presence, Local Insight</h3>
                 <p className="text-gray-700 text-lg leading-relaxed mb-4 text-justify font-light">
                    Headquartered in Dhaka, with design studios in Dhaka and London, and sourcing offices in the UK, Germany, Canada, and New Zealand, we fuse global trends with regional expertise to create fashion that resonates locally and meets international standards.
                 </p>
                 <p className="text-gray-700 text-lg leading-relaxed text-justify font-light">
                    Global fashion trends are translated into innovative, high-quality products with keen attention to detail. Supported by strong manufacturing and sourcing networks, fashion essentials and tailored solutions are delivered to meet evolving consumer needs.
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
                          { title: 'Expert Designers from UK and Bangladesh Studios', desc: 'Blending global aesthetics with local creativity.' },
                          { title: 'Sourcing and Marketing Specialists', desc: 'Dedicated to ethical and sustainable procurement.' },
                          { title: 'Product Development Experts', desc: 'Technical precision, trend-led vision.' },
                          { title: 'Merchandising Professionals', desc: 'Ensure flawless production & delivery.' },
                          { title: 'Garment & Fabric Technologists', desc: 'Bringing Precision, performance & innovation.' },
                          { title: 'Quality Assurance Leaders', desc: 'Upholding the highest standards in every detail.' },
                          { title: 'Compliance & Sustainability Professionals', desc: 'Driving ethical, future-ready fashion.' },
                          { title: 'Shipping and Logistics Specialist', desc: 'Precision logistics, Flawless delivery.' }
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
            <FadeInSection className="bg-white/90 backdrop-blur-sm p-8 rounded-full shadow-xl flex items-center gap-8 max-w-4xl mx-auto transform -translate-x-4 md:-translate-x-12 border-l-8 border-[#88c057]">
                <div className="bg-[#88c057] p-4 rounded-full flex-shrink-0">
                    <TrendingUp className="text-white w-8 h-8" />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-brand-navy mb-2">Mission:</h3>
                    <p className="text-gray-700 leading-relaxed text-base md:text-lg font-light">
                        Delivering innovative, ethical fashion sourcing with exceptional design, quality, and manufacturing—prioritizing trend riven design creation, sustainability, traceability, and lasting partnerships for mutual success and positive impact.
                    </p>
                </div>
            </FadeInSection>

             {/* Vision Bubble */}
             <FadeInSection className="bg-white/90 backdrop-blur-sm p-8 rounded-full shadow-xl flex items-center gap-8 max-w-4xl mx-auto transform translate-x-4 md:translate-x-12 border-l-8 border-[#88c057] mt-8">
                <div className="bg-[#88c057] p-4 rounded-full flex-shrink-0">
                    <Eye className="text-white w-8 h-8" />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-brand-navy mb-2">Vision:</h3>
                    <p className="text-gray-700 leading-relaxed text-base md:text-lg font-light">
                        APPARELBD aims to be a global leader in apparel sourcing, setting new standards in design innovation, customer support, and ethical sourcing, while promoting creativity, sustainability, and traceability to deliver lasting value.
                    </p>
                </div>
            </FadeInSection>

        </div>
      </section>

      {/* 7. Services Grid (Updated with Flip Cards) */}
      <section className="py-20 bg-white" id="services">
        <div className="max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8">
           <FadeInSection className="text-center mb-16">
               <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-navy mb-2">Services</h2>
               <p className="text-gray-500 italic text-xl">What We do...</p>
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
      <section className="py-20 bg-brand-navy">
        <div className="max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8">
           <FadeInSection>
               <h2 className="text-4xl font-serif font-bold text-white text-center mb-16">Values and Sourcing Philosophy</h2>
           </FadeInSection>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               <FadeInSection className="h-full"><ValueCard 
                  icon={<Users className="w-12 h-12 text-blue-500" />}
                  title="Customer Centricity"
                  description="Our customers are at the heart of everything we do. We listen to their needs and aim for satisfaction through proactive engagement and superior service."
               /></FadeInSection>
               <FadeInSection className="h-full"><ValueCard 
                  icon={<ShieldCheck className="w-12 h-12 text-blue-500" />}
                  title="Integrity and Ethics"
                  description="We are committed to trust, integrity, and ethics in all interactions, maintaining high standards of honesty and promoting transparency."
               /></FadeInSection>
               <FadeInSection className="h-full"><ValueCard 
                  icon={<Handshake className="w-12 h-12 text-yellow-500" />}
                  title="Transparency, Accountability and Trust"
                  description="We prioritize transparency, accountability, and trust to foster open communication and lasting partnerships based on mutual respect."
               /></FadeInSection>
               <FadeInSection className="h-full"><ValueCard 
                  icon={<DollarSign className="w-12 h-12 text-red-500" />}
                  title="Competitive Price and Flexibility"
                  description="We deliver premium clothing at competitive prices without compromising quality, ensuring exceptional craftsmanship and durability through rigorous quality assurance."
               /></FadeInSection>
               <FadeInSection className="h-full"><ValueCard 
                  icon={<Award className="w-12 h-12 text-blue-400" />}
                  title="Quality"
                  description="We believe that people make the difference. Our team is central to our success, showcasing exceptional abilities. We respect each individual, value their contributions."
               /></FadeInSection>
               <FadeInSection className="h-full"><ValueCard 
                  icon={<ShieldCheck className="w-12 h-12 text-orange-500" />}
                  title="Safety, Security and Working Environment"
                  description="Safety and security are priorities, supported by strict protocols. We promote teamwork and prioritize ethical sourcing, worker well-being, and sustainability."
               /></FadeInSection>
               <FadeInSection className="h-full"><ValueCard 
                  icon={<TrendingUp className="w-12 h-12 text-green-600" />}
                  title="Striving for continuous improvement and excellence"
                  description="We embrace a culture of dedication to continuous excellence and improvement, committed to surpassing expectations in all operations."
               /></FadeInSection>
               <FadeInSection className="h-full"><ValueCard 
                  icon={<Lightbulb className="w-12 h-12 text-yellow-400" />}
                  title="Innovation, Creativity and Market Intelligence"
                  description="We focus on innovation in design and fabric, using market research to forecast trends and meet customer demands, setting new benchmarks in the fashion industry."
               /></FadeInSection>
               <FadeInSection className="h-full"><ValueCard 
                  icon={<Leaf className="w-12 h-12 text-green-500" />}
                  title="Social Responsibility"
                  description="We prioritize social responsibility and sustainability through ethical labor practices, fair wages, community development, and sustainable sourcing."
               /></FadeInSection>
           </div>
        </div>
      </section>

      {/* 9. Global Presence */}
      <section className="py-20 bg-white">
        <div className="max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInSection>
                <h2 className="text-4xl font-serif font-bold text-brand-navy mb-8">Where We Are</h2>
                
                {/* Map Section */}
                <div className="relative w-full h-[400px] bg-gray-100 mb-16 rounded-sm overflow-hidden border border-gray-200">
                    <img src={ASSETS.images.about.map} alt="Global Map" className="w-full h-full object-cover opacity-80" />
                    <div className="absolute top-8 left-8 bg-white/90 p-4 rounded shadow-lg max-w-xs">
                        <h3 className="text-brand-green font-bold text-lg mb-1">UK DESIGN STUDIO</h3>
                        <p className="text-xs text-gray-600">129 Mile End Road, E1 4BG, London, United Kingdom.</p>
                    </div>
                </div>

                <h3 className="text-2xl font-bold text-[#88c057] mb-8 uppercase">OUR GLOBAL PRESENCE</h3>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-brand-light p-8 rounded-sm hover:shadow-md transition-shadow">
                        <h4 className="font-bold text-brand-navy mb-2 text-lg">Head Quarter and Primary Office</h4>
                        <p className="text-base text-gray-600 mb-2 font-light">House-38, Level-5, Road-38, Block-F, Sector-13, Uttara, Dhaka, Bangladesh.</p>
                        <p className="text-base text-brand-blue">info@apparelbd.com</p>
                    </div>
                    <div className="bg-brand-light p-8 rounded-sm hover:shadow-md transition-shadow">
                        <h4 className="font-bold text-brand-navy mb-2 text-lg">UK Sourcing Office</h4>
                        <p className="text-base text-gray-600 mb-2 font-light">129 Mile End Road, E1 4BG, London, United Kingdom.</p>
                        <p className="text-base text-brand-blue">info.uk@apparelbd.com</p>
                    </div>
                    <div className="bg-brand-light p-8 rounded-sm hover:shadow-md transition-shadow">
                        <h4 className="font-bold text-brand-navy mb-2 text-lg">Sweden Sourcing Office Sourcing Office</h4>
                        <p className="text-base text-gray-600 mb-2 font-light">Nebulusgatan 8, 418 63 Gothenburg, Sweden</p>
                        <p className="text-base text-brand-blue">info@apparelbd.com</p>
                    </div>
                    <div className="bg-brand-light p-8 rounded-sm hover:shadow-md transition-shadow">
                        <h4 className="font-bold text-brand-navy mb-2 text-lg">Canada Sourcing Office</h4>
                        <p className="text-base text-gray-600 mb-2 font-light">205-181 Hollywood Road North, Kelowna, British Columbia, V1X 3R1, Canada.</p>
                        <p className="text-base text-brand-blue">info.canada@apparelbd.com</p>
                    </div>
                    <div className="bg-brand-light p-8 rounded-sm hover:shadow-md transition-shadow">
                        <h4 className="font-bold text-brand-navy mb-2 text-lg">New Zealand Sourcing Office</h4>
                        <p className="text-base text-gray-600 mb-2 font-light">422 Memorial Avenue, Burnside, Christchurch 8053, New Zealand.</p>
                        <p className="text-base text-brand-blue">info.nz@apparelbd.com</p>
                    </div>
                    <div className="bg-brand-light p-8 rounded-sm hover:shadow-md transition-shadow">
                        <h4 className="font-bold text-brand-navy mb-2 text-lg">China Fabric and Accessories Sourcing Office</h4>
                        <p className="text-base text-gray-600 mb-2 font-light">Flat-E, 15/F, Alpha House, 27-33 Nathan Road, Tsim Sha Tsui Kowloon, Hong Kong.</p>
                        <p className="text-base text-brand-blue">info@apparelbd.com</p>
                    </div>
                </div>
            </FadeInSection>
        </div>
      </section>

      {/* 10. Collaboration Banner */}
      <section 
        className="relative h-[400px] w-full bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url('${ASSETS.images.about.collaboration}')` }}
      >
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-4">
               <FadeInSection>
                   <h2 className="text-white font-bold text-xl md:text-3xl max-w-4xl leading-relaxed mb-6">
                      We are so keen and eagerly anticipating to partnering and collaborating with you to provide superior sourcing solutions and enhance our capabilities!!
                   </h2>
                   <p className="text-white font-serif font-bold italic text-xl md:text-2xl">
                      We are awaited to be partner with you, so Let's collaborate...!!!
                   </p>
               </FadeInSection>
          </div>
      </section>

    </div>
  );
};

export default About;