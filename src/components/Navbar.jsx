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
      backgroundColor: '#0a0f0d',
      borderBottom: '1px solid rgba(116,195,186,0.25)',
      padding: '0px 50px',
      position: 'fixed',
      width: '100%',
      top: 0,
      zIndex: 1000,
      boxShadow: scrolled
        ? '0 2px 24px rgba(116,195,186,0.15)'
        : '0 2px 10px rgba(0,0,0,0.4)',
    }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Logo */}
        <div className="logo">
          <img
            src={logo}
            alt="iSeeWaves Logo"
            style={{ height: '90px', borderRadius: '8px', filter: 'drop-shadow(0 0 8px rgba(116,195,186,0.35))' }}
          />
        </div>

        {/* Hamburger button (mobile) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: '#74C3BA',
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
                  color: 'rgba(232,245,243,0.8)',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  transition: 'color 0.3s, text-shadow 0.3s, border-bottom 0.3s',
                  paddingBottom: '3px',
                }}
                onMouseEnter={e => {
                  e.target.style.color = '#74C3BA';
                  e.target.style.textShadow = '0 0 10px rgba(116,195,186,0.7)';
                  e.target.style.borderBottom = '2px solid #74C3BA';
                }}
                onMouseLeave={e => {
                  e.target.style.color = 'rgba(232,245,243,0.8)';
                  e.target.style.textShadow = 'none';
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