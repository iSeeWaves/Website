import React, { useState, useEffect, useRef } from 'react';

const API_BASE = 'http://localhost:5002/api';

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

    @keyframes fadeUp     { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
    @keyframes fadeIn     { from{opacity:0} to{opacity:1} }
    @keyframes spin       { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
    @keyframes ping       { 0%{transform:scale(1);opacity:.9} 80%,100%{transform:scale(2.4);opacity:0} }
    @keyframes blink      { 0%,100%{opacity:1} 50%{opacity:0} }
    @keyframes scanLine   { 0%{top:0%;opacity:0} 5%{opacity:1} 95%{opacity:1} 100%{top:100%;opacity:0} }
    @keyframes glowPulse  { 0%,100%{box-shadow:0 0 0 0 rgba(116,195,186,.45)} 50%{box-shadow:0 0 0 10px rgba(116,195,186,0)} }
    @keyframes shimmer    { 0%{transform:translateX(-100%)} 100%{transform:translateX(300%)} }
    @keyframes float      { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
    @keyframes slideRight { from{transform:scaleX(0)} to{transform:scaleX(1)} }
    @keyframes cardIn     { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
    @keyframes floatDot   { 0%,100%{transform:translateY(0) translateX(0);opacity:.3} 33%{transform:translateY(-14px) translateX(6px);opacity:.65} 66%{transform:translateY(8px) translateX(-5px);opacity:.35} }
    @keyframes dropZonePulse { 0%,100%{border-color:rgba(116,195,186,.22)} 50%{border-color:rgba(116,195,186,.55)} }
    @keyframes progressBar { from{width:0%} to{width:100%} }
    @keyframes radarSpin  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }

    /* ── Tab ── */
    .scan-tab {
      padding:12px 24px; border-radius:50px;
      border:1.5px solid rgba(116,195,186,.2);
      background:transparent; color:rgba(255,255,255,.45);
      font-size:13px; font-weight:700; cursor:pointer;
      transition:all .25s; letter-spacing:.5px;
      display:flex; align-items:center; gap:8px;
      font-family:${SF}; position:relative;
    }
    .scan-tab:hover { color:#74C3BA; border-color:rgba(116,195,186,.5); }
    .scan-tab.active {
      background:linear-gradient(135deg,#306F74,#74C3BA);
      color:#fff; border-color:transparent;
      box-shadow:0 4px 20px rgba(48,111,116,.45);
    }

    /* ── Scan button ── */
    .scan-btn {
      padding:15px 32px; border-radius:14px; border:none; cursor:pointer;
      background:linear-gradient(135deg,#306F74,#74C3BA); color:white;
      font-weight:800; font-size:14px; font-family:${SF};
      box-shadow:0 6px 24px rgba(48,111,116,.4);
      transition:all .3s; display:inline-flex; align-items:center; gap:9px; white-space:nowrap;
    }
    .scan-btn:hover:not(:disabled) { transform:translateY(-2px); box-shadow:0 12px 32px rgba(48,111,116,.55); }
    .scan-btn:disabled { opacity:.45; cursor:not-allowed; }

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

    /* ── Input ── */
    .scan-input {
      width:100%; padding:15px 20px; font-family:${MONO};
      background:rgba(116,195,186,.06);
      border:1.5px solid rgba(116,195,186,.2);
      border-radius:14px; color:#e8f5f3; font-size:14px; outline:none;
      transition:all .3s; letter-spacing:.5px;
    }
    .scan-input:focus { border-color:#74C3BA; background:rgba(116,195,186,.1); box-shadow:0 0 0 4px rgba(116,195,186,.12); }
    .scan-input::placeholder { color:rgba(116,195,186,.3); }

    /* ── Drop zone ── */
    .drop-zone {
      border:2px dashed rgba(116,195,186,.3);
      border-radius:18px; padding:48px 24px;
      text-align:center; cursor:pointer;
      transition:all .3s; position:relative; overflow:hidden;
      background:rgba(116,195,186,.03);
    }
    .drop-zone:hover, .drop-zone.drag-over {
      border-color:#74C3BA;
      background:rgba(116,195,186,.08);
    }
    .drop-zone.has-file {
      border-color:rgba(116,195,186,.5);
      border-style:solid;
      background:rgba(116,195,186,.06);
      animation:none;
    }

    /* ── Result card ── */
    .rcard {
      background:rgba(116,195,186,.04); border:1px solid rgba(116,195,186,.12);
      border-radius:18px; padding:22px 24px;
      transition:all .25s; animation:cardIn .45s ease both;
    }
    .rcard:hover { background:rgba(116,195,186,.08); border-color:rgba(116,195,186,.22); }

    /* ── Info row ── */
    .irow {
      display:flex; align-items:flex-start; gap:12px;
      padding:10px 0; border-bottom:1px solid rgba(116,195,186,.07);
    }
    .irow:last-child { border-bottom:none; }

    /* ── Terminal line ── */
    .tline { font-family:${MONO}; font-size:12px; line-height:2; color:#74C3BA; animation:fadeUp .22s ease both; }
    .tline.done { color:#52c97a; font-weight:700; }
    .tline.warn { color:#f0a500; }
    .tline.err  { color:#ff4d4d; }

    /* ── Threat badge ── */
    .threat-badge {
      display:inline-flex; align-items:center; gap:6px;
      padding:4px 12px; border-radius:20px;
      font-size:11px; font-weight:800; font-family:${MONO};
    }

    /* ── Nav link ── */
    .nav-link { text-decoration:none; color:#F4F7EC; font-size:16px; font-weight:700; transition:all .3s; padding-bottom:3px; }
    .nav-link:hover { color:#fff; border-bottom:2px solid #fff; }

    /* ── Footer link ── */
    .footer-link { color:#b8d4d6; text-decoration:none; font-size:15px; display:inline-block; transition:all .3s; }
    .footer-link:hover { color:#f3f7ec; transform:translateX(8px); }

    /* ── Engine chip ── */
    .engine-chip {
      display:flex; align-items:center; gap:8px;
      padding:8px 12px; border-radius:10px;
      border:1px solid rgba(116,195,186,.1);
      background:rgba(116,195,186,.04);
      transition:all .2s;
    }
    .engine-chip:hover { background:rgba(116,195,186,.08); border-color:rgba(116,195,186,.2); }

    .hamburger-btn { display:none !important; }
    @media(max-width:860px) {
      .hamburger-btn { display:block !important; }
      .nav-links { display:none !important; }
      .nav-links.open { display:flex !important; flex-direction:column; position:absolute; top:90px; left:0; right:0; background:#306F74; padding:20px; z-index:999; }
      .scanner-2col { grid-template-columns:1fr !important; }
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
        <img src={logo} alt="iSeeWaves" style={{ height:'90px', borderRadius:'8px' }}/>
        <button className="hamburger-btn" onClick={()=>setMenuOpen(!menuOpen)} style={{ background:'none', border:'none', color:'#F4F7EC', fontSize:'24px', cursor:'pointer' }}>{menuOpen?'✕':'☰'}</button>
        <ul className={`nav-links${menuOpen?' open':''}`} style={{ display:'flex', listStyle:'none', margin:0, padding:0 }}>
          {[['Products','/products'],['Services','/services'],['About Us','/about'],['Regulations','/regulations'],['Contact','/contact'],['Careers','/careers']].map(([label,href])=>(
            <li key={label} style={{ marginRight:'20px' }}><a href={href} className="nav-link">{label}</a></li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

/* ── FLOATING DOTS ── */
const FloatingDots = () => {
  const dots = [{x:'8%',y:'25%',d:'0s',s:3},{x:'22%',y:'70%',d:'1.1s',s:2},{x:'45%',y:'20%',d:'.5s',s:3},{x:'65%',y:'60%',d:'1.6s',s:2},{x:'78%',y:'35%',d:'.9s',s:2},{x:'88%',y:'75%',d:'.3s',s:3}];
  return <>{dots.map((d,i)=><div key={i} style={{ position:'absolute', left:d.x, top:d.y, width:`${d.s}px`, height:`${d.s}px`, borderRadius:'50%', background:'rgba(243,247,236,.55)', animation:`floatDot ${3.2+i*.35}s ease-in-out ${d.d} infinite`, pointerEvents:'none' }}/>)}</>;
};

/* ── SHIELD WIDGET ── */
const ShieldWidget = () => (
  <div style={{ position:'relative', width:'180px', height:'180px', flexShrink:0, animation:'float 5s ease-in-out infinite' }}>
    <svg width="180" height="180" viewBox="0 0 180 180">
      {/* Outer rings */}
      {[80,65,50,35].map((r,i)=>(
        <circle key={i} cx="90" cy="90" r={r} fill="none" stroke="rgba(116,195,186,.15)" strokeWidth="1"/>
      ))}
      {/* Rotating ring */}
      <circle cx="90" cy="90" r="75" fill="none" stroke="rgba(116,195,186,.25)" strokeWidth="1.5" strokeDasharray="8 4" style={{ transformOrigin:'90px 90px', animation:'radarSpin 8s linear infinite' }}/>
      {/* Shield */}
      <path d="M90 30 L130 48 L130 90 Q130 125 90 148 Q50 125 50 90 L50 48 Z" fill="rgba(48,111,116,.2)" stroke="#74C3BA" strokeWidth="1.5"/>
      <path d="M90 42 L120 56 L120 90 Q120 118 90 136 Q60 118 60 90 L60 56 Z" fill="rgba(116,195,186,.1)"/>
      {/* Check mark */}
      <path d="M76 90 L86 100 L106 78" stroke="#74C3BA" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Blips */}
      <circle cx="130" cy="55" r="4" fill="#74C3BA" opacity=".8">
        <animate attributeName="opacity" values="0.8;0;0.8" dur="2s" repeatCount="indefinite"/>
      </circle>
      <circle cx="50" cy="115" r="3" fill="#52c97a" opacity=".7">
        <animate attributeName="opacity" values="0.7;0;0.7" dur="1.5s" begin="0.5s" repeatCount="indefinite"/>
      </circle>
    </svg>
  </div>
);

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

/* ── LOG STEPS per tab ── */
const LOG_STEPS = {
  file:   ['Uploading file to sandbox…','Computing SHA-256 / MD5 hash…','Analyzing file structure & headers…','Running behavioral analysis…','Querying threat intelligence databases…','Cross-referencing 70+ AV engines…'],
  hash:   ['Parsing hash string…','Querying VirusTotal database…','Fetching detection reports…','Analyzing malware signatures…','Cross-referencing threat feeds…'],
  ip:     ['Resolving target address…','Querying IP intelligence database…','Fetching geolocation data…','Checking blacklist databases…','Analyzing network metadata…'],
  mac:    ['Parsing MAC address…','Querying IEEE OUI database…','Identifying vendor & device type…','Fetching manufacturer details…'],
};

/* ── RISK COLOR ── */
const riskColor = v => v === 0 ? '#52c97a' : v < 10 ? '#f0a500' : '#ff4d4d';
const riskLabel = v => v === 0 ? 'Clean' : v < 10 ? 'Suspicious' : 'Malicious';
const riskBg    = v => v === 0 ? 'rgba(82,201,122,.1)' : v < 10 ? 'rgba(240,165,0,.1)' : 'rgba(255,77,77,.1)';

/* ══════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════ */
const FileScannerPage = () => {
  const [activeTab, setActiveTab] = useState('file');
  const [loading,   setLoading]   = useState(false);
  const [logs,      setLogs]      = useState([]);
  const [result,    setResult]    = useState(null);
  const [error,     setError]     = useState(null);

  // File tab
  const [dragOver,  setDragOver]  = useState(false);
  const [file,      setFile]      = useState(null);
  const fileInputRef = useRef(null);

  // Hash / IP / MAC tab
  const [inputVal, setInputVal] = useState('');

  const logsEndRef  = useRef(null);
  const resultsRef  = useRef(null);

  useEffect(()=>{ logsEndRef.current?.scrollIntoView({ behavior:'smooth', block:'nearest' }); }, [logs]);

  const addLog = (msg, type='normal') =>
    setLogs(p => [...p, { msg, type, id: Date.now()+Math.random() }]);

  const switchTab = (tab) => {
    setActiveTab(tab); setResult(null); setLogs([]); setError(null);
    setFile(null); setInputVal('');
  };

  /* ── ANIMATE LOGS ── */
  const animateLogs = async (tab) => {
    const steps = LOG_STEPS[tab];
    for (let i=0; i<steps.length; i++) {
      await new Promise(r=>setTimeout(r,480));
      addLog(steps[i], 'normal');
    }
  };

  /* ── RUN SCAN ── */
  const runScan = async () => {
    setLoading(true); setResult(null); setLogs([]); setError(null);
    setTimeout(()=>{ resultsRef.current?.scrollIntoView({ behavior:'smooth', block:'start' }); }, 100);

    const logP = animateLogs(activeTab);
    let res = null, err = null;

    try {
      if (activeTab === 'file') {
        if (!file) throw new Error('Please select a file first');
        const fd = new FormData();
        fd.append('file', file);
        const r = await fetch(`${API_BASE}/scan/file`, { method:'POST', body:fd });
        const j = await r.json();
        if (!r.ok) throw new Error(j.error || 'File scan failed');
        res = j;

      } else if (activeTab === 'hash') {
        if (!inputVal.trim()) throw new Error('Please enter a hash');
        const r = await fetch(`${API_BASE}/scan/hash`, {
          method:'POST', headers:{'Content-Type':'application/json'},
          body: JSON.stringify({ hash: inputVal.trim() }),
        });
        const j = await r.json();
        if (!r.ok) throw new Error(j.error || 'Hash scan failed');
        res = j;

      } else if (activeTab === 'ip') {
        if (!inputVal.trim()) throw new Error('Please enter an IP address');
        const r = await fetch(`${API_BASE}/scan/ip`, {
          method:'POST', headers:{'Content-Type':'application/json'},
          body: JSON.stringify({ ip: inputVal.trim() }),
        });
        const j = await r.json();
        if (!r.ok) throw new Error(j.error || 'IP scan failed');
        res = j;

      } else if (activeTab === 'mac') {
        if (!inputVal.trim()) throw new Error('Please enter a MAC address');
        const r = await fetch(`${API_BASE}/scan/mac`, {
          method:'POST', headers:{'Content-Type':'application/json'},
          body: JSON.stringify({ mac: inputVal.trim() }),
        });
        const j = await r.json();
        if (!r.ok) throw new Error(j.error || 'MAC scan failed');
        res = j;
      }
    } catch(e) {
      err = e.message || 'Cannot connect to backend';
    }

    await logP;

    if (err) {
      addLog(`✗ Error: ${err}`, 'err');
      setError(err);
    } else {
      addLog(`✓ Scan complete — report ready`, 'done');
      setResult(res);
    }
    setLoading(false);
  };

  /* ── FILE DROP HANDLERS ── */
  const handleDrop = (e) => {
    e.preventDefault(); setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) { setFile(f); setResult(null); setLogs([]); setError(null); }
  };
  const handleFileInput = (e) => {
    const f = e.target.files[0];
    if (f) { setFile(f); setResult(null); setLogs([]); setError(null); }
  };

  const formatBytes = (b) => {
    if (b < 1024) return b + ' B';
    if (b < 1048576) return (b/1024).toFixed(1) + ' KB';
    return (b/1048576).toFixed(1) + ' MB';
  };

  const tabs = [
    { id:'file', label:'File Scan',   icon:'📁', desc:'Upload & analyze files' },
    { id:'hash', label:'Hash Scan',   icon:'#️⃣', desc:'MD5 / SHA-256 lookup' },
    { id:'ip',   label:'IP Scan',     icon:'🌐', desc:'IP geolocation & threat' },
    { id:'mac',  label:'MAC Scan',    icon:'📡', desc:'Device vendor detection' },
  ];

  const canScan = activeTab === 'file' ? !!file : !!inputVal.trim();

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
              <span style={{ color:'#74C3BA', fontSize:'11px', letterSpacing:'2px', textTransform:'uppercase', fontWeight:'800' }}>File & IP Scanner</span>
            </div>

            {/* Live badge */}
            <div style={{ display:'inline-flex', alignItems:'center', gap:'10px', background:'rgba(116,195,186,.1)', border:'1px solid rgba(116,195,186,.3)', borderRadius:'50px', padding:'8px 20px', marginBottom:'28px', animation:'fadeUp .6s ease .1s both' }}>
              <div style={{ position:'relative' }}>
                <div style={{ width:'9px', height:'9px', borderRadius:'50%', background:'#74C3BA' }}/>
                <div style={{ position:'absolute', inset:0, borderRadius:'50%', background:'#74C3BA', animation:'ping 1.8s ease-in-out infinite' }}/>
              </div>
              <span style={{ fontSize:'11px', fontWeight:'800', letterSpacing:'3px', textTransform:'uppercase', color:'#74C3BA' }}>Live — Threat Detection Engine</span>
            </div>

            {/* Heading */}
            <h1 style={{ fontFamily:SF, fontWeight:'900', margin:'0 0 16px', animation:'fadeUp .7s ease .2s both' }}>
              <span style={{ fontSize:'clamp(2.8rem,7vw,6rem)', color:'#fff', display:'block', lineHeight:1, letterSpacing:'-3px' }}>File & IP</span>
              <span style={{ fontSize:'clamp(1.3rem,3vw,2.4rem)', color:'#74C3BA', display:'block', letterSpacing:'-1px', fontWeight:'700', lineHeight:1.3, position:'relative' }}>
                Scanner & Threat Detection
                <span style={{ position:'absolute', bottom:'-4px', left:0, width:'50%', height:'3px', background:'linear-gradient(90deg,#74C3BA,transparent)', borderRadius:'2px', overflow:'hidden' }}>
                  <span style={{ position:'absolute', inset:0, background:'linear-gradient(90deg,transparent,rgba(255,255,255,.7),transparent)', animation:'shimmer 2.5s ease-in-out infinite' }}/>
                </span>
              </span>
            </h1>

            <p style={{ fontSize:'16px', color:'rgba(255,255,255,.5)', maxWidth:'540px', lineHeight:1.85, animation:'fadeUp .8s ease .3s both', marginBottom:'36px' }}>
              Deep file hash analysis, malicious file scanning, IP geolocation intelligence, and MAC address vendor detection — all in one threat detection platform.
            </p>

            {/* Stats */}
            <div style={{ display:'flex', gap:'0', animation:'fadeUp .9s ease .4s both', marginBottom:'40px' }}>
              {[['70+','AV Engines'],['File/Hash','& IP/MAC'],['Real-Time','Detection'],['SHA-256','MD5 Support']].map(([num,label],i)=>(
                <React.Fragment key={label}>
                  <div style={{ textAlign:'center', padding:'0 24px' }}>
                    <div style={{ fontSize:'1.5rem', fontWeight:'900', color:'#74C3BA', lineHeight:1, letterSpacing:'-1px', fontFamily:MONO }}>{num}</div>
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
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                Start Scanning
              </a>
              <a href="/services" style={{ padding:'16px 36px', borderRadius:'50px', border:'1.5px solid rgba(116,195,186,.35)', color:'rgba(255,255,255,.8)', textDecoration:'none', fontWeight:'700', fontSize:'15px', display:'inline-flex', alignItems:'center', gap:'10px', transition:'all .3s' }}
                onMouseEnter={e=>{e.currentTarget.style.background='rgba(116,195,186,.1)';e.currentTarget.style.borderColor='#74C3BA';e.currentTarget.style.color='#fff';}}
                onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.borderColor='rgba(116,195,186,.35)';e.currentTarget.style.color='rgba(255,255,255,.8)';}}>
                ← Back to Services
              </a>
            </div>
          </div>

          {/* Shield widget */}
          <div style={{ opacity:.8, animation:'fadeIn 1s ease .6s both' }}>
            <ShieldWidget/>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position:'absolute', bottom:'32px', left:'50%', transform:'translateX(-50%)', zIndex:5, display:'flex', flexDirection:'column', alignItems:'center', gap:'6px' }}>
          <span style={{ fontSize:'10px', color:'rgba(116,195,186,.4)', letterSpacing:'3px', textTransform:'uppercase' }}>Scroll</span>
          <div style={{ width:'1px', height:'40px', background:'linear-gradient(180deg,rgba(116,195,186,.5),transparent)' }}/>
        </div>
      </section>

      {/* ══ FEATURE CARDS ══ */}
      <section style={{ background:'#080f12', padding:'60px 60px 40px', fontFamily:SF }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:'40px' }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'rgba(116,195,186,.08)', border:'1px solid rgba(116,195,186,.18)', borderRadius:'50px', padding:'7px 20px', marginBottom:'14px' }}>
              <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#74C3BA', display:'inline-block', animation:'glowPulse 2s infinite' }}/>
              <span style={{ fontSize:'11px', fontWeight:'700', letterSpacing:'3px', textTransform:'uppercase', color:'#74C3BA' }}>Capabilities</span>
            </div>
            <h2 style={{ fontSize:'2.2rem', fontWeight:'900', color:'#fff', letterSpacing:'-1px', margin:0 }}>
              Four Powerful <span style={{ color:'#74C3BA' }}>Scan Modules</span>
            </h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'16px' }}>
            {[
              { icon:'📁', title:'File Scanner', desc:'Upload any file for deep behavioral analysis, sandbox simulation, and multi-engine AV detection.' },
              { icon:'#️⃣', title:'Hash Scanner', desc:'Lookup MD5, SHA-1, or SHA-256 hashes against 70+ antivirus engines instantly.' },
              { icon:'🌐', title:'IP Scanner',   desc:'Full geolocation, ISP, ASN info, blacklist check, and abuse confidence scoring for any IP.' },
              { icon:'📡', title:'MAC Scanner',  desc:'Identify device vendor, manufacturer, device type and OUI info from any MAC address.' },
            ].map((f,i)=>(
              <div key={i} style={{ background:'rgba(255,255,255,.03)', border:'1px solid rgba(116,195,186,.1)', borderRadius:'18px', padding:'24px 20px', transition:'all .35s', cursor:'default', animation:`fadeUp .5s ease ${i*.08}s both` }}
                onMouseEnter={e=>{e.currentTarget.style.background='rgba(116,195,186,.08)';e.currentTarget.style.borderColor='rgba(116,195,186,.3)';e.currentTarget.style.transform='translateY(-6px)';}}
                onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,.03)';e.currentTarget.style.borderColor='rgba(116,195,186,.1)';e.currentTarget.style.transform='translateY(0)';}}>
                <div style={{ fontSize:'2rem', marginBottom:'14px' }}>{f.icon}</div>
                <h3 style={{ fontSize:'.95rem', fontWeight:'800', color:'#fff', margin:'0 0 8px', letterSpacing:'-.3px' }}>{f.title}</h3>
                <p style={{ fontSize:'12px', color:'rgba(116,195,186,.5)', lineHeight:1.75, margin:0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SCANNER TOOL ══ */}
      <section id="tool" style={{ background:'#080f12', padding:'20px 0 80px', fontFamily:SF }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto', padding:'0 40px' }}>

          {/* Section heading */}
          <div style={{ textAlign:'center', marginBottom:'36px' }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'rgba(116,195,186,.08)', border:'1px solid rgba(116,195,186,.18)', borderRadius:'50px', padding:'7px 20px', marginBottom:'14px' }}>
              <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#74C3BA', display:'inline-block', animation:'glowPulse 2s infinite' }}/>
              <span style={{ fontSize:'11px', fontWeight:'700', letterSpacing:'3px', textTransform:'uppercase', color:'#74C3BA' }}>Scanner Tool</span>
            </div>
            <h2 style={{ fontSize:'2.2rem', fontWeight:'900', color:'#fff', letterSpacing:'-1px', margin:0 }}>
              Run Your <span style={{ color:'#74C3BA' }}>Threat Scan</span>
            </h2>
          </div>

          {/* Main tool card */}
          <div style={{ background:'rgba(255,255,255,.02)', border:'1px solid rgba(116,195,186,.12)', borderRadius:'24px', overflow:'hidden' }}>

            {/* ── TAB BAR ── */}
            <div style={{ background:'rgba(116,195,186,.04)', borderBottom:'1px solid rgba(116,195,186,.1)', padding:'20px 28px' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'10px', flexWrap:'wrap', justifyContent:'space-between' }}>
                <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' }}>
                  {tabs.map(t=>(
                    <button key={t.id} className={`scan-tab ${activeTab===t.id?'active':''}`} onClick={()=>switchTab(t.id)}>
                      <span>{t.icon}</span>{t.label}
                    </button>
                  ))}
                </div>
                {/* Status */}
                <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
                  <div style={{ width:'8px', height:'8px', borderRadius:'50%', background: error?'#ff4d4d': loading?'#f0a500':'#52c97a', animation: loading?'ping 1s infinite':'glowPulse 2s infinite' }}/>
                  <span style={{ fontSize:'11px', color:'rgba(116,195,186,.5)', letterSpacing:'1px', textTransform:'uppercase', fontWeight:'700' }}>
                    {error?'Error': loading?'Scanning…':'Ready'}
                  </span>
                </div>
              </div>
              {/* Tab desc */}
              <div style={{ marginTop:'12px', fontSize:'12px', color:'rgba(116,195,186,.4)', fontFamily:MONO }}>
                {tabs.find(t=>t.id===activeTab)?.desc}
              </div>
            </div>

            {/* ── TOOL BODY ── */}
            <div style={{ padding:'28px' }}>

              {/* FILE TAB */}
              {activeTab === 'file' && (
                <div style={{ marginBottom:'24px' }}>
                  <input ref={fileInputRef} type="file" onChange={handleFileInput} style={{ display:'none' }}/>
                  <div
                    className={`drop-zone ${dragOver?'drag-over':''} ${file?'has-file':''}`}
                    onClick={()=>!file && fileInputRef.current?.click()}
                    onDragOver={e=>{e.preventDefault();setDragOver(true);}}
                    onDragLeave={()=>setDragOver(false)}
                    onDrop={handleDrop}
                  >
                    {file ? (
                      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'14px' }}>
                        <div style={{ width:'56px', height:'56px', borderRadius:'14px', background:'rgba(82,201,122,.1)', border:'1.5px solid rgba(82,201,122,.3)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.8rem' }}>📄</div>
                        <div style={{ textAlign:'center' }}>
                          <div style={{ fontSize:'15px', fontWeight:'700', color:'#e8f5f3', marginBottom:'4px' }}>{file.name}</div>
                          <div style={{ fontSize:'12px', color:'rgba(116,195,186,.5)', fontFamily:MONO }}>{formatBytes(file.size)} · {file.type || 'Unknown type'}</div>
                        </div>
                        <button className="ghost-btn" onClick={e=>{e.stopPropagation();setFile(null);setResult(null);setLogs([]);setError(null);}}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#74C3BA" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                          Remove File
                        </button>
                      </div>
                    ) : (
                      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'14px' }}>
                        <div style={{ width:'60px', height:'60px', borderRadius:'50%', background:'rgba(116,195,186,.08)', border:'1.5px solid rgba(116,195,186,.2)', display:'flex', alignItems:'center', justifyContent:'center', animation:'glowPulse 3s ease-in-out infinite' }}>
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#74C3BA" strokeWidth="1.5" strokeLinecap="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                        </div>
                        <div>
                          <p style={{ fontSize:'15px', fontWeight:'700', color:'rgba(116,195,186,.7)', margin:'0 0 6px' }}>Drop file here or click to upload</p>
                          <p style={{ fontSize:'12px', color:'rgba(116,195,186,.35)', margin:0 }}>Supports all file types · Max 32MB</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* HASH / IP / MAC INPUT */}
              {activeTab !== 'file' && (
                <div style={{ marginBottom:'24px' }}>
                  <input
                    className="scan-input"
                    value={inputVal}
                    onChange={e=>setInputVal(e.target.value)}
                    onKeyDown={e=>e.key==='Enter'&&!loading&&canScan&&runScan()}
                    placeholder={
                      activeTab==='hash' ? 'Enter MD5, SHA-1 or SHA-256 hash — e.g. d41d8cd98f00b204e9800998ecf8427e' :
                      activeTab==='ip'   ? 'Enter IP address — e.g. 8.8.8.8' :
                                          'Enter MAC address — e.g. 00:1A:2B:3C:4D:5E'
                    }
                  />
                  {/* Quick examples */}
                  {activeTab === 'ip' && (
                    <div style={{ marginTop:'12px', display:'flex', alignItems:'center', gap:'8px', flexWrap:'wrap' }}>
                      <span style={{ fontSize:'11px', color:'rgba(116,195,186,.35)', fontWeight:'700', letterSpacing:'2px', textTransform:'uppercase' }}>Try:</span>
                      {['8.8.8.8','1.1.1.1','208.67.222.222'].map(ip=>(
                        <button key={ip} onClick={()=>setInputVal(ip)} style={{ padding:'4px 12px', background:'rgba(116,195,186,.05)', border:'1px solid rgba(116,195,186,.15)', borderRadius:'6px', color:'rgba(116,195,186,.5)', fontSize:'12px', cursor:'pointer', fontFamily:MONO, transition:'all .2s' }}
                          onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(116,195,186,.35)';e.currentTarget.style.color='#74C3BA';}}
                          onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(116,195,186,.15)';e.currentTarget.style.color='rgba(116,195,186,.5)';}}>
                          {ip}
                        </button>
                      ))}
                    </div>
                  )}
                  {activeTab === 'mac' && (
                    <div style={{ marginTop:'12px', display:'flex', alignItems:'center', gap:'8px', flexWrap:'wrap' }}>
                      <span style={{ fontSize:'11px', color:'rgba(116,195,186,.35)', fontWeight:'700', letterSpacing:'2px', textTransform:'uppercase' }}>Try:</span>
                      {['00:1A:2B:3C:4D:5E','AC:DE:48:00:11:22','00:50:56:C0:00:08'].map(m=>(
                        <button key={m} onClick={()=>setInputVal(m)} style={{ padding:'4px 12px', background:'rgba(116,195,186,.05)', border:'1px solid rgba(116,195,186,.15)', borderRadius:'6px', color:'rgba(116,195,186,.5)', fontSize:'11px', cursor:'pointer', fontFamily:MONO, transition:'all .2s' }}
                          onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(116,195,186,.35)';e.currentTarget.style.color='#74C3BA';}}
                          onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(116,195,186,.15)';e.currentTarget.style.color='rgba(116,195,186,.5)';}}>
                          {m}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Scan / Clear buttons */}
              <div style={{ display:'flex', gap:'12px', alignItems:'center', marginBottom:'28px' }}>
                <button className="scan-btn" onClick={runScan} disabled={loading||!canScan}>
                  {loading ? (
                    <><div style={{ width:'16px', height:'16px', border:'2px solid rgba(255,255,255,.3)', borderTopColor:'white', borderRadius:'50%', animation:'spin .7s linear infinite' }}/>Scanning…</>
                  ) : (
                    <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>Run Scan</>
                  )}
                </button>
                {(result||error) && !loading && (
                  <button className="ghost-btn" onClick={()=>{setResult(null);setLogs([]);setError(null);}}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#74C3BA" strokeWidth="2" strokeLinecap="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.5"/></svg>
                    Clear
                  </button>
                )}
              </div>

              {/* ── RESULTS AREA ── */}
              <div ref={resultsRef}>

                {/* Terminal */}
                {logs.length > 0 && (
                  <div style={{ background:'#020c0f', borderRadius:'14px', border:'1px solid rgba(116,195,186,.1)', marginBottom:'24px', overflow:'hidden', animation:'fadeUp .4s ease both' }}>
                    <div style={{ padding:'10px 18px', borderBottom:'1px solid rgba(116,195,186,.07)', display:'flex', alignItems:'center', gap:'8px', background:'rgba(116,195,186,.03)' }}>
                      {['#ff5f56','#ffbd2e','#27c93f'].map(c=><div key={c} style={{ width:'11px', height:'11px', borderRadius:'50%', background:c }}/>)}
                      <span style={{ fontSize:'11px', color:'rgba(116,195,186,.3)', marginLeft:'8px', fontFamily:MONO }}>
                        scanner@iseewaves ~ {activeTab} {activeTab==='file'?file?.name:inputVal}
                      </span>
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
                {error && !loading && (
                  <div style={{ background:'rgba(255,77,77,.06)', border:'1px solid rgba(255,77,77,.2)', borderRadius:'16px', padding:'24px 28px', marginBottom:'24px', display:'flex', alignItems:'flex-start', gap:'16px', animation:'fadeUp .4s ease both' }}>
                    <span style={{ fontSize:'2rem', flexShrink:0 }}>⚠️</span>
                    <div>
                      <div style={{ color:'#ff4d4d', fontWeight:'800', fontSize:'15px', marginBottom:'8px' }}>Scan Failed</div>
                      <div style={{ color:'rgba(255,120,120,.7)', fontSize:'13px', fontFamily:MONO, marginBottom:'10px' }}>{error}</div>
                      <div style={{ color:'rgba(116,195,186,.5)', fontSize:'12px', lineHeight:1.7 }}>
                        Make sure Flask backend is running:<br/>
                        <code style={{ color:'#74C3BA', background:'rgba(116,195,186,.08)', padding:'2px 8px', borderRadius:'4px' }}>python scanner_app.py</code>
                        <span style={{ marginLeft:'10px', opacity:.6 }}>→ localhost:5002</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── RESULTS ── */}
                {result && !loading && (
                  <div style={{ animation:'fadeUp .5s ease both' }}>

                    {/* Result header */}
                    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'20px', flexWrap:'wrap', gap:'12px' }}>
                      <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                        <div style={{ width:'9px', height:'9px', borderRadius:'50%', background:'#52c97a', animation:'glowPulse 2s infinite' }}/>
                        <span style={{ fontSize:'12px', fontWeight:'700', color:'#52c97a', letterSpacing:'1.5px', textTransform:'uppercase' }}>
                          Scan Complete
                        </span>
                        {/* Verdict badge */}
                        {result.detections !== undefined && (
                          <span className="threat-badge" style={{ color:riskColor(result.detections), background:riskBg(result.detections) }}>
                            {result.detections === 0 ? '✓' : '✗'} {riskLabel(result.detections)}
                          </span>
                        )}
                      </div>
                      <button className="ghost-btn" onClick={()=>{
                        const blob = new Blob([JSON.stringify(result,null,2)],{type:'application/json'});
                        const url  = URL.createObjectURL(blob);
                        const a    = document.createElement('a'); a.href=url; a.download=`scan_${Date.now()}.json`; a.click();
                        URL.revokeObjectURL(url);
                      }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#74C3BA" strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                        Export JSON
                      </button>
                    </div>

                    {/* ─── FILE / HASH RESULTS ─── */}
                    {(activeTab==='file' || activeTab==='hash') && (
                      <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>

                        {/* Detection meter */}
                        {result.detections !== undefined && (
                          <div className="rcard" style={{ animationDelay:'.05s' }}>
                            <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'18px' }}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#74C3BA" strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                              <span style={{ fontSize:'10px', fontWeight:'700', letterSpacing:'3px', textTransform:'uppercase', color:'rgba(116,195,186,.5)' }}>Detection Report</span>
                            </div>

                            {/* Big verdict */}
                            <div style={{ display:'flex', alignItems:'center', gap:'20px', marginBottom:'24px' }}>
                              <div style={{ width:'72px', height:'72px', borderRadius:'18px', background:riskBg(result.detections), border:`2px solid ${riskColor(result.detections)}30`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'2rem' }}>
                                {result.detections === 0 ? '✅' : result.detections < 10 ? '⚠️' : '🚨'}
                              </div>
                              <div>
                                <div style={{ fontSize:'1.8rem', fontWeight:'900', color:riskColor(result.detections), lineHeight:1, fontFamily:MONO }}>
                                  {result.detections}/{result.total_engines || 70}
                                </div>
                                <div style={{ fontSize:'12px', color:'rgba(116,195,186,.5)', marginTop:'4px' }}>engines detected as malicious</div>
                              </div>
                            </div>

                            {/* Progress bar */}
                            <div style={{ height:'8px', background:'rgba(116,195,186,.1)', borderRadius:'8px', overflow:'hidden', marginBottom:'8px' }}>
                              <div style={{ height:'100%', width:`${result.total_engines ? (result.detections/result.total_engines)*100 : 0}%`, background:`linear-gradient(90deg,#52c97a,${riskColor(result.detections)})`, borderRadius:'8px', transformOrigin:'left', animation:'slideRight .8s ease .3s both' }}/>
                            </div>
                            <div style={{ display:'flex', justifyContent:'space-between' }}>
                              <span style={{ fontSize:'10px', color:'rgba(116,195,186,.35)', fontFamily:MONO }}>0 — Clean</span>
                              <span style={{ fontSize:'10px', color:'rgba(116,195,186,.35)', fontFamily:MONO }}>{result.total_engines || 70} — All Engines</span>
                            </div>
                          </div>
                        )}

                        {/* File / Hash info */}
                        <div className="scanner-2col" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'14px' }}>
                          <div className="rcard" style={{ animationDelay:'.1s' }}>
                            <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'16px' }}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#74C3BA" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                              <span style={{ fontSize:'10px', fontWeight:'700', letterSpacing:'3px', textTransform:'uppercase', color:'rgba(116,195,186,.5)' }}>File Info</span>
                            </div>
                            {[['Name', result.file_name||'N/A'],['Size', result.file_size||'N/A'],['Type', result.file_type||'N/A'],['Extension', result.extension||'N/A']].map(([k,v])=>(
                              <div key={k} className="irow">
                                <span style={{ fontSize:'11px', fontWeight:'700', letterSpacing:'1.5px', textTransform:'uppercase', color:'rgba(116,195,186,.4)', minWidth:'80px', fontFamily:MONO, flexShrink:0 }}>{k}</span>
                                <span style={{ fontSize:'12px', color:'#e8f5f3', fontFamily:MONO, wordBreak:'break-all' }}>{v}</span>
                              </div>
                            ))}
                          </div>
                          <div className="rcard" style={{ animationDelay:'.15s' }}>
                            <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'16px' }}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#74C3BA" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
                              <span style={{ fontSize:'10px', fontWeight:'700', letterSpacing:'3px', textTransform:'uppercase', color:'rgba(116,195,186,.5)' }}>Hashes</span>
                            </div>
                            {[['MD5', result.md5],['SHA-1', result.sha1],['SHA-256', result.sha256]].map(([k,v])=>(
                              <div key={k} className="irow">
                                <span style={{ fontSize:'11px', fontWeight:'700', letterSpacing:'1.5px', textTransform:'uppercase', color:'rgba(116,195,186,.4)', minWidth:'65px', fontFamily:MONO, flexShrink:0 }}>{k}</span>
                                <span style={{ fontSize:'11px', color:'#74C3BA', fontFamily:MONO, wordBreak:'break-all', lineHeight:1.5 }}>{v||'N/A'}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Engine results */}
                        {result.engines && result.engines.length > 0 && (
                          <div className="rcard" style={{ animationDelay:'.2s' }}>
                            <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'16px' }}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#74C3BA" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>
                              <span style={{ fontSize:'10px', fontWeight:'700', letterSpacing:'3px', textTransform:'uppercase', color:'rgba(116,195,186,.5)' }}>Engine Results ({result.engines.length} detected)</span>
                            </div>
                            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:'8px', maxHeight:'240px', overflowY:'auto' }}>
                              {result.engines.map((e,i)=>(
                                <div key={i} className="engine-chip">
                                  <div style={{ width:'8px', height:'8px', borderRadius:'50%', background:'#ff4d4d', flexShrink:0 }}/>
                                  <div style={{ flex:1, minWidth:0 }}>
                                    <div style={{ fontSize:'12px', fontWeight:'700', color:'#e8f5f3', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{e.engine}</div>
                                    <div style={{ fontSize:'10px', color:'rgba(255,77,77,.7)', fontFamily:MONO, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{e.result}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* ─── IP SCAN RESULTS ─── */}
                    {activeTab === 'ip' && (
                      <div style={{ display:'flex', flexDirection:'column', gap:'14px' }}>
                        <div className="scanner-2col" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'14px' }}>
                          <div className="rcard" style={{ animationDelay:'.05s' }}>
                            <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'16px' }}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#74C3BA" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="10" r="3"/><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 14 8 14s8-8.75 8-14a8 8 0 0 0-8-8z"/></svg>
                              <span style={{ fontSize:'10px', fontWeight:'700', letterSpacing:'3px', textTransform:'uppercase', color:'rgba(116,195,186,.5)' }}>Location</span>
                            </div>
                            <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'14px' }}>
                              <span style={{ fontSize:'2.2rem', lineHeight:1 }}>{result.flag||'🌍'}</span>
                              <div>
                                <div style={{ fontSize:'1rem', fontWeight:'800', color:'#e8f5f3' }}>{result.country||'Unknown'}</div>
                                <div style={{ fontSize:'11px', color:'rgba(116,195,186,.45)', fontFamily:MONO }}>{result.country_code||''}</div>
                              </div>
                            </div>
                            {[['City',result.city],['Region',result.region],['Timezone',result.timezone],['Postal',result.postal]].map(([k,v])=>(
                              <div key={k} className="irow">
                                <span style={{ fontSize:'11px', fontWeight:'700', color:'rgba(116,195,186,.4)', minWidth:'75px', fontFamily:MONO, flexShrink:0 }}>{k}</span>
                                <span style={{ fontSize:'12px', color:'#e8f5f3' }}>{v||'N/A'}</span>
                              </div>
                            ))}
                          </div>
                          <div className="rcard" style={{ animationDelay:'.1s' }}>
                            <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'16px' }}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#74C3BA" strokeWidth="2" strokeLinecap="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                              <span style={{ fontSize:'10px', fontWeight:'700', letterSpacing:'3px', textTransform:'uppercase', color:'rgba(116,195,186,.5)' }}>Network</span>
                            </div>
                            {[['IP',result.ip||inputVal],['ISP',result.isp],['Org',result.org],['ASN',result.asn],['Lat',result.latitude],['Lon',result.longitude]].map(([k,v])=>(
                              <div key={k} className="irow">
                                <span style={{ fontSize:'11px', fontWeight:'700', color:'rgba(116,195,186,.4)', minWidth:'50px', fontFamily:MONO, flexShrink:0 }}>{k}</span>
                                <span style={{ fontSize:'11px', color:'#e8f5f3', fontFamily:MONO, wordBreak:'break-all' }}>{v||'N/A'}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        {/* Threat chips */}
                        <div className="rcard" style={{ animationDelay:'.15s' }}>
                          <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'16px' }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#74C3BA" strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                            <span style={{ fontSize:'10px', fontWeight:'700', letterSpacing:'3px', textTransform:'uppercase', color:'rgba(116,195,186,.5)' }}>Threat Flags</span>
                          </div>
                          <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:'10px' }}>
                            {[['proxy','🔀','Proxy'],['vpn','🛡️','VPN'],['tor','🧅','Tor'],['mobile','📱','Mobile'],['hosting','🖥️','Hosting']].map(([key,ico,label])=>(
                              <div key={key} style={{ display:'flex', flexDirection:'column', alignItems:'center', padding:'12px 8px', background:'rgba(116,195,186,.05)', border:'1px solid rgba(116,195,186,.1)', borderRadius:'12px', textAlign:'center' }}>
                                <span style={{ fontSize:'1.3rem', marginBottom:'5px' }}>{ico}</span>
                                <span style={{ fontSize:'10px', color:'rgba(116,195,186,.4)', marginBottom:'5px', textTransform:'uppercase', letterSpacing:'1px' }}>{label}</span>
                                <span style={{ fontSize:'12px', fontWeight:'800', color:result[key]?'#ff6b7a':'#52c97a', fontFamily:MONO }}>{result[key]?'YES':'NO'}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ─── MAC SCAN RESULTS ─── */}
                    {activeTab === 'mac' && (
                      <div className="rcard" style={{ animationDelay:'.05s' }}>
                        <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'18px' }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#74C3BA" strokeWidth="2" strokeLinecap="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg>
                          <span style={{ fontSize:'10px', fontWeight:'700', letterSpacing:'3px', textTransform:'uppercase', color:'rgba(116,195,186,.5)' }}>Device Intelligence</span>
                        </div>
                        {/* Big vendor name */}
                        <div style={{ marginBottom:'20px', padding:'16px 20px', background:'rgba(116,195,186,.06)', borderRadius:'12px', border:'1px solid rgba(116,195,186,.12)' }}>
                          <div style={{ fontSize:'11px', color:'rgba(116,195,186,.4)', letterSpacing:'2px', textTransform:'uppercase', marginBottom:'6px', fontFamily:MONO }}>Manufacturer</div>
                          <div style={{ fontSize:'1.4rem', fontWeight:'800', color:'#e8f5f3' }}>{result.vendor||'Unknown'}</div>
                        </div>
                        {[['MAC Address',result.mac||inputVal],['OUI',result.oui||'N/A'],['Device Type',result.device_type||'N/A'],['Address Type',result.address_type||'N/A'],['Is Private',result.is_private?'Yes (Locally Administered)':'No (Globally Unique)'],['Country',result.country||'N/A']].map(([k,v])=>(
                          <div key={k} className="irow">
                            <span style={{ fontSize:'11px', fontWeight:'700', letterSpacing:'1.5px', textTransform:'uppercase', color:'rgba(116,195,186,.4)', minWidth:'110px', fontFamily:MONO, flexShrink:0 }}>{k}</span>
                            <span style={{ fontSize:'13px', color:'#e8f5f3', fontFamily:MONO, wordBreak:'break-all' }}>{String(v)}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Empty state */}
                {!result && !loading && logs.length===0 && !error && (
                  <div style={{ textAlign:'center', padding:'50px 20px', animation:'fadeIn .6s ease both' }}>
                    <div style={{ width:'72px', height:'72px', borderRadius:'50%', background:'rgba(48,111,116,.08)', border:'1.5px solid rgba(116,195,186,.15)', margin:'0 auto 18px', display:'flex', alignItems:'center', justifyContent:'center', animation:'glowPulse 3s ease-in-out infinite' }}>
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#74C3BA" strokeWidth="1.5" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    </div>
                    <h3 style={{ fontSize:'1.2rem', fontWeight:'700', color:'#e8f5f3', margin:'0 0 8px', fontFamily:SF }}>
                      {activeTab==='file' ? 'Upload a file to begin' : 'Enter a target and scan'}
                    </h3>
                    <p style={{ fontSize:'13px', color:'rgba(116,195,186,.4)', lineHeight:1.7, maxWidth:'340px', margin:'0 auto', fontFamily:SF }}>
                      {activeTab==='file' && 'Drop any file into the upload area above and click Run Scan to analyze it.'}
                      {activeTab==='hash' && 'Enter an MD5, SHA-1, or SHA-256 hash to look it up across 70+ AV engines.'}
                      {activeTab==='ip'   && 'Enter an IP address to get full geolocation and threat intelligence data.'}
                      {activeTab==='mac'  && 'Enter a MAC address to identify the device vendor and manufacturer details.'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer/>
    </>
  );
};

export default FileScannerPage;