import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// ── Change this to your Flask backend URL ──
const API_BASE = 'http://localhost:5001/api';

import logo          from '../assets/images/icons/logo.png';
import gmailIcon     from '../assets/images/icons/gmail.png';
import locationIcon  from '../assets/images/icons/placeholder.png';
import instagramIcon from '../assets/images/icons/instagram.png';
import facebookIcon  from '../assets/images/icons/facebook.png';
import twitterIcon   from '../assets/images/icons/twitter.png';
import linkedinIcon  from '../assets/images/icons/linkedin.png';
import videoBg       from '../assets/images/video_bg.mp4';

const SF   = "'Plus Jakarta Sans', sans-serif";
const MONO = "'Space Mono', monospace";

/* ─────────────────────────────────────────
   GLOBAL STYLES
───────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&family=Space+Mono:wght@400;700&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --teal:        #306F74;
      --teal-l:      #74C3BA;
      --teal-d:      #0a1a1f;
      --cream:       #f3f7ec;
      --bg-dark:     #080f12;
      --card-bg:     rgba(116,195,186,0.04);
      --card-border: rgba(116,195,186,0.12);
    }

    @keyframes fadeUp       { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
    @keyframes fadeIn       { from{opacity:0} to{opacity:1} }
    @keyframes spin         { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
    @keyframes ping         { 0%{transform:scale(1);opacity:.9} 80%,100%{transform:scale(2.4);opacity:0} }
    @keyframes blink        { 0%,100%{opacity:1} 50%{opacity:0} }
    @keyframes scanLine     { 0%{top:0%;opacity:0} 5%{opacity:1} 95%{opacity:1} 100%{top:100%;opacity:0} }
    @keyframes glowPulse    { 0%,100%{box-shadow:0 0 0 0 rgba(116,195,186,.45)} 50%{box-shadow:0 0 0 10px rgba(116,195,186,0)} }
    @keyframes shimmer      { 0%{transform:translateX(-100%)} 100%{transform:translateX(300%)} }
    @keyframes float        { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
    @keyframes radarSpin    { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
    @keyframes radarPing    { 0%{opacity:.8;transform:scale(0)} 100%{opacity:0;transform:scale(1)} }
    @keyframes slideRight   { from{transform:scaleX(0)} to{transform:scaleX(1)} }
    @keyframes cardEntrance { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
    @keyframes floatDot     { 0%,100%{transform:translateY(0) translateX(0);opacity:.3} 33%{transform:translateY(-14px) translateX(6px);opacity:.65} 66%{transform:translateY(8px) translateX(-5px);opacity:.35} }
    @keyframes mapPulseRing { 0%{transform:scale(.6);opacity:.8} 100%{transform:scale(2);opacity:0} }

    /* ── Shared input ── */
    .ip-input {
      width:100%; padding:16px 24px;
      background:rgba(116,195,186,.06);
      border:1.5px solid rgba(116,195,186,.22);
      border-radius:14px; color:#e8f5f3;
      font-size:15px; font-family:${MONO};
      outline:none; transition:all .3s;
      letter-spacing:.5px;
    }
    .ip-input:focus { border-color:#74C3BA; background:rgba(116,195,186,.1); box-shadow:0 0 0 4px rgba(116,195,186,.12); }
    .ip-input::placeholder { color:rgba(116,195,186,.3); }

    /* ── Track button ── */
    .track-btn {
      padding:16px 36px; border-radius:14px; border:none; cursor:pointer;
      background:linear-gradient(135deg,#306F74,#74C3BA); color:white;
      font-weight:800; font-size:15px; font-family:${SF};
      box-shadow:0 6px 24px rgba(48,111,116,.4);
      transition:all .3s; display:inline-flex; align-items:center; gap:9px; white-space:nowrap;
    }
    .track-btn:hover:not(:disabled) { transform:translateY(-2px); box-shadow:0 12px 32px rgba(48,111,116,.55); }
    .track-btn:disabled { opacity:.45; cursor:not-allowed; }

    /* ── Ghost button ── */
    .ghost-btn {
      padding:11px 18px; border-radius:12px;
      border:1.5px solid rgba(116,195,186,.25);
      background:rgba(116,195,186,.06); color:#74C3BA;
      font-weight:700; font-size:12px; font-family:${SF};
      cursor:pointer; transition:all .25s;
      display:inline-flex; align-items:center; gap:7px;
    }
    .ghost-btn:hover { background:rgba(116,195,186,.14); border-color:#74C3BA; }

    /* ── Nav link ── */
    .nav-link {
      text-decoration:none; color:#F4F7EC; font-size:16px;
      font-weight:700; transition:all .3s; padding-bottom:3px;
    }
    .nav-link:hover { color:#fff; border-bottom:2px solid #fff; }

    /* ── Info rows ── */
    .irow {
      display:flex; align-items:flex-start; gap:12px;
      padding:11px 0; border-bottom:1px solid rgba(116,195,186,.07);
    }
    .irow:last-child { border-bottom:none; }

    /* ── Result card ── */
    .rcard {
      background:var(--card-bg); border:1px solid var(--card-border);
      border-radius:18px; padding:22px 24px;
      transition:all .25s; animation:cardEntrance .45s ease both;
    }
    .rcard:hover { background:rgba(116,195,186,.08); border-color:rgba(116,195,186,.22); }

    /* ── Threat chip ── */
    .tchip {
      display:flex; flex-direction:column; align-items:center;
      padding:16px 10px; background:rgba(116,195,186,.05);
      border:1px solid rgba(116,195,186,.1); border-radius:14px;
      text-align:center; transition:all .25s;
    }
    .tchip:hover { background:rgba(116,195,186,.1); border-color:rgba(116,195,186,.25); }

    /* ── Terminal line ── */
    .tline { font-family:${MONO}; font-size:12px; line-height:2; color:#74C3BA; animation:fadeUp .22s ease both; }
    .tline.done { color:#52c97a; font-weight:700; }
    .tline.warn { color:#f0a500; }
    .tline.err  { color:#ff4d4d; }

    /* ── History pill ── */
    .hist-pill {
      padding:6px 14px; background:rgba(116,195,186,.05);
      border:1px solid rgba(116,195,186,.15); border-radius:20px;
      color:rgba(116,195,186,.55); font-size:12px; font-family:${MONO};
      cursor:pointer; transition:all .2s; display:inline-flex; align-items:center; gap:6px;
    }
    .hist-pill:hover { border-color:rgba(116,195,186,.4); color:#74C3BA; background:rgba(116,195,186,.1); }

    /* ── Footer link ── */
    .footer-link { color:#b8d4d6; text-decoration:none; font-size:15px; display:inline-block; transition:all .3s; }
    .footer-link:hover { color:#f3f7ec; transform:translateX(8px); }

    .hamburger-btn { display:none !important; }
    @media(max-width:860px) {
      .hamburger-btn { display:block !important; }
      .nav-links { display:none !important; }
      .nav-links.open { display:flex !important; flex-direction:column; position:absolute; top:90px; left:0; right:0; background:#306F74; padding:20px; z-index:999; }
      .tracker-2col { grid-template-columns:1fr !important; }
      .threat-grid  { grid-template-columns:repeat(3,1fr) !important; }
    }
    @media(max-width:560px) {
      .threat-grid { grid-template-columns:repeat(2,1fr) !important; }
    }
  `}</style>
);

/* ── NAVBAR ── */
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);
  return (
    <header style={{ backgroundColor:'#306F74', padding:'0 50px', position:'fixed', width:'100%', top:0, zIndex:1000, boxShadow:scrolled?'0 2px 20px rgba(0,0,0,.35)':'0 2px 10px rgba(0,0,0,.2)', transition:'box-shadow .3s', fontFamily:SF }}>
      <nav style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <img src={logo} alt="iSeeWaves" style={{ height:'90px', borderRadius:'8px' }} />
        <button className="hamburger-btn" onClick={()=>setMenuOpen(!menuOpen)} style={{ background:'none', border:'none', color:'#F4F7EC', fontSize:'24px', cursor:'pointer' }}>{menuOpen?'✕':'☰'}</button>
        <ul className={`nav-links${menuOpen?' open':''}`} style={{ display:'flex', listStyle:'none', margin:0, padding:0 }}>
          {[['Products','/products'],['Services','/services'],['About Us','/about'],['Regulations','/regulations'],['Contact','/contact'],['Careers','/careers']].map(([label,href])=>(
            <li key={label} style={{ marginRight:'20px' }}>
              <a href={href} className="nav-link">{label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

/* ── RADAR WIDGET ── */
const RadarWidget = () => (
  <div style={{ position:'relative', width:'200px', height:'200px', flexShrink:0, animation:'float 5s ease-in-out infinite' }}>
    {[0,1,2,3].map(i=>(
      <div key={i} style={{ position:'absolute', inset:`${i*22}%`, border:'1px solid rgba(116,195,186,.18)', borderRadius:'50%' }}/>
    ))}
    <div style={{ position:'absolute', top:'50%', left:0, right:0, height:'1px', background:'rgba(116,195,186,.12)' }}/>
    <div style={{ position:'absolute', left:'50%', top:0, bottom:0, width:'1px', background:'rgba(116,195,186,.12)' }}/>
    <div style={{ position:'absolute', inset:0, borderRadius:'50%', overflow:'hidden' }}>
      <div style={{ position:'absolute', top:'50%', left:'50%', width:'50%', height:'2px', transformOrigin:'0% 50%', background:'linear-gradient(90deg,rgba(116,195,186,.8),transparent)', animation:'radarSpin 3s linear infinite' }}/>
    </div>
    <div style={{ position:'absolute', top:'28%', left:'62%', width:'8px', height:'8px', borderRadius:'50%', background:'#74C3BA', boxShadow:'0 0 10px rgba(116,195,186,.9)' }}/>
    <div style={{ position:'absolute', top:'28%', left:'62%', width:'8px', height:'8px', borderRadius:'50%', background:'#74C3BA', animation:'ping 2s ease-in-out infinite' }}/>
    <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:'12px', height:'12px', borderRadius:'50%', background:'#74C3BA', boxShadow:'0 0 14px rgba(116,195,186,.9)' }}/>
  </div>
);

/* ── SVG WORLD MAP ── */
const WorldMap = ({ lat, lon }) => {
  const toSVG = (la, lo) => ({
    x: ((lo + 180) / 360) * 900,
    y: ((90 - la) / 180) * 460
  });
  const pin = (lat !== null && lon !== null) ? toSVG(lat, lon) : null;

  return (
    <svg viewBox="0 0 900 460" xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%', display: 'block', background: '#0d1b2a' }}>
      <defs>
        <radialGradient id="oceanGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1a2e42"/>
          <stop offset="100%" stopColor="#0d1b2a"/>
        </radialGradient>
      </defs>

      <rect width="900" height="460" fill="url(#oceanGrad)"/>

      {/* Grid lines */}
      <g stroke="#1e3a52" strokeWidth="0.5" opacity="0.6">
        <line x1="0" y1="115" x2="900" y2="115"/>
        <line x1="0" y1="230" x2="900" y2="230"/>
        <line x1="0" y1="345" x2="900" y2="345"/>
        <line x1="225" y1="0" x2="225" y2="460"/>
        <line x1="450" y1="0" x2="450" y2="460"/>
        <line x1="675" y1="0" x2="675" y2="460"/>
      </g>

      {/* ── CONTINENTS ── */}
      {/* North America */}
      <path d="M 95 55 L 130 50 L 165 48 L 200 55 L 220 70 L 235 85 L 240 105 L 245 125 L 255 145 L 265 160 L 260 180 L 250 195 L 235 205 L 215 210 L 200 215 L 185 225 L 170 240 L 160 255 L 150 265 L 140 260 L 130 250 L 125 235 L 120 218 L 110 200 L 100 185 L 90 165 L 85 145 L 82 125 L 83 105 L 88 82 L 95 65 Z" fill="#2d5a3d" stroke="#3a7a52" strokeWidth="0.8"/>
      <path d="M 58 42 L 80 38 L 100 42 L 110 55 L 100 60 L 82 57 L 65 52 Z" fill="#2d5a3d" stroke="#3a7a52" strokeWidth="0.6"/>
      {/* Central America */}
      <path d="M 175 255 L 185 250 L 192 258 L 195 270 L 190 278 L 182 272 L 175 262 Z" fill="#2d5a3d" stroke="#3a7a52" strokeWidth="0.6"/>
      <path d="M 215 245 L 225 242 L 230 250 L 225 256 L 215 252 Z" fill="#2d5a3d" stroke="#3a7a52" strokeWidth="0.5"/>
      <path d="M 235 240 L 248 237 L 252 245 L 245 250 L 235 247 Z" fill="#2d5a3d" stroke="#3a7a52" strokeWidth="0.5"/>
      {/* South America */}
      <path d="M 190 285 L 215 278 L 238 280 L 258 290 L 272 310 L 280 335 L 285 360 L 280 385 L 268 405 L 252 418 L 235 422 L 218 415 L 205 400 L 195 378 L 188 355 L 185 328 L 185 305 L 188 290 Z" fill="#2d5a3d" stroke="#3a7a52" strokeWidth="0.8"/>
      {/* Greenland */}
      <path d="M 258 18 L 285 12 L 315 15 L 335 28 L 338 45 L 328 58 L 308 62 L 285 60 L 265 50 L 255 35 Z" fill="#2d5a3d" stroke="#3a7a52" strokeWidth="0.6" opacity="0.8"/>
      {/* Europe */}
      <path d="M 408 55 L 432 50 L 455 52 L 472 62 L 480 78 L 475 92 L 462 98 L 445 100 L 430 105 L 418 112 L 408 120 L 400 115 L 395 102 L 395 88 L 400 72 Z" fill="#2d5a3d" stroke="#3a7a52" strokeWidth="0.7"/>
      <path d="M 455 100 L 468 98 L 478 105 L 478 115 L 468 118 L 458 112 Z" fill="#2d5a3d" stroke="#3a7a52" strokeWidth="0.6"/>
      <path d="M 430 118 L 445 115 L 455 120 L 458 130 L 448 135 L 435 130 Z" fill="#2d5a3d" stroke="#3a7a52" strokeWidth="0.6"/>
      <path d="M 455 28 L 468 22 L 478 28 L 480 42 L 472 52 L 460 50 L 452 40 Z" fill="#2d5a3d" stroke="#3a7a52" strokeWidth="0.6"/>
      <path d="M 432 32 L 445 28 L 452 35 L 450 48 L 440 52 L 430 45 Z" fill="#2d5a3d" stroke="#3a7a52" strokeWidth="0.6"/>
      <path d="M 388 72 L 398 68 L 406 75 L 404 88 L 394 92 L 385 85 Z" fill="#2d5a3d" stroke="#3a7a52" strokeWidth="0.5"/>
      <path d="M 378 78 L 385 74 L 390 82 L 385 90 L 376 86 Z" fill="#2d5a3d" stroke="#3a7a52" strokeWidth="0.5"/>
      {/* Africa */}
      <path d="M 398 158 L 420 150 L 445 148 L 468 155 L 482 172 L 488 195 L 490 220 L 488 248 L 485 272 L 478 298 L 468 322 L 455 342 L 438 355 L 420 358 L 402 352 L 388 335 L 378 312 L 372 285 L 368 258 L 368 230 L 370 205 L 375 182 L 385 165 Z" fill="#2d5a3d" stroke="#3a7a52" strokeWidth="0.8"/>
      <path d="M 498 288 L 508 282 L 515 292 L 515 310 L 508 322 L 498 318 L 492 305 Z" fill="#2d5a3d" stroke="#3a7a52" strokeWidth="0.5"/>
      {/* Russia */}
      <path d="M 498 42 L 535 35 L 575 28 L 620 22 L 665 18 L 710 20 L 750 25 L 785 32 L 815 40 L 835 52 L 840 65 L 830 75 L 810 80 L 788 82 L 765 78 L 740 75 L 715 75 L 720 82 L 705 68 L 680 55 L 650 45 L 615 38 L 575 32 L 535 35 L 498 42 Z" fill="#2d5a3d" stroke="#3a7a52" strokeWidth="0.7"/>
      {/* Asia main */}
      <path d="M 498 42 L 535 35 L 575 32 L 615 38 L 650 45 L 680 55 L 705 68 L 720 82 L 725 98 L 718 112 L 700 122 L 678 128 L 655 132 L 635 130 L 615 125 L 592 122 L 570 118 L 548 115 L 528 118 L 512 125 L 502 135 L 495 148 L 492 162 L 490 148 L 488 132 L 490 118 L 495 102 L 498 85 L 498 65 Z" fill="#2d5a3d" stroke="#3a7a52" strokeWidth="0.8"/>
      {/* Middle East */}
      <path d="M 492 162 L 510 158 L 528 162 L 538 175 L 535 192 L 525 205 L 510 210 L 495 205 L 488 192 Z" fill="#2d5a3d" stroke="#3a7a52" strokeWidth="0.6"/>
      <path d="M 528 162 L 545 158 L 558 165 L 562 178 L 555 192 L 540 195 L 528 188 Z" fill="#2d5a3d" stroke="#3a7a52" strokeWidth="0.6"/>
      {/* India */}
      <path d="M 562 130 L 578 128 L 592 135 L 600 150 L 598 168 L 592 185 L 580 198 L 568 202 L 555 195 L 548 178 L 548 160 L 552 145 Z" fill="#2d5a3d" stroke="#3a7a52" strokeWidth="0.7"/>
      {/* China */}
      <path d="M 622 80 L 655 75 L 688 80 L 715 90 L 720 105 L 718 120 L 700 130 L 680 135 L 655 135 L 635 130 L 618 120 L 612 105 L 615 90 Z" fill="#2d5a3d" stroke="#3a7a52" strokeWidth="0.7"/>
      {/* SE Asia */}
      <path d="M 655 132 L 672 130 L 688 138 L 695 152 L 690 165 L 678 170 L 662 165 L 652 152 Z" fill="#2d5a3d" stroke="#3a7a52" strokeWidth="0.6"/>
      <path d="M 688 155 L 700 150 L 710 158 L 712 170 L 705 178 L 692 175 Z" fill="#2d5a3d" stroke="#3a7a52" strokeWidth="0.6"/>
      {/* Japan */}
      <path d="M 730 78 L 742 72 L 752 78 L 754 90 L 748 98 L 736 96 L 728 88 Z" fill="#2d5a3d" stroke="#3a7a52" strokeWidth="0.5"/>
      <path d="M 748 95 L 758 90 L 765 98 L 762 108 L 752 110 L 744 104 Z" fill="#2d5a3d" stroke="#3a7a52" strokeWidth="0.5"/>
      {/* Indonesia */}
      <path d="M 658 185 L 672 182 L 680 190 L 678 200 L 665 202 Z" fill="#2d5a3d" stroke="#3a7a52" strokeWidth="0.5"/>
      <path d="M 682 188 L 698 185 L 708 192 L 705 202 L 690 205 Z" fill="#2d5a3d" stroke="#3a7a52" strokeWidth="0.5"/>
      <path d="M 710 182 L 725 180 L 735 188 L 730 198 L 715 198 Z" fill="#2d5a3d" stroke="#3a7a52" strokeWidth="0.5"/>
      {/* Australia */}
      <path d="M 668 272 L 698 262 L 728 260 L 758 265 L 780 278 L 792 298 L 795 322 L 788 345 L 772 360 L 752 368 L 728 368 L 705 360 L 688 345 L 678 322 L 668 298 Z" fill="#2d5a3d" stroke="#3a7a52" strokeWidth="0.8"/>
      <path d="M 798 355 L 808 348 L 815 358 L 812 370 L 800 372 Z" fill="#2d5a3d" stroke="#3a7a52" strokeWidth="0.5"/>

      {/* ── LOCATION PIN ── */}
      {pin && (
        <g>
          {/* Pulse rings */}
          <circle cx={pin.x} cy={pin.y} r="18" fill="none" stroke="#f97316" strokeWidth="1.5" opacity="0.5">
            <animate attributeName="r" values="10;30" dur="2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.7;0" dur="2s" repeatCount="indefinite"/>
          </circle>
          <circle cx={pin.x} cy={pin.y} r="10" fill="none" stroke="#f97316" strokeWidth="1.5" opacity="0.5">
            <animate attributeName="r" values="6;20" dur="2s" begin="0.5s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.8;0" dur="2s" begin="0.5s" repeatCount="indefinite"/>
          </circle>
          {/* Shadow */}
          <ellipse cx={pin.x} cy={pin.y + 23} rx="6" ry="2" fill="#000" opacity="0.35"/>
          {/* Pin body */}
          <path d={`M${pin.x} ${pin.y + 18} C${pin.x - 10} ${pin.y + 10} ${pin.x - 14} ${pin.y + 2} ${pin.x - 14} ${pin.y - 5} C${pin.x - 14} ${pin.y - 14} ${pin.x - 7} ${pin.y - 20} ${pin.x} ${pin.y - 20} C${pin.x + 7} ${pin.y - 20} ${pin.x + 14} ${pin.y - 14} ${pin.x + 14} ${pin.y - 5} C${pin.x + 14} ${pin.y + 2} ${pin.x + 10} ${pin.y + 10} ${pin.x} ${pin.y + 18} Z`}
            fill="#f97316" stroke="#ea5c00" strokeWidth="1"/>
          {/* Inner dot */}
          <circle cx={pin.x} cy={pin.y - 5} r="5" fill="#fff" opacity="0.9"/>
        </g>
      )}
    </svg>
  );
};

/* ── FLOATING DOTS ── */
const FloatingDots = () => {
  const dots = [{x:'8%',y:'25%',d:'0s',s:3},{x:'22%',y:'70%',d:'1.1s',s:2},{x:'45%',y:'20%',d:'.5s',s:3},{x:'65%',y:'60%',d:'1.6s',s:2},{x:'78%',y:'35%',d:'.9s',s:2},{x:'88%',y:'75%',d:'.3s',s:3}];
  return <>{dots.map((d,i)=><div key={i} style={{ position:'absolute', left:d.x, top:d.y, width:`${d.s}px`, height:`${d.s}px`, borderRadius:'50%', background:'rgba(243,247,236,.55)', animation:`floatDot ${3.2+i*.35}s ease-in-out ${d.d} infinite`, pointerEvents:'none' }}/>)}</>;
};

/* ── API LOG STEPS ── */
const LOG_STEPS = [
  'Initializing geolocation engine…',
  'Resolving target address…',
  'Querying IP intelligence database…',
  'Fetching ASN & ISP records…',
  'Cross-referencing threat intelligence…',
  'Checking proxy / VPN / Tor signatures…',
  'Aggregating network metadata…',
];

/* ── SECTION LABEL ── */
const SectionLabel = ({ text }) => (
  <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'rgba(116,195,186,.08)', border:'1px solid rgba(116,195,186,.18)', borderRadius:'50px', padding:'7px 20px', marginBottom:'14px' }}>
    <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#74C3BA', display:'inline-block', animation:'glowPulse 2s infinite' }}/>
    <span style={{ fontSize:'11px', fontWeight:'700', letterSpacing:'3px', textTransform:'uppercase', color:'#74C3BA', fontFamily:SF }}>{text}</span>
  </div>
);

/* ── CARD HEADING ── */
const CardHead = ({ icon, text }) => (
  <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'18px' }}>
    {icon}
    <span style={{ fontSize:'10px', fontWeight:'700', letterSpacing:'3px', textTransform:'uppercase', color:'rgba(116,195,186,.5)', fontFamily:SF }}>{text}</span>
  </div>
);

/* ── FOOTER HELPERS ── */
const FHeading = ({ title }) => (
  <div style={{ marginBottom:'20px', position:'relative', paddingBottom:'10px' }}>
    <h3 style={{ color:'#f3f7ec', fontSize:'18px', fontWeight:'600', margin:0, fontFamily:SF }}>{title}</h3>
    <div style={{ position:'absolute', bottom:0, left:0, width:'30px', height:'2px', background:'#f3f7ec', borderRadius:'2px' }}/>
  </div>
);
const FSection = ({ title, links }) => (
  <div>
    <FHeading title={title}/>
    <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:'12px' }}>
      {links.map(l=><li key={l.label}><a href={l.href} className="footer-link" style={{ fontFamily:SF }}>{l.label}</a></li>)}
    </ul>
  </div>
);
const Footer = () => (
  <footer style={{ background:'linear-gradient(135deg,#307075 0%,#2a5f63 100%)', color:'#f3f7ec', padding:'60px 0 20px', position:'relative', overflow:'hidden', fontFamily:SF }}>
    <div style={{ position:'absolute', top:0, left:0, right:0, height:'1px', background:'linear-gradient(90deg,transparent,#f3f7ec,transparent)' }}/>
    <div style={{ maxWidth:'1200px', margin:'0 auto', padding:'0 20px' }}>
      <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', gap:'40px', marginBottom:'40px' }}>
        <div style={{ display:'flex', flexDirection:'column', gap:'20px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'15px', marginBottom:'15px' }}>
            <div style={{ width:'50px', height:'50px', background:'#f3f7ec', borderRadius:'12px', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
              <img src={logo} style={{ width:'35px', height:'35px', objectFit:'contain' }} alt="logo"/>
            </div>
            <span style={{ fontSize:'28px', fontWeight:'700' }}>iSeeWaves</span>
          </div>
          <p style={{ color:'#b8d4d6', fontSize:'16px', lineHeight:1.6, marginBottom:'20px' }}>Protecting your digital assets with advanced cybersecurity solutions.</p>
          <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
            <div style={{ display:'flex', alignItems:'flex-start', gap:'12px' }}>
              <img src={gmailIcon} style={{ width:'20px', height:'20px', objectFit:'contain', marginTop:'2px', opacity:.8 }} alt="email"/>
              <span style={{ fontSize:'15px', lineHeight:1.5 }}>iseewaves.pk@gmail.com</span>
            </div>
            <div style={{ display:'flex', alignItems:'flex-start', gap:'12px' }}>
              <img src={locationIcon} style={{ width:'20px', height:'20px', objectFit:'contain', marginTop:'2px', opacity:.8 }} alt="loc"/>
              <span style={{ fontSize:'15px', lineHeight:1.5 }}>Shop # 10, Plot # 237, Banda Phugwarian,<br/>Banda Batang, Abbottabad</span>
            </div>
          </div>
        </div>
        <FSection title="Quick Links" links={[{label:'Home',href:'/'},{label:'About Us',href:'/about'},{label:'Services',href:'/services'},{label:'Products',href:'/products'},{label:'Blog',href:'#blog'}]}/>
        <FSection title="Company"     links={[{label:'Contact',href:'/contact'},{label:'Careers',href:'/careers'},{label:'Our Team',href:'/careers'},{label:'Partners',href:'#partners'},{label:'News',href:'#news'}]}/>
        <div>
          <FHeading title="Connect With Us"/>
          <div style={{ display:'flex', gap:'15px', marginTop:'10px', flexWrap:'wrap' }}>
            {[{href:'https://www.instagram.com/iseewaves.pk',icon:instagramIcon,alt:'Instagram'},{href:'https://m.facebook.com/iseewaves.pk',icon:facebookIcon,alt:'Facebook'},{href:'https://x.com/iseewaves_',icon:twitterIcon,alt:'X'},{href:'http://www.linkedin.com/company/iseewaves/',icon:linkedinIcon,alt:'LinkedIn'}].map(s=>(
              <a key={s.alt} href={s.href} target="_blank" rel="noreferrer"
                style={{ width:'45px',height:'45px',background:'rgba(243,247,236,.1)',border:'2px solid rgba(243,247,236,.2)',borderRadius:'12px',display:'flex',alignItems:'center',justifyContent:'center',textDecoration:'none',transition:'all .3s' }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor='#f3f7ec';e.currentTarget.style.background='rgba(243,247,236,.15)';e.currentTarget.style.transform='translateY(-3px)';}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(243,247,236,.2)';e.currentTarget.style.background='rgba(243,247,236,.1)';e.currentTarget.style.transform='translateY(0)';}}>
                <img src={s.icon} style={{ width:'24px',height:'24px',objectFit:'contain',opacity:.8 }} alt={s.alt}/>
              </a>
            ))}
          </div>
        </div>
      </div>
      <div style={{ borderTop:'1px solid rgba(243,247,236,.1)', paddingTop:'30px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'20px' }}>
          <span style={{ color:'#b8d4d6', fontSize:'14px' }}>© 2025 iSeeWaves. All rights reserved.</span>
          <div style={{ display:'flex', gap:'30px' }}>
            {[{label:'Privacy Policy',href:'/privacy'},{label:'Terms of Policy',href:'/tos'},{label:'Security',href:'#security'}].map(l=>(
              <a key={l.label} href={l.href} style={{ color:'#b8d4d6',textDecoration:'none',fontSize:'14px',transition:'color .3s',fontFamily:SF }}
                onMouseEnter={e=>e.target.style.color='#f3f7ec'} onMouseLeave={e=>e.target.style.color='#b8d4d6'}>{l.label}</a>
            ))}
          </div>
        </div>
      </div>
    </div>
  </footer>
);

/* ══════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════ */
const IPTrackerPage = () => {
  const [query,   setQuery]   = useState('');
  const [loading, setLoading] = useState(false);
  const [data,    setData]    = useState(null);
  const [logs,    setLogs]    = useState([]);
  const [error,   setError]   = useState(null);
  const [history, setHistory] = useState([]);
  const logsEndRef  = useRef(null);
  const resultsRef  = useRef(null);

  useEffect(()=>{ logsEndRef.current?.scrollIntoView({ behavior:'smooth', block:'nearest' }); }, [logs]);

  const addLog = (msg, type='normal') =>
    setLogs(p => [...p, { msg, type, id: Date.now()+Math.random() }]);

  const runTrack = async () => {
    const ip = query.trim();
    if (!ip) return;
    setLoading(true); setData(null); setLogs([]); setError(null);

    setTimeout(()=>{ resultsRef.current?.scrollIntoView({ behavior:'smooth', block:'start' }); }, 120);

    // Animate logs while API call runs
    const animLogs = async () => {
      for (let i=0; i<LOG_STEPS.length; i++) {
        await new Promise(r=>setTimeout(r,450));
        addLog(LOG_STEPS[i], 'normal');
      }
    };
    const logP = animLogs();

    let result = null;
    let err    = null;

    try {
      const res = await fetch(`${API_BASE}/tracker`, {
        method:'POST',
        headers:{ 'Content-Type':'application/json' },
        body: JSON.stringify({ target: ip }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Tracking failed');
      result = json;
    } catch (e) {
      err = e.message || 'Cannot connect to backend';
    }

    await logP;

    if (err) {
      addLog(`✗ Error: ${err}`, 'err');
      setError(err);
    } else {
      addLog(`✓ Intelligence report ready for ${ip}`, 'done');
      setData(result);
      setHistory(p => [ip, ...p.filter(x=>x!==ip)].slice(0,8));
    }
    setLoading(false);
  };

  const riskColor = v => v < 30 ? '#52c97a' : v < 60 ? '#f0a500' : '#ff6b7a';

  return (
    <>
      <GlobalStyles/>
      <Navbar/>

      {/* ══ HERO ══ */}
      <section style={{ marginTop:'90px', minHeight:'100vh', position:'relative', overflow:'hidden', display:'flex', alignItems:'center', fontFamily:SF }}>
        {/* Video background */}
        <video autoPlay muted loop playsInline
          style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', zIndex:0, filter:'brightness(0.35)' }}>
          <source src={videoBg} type="video/mp4"/>
        </video>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,rgba(8,25,30,.78) 0%,rgba(20,65,70,.58) 50%,rgba(8,25,30,.82) 100%)', zIndex:1 }}/>
        {/* Grid */}
        <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(116,195,186,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(116,195,186,.035) 1px,transparent 1px)', backgroundSize:'60px 60px', zIndex:2, pointerEvents:'none' }}/>
        {/* Scan line */}
        <div style={{ position:'absolute', left:0, right:0, height:'1.5px', background:'linear-gradient(90deg,transparent,rgba(116,195,186,.5),transparent)', animation:'scanLine 6s linear infinite', zIndex:3, pointerEvents:'none' }}/>
        {/* Left accent */}
        <div style={{ position:'absolute', left:0, top:0, bottom:0, width:'3px', background:'linear-gradient(180deg,transparent,#74C3BA,#306F74,transparent)', zIndex:4 }}/>
        <FloatingDots/>

        <div style={{ position:'relative', zIndex:5, padding:'80px 90px', maxWidth:'1100px', display:'flex', alignItems:'center', gap:'60px', width:'100%' }}>
          <div style={{ flex:1 }}>
            {/* Breadcrumb */}
            <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'28px', animation:'fadeUp .5s ease both' }}>
              <span style={{ width:'28px', height:'1.5px', background:'#74C3BA', display:'inline-block' }}/>
              <a href="/" style={{ color:'rgba(255,255,255,.4)', textDecoration:'none', fontSize:'11px', letterSpacing:'2px', textTransform:'uppercase', fontWeight:'600' }}>Home</a>
              <span style={{ color:'rgba(255,255,255,.2)' }}>›</span>
              <a href="/services" style={{ color:'rgba(255,255,255,.4)', textDecoration:'none', fontSize:'11px', letterSpacing:'2px', textTransform:'uppercase', fontWeight:'600' }}>Services</a>
              <span style={{ color:'rgba(255,255,255,.2)' }}>›</span>
              <span style={{ color:'#74C3BA', fontSize:'11px', letterSpacing:'2px', textTransform:'uppercase', fontWeight:'800' }}>IP Tracker</span>
            </div>

            {/* Live badge */}
            <div style={{ display:'inline-flex', alignItems:'center', gap:'10px', background:'rgba(116,195,186,.1)', border:'1px solid rgba(116,195,186,.3)', borderRadius:'50px', padding:'8px 20px', marginBottom:'28px', animation:'fadeUp .6s ease .1s both' }}>
              <div style={{ position:'relative' }}>
                <div style={{ width:'9px', height:'9px', borderRadius:'50%', background:'#74C3BA' }}/>
                <div style={{ position:'absolute', inset:0, borderRadius:'50%', background:'#74C3BA', animation:'ping 1.8s ease-in-out infinite' }}/>
              </div>
              <span style={{ fontSize:'11px', fontWeight:'800', letterSpacing:'3px', textTransform:'uppercase', color:'#74C3BA' }}>Live — Geolocation Intelligence</span>
            </div>

            {/* Heading */}
            <h1 style={{ fontFamily:SF, fontWeight:'900', margin:'0 0 16px', animation:'fadeUp .7s ease .2s both' }}>
              <span style={{ fontSize:'clamp(3.5rem,8vw,7rem)', color:'#fff', display:'block', lineHeight:1, letterSpacing:'-3px' }}>IP Tracker</span>
              <span style={{ fontSize:'clamp(1.3rem,3vw,2.4rem)', color:'#74C3BA', display:'block', letterSpacing:'-1px', fontWeight:'700', lineHeight:1.3, position:'relative' }}>
                Geolocation Intelligence Tool
                <span style={{ position:'absolute', bottom:'-4px', left:0, width:'50%', height:'3px', background:'linear-gradient(90deg,#74C3BA,transparent)', borderRadius:'2px', overflow:'hidden' }}>
                  <span style={{ position:'absolute', inset:0, background:'linear-gradient(90deg,transparent,rgba(255,255,255,.7),transparent)', animation:'shimmer 2.5s ease-in-out infinite' }}/>
                </span>
              </span>
            </h1>

            <p style={{ fontSize:'17px', color:'rgba(255,255,255,.5)', maxWidth:'540px', lineHeight:1.85, animation:'fadeUp .8s ease .3s both', marginBottom:'36px' }}>
              Pinpoint any IPv4 or IPv6 address on an interactive world map — ISP details, ASN info, country, city, timezone, and full threat-intelligence data in real time.
            </p>

            {/* Stats row */}
            <div style={{ display:'flex', gap:'0', animation:'fadeUp .9s ease .4s both', marginBottom:'40px' }}>
              {[['200+','Countries'],['IPv4 & v6','Supported'],['Real-Time','Live Data'],['Threat','Intelligence']].map(([num,label],i)=>(
                <React.Fragment key={label}>
                  <div style={{ textAlign:'center', padding:'0 26px' }}>
                    <div style={{ fontSize:'1.7rem', fontWeight:'900', color:'#74C3BA', lineHeight:1, letterSpacing:'-1px', fontFamily:MONO }}>{num}</div>
                    <div style={{ fontSize:'10px', color:'rgba(255,255,255,.38)', letterSpacing:'1px', marginTop:'4px', textTransform:'uppercase' }}>{label}</div>
                  </div>
                  {i<3 && <div style={{ width:'1px', background:'rgba(116,195,186,.15)', alignSelf:'stretch' }}/>}
                </React.Fragment>
              ))}
            </div>

            {/* CTA buttons */}
            <div style={{ display:'flex', gap:'16px', flexWrap:'wrap', animation:'fadeUp 1s ease .5s both' }}>
              <a href="#tool" style={{ padding:'16px 36px', borderRadius:'50px', background:'linear-gradient(135deg,#306F74,#74C3BA)', color:'white', textDecoration:'none', fontWeight:'800', fontSize:'15px', display:'inline-flex', alignItems:'center', gap:'10px', boxShadow:'0 8px 28px rgba(48,111,116,.45)', transition:'all .3s' }}
                onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-3px)';e.currentTarget.style.boxShadow='0 14px 38px rgba(48,111,116,.6)';}}
                onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='0 8px 28px rgba(48,111,116,.45)';}}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="10" r="3"/><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 14 8 14s8-8.75 8-14a8 8 0 0 0-8-8z"/></svg>
                Track an IP
              </a>
              <a href="/services" style={{ padding:'16px 36px', borderRadius:'50px', border:'1.5px solid rgba(116,195,186,.35)', color:'rgba(255,255,255,.8)', textDecoration:'none', fontWeight:'700', fontSize:'15px', display:'inline-flex', alignItems:'center', gap:'10px', transition:'all .3s' }}
                onMouseEnter={e=>{e.currentTarget.style.background='rgba(116,195,186,.1)';e.currentTarget.style.borderColor='#74C3BA';e.currentTarget.style.color='#fff';}}
                onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.borderColor='rgba(116,195,186,.35)';e.currentTarget.style.color='rgba(255,255,255,.8)';}}>
                ← Back to Services
              </a>
            </div>
          </div>

          {/* Radar */}
          <div style={{ opacity:.75, animation:'fadeIn 1s ease .6s both' }}>
            <RadarWidget/>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position:'absolute', bottom:'32px', left:'50%', transform:'translateX(-50%)', zIndex:5, display:'flex', flexDirection:'column', alignItems:'center', gap:'6px' }}>
          <span style={{ fontSize:'10px', color:'rgba(116,195,186,.4)', letterSpacing:'3px', textTransform:'uppercase' }}>Scroll</span>
          <div style={{ width:'1px', height:'40px', background:'linear-gradient(180deg,rgba(116,195,186,.5),transparent)' }}/>
        </div>
      </section>

      {/* ══ TOOL SECTION ══ */}
      <section id="tool" style={{ background:'#080f12', padding:'70px 0 80px', fontFamily:SF }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto', padding:'0 40px' }}>

          {/* Section heading */}
          <div style={{ textAlign:'center', marginBottom:'40px' }}>
            <SectionLabel text="IP Intelligence"/>
            <h2 style={{ fontSize:'2.2rem', fontWeight:'900', color:'#fff', letterSpacing:'-1px', margin:0 }}>
              Track Any <span style={{ color:'#74C3BA' }}>IP Address</span>
            </h2>
          </div>

          {/* ── SEARCH BOX ── */}
          <div style={{ background:'rgba(255,255,255,.02)', border:'1px solid rgba(116,195,186,.12)', borderRadius:'24px', padding:'28px', marginBottom:'24px', position:'relative', overflow:'hidden', animation:'fadeUp .5s ease both' }}>
            <div style={{ position:'absolute', top:0, left:0, right:0, height:'2px', background:'linear-gradient(90deg,transparent,#74C3BA,transparent)' }}/>

            <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'18px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#74C3BA" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="10" r="3"/><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 14 8 14s8-8.75 8-14a8 8 0 0 0-8-8z"/></svg>
              <span style={{ fontSize:'11px', fontWeight:'700', letterSpacing:'3px', textTransform:'uppercase', color:'#74C3BA' }}>Enter Target</span>
              <div style={{ marginLeft:'auto', display:'flex', alignItems:'center', gap:'8px' }}>
                <div style={{ width:'8px', height:'8px', borderRadius:'50%', background: error?'#ff4d4d': loading?'#f0a500':'#52c97a', animation: loading?'ping 1s infinite':'glowPulse 2s infinite' }}/>
                <span style={{ fontSize:'11px', color:'rgba(116,195,186,.5)', letterSpacing:'1px', textTransform:'uppercase', fontWeight:'700' }}>
                  {error?'Error': loading?'Tracking…':'Ready'}
                </span>
              </div>
            </div>

            <div style={{ display:'flex', gap:'12px', alignItems:'center', flexWrap:'wrap' }}>
              <div style={{ flex:1, minWidth:'240px', position:'relative' }}>
                <input
                  className="ip-input"
                  value={query}
                  onChange={e=>setQuery(e.target.value)}
                  onKeyDown={e=>e.key==='Enter'&&!loading&&runTrack()}
                  placeholder="IPv4, IPv6 or domain — e.g. 8.8.8.8 / google.com"
                />
                {loading && (
                  <div style={{ position:'absolute', right:'16px', top:'50%', transform:'translateY(-50%)', width:'18px', height:'18px', border:'2px solid rgba(116,195,186,.2)', borderTopColor:'#74C3BA', borderRadius:'50%', animation:'spin .7s linear infinite' }}/>
                )}
              </div>
              <button className="track-btn" onClick={runTrack} disabled={loading||!query.trim()}>
                {loading ? (
                  <><div style={{ width:'16px', height:'16px', border:'2px solid rgba(255,255,255,.3)', borderTopColor:'white', borderRadius:'50%', animation:'spin .7s linear infinite' }}/>Tracking…</>
                ) : (
                  <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="10" r="3"/><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 14 8 14s8-8.75 8-14a8 8 0 0 0-8-8z"/></svg>Track IP</>
                )}
              </button>
              {(data||error)&&!loading && (
                <button className="ghost-btn" onClick={()=>{setData(null);setLogs([]);setError(null);setQuery('');}}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#74C3BA" strokeWidth="2" strokeLinecap="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.5"/></svg>
                  Clear
                </button>
              )}
            </div>

            {/* Quick examples */}
            <div style={{ marginTop:'16px', display:'flex', alignItems:'center', gap:'8px', flexWrap:'wrap' }}>
              <span style={{ fontSize:'11px', fontWeight:'700', letterSpacing:'2px', textTransform:'uppercase', color:'rgba(116,195,186,.35)' }}>Try:</span>
              {['8.8.8.8','1.1.1.1','208.67.222.222'].map(ip=>(
                <button key={ip} className="hist-pill" onClick={()=>setQuery(ip)}>{ip}</button>
              ))}
            </div>
          </div>

          {/* ── RESULTS AREA ── */}
          <div ref={resultsRef}>

            {/* Terminal */}
            {logs.length > 0 && (
              <div style={{ background:'#020c0f', borderRadius:'16px', border:'1px solid rgba(116,195,186,.1)', marginBottom:'24px', overflow:'hidden', animation:'fadeUp .4s ease both' }}>
                <div style={{ padding:'10px 18px', borderBottom:'1px solid rgba(116,195,186,.07)', display:'flex', alignItems:'center', gap:'8px', background:'rgba(116,195,186,.03)' }}>
                  {['#ff5f56','#ffbd2e','#27c93f'].map(c=><div key={c} style={{ width:'11px', height:'11px', borderRadius:'50%', background:c }}/>)}
                  <span style={{ fontSize:'11px', color:'rgba(116,195,186,.3)', marginLeft:'8px', fontFamily:MONO }}>geo-engine@iseewaves ~ tracker {query}</span>
                </div>
                <div style={{ padding:'16px 22px', maxHeight:'200px', overflowY:'auto' }}>
                  {logs.map((log,i)=>(
                    <div key={log.id} className={`tline ${log.type}`} style={{ animationDelay:`${i*.04}s` }}>
                      <span style={{ color:'rgba(116,195,186,.3)', marginRight:'12px' }}>[{String(i+1).padStart(2,'0')}]</span>
                      {log.msg}
                      {i===logs.length-1&&loading&&<span style={{ animation:'blink 1s infinite' }}> ▌</span>}
                    </div>
                  ))}
                  <div ref={logsEndRef}/>
                </div>
              </div>
            )}

            {/* Error */}
            {error&&!loading && (
              <div style={{ background:'rgba(255,77,77,.06)', border:'1px solid rgba(255,77,77,.2)', borderRadius:'16px', padding:'24px 28px', marginBottom:'24px', display:'flex', alignItems:'flex-start', gap:'16px', animation:'fadeUp .4s ease both' }}>
                <span style={{ fontSize:'2rem', flexShrink:0 }}>⚠️</span>
                <div>
                  <div style={{ color:'#ff4d4d', fontWeight:'800', fontSize:'15px', marginBottom:'8px' }}>Unable to Track IP</div>
                  <div style={{ color:'rgba(255,120,120,.7)', fontSize:'13px', fontFamily:MONO, marginBottom:'10px' }}>{error}</div>
                  <div style={{ color:'rgba(116,195,186,.5)', fontSize:'12px', lineHeight:1.7 }}>
                    Make sure Flask backend is running:<br/>
                    <code style={{ color:'#74C3BA', background:'rgba(116,195,186,.08)', padding:'2px 8px', borderRadius:'4px' }}>python recon_app.py</code>
                    <span style={{ marginLeft:'10px', opacity:.6 }}>→ localhost:5000</span>
                  </div>
                </div>
              </div>
            )}

            {/* Results */}
            {data&&!loading && (
              <div style={{ animation:'fadeUp .5s ease both' }}>

                {/* Result header */}
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'20px', flexWrap:'wrap', gap:'12px' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                    <div style={{ width:'9px', height:'9px', borderRadius:'50%', background:'#52c97a', animation:'glowPulse 2s infinite' }}/>
                    <span style={{ fontSize:'12px', fontWeight:'700', color:'#52c97a', letterSpacing:'1.5px', textTransform:'uppercase' }}>
                      Report Ready — {data.ip || query}
                    </span>
                  </div>
                  <button className="ghost-btn" onClick={()=>{
                    const blob = new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
                    const url  = URL.createObjectURL(blob);
                    const a    = document.createElement('a'); a.href=url; a.download=`ip_${query}_${Date.now()}.json`; a.click();
                    URL.revokeObjectURL(url);
                  }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#74C3BA" strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                    Export JSON
                  </button>
                </div>

                {/* 2-col: Map LEFT | Info RIGHT */}
                <div className="tracker-2col" style={{ display:'grid', gridTemplateColumns:'1.1fr 1fr', gap:'18px', marginBottom:'18px', alignItems:'start' }}>

                  {/* LEFT — Map */}
                  <div className="rcard" style={{ padding:0, overflow:'hidden', border:'1.5px solid rgba(116,195,186,.18)', animationDelay:'.05s' }}>
                    <div style={{ padding:'14px 20px', display:'flex', alignItems:'center', gap:'10px', borderBottom:'1px solid rgba(116,195,186,.1)', background:'rgba(0,0,0,.25)' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#74C3BA" strokeWidth="2" strokeLinecap="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/></svg>
                      <span style={{ fontSize:'10px', fontWeight:'700', letterSpacing:'3px', textTransform:'uppercase', color:'rgba(116,195,186,.5)' }}>Interactive Map</span>
                      <span style={{ marginLeft:'auto', fontSize:'11px', color:'rgba(116,195,186,.4)', fontFamily:MONO }}>
                        {data.latitude&&data.longitude ? `${data.latitude}°, ${data.longitude}°` : ''}
                      </span>
                    </div>
                    <div style={{ height:'320px', position:'relative' }}>
                      <WorldMap
                        lat={data.latitude  ? parseFloat(data.latitude)  : null}
                        lon={data.longitude ? parseFloat(data.longitude) : null}
                      />
                      {/* Overlay info */}
                      {data.city && (
                        <div style={{ position:'absolute', bottom:'14px', left:'14px', background:'rgba(7,19,24,.88)', backdropFilter:'blur(8px)', border:'1px solid rgba(116,195,186,.2)', borderRadius:'10px', padding:'10px 14px' }}>
                          <div style={{ fontSize:'13px', fontWeight:'700', color:'#e8f5f3' }}>{data.flag||'🌍'} {data.city}, {data.country}</div>
                          {data.latitude && <div style={{ fontSize:'11px', color:'rgba(116,195,186,.5)', marginTop:'3px', fontFamily:MONO }}>{data.latitude}, {data.longitude}</div>}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* RIGHT — Info cards stacked */}
                  <div style={{ display:'flex', flexDirection:'column', gap:'14px' }}>

                    {/* Location */}
                    <div className="rcard" style={{ animationDelay:'.1s' }}>
                      <CardHead
                        icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#74C3BA" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="10" r="3"/><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 14 8 14s8-8.75 8-14a8 8 0 0 0-8-8z"/></svg>}
                        text="Location"
                      />
                      {/* Country flag + name */}
                      <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'14px' }}>
                        <span style={{ fontSize:'2.4rem', lineHeight:1 }}>{data.flag||'🌍'}</span>
                        <div>
                          <div style={{ fontSize:'1.1rem', fontWeight:'800', color:'#e8f5f3', lineHeight:1.1 }}>{data.country||'Unknown'}</div>
                          <div style={{ fontSize:'11px', fontWeight:'700', color:'rgba(116,195,186,.45)', letterSpacing:'2px', fontFamily:MONO }}>{data.country_code||''}</div>
                        </div>
                      </div>
                      {[['🏙️ City', data.city],['🗾 Region', data.region],['📮 Postal', data.postal],['⏰ Timezone', data.timezone]].map(([k,v])=>(
                        <div key={k} className="irow">
                          <span style={{ fontSize:'11px', fontWeight:'700', letterSpacing:'1.5px', textTransform:'uppercase', color:'rgba(116,195,186,.4)', minWidth:'90px', fontFamily:MONO, flexShrink:0 }}>{k}</span>
                          <span style={{ fontSize:'13px', color:'#e8f5f3', fontWeight:'500' }}>{v||'N/A'}</span>
                        </div>
                      ))}
                    </div>

                    {/* Network */}
                    <div className="rcard" style={{ animationDelay:'.15s' }}>
                      <CardHead
                        icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#74C3BA" strokeWidth="2" strokeLinecap="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>}
                        text="Network"
                      />
                      {[['🔢 IP',   data.ip||query],['🏢 ISP', data.isp],['🏛️ Org', data.org],['📡 ASN', data.asn],['📍 Lat', data.latitude],['📍 Lon', data.longitude]].map(([k,v])=>(
                        <div key={k} className="irow">
                          <span style={{ fontSize:'11px', fontWeight:'700', letterSpacing:'1.5px', textTransform:'uppercase', color:'rgba(116,195,186,.4)', minWidth:'70px', fontFamily:MONO, flexShrink:0 }}>{k}</span>
                          <span style={{ fontSize:'12px', color:'#e8f5f3', fontFamily:MONO, wordBreak:'break-all' }}>{v||'N/A'}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Threat Intelligence — full width */}
                <div className="rcard" style={{ marginBottom:'18px', animationDelay:'.2s' }}>
                  <CardHead
                    icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#74C3BA" strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>}
                    text="Threat Intelligence"
                  />
                  <div className="threat-grid" style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:'12px', marginBottom:'22px' }}>
                    {[['proxy','🔀','Proxy'],['vpn','🛡️','VPN'],['tor','🧅','Tor Node'],['mobile','📱','Mobile'],['hosting','🖥️','Hosting']].map(([key,ico,label])=>(
                      <div className="tchip" key={key}>
                        <span style={{ fontSize:'1.5rem', marginBottom:'6px' }}>{ico}</span>
                        <span style={{ fontSize:'10px', fontWeight:'700', letterSpacing:'1.5px', textTransform:'uppercase', color:'rgba(116,195,186,.4)', marginBottom:'6px', fontFamily:SF }}>{label}</span>
                        <span style={{ fontSize:'13px', fontWeight:'800', color: data[key]?'#ff6b7a':'#52c97a', fontFamily:MONO }}>{data[key]?'YES':'NO'}</span>
                      </div>
                    ))}
                  </div>
                  {/* Abuse score bar */}
                  {data.abuse_score !== undefined && (
                    <div>
                      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'8px' }}>
                        <span style={{ fontSize:'11px', fontWeight:'700', letterSpacing:'2px', textTransform:'uppercase', color:'rgba(116,195,186,.45)' }}>Abuse Confidence Score</span>
                        <span style={{ fontSize:'14px', fontWeight:'800', color:riskColor(data.abuse_score), fontFamily:MONO }}>{data.abuse_score}%</span>
                      </div>
                      <div style={{ height:'6px', background:'rgba(116,195,186,.1)', borderRadius:'6px', overflow:'hidden' }}>
                        <div style={{ height:'100%', width:`${data.abuse_score}%`, background:`linear-gradient(90deg,#52c97a,${riskColor(data.abuse_score)})`, borderRadius:'6px', transformOrigin:'left', animation:'slideRight .8s ease .3s both' }}/>
                      </div>
                      <div style={{ display:'flex', justifyContent:'space-between', marginTop:'5px' }}>
                        <span style={{ fontSize:'10px', color:'rgba(116,195,186,.3)', fontFamily:MONO }}>0 — Clean</span>
                        <span style={{ fontSize:'10px', color:'rgba(116,195,186,.3)', fontFamily:MONO }}>100 — Critical</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Empty state */}
            {!data&&!loading&&logs.length===0&&!error && (
              <div style={{ textAlign:'center', padding:'60px 20px', animation:'fadeIn .6s ease both' }}>
                <div style={{ width:'80px', height:'80px', borderRadius:'50%', background:'rgba(48,111,116,.08)', border:'1.5px solid rgba(116,195,186,.15)', margin:'0 auto 20px', display:'flex', alignItems:'center', justifyContent:'center', animation:'glowPulse 3s ease-in-out infinite' }}>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#74C3BA" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="10" r="3"/><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 14 8 14s8-8.75 8-14a8 8 0 0 0-8-8z"/></svg>
                </div>
                <h3 style={{ fontSize:'1.3rem', fontWeight:'700', color:'#e8f5f3', margin:'0 0 10px', fontFamily:SF }}>Enter an IP to get started</h3>
                <p style={{ fontSize:'14px', color:'rgba(116,195,186,.4)', lineHeight:1.7, maxWidth:'380px', margin:'0 auto 20px', fontFamily:SF }}>
                  Type any IPv4, IPv6 address, or domain name above and press <strong style={{ color:'#74C3BA' }}>Track IP</strong>.
                </p>
                <div style={{ display:'flex', gap:'10px', justifyContent:'center', flexWrap:'wrap' }}>
                  {['8.8.8.8','1.1.1.1','208.67.222.222'].map(ip=>(
                    <button key={ip} className="hist-pill" onClick={()=>setQuery(ip)}>{ip}</button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ══ RECENT SEARCHES HISTORY ══ */}
          {history.length > 0 && (
            <div style={{ marginTop:'50px', animation:'fadeUp .5s ease both' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'14px', marginBottom:'20px' }}>
                <div style={{ flex:1, height:'1px', background:'rgba(116,195,186,.1)' }}/>
                <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#74C3BA" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  <span style={{ fontSize:'11px', fontWeight:'700', letterSpacing:'3px', textTransform:'uppercase', color:'rgba(116,195,186,.5)', fontFamily:SF }}>Recent Searches</span>
                </div>
                <div style={{ flex:1, height:'1px', background:'rgba(116,195,186,.1)' }}/>
              </div>

              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))', gap:'12px' }}>
                {history.map((ip,i) => (
                  <div key={ip}
                    onClick={()=>{ setQuery(ip); runTrack(); }}
                    style={{ background:'rgba(116,195,186,.04)', border:'1px solid rgba(116,195,186,.1)', borderRadius:'14px', padding:'16px 18px', cursor:'pointer', transition:'all .25s', display:'flex', alignItems:'center', gap:'12px', animation:`cardEntrance .4s ease ${i*.06}s both` }}
                    onMouseEnter={e=>{e.currentTarget.style.background='rgba(116,195,186,.1)';e.currentTarget.style.borderColor='rgba(116,195,186,.25)';e.currentTarget.style.transform='translateY(-3px)';}}
                    onMouseLeave={e=>{e.currentTarget.style.background='rgba(116,195,186,.04)';e.currentTarget.style.borderColor='rgba(116,195,186,.1)';e.currentTarget.style.transform='translateY(0)';}}>
                    <div style={{ width:'32px', height:'32px', borderRadius:'8px', background:'rgba(116,195,186,.1)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#74C3BA" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="10" r="3"/><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 14 8 14s8-8.75 8-14a8 8 0 0 0-8-8z"/></svg>
                    </div>
                    <div>
                      <div style={{ fontSize:'13px', fontWeight:'700', color:'#e8f5f3', fontFamily:MONO }}>{ip}</div>
                      <div style={{ fontSize:'10px', color:'rgba(116,195,186,.4)', marginTop:'2px' }}>Click to re-track</div>
                    </div>
                    <div style={{ marginLeft:'auto', opacity:.4 }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#74C3BA" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ textAlign:'center', marginTop:'16px' }}>
                <button className="ghost-btn" onClick={()=>setHistory([])}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#74C3BA" strokeWidth="2" strokeLinecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6M10 11v6M14 11v6"/></svg>
                  Clear History
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer/>
    </>
  );
};

export default IPTrackerPage;