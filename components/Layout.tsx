import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, Facebook, Linkedin, Globe } from 'lucide-react';
import { NavItem } from '../types';
import { ASSETS } from '../config/assets';
import { useLanguage } from '../contexts/LanguageContext';
import { Language } from '../config/translations';

// ==========================================
// Floating WhatsApp Component
// ==========================================
const FloatingWhatsApp = () => {
  const { t } = useLanguage();
  const phoneNumber = "8801713046455"; 
  const message = t('whatsapp_msg');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  // Updated position: bottom-24 to move it up
  return (
    <div className="fixed bottom-24 right-8 z-[100] flex flex-col items-end gap-2 group">
      {/* Tooltip Label */}
      <div className="bg-white text-brand-navy px-4 py-2 rounded-lg shadow-xl mb-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 text-sm font-bold pointer-events-none">
        {t('whatsapp_tooltip')}
      </div>

      {/* Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-12 h-12 bg-[#25D366] rounded-full shadow-2xl hover:bg-[#20b858] transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="Chat on WhatsApp"
      >
        {/* Pulse Animation Ring */}
        <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-20 animate-ping"></span>
        
        {/* WhatsApp Icon (SVG) */}
        <svg 
            viewBox="0 0 24 24" 
            className="w-6 h-6 text-white fill-current relative z-10"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  );
};

const Navbar = () => {
  const { t, language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<{[key: string]: boolean}>({});
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Language options
  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: 'gb' },
    { code: 'ar', label: 'العربية', flag: 'sa' },
    { code: 'zh', label: '中文', flag: 'cn' },
    { code: 'nl', label: 'Nederlands', flag: 'nl' },
    { code: 'fr', label: 'Français', flag: 'fr' },
    { code: 'de', label: 'Deutsch', flag: 'de' },
    { code: 'es', label: 'Español', flag: 'es' },
    { code: 'it', label: 'Italiano', flag: 'it' },
  ];

  const currentLang = languages.find(l => l.code === language) || languages[0];

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    setLangDropdownOpen(false);
  };

  const navItems: NavItem[] = [
    { label: t('home'), path: '/' },
    { 
      label: t('about'), 
      path: '/about',
      dropdown: [
        { label: t('overview'), path: '/about#overview' },
        { label: t('mission'), path: '/about#mission' },
        { label: t('vision'), path: '/about#vision' },
        { label: t('services'), path: '/about#services' },
        { label: t('values'), path: '/about#values' },
      ]
    },
    { label: t('marketIntel'), path: '/market-intel' },
    { label: t('sustainability'), path: '/sustainability' },
    { label: t('ethical'), path: '/ethical-sourcing' },
    { label: t('manufacturing'), path: '/manufacturing' },
    { 
      label: t('products'), 
      path: '/products',
      dropdown: [
        { label: t('knit'), path: '/products#knit' },
        { label: t('woven'), path: '/products#woven' },
        { label: t('nightwear'), path: '/products#nightwear' },
        { label: t('denim'), path: '/products#denim' },
        { label: t('outerwear'), path: '/products#outerwear' },
        { label: t('lingerie'), path: '/products#lingerie' },
        { label: t('activewear'), path: '/products#activewear' },
        { label: t('hometextile'), path: '/products#hometextile' },
        { label: t('sweater'), path: '/products#sweater' },
        { label: t('uniform'), path: '/products#uniform' },
        { label: t('disney'), path: '/products#disney' },
        { label: t('jersey'), path: '/products#jersey' },
      ]
    },
    { label: t('contact'), path: '/#footer' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
    setLangDropdownOpen(false);
  }, [location]);

  const handleNavClick = (path: string) => {
    setIsOpen(false);
    if (path.includes('#')) {
      const [page, hash] = path.split('#');
      if (page && location.pathname !== page) {
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
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
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
                    <div className="py-1 max-h-[80vh] overflow-y-auto">
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

            {/* Language Switcher Desktop */}
            <div className="relative ml-4 rtl:mr-4 z-50 language-switcher">
               <button 
                  onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                  className={`flex items-center gap-2 ${textColorClass} hover:text-brand-green transition-all px-3 py-1.5 border border-white/20 hover:border-brand-green rounded-full bg-black/10 backdrop-blur-sm shadow-sm`}
               >
                  <img 
                    src={`https://flagcdn.com/w40/${currentLang.flag}.png`} 
                    alt={currentLang.label}
                    className="w-5 h-3.5 object-cover rounded-[2px] shadow-sm"
                  />
                  <span className="uppercase text-xs font-bold tracking-wide">{currentLang.code}</span>
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${langDropdownOpen ? 'rotate-180' : ''}`} />
               </button>

               {langDropdownOpen && (
                 <div className="absolute right-0 rtl:left-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-100 animate-fade-in-up ring-1 ring-black/5 overflow-hidden">
                    <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-50 mb-1">
                        Select Language
                    </div>
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={`w-full text-left rtl:text-right px-4 py-2.5 text-sm hover:bg-gray-50 flex items-center gap-3 transition-colors ${language === lang.code ? 'bg-blue-50 text-brand-blue' : 'text-gray-700'}`}
                      >
                        <img 
                          src={`https://flagcdn.com/w40/${lang.flag}.png`}
                          alt={lang.label}
                          className="w-6 h-4 object-cover rounded-[2px] shadow-sm"
                        />
                        <span className={`flex-1 ${language === lang.code ? 'font-bold' : 'font-medium'}`}>{lang.label}</span>
                        {language === lang.code && <div className="w-1.5 h-1.5 rounded-full bg-brand-green"></div>}
                      </button>
                    ))}
                 </div>
               )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-4">
            {/* Language Switcher Mobile */}
            <div className="relative language-switcher">
               <button 
                  onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                  className={`flex items-center gap-1.5 ${mobileMenuButtonClass} px-2 py-1 rounded-full border border-gray-300/50`}
               >
                  <img 
                    src={`https://flagcdn.com/w40/${currentLang.flag}.png`} 
                    alt={currentLang.label}
                    className="w-4 h-3 object-cover rounded-[1px]"
                  />
                  <span className="uppercase text-xs font-bold">{currentLang.code}</span>
                  <ChevronDown className="w-3 h-3" />
               </button>

               {langDropdownOpen && (
                 <div className="absolute top-10 right-0 rtl:left-0 bg-white shadow-xl rounded-lg border border-gray-100 py-2 z-50 w-44 animate-fade-in-up">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={`w-full text-left rtl:text-right px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-3 ${language === lang.code ? 'text-brand-green font-bold bg-green-50' : 'text-gray-700'}`}
                      >
                        <img 
                          src={`https://flagcdn.com/w40/${lang.flag}.png`}
                          alt={lang.label}
                          className="w-5 h-3.5 object-cover rounded-[1px]"
                        />
                        <span>{lang.label}</span>
                      </button>
                    ))}
                 </div>
               )}
            </div>

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
        <div className="lg:hidden bg-[#eaf2ff] border-t border-gray-200 absolute left-0 right-0 shadow-2xl animate-fade-in-up">
          <div className="px-2 pt-2 pb-6 space-y-1 sm:px-3 max-h-[85vh] overflow-y-auto">
            {navItems.map((item) => (
              <div key={item.label} className="border-b border-gray-100 last:border-0">
                <div className="flex items-center justify-between w-full hover:bg-white/50 rounded-md transition-colors">
                    <button
                      onClick={() => handleNavClick(item.path)}
                      className="text-left px-4 py-3 text-base font-bold text-brand-navy hover:text-brand-green flex-grow"
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
                    className={`pl-4 bg-white/40 overflow-hidden transition-all duration-500 ease-in-out ${
                      mobileExpanded[item.label] ? 'max-h-[1200px] opacity-100 py-2' : 'max-h-0 opacity-0 py-0'
                    }`}
                  >
                    {item.dropdown.map((subItem) => (
                      <button
                        key={subItem.label}
                        onClick={() => handleNavClick(subItem.path)}
                        className="block w-full text-left px-4 py-3 text-sm font-medium text-gray-600 hover:text-brand-green hover:bg-white/80 rounded-md border-l-2 border-transparent hover:border-brand-green transition-all"
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
  const { t } = useLanguage();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      window.location.href = `mailto:ceo@apparelbd.com?subject=Newsletter Subscription&body=I would like to subscribe to the newsletter. My email is: ${email}`;
      setEmail('');
    }
  };

  return (
    <footer id="footer" className="bg-[#eaf2ff] text-brand-navy pt-16 pb-8 border-t border-white">
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
               {t('footer_brand_desc')}
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
              {t('quickLinks')}
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-green rounded-full"></span>
            </h3>
            <ul className="space-y-3 text-sm text-gray-600 font-medium">
               {[
                 { label: t('home'), path: '/' },
                 { label: t('about'), path: '/about' },
                 { label: t('services'), path: '/about#services' },
                 { label: t('ethical'), path: '/ethical-sourcing' },
                 { label: t('manufacturing'), path: '/manufacturing' },
                 { label: t('products'), path: '/products' },
                 { label: t('sustainability'), path: '/sustainability' }
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
              {t('contactUs')}
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-green rounded-full"></span>
            </h3>
            <div className="space-y-6 text-sm text-gray-600">
               <div>
                 <p className="font-bold text-brand-navy mb-2 text-base">{t('headQuarter')}</p>
                 <a 
                   href="https://maps.app.goo.gl/NT3a89q2xwDYHYmHA" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="font-light leading-relaxed hover:text-brand-green transition-colors block mb-4"
                 >
                   <p>{t('address_line_1')}</p>
                   <p>{t('address_line_2')}</p>
                   <p>{t('address_line_3')}</p>
                 </a>

                 {/* Map Iframe */}
                 <a 
                   href="https://maps.app.goo.gl/NT3a89q2xwDYHYmHA" 
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
                        src="https://maps.app.goo.gl/NT3a89q2xwDYHYmHA"
                        title="ApparelBD Location"
                        className="filter grayscale group-hover:grayscale-0 transition-all duration-500 pointer-events-none"
                    ></iframe>
                    <div className="absolute inset-0 bg-transparent group-hover:bg-black/5 transition-colors pointer-events-none"></div>
                 </a>
               </div>
               <div>
                 <p className="font-bold text-brand-navy mb-2 text-base">{t('getInTouch')}</p>
                 <a href="mailto:ceo@apparelbd.com" className="text-brand-blue hover:text-brand-green transition-colors font-medium">ceo@apparelbd.com</a>
               </div>
            </div>
          </div>

          {/* 4. Newsletter */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-brand-navy uppercase tracking-wide relative inline-block">
              {t('newsletter')}
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-green rounded-full"></span>
            </h3>
            <p className="text-sm text-gray-600 mb-6 font-light leading-relaxed">
              {t('newsletter_desc')}
            </p>
            <form className="space-y-3" onSubmit={handleSubscribe}>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('newsletter_placeholder')} 
                required
                className="w-full px-4 py-3 text-sm bg-white border border-gray-200 rounded-sm focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-all"
              />
              <button className="w-full px-4 py-3 text-sm font-bold text-white bg-brand-navy hover:bg-brand-green rounded-sm transition-colors uppercase tracking-wider shadow-md">
                {t('subscribe')}
              </button>
            </form>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-gray-300/50 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 font-medium">
           <p className="mb-2 md:mb-0">Copyright © {new Date().getFullYear()} ApparelBD | {t('copyright')}</p>
           <a 
             href="https://www.facebook.com/share/1C9xsDjBaS/" 
             target="_blank" 
             rel="noopener noreferrer" 
             className="opacity-75 hover:text-brand-navy transition-colors hover:opacity-100"
           >
             {t('designed_by')}
           </a>
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