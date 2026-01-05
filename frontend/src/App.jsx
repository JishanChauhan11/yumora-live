import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TechSpecs from './components/TechSpecs';
import ProductLineup from './components/ProductLineup';
import Marquee from './components/Marquee';
import Footer from './components/Footer';
import About from './components/About';
import PreOrder from './components/PreOrder';
import AdminPanel from './components/AdminPanel'; // ✅ Import this
import NewArrivals from './components/NewArrivals'; // ✅ Import

const HomePage = () => (
  <>
    <Hero />
    <NewArrivals /> {/* ✅ Place it here, maybe after Hero or before TechSpecs */}
    <TechSpecs />
    <Marquee />
    <ProductLineup />
    <About />
  </>
);

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pre-order" element={<PreOrder />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/pre-order" element={<PreOrder />} />
          <Route path="/admin" element={<AdminPanel />} /> {/* ✅ Add this */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;