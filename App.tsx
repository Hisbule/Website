import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import MarketIntel from './pages/MarketIntel';
import Sustainability from './pages/Sustainability';
import EthicalSourcing from './pages/EthicalSourcing';
import Manufacturing from './pages/Manufacturing';

const ScrollToAnchor = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If there is a hash, scroll to it
    if (hash) {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100); // slight delay to ensure render
    } else {
      // If no hash, scroll to top
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

const App = () => {
  return (
    <HashRouter>
      <ScrollToAnchor />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/market-intel" element={<MarketIntel />} />
          <Route path="/sustainability" element={<Sustainability />} />
          <Route path="/ethical-sourcing" element={<EthicalSourcing />} />
          <Route path="/manufacturing" element={<Manufacturing />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;