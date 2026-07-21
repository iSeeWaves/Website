import React from 'react';

import img1 from '../assets/images/ceo1.jpg';
import img2 from '../assets/images/sec3.jpg';
import img3 from '../assets/images/sec4.jpg';
import hackerImg from '../assets/images/hacker.jpg'; 
import cyberIcon from '../assets/images/icons/logo.png';

const AboutSection = () => {
  return (
    <section style={{
      padding: '100px 80px',
      background: '#fff',
      fontFamily: "'Segoe UI', sans-serif",
      overflow: 'hidden',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '80px',
        alignItems: 'center',
      }}>

        {/* ====== LEFT — Image Collage ====== */}
        <div style={{ position: 'relative', height: '580px' }}>

          {/* LEFT BIG IMAGE */}
          <ImageCard src={img1} style={{
            position: 'absolute',
            top: '80px', left: 0,
            width: '48%', height: '72%',
            borderRadius: '16px', zIndex: 1,
          }} />

          {/* TOP RIGHT IMAGE */}
          <ImageCard src={img2} style={{
            position: 'absolute',
            top: 0, right: 0,
            width: '50%', height: '46%',
            borderRadius: '16px', zIndex: 1,
          }} />

          {/* BOTTOM RIGHT IMAGE */}
          <ImageCard src={img3} style={{
            position: 'absolute',
            bottom: 0, right: 0,
            width: '50%', height: '50%',
            borderRadius: '16px', zIndex: 1,
          }} />

          {/* SPINNING BADGE */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
            width: '150px',
            height: '150px',
          }}>
            <svg
              viewBox="0 0 150 150"
              width="150"
              height="150"
              style={{
                animation: 'spinBadge 10s linear infinite',
                position: 'absolute',
                top: 0, left: 0,
              }}
            >
              <defs>
                <path id="circlePath" d="M 75,75 m -58,0 a 58,58 0 1,1 116,0 a 58,58 0 1,1 -116,0" />
              </defs>
              <circle cx="75" cy="75" r="72" fill="white" stroke="#306F74" strokeWidth="1.5" />
              <text fontSize="11" fill="#306F74" fontWeight="600" letterSpacing="2.5">
                <textPath href="#circlePath">
                  • Get Free Cyber Security • Get Free Cyber Security •
                </textPath>
              </text>
            </svg>

            {/* Centre icon */}
            <div style={{
              position: 'absolute',
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '64px', height: '64px',
              background: '#306F74',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 20px rgba(48,111,116,0.5)',
            }}>
              <img src={cyberIcon} alt="icon" style={{
                width: '38px', height: '38px',
                objectFit: 'contain',
                filter: 'brightness(10)',
              }} />
            </div>
          </div>

          <style>{`
            @keyframes spinBadge {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>

        {/* ====== RIGHT — Content ====== */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <img src={cyberIcon} alt="" style={{ width: '26px', height: '26px', objectFit: 'contain' }} />
            <span style={{ fontSize: '13px', fontWeight: '700', letterSpacing: '4px', textTransform: 'uppercase', color: '#555' }}>
              ABOUT US
            </span>
          </div>

          <h2 style={{ fontSize: '2.8rem', fontWeight: '800', color: '#1a1a2e', lineHeight: 1.2, marginBottom: '20px' }}>
            Your trusted partner in our{' '}
            <span style={{ color: '#306F74' }}>cyber security solutions</span>
          </h2>

          <p style={{ fontSize: '16px', color: '#666', lineHeight: 1.8, marginBottom: '35px' }}>
            We provide reliable, cutting-edge cybersecurity solutions to protect your digital assets, ensuring safety and peace of mind.
          </p>

          {/* 24/7 Card  */}
          <div style={{
            display: 'flex', alignItems: 'center',
            borderRadius: '60px', overflow: 'hidden',
            marginBottom: '35px',
            boxShadow: '0 8px 30px rgba(48,111,116,0.2)',
          }}>
            <div style={{ width: '110px', height: '100px', flexShrink: 0, overflow: 'hidden', borderRadius: '60px' }}>
              <img src={hackerImg} alt="24/7" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ background: 'linear-gradient(135deg, #306F74, #74C3BA)', padding: '22px 28px', flex: 1 }}>
              <h4 style={{ color: 'white', fontSize: '17px', fontWeight: '700', margin: '0 0 8px 0' }}>24/7 Security Assistance</h4>
              <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '13px', margin: 0, lineHeight: 1.6 }}>
                Real-time support for all cybersecurity concerns, including breach response, threat detection, guidance.
              </p>
            </div>
          </div>

          {/* List + Phone */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {['Threat Detection and Monitoring', 'Access Control Management', 'Security Awareness Training'].map(item => (
                <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#333', fontSize: '15px' }}>
                  <span style={{ width: '24px', height: '24px', borderRadius: '50%', border: '2px solid #306F74', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="11" height="11" viewBox="0 0 11 11">
                      <path d="M1.5 5.5L4.5 8.5L9.5 2.5" stroke="#306F74" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#f0f8f8', borderRadius: '50px', padding: '12px 20px' }}>
              <div style={{ width: '48px', height: '48px', background: '#306F74', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="22" height="22" fill="white" viewBox="0 0 24 24">
                  <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
                </svg>
              </div>
              <span style={{ fontWeight: '700', color: '#1a1a2e', fontSize: '15px', whiteSpace: 'nowrap' }}>+92 3141966547</span>
            </div>
          </div>

          {/* Button */}
          <a href="/about" style={{
            display: 'inline-flex', alignItems: 'center', gap: '12px',
            marginTop: '35px', padding: '16px 35px',
            background: 'linear-gradient(135deg, #306F74, #74C3BA)',
            color: 'white', borderRadius: '50px', textDecoration: 'none',
            fontWeight: '700', fontSize: '16px', transition: 'all 0.3s',
            boxShadow: '0 8px 25px rgba(48,111,116,0.3)',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 35px rgba(48,111,116,0.45)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(48,111,116,0.3)'; }}
          >
            More About Us
            <span style={{ width: '30px', height: '30px', background: 'rgba(255,255,255,0.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

// Glow effect on hover
const ImageCard = ({ src, style }) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...style,
        overflow: 'hidden',
        transition: 'transform 0.4s ease, box-shadow 0.4s ease',
        transform: hovered ? 'scale(1.04)' : 'scale(1)',
        boxShadow: hovered
          ? '0 0 30px rgba(48,111,116,0.6), 0 0 60px rgba(116,195,186,0.3)'
          : '0 15px 40px rgba(0,0,0,0.12)',
        cursor: 'pointer',
      }}
    >
      <img
        src={src}
        alt=""
        style={{
          width: '100%', height: '100%',
          objectFit: 'cover',
          transition: 'filter 0.4s ease',
          filter: hovered ? 'brightness(1.15) saturate(1.2)' : 'brightness(1) saturate(1)',
        }}
      />
      <div style={{
        position: 'absolute',
        inset: 0,
        background: hovered
          ? 'linear-gradient(135deg, rgba(48,111,116,0.15), rgba(116,195,186,0.1))'
          : 'transparent',
        transition: 'background 0.4s ease',
        borderRadius: 'inherit',
      }} />
    </div>
  );
};

export default AboutSection;