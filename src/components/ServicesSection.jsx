import React, { useState } from 'react';

const services = [
  {
    title: 'Recon',
    description: 'WHOIS, DNS enumeration, subdomain discovery, port scanning, and automated HTML reports.',
    features: ['WHOIS & DNS Lookup', 'Subdomain Enumeration', 'Port Scanning'],
    svg: (hovered) => (
      <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke={hovered ? 'white' : '#306F74'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        <line x1="11" y1="8" x2="11" y2="14"/>
        <line x1="8" y1="11" x2="14" y2="11"/>
      </svg>
    ),
  },
  {
    title: 'File & IP Scanner',
    description: 'VirusTotal, IP geolocation scanning, and MAC address vendor detection for complete threat visibility.',
    features: ['File Hash Analysis', 'IP Geolocation Scan', 'MAC Vendor Detection'],
    svg: (hovered) => (
      <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke={hovered ? 'white' : '#306F74'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <polyline points="9 12 11 14 15 10"/>
      </svg>
    ),
  },
  {
    title: 'Tracker',
    description: 'Real-time geolocation tracking of IP addresses and servers. Visualize target locations on interactive maps.',
    features: ['IP Geolocation Map', 'Server Location Lookup', 'ISP & ASN Info'],
    svg: (hovered) => (
      <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke={hovered ? 'white' : '#306F74'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="10" r="3"/>
        <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 14 8 14s8-8.75 8-14a8 8 0 0 0-8-8z"/>
      </svg>
    ),
  },
  {
    title: 'Password Tools',
    description: 'Configurable password generator and real-time strength analyzer. Enforce strong security policies.',
    features: ['Strength Checker', 'Configurable Generator', 'Policy Enforcement'],
    svg: (hovered) => (
      <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke={hovered ? 'white' : '#306F74'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        <circle cx="12" cy="16" r="1" fill={hovered ? 'white' : '#306F74'}/>
      </svg>
    ),
  },
];

const ServiceCard = ({ service, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? 'linear-gradient(145deg, #306F74, #4a9fa6)'
          : 'white',
        borderRadius: '24px',
        padding: '40px 38px 36px',
        display: 'flex',
        flexDirection: 'column',
        gap: '18px',
        boxShadow: hovered
          ? '0 24px 64px rgba(48,111,116,0.28)'
          : '0 2px 20px rgba(0,0,0,0.055)',
        transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
        transform: hovered ? 'translateY(-8px) scale(1.01)' : 'translateY(0) scale(1)',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        border: hovered ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(48,111,116,0.08)',
      }}
    >
      {/* Subtle background pattern when hovered */}
      {hovered && (
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.07) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />
      )}

      {/* Number badge */}
      <div style={{
        position: 'absolute', top: '28px', right: '28px',
        fontSize: '11px', fontWeight: '800',
        letterSpacing: '1px',
        color: hovered ? 'rgba(255,255,255,0.35)' : 'rgba(48,111,116,0.2)',
        transition: 'color 0.4s ease',
      }}>
        0{index + 1}
      </div>

      {/* SVG Icon box */}
      <div style={{
        width: '76px', height: '76px',
        background: hovered ? 'rgba(255,255,255,0.15)' : 'rgba(48,111,116,0.07)',
        borderRadius: '20px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.4s ease',
        flexShrink: 0,
      }}>
        {service.svg(hovered)}
      </div>

      {/* Title */}
      <h3 style={{
        fontSize: '1.22rem',
        fontWeight: '800',
        color: hovered ? 'white' : '#0f2027',
        margin: 0,
        letterSpacing: '-0.3px',
        transition: 'color 0.4s ease',
      }}>
        {service.title}
      </h3>

      {/* Description */}
      <p style={{
        fontSize: '14px',
        color: hovered ? 'rgba(255,255,255,0.82)' : '#6b7280',
        lineHeight: 1.75,
        margin: 0,
        flexGrow: 1,
        transition: 'color 0.4s ease',
      }}>
        {service.description}
      </p>

      {/* Divider */}
      <div style={{
        height: '1px',
        background: hovered ? 'rgba(255,255,255,0.15)' : 'rgba(48,111,116,0.1)',
        transition: 'background 0.4s ease',
      }} />

      {/* Features */}
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {service.features.map(f => (
          <li key={f} style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            fontSize: '13px',
            color: hovered ? 'rgba(255,255,255,0.85)' : '#4b5563',
            fontWeight: '500',
            transition: 'color 0.4s ease',
          }}>
            <span style={{
              width: '18px', height: '18px',
              borderRadius: '50%',
              background: hovered ? 'rgba(255,255,255,0.2)' : 'rgba(48,111,116,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
              transition: 'background 0.4s ease',
            }}>
              <svg width="9" height="9" viewBox="0 0 9 9">
                <path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke={hovered ? 'white' : '#306F74'} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            {f}
          </li>
        ))}
      </ul>

      {/* Arrow */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <div style={{
          width: '40px', height: '40px',
          borderRadius: '50%',
          background: hovered ? 'rgba(255,255,255,0.2)' : 'rgba(48,111,116,0.08)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: hovered ? 'white' : '#306F74',
          fontSize: '17px',
          transition: 'all 0.4s ease',
          transform: hovered ? 'translateX(3px)' : 'translateX(0)',
        }}>
          →
        </div>
      </div>
    </div>
  );
};

const ServicesSection = () => {
  return (
    <section style={{
      padding: '110px 0',
      background: 'linear-gradient(170deg, #f0f9f9 0%, #fafffe 50%, #e8f5f2 100%)',
      fontFamily: "'Segoe UI', sans-serif",
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 40px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '70px' }}>

          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(48,111,116,0.08)',
            border: '1px solid rgba(48,111,116,0.15)',
            borderRadius: '50px', padding: '7px 22px',
            marginBottom: '22px',
          }}>
            <span style={{
              width: '7px', height: '7px',
              borderRadius: '50%',
              background: '#306F74',
              display: 'inline-block',
              boxShadow: '0 0 0 3px rgba(48,111,116,0.15)',
            }} />
            <span style={{ fontSize: '11.5px', fontWeight: '700', letterSpacing: '3px', textTransform: 'uppercase', color: '#306F74' }}>
              Our Services
            </span>
          </div>

          <h2 style={{
            fontSize: '2.75rem',
            fontWeight: '800',
            color: '#0f2027',
            lineHeight: 1.15,
            margin: '0 0 18px 0',
            letterSpacing: '-0.5px',
          }}>
            Everything You Need to{' '}
            <span style={{
              color: '#306F74',
              position: 'relative',
            }}>
              Stay Secure
            </span>
          </h2>

          <p style={{
            fontSize: '16px',
            color: '#6b7280',
            maxWidth: '480px',
            margin: '0 auto',
            lineHeight: 1.8,
          }}>
            Professional cybersecurity services designed to protect, detect, and respond to modern threats.
          </p>
        </div>

        {/* 2 Column Grid — centred, max 900px */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '24px',
        }}>
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;