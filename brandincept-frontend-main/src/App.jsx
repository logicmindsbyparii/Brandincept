import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import BrandPartners from './components/BrandPartners';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';

function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <Header />
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <BrandPartners />
      <Contact />
      <Footer />
      <FloatingWhatsApp/>
    </div>
  );
}

export default App;
