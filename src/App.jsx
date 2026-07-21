import React from 'react';
import Navbar from './components/Navbar';
import HeroCarousel from './components/HeroCarousel';
import Footer from './components/Footer';
import './styles/style.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <HeroCarousel />
      <Footer />
    </div>
  );
}

export default App;