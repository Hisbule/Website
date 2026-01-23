import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { NavItem } from '../types';
import { ASSETS } from '../config/assets';

const navItems: NavItem[] = [
  { label: 'Home', path: '/' },
  { 
    label: 'About', 
    path: '/about',
    dropdown: [
      { label: 'Overview', path: '/about#overview' },
      { label: 'Mission', path: '/about#mission' },
      { label: 'Services', path: '/about#services' },
      { label: 'Values & Philosophy', path: '/about#values' },
      { label: 'Global Presence', path: '/about#presence' },
    ]
  },
  { label: 'Market Intel Design', path: '/market-intel' },
  { label: 'Sustainability', path: '/sustainability' },
  { label: 'Ethical Sourcing', path: '/ethical-sourcing' },
  { label: 'Manufacturing Excellence', path: '/manufacturing' },
  { 
    label: 'Products', 
    path: '/products',
    dropdown: [
      { label: 'Knit', path: '/products#knit' },
      { label: 'Woven', path: '/products#woven' },
      { label: 'Nightwear', path: '/products#nightwear' },
      { label: 'Denim', path: '/products#denim' },
      { label: 'Outer Wear', path: '/products#outerwear' },
      { label: 'Lingerie', path: '/products#lingerie' },
      { label: 'Activewear', path: '/products#activewear' },
      { label: 'Home Textile', path: '/products#hometextile' },
      { label: 'Sweater', path: '/products#sweater' },
    ]
  },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<{[key: string]: boolean}>({});
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (path: string) => {
    setIsOpen(false);
    if (path.includes('#')) {
      const [page, hash] = path.split('#');
      if (location.pathname !== page) {
        navigate(path);
      } else {
        const element = document.getElementById(hash);
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(path);
    }
  };

  const toggleMobileDropdown = (label: string) => {
    setMobileExpanded(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  // Dynamic text color based on scroll state
  const textColorClass = scrolled ? 'text-brand-navy' : 'text-gray-100';
  const mobileMenuButtonClass = scrolled ? 'text-brand-navy' : 'text-gray-200';

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#eaf2ff] shadow-lg py-2' : 'bg-transparent py-4'}`}>
      <div className="w-full px-4 sm:px-6 lg:px-12">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => navigate('/')}>
             <img 
                src={ASSETS.logo} 
                alt="ApparelBD Logo" 
                className="h-12 md:h-16 w-auto object-contain"
             />
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <div key={item.label} className="relative group">
                <button 
                  onClick={() => handleNavClick(item.path)}
                  className={`${textColorClass} hover:text-brand-green px-2 py-2 text-sm font-medium flex items-center transition-colors`}
                >
                  {item.label}
                  {item.dropdown && <ChevronDown className="ml-1 w-4 h-4" />}
                </button>
                
                {/* Dropdown */}
                {item.dropdown && (
                  <div className="absolute left-0 mt-0 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-left bg-white shadow-xl rounded-sm border-t-4 border-brand-green">
                    <div className="py-1">
                      {item.dropdown.map((subItem) => (
                        <button
                          key={subItem.label}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNavClick(subItem.path);
                          }}
                          className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-green border-b border-gray-100 last:border-0"
                        >
                          {subItem.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`${mobileMenuButtonClass} hover:text-brand-green p-2 transition-colors`}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-[#eaf2ff] border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 h-screen overflow-y-auto pb-20">
            {navItems.map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between w-full hover:bg-white/50 rounded-md">
                    <button
                      onClick={() => handleNavClick(item.path)}
                      className="text-left px-3 py-2 text-base font-medium text-brand-navy hover:text-brand-green flex-grow"
                    >
                      {item.label}
                    </button>
                    {item.dropdown && (
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleMobileDropdown(item.label);
                            }}
                            className="p-3 text-brand-navy hover:text-brand-green"
                        >
                            <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${mobileExpanded[item.label] ? 'rotate-180' : ''}`} />
                        </button>
                    )}
                </div>
                
                {item.dropdown && (
                  <div 
                    className={`pl-4 space-y-1 bg-black/5 rounded-md overflow-hidden transition-all duration-300 ease-in-out ${
                      mobileExpanded[item.label] ? 'max-h-[500px] opacity-100 py-2' : 'max-h-0 opacity-0 py-0'
                    }`}
                  >
                    {item.dropdown.map((subItem) => (
                      <button
                        key={subItem.label}
                        onClick={() => handleNavClick(subItem.path)}
                        className="block w-full text-left px-3 py-2 text-sm font-medium text-gray-600 hover:text-brand-green hover:bg-white/50 rounded-md"
                      >
                        {subItem.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#eaf2ff] text-brand-navy pt-20 pb-10">
      <div className="w-full px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-20">
          
          {/* Column 1: Brand & About */}
          <div className="space-y-6">
             {/* Logo in Footer */}
             <div className="mb-6">
                <img 
                    src={ASSETS.logo} 
                    alt="ApparelBD Logo" 
                    className="h-16 md:h-24 w-auto object-contain" 
                />
             </div>
            <h3 className="font-bold text-xl border-b-2 border-brand-green inline-block pb-1">All About Us</h3>
            <p className="text-base text-gray-700 leading-relaxed text-justify">
              We believe that fashion is not just about clothing, it's an ever evolving statement, an expression of Identity. Culture context of time and place, perception, aspiration, creativity and innovation, value and belief of individual and community.
            </p>
            <div className="pt-4">
                <h4 className="font-bold text-lg mb-4">To Connect With Us</h4>
                <div className="flex space-x-3">
                    <a href="#" className="p-2.5 bg-brand-navy text-white rounded-md hover:bg-brand-blue hover:-translate-y-1 transition-all shadow-lg"><Facebook className="w-5 h-5" /></a>
                    <a href="#" className="p-2.5 bg-brand-navy text-white rounded-md hover:bg-brand-blue hover:-translate-y-1 transition-all shadow-lg"><Twitter className="w-5 h-5" /></a>
                    <a href="#" className="p-2.5 bg-brand-navy text-white rounded-md hover:bg-brand-blue hover:-translate-y-1 transition-all shadow-lg"><Linkedin className="w-5 h-5" /></a>
                    <a href="#" className="p-2.5 bg-brand-navy text-white rounded-md hover:bg-brand-blue hover:-translate-y-1 transition-all shadow-lg"><Instagram className="w-5 h-5" /></a>
                </div>
            </div>
          </div>

          {/* Column 2: Where We Are */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-brand-blue font-bold uppercase text-xl mb-8 border-b border-gray-300 pb-2">Where We Are</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-10 text-base text-gray-700">
               <div>
                 <p className="font-bold text-brand-navy text-lg mb-1">Head Quarter and Primary Office</p>
                 <p className="leading-snug">House-38, Level-5, Road-38, Sector-13, Uttara, Dhaka, Bangladesh.</p>
                 <p className="mt-2 text-brand-blue font-medium">Email: info@couturetex.com</p>
               </div>
               <div>
                 <p className="font-bold text-brand-navy text-lg mb-1">UK Design Studio</p>
                 <p className="leading-snug">129 Mile End Road, E1 4BG, London, UK.</p>
               </div>
               <div>
                 <p className="font-bold text-brand-navy text-lg mb-1">Canada Sourcing Office</p>
                 <p className="leading-snug">205-181 Hollywood Road North, Kelowna, BC, Canada.</p>
               </div>
               <div>
                 <p className="font-bold text-brand-navy text-lg mb-1">New Zealand Sourcing Office</p>
                 <p className="leading-snug">422 Memorial Avenue, Burnside, Christchurch, New Zealand.</p>
               </div>
               <div>
                 <p className="font-bold text-brand-navy text-lg mb-1">Sweden Sourcing Office</p>
                 <p className="leading-snug">Address: Trallingsgatan 3B lgh 2401, Boras, Sweden.</p>
               </div>
               <div>
                 <p className="font-bold text-brand-navy text-lg mb-1">China Fabric Sourcing</p>
                 <p className="leading-snug">Flat-E, 15/F, Alpha House, 27-33 Nathan Road, Kowloon, HK.</p>
               </div>
            </div>
          </div>

          {/* Column 3: Quick Links & Subscribe */}
          <div className="space-y-10">
             <div>
                 <h3 className="text-brand-navy font-bold uppercase text-xl mb-6 border-b border-gray-300 pb-2">Quick Link</h3>
                 <ul className="space-y-3 text-base text-gray-700">
                   <li><Link to="/" className="hover:text-brand-blue hover:pl-2 transition-all block">Home</Link></li>
                   <li><Link to="/about" className="hover:text-brand-blue hover:pl-2 transition-all block">About Us</Link></li>
                   <li><Link to="/about#services" className="hover:text-brand-blue hover:pl-2 transition-all block">Services</Link></li>
                   <li><Link to="/ethical-sourcing" className="hover:text-brand-blue hover:pl-2 transition-all block">Ethical Sourcing</Link></li>
                   <li><Link to="/manufacturing" className="hover:text-brand-blue hover:pl-2 transition-all block">Manufacturing Excellence</Link></li>
                   <li><Link to="/products" className="hover:text-brand-blue hover:pl-2 transition-all block">Products</Link></li>
                   <li><Link to="/sustainability" className="hover:text-brand-blue hover:pl-2 transition-all block">Sustainability</Link></li>
                 </ul>
             </div>
             
             <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                 <h3 className="text-brand-navy font-bold uppercase text-lg mb-4">Subscribe for Newsletter</h3>
                 <div className="flex flex-col gap-3">
                   <input type="email" placeholder="Your E-mail" className="w-full px-4 py-3 border border-gray-200 bg-gray-50 text-base focus:outline-none focus:border-brand-blue focus:bg-white rounded transition-colors" />
                   <button className="w-full bg-brand-green text-white text-base py-3 font-bold uppercase hover:bg-green-600 transition rounded shadow-md">Subscribe</button>
                 </div>
             </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-gray-300/50 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 font-medium">
           <p className="mb-2 md:mb-0">Copyright © 2024 COUTURETEX Sourcing Limited | Powered By COUTURETEX Sourcing Limited</p>
           <p>Concept & Content djk</p>
        </div>
      </div>
    </footer>
  )
}

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;