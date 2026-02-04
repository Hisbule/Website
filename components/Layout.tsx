import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, Facebook, Linkedin } from 'lucide-react';
import { NavItem } from '../types';
import { ASSETS } from '../config/assets';

// ... (Existing Imports)

// ==========================================
// Floating WhatsApp Component
// ==========================================
const FloatingWhatsApp = () => {
  const phoneNumber = "8801713046455"; 
  const message = "Hello! I would like to know more about ApparelBD.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-2 group">
      {/* Tooltip Label */}
      <div className="bg-white text-brand-navy px-4 py-2 rounded-lg shadow-xl mb-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 text-sm font-bold pointer-events-none">
        Chat with us on WhatsApp!
      </div>

      {/* Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-16 h-16 bg-[#25D366] rounded-full shadow-2xl hover:bg-[#20b858] transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="Chat on WhatsApp"
      >
        {/* Pulse Animation Ring */}
        <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-20 animate-ping"></span>
        
        {/* WhatsApp Icon (SVG) */}
        <svg 
            viewBox="0 0 24 24" 
            className="w-8 h-8 text-white fill-current relative z-10"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  );
};

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
      { label: 'Uniform', path: '/products#uniform' },
      { label: 'Disney', path: '/products#disney' },
      { label: 'Jersey', path: '/products#jersey' },
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
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      window.location.href = `mailto:ceo@apparelbd.com?subject=Newsletter Subscription&body=I would like to subscribe to the newsletter. My email is: ${email}`;
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#eaf2ff] text-brand-navy pt-16 pb-8 border-t border-white">
      <div className="max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* 1. Brand Section */}
          <div className="flex flex-col space-y-6">
             <Link to="/" className="block w-fit">
                <img 
                    src={ASSETS.logo} 
                    alt="ApparelBD Logo" 
                    className="h-16 w-auto object-contain" 
                />
             </Link>
             <p className="text-gray-600 text-sm leading-relaxed text-justify font-light">
               We believe that fashion is not just about clothing, it's an ever evolving statement, an expression of Identity. Culture context of time and place, perception, aspiration, creativity and innovation.
             </p>
             <div className="flex gap-4 pt-2">
                <a href="https://www.facebook.com/profile.php?id=61587356734292" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-brand-navy hover:bg-[#1877F2] hover:text-white transition-all shadow-sm border border-gray-100 group">
                  <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
                <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-brand-navy hover:bg-[#0A66C2] hover:text-white transition-all shadow-sm border border-gray-100 group">
                  <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
             </div>
          </div>

          {/* 2. Quick Links */}
          <div className="lg:pl-8">
            <h3 className="font-bold text-lg mb-6 text-brand-navy uppercase tracking-wide relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-green rounded-full"></span>
            </h3>
            <ul className="space-y-3 text-sm text-gray-600 font-medium">
               {[
                 { label: 'Home', path: '/' },
                 { label: 'About Us', path: '/about' },
                 { label: 'Services', path: '/about#services' },
                 { label: 'Ethical Sourcing', path: '/ethical-sourcing' },
                 { label: 'Manufacturing', path: '/manufacturing' },
                 { label: 'Products', path: '/products' },
                 { label: 'Sustainability', path: '/sustainability' }
               ].map((link) => (
                 <li key={link.label}>
                   <Link to={link.path} className="hover:text-brand-green hover:pl-2 transition-all duration-300 block">
                     {link.label}
                   </Link>
                 </li>
               ))}
            </ul>
          </div>

          {/* 3. Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-brand-navy uppercase tracking-wide relative inline-block">
              Contact Us
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-green rounded-full"></span>
            </h3>
            <div className="space-y-6 text-sm text-gray-600">
               <div>
                 <p className="font-bold text-brand-navy mb-2 text-base">Head Quarter</p>
                 <a 
                   href="https://maps.app.goo.gl/cpazdQ4ryKrFuKks8" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="font-light leading-relaxed hover:text-brand-green transition-colors block mb-4"
                 >
                   <p>36, Gareeb-E-Newaz Avenue,</p>
                   <p>Level-3 (C2), Sector-13,</p>
                   <p>Uttara, Dhaka-1230, Bangladesh.</p>
                 </a>

                 {/* Map Iframe */}
                 <a 
                   href="https://maps.app.goo.gl/cpazdQ4ryKrFuKks8" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="block w-full h-40 rounded-lg overflow-hidden shadow-md border border-gray-200 mt-2 hover:shadow-xl transition-shadow duration-300 relative group"
                 >
                    <iframe 
                        width="100%" 
                        height="100%" 
                        frameBorder="0" 
                        scrolling="no" 
                        marginHeight={0} 
                        marginWidth={0} 
                        src="https://maps.google.com/maps?q=36%20Gareeb-E-Newaz%20Avenue%2C%20Sector-13%2C%20Uttara%2C%20Dhaka-1230&t=&z=15&ie=UTF8&iwloc=&output=embed"
                        title="ApparelBD Location"
                        className="filter grayscale group-hover:grayscale-0 transition-all duration-500 pointer-events-none"
                    ></iframe>
                    <div className="absolute inset-0 bg-transparent group-hover:bg-black/5 transition-colors pointer-events-none"></div>
                 </a>
               </div>
               <div>
                 <p className="font-bold text-brand-navy mb-2 text-base">Get in Touch</p>
                 <a href="mailto:ceo@apparelbd.com" className="text-brand-blue hover:text-brand-green transition-colors font-medium">ceo@apparelbd.com</a>
               </div>
            </div>
          </div>

          {/* 4. Newsletter */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-brand-navy uppercase tracking-wide relative inline-block">
              Newsletter
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-green rounded-full"></span>
            </h3>
            <p className="text-sm text-gray-600 mb-6 font-light leading-relaxed">
              Subscribe to our newsletter for the latest updates and sourcing trends.
            </p>
            <form className="space-y-3" onSubmit={handleSubscribe}>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address" 
                required
                className="w-full px-4 py-3 text-sm bg-white border border-gray-200 rounded-sm focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-all"
              />
              <button className="w-full px-4 py-3 text-sm font-bold text-white bg-brand-navy hover:bg-brand-green rounded-sm transition-colors uppercase tracking-wider shadow-md">
                Subscribe Now
              </button>
            </form>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-gray-300/50 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 font-medium">
           <p className="mb-2 md:mb-0">Copyright © {new Date().getFullYear()} ApparelBD | All Rights Reserved.</p>
           <p className="opacity-75">Designed & Developed by Arts of Tech</p>
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
      <FloatingWhatsApp />
      <Footer />
    </div>
  );
};

export default Layout;