import React, { useState, useEffect, useRef } from 'react';

// ── Images ──────────────────────────────────────────
import logo         from '../assets/images/icons/logo.png';
import BG2          from '../assets/images/BG2.jpg';
import BG3          from '../assets/images/BG3.jpg';
import videoBg      from '../assets/images/video_bg.mp4';
import img1         from '../assets/images/ceo1.jpg';
import img2         from '../assets/images/sec3.jpg';
import img3         from '../assets/images/sec4.jpg';
import hackerImg    from '../assets/images/hacker.jpg';
import cyberIcon    from '../assets/images/icons/logo.png';
import whyImg       from '../assets/images/cyber1.jpg';
import gmailIcon    from '../assets/images/icons/gmail.png';
import locationIcon from '../assets/images/icons/placeholder.png';
import instagramIcon from '../assets/images/icons/instagram.png';
import facebookIcon from '../assets/images/icons/facebook.png';
import twitterIcon  from '../assets/images/icons/twitter.png';
import linkedinIcon from '../assets/images/icons/linkedin.png';


// ════════════════════════════════════════════════════
//  1. NAVBAR
// ════════════════════════════════════════════════════
const Navbar = () => {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

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
      boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
    }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="logo">
          <img src={logo} alt="iSeeWaves Logo" style={{ height: '90px', borderRadius: '8px' }} />
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ display: 'none', background: 'none', border: 'none', color: '#F4F7EC', fontSize: '24px', cursor: 'pointer' }}
          className="hamburger-btn"
        >☰</button>

        <ul style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0, gap: '0' }}
          className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {[
            { label: 'Products',    href: '/products' },
            { label: 'Services',    href: '/services' },
            { label: 'About Us',    href: '/about' },
            { label: 'Cyber Regulations', href: '/regulations' },
            { label: 'Contact',     href: '/contact' },
            { label: 'Careers',     href: '/careers' },
          ].map(item => (
            <li key={item.label} style={{ marginRight: '20px' }}>
              <a href={item.href} style={{ textDecoration: 'none', color: '#F4F7EC', fontSize: '16px', fontWeight: 'bold', transition: 'color 0.3s', paddingBottom: '3px' }}
                onMouseEnter={e => { e.target.style.color = '#FFFFFF'; e.target.style.borderBottom = '2px solid #FFFFFF'; }}
                onMouseLeave={e => { e.target.style.color = '#F4F7EC'; e.target.style.borderBottom = 'none'; }}
              >{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};


// ════════════════════════════════════════════════════
//  2. HERO CAROUSEL
// ════════════════════════════════════════════════════
const slides = [
  { type: 'video', videoSrc: videoBg, heading: <>Welcome to <span style={{ color: '#74C3BA' }}>iSeeWaves</span> Security Solutions</>, para: 'Your trusted partner in offensive security tools.', btn1: { label: 'Get Started', href: '/products' }, btn2: { label: 'Request a Demo', href: '/service-form' } },
  { type: 'image', bgImage: BG2, heading: <>Advanced <span style={{ color: '#74C3BA' }}>Surveillance</span> Technology</>, para: '24/7 monitoring with cutting-edge security systems.', btn1: { label: 'Learn More', href: '/about' }, btn2: { label: 'Get Support', href: '/contact' } },
  { type: 'image', bgImage: BG3, heading: <>24/7 <span style={{ color: '#74C3BA' }}>Monitoring</span> & Support</>, para: 'Round-the-clock protection for your business infrastructure.', btn1: { label: 'Our Services', href: '/services' }, btn2: { label: 'Contact Us', href: '/contact' } },
];
const btnPrimary   = { padding: '15px 30px', backgroundColor: '#306F74', color: 'white', textTransform: 'uppercase', textDecoration: 'none', borderRadius: '50px', fontSize: '1rem', transition: 'all 0.3s', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', display: 'inline-block' };
const btnSecondary = { ...btnPrimary, backgroundColor: 'transparent', border: '2px solid #F4F7EC', color: '#F4F7EC' };
const controlBtn   = (side) => ({ position: 'absolute', top: '50%', [side]: '15px', transform: 'translateY(-50%)', background: 'rgba(48,111,116,0.7)', border: 'none', color: 'white', fontSize: '40px', width: '45px', height: '45px', borderRadius: '50%', cursor: 'pointer', zIndex: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' });

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [fade, setFade]       = useState(true);
  const videoRef              = useRef(null);
  const goTo = (idx) => { setFade(false); setTimeout(() => { setCurrent(idx); setFade(true); }, 300); };
  const prev = () => goTo((current - 1 + slides.length) % slides.length);
  const next = () => goTo((current + 1) % slides.length);
  useEffect(() => { const t = setInterval(() => setCurrent(p => (p + 1) % slides.length), 5000); return () => clearInterval(t); }, []);
  useEffect(() => { if (slides[current].type === 'video' && videoRef.current) { videoRef.current.load(); videoRef.current.play().catch(() => {}); } }, [current]);
  const slide = slides[current];
  return (
    <section style={{ height: '100vh', marginTop: '80px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', transition: 'opacity 0.4s ease', opacity: fade ? 1 : 0 }}>
        {slide.type === 'video' ? (
          <video ref={videoRef} key="hero-video" muted loop playsInline autoPlay style={{ position: 'absolute', top: '50%', left: '50%', width: '177.78vh', height: '100vh', minWidth: '100%', minHeight: '56.25vw', transform: 'translate(-50%,-50%) scale(1.1)', objectFit: 'cover', filter: 'brightness(0.8)' }}>
            <source src={slide.videoSrc} type="video/mp4" />
          </video>
        ) : (
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: `url(${slide.bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.7)' }} />
        )}
      </div>
      <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', alignItems: 'center', padding: '0 80px', opacity: fade ? 1 : 0, transition: 'opacity 0.4s ease' }}>
        <div style={{ maxWidth: '600px' }}>
          <h1 style={{ color: '#F4F7EC', fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0,0,0,0.5)', lineHeight: 1.2 }}>{slide.heading}</h1>
          <p style={{ color: '#F4F7EC', fontSize: '1.25rem', marginBottom: '30px', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>{slide.para}</p>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <a href={slide.btn1.href} style={btnPrimary} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>{slide.btn1.label}</a>
            <a href={slide.btn2.href} style={btnSecondary} onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#F4F7EC'; e.currentTarget.style.color = '#306F74'; }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#F4F7EC'; }}>{slide.btn2.label}</a>
          </div>
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '10px', zIndex: 3 }}>
        {slides.map((_, i) => <button key={i} onClick={() => goTo(i)} style={{ width: '12px', height: '12px', borderRadius: '50%', background: i === current ? '#F4F7EC' : 'rgba(48,111,116,0.7)', border: '2px solid #F4F7EC', cursor: 'pointer', padding: 0, transition: 'background 0.3s' }} />)}
      </div>
      <button onClick={prev} style={controlBtn('left')}>&#8249;</button>
      <button onClick={next} style={controlBtn('right')}>&#8250;</button>
    </section>
  );
};


// ════════════════════════════════════════════════════
//  3. ABOUT SECTION
// ════════════════════════════════════════════════════
const ImageCard = ({ src, style }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ ...style, overflow: 'hidden', transition: 'transform 0.4s ease, box-shadow 0.4s ease', transform: hovered ? 'scale(1.04)' : 'scale(1)', boxShadow: hovered ? '0 0 30px rgba(48,111,116,0.6), 0 0 60px rgba(116,195,186,0.3)' : '0 15px 40px rgba(0,0,0,0.12)', cursor: 'pointer' }}>
      <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'filter 0.4s ease', filter: hovered ? 'brightness(1.15) saturate(1.2)' : 'brightness(1) saturate(1)' }} />
      <div style={{ position: 'absolute', inset: 0, background: hovered ? 'linear-gradient(135deg, rgba(48,111,116,0.15), rgba(116,195,186,0.1))' : 'transparent', transition: 'background 0.4s ease', borderRadius: 'inherit' }} />
    </div>
  );
};

const AboutSection = () => (
  <section style={{ padding: '100px 80px', background: '#fff', fontFamily: "'Segoe UI', sans-serif", overflow: 'hidden' }}>
    <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>

      {/* LEFT — Image Collage */}
      <div style={{ position: 'relative', height: '580px' }}>
        <ImageCard src={img1} style={{ position: 'absolute', top: '80px', left: 0, width: '48%', height: '72%', borderRadius: '16px', zIndex: 1 }} />
        <ImageCard src={img2} style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: '46%', borderRadius: '16px', zIndex: 1 }} />
        <ImageCard src={img3} style={{ position: 'absolute', bottom: 0, right: 0, width: '50%', height: '50%', borderRadius: '16px', zIndex: 1 }} />

        {/* Spinning Badge */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 10, width: '150px', height: '150px' }}>
          <svg viewBox="0 0 150 150" width="150" height="150" style={{ animation: 'spinBadge 10s linear infinite', position: 'absolute', top: 0, left: 0 }}>
            <defs><path id="circlePath" d="M 75,75 m -58,0 a 58,58 0 1,1 116,0 a 58,58 0 1,1 -116,0" /></defs>
            <circle cx="75" cy="75" r="72" fill="white" stroke="#306F74" strokeWidth="1.5" />
            <text fontSize="11" fill="#306F74" fontWeight="600" letterSpacing="2.5">
              <textPath href="#circlePath">• Get Free Cyber Security • Get Free Cyber Security •</textPath>
            </text>
          </svg>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '64px', height: '64px', background: '#306F74', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px rgba(48,111,116,0.5)' }}>
            <img src={cyberIcon} alt="icon" style={{ width: '38px', height: '38px', objectFit: 'contain', filter: 'brightness(10)' }} />
          </div>
        </div>
        <style>{`@keyframes spinBadge { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>

      {/* RIGHT — Content */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <img src={cyberIcon} alt="" style={{ width: '26px', height: '26px', objectFit: 'contain' }} />
          <span style={{ fontSize: '13px', fontWeight: '700', letterSpacing: '4px', textTransform: 'uppercase', color: '#555' }}>ABOUT US</span>
        </div>
        <h2 style={{ fontSize: '2.8rem', fontWeight: '800', color: '#1a1a2e', lineHeight: 1.2, marginBottom: '20px' }}>Your trusted partner in our{' '}<span style={{ color: '#306F74' }}>cyber security solutions</span></h2>
        <p style={{ fontSize: '16px', color: '#666', lineHeight: 1.8, marginBottom: '35px' }}>We provide reliable, cutting-edge cybersecurity solutions to protect your digital assets, ensuring safety and peace of mind.</p>

        {/* 24/7 Card */}
        <div style={{ display: 'flex', alignItems: 'center', borderRadius: '60px', overflow: 'hidden', marginBottom: '35px', boxShadow: '0 8px 30px rgba(48,111,116,0.2)' }}>
          <div style={{ width: '110px', height: '100px', flexShrink: 0, overflow: 'hidden', borderRadius: '60px' }}>
            <img src={hackerImg} alt="24/7" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ background: 'linear-gradient(135deg, #306F74, #74C3BA)', padding: '22px 28px', flex: 1 }}>
            <h4 style={{ color: 'white', fontSize: '17px', fontWeight: '700', margin: '0 0 8px 0' }}>24/7 Security Assistance</h4>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '13px', margin: 0, lineHeight: 1.6 }}>Real-time support for all cybersecurity concerns, including breach response, threat detection, guidance.</p>
          </div>
        </div>

        {/* List + Phone */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {['Threat Detection and Monitoring', 'Access Control Management', 'Security Awareness Training'].map(item => (
              <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#333', fontSize: '15px' }}>
                <span style={{ width: '24px', height: '24px', borderRadius: '50%', border: '2px solid #306F74', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="11" height="11" viewBox="0 0 11 11"><path d="M1.5 5.5L4.5 8.5L9.5 2.5" stroke="#306F74" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
                {item}
              </li>
            ))}
          </ul>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#f0f8f8', borderRadius: '50px', padding: '12px 20px' }}>
            <div style={{ width: '48px', height: '48px', background: '#306F74', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="22" height="22" fill="white" viewBox="0 0 24 24"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
            </div>
            <span style={{ fontWeight: '700', color: '#1a1a2e', fontSize: '15px', whiteSpace: 'nowrap' }}>+92 3141966547</span>
          </div>
        </div>

        <a href="/about" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', marginTop: '35px', padding: '16px 35px', background: 'linear-gradient(135deg, #306F74, #74C3BA)', color: 'white', borderRadius: '50px', textDecoration: 'none', fontWeight: '700', fontSize: '16px', transition: 'all 0.3s', boxShadow: '0 8px 25px rgba(48,111,116,0.3)' }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 35px rgba(48,111,116,0.45)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(48,111,116,0.3)'; }}>
          More About Us
          <span style={{ width: '30px', height: '30px', background: 'rgba(255,255,255,0.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>→</span>
        </a>
      </div>
    </div>
  </section>
);


// ════════════════════════════════════════════════════
//  4. STATS BAR
// ════════════════════════════════════════════════════
const statsData = [
  { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#74C3BA" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 12l2 2 4-4" stroke="#74C3BA" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>, target: 500, suffix: '+', label: 'Clients Protected' },
  { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" stroke="#74C3BA" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>, target: 99, suffix: '%', label: 'Uptime Guaranteed' },
  { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" stroke="#74C3BA" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>, target: 4, suffix: '', label: 'Core Security Services' },
  { icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#74C3BA" strokeWidth="1.8"/><line x1="2" y1="12" x2="22" y2="12" stroke="#74C3BA" strokeWidth="1.8"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="#74C3BA" strokeWidth="1.8"/></svg>, target: 2025, suffix: '', prefix: 'Est. ', label: 'Abbottabad, Pakistan', noCount: true },
];

const useCounter = (target, duration, start) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (ts) => { if (!startTime) startTime = ts; const p = Math.min((ts - startTime) / duration, 1); setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target)); if (p < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
};

const StatItem = ({ stat, index, started }) => {
  const count   = useCounter(stat.target, 1800 + index * 200, started);
  const display = stat.noCount ? stat.target : count;
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ display: 'flex', alignItems: 'center', gap: '18px', flex: 1, padding: '12px 40px', position: 'relative', borderRadius: '16px', transition: 'all 0.35s ease', background: hovered ? 'rgba(116,195,186,0.08)' : 'transparent', cursor: 'default' }}>
      {hovered && <div style={{ position: 'absolute', top: '50%', left: '40px', transform: 'translateY(-50%)', width: '80px', height: '80px', background: 'radial-gradient(circle, rgba(116,195,186,0.25) 0%, transparent 70%)', pointerEvents: 'none', borderRadius: '50%' }} />}
      <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: hovered ? 'rgba(116,195,186,0.22)' : 'rgba(116,195,186,0.12)', border: hovered ? '1px solid rgba(116,195,186,0.45)' : '1px solid rgba(116,195,186,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.35s ease', boxShadow: hovered ? '0 0 18px rgba(116,195,186,0.3)' : 'none', transform: hovered ? 'scale(1.08)' : 'scale(1)' }}>{stat.icon}</div>
      <div>
        <div style={{ fontSize: '2rem', fontWeight: '800', color: hovered ? '#a8ddd8' : '#74C3BA', lineHeight: 1.1, letterSpacing: '-1px', fontFamily: "'Segoe UI', sans-serif", transition: 'color 0.35s ease', textShadow: hovered ? '0 0 20px rgba(116,195,186,0.5)' : 'none' }}>{stat.prefix || ''}{display}{stat.suffix}</div>
        <div style={{ fontSize: '13px', color: hovered ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.6)', marginTop: '4px', fontWeight: '500', letterSpacing: '0.3px', transition: 'color 0.35s ease' }}>{stat.label}</div>
      </div>
    </div>
  );
};

const StatsBar = () => {
  const [started, setStarted] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setStarted(true); }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ background: 'linear-gradient(135deg, #1e4f54 0%, #2a6b70 50%, #1e4f54 100%)', padding: '42px 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '-60px', left: '25%', width: '400px', height: '200px', background: 'radial-gradient(ellipse, rgba(116,195,186,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center' }}>
        {statsData.map((stat, index) => (
          <React.Fragment key={stat.label}>
            <StatItem stat={stat} index={index} started={started} />
            {index < statsData.length - 1 && <div style={{ width: '1px', height: '60px', background: 'rgba(116,195,186,0.2)', flexShrink: 0 }} />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};


// ════════════════════════════════════════════════════
//  5. SERVICES SECTION
// ════════════════════════════════════════════════════
const servicesData = [
  { title: 'Recon', description: 'WHOIS, DNS enumeration, subdomain discovery, port scanning, and automated HTML reports.', features: ['WHOIS & DNS Lookup', 'Subdomain Enumeration', 'Port Scanning'], svg: (h) => <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke={h ? 'white' : '#306F74'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg> },
  { title: 'File & IP Scanner', description: 'VirusTotal, IP geolocation scanning, and MAC address vendor detection for complete threat visibility.', features: ['File Hash Analysis', 'IP Geolocation Scan', 'MAC Vendor Detection'], svg: (h) => <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke={h ? 'white' : '#306F74'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg> },
  { title: 'Tracker', description: 'Real-time geolocation tracking of IP addresses and servers. Visualize target locations on interactive maps.', features: ['IP Geolocation Map', 'Server Location Lookup', 'ISP & ASN Info'], svg: (h) => <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke={h ? 'white' : '#306F74'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="10" r="3"/><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 14 8 14s8-8.75 8-14a8 8 0 0 0-8-8z"/></svg> },
  { title: 'Password Tools', description: 'Configurable password generator and real-time strength analyzer. Enforce strong security policies.', features: ['Strength Checker', 'Configurable Generator', 'Policy Enforcement'], svg: (h) => <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke={h ? 'white' : '#306F74'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><circle cx="12" cy="16" r="1" fill={h ? 'white' : '#306F74'}/></svg> },
];

const ServiceCard = ({ service, index }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ background: hovered ? 'linear-gradient(145deg, #306F74, #4a9fa6)' : 'white', borderRadius: '24px', padding: '40px 38px 36px', display: 'flex', flexDirection: 'column', gap: '18px', boxShadow: hovered ? '0 24px 64px rgba(48,111,116,0.28)' : '0 2px 20px rgba(0,0,0,0.055)', transition: 'all 0.4s cubic-bezier(0.23,1,0.32,1)', transform: hovered ? 'translateY(-8px) scale(1.01)' : 'translateY(0) scale(1)', cursor: 'pointer', position: 'relative', overflow: 'hidden', border: hovered ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(48,111,116,0.08)' }}>
      {hovered && <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.07) 0%, transparent 60%)', pointerEvents: 'none' }} />}
      <div style={{ position: 'absolute', top: '28px', right: '28px', fontSize: '11px', fontWeight: '800', letterSpacing: '1px', color: hovered ? 'rgba(255,255,255,0.35)' : 'rgba(48,111,116,0.2)', transition: 'color 0.4s ease' }}>0{index + 1}</div>
      <div style={{ width: '76px', height: '76px', background: hovered ? 'rgba(255,255,255,0.15)' : 'rgba(48,111,116,0.07)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.4s ease', flexShrink: 0 }}>{service.svg(hovered)}</div>
      <h3 style={{ fontSize: '1.22rem', fontWeight: '800', color: hovered ? 'white' : '#0f2027', margin: 0, letterSpacing: '-0.3px', transition: 'color 0.4s ease' }}>{service.title}</h3>
      <p style={{ fontSize: '14px', color: hovered ? 'rgba(255,255,255,0.82)' : '#6b7280', lineHeight: 1.75, margin: 0, flexGrow: 1, transition: 'color 0.4s ease' }}>{service.description}</p>
      <div style={{ height: '1px', background: hovered ? 'rgba(255,255,255,0.15)' : 'rgba(48,111,116,0.1)', transition: 'background 0.4s ease' }} />
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {service.features.map(f => (
          <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: hovered ? 'rgba(255,255,255,0.85)' : '#4b5563', fontWeight: '500', transition: 'color 0.4s ease' }}>
            <span style={{ width: '18px', height: '18px', borderRadius: '50%', background: hovered ? 'rgba(255,255,255,0.2)' : 'rgba(48,111,116,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 0.4s ease' }}>
              <svg width="9" height="9" viewBox="0 0 9 9"><path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke={hovered ? 'white' : '#306F74'} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>{f}
          </li>
        ))}
      </ul>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: hovered ? 'rgba(255,255,255,0.2)' : 'rgba(48,111,116,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: hovered ? 'white' : '#306F74', fontSize: '17px', transition: 'all 0.4s ease', transform: hovered ? 'translateX(3px)' : 'translateX(0)' }}>→</div>
      </div>
    </div>
  );
};

const ServicesSection = () => (
  <section style={{ padding: '110px 0', background: 'linear-gradient(170deg, #f0f9f9 0%, #fafffe 50%, #e8f5f2 100%)', fontFamily: "'Segoe UI', sans-serif" }}>
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 40px' }}>
      <div style={{ textAlign: 'center', marginBottom: '70px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(48,111,116,0.08)', border: '1px solid rgba(48,111,116,0.15)', borderRadius: '50px', padding: '7px 22px', marginBottom: '22px' }}>
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#306F74', display: 'inline-block', boxShadow: '0 0 0 3px rgba(48,111,116,0.15)' }} />
          <span style={{ fontSize: '11.5px', fontWeight: '700', letterSpacing: '3px', textTransform: 'uppercase', color: '#306F74' }}>Our Services</span>
        </div>
        <h2 style={{ fontSize: '2.75rem', fontWeight: '800', color: '#0f2027', lineHeight: 1.15, margin: '0 0 18px 0', letterSpacing: '-0.5px' }}>Everything You Need to <span style={{ color: '#306F74' }}>Stay Secure</span></h2>
        <p style={{ fontSize: '16px', color: '#6b7280', maxWidth: '480px', margin: '0 auto', lineHeight: 1.8 }}>Professional cybersecurity services designed to protect, detect, and respond to modern threats.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
        {servicesData.map((service, index) => <ServiceCard key={service.title} service={service} index={index} />)}
      </div>
    </div>
  </section>
);


// ════════════════════════════════════════════════════
//  6. WHY CHOOSE US
// ════════════════════════════════════════════════════
const reasons = [
  { title: 'Expertise And Experience', description: 'A team of seasoned cybersecurity professionals with extensive industry knowledge and hands-on experience.', svg: (a) => <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={a ? '#fff' : '#74C3BA'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><circle cx="12" cy="16" r="1" fill={a ? '#fff' : '#74C3BA'}/></svg> },
  { title: 'Proactive Security Approach', description: 'Focused on preventing threats before they impact your system, not just reacting after the fact.', svg: (a) => <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={a ? '#fff' : '#74C3BA'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg> },
  { title: 'Tailored Training Programs', description: 'Educating your team on security best practices to reduce human error and enhance vigilance.', svg: (a) => <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={a ? '#fff' : '#74C3BA'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14"/><path d="M22 3h-6a4 4 0 0 0-4 4v14"/></svg> },
  { title: 'Cutting-Edge Tools', description: 'We use the latest offensive and defensive security tools to stay ahead of evolving cyber threats.', svg: (a) => <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={a ? '#fff' : '#74C3BA'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg> },
];

const WhyChooseUs = () => {
  const [active, setActive]   = useState(null);
  const [hovered, setHovered] = useState(null);
  return (
    <section style={{ background: 'linear-gradient(135deg,#0f2027,#1a3a40,#0f2027)', fontFamily: "'Segoe UI', sans-serif" }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '680px' }}>
        <div style={{ position: 'relative' }}>
          <img src={whyImg} alt="Why Choose Us" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(.75)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent 60%, #0f2027)' }} />
        </div>
        <div style={{ padding: '70px 60px 70px 50px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '28px' }}>
          <span style={{ fontSize: '12px', fontWeight: '700', letterSpacing: '3px', textTransform: 'uppercase', color: '#74C3BA' }}>Why Choose Us</span>
          <h2 style={{ fontSize: '2.6rem', fontWeight: '900', color: 'white', margin: 0 }}>Reliable solutions for <span style={{ color: '#74C3BA' }}>cybersecurity excellence</span></h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {reasons.map((reason, i) => {
              const isActive = active === i;
              const isHovered = hovered === i;
              const on = isActive || isHovered;
              return (
                <div key={i} onClick={() => setActive(active === i ? null : i)} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
                  style={{ display: 'flex', gap: '20px', padding: '22px 26px', borderRadius: '16px', background: on ? 'linear-gradient(135deg,#306F74,#74C3BA)' : 'white', border: '1px solid rgba(116,195,186,0.25)', cursor: 'pointer', transition: 'all .35s ease', transform: isActive ? 'translateX(6px)' : isHovered ? 'translateX(3px)' : 'translateX(0)', boxShadow: isActive ? '0 10px 30px rgba(0,0,0,0.25)' : isHovered ? '0 4px 18px rgba(116,195,186,0.15)' : 'none' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '14px', background: on ? 'rgba(255,255,255,0.15)' : 'rgba(48,111,116,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{reason.svg(on)}</div>
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: '700', margin: '0 0 6px', color: on ? '#fff' : '#0f2027', transition: 'color .3s ease' }}>{reason.title}</h4>
                    <p style={{ fontSize: '13.5px', margin: 0, lineHeight: 1.6, color: on ? '#fff' : '#6b7280', transition: 'color .3s ease' }}>{reason.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};


// ════════════════════════════════════════════════════
//  7. ANNOUNCEMENTS
// ════════════════════════════════════════════════════
const featuredNews = { date: 'FEBRUARY 2025', tag: 'FEATURED', title: 'iSeeWaves Platform Officially Launched — Integrated Security Tools Now Live', description: 'We are proud to announce the official launch of the iSeeWaves Security Platform. All four core modules — Reconnaissance, Scanning, Tracker, and Password Tools — are now fully operational and available.', label: '🚀 Platform Launch' };
const newsItems = [
  { emoji: '🔔', tag: 'UPDATE',       title: 'Subdomain Enumeration Now Supports AlienVault OTX',       description: 'Passive recon module upgraded with OTX threat intelligence integration for deeper subdomain discovery.' },
  { emoji: '📣', tag: 'ANNOUNCEMENT', title: 'Internship Program Open — Join Team Alpha',                description: 'We are accepting applications for cybersecurity interns. Work on real-world offensive security tooling.' },
  { emoji: '⚠️', tag: 'ADVISORY',     title: 'Cyber Regulations Repository Updated with 2025 Laws',     description: 'International cyber law references updated. Pakistan PECA amendments now included in our database.' },
];

const AnnouncementsSection = () => {
  const [hoveredItem, setHoveredItem]       = useState(null);
  const [featuredHovered, setFeaturedHovered] = useState(false);
  return (
    <section style={{ padding: '90px 0', background: '#ffffff', fontFamily: "'Segoe UI', sans-serif" }}>
      <div style={{ maxWidth: '1150px', margin: '0 auto', padding: '0 60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px', alignItems: 'stretch' }}>

          {/* LEFT */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', flex: 1 }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', border: '1.5px solid rgba(48,111,116,0.3)', borderRadius: '50px', padding: '5px 16px', marginBottom: '18px' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', color: '#306F74' }}>Latest Updates</span>
              </div>
              <h2 style={{ fontSize: '2.8rem', fontWeight: '900', color: '#0f2027', margin: '0 0 14px', letterSpacing: '-1px', lineHeight: 1.1 }}>News & <span style={{ color: '#306F74' }}>Announcements</span></h2>
              <p style={{ fontSize: '15px', color: '#6b7280', lineHeight: 1.75, margin: 0 }}>Stay informed about the latest in cybersecurity and iSeeWaves platform updates.</p>
            </div>
            <div onMouseEnter={() => setFeaturedHovered(true)} onMouseLeave={() => setFeaturedHovered(false)}
              style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'linear-gradient(145deg, #2a6b70, #1e4f54)', borderRadius: '20px', padding: '36px 38px', position: 'relative', overflow: 'hidden', cursor: 'pointer', transition: 'all 0.4s ease', boxShadow: featuredHovered ? '0 0 45px rgba(116,195,186,0.4), 0 24px 60px rgba(48,111,116,0.45)' : '0 8px 30px rgba(0,0,0,0.15)', transform: featuredHovered ? 'translateY(-5px)' : 'translateY(0)' }}>
              <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '220px', height: '220px', background: featuredHovered ? 'radial-gradient(circle, rgba(116,195,186,0.3) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(116,195,186,0.12) 0%, transparent 70%)', pointerEvents: 'none', transition: 'background 0.4s ease' }} />
              {featuredHovered && <div style={{ position: 'absolute', bottom: '-30px', left: '-30px', width: '180px', height: '180px', background: 'radial-gradient(circle, rgba(116,195,186,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />}
              <div style={{ fontSize: '11.5px', fontWeight: '700', letterSpacing: '2px', color: 'rgba(116,195,186,0.8)', marginBottom: '14px' }}>{featuredNews.date} · {featuredNews.tag}</div>
              <h3 style={{ fontSize: '1.45rem', fontWeight: '800', color: 'white', margin: '0 0 14px', lineHeight: 1.3, letterSpacing: '-0.3px' }}>{featuredNews.title}</h3>
              <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.72)', lineHeight: 1.75, margin: '0 0 24px' }}>{featuredNews.description}</p>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '50px', padding: '7px 16px', fontSize: '12.5px', color: 'white', fontWeight: '600' }}>{featuredNews.label}</div>
            </div>
          </div>

          {/* RIGHT */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', paddingTop: '8px', alignSelf: 'stretch' }}>
            {newsItems.map((item, i) => (
              <div key={i} onMouseEnter={() => setHoveredItem(i)} onMouseLeave={() => setHoveredItem(null)}
                style={{ background: hoveredItem === i ? '#f0f9f9' : '#f8fafa', border: hoveredItem === i ? '1.5px solid rgba(48,111,116,0.25)' : '1.5px solid rgba(0,0,0,0.06)', borderRadius: '16px', padding: '26px 28px', cursor: 'pointer', transition: 'all 0.3s ease', transform: hoveredItem === i ? 'translateX(6px)' : 'translateX(0)', boxShadow: hoveredItem === i ? '0 6px 24px rgba(48,111,116,0.1)' : '0 2px 8px rgba(0,0,0,0.04)', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <span style={{ fontSize: '15px' }}>{item.emoji}</span>
                  <span style={{ fontSize: '10.5px', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase', color: '#306F74' }}>{item.tag}</span>
                </div>
                <h4 style={{ fontSize: '0.98rem', fontWeight: '700', color: hoveredItem === i ? '#306F74' : '#0f2027', margin: '0 0 8px', lineHeight: 1.35, transition: 'color 0.3s ease' }}>{item.title}</h4>
                <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.65, margin: 0 }}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};


// ════════════════════════════════════════════════════
//  8. FOOTER
// ════════════════════════════════════════════════════
const FooterLink = ({ href, children }) => (
  <a href={href} style={{ color: '#b8d4d6', textDecoration: 'none', fontSize: '15px', display: 'inline-block', transition: 'all 0.3s ease' }}
    onMouseEnter={e => { e.target.style.color = '#f3f7ec'; e.target.style.transform = 'translateX(8px)'; }}
    onMouseLeave={e => { e.target.style.color = '#b8d4d6'; e.target.style.transform = 'translateX(0)'; }}>
    {children}
  </a>
);
const FooterHeading = ({ title }) => (
  <div style={{ marginBottom: '20px', position: 'relative', paddingBottom: '10px' }}>
    <h3 style={{ color: '#f3f7ec', fontSize: '18px', fontWeight: '600', margin: 0 }}>{title}</h3>
    <div style={{ position: 'absolute', bottom: 0, left: 0, width: '30px', height: '2px', background: '#f3f7ec', borderRadius: '2px' }} />
  </div>
);
const FooterSection = ({ title, links }) => (
  <div>
    <FooterHeading title={title} />
    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {links.map(link => <li key={link.label}><FooterLink href={link.href}>{link.label}</FooterLink></li>)}
    </ul>
  </div>
);

const Footer = () => (
  <footer style={{ background: 'linear-gradient(135deg, #307075 0%, #2a5f63 100%)', color: '#f3f7ec', padding: '60px 0 20px 0', position: 'relative', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent 0%, #f3f7ec 50%, transparent 100%)' }} />
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '40px', marginBottom: '40px' }}>
        {/* Company Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
            <div style={{ width: '50px', height: '50px', background: '#f3f7ec', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.2)', overflow: 'hidden' }}>
              <img src={logo} alt="Logo" style={{ width: '35px', height: '35px', objectFit: 'contain' }} />
            </div>
            <span style={{ fontSize: '28px', fontWeight: '700', letterSpacing: '-0.5px' }}>iSeeWaves</span>
          </div>
          <p style={{ color: '#b8d4d6', fontSize: '16px', lineHeight: '1.6', marginBottom: '20px' }}>Protecting your digital assets with advanced cybersecurity solutions and cutting-edge threat detection technologies.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}><img src={gmailIcon} alt="Email" style={{ width: '20px', height: '20px', objectFit: 'contain', marginTop: '2px', opacity: 0.8 }} /><span style={{ fontSize: '15px', lineHeight: '1.5' }}>iseewaves.pk@gmail.com</span></div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}><img src={locationIcon} alt="Location" style={{ width: '20px', height: '20px', objectFit: 'contain', marginTop: '2px', opacity: 0.8 }} /><span style={{ fontSize: '15px', lineHeight: '1.5' }}>Shop # 10, Plot # 237, Banda Phugwarian,<br />Banda Batang, Abbottabad</span></div>
          </div>
        </div>
        <FooterSection title="Quick Links" links={[{ label: 'Home', href: '#home' }, { label: 'About Us', href: '/about' }, { label: 'Services', href: '/services' }, { label: 'Products', href: '/products' }, { label: 'Blog', href: '#blog' }]} />
        <FooterSection title="Company" links={[{ label: 'Contact', href: '/contact' }, { label: 'Careers', href: '/careers' }, { label: 'Our Team', href: '/careers' }, { label: 'Partners', href: '#partners' }, { label: 'News', href: '#news' }]} />
        <div>
          <FooterHeading title="Connect With Us" />
          <div style={{ display: 'flex', gap: '15px', marginTop: '10px', flexWrap: 'wrap' }}>
            {[{ href: 'https://www.instagram.com/iseewaves.pk', icon: instagramIcon, alt: 'Instagram' }, { href: 'https://m.facebook.com/iseewaves.pk', icon: facebookIcon, alt: 'Facebook' }, { href: 'https://x.com/iseewaves_', icon: twitterIcon, alt: 'X' }, { href: 'http://www.linkedin.com/company/iseewaves/', icon: linkedinIcon, alt: 'LinkedIn' }].map(s => (
              <a key={s.alt} href={s.href} target="_blank" rel="noreferrer" title={s.alt}
                style={{ width: '45px', height: '45px', background: 'rgba(243,247,236,0.1)', border: '2px solid rgba(243,247,236,0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', transition: 'all 0.3s ease' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#f3f7ec'; e.currentTarget.style.background = 'rgba(243,247,236,0.15)'; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(243,247,236,0.2)'; e.currentTarget.style.background = 'rgba(243,247,236,0.1)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                <img src={s.icon} alt={s.alt} style={{ width: '24px', height: '24px', objectFit: 'contain', opacity: 0.8 }} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div style={{ borderTop: '1px solid rgba(243,247,236,0.1)', paddingTop: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <span style={{ color: '#b8d4d6', fontSize: '14px' }}>© 2025 iSeeWaves. All rights reserved.</span>
          <div style={{ display: 'flex', gap: '30px' }}>
            {[{ label: 'Privacy Policy', href: '/privacy' }, { label: 'Terms of Policy', href: '/tos' }, { label: 'Security', href: '#security' }].map(link => (
              <a key={link.label} href={link.href} style={{ color: '#b8d4d6', textDecoration: 'none', fontSize: '14px', transition: 'color 0.3s' }}
                onMouseEnter={e => e.target.style.color = '#f3f7ec'} onMouseLeave={e => e.target.style.color = '#b8d4d6'}>{link.label}</a>
            ))}
          </div>
        </div>
      </div>
    </div>
  </footer>
);


// ════════════════════════════════════════════════════
//  HOME PAGE — sab ek saath
// ════════════════════════════════════════════════════
const Home = () => (
  <>
    <Navbar />
    <HeroCarousel />
    <AboutSection />
    <StatsBar />
    <ServicesSection />
    <WhyChooseUs />
    <AnnouncementsSection />
    <Footer />
  </>
);

export default Home;