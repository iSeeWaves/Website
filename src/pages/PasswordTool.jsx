import React, { useState, useEffect, useRef, useCallback } from 'react';

const API_BASE = 'http://localhost:5003/api';

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

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&family=Space+Mono:wght@400;700&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --teal: #306F74; --teal-l: #74C3BA; --teal-d: #0a1a1f;
      --cream: #f3f7ec; --bg-dark: #080f12;
    }
    @keyframes fadeUp    { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
    @keyframes fadeIn    { from{opacity:0} to{opacity:1} }
    @keyframes spin      { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
    @keyframes ping      { 0%{transform:scale(1);opacity:.9} 80%,100%{transform:scale(2.4);opacity:0} }
    @keyframes blink     { 0%,100%{opacity:1} 50%{opacity:0} }
    @keyframes scanLine  { 0%{top:0%;opacity:0} 5%{opacity:1} 95%{opacity:1} 100%{top:100%;opacity:0} }
    @keyframes glowPulse { 0%,100%{box-shadow:0 0 0 0 rgba(116,195,186,.45)} 50%{box-shadow:0 0 0 10px rgba(116,195,186,0)} }
    @keyframes shimmer   { 0%{transform:translateX(-100%)} 100%{transform:translateX(300%)} }
    @keyframes float     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
    @keyframes floatDot  { 0%,100%{transform:translateY(0) translateX(0);opacity:.3} 33%{transform:translateY(-14px) translateX(6px);opacity:.65} 66%{transform:translateY(8px) translateX(-5px);opacity:.35} }
    @keyframes slideRight{ from{transform:scaleX(0)} to{transform:scaleX(1)} }
    @keyframes copyPop   { 0%{transform:scale(1)} 50%{transform:scale(1.15)} 100%{transform:scale(1)} }
    @keyframes cardIn    { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }

    .pw-input {
      width:100%; padding:16px 50px 16px 24px;
      background:rgba(116,195,186,.06);
      border:1.5px solid rgba(116,195,186,.22);
      border-radius:14px; color:#e8f5f3;
      font-size:16px; font-family:${MONO};
      outline:none; transition:all .3s; letter-spacing:2px;
    }
    .pw-input:focus { border-color:#74C3BA; background:rgba(116,195,186,.1); box-shadow:0 0 0 4px rgba(116,195,186,.12); }
    .pw-input::placeholder { color:rgba(116,195,186,.3); letter-spacing:.5px; font-size:14px; }

    .suggest-card {
      background:rgba(116,195,186,.04);
      border:1px solid rgba(116,195,186,.12);
      border-radius:14px; padding:14px 18px;
      display:flex; align-items:center; justify-content:space-between; gap:12px;
      transition:all .25s; animation:cardIn .4s ease both;
    }
    .suggest-card:hover { background:rgba(116,195,186,.1); border-color:rgba(116,195,186,.3); transform:translateX(4px); }

    .copy-btn {
      width:32px; height:32px; border-radius:8px; border:none; cursor:pointer;
      background:rgba(116,195,186,.1); color:#74C3BA;
      display:flex; align-items:center; justify-content:center;
      transition:all .2s; flex-shrink:0;
    }
    .copy-btn:hover { background:rgba(116,195,186,.2); }
    .copy-btn.copied { background:rgba(82,201,122,.15); color:#52c97a; animation:copyPop .3s ease; }

    .strength-bar { height:6px; border-radius:6px; flex:1; background:rgba(116,195,186,.1); overflow:hidden; }
    .strength-bar-fill { height:100%; border-radius:6px; transform-origin:left; animation:slideRight .5s ease both; }

    .crit-row { display:flex; align-items:center; gap:10px; padding:6px 0; }
    .crit-dot { width:8px; height:8px; border-radius:50%; flex-shrink:0; transition:all .3s; }

    .nav-link { text-decoration:none; color:#F4F7EC; font-size:16px; font-weight:700; transition:all .3s; padding-bottom:3px; }
    .nav-link:hover { color:#fff; border-bottom:2px solid #fff; }
    .footer-link { color:#b8d4d6; text-decoration:none; font-size:15px; display:inline-block; transition:all .3s; }
    .footer-link:hover { color:#f3f7ec; transform:translateX(8px); }

    .style-badge {
      display:inline-flex; align-items:center; gap:4px;
      padding:2px 8px; border-radius:20px; font-size:10px; font-weight:700;
      letter-spacing:1px; text-transform:uppercase; font-family:${SF};
    }

    .hamburger-btn { display:none !important; }
    @media(max-width:860px) {
      .hamburger-btn { display:block !important; }
      .nav-links { display:none !important; }
      .nav-links.open { display:flex !important; flex-direction:column; position:absolute; top:90px; left:0; right:0; background:#306F74; padding:20px; z-index:999; }
      .pw-2col { grid-template-columns:1fr !important; }
    }
  `}</style>
);

// ── Style badge colors ──
const styleColors = {
  'Random Secure':  { bg:'rgba(116,195,186,.12)', color:'#74C3BA' },
  'Memorable':      { bg:'rgba(167,139,250,.12)', color:'#a78bfa' },
  'Based on Yours': { bg:'rgba(251,146,60,.12)',  color:'#fb923c' },
  'Pattern Based':  { bg:'rgba(244,114,182,.12)', color:'#f472b6' },
  'PIN Groups':     { bg:'rgba(96,165,250,.12)',  color:'#60a5fa' },
  'Alphanumeric':   { bg:'rgba(52,211,153,.12)',  color:'#34d399' },
};

const styleIcons = {
  'Random Secure':  '🔐',
  'Memorable':      '💡',
  'Based on Yours': '🔄',
  'Pattern Based':  '🔤',
  'PIN Groups':     '📌',
  'Alphanumeric':   '🔡',
};

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

const FloatingDots = () => {
  const dots = [{x:'8%',y:'25%',d:'0s',s:3},{x:'22%',y:'70%',d:'1.1s',s:2},{x:'45%',y:'20%',d:'.5s',s:3},{x:'65%',y:'60%',d:'1.6s',s:2},{x:'78%',y:'35%',d:'.9s',s:2},{x:'88%',y:'75%',d:'.3s',s:3}];
  return <>{dots.map((d,i)=><div key={i} style={{ position:'absolute', left:d.x, top:d.y, width:`${d.s}px`, height:`${d.s}px`, borderRadius:'50%', background:'rgba(243,247,236,.55)', animation:`floatDot ${3.2+i*.35}s ease-in-out ${d.d} infinite`, pointerEvents:'none' }}/>)}</>;
};

const SectionLabel = ({ text }) => (
  <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'rgba(116,195,186,.08)', border:'1px solid rgba(116,195,186,.18)', borderRadius:'50px', padding:'7px 20px', marginBottom:'14px' }}>
    <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#74C3BA', display:'inline-block', animation:'glowPulse 2s infinite' }}/>
    <span style={{ fontSize:'11px', fontWeight:'700', letterSpacing:'3px', textTransform:'uppercase', color:'#74C3BA', fontFamily:SF }}>{text}</span>
  </div>
);

const CardHead = ({ icon, text }) => (
  <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'18px' }}>
    {icon}
    <span style={{ fontSize:'10px', fontWeight:'700', letterSpacing:'3px', textTransform:'uppercase', color:'rgba(116,195,186,.5)', fontFamily:SF }}>{text}</span>
  </div>
);

const LockWidget = () => (
  <div style={{ position:'relative', width:'200px', height:'200px', flexShrink:0, animation:'float 5s ease-in-out infinite' }}>
    {[0,1,2,3].map(i=>(
      <div key={i} style={{ position:'absolute', inset:`${i*22}%`, border:'1px solid rgba(116,195,186,.18)', borderRadius:'50%' }}/>
    ))}
    <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ width:'72px', height:'72px', borderRadius:'18px', background:'rgba(116,195,186,.12)', border:'1.5px solid rgba(116,195,186,.3)', display:'flex', alignItems:'center', justifyContent:'center', animation:'glowPulse 2.5s infinite' }}>
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#74C3BA" strokeWidth="1.5" strokeLinecap="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          <circle cx="12" cy="16" r="1.2" fill="#74C3BA"/>
        </svg>
      </div>
    </div>
    <div style={{ position:'absolute', top:'18%', left:'18%', width:'9px', height:'9px', borderRadius:'50%', background:'#74C3BA', boxShadow:'0 0 10px rgba(116,195,186,.9)', animation:'ping 2s ease-in-out infinite' }}/>
    <div style={{ position:'absolute', bottom:'20%', right:'18%', width:'7px', height:'7px', borderRadius:'50%', background:'rgba(116,195,186,.6)', animation:'ping 2.5s ease-in-out .5s infinite' }}/>
  </div>
);

/* ── PASSWORD STRENGTH (frontend only, instant) ── */
const analyzePassword = (pw) => {
  if (!pw) return { score:0, label:'', color:'transparent', width:'0%', entropy:0 };
  const criteria = {
    length8:   pw.length >= 8,
    length12:  pw.length >= 12,
    uppercase: /[A-Z]/.test(pw),
    lowercase: /[a-z]/.test(pw),
    numbers:   /[0-9]/.test(pw),
    symbols:   /[^A-Za-z0-9]/.test(pw),
    noRepeat:  !/(.)\1{2,}/.test(pw),
    noCommon:  !['password','123456','qwerty','admin','letmein','welcome','abc123'].some(c => pw.toLowerCase().includes(c)),
  };
  let charsetSize = 0;
  if (criteria.lowercase) charsetSize += 26;
  if (criteria.uppercase) charsetSize += 26;
  if (criteria.numbers)   charsetSize += 10;
  if (criteria.symbols)   charsetSize += 32;
  const entropy = charsetSize > 0 ? Math.floor(pw.length * Math.log2(charsetSize)) : 0;
  const passed  = Object.values(criteria).filter(Boolean).length;
  let score, label, color, width;
  if (pw.length < 4)    { score=0; label='Too Short';   color='#ff4d4d'; width='8%'; }
  else if (passed <= 3) { score=1; label='Weak';        color='#ff6b7a'; width='20%'; }
  else if (passed <= 5) { score=2; label='Fair';        color='#f0a500'; width='45%'; }
  else if (passed <= 6) { score=3; label='Strong';      color='#74C3BA'; width='72%'; }
  else                  { score=4; label='Very Strong'; color='#52c97a'; width='100%'; }
  return { score, label, color, width, entropy, criteria };
};

const useCopy = () => {
  const [copiedId, setCopiedId] = useState(null);
  const copy = (text, id) => {
    navigator.clipboard.writeText(text).then(()=>{
      setCopiedId(id);
      setTimeout(()=>setCopiedId(null), 1800);
    });
  };
  return { copiedId, copy };
};

/* ── FOOTER ── */
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
const PasswordToolPage = () => {
  const [password,    setPassword]    = useState('');
  const [showPw,      setShowPw]      = useState(false);
  const [loading,     setLoading]     = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [error,       setError]       = useState(null);
  const { copiedId, copy } = useCopy();
  const toolRef = useRef(null);

  const strength = analyzePassword(password);

  /* ── Fetch suggestions from backend ── */
  const fetchSuggestions = useCallback(async (pw) => {
    if (!pw || pw.length < 3) { setSuggestions([]); return; }
    setLoading(true);
    setError(null);
    try {
      const res  = await fetch(`${API_BASE}/password-suggest`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ password: pw }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to fetch suggestions');
      setSuggestions(json.suggestions || []);
    } catch (e) {
      setError(e.message);
      setSuggestions([]);
    }
    setLoading(false);
  }, []);

  /* Debounce — 700ms after user stops typing */
  useEffect(() => {
    const t = setTimeout(() => fetchSuggestions(password), 700);
    return () => clearTimeout(t);
  }, [password, fetchSuggestions]);

  const criteriaList = password ? [
    { key:'length8',   label:'At least 8 characters',       met: strength.criteria?.length8 },
    { key:'length12',  label:'At least 12 characters',      met: strength.criteria?.length12 },
    { key:'uppercase', label:'Uppercase letter (A–Z)',       met: strength.criteria?.uppercase },
    { key:'lowercase', label:'Lowercase letter (a–z)',       met: strength.criteria?.lowercase },
    { key:'numbers',   label:'Number (0–9)',                 met: strength.criteria?.numbers },
    { key:'symbols',   label:'Special character (!@#$…)',    met: strength.criteria?.symbols },
    { key:'noRepeat',  label:'No repeated chars (aaa)',      met: strength.criteria?.noRepeat },
    { key:'noCommon',  label:'Not a common password',        met: strength.criteria?.noCommon },
  ] : [];

  /* Strength score color for suggested passwords */
  const scoreColor = (score) => {
    if (score >= 4) return '#52c97a';
    if (score >= 3) return '#74C3BA';
    if (score >= 2) return '#f0a500';
    return '#ff6b7a';
  };

  return (
    <>
      <GlobalStyles/>
      <Navbar/>

      {/* ══ HERO ══ */}
      <section style={{ marginTop:'90px', minHeight:'100vh', position:'relative', overflow:'hidden', display:'flex', alignItems:'center', fontFamily:SF }}>
        <video autoPlay muted loop playsInline style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', zIndex:0, filter:'brightness(0.35)' }}>
          <source src={videoBg} type="video/mp4"/>
        </video>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,rgba(8,25,30,.78) 0%,rgba(20,65,70,.58) 50%,rgba(8,25,30,.82) 100%)', zIndex:1 }}/>
        <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(116,195,186,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(116,195,186,.035) 1px,transparent 1px)', backgroundSize:'60px 60px', zIndex:2, pointerEvents:'none' }}/>
        <div style={{ position:'absolute', left:0, right:0, height:'1.5px', background:'linear-gradient(90deg,transparent,rgba(116,195,186,.5),transparent)', animation:'scanLine 6s linear infinite', zIndex:3, pointerEvents:'none' }}/>
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
              <span style={{ color:'#74C3BA', fontSize:'11px', letterSpacing:'2px', textTransform:'uppercase', fontWeight:'800' }}>Password Tool</span>
            </div>

            {/* Badge */}
            <div style={{ display:'inline-flex', alignItems:'center', gap:'10px', background:'rgba(116,195,186,.1)', border:'1px solid rgba(116,195,186,.3)', borderRadius:'50px', padding:'8px 20px', marginBottom:'28px', animation:'fadeUp .6s ease .1s both' }}>
              <div style={{ position:'relative' }}>
                <div style={{ width:'9px', height:'9px', borderRadius:'50%', background:'#74C3BA' }}/>
                <div style={{ position:'absolute', inset:0, borderRadius:'50%', background:'#74C3BA', animation:'ping 1.8s ease-in-out infinite' }}/>
              </div>
              <span style={{ fontSize:'11px', fontWeight:'800', letterSpacing:'3px', textTransform:'uppercase', color:'#74C3BA' }}>Live — Credential Security Suite</span>
            </div>

            {/* Heading */}
            <h1 style={{ fontFamily:SF, fontWeight:'900', margin:'0 0 16px', animation:'fadeUp .7s ease .2s both' }}>
              <span style={{ fontSize:'clamp(3.5rem,8vw,7rem)', color:'#fff', display:'block', lineHeight:1, letterSpacing:'-3px' }}>Password</span>
              <span style={{ fontSize:'clamp(1.3rem,3vw,2.4rem)', color:'#74C3BA', display:'block', letterSpacing:'-1px', fontWeight:'700', lineHeight:1.3, position:'relative' }}>
                Strength Analyzer
                <span style={{ position:'absolute', bottom:'-4px', left:0, width:'50%', height:'3px', background:'linear-gradient(90deg,#74C3BA,transparent)', borderRadius:'2px', overflow:'hidden' }}>
                  <span style={{ position:'absolute', inset:0, background:'linear-gradient(90deg,transparent,rgba(255,255,255,.7),transparent)', animation:'shimmer 2.5s ease-in-out infinite' }}/>
                </span>
              </span>
            </h1>

            <p style={{ fontSize:'17px', color:'rgba(255,255,255,.5)', maxWidth:'540px', lineHeight:1.85, animation:'fadeUp .8s ease .3s both', marginBottom:'36px' }}>
              Instantly analyze your password strength with entropy scoring, criteria breakdown, and algorithmically generated strong password suggestions — all in real time.
            </p>

            {/* Stats */}
            <div style={{ display:'flex', gap:'0', animation:'fadeUp .9s ease .4s both', marginBottom:'40px' }}>
              {[['Entropy','Scoring'],['Real-Time','Analysis'],['6 Types','Suggestions'],['8+','Criteria']].map(([num,label],i)=>(
                <React.Fragment key={label}>
                  <div style={{ textAlign:'center', padding:'0 26px' }}>
                    <div style={{ fontSize:'1.7rem', fontWeight:'900', color:'#74C3BA', lineHeight:1, letterSpacing:'-1px', fontFamily:MONO }}>{num}</div>
                    <div style={{ fontSize:'10px', color:'rgba(255,255,255,.38)', letterSpacing:'1px', marginTop:'4px', textTransform:'uppercase' }}>{label}</div>
                  </div>
                  {i<3 && <div style={{ width:'1px', background:'rgba(116,195,186,.15)', alignSelf:'stretch' }}/>}
                </React.Fragment>
              ))}
            </div>

            {/* CTA */}
            <div style={{ display:'flex', gap:'16px', flexWrap:'wrap', animation:'fadeUp 1s ease .5s both' }}>
              <a href="#tool" style={{ padding:'16px 36px', borderRadius:'50px', background:'linear-gradient(135deg,#306F74,#74C3BA)', color:'white', textDecoration:'none', fontWeight:'800', fontSize:'15px', display:'inline-flex', alignItems:'center', gap:'10px', boxShadow:'0 8px 28px rgba(48,111,116,.45)', transition:'all .3s' }}
                onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-3px)';e.currentTarget.style.boxShadow='0 14px 38px rgba(48,111,116,.6)';}}
                onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='0 8px 28px rgba(48,111,116,.45)';}}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                Check Password
              </a>
              <a href="/services" style={{ padding:'16px 36px', borderRadius:'50px', border:'1.5px solid rgba(116,195,186,.35)', color:'rgba(255,255,255,.8)', textDecoration:'none', fontWeight:'700', fontSize:'15px', display:'inline-flex', alignItems:'center', gap:'10px', transition:'all .3s' }}
                onMouseEnter={e=>{e.currentTarget.style.background='rgba(116,195,186,.1)';e.currentTarget.style.borderColor='#74C3BA';e.currentTarget.style.color='#fff';}}
                onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.borderColor='rgba(116,195,186,.35)';e.currentTarget.style.color='rgba(255,255,255,.8)';}}>
                ← Back to Services
              </a>
            </div>
          </div>
          <div style={{ opacity:.75, animation:'fadeIn 1s ease .6s both' }}>
            <LockWidget/>
          </div>
        </div>

        <div style={{ position:'absolute', bottom:'32px', left:'50%', transform:'translateX(-50%)', zIndex:5, display:'flex', flexDirection:'column', alignItems:'center', gap:'6px' }}>
          <span style={{ fontSize:'10px', color:'rgba(116,195,186,.4)', letterSpacing:'3px', textTransform:'uppercase' }}>Scroll</span>
          <div style={{ width:'1px', height:'40px', background:'linear-gradient(180deg,rgba(116,195,186,.5),transparent)' }}/>
        </div>
      </section>

      {/* ══ TOOL SECTION ══ */}
      <section id="tool" ref={toolRef} style={{ background:'#080f12', padding:'70px 0 80px', fontFamily:SF }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto', padding:'0 40px' }}>

          <div style={{ textAlign:'center', marginBottom:'40px' }}>
            <SectionLabel text="Password Intelligence"/>
            <h2 style={{ fontSize:'2.2rem', fontWeight:'900', color:'#fff', letterSpacing:'-1px', margin:0 }}>
              Analyze Your <span style={{ color:'#74C3BA' }}>Password</span>
            </h2>
          </div>

          <div className="pw-2col" style={{ display:'grid', gridTemplateColumns:'1.1fr 1fr', gap:'20px', alignItems:'start' }}>

            {/* ── LEFT ── */}
            <div style={{ display:'flex', flexDirection:'column', gap:'18px' }}>

              {/* Input card */}
              <div style={{ background:'rgba(255,255,255,.02)', border:'1px solid rgba(116,195,186,.12)', borderRadius:'24px', padding:'28px', position:'relative', overflow:'hidden', animation:'fadeUp .5s ease both' }}>
                <div style={{ position:'absolute', top:0, left:0, right:0, height:'2px', background:'linear-gradient(90deg,transparent,#74C3BA,transparent)' }}/>
                <CardHead
                  icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#74C3BA" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>}
                  text="Enter Your Password"
                />
                <div style={{ position:'relative', marginBottom:'20px' }}>
                  <input
                    className="pw-input"
                    type={showPw ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Type your password here…"
                  />
                  <button onClick={()=>setShowPw(!showPw)}
                    style={{ position:'absolute', right:'16px', top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', color:'rgba(116,195,186,.5)', transition:'color .2s', padding:0 }}
                    onMouseEnter={e=>e.currentTarget.style.color='#74C3BA'}
                    onMouseLeave={e=>e.currentTarget.style.color='rgba(116,195,186,.5)'}>
                    {showPw
                      ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                      : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    }
                  </button>
                </div>

                {/* Strength bars */}
                {password && (
                  <div style={{ animation:'fadeUp .3s ease both' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'10px' }}>
                      {[1,2,3,4].map(s=>(
                        <div key={s} className="strength-bar">
                          <div className="strength-bar-fill" style={{ width: strength.score >= s ? '100%':'0%', background: strength.score >= s ? strength.color:'transparent', transition:'width .4s ease' }}/>
                        </div>
                      ))}
                      <span style={{ fontSize:'13px', fontWeight:'800', color:strength.color, fontFamily:MONO, whiteSpace:'nowrap', minWidth:'80px' }}>
                        {strength.label}
                      </span>
                    </div>
                    <div style={{ display:'flex', gap:'10px', flexWrap:'wrap' }}>
                      <div style={{ display:'inline-flex', alignItems:'center', gap:'6px', background:'rgba(116,195,186,.06)', border:'1px solid rgba(116,195,186,.15)', borderRadius:'8px', padding:'5px 12px' }}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#74C3BA" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                        <span style={{ fontSize:'11px', color:'rgba(116,195,186,.6)', fontFamily:MONO }}>Entropy:</span>
                        <span style={{ fontSize:'12px', fontWeight:'700', color:'#74C3BA', fontFamily:MONO }}>{strength.entropy} bits</span>
                      </div>
                      <div style={{ display:'inline-flex', alignItems:'center', gap:'6px', background:'rgba(116,195,186,.06)', border:'1px solid rgba(116,195,186,.15)', borderRadius:'8px', padding:'5px 12px' }}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#74C3BA" strokeWidth="2"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
                        <span style={{ fontSize:'11px', color:'rgba(116,195,186,.6)', fontFamily:MONO }}>Length:</span>
                        <span style={{ fontSize:'12px', fontWeight:'700', color:'#74C3BA', fontFamily:MONO }}>{password.length} chars</span>
                      </div>
                    </div>
                  </div>
                )}

                {!password && (
                  <div style={{ textAlign:'center', padding:'20px 0', color:'rgba(116,195,186,.3)', fontSize:'13px', fontFamily:MONO }}>
                    Start typing to analyze…
                  </div>
                )}
              </div>

              {/* Criteria card */}
              {password && (
                <div style={{ background:'rgba(255,255,255,.02)', border:'1px solid rgba(116,195,186,.12)', borderRadius:'24px', padding:'24px 28px', animation:'fadeUp .4s ease both' }}>
                  <CardHead
                    icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#74C3BA" strokeWidth="2" strokeLinecap="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>}
                    text="Password Criteria"
                  />
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'4px 16px' }}>
                    {criteriaList.map(c=>(
                      <div key={c.key} className="crit-row">
                        <div className="crit-dot" style={{ background: c.met ? '#52c97a':'rgba(116,195,186,.15)', boxShadow: c.met ? '0 0 6px rgba(82,201,122,.5)':'none' }}/>
                        <span style={{ fontSize:'12px', color: c.met ? '#e8f5f3':'rgba(116,195,186,.4)', fontFamily:SF, fontWeight: c.met ? '600':'400', transition:'all .3s' }}>{c.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Improvement tips */}
                  {strength.score < 4 && (
                    <div style={{ marginTop:'16px', padding:'14px 16px', background:'rgba(116,195,186,.04)', borderRadius:'12px', border:'1px solid rgba(116,195,186,.1)' }}>
                      <div style={{ fontSize:'10px', fontWeight:'700', letterSpacing:'2px', textTransform:'uppercase', color:'rgba(116,195,186,.5)', marginBottom:'10px' }}>How to improve</div>
                      {criteriaList.filter(c => !c.met).slice(0, 3).map(c => (
                        <div key={c.key} style={{ display:'flex', alignItems:'center', gap:'8px', padding:'4px 0', fontSize:'12px', color:'rgba(116,195,186,.6)', fontFamily:SF }}>
                          <span style={{ color:'#f0a500' }}>→</span> Add {c.label.toLowerCase()}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* ── RIGHT — Suggested Passwords ── */}
            <div style={{ display:'flex', flexDirection:'column', gap:'18px' }}>
              <div style={{ background:'rgba(255,255,255,.02)', border:'1px solid rgba(116,195,186,.12)', borderRadius:'24px', padding:'28px', position:'relative', overflow:'hidden', animation:'fadeUp .55s ease both', minHeight:'300px' }}>
                <div style={{ position:'absolute', top:0, left:0, right:0, height:'2px', background:'linear-gradient(90deg,transparent,#74C3BA,transparent)' }}/>

                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'18px' }}>
                  <CardHead
                    icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#74C3BA" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><circle cx="12" cy="16" r="1" fill="#74C3BA"/></svg>}
                    text="Suggested Passwords"
                  />
                  {loading && (
                    <div style={{ width:'16px', height:'16px', border:'2px solid rgba(116,195,186,.2)', borderTopColor:'#74C3BA', borderRadius:'50%', animation:'spin .7s linear infinite', flexShrink:0 }}/>
                  )}
                </div>

                {/* Error */}
                {error && (
                  <div style={{ background:'rgba(255,77,77,.06)', border:'1px solid rgba(255,77,77,.2)', borderRadius:'12px', padding:'14px 18px', marginBottom:'16px', fontSize:'13px', color:'rgba(255,120,120,.7)', fontFamily:MONO }}>
                    ⚠️ Backend not running — start Flask: <span style={{ color:'#74C3BA' }}>python password_tool.py</span>
                  </div>
                )}

                {/* Suggestions list */}
                {suggestions.length > 0 && (
                  <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
                    {suggestions.map((s, i) => {
                      const sc = styleColors[s.style] || styleColors['Random Secure'];
                      const ico = styleIcons[s.style] || '🔐';
                      return (
                        <div key={i} className="suggest-card" style={{ animationDelay:`${i*.07}s`, flexDirection:'column', alignItems:'stretch', gap:'8px' }}>
                          {/* Top row: style badge + strength + copy */}
                          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:'8px' }}>
                            <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>
                              <span style={{ fontSize:'14px' }}>{ico}</span>
                              <span className="style-badge" style={{ background:sc.bg, color:sc.color }}>{s.style}</span>
                            </div>
                            <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
                              <span style={{ fontSize:'10px', fontWeight:'700', color:scoreColor(s.score), fontFamily:MONO }}>{s.strength}</span>
                              <button
                                className={`copy-btn ${copiedId===i?'copied':''}`}
                                onClick={()=>copy(s.password, i)}
                                title="Copy password">
                                {copiedId===i
                                  ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                                  : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                                }
                              </button>
                            </div>
                          </div>
                          {/* Password */}
                          <div style={{ fontSize:'13px', color:'#e8f5f3', fontFamily:MONO, letterSpacing:'1.5px', wordBreak:'break-all', padding:'8px 10px', background:'rgba(0,0,0,.3)', borderRadius:'8px' }}>
                            {s.password}
                          </div>
                          {/* Meta row */}
                          <div style={{ display:'flex', gap:'12px' }}>
                            <span style={{ fontSize:'10px', color:'rgba(116,195,186,.4)', fontFamily:MONO }}>{s.entropy} bits</span>
                            <span style={{ fontSize:'10px', color:'rgba(116,195,186,.4)', fontFamily:MONO }}>{s.length} chars</span>
                            {s.description && <span style={{ fontSize:'10px', color:'rgba(116,195,186,.35)', fontFamily:SF, fontStyle:'italic' }}>{s.description}</span>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Empty state */}
                {!loading && suggestions.length === 0 && !error && (
                  <div style={{ textAlign:'center', padding:'40px 20px', animation:'fadeIn .5s ease both' }}>
                    <div style={{ width:'64px', height:'64px', borderRadius:'50%', background:'rgba(116,195,186,.06)', border:'1.5px solid rgba(116,195,186,.15)', margin:'0 auto 16px', display:'flex', alignItems:'center', justifyContent:'center', animation:'glowPulse 3s ease-in-out infinite' }}>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#74C3BA" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><circle cx="12" cy="16" r="1.2" fill="#74C3BA"/></svg>
                    </div>
                    <p style={{ fontSize:'13px', color:'rgba(116,195,186,.4)', fontFamily:SF, lineHeight:1.7 }}>
                      {password.length < 3 ? 'Type at least 3 characters to get suggestions' : 'Generating suggestions…'}
                    </p>
                  </div>
                )}

                {/* Loading skeleton */}
                {loading && suggestions.length === 0 && (
                  <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
                    {[1,2,3,4,5].map(i=>(
                      <div key={i} style={{ height:'80px', borderRadius:'14px', background:'rgba(116,195,186,.04)', border:'1px solid rgba(116,195,186,.08)', overflow:'hidden', position:'relative' }}>
                        <div style={{ position:'absolute', inset:0, background:'linear-gradient(90deg,transparent,rgba(116,195,186,.06),transparent)', animation:'shimmer 1.5s ease-in-out infinite', animationDelay:`${i*.15}s` }}/>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Tip card */}
              <div style={{ background:'rgba(116,195,186,.04)', border:'1px solid rgba(116,195,186,.1)', borderRadius:'18px', padding:'18px 22px', animation:'fadeUp .65s ease both' }}>
                <div style={{ display:'flex', alignItems:'flex-start', gap:'12px' }}>
                  <div style={{ width:'32px', height:'32px', borderRadius:'8px', background:'rgba(116,195,186,.1)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#74C3BA" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  </div>
                  <div>
                    <div style={{ fontSize:'12px', fontWeight:'700', color:'#74C3BA', marginBottom:'5px', letterSpacing:'1px' }}>PRO TIP</div>
                    <p style={{ fontSize:'12px', color:'rgba(116,195,186,.55)', lineHeight:1.7, fontFamily:SF, margin:0 }}>
                      Use a different password for every account. A strong password should be at least 12 characters with uppercase, lowercase, numbers, and symbols. Consider using a password manager to store them safely.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer/>
    </>
  );
};

export default PasswordToolPage;