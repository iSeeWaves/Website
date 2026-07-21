import React, { useState, useRef } from 'react';

import logo          from '../assets/images/icons/logo.png';
import gmailIcon     from '../assets/images/icons/gmail.png';
import locationIcon  from '../assets/images/icons/placeholder.png';
import instagramIcon from '../assets/images/icons/instagram.png';
import facebookIcon  from '../assets/images/icons/facebook.png';
import twitterIcon   from '../assets/images/icons/twitter.png';
import linkedinIcon  from '../assets/images/icons/linkedin.png';
import videoBg       from '../assets/images/video_bg.mp4';

const API_BASE = 'http://localhost:5009/api/recon';

const SF = "'Segoe UI', Arial, sans-serif";

const GlobalStyles = () => (
  <style>{`
    * { box-sizing: border-box; margin: 0; padding: 0; }

    @keyframes fadeUp    { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
    @keyframes scanLine  { 0%{top:0%;opacity:0} 5%{opacity:1} 95%{opacity:1} 100%{top:100%;opacity:0} }
    @keyframes ping      { 0%{transform:scale(1);opacity:1} 100%{transform:scale(2.4);opacity:0} }
    @keyframes spin      { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
    @keyframes blink     { 0%,100%{opacity:1} 50%{opacity:0} }
    @keyframes shimmer   { 0%{transform:translateX(-100%)} 100%{transform:translateX(300%)} }
    @keyframes slideIn   { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
    @keyframes glowPulse { 0%,100%{box-shadow:0 0 0 0 rgba(116,195,186,0.5)} 50%{box-shadow:0 0 0 8px rgba(116,195,186,0)} }
    @keyframes float     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
    @keyframes orbitSpin    { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
    @keyframes orbitSpinRev { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
    @keyframes radarPulse   { 0%{opacity:0.8;transform:scale(1)} 100%{opacity:0;transform:scale(2)} }
    @keyframes iconFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }

    .recon-nav-link {
      text-decoration:none; color:#F4F7EC; font-size:16px;
      font-weight:700; transition:all 0.3s; padding-bottom:3px;
    }
    .recon-nav-link:hover { color:#fff; border-bottom:2px solid #fff; }

    .rtab {
      padding:10px 18px; border-radius:50px; font-family:${SF};
      border:1.5px solid rgba(116,195,186,0.2); background:transparent;
      color:rgba(255,255,255,0.45); font-size:12px; font-weight:700;
      cursor:pointer; transition:all 0.25s; letter-spacing:0.5px;
      display:flex; align-items:center; gap:6px; position:relative;
    }
    .rtab:hover { color:#74C3BA; border-color:rgba(116,195,186,0.5); }
    .rtab.active {
      background:linear-gradient(135deg,#306F74,#74C3BA);
      color:#fff; border-color:transparent;
      box-shadow:0 4px 20px rgba(48,111,116,0.45);
    }

    .rinput {
      width:100%; padding:15px 20px; font-family:${SF};
      background:rgba(255,255,255,0.05);
      border:1.5px solid rgba(116,195,186,0.2);
      border-radius:14px; color:#e8f5f3; font-size:14px; outline:none;
      transition:all 0.3s;
    }
    .rinput:focus { border-color:#74C3BA; background:rgba(116,195,186,0.08); box-shadow:0 0 0 4px rgba(116,195,186,0.1); }
    .rinput::placeholder { color:rgba(116,195,186,0.3); }

    .rbtn {
      padding:15px 32px; border-radius:14px; border:none; cursor:pointer;
      background:linear-gradient(135deg,#306F74,#74C3BA); color:white;
      font-weight:800; font-size:14px; font-family:${SF};
      box-shadow:0 6px 24px rgba(48,111,116,0.4);
      transition:all 0.3s; display:inline-flex; align-items:center; gap:9px;
      white-space:nowrap;
    }
    .rbtn:hover:not(:disabled) { transform:translateY(-2px); box-shadow:0 10px 32px rgba(48,111,116,0.55); }
    .rbtn:disabled { opacity:0.45; cursor:not-allowed; }

    .rbtn-ghost {
      padding:10px 16px; border-radius:12px;
      border:1.5px solid rgba(116,195,186,0.25);
      background:rgba(116,195,186,0.06); color:#74C3BA;
      font-weight:700; font-size:12px; font-family:${SF};
      cursor:pointer; transition:all 0.25s;
      display:inline-flex; align-items:center; gap:7px;
    }
    .rbtn-ghost:hover { background:rgba(116,195,186,0.14); border-color:#74C3BA; }

    .rbtn-dl {
      padding:10px 18px; border-radius:12px;
      border:1.5px solid rgba(116,195,186,0.3);
      background:rgba(116,195,186,0.08); color:#74C3BA;
      font-weight:700; font-size:12px; font-family:${SF};
      cursor:pointer; transition:all 0.25s;
      display:inline-flex; align-items:center; gap:7px;
    }
    .rbtn-dl:hover { background:rgba(116,195,186,0.18); border-color:#74C3BA; color:#fff; }
    .rbtn-dl.selected {
      background:linear-gradient(135deg,#306F74,#74C3BA);
      color:#fff; border-color:transparent;
      box-shadow:0 4px 16px rgba(48,111,116,0.4);
    }

    .rrow {
      display:flex; gap:12px; padding:12px 18px;
      border-radius:12px; align-items:center;
      background:rgba(116,195,186,0.04);
      border:1px solid rgba(116,195,186,0.08);
      transition:all 0.2s; animation:slideIn 0.3s ease both;
    }
    .rrow:hover { background:rgba(116,195,186,0.09); border-color:rgba(116,195,186,0.22); }

    .tline { font-family:'Courier New',monospace; font-size:13px; line-height:2; color:#74C3BA; animation:fadeUp 0.2s ease both; }
    .tline.dim  { color:rgba(116,195,186,0.35); }
    .tline.done { color:#52c97a; font-weight:700; }
    .tline.warn { color:#f0a500; }
    .tline.err  { color:#ff4d4d; }

    .footer-link { color:#b8d4d6; text-decoration:none; font-size:15px; display:inline-block; transition:all 0.3s ease; }
    .footer-link:hover { color:#f3f7ec; transform:translateX(8px); }

    table { border-collapse:collapse; width:100%; }
    th { padding:12px 16px; text-align:left; font-size:11px; font-weight:700; letter-spacing:2px; text-transform:uppercase; color:rgba(116,195,186,0.45); border-bottom:1px solid rgba(116,195,186,0.1); background:rgba(116,195,186,0.04); }
    td { padding:11px 16px; font-size:13px; border-bottom:1px solid rgba(116,195,186,0.06); transition:background 0.2s; }
    tr:hover td { background:rgba(116,195,186,0.04); }

    .orbit-spinner { position:relative; display:inline-flex; align-items:center; justify-content:center; }
    .orbit-ring { position:absolute; border-radius:50%; border:2px solid transparent; }
    .orbit-ring-1 { width:60px; height:60px; border-top-color:#74C3BA; border-right-color:rgba(116,195,186,0.3); animation:orbitSpin 1s linear infinite; }
    .orbit-ring-2 { width:44px; height:44px; border-bottom-color:#306F74; border-left-color:rgba(48,111,116,0.3); animation:orbitSpinRev 0.7s linear infinite; }
    .orbit-ring-3 { width:28px; height:28px; border-top-color:#52c97a; animation:orbitSpin 0.5s linear infinite; }
    .orbit-core { width:10px; height:10px; border-radius:50%; background:radial-gradient(circle,#74C3BA,#306F74); box-shadow:0 0 10px rgba(116,195,186,0.8); animation:glowPulse 1s infinite; }
    .orbit-pulse { position:absolute; width:70px; height:70px; border-radius:50%; border:1px solid rgba(116,195,186,0.2); animation:radarPulse 2s ease-out infinite; }

    .report-overlay {
      position:fixed; inset:0; background:rgba(0,0,0,0.85);
      z-index:9999; display:flex; align-items:center; justify-content:center;
      animation:fadeUp 0.3s ease; backdrop-filter:blur(6px);
    }
    .report-modal {
      background:#0d1f24; border:1px solid rgba(116,195,186,0.25);
      border-radius:24px; padding:40px; max-width:480px; width:90%;
      box-shadow:0 30px 80px rgba(0,0,0,0.6);
    }

    .feat-card {
      border-radius:20px; padding:32px 26px;
      transition:all 0.35s ease; cursor:default;
      position:relative; overflow:hidden;
    }
    .feat-card:hover { transform:translateY(-8px); }
    .feat-card:hover .feat-icon { animation:iconFloat 1.5s ease-in-out infinite; }
    .feat-icon {
      width:56px; height:56px; border-radius:16px;
      display:flex; align-items:center; justifyContent:center;
      margin-bottom:20px; position:relative; z-index:1;
    }
  `}</style>
);

// ══════ NAVBAR ══════
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  React.useEffect(() => {
    const h = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);
  return (
    <header style={{ backgroundColor:'#306F74', padding:'0 50px', position:'fixed', width:'100%', top:0, zIndex:1000, boxShadow:scrolled?'0 2px 20px rgba(0,0,0,0.35)':'0 2px 10px rgba(0,0,0,0.2)', transition:'box-shadow 0.3s', fontFamily:SF }}>
      <nav style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <img src={logo} alt="iSeeWaves" style={{ height:'90px', borderRadius:'8px' }} />
        <ul style={{ display:'flex', listStyle:'none', margin:0, padding:0 }}>
          {[['Products','/products'],['Services','/services'],['About Us','/about'],['Regulations','/regulations'],['Contact','/contact'],['Careers','/careers']].map(([label,href]) => (
            <li key={label} style={{ marginRight:'20px' }}>
              <a href={href} className="recon-nav-link">{label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

// ══════ HERO ══════
const HeroSection = () => (
  <section style={{ marginTop:'90px', minHeight:'100vh', position:'relative', overflow:'hidden', display:'flex', alignItems:'center', fontFamily:SF }}>
    <video autoPlay muted loop playsInline style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', zIndex:0, filter:'brightness(0.4)' }}>
      <source src={videoBg} type="video/mp4" />
    </video>
    <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg, rgba(8,25,30,0.75) 0%, rgba(20,65,70,0.55) 50%, rgba(8,25,30,0.8) 100%)', zIndex:1 }} />
    <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(116,195,186,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(116,195,186,0.035) 1px,transparent 1px)', backgroundSize:'60px 60px', zIndex:2, pointerEvents:'none' }} />
    <div style={{ position:'absolute', left:0, right:0, height:'1.5px', background:'linear-gradient(90deg,transparent,rgba(116,195,186,0.5),transparent)', animation:'scanLine 6s linear infinite', zIndex:3, pointerEvents:'none' }} />
    <div style={{ position:'absolute', left:0, top:0, bottom:0, width:'3px', background:'linear-gradient(180deg,transparent,#74C3BA,#306F74,transparent)', zIndex:4 }} />

    <div style={{ position:'relative', zIndex:5, padding:'80px 90px', maxWidth:'900px' }}>
      <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'28px', animation:'fadeUp 0.5s ease both' }}>
        <span style={{ width:'28px', height:'1.5px', background:'#74C3BA', display:'inline-block' }} />
        <a href="/" style={{ color:'rgba(255,255,255,0.4)', textDecoration:'none', fontSize:'11px', letterSpacing:'2px', textTransform:'uppercase', fontWeight:'600' }}>Home</a>
        <span style={{ color:'rgba(255,255,255,0.2)' }}>›</span>
        <a href="/services" style={{ color:'rgba(255,255,255,0.4)', textDecoration:'none', fontSize:'11px', letterSpacing:'2px', textTransform:'uppercase', fontWeight:'600' }}>Services</a>
        <span style={{ color:'rgba(255,255,255,0.2)' }}>›</span>
        <span style={{ color:'#74C3BA', fontSize:'11px', letterSpacing:'2px', textTransform:'uppercase', fontWeight:'800' }}>Reconnaissance</span>
      </div>

      <div style={{ display:'inline-flex', alignItems:'center', gap:'10px', background:'rgba(116,195,186,0.1)', border:'1px solid rgba(116,195,186,0.3)', borderRadius:'50px', padding:'8px 20px', marginBottom:'28px', animation:'fadeUp 0.6s ease 0.1s both' }}>
        <div style={{ position:'relative' }}>
          <div style={{ width:'9px', height:'9px', borderRadius:'50%', background:'#74C3BA' }} />
          <div style={{ position:'absolute', inset:0, borderRadius:'50%', background:'#74C3BA', animation:'ping 1.8s ease-in-out infinite' }} />
        </div>
        <span style={{ fontSize:'11px', fontWeight:'800', letterSpacing:'3px', textTransform:'uppercase', color:'#74C3BA' }}>Live — Intelligence Module v2.4</span>
      </div>

      <h1 style={{ fontFamily:SF, fontWeight:'900', margin:'0 0 16px', animation:'fadeUp 0.7s ease 0.2s both' }}>
        <span style={{ fontSize:'clamp(3.5rem,8vw,7rem)', color:'#fff', display:'block', lineHeight:1, letterSpacing:'-3px' }}>Reconnaissance</span>
        <span style={{ fontSize:'clamp(1.5rem,3.5vw,2.8rem)', color:'#74C3BA', display:'block', letterSpacing:'-1px', fontWeight:'700', lineHeight:1.3, position:'relative' }}>
          Intelligence Gathering Tool
          <span style={{ position:'absolute', bottom:'-4px', left:0, width:'55%', height:'3px', background:'linear-gradient(90deg,#74C3BA,transparent)', borderRadius:'2px', overflow:'hidden' }}>
            <span style={{ position:'absolute', inset:0, background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.7),transparent)', animation:'shimmer 2.5s ease-in-out infinite' }} />
          </span>
        </span>
      </h1>

      <p style={{ fontSize:'17px', color:'rgba(255,255,255,0.5)', maxWidth:'580px', lineHeight:1.85, animation:'fadeUp 0.8s ease 0.3s both', marginBottom:'40px' }}>
        Passive and active intelligence gathering — WHOIS lookups, DNS enumeration, subdomain discovery, port scanning, banner grabbing, and technology detection with real-time results and automated report generation.
      </p>

      <div style={{ display:'flex', gap:'0', animation:'fadeUp 0.9s ease 0.4s both', marginBottom:'44px' }}>
        {[['6','Scan Modules'],['20+','Recon Techniques'],['Real-Time','Live Results'],['TXT/HTML/PDF','Export Ready']].map(([num,label],i) => (
          <React.Fragment key={label}>
            <div style={{ textAlign:'center', padding:'0 28px' }}>
              <div style={{ fontSize:'1.8rem', fontWeight:'900', color:'#74C3BA', lineHeight:1, letterSpacing:'-1px' }}>{num}</div>
              <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.38)', letterSpacing:'1px', marginTop:'4px', textTransform:'uppercase' }}>{label}</div>
            </div>
            {i < 3 && <div style={{ width:'1px', background:'rgba(116,195,186,0.15)', alignSelf:'stretch' }} />}
          </React.Fragment>
        ))}
      </div>

      <div style={{ display:'flex', gap:'16px', flexWrap:'wrap', animation:'fadeUp 1s ease 0.5s both' }}>
        <a href="#tool" style={{ padding:'16px 36px', borderRadius:'50px', background:'linear-gradient(135deg,#306F74,#74C3BA)', color:'white', textDecoration:'none', fontWeight:'800', fontSize:'15px', display:'inline-flex', alignItems:'center', gap:'10px', boxShadow:'0 8px 28px rgba(48,111,116,0.45)', transition:'all 0.3s' }}
          onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow='0 14px 38px rgba(48,111,116,0.6)'; }}
          onMouseLeave={e=>{ e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 8px 28px rgba(48,111,116,0.45)'; }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          Start Scanning
        </a>
        <a href="/services" style={{ padding:'16px 36px', borderRadius:'50px', border:'1.5px solid rgba(116,195,186,0.35)', color:'rgba(255,255,255,0.8)', textDecoration:'none', fontWeight:'700', fontSize:'15px', display:'inline-flex', alignItems:'center', gap:'10px', transition:'all 0.3s' }}
          onMouseEnter={e=>{ e.currentTarget.style.background='rgba(116,195,186,0.1)'; e.currentTarget.style.borderColor='#74C3BA'; e.currentTarget.style.color='#fff'; }}
          onMouseLeave={e=>{ e.currentTarget.style.background='transparent'; e.currentTarget.style.borderColor='rgba(116,195,186,0.35)'; e.currentTarget.style.color='rgba(255,255,255,0.8)'; }}>
          ← Back to Services
        </a>
      </div>
    </div>

    <div style={{ position:'absolute', right:'6%', top:'50%', transform:'translateY(-50%)', zIndex:3, opacity:0.12, pointerEvents:'none', animation:'float 5s ease-in-out infinite' }}>
      <svg width="320" height="320" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="48" stroke="#74C3BA" strokeWidth="0.8"/>
        <circle cx="50" cy="50" r="36" stroke="#74C3BA" strokeWidth="0.6"/>
        <circle cx="50" cy="50" r="24" stroke="#74C3BA" strokeWidth="0.5"/>
        <circle cx="50" cy="50" r="12" stroke="#74C3BA" strokeWidth="0.5"/>
        <circle cx="50" cy="50" r="3"  fill="#74C3BA"/>
        <line x1="50" y1="2" x2="50" y2="98" stroke="#74C3BA" strokeWidth="0.4" strokeDasharray="2 4"/>
        <line x1="2" y1="50" x2="98" y2="50" stroke="#74C3BA" strokeWidth="0.4" strokeDasharray="2 4"/>
        <line x1="15" y1="15" x2="85" y2="85" stroke="#74C3BA" strokeWidth="0.3" strokeDasharray="2 6"/>
        <line x1="85" y1="15" x2="15" y2="85" stroke="#74C3BA" strokeWidth="0.3" strokeDasharray="2 6"/>
        <circle cx="50" cy="2" r="2" fill="#74C3BA"/>
        <circle cx="50" cy="98" r="2" fill="#74C3BA"/>
        <circle cx="2" cy="50" r="2" fill="#74C3BA"/>
        <circle cx="98" cy="50" r="2" fill="#74C3BA"/>
      </svg>
    </div>

    <div style={{ position:'absolute', bottom:'32px', left:'50%', transform:'translateX(-50%)', zIndex:5, display:'flex', flexDirection:'column', alignItems:'center', gap:'6px' }}>
      <span style={{ fontSize:'10px', color:'rgba(116,195,186,0.4)', letterSpacing:'3px', textTransform:'uppercase' }}>Scroll</span>
      <div style={{ width:'1px', height:'40px', background:'linear-gradient(180deg,rgba(116,195,186,0.5),transparent)' }} />
    </div>
  </section>
);

// ══════ FEATURE CARDS ══════
const FeatureCards = () => {
  const features = [
    {
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#74C3BA" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          <line x1="11" y1="8" x2="11" y2="14"/>
          <line x1="8" y1="11" x2="14" y2="11"/>
        </svg>
      ),
      iconBg: 'linear-gradient(135deg, rgba(116,195,186,0.25), rgba(48,111,116,0.15))',
      iconBorder: 'rgba(116,195,186,0.35)',
      iconGlow: 'rgba(116,195,186,0.15)',
      cardBg: 'linear-gradient(145deg, rgba(116,195,186,0.08) 0%, rgba(8,15,18,0.6) 100%)',
      cardBorder: 'rgba(116,195,186,0.2)',
      cardGlow: 'rgba(116,195,186,0.06)',
      title: 'WHOIS Lookup',
      desc: 'Domain registration details, registrar info, creation/expiry dates, nameservers and registrant data.',
    },
    {
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="2" y1="12" x2="22" y2="12"/>
          <path d="M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/>
        </svg>
      ),
      iconBg: 'linear-gradient(135deg, rgba(96,165,250,0.25), rgba(59,130,246,0.12))',
      iconBorder: 'rgba(96,165,250,0.35)',
      iconGlow: 'rgba(96,165,250,0.15)',
      cardBg: 'linear-gradient(145deg, rgba(96,165,250,0.08) 0%, rgba(8,15,18,0.6) 100%)',
      cardBorder: 'rgba(96,165,250,0.2)',
      cardGlow: 'rgba(96,165,250,0.06)',
      title: 'DNS Enumeration',
      desc: 'Complete DNS record mapping — A, MX, NS, TXT, CNAME, SOA records for full network footprinting.',
    },
    {
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="3 11 22 2 13 21 11 13 3 11"/>
        </svg>
      ),
      iconBg: 'linear-gradient(135deg, rgba(167,139,250,0.25), rgba(139,92,246,0.12))',
      iconBorder: 'rgba(167,139,250,0.35)',
      iconGlow: 'rgba(167,139,250,0.15)',
      cardBg: 'linear-gradient(145deg, rgba(167,139,250,0.08) 0%, rgba(8,15,18,0.6) 100%)',
      cardBorder: 'rgba(167,139,250,0.2)',
      cardGlow: 'rgba(167,139,250,0.06)',
      title: 'Subdomain Discovery',
      desc: 'Passive enumeration via certificate transparency logs (crt.sh) and AlienVault OTX with live host verification.',
    },
    {
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#f472b6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/>
          <rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
          <line x1="6" y1="6" x2="6.01" y2="6"/>
          <line x1="6" y1="18" x2="6.01" y2="18"/>
        </svg>
      ),
      iconBg: 'linear-gradient(135deg, rgba(244,114,182,0.25), rgba(236,72,153,0.12))',
      iconBorder: 'rgba(244,114,182,0.35)',
      iconGlow: 'rgba(244,114,182,0.15)',
      cardBg: 'linear-gradient(145deg, rgba(244,114,182,0.08) 0%, rgba(8,15,18,0.6) 100%)',
      cardBorder: 'rgba(244,114,182,0.2)',
      cardGlow: 'rgba(244,114,182,0.06)',
      title: 'Port Scanner',
      desc: 'Probe common/registered ports, grab service banners, fingerprint versions and assess risk exposure.',
    },
    {
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fb923c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
        </svg>
      ),
      iconBg: 'linear-gradient(135deg, rgba(251,146,60,0.25), rgba(249,115,22,0.12))',
      iconBorder: 'rgba(251,146,60,0.35)',
      iconGlow: 'rgba(251,146,60,0.15)',
      cardBg: 'linear-gradient(145deg, rgba(251,146,60,0.08) 0%, rgba(8,15,18,0.6) 100%)',
      cardBorder: 'rgba(251,146,60,0.2)',
      cardGlow: 'rgba(251,146,60,0.06)',
      title: 'Banner Grabbing',
      desc: 'Extract real service banners from open ports to identify software versions, OS info and potential CVEs.',
    },
    {
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"/>
          <path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14"/>
          <path d="M15.54 8.46a5 5 0 010 7.07M8.46 8.46a5 5 0 000 7.07"/>
        </svg>
      ),
      iconBg: 'linear-gradient(135deg, rgba(52,211,153,0.25), rgba(16,185,129,0.12))',
      iconBorder: 'rgba(52,211,153,0.35)',
      iconGlow: 'rgba(52,211,153,0.15)',
      cardBg: 'linear-gradient(145deg, rgba(52,211,153,0.08) 0%, rgba(8,15,18,0.6) 100%)',
      cardBorder: 'rgba(52,211,153,0.2)',
      cardGlow: 'rgba(52,211,153,0.06)',
      title: 'Technology Detection',
      desc: 'Fingerprint web technologies, CMS, frameworks and libraries using live header analysis and HTML patterns.',
    },
  ];

  return (
    <section style={{ background:'#080f12', padding:'80px 60px 40px', fontFamily:SF }}>
      <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:'50px' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'rgba(116,195,186,0.08)', border:'1px solid rgba(116,195,186,0.18)', borderRadius:'50px', padding:'7px 20px', marginBottom:'14px' }}>
            <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#74C3BA', display:'inline-block' }} />
            <span style={{ fontSize:'11px', fontWeight:'700', letterSpacing:'3px', textTransform:'uppercase', color:'#74C3BA' }}>Capabilities</span>
          </div>
          <h2 style={{ fontSize:'2.4rem', fontWeight:'900', color:'#fff', letterSpacing:'-1px', margin:0 }}>
            Six Powerful <span style={{ color:'#74C3BA' }}>Recon Modules</span>
          </h2>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'20px' }}>
          {features.map((f, i) => (
            <div
              key={i}
              className="feat-card"
              style={{
                background: f.cardBg,
                border: `1px solid ${f.cardBorder}`,
                animation: `fadeUp 0.5s ease ${i * 0.08}s both`,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = `0 24px 48px rgba(0,0,0,0.4), 0 0 0 1px ${f.cardBorder}`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Background glow blob */}
              <div style={{
                position: 'absolute', top: '-30px', right: '-30px',
                width: '120px', height: '120px', borderRadius: '50%',
                background: f.iconGlow, filter: 'blur(30px)',
                pointerEvents: 'none',
              }} />

              {/* Top accent line */}
              <div style={{
                position: 'absolute', top: 0, left: '20%', right: '20%', height: '2px',
                background: `linear-gradient(90deg, transparent, ${f.iconBorder}, transparent)`,
                borderRadius: '0 0 4px 4px',
              }} />

              {/* Icon */}
              <div className="feat-icon" style={{
                background: f.iconBg,
                border: `1px solid ${f.iconBorder}`,
                boxShadow: `0 4px 20px ${f.iconGlow}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {f.icon}
              </div>

              <h3 style={{ fontSize:'1rem', fontWeight:'800', color:'#fff', margin:'0 0 10px', letterSpacing:'-0.3px', position:'relative', zIndex:1 }}>
                {f.title}
              </h3>
              <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.42)', lineHeight:1.75, margin:0, position:'relative', zIndex:1 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ══════ ORBIT SPINNER ══════
const OrbitSpinner = ({ label }) => (
  <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'20px', padding:'48px 20px' }}>
    <div className="orbit-spinner" style={{ width:'70px', height:'70px' }}>
      <div className="orbit-pulse" />
      <div className="orbit-ring orbit-ring-1" />
      <div className="orbit-ring orbit-ring-2" />
      <div className="orbit-ring orbit-ring-3" />
      <div className="orbit-core" />
    </div>
    <div style={{ textAlign:'center' }}>
      <p style={{ fontSize:'13px', color:'rgba(116,195,186,0.6)', letterSpacing:'2px', textTransform:'uppercase', fontFamily:'Courier New', animation:'blink 1.5s infinite', margin:'0 0 4px' }}>{label}</p>
      <p style={{ fontSize:'11px', color:'rgba(116,195,186,0.25)', fontFamily:'Courier New', margin:0 }}>Fetching live data from backend…</p>
    </div>
  </div>
);

const riskColor = { Low:'#52c97a', Medium:'#f0a500', High:'#ff8c42', Critical:'#ff4d4d' };
const riskBg    = { Low:'rgba(82,201,122,0.1)', Medium:'rgba(240,165,0,0.1)', High:'rgba(255,140,66,0.1)', Critical:'rgba(255,77,77,0.1)' };
const confColor = { High:'#52c97a', Medium:'#f0a500', Low:'#ff8c42' };

const tabs = [
  { id:'whois',     label:'WHOIS',       icon:'🔍', placeholder:'Enter domain (e.g. google.com)',         group:'Passive' },
  { id:'dns',       label:'DNS',         icon:'🌐', placeholder:'Enter domain (e.g. google.com)',         group:'Passive' },
  { id:'subdomain', label:'Subdomains',  icon:'🗺️', placeholder:'Enter domain (e.g. google.com)',         group:'Passive' },
  { id:'port',      label:'Port Scan',   icon:'🔌', placeholder:'Enter IP or domain (e.g. 8.8.8.8)',      group:'Active' },
  { id:'banner',    label:'Banner Grab', icon:'🏷️', placeholder:'Enter IP or domain (e.g. 8.8.8.8)',      group:'Active' },
  { id:'tech',      label:'Tech Detect', icon:'⚙️', placeholder:'Enter URL or domain (e.g. example.com)', group:'Active' },
];

async function apiWhois(target) {
  const r = await fetch(`${API_BASE}/whois`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({target}) });
  const json = await r.json();
  if (!r.ok) throw new Error(json.error || 'WHOIS failed');
  return json;
}
async function apiDns(target) {
  const r = await fetch(`${API_BASE}/dns`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({target}) });
  const json = await r.json();
  if (!r.ok) throw new Error(json.error || 'DNS failed');
  return json;
}
async function apiSubdomains(target) {
  const r = await fetch(`${API_BASE}/subdomains`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({target}) });
  const json = await r.json();
  if (!r.ok) throw new Error(json.error || 'Subdomain enum failed');
  return json;
}
async function apiPorts(target) {
  const r = await fetch(`${API_BASE}/ports`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({target}) });
  const json = await r.json();
  if (!r.ok) throw new Error(json.error || 'Port scan failed');
  return json.ports || json;
}
async function apiBanners(target) {
  const r = await fetch(`${API_BASE}/banners`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({target}) });
  const json = await r.json();
  if (!r.ok) throw new Error(json.error || 'Banner grab failed');
  return json;
}
async function apiTech(target) {
  const r = await fetch(`${API_BASE}/tech`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({target}) });
  const json = await r.json();
  if (!r.ok) throw new Error(json.error || 'Tech detect failed');
  return json;
}

const allSteps = {
  whois:     ['Initializing WHOIS query…','Connecting to IANA root server…','Querying regional NIC database…','Fetching registrar details…','Parsing registration records…'],
  dns:       ['Starting DNS enumeration…','Querying A and AAAA records…','Checking MX mail exchangers…','Fetching NS nameservers…','Resolving TXT, CNAME, SOA…'],
  subdomain: ['Loading certificate transparency logs (crt.sh)…','Querying AlienVault OTX passive DNS…','Collecting unique hostnames…','Probing live hosts (threaded)…','Filtering and sorting results…'],
  port:      ['Initializing port scanner…','Probing well-known ports (threaded)…','Scanning registered ports…','Fingerprinting open services…','Grabbing service banners…'],
  banner:    ['Connecting to open ports…','Sending raw probe packets…','Receiving service banners…','Parsing TLS certificates…','Cross-referencing banners…'],
  tech:      ['Fetching HTTP headers…','Analyzing HTML source patterns…','Checking JavaScript libraries…','Fingerprinting CMS signatures…','Correlating technology stack…'],
};

const generateTXT = (target, timestamp, allResults) => {
  let out = '';
  out += '='.repeat(60) + '\n';
  out += '  iSeeWaves — Reconnaissance Report\n';
  out += '='.repeat(60) + '\n';
  out += `Target   : ${target}\n`;
  out += `Timestamp: ${timestamp}\n`;
  out += `Generated: iSeeWaves Intelligence Module v2.4\n`;
  out += '='.repeat(60) + '\n\n';
  if (allResults.whois) { out += '[WHOIS LOOKUP]\n' + '-'.repeat(40) + '\n'; Object.entries(allResults.whois).forEach(([k,v]) => { out += `${k.padEnd(20)}: ${v}\n`; }); out += '\n'; }
  if (allResults.dns) { out += '[DNS ENUMERATION]\n' + '-'.repeat(40) + '\n'; out += 'Type     Value                          TTL     Priority\n'; allResults.dns.forEach(r => { out += `${r.type.padEnd(8)} ${r.value.padEnd(30)} ${r.ttl.padEnd(7)} ${r.pri}\n`; }); out += '\n'; }
  if (allResults.subdomain) { out += '[SUBDOMAIN DISCOVERY]\n' + '-'.repeat(40) + '\n'; allResults.subdomain.forEach(r => { out += `${r.sub.padEnd(35)} ${r.ip.padEnd(18)} ${r.status.padEnd(10)} ${r.http}\n`; }); out += '\n'; }
  if (allResults.port) { out += '[PORT SCAN]\n' + '-'.repeat(40) + '\n'; allResults.port.forEach(r => { out += `Port ${String(r.port).padEnd(6)} ${r.svc.padEnd(12)} ${r.state.padEnd(8)} Risk:${r.risk.padEnd(10)} ${r.banner}\n`; }); out += '\n'; }
  if (allResults.banner) { out += '[BANNER GRABBING]\n' + '-'.repeat(40) + '\n'; allResults.banner.forEach(r => { out += `Port ${r.port} (${r.svc}): ${r.info}\nRaw: ${r.raw}\n\n`; }); }
  if (allResults.tech) { out += '[TECHNOLOGY DETECTION]\n' + '-'.repeat(40) + '\n'; allResults.tech.forEach(r => { out += `${r.category.padEnd(16)} ${r.tech.padEnd(20)} v${r.version.padEnd(10)} Confidence: ${r.confidence}\n`; }); out += '\n'; }
  out += '='.repeat(60) + '\n';
  out += 'End of Report — iSeeWaves Pvt Ltd | iseewaves.pk@gmail.com\n';
  out += '='.repeat(60) + '\n';
  return out;
};

const generateHTML = (target, timestamp, allResults) => {
  const section = (title, content) => `<div class="section"><div class="sec-title">${title}</div>${content}</div>`;
  const whoisHTML = allResults.whois ? section('WHOIS Lookup', `<table>${Object.entries(allResults.whois).map(([k,v]) => `<tr><td class="key">${k}</td><td>${v}</td></tr>`).join('')}</table>`) : '';
  const dnsHTML = allResults.dns ? section('DNS Enumeration', `<table><thead><tr><th>Type</th><th>Value</th><th>TTL</th><th>Priority</th></tr></thead><tbody>${allResults.dns.map(r => `<tr><td><span class="badge">${r.type}</span></td><td>${r.value}</td><td>${r.ttl}s</td><td>${r.pri}</td></tr>`).join('')}</tbody></table>`) : '';
  const subHTML = allResults.subdomain ? section('Subdomain Discovery', `<table><thead><tr><th>Subdomain</th><th>IP</th><th>HTTP</th><th>Status</th></tr></thead><tbody>${allResults.subdomain.map(r => `<tr><td>${r.sub}</td><td>${r.ip}</td><td>${r.http}</td><td><span class="status ${r.status==='Active'?'ok':'bad'}">${r.status}</span></td></tr>`).join('')}</tbody></table>`) : '';
  const portHTML = allResults.port ? section('Port Scan', `<table><thead><tr><th>Port</th><th>Service</th><th>State</th><th>Banner</th><th>Risk</th></tr></thead><tbody>${allResults.port.map(r => `<tr><td><b>${r.port}</b></td><td>${r.svc}</td><td><span class="status ${r.state==='Open'?'ok':'bad'}">${r.state}</span></td><td>${r.banner}</td><td><span class="risk r${r.risk}">${r.risk}</span></td></tr>`).join('')}</tbody></table>`) : '';
  const bannerHTML = allResults.banner ? section('Banner Grabbing', allResults.banner.map(r => `<div class="banner-block"><div class="bn-title">Port ${r.port} — ${r.svc}: <b>${r.info}</b></div><pre>${r.raw}</pre></div>`).join('')) : '';
  const techHTML = allResults.tech ? section('Technology Detection', `<table><thead><tr><th>Category</th><th>Technology</th><th>Version</th><th>Confidence</th></tr></thead><tbody>${allResults.tech.map(r => `<tr><td>${r.icon} ${r.category}</td><td><b>${r.tech}</b></td><td>${r.version}</td><td><span class="conf c${r.confidence}">${r.confidence}</span></td></tr>`).join('')}</tbody></table>`) : '';
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Recon Report — ${target}</title><style>body{margin:0;font-family:'Segoe UI',Arial,sans-serif;background:#080f12;color:#e8f5f3}.header{background:linear-gradient(135deg,#306F74,#74C3BA);padding:36px 48px;color:#fff}.header h1{margin:0;font-size:2rem;letter-spacing:-1px}.header .meta{margin-top:10px;opacity:0.8;font-size:13px}.body{padding:32px 48px;max-width:960px;margin:0 auto}.section{margin-bottom:36px;border:1px solid rgba(116,195,186,0.15);border-radius:14px;overflow:hidden}.sec-title{background:rgba(116,195,186,0.08);padding:14px 20px;font-size:11px;font-weight:800;letter-spacing:3px;text-transform:uppercase;color:#74C3BA;border-bottom:1px solid rgba(116,195,186,0.1)}table{width:100%;border-collapse:collapse}th{padding:10px 16px;text-align:left;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:rgba(116,195,186,0.45);border-bottom:1px solid rgba(116,195,186,0.1);background:rgba(116,195,186,0.04)}td{padding:10px 16px;font-size:13px;border-bottom:1px solid rgba(116,195,186,0.05)}tr:last-child td{border-bottom:none}td.key{color:rgba(116,195,186,0.6);font-size:12px;font-weight:600;font-family:monospace;min-width:160px}.badge{background:rgba(116,195,186,0.12);color:#74C3BA;padding:2px 8px;border-radius:4px;font-size:11px;font-weight:800;font-family:monospace}.status.ok{color:#52c97a;background:rgba(82,201,122,0.1);padding:2px 8px;border-radius:4px;font-size:11px;font-weight:700}.status.bad{color:rgba(116,195,186,0.4);background:rgba(116,195,186,0.06);padding:2px 8px;border-radius:4px;font-size:11px;font-weight:700}.risk{padding:2px 8px;border-radius:4px;font-size:11px;font-weight:700}.rLow{color:#52c97a;background:rgba(82,201,122,0.1)}.rMedium{color:#f0a500;background:rgba(240,165,0,0.1)}.rHigh{color:#ff8c42;background:rgba(255,140,66,0.1)}.rCritical{color:#ff4d4d;background:rgba(255,77,77,0.1)}.conf{padding:2px 8px;border-radius:4px;font-size:11px;font-weight:700}.cHigh{color:#52c97a;background:rgba(82,201,122,0.1)}.cMedium{color:#f0a500;background:rgba(240,165,0,0.1)}.cLow{color:#ff8c42;background:rgba(255,140,66,0.1)}.banner-block{padding:16px 20px;border-bottom:1px solid rgba(116,195,186,0.06)}.banner-block:last-child{border-bottom:none}.bn-title{font-size:13px;margin-bottom:8px;color:#e8f5f3}pre{background:rgba(0,0,0,0.4);border-radius:8px;padding:12px;font-size:12px;color:#74C3BA;margin:0;white-space:pre-wrap;word-break:break-all}.footer{text-align:center;padding:24px;font-size:12px;color:rgba(116,195,186,0.3);border-top:1px solid rgba(116,195,186,0.1);margin-top:40px}</style></head><body><div class="header"><h1>🔍 Reconnaissance Report</h1><div class="meta"><b>Target:</b> ${target} &nbsp;|&nbsp; <b>Timestamp:</b> ${timestamp} &nbsp;|&nbsp; <b>Tool:</b> iSeeWaves Intelligence Module v2.4</div></div><div class="body">${whoisHTML}${dnsHTML}${subHTML}${portHTML}${bannerHTML}${techHTML}</div><div class="footer">iSeeWaves Pvt Ltd — iseewaves.pk@gmail.com | All Rights Reserved © 2025</div></body></html>`;
};

// ══════ REPORT MODAL ══════
const ReportModal = ({ allResults, target, onClose }) => {
  const [fmt, setFmt] = useState('html');
  const [downloading, setDownloading] = useState(false);
  const timestamp = new Date().toISOString().replace('T',' ').slice(0,19) + ' UTC';
  const hasAny = Object.values(allResults).some(v => v !== null && v !== undefined);

  const doDownload = async () => {
    setDownloading(true);
    await new Promise(r => setTimeout(r, 600));
    if (fmt === 'txt') {
      const txt = generateTXT(target, timestamp, allResults);
      const blob = new Blob([txt], { type:'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href=url; a.download=`recon_${target}_${Date.now()}.txt`; a.click(); URL.revokeObjectURL(url);
    } else if (fmt === 'html') {
      const html = generateHTML(target, timestamp, allResults);
      const blob = new Blob([html], { type:'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href=url; a.download=`recon_${target}_${Date.now()}.html`; a.click(); URL.revokeObjectURL(url);
    } else {
      const html = generateHTML(target, timestamp, allResults);
      const blob = new Blob([html], { type:'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const w = window.open(url, '_blank');
      if (w) { w.onload = () => setTimeout(() => { w.focus(); w.print(); }, 600); }
      setTimeout(() => URL.revokeObjectURL(url), 10000);
    }
    setDownloading(false);
    onClose();
  };

  return (
    <div className="report-overlay" onClick={e=>{ if(e.target===e.currentTarget) onClose(); }}>
      <div className="report-modal">
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'28px' }}>
          <div>
            <div style={{ fontSize:'11px', color:'#74C3BA', letterSpacing:'3px', textTransform:'uppercase', fontWeight:'800', marginBottom:'6px' }}>Generate Report</div>
            <h3 style={{ color:'#fff', fontSize:'1.4rem', fontWeight:'900', margin:0 }}>Download Recon Data</h3>
          </div>
          <button onClick={onClose} style={{ background:'rgba(116,195,186,0.1)', border:'1px solid rgba(116,195,186,0.2)', borderRadius:'10px', width:'36px', height:'36px', cursor:'pointer', color:'#74C3BA', fontSize:'18px', display:'flex', alignItems:'center', justifyContent:'center' }}>×</button>
        </div>
        <div style={{ background:'rgba(116,195,186,0.04)', border:'1px solid rgba(116,195,186,0.1)', borderRadius:'12px', padding:'16px', marginBottom:'24px' }}>
          <div style={{ fontSize:'11px', color:'rgba(116,195,186,0.4)', textTransform:'uppercase', letterSpacing:'2px', marginBottom:'10px', fontWeight:'700' }}>Included Scans</div>
          <div style={{ display:'flex', flexWrap:'wrap', gap:'8px' }}>
            {[['whois','WHOIS'],['dns','DNS'],['subdomain','Subdomains'],['port','Port Scan'],['banner','Banners'],['tech','Tech Detect']].map(([key,label]) => (
              <span key={key} style={{ padding:'4px 12px', borderRadius:'20px', fontSize:'11px', fontWeight:'700', background:allResults[key]?'rgba(82,201,122,0.12)':'rgba(116,195,186,0.05)', color:allResults[key]?'#52c97a':'rgba(116,195,186,0.25)', border:`1px solid ${allResults[key]?'rgba(82,201,122,0.3)':'rgba(116,195,186,0.1)'}` }}>
                {allResults[key] ? '✓ ' : ''}{label}
              </span>
            ))}
          </div>
        </div>
        <div style={{ marginBottom:'28px' }}>
          <div style={{ fontSize:'11px', color:'rgba(116,195,186,0.4)', textTransform:'uppercase', letterSpacing:'2px', marginBottom:'12px', fontWeight:'700' }}>Export Format</div>
          <div style={{ display:'flex', gap:'10px' }}>
            {[['txt','TXT','📄','Plain text'],['html','HTML','🌐','Styled report'],['pdf','PDF','📑','Print → PDF']].map(([val,label,ico,desc]) => (
              <button key={val} className={`rbtn-dl ${fmt===val?'selected':''}`} onClick={()=>setFmt(val)} style={{ flex:1, flexDirection:'column', gap:'4px', padding:'14px 10px', textAlign:'center' }}>
                <span style={{ fontSize:'20px' }}>{ico}</span>
                <span style={{ fontWeight:'800', fontSize:'13px' }}>{label}</span>
                <span style={{ fontSize:'10px', opacity:0.6, fontWeight:'400' }}>{desc}</span>
              </button>
            ))}
          </div>
        </div>
        <button className="rbtn" onClick={doDownload} disabled={downloading || !hasAny} style={{ width:'100%', justifyContent:'center' }}>
          {downloading ? (
            <><div style={{ width:'16px', height:'16px', border:'2px solid rgba(255,255,255,0.3)', borderTopColor:'white', borderRadius:'50%', animation:'spin 0.7s linear infinite' }} />Generating…</>
          ) : (
            <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>Download {fmt.toUpperCase()} Report</>
          )}
        </button>
        {!hasAny && <p style={{ textAlign:'center', fontSize:'12px', color:'rgba(116,195,186,0.35)', marginTop:'14px' }}>Run at least one scan before generating a report.</p>}
      </div>
    </div>
  );
};

// ══════ RECON TOOL ══════
const ReconTool = () => {
  const [activeTab,  setActiveTab]  = useState('whois');
  const [target,     setTarget]     = useState('');
  const [loading,    setLoading]    = useState(false);
  const [logs,       setLogs]       = useState([]);
  const [allResults, setAllResults] = useState({});
  const [showReport, setShowReport] = useState(false);
  const [scanError,  setScanError]  = useState(null);

  const resultsAreaRef = useRef(null);
  const logsEndRef     = useRef(null);

  React.useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior:'smooth', block:'nearest' });
  }, [logs]);

  const cur = tabs.find(t => t.id === activeTab);

  const animateLogs = async (tabId) => {
    const steps = allSteps[tabId];
    for (let i = 0; i < steps.length; i++) {
      await new Promise(r => setTimeout(r, 420));
      setLogs(p => [...p, { msg: steps[i], type: 'normal', id: Date.now() + i }]);
    }
  };

  const runScan = async () => {
    const val = target.trim();
    if (!val) return;
    setLoading(true);
    setLogs([]);
    setScanError(null);

    setTimeout(() => {
      resultsAreaRef.current?.scrollIntoView({ behavior:'smooth', block:'nearest' });
    }, 80);

    const logPromise = animateLogs(activeTab);

    let data = null;
    let err  = null;

    try {
      if      (activeTab === 'whois')     data = await apiWhois(val);
      else if (activeTab === 'dns')       data = await apiDns(val);
      else if (activeTab === 'subdomain') data = await apiSubdomains(val);
      else if (activeTab === 'port')      data = await apiPorts(val);
      else if (activeTab === 'banner')    data = await apiBanners(val);
      else                                data = await apiTech(val);
    } catch (e) {
      err = e.message || 'Backend not running — start Flask: python recon_app.py';
    }

    await logPromise;

    if (err) {
      setLogs(p => [...p, { msg: `✗ Error: ${err}`, type: 'err', id: Date.now() }]);
      setScanError(err);
      setLoading(false);
      return;
    }

    setLogs(p => [...p, { msg: `✓ ${cur.label} complete — ${Array.isArray(data) ? data.length + ' records' : Object.keys(data).length + ' fields'} retrieved`, type: 'done', id: Date.now() }]);
    setAllResults(p => ({ ...p, [activeTab]: data }));
    setLoading(false);
  };

  const clearCurrent = () => {
    setAllResults(p => { const n = {...p}; delete n[activeTab]; return n; });
    setLogs([]);
    setScanError(null);
  };

  const clearAll = () => {
    setAllResults({});
    setLogs([]);
    setScanError(null);
  };

  const scannedCount = Object.keys(allResults).length;

  return (
    <section id="tool" style={{ background:'#080f12', padding:'20px 0 80px', fontFamily:SF }}>
      {showReport && (
        <ReportModal allResults={allResults} target={target || 'unknown'} onClose={() => setShowReport(false)} />
      )}

      <div style={{ maxWidth:'1100px', margin:'0 auto', padding:'0 40px' }}>
        <div style={{ textAlign:'center', marginBottom:'40px' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'rgba(116,195,186,0.08)', border:'1px solid rgba(116,195,186,0.18)', borderRadius:'50px', padding:'7px 20px', marginBottom:'14px' }}>
            <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#74C3BA', display:'inline-block', animation:'glowPulse 2s infinite' }} />
            <span style={{ fontSize:'11px', fontWeight:'700', letterSpacing:'3px', textTransform:'uppercase', color:'#74C3BA' }}>Recon Tool</span>
          </div>
          <h2 style={{ fontSize:'2.2rem', fontWeight:'900', color:'#fff', letterSpacing:'-1px', margin:0 }}>
            Run Your <span style={{ color:'#74C3BA' }}>Intelligence Scan</span>
          </h2>
        </div>

        <div style={{ background:'rgba(255,255,255,0.02)', border:'1px solid rgba(116,195,186,0.12)', borderRadius:'24px', overflow:'hidden' }}>
          {/* Tab bar */}
          <div style={{ background:'rgba(116,195,186,0.04)', borderBottom:'1px solid rgba(116,195,186,0.1)', padding:'16px 24px' }}>
            <div style={{ display:'flex', gap:'24px', alignItems:'center', flexWrap:'wrap' }}>
              <div>
                <div style={{ fontSize:'9px', fontWeight:'800', letterSpacing:'2px', textTransform:'uppercase', color:'rgba(116,195,186,0.35)', marginBottom:'8px' }}>Passive Recon</div>
                <div style={{ display:'flex', gap:'6px' }}>
                  {tabs.filter(t => t.group === 'Passive').map(t => (
                    <button key={t.id} className={`rtab ${activeTab === t.id ? 'active' : ''}`}
                      onClick={() => { setActiveTab(t.id); setLogs([]); setScanError(null); }}>
                      <span>{t.icon}</span>{t.label}
                      {allResults[t.id] && (
                        <span style={{ position:'absolute', top:'-4px', right:'-4px', width:'8px', height:'8px', background:'#52c97a', borderRadius:'50%', border:'2px solid #080f12' }} />
                      )}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ width:'1px', height:'50px', background:'rgba(116,195,186,0.1)' }} />
              <div>
                <div style={{ fontSize:'9px', fontWeight:'800', letterSpacing:'2px', textTransform:'uppercase', color:'rgba(116,195,186,0.35)', marginBottom:'8px' }}>Active Recon</div>
                <div style={{ display:'flex', gap:'6px' }}>
                  {tabs.filter(t => t.group === 'Active').map(t => (
                    <button key={t.id} className={`rtab ${activeTab === t.id ? 'active' : ''}`}
                      onClick={() => { setActiveTab(t.id); setLogs([]); setScanError(null); }}>
                      <span>{t.icon}</span>{t.label}
                      {allResults[t.id] && (
                        <span style={{ position:'absolute', top:'-4px', right:'-4px', width:'8px', height:'8px', background:'#52c97a', borderRadius:'50%', border:'2px solid #080f12' }} />
                      )}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ marginLeft:'auto', display:'flex', alignItems:'center', gap:'14px' }}>
                {scannedCount > 0 && (
                  <button className="rbtn-ghost" onClick={() => setShowReport(true)}
                    style={{ background:'linear-gradient(135deg,rgba(48,111,116,0.3),rgba(116,195,186,0.15))', borderColor:'rgba(116,195,186,0.4)', color:'#fff' }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                    Report ({scannedCount}/6)
                  </button>
                )}
                <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
                  <div style={{ width:'8px', height:'8px', borderRadius:'50%', background: scanError ? '#ff4d4d' : loading ? '#f0a500' : '#52c97a', animation:loading ? 'ping 1s infinite' : 'glowPulse 2s infinite' }} />
                  <span style={{ fontSize:'11px', color:'rgba(116,195,186,0.5)', letterSpacing:'1px', textTransform:'uppercase', fontWeight:'700' }}>
                    {scanError ? 'Error' : loading ? 'Scanning…' : 'Ready'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tool body */}
          <div style={{ padding:'28px' }}>
            <div style={{ display:'flex', gap:'12px', marginBottom:'24px', alignItems:'center' }}>
              <div style={{ flex:1, position:'relative' }}>
                <input className="rinput" value={target}
                  onChange={e => setTarget(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && !loading && runScan()}
                  placeholder={cur.placeholder} />
                {loading && (
                  <div style={{ position:'absolute', right:'16px', top:'50%', transform:'translateY(-50%)', width:'18px', height:'18px', border:'2px solid rgba(116,195,186,0.2)', borderTopColor:'#74C3BA', borderRadius:'50%', animation:'spin 0.7s linear infinite' }} />
                )}
              </div>
              <button className="rbtn" onClick={runScan} disabled={loading || !target.trim()}>
                {loading ? (
                  <><div style={{ width:'15px', height:'15px', border:'2px solid rgba(255,255,255,0.3)', borderTopColor:'white', borderRadius:'50%', animation:'spin 0.7s linear infinite' }} />Scanning…</>
                ) : (
                  <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>Run Scan</>
                )}
              </button>
              {(allResults[activeTab] || scanError) && !loading && (
                <button className="rbtn-ghost" onClick={clearCurrent}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#74C3BA" strokeWidth="2" strokeLinecap="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.5"/></svg>
                  Clear
                </button>
              )}
            </div>

            <div ref={resultsAreaRef}>
              {loading && <OrbitSpinner label={`Running ${cur.label}…`} />}

              {logs.length > 0 && (
                <div style={{ background:'#020c0f', borderRadius:'14px', border:'1px solid rgba(116,195,186,0.1)', marginBottom:'24px', overflow:'hidden' }}>
                  <div style={{ padding:'10px 18px', borderBottom:'1px solid rgba(116,195,186,0.07)', display:'flex', alignItems:'center', gap:'8px', background:'rgba(116,195,186,0.03)' }}>
                    {['#ff5f56','#ffbd2e','#27c93f'].map(c => <div key={c} style={{ width:'11px', height:'11px', borderRadius:'50%', background:c }} />)}
                    <span style={{ fontSize:'11px', color:'rgba(116,195,186,0.3)', marginLeft:'8px', fontFamily:'Courier New' }}>
                      recon@iseewaves ~ {activeTab} {target}
                    </span>
                  </div>
                  <div style={{ padding:'18px 22px', maxHeight:'220px', overflowY:'auto' }}>
                    {logs.map((log, i) => (
                      <div key={log.id} className={`tline ${log.type}`} style={{ animationDelay:`${i*0.04}s` }}>
                        <span style={{ color:'rgba(116,195,186,0.3)', marginRight:'12px', userSelect:'none' }}>[{String(i+1).padStart(2,'0')}]</span>
                        {log.msg}
                        {i === logs.length - 1 && loading && <span style={{ animation:'blink 1s infinite' }}> ▌</span>}
                      </div>
                    ))}
                    <div ref={logsEndRef} />
                  </div>
                </div>
              )}

              {scanError && !loading && (
                <div style={{ background:'rgba(255,77,77,0.06)', border:'1px solid rgba(255,77,77,0.2)', borderRadius:'14px', padding:'20px 24px', marginBottom:'20px', display:'flex', alignItems:'flex-start', gap:'14px' }}>
                  <span style={{ fontSize:'1.5rem' }}>⚠️</span>
                  <div>
                    <div style={{ color:'#ff4d4d', fontWeight:'800', fontSize:'13px', marginBottom:'6px' }}>Scan Failed</div>
                    <div style={{ color:'rgba(255,120,120,0.7)', fontSize:'13px', fontFamily:'Courier New' }}>{scanError}</div>
                    <div style={{ color:'rgba(116,195,186,0.4)', fontSize:'12px', marginTop:'8px' }}>
                      Make sure Flask backend is running: <code style={{ color:'#74C3BA' }}>python recon_app.py</code>
                    </div>
                  </div>
                </div>
              )}

              {allResults[activeTab] && !loading && (
                <div style={{ animation:'fadeUp 0.4s ease both' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'18px', flexWrap:'wrap', gap:'12px' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                      <div style={{ width:'9px', height:'9px', borderRadius:'50%', background:'#52c97a', animation:'glowPulse 2s infinite' }} />
                      <span style={{ fontSize:'12px', fontWeight:'700', color:'#52c97a', letterSpacing:'1.5px', textTransform:'uppercase' }}>
                        {cur.label} Complete — {target}
                      </span>
                      <span style={{ fontSize:'11px', color:'rgba(116,195,186,0.3)', fontFamily:'Courier New' }}>
                        {Array.isArray(allResults[activeTab]) ? allResults[activeTab].length + ' records' : Object.keys(allResults[activeTab]).length + ' fields'}
                      </span>
                    </div>
                    <button className="rbtn-ghost" onClick={() => setShowReport(true)}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#74C3BA" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6"/></svg>
                      Generate Report
                    </button>
                  </div>

                  {activeTab === 'whois' && (
                    <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
                      {Object.entries(allResults.whois).map(([k,v], i) => (
                        <div key={k} className="rrow" style={{ animationDelay:`${i*0.035}s` }}>
                          <span style={{ fontSize:'12px', fontWeight:'700', color:'rgba(116,195,186,0.55)', minWidth:'160px', fontFamily:'Courier New', flexShrink:0 }}>{k}</span>
                          <span style={{ fontSize:'13.5px', color:'#e8f5f3', wordBreak:'break-all' }}>{v}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'dns' && (
                    <div style={{ borderRadius:'14px', overflow:'hidden', border:'1px solid rgba(116,195,186,0.1)' }}>
                      <table>
                        <thead><tr><th>Type</th><th>Value</th><th>TTL</th><th>Priority</th></tr></thead>
                        <tbody>
                          {allResults.dns.map((r,i) => (
                            <tr key={i}>
                              <td><span style={{ padding:'3px 10px', borderRadius:'5px', background:'rgba(116,195,186,0.1)', color:'#74C3BA', fontSize:'11px', fontWeight:'800', fontFamily:'Courier New' }}>{r.type}</span></td>
                              <td style={{ color:'#e8f5f3', fontFamily:'Courier New' }}>{r.value}</td>
                              <td style={{ color:'rgba(116,195,186,0.4)' }}>{r.ttl}s</td>
                              <td style={{ color:'rgba(116,195,186,0.4)' }}>{r.pri}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {activeTab === 'subdomain' && (
                    <div>
                      {allResults.subdomain.length === 0 ? (
                        <div style={{ textAlign:'center', padding:'40px', color:'rgba(116,195,186,0.3)', fontSize:'14px' }}>
                          No subdomains found for <b>{target}</b>. Try a larger domain.
                        </div>
                      ) : (
                        <>
                          <div style={{ display:'flex', gap:'14px', marginBottom:'16px', flexWrap:'wrap' }}>
                            {[['Total',allResults.subdomain.length,'#74C3BA'],['Active',allResults.subdomain.filter(r=>r.status==='Active').length,'#52c97a'],['Inactive',allResults.subdomain.filter(r=>r.status!=='Active').length,'#ff6b7a']].map(([label,val,color]) => (
                              <div key={label} style={{ padding:'12px 22px', background:'rgba(116,195,186,0.04)', border:'1px solid rgba(116,195,186,0.1)', borderRadius:'12px', textAlign:'center' }}>
                                <div style={{ fontSize:'1.5rem', fontWeight:'900', color, lineHeight:1 }}>{val}</div>
                                <div style={{ fontSize:'11px', color:'rgba(116,195,186,0.4)', marginTop:'4px', textTransform:'uppercase', letterSpacing:'1px' }}>{label}</div>
                              </div>
                            ))}
                          </div>
                          <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
                            {allResults.subdomain.map((r,i) => (
                              <div key={i} className="rrow" style={{ justifyContent:'space-between', animationDelay:`${i*0.03}s` }}>
                                <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                                  <div style={{ width:'8px', height:'8px', borderRadius:'50%', background:r.status==='Active'?'#52c97a':'rgba(116,195,186,0.2)', flexShrink:0 }} />
                                  <span style={{ fontSize:'13.5px', color:'#e8f5f3', fontFamily:'Courier New' }}>{r.sub}</span>
                                </div>
                                <div style={{ display:'flex', gap:'20px', alignItems:'center' }}>
                                  <span style={{ fontSize:'12px', color:'rgba(116,195,186,0.35)', fontFamily:'Courier New' }}>{r.ip}</span>
                                  <span style={{ fontSize:'12px', color:r.http.includes('200')?'#52c97a':'rgba(116,195,186,0.35)' }}>{r.http}</span>
                                  <span style={{ fontSize:'11px', fontWeight:'700', color:r.status==='Active'?'#52c97a':'rgba(255,107,122,0.7)', padding:'2px 10px', borderRadius:'5px', background:r.status==='Active'?'rgba(82,201,122,0.1)':'rgba(255,107,122,0.08)' }}>{r.status}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {activeTab === 'port' && (
                    <div>
                      <div style={{ display:'flex', gap:'14px', marginBottom:'16px', flexWrap:'wrap' }}>
                        {[['Scanned',allResults.port.length,'#74C3BA'],['Open',allResults.port.filter(r=>r.state==='Open').length,'#52c97a'],['Closed',allResults.port.filter(r=>r.state!=='Open').length,'rgba(116,195,186,0.4)']].map(([label,val,color]) => (
                          <div key={label} style={{ padding:'12px 22px', background:'rgba(116,195,186,0.04)', border:'1px solid rgba(116,195,186,0.1)', borderRadius:'12px', textAlign:'center' }}>
                            <div style={{ fontSize:'1.5rem', fontWeight:'900', color, lineHeight:1 }}>{val}</div>
                            <div style={{ fontSize:'11px', color:'rgba(116,195,186,0.4)', marginTop:'4px', textTransform:'uppercase', letterSpacing:'1px' }}>{label}</div>
                          </div>
                        ))}
                      </div>
                      <div style={{ borderRadius:'14px', overflow:'hidden', border:'1px solid rgba(116,195,186,0.1)' }}>
                        <table>
                          <thead><tr><th>Port</th><th>Service</th><th>State</th><th>Banner</th><th>Risk</th></tr></thead>
                          <tbody>
                            {allResults.port.map((r,i) => (
                              <tr key={i}>
                                <td style={{ fontFamily:'Courier New', fontWeight:'700', color:'#74C3BA' }}>{r.port}</td>
                                <td style={{ color:'#e8f5f3' }}>{r.svc}</td>
                                <td><span style={{ fontSize:'12px', fontWeight:'700', color:r.state==='Open'?'#52c97a':'rgba(116,195,186,0.3)', padding:'3px 10px', borderRadius:'5px', background:r.state==='Open'?'rgba(82,201,122,0.1)':'rgba(116,195,186,0.05)' }}>{r.state}</span></td>
                                <td style={{ color:'rgba(116,195,186,0.4)', fontFamily:'Courier New', fontSize:'12px' }}>{r.banner}</td>
                                <td><span style={{ fontSize:'11px', fontWeight:'700', color:riskColor[r.risk], background:riskBg[r.risk], padding:'3px 10px', borderRadius:'5px' }}>{r.risk}</span></td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {activeTab === 'banner' && (
                    <div>
                      {allResults.banner.length === 0 ? (
                        <div style={{ textAlign:'center', padding:'40px', color:'rgba(116,195,186,0.3)', fontSize:'14px' }}>
                          No open ports found on <b>{target}</b> for banner grabbing.
                        </div>
                      ) : (
                        <div style={{ display:'flex', flexDirection:'column', gap:'14px' }}>
                          {allResults.banner.map((r,i) => (
                            <div key={i} className="rrow" style={{ flexDirection:'column', alignItems:'flex-start', gap:'10px', animationDelay:`${i*0.06}s` }}>
                              <div style={{ display:'flex', alignItems:'center', gap:'12px', width:'100%' }}>
                                <span style={{ background:'rgba(116,195,186,0.12)', color:'#74C3BA', padding:'4px 12px', borderRadius:'8px', fontSize:'12px', fontWeight:'800', fontFamily:'Courier New' }}>:{r.port}</span>
                                <span style={{ color:'rgba(116,195,186,0.5)', fontSize:'12px' }}>{r.svc}</span>
                                <span style={{ color:'#e8f5f3', fontWeight:'600', fontSize:'13px' }}>{r.info}</span>
                              </div>
                              <div style={{ width:'100%', background:'rgba(0,0,0,0.4)', borderRadius:'10px', padding:'12px 16px', fontFamily:'Courier New', fontSize:'12px', color:'#74C3BA', lineHeight:1.8, whiteSpace:'pre-wrap', wordBreak:'break-all' }}>
                                {r.raw}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'tech' && (
                    <div>
                      <div style={{ display:'flex', gap:'14px', marginBottom:'16px', flexWrap:'wrap' }}>
                        {[['Detected',allResults.tech.length,'#74C3BA'],['High Conf',allResults.tech.filter(r=>r.confidence==='High').length,'#52c97a'],['Med Conf',allResults.tech.filter(r=>r.confidence==='Medium').length,'#f0a500']].map(([label,val,color]) => (
                          <div key={label} style={{ padding:'12px 22px', background:'rgba(116,195,186,0.04)', border:'1px solid rgba(116,195,186,0.1)', borderRadius:'12px', textAlign:'center' }}>
                            <div style={{ fontSize:'1.5rem', fontWeight:'900', color, lineHeight:1 }}>{val}</div>
                            <div style={{ fontSize:'11px', color:'rgba(116,195,186,0.4)', marginTop:'4px', textTransform:'uppercase', letterSpacing:'1px' }}>{label}</div>
                          </div>
                        ))}
                      </div>
                      <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'10px' }}>
                        {allResults.tech.map((r,i) => (
                          <div key={i} className="rrow" style={{ justifyContent:'space-between', animationDelay:`${i*0.05}s` }}>
                            <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                              <span style={{ fontSize:'20px' }}>{r.icon}</span>
                              <div>
                                <div style={{ fontSize:'13px', fontWeight:'700', color:'#e8f5f3' }}>{r.tech}</div>
                                <div style={{ fontSize:'11px', color:'rgba(116,195,186,0.4)' }}>{r.category} · {r.version}</div>
                              </div>
                            </div>
                            <span style={{ fontSize:'11px', fontWeight:'700', color:confColor[r.confidence], background:`${confColor[r.confidence]}18`, padding:'3px 10px', borderRadius:'5px' }}>{r.confidence}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {!allResults[activeTab] && !loading && logs.length === 0 && !scanError && (
                <div style={{ textAlign:'center', padding:'60px 20px', color:'rgba(116,195,186,0.2)' }}>
                  <div style={{ fontSize:'4rem', marginBottom:'14px', opacity:0.4 }}>{cur.icon}</div>
                  <p style={{ fontSize:'16px', fontWeight:'700', margin:'0 0 6px', color:'rgba(116,195,186,0.28)' }}>Enter a target and click Run Scan</p>
                  <p style={{ fontSize:'13px', margin:0, color:'rgba(116,195,186,0.15)' }}>Results will appear here after scanning completes</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Progress bar */}
        {scannedCount > 0 && (
          <div style={{ marginTop:'20px', background:'rgba(116,195,186,0.04)', border:'1px solid rgba(116,195,186,0.1)', borderRadius:'14px', padding:'16px 24px', display:'flex', alignItems:'center', gap:'16px' }}>
            <span style={{ fontSize:'11px', color:'rgba(116,195,186,0.45)', textTransform:'uppercase', letterSpacing:'2px', fontWeight:'700', whiteSpace:'nowrap' }}>Scan Progress</span>
            <div style={{ flex:1, height:'6px', background:'rgba(116,195,186,0.1)', borderRadius:'3px', overflow:'hidden' }}>
              <div style={{ height:'100%', width:`${(scannedCount/6)*100}%`, background:'linear-gradient(90deg,#306F74,#74C3BA)', borderRadius:'3px', transition:'width 0.5s ease' }} />
            </div>
            <span style={{ fontSize:'12px', fontWeight:'800', color:'#74C3BA', whiteSpace:'nowrap' }}>{scannedCount}/6 modules</span>
            <button className="rbtn-ghost" onClick={() => setShowReport(true)} style={{ whiteSpace:'nowrap' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#74C3BA" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6"/></svg>
              Generate Report
            </button>
            <button className="rbtn-ghost" onClick={clearAll}
              style={{ whiteSpace:'nowrap', borderColor:'rgba(255,107,122,0.3)', color:'#ff6b7a' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#ff6b7a" strokeWidth="2" strokeLinecap="round">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
                <path d="M10 11v6M14 11v6"/>
              </svg>
              Clear All
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

// ══════ FOOTER ══════
const FooterHeading = ({ title }) => (
  <div style={{ marginBottom:'20px', position:'relative', paddingBottom:'10px' }}>
    <h3 style={{ color:'#f3f7ec', fontSize:'18px', fontWeight:'600', margin:0 }}>{title}</h3>
    <div style={{ position:'absolute', bottom:0, left:0, width:'30px', height:'2px', background:'#f3f7ec', borderRadius:'2px' }} />
  </div>
);
const FooterSection = ({ title, links }) => (
  <div>
    <FooterHeading title={title} />
    <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:'12px' }}>
      {links.map(link => <li key={link.label}><a href={link.href} className="footer-link">{link.label}</a></li>)}
    </ul>
  </div>
);
const Footer = () => (
  <footer style={{ background:'linear-gradient(135deg,#307075 0%,#2a5f63 100%)', color:'#f3f7ec', padding:'60px 0 20px', position:'relative', overflow:'hidden' }}>
    <div style={{ position:'absolute', top:0, left:0, right:0, height:'1px', background:'linear-gradient(90deg,transparent,#f3f7ec,transparent)' }} />
    <div style={{ maxWidth:'1200px', margin:'0 auto', padding:'0 20px' }}>
      <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', gap:'40px', marginBottom:'40px' }}>
        <div style={{ display:'flex', flexDirection:'column', gap:'20px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'15px', marginBottom:'15px' }}>
            <div style={{ width:'50px', height:'50px', background:'#f3f7ec', borderRadius:'12px', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
              <img src={logo} style={{ width:'35px', height:'35px', objectFit:'contain' }} alt="logo" />
            </div>
            <span style={{ fontSize:'28px', fontWeight:'700', fontFamily:SF }}>iSeeWaves</span>
          </div>
          <p style={{ color:'#b8d4d6', fontSize:'16px', lineHeight:1.6, marginBottom:'20px', fontFamily:SF }}>Protecting your digital assets with advanced cybersecurity solutions.</p>
          <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
            <div style={{ display:'flex', alignItems:'flex-start', gap:'12px' }}>
              <img src={gmailIcon} style={{ width:'20px', height:'20px', objectFit:'contain', marginTop:'2px', opacity:0.8 }} alt="email" />
              <span style={{ fontSize:'15px', lineHeight:1.5, fontFamily:SF }}>iseewaves.pk@gmail.com</span>
            </div>
            <div style={{ display:'flex', alignItems:'flex-start', gap:'12px' }}>
              <img src={locationIcon} style={{ width:'20px', height:'20px', objectFit:'contain', marginTop:'2px', opacity:0.8 }} alt="loc" />
              <span style={{ fontSize:'15px', lineHeight:1.5, fontFamily:SF }}>Shop # 10, Plot # 237, Banda Phugwarian,<br/>Banda Batang, Abbottabad</span>
            </div>
          </div>
        </div>
        <FooterSection title="Quick Links" links={[{label:'Home',href:'/'},{label:'About Us',href:'/about'},{label:'Services',href:'/services'},{label:'Products',href:'/products'},{label:'Blog',href:'#blog'}]} />
        <FooterSection title="Company"     links={[{label:'Contact',href:'/contact'},{label:'Careers',href:'/careers'},{label:'Our Team',href:'/careers'},{label:'Partners',href:'#partners'},{label:'News',href:'#news'}]} />
        <div>
          <FooterHeading title="Connect With Us" />
          <div style={{ display:'flex', gap:'15px', marginTop:'10px', flexWrap:'wrap' }}>
            {[{href:'https://www.instagram.com/iseewaves.pk',icon:instagramIcon,alt:'Instagram'},{href:'https://m.facebook.com/iseewaves.pk',icon:facebookIcon,alt:'Facebook'},{href:'https://x.com/iseewaves_',icon:twitterIcon,alt:'X'},{href:'http://www.linkedin.com/company/iseewaves/',icon:linkedinIcon,alt:'LinkedIn'}].map(s => (
              <a key={s.alt} href={s.href} target="_blank" rel="noreferrer"
                style={{ width:'45px', height:'45px', background:'rgba(243,247,236,0.1)', border:'2px solid rgba(243,247,236,0.2)', borderRadius:'12px', display:'flex', alignItems:'center', justifyContent:'center', textDecoration:'none', transition:'all 0.3s' }}
                onMouseEnter={e=>{ e.currentTarget.style.borderColor='#f3f7ec'; e.currentTarget.style.background='rgba(243,247,236,0.15)'; e.currentTarget.style.transform='translateY(-3px)'; }}
                onMouseLeave={e=>{ e.currentTarget.style.borderColor='rgba(243,247,236,0.2)'; e.currentTarget.style.background='rgba(243,247,236,0.1)'; e.currentTarget.style.transform='translateY(0)'; }}>
                <img src={s.icon} style={{ width:'24px', height:'24px', objectFit:'contain', opacity:0.8 }} alt={s.alt} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div style={{ borderTop:'1px solid rgba(243,247,236,0.1)', paddingTop:'30px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'20px' }}>
          <span style={{ color:'#b8d4d6', fontSize:'14px', fontFamily:SF }}>© 2025 iSeeWaves. All rights reserved.</span>
          <div style={{ display:'flex', gap:'30px' }}>
            {[{label:'Privacy Policy',href:'/privacy'},{label:'Terms of Policy',href:'/tos'},{label:'Security',href:'#security'}].map(link => (
              <a key={link.label} href={link.href}
                style={{ color:'#b8d4d6', textDecoration:'none', fontSize:'14px', transition:'color 0.3s', fontFamily:SF }}
                onMouseEnter={e=>e.target.style.color='#f3f7ec'}
                onMouseLeave={e=>e.target.style.color='#b8d4d6'}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  </footer>
);

const ReconnaissancePage = () => (
  <>
    <GlobalStyles />
    <Navbar />
    <HeroSection />
    <FeatureCards />
    <ReconTool />
    <Footer />
  </>
);

export default ReconnaissancePage;