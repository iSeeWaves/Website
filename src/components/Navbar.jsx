import React, { useState, useEffect } from 'react';
import logo from '../assets/images/icons/logo.png';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header style={{
      backgroundColor: '#306F74',
      padding: '0px 50px',
      position: 'fixed',
      width: '100%',
      top: 0,
      zIndex: 1000,
      boxShadow: scrolled ? '0 2px 10px rgba(0,0,0,0.2)' : '0 2px 10px rgba(0,0,0,0.2)',
    }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Logo */}
        <div className="logo">
          <img
            src={logo}
            alt="iSeeWaves Logo"
            style={{ height: '90px', borderRadius: '8px' }}
          />
        </div>

        {/* Hamburger button (mobile) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: '#F4F7EC',
            fontSize: '24px',
            cursor: 'pointer',
          }}
          className="hamburger-btn"
        >
          ☰
        </button>

        {/* Nav Links */}
        <ul style={{
          display: 'flex',
          listStyle: 'none',
          margin: 0,
          padding: 0,
          gap: '0',
        }} className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {[
            { label: 'Products', href: '/products' },
            { label: 'Services', href: '/services' },
            { label: 'About Us', href: '/about' },
            { label: 'Cyber Regulations', href: '/regulations' },
            { label: 'Contact', href: '/contact' },
            { label: 'Careers', href: '/careers' },
          ].map((item) => (
            <li key={item.label} style={{ marginRight: '20px' }}>
              <a
                href={item.href}
                style={{
                  textDecoration: 'none',
                  color: '#F4F7EC',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  transition: 'color 0.3s, border-bottom 0.3s',
                  paddingBottom: '3px',
                }}
                onMouseEnter={e => {
                  e.target.style.color = '#FFFFFF';
                  e.target.style.borderBottom = '2px solid #FFFFFF';
                }}
                onMouseLeave={e => {
                  e.target.style.color = '#F4F7EC';
                  e.target.style.borderBottom = 'none';
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;