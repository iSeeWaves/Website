import React, { useState, useEffect } from 'react';

import logo          from '../assets/images/icons/logo.png';
import gmailIcon     from '../assets/images/icons/gmail.png';
import locationIcon  from '../assets/images/icons/placeholder.png';
import instagramIcon from '../assets/images/icons/instagram.png';
import facebookIcon  from '../assets/images/icons/facebook.png';
import twitterIcon   from '../assets/images/icons/twitter.png';
import linkedinIcon  from '../assets/images/icons/linkedin.png';
import videoBg       from '../assets/images/video_bg.mp4';
import formBg        from '../assets/images/s1.jpg';
import ctaBg         from '../assets/images/t1.png';

const SF = "'Segoe UI', Arial, sans-serif";

const GlobalStyles = () => (
  <style>{`
    * { box-sizing: border-box; margin: 0; padding: 0; }
    @keyframes heroFadeUp  { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
    @keyframes shimmerLine { 0% { transform:translateX(-100%); } 100% { transform:translateX(300%); } }
    @keyframes scanLine    { 0% { top:-5%; } 100% { top:110%; } }
    @keyframes glowPulse   { 0%,100% { opacity:0.35; } 50% { opacity:0.8; } }
    @keyframes fadeInDown  { from { opacity:0; transform:translateY(-14px); } to { opacity:1; transform:translateY(0); } }
    @keyframes slideUp     { from { opacity:0; transform:translateY(40px); } to { opacity:1; transform:translateY(0); } }

    .reg-nav-link { text-decoration:none; color:#F4F7EC; font-size:16px; font-weight:bold; transition:color 0.3s; padding-bottom:3px; }
    .reg-nav-link:hover { color:#fff; border-bottom:2px solid #fff; }

    .reg-tab {
      padding: 10px 22px; border-radius: 50px;
      border: 1px solid rgba(48,111,116,0.25);
      background: transparent; color: rgba(20,60,40,0.5);
      font-size: 13px; font-weight: 600; cursor: pointer;
      transition: all 0.25s ease; letter-spacing: 0.5px;
    }
    .reg-tab:hover { color: #306F74; border-color: rgba(48,111,116,0.5); }
    .reg-tab.active {
      background: linear-gradient(135deg, #306F74, #74C3BA);
      color: #fff; border-color: transparent;
      box-shadow: 0 4px 20px rgba(48,111,116,0.4);
    }

    .reg-card {
      border-radius: 20px; padding: 28px 26px;
      transition: all 0.35s cubic-bezier(0.23,1,0.32,1);
      cursor: pointer; position: relative; overflow: hidden;
      border: 1px solid rgba(48,111,116,0.15);
    }
    .reg-card::before {
      content: ''; position: absolute; top: 0; left: 0; right: 0;
      height: 2px; background: linear-gradient(90deg, transparent, #306F74, transparent);
      opacity: 0; transition: opacity 0.35s ease;
    }
    .reg-card:hover { transform: translateY(-5px); border-color: rgba(48,111,116,0.4); background: linear-gradient(135deg, #2d7a7a 0%, #3a9494 100%) !important; }
    .reg-card:hover::before { opacity: 1; }
    .reg-card:hover h3, .reg-card:hover p, .reg-card:hover span { color: rgba(255,255,255,0.85) !important; }

    .fw-btn {
      display: flex; align-items: center; gap: 14px;
      padding: 16px 18px; border-radius: 16px;
      background: linear-gradient(135deg, rgba(234,248,245,0.98) 0%, rgba(220,242,238,0.98) 100%);
      border: 1px solid rgba(48,111,116,0.15);
      text-decoration: none; cursor: pointer;
      transition: all 0.3s cubic-bezier(0.23,1,0.32,1);
      position: relative; overflow: hidden;
    }
    .fw-btn::after {
      content: ''; position: absolute; inset: 0; border-radius: 16px;
      background: linear-gradient(135deg, #2d7a7a 0%, #3a9494 100%);
      opacity: 0; transition: opacity 0.3s ease; z-index: 0;
    }
    .fw-btn:hover { transform: translateY(-4px); border-color: transparent; box-shadow: 0 14px 30px rgba(48,111,116,0.25); }
    .fw-btn:hover::after { opacity: 1; }
    .fw-btn:hover .fw-icon-box { background: rgba(255,255,255,0.2); border-color: rgba(255,255,255,0.3); }
    .fw-btn:hover .fw-code { color: #ffffff !important; }
    .fw-btn:hover .fw-title { color: rgba(255,255,255,0.8) !important; }
    .fw-btn:hover .fw-cat { color: rgba(255,255,255,0.55) !important; }
    .fw-btn:hover .fw-arrow { color: rgba(255,255,255,0.8) !important; transform: translateX(3px); }
    .fw-btn > * { position: relative; z-index: 1; }

    .footer-link { color:#b8d4d6; text-decoration:none; font-size:15px; display:inline-block; transition:all 0.3s ease; }
    .footer-link:hover { color:#f3f7ec; transform:translateX(8px); }

    .accordion-item { border: 1px solid rgba(48,111,116,0.15); border-radius: 14px; overflow: hidden; transition: border-color 0.3s ease; margin-bottom: 12px; }
    .accordion-item:hover { border-color: rgba(48,111,116,0.35); }
  `}</style>
);

// ── NAVBAR ──────────────────────────────────────────
const Navbar = () => (
  <header style={{ backgroundColor:'#306F74', padding:'0px 50px', position:'fixed', width:'100%', top:0, zIndex:1000, boxShadow:'0 2px 10px rgba(0,0,0,0.2)' }}>
    <nav style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
      <img src={logo} alt="iSeeWaves" style={{ height:'90px', borderRadius:'8px' }} />
      <ul style={{ display:'flex', listStyle:'none', margin:0, padding:0 }}>
        {[['Products','/products'],['Services','/services'],['About Us','/about'],['Cyber Regulations','/regulations'],['Contact','/contact'],['Careers','/careers']].map(([label,href]) => (
          <li key={label} style={{ marginRight:'20px' }}>
            <a href={href} className="reg-nav-link">{label}</a>
          </li>
        ))}
      </ul>
    </nav>
  </header>
);

// ── HERO ─────────────────────────────────────────────
const HeroSection = () => (
  <section style={{ marginTop:'90px', minHeight:'400px', position:'relative', overflow:'hidden', display:'flex', alignItems:'center', fontFamily:SF }}>
    <video autoPlay muted loop playsInline style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', zIndex:0 }}>
      <source src={videoBg} type="video/mp4" />
    </video>
    <div style={{ position:'absolute', inset:0, background:'rgba(5,15,20,0.55)', zIndex:1 }} />
    <div style={{ position:'absolute', bottom:'-80px', left:'-60px', width:'450px', height:'450px', borderRadius:'50%', background:'radial-gradient(circle, rgba(48,111,116,0.32) 0%, transparent 65%)', zIndex:2, pointerEvents:'none' }} />
    <div style={{ position:'absolute', left:0, right:0, height:'2px', background:'linear-gradient(90deg, transparent, rgba(116,195,186,0.35), transparent)', zIndex:3, animation:'scanLine 6s linear infinite', pointerEvents:'none' }} />
    <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(116,195,186,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(116,195,186,0.04) 1px, transparent 1px)', backgroundSize:'60px 60px', zIndex:2, pointerEvents:'none' }} />
    <div style={{ position:'absolute', left:0, top:0, bottom:0, width:'4px', background:'linear-gradient(180deg, transparent, #74C3BA, #306F74, transparent)', zIndex:4 }} />
    <div style={{ position:'relative', zIndex:5, padding:'50px 90px' }}>
      <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'20px', animation:'fadeInDown 0.5s ease both' }}>
        <span style={{ width:'24px', height:'1px', background:'#74C3BA', display:'inline-block' }} />
        <a href="/" style={{ color:'rgba(255,255,255,0.45)', textDecoration:'none', fontSize:'11px', letterSpacing:'2px', textTransform:'uppercase', fontWeight:'600' }}
          onMouseEnter={e=>e.target.style.color='#74C3BA'} onMouseLeave={e=>e.target.style.color='rgba(255,255,255,0.45)'}>Home</a>
        <span style={{ color:'rgba(255,255,255,0.2)' }}>›</span>
        <span style={{ color:'#74C3BA', fontSize:'11px', letterSpacing:'2px', textTransform:'uppercase', fontWeight:'700' }}>Cyber Regulations</span>
      </div>
      <h1 style={{ fontFamily:SF, fontWeight:'900', lineHeight:0.95, letterSpacing:'-2px', margin:0, animation:'heroFadeUp 0.7s ease both', animationDelay:'0.15s' }}>
        <span style={{ fontSize:'clamp(3.8rem,8vw,7rem)', color:'#ffffff' }}>Cyber </span>
        <span style={{ fontSize:'clamp(3.8rem,8vw,7rem)', color:'#74C3BA', position:'relative', display:'inline-block' }}>
          Regulations
          <span style={{ position:'absolute', bottom:'-6px', left:0, width:'100%', height:'3px', background:'linear-gradient(90deg,#74C3BA,transparent)', borderRadius:'2px', overflow:'hidden' }}>
            <span style={{ position:'absolute', top:0, left:0, width:'40%', height:'100%', background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.8),transparent)', animation:'shimmerLine 2.5s ease-in-out infinite' }} />
          </span>
        </span>
      </h1>
    </div>
    <div style={{ position:'absolute', right:'10%', top:'50%', transform:'translateY(-50%)', width:'180px', height:'180px', borderRadius:'50%', background:'radial-gradient(circle, rgba(116,195,186,0.10) 0%, transparent 70%)', border:'1px solid rgba(116,195,186,0.12)', zIndex:4, animation:'glowPulse 3s ease-in-out infinite', pointerEvents:'none' }} />
  </section>
);

// ── FRAMEWORKS DATA (buttons → each opens its own page) ─
const fwCategories = ['All', 'Government & Defense', 'Data Privacy', 'Financial Services', 'Healthcare & Payments', 'Critical Infrastructure', 'Standards & Frameworks'];

const fwIcon = (path) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">{path}</svg>
);

const frameworks = [
  { slug:'cmmc', code:'CMMC', title:'Cybersecurity Maturity Model Certification', cat:'Government & Defense',
    icon: fwIcon(<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#306F74" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 12l2 2 4-4" stroke="#306F74" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></>) },
  { slug:'cmmi', code:'CMMI', title:'Capability Maturity Model Integration', cat:'Standards & Frameworks',
    icon: fwIcon(<><rect x="2" y="3" width="20" height="14" rx="2" stroke="#306F74" strokeWidth="1.7"/><path d="M8 21h8M12 17v4" stroke="#306F74" strokeWidth="1.7" strokeLinecap="round"/></>) },
  { slug:'peca-pakistan', code:'PECA', title:'Prevention of Electronic Crimes Act — Pakistan', cat:'Data Privacy',
    icon: fwIcon(<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#306F74" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 12l2 2 4-4" stroke="#306F74" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></>) },
  { slug:'dfars', code:'DFARS', title:'Defense Federal Acquisition Regulation Supplement', cat:'Government & Defense',
    icon: fwIcon(<><rect x="3" y="11" width="18" height="11" rx="2" stroke="#306F74" strokeWidth="1.7"/><path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="#306F74" strokeWidth="1.7" strokeLinecap="round"/><circle cx="12" cy="16" r="1.5" fill="#306F74"/></>) },
  { slug:'dora', code:'DORA', title:'Digital Operational Resilience Act — EU', cat:'Financial Services',
    icon: fwIcon(<><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="#306F74" strokeWidth="1.7"/><path d="M9 22V12h6v10" stroke="#306F74" strokeWidth="1.7" strokeLinecap="round"/></>) },
  { slug:'dpa-philippines', code:'DPA', title:'Data Privacy Act — Philippines', cat:'Data Privacy',
    icon: fwIcon(<><rect x="3" y="11" width="18" height="11" rx="2" stroke="#306F74" strokeWidth="1.7"/><path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="#306F74" strokeWidth="1.7" strokeLinecap="round"/><circle cx="12" cy="16" r="1.5" fill="#306F74"/></>) },
  { slug:'dpdpa-india', code:'DPDPA', title:'Digital Personal Data Protection Act — India', cat:'Data Privacy',
    icon: fwIcon(<><circle cx="12" cy="12" r="10" stroke="#306F74" strokeWidth="1.7"/><path d="M12 8v4l3 3" stroke="#306F74" strokeWidth="1.7" strokeLinecap="round"/></>) },
  { slug:'gdpr', code:'GDPR', title:'General Data Protection Regulation — EU', cat:'Data Privacy',
    icon: fwIcon(<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#306F74" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/><rect x="9" y="10" width="6" height="5" rx="1" stroke="#306F74" strokeWidth="1.7"/></>) },
  { slug:'hipaa', code:'HIPAA', title:'Health Insurance Portability & Accountability Act — US', cat:'Healthcare & Payments',
    icon: fwIcon(<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#306F74" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 7v10M7 12h10" stroke="#306F74" strokeWidth="1.7" strokeLinecap="round"/></>) },
  { slug:'irdai', code:'IRDAI', title:'Information & Cyber Security Guidelines — India Insurance', cat:'Financial Services',
    icon: fwIcon(<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#306F74" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 8v4l2.5 2.5" stroke="#306F74" strokeWidth="1.7" strokeLinecap="round"/></>) },
  { slug:'pcfp-pakistan', code:'PCFP', title:'Pakistan Cloud First Policy', cat:'Government & Defense',
    icon: fwIcon(<><path d="M7 18a4.5 4.5 0 0 1-.5-8.97A6 6 0 0 1 18 10.5 4 4 0 0 1 17 18H7z" stroke="#306F74" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 14l3-3 3 3M12 11v8" stroke="#306F74" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></>) },
  { slug:'iso-27001', code:'ISO 27001', title:'Information Security Management System Standard', cat:'Standards & Frameworks',
    icon: fwIcon(<><circle cx="12" cy="12" r="10" stroke="#306F74" strokeWidth="1.7"/><path d="M12 8v4l3 3" stroke="#306F74" strokeWidth="1.7" strokeLinecap="round"/></>) },
  { slug:'lgpd', code:'LGPD', title:'Lei Geral de Proteção de Dados — Brazil', cat:'Data Privacy',
    icon: fwIcon(<><rect x="3" y="11" width="18" height="11" rx="2" stroke="#306F74" strokeWidth="1.7"/><path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="#306F74" strokeWidth="1.7" strokeLinecap="round"/><path d="M12 15v3" stroke="#306F74" strokeWidth="1.7" strokeLinecap="round"/></>) },
  { slug:'nca-ecc', code:'NCA ECC', title:'Essential Cybersecurity Controls — Saudi Arabia', cat:'Critical Infrastructure',
    icon: fwIcon(<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#306F74" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="11" r="2.5" stroke="#306F74" strokeWidth="1.7"/></>) },
  { slug:'nis2', code:'NIS2', title:'Network and Information Security Directive 2 — EU', cat:'Critical Infrastructure',
    icon: fwIcon(<><path d="M1.5 8.5C6 3 18 3 22.5 8.5" stroke="#306F74" strokeWidth="1.7" strokeLinecap="round"/><path d="M5 12c2-3 12-3 14 0" stroke="#306F74" strokeWidth="1.7" strokeLinecap="round"/><circle cx="12" cy="19" r="1.5" fill="#306F74"/></>) },
  { slug:'pci-dss', code:'PCI DSS', title:'Payment Card Industry Data Security Standard', cat:'Healthcare & Payments',
    icon: fwIcon(<><rect x="2" y="5" width="20" height="14" rx="2" stroke="#306F74" strokeWidth="1.7"/><path d="M2 10h20" stroke="#306F74" strokeWidth="1.7"/><path d="M6 15h4" stroke="#306F74" strokeWidth="1.7" strokeLinecap="round"/></>) },
];

// ── 1. COMPLIANCE FRAMEWORKS — BUTTON GRID (replaces card grid) ─
const ComplianceFrameworksSection = () => {
  const [activeTab, setActiveTab] = useState('All');
  const filtered = activeTab === 'All' ? frameworks : frameworks.filter(f => f.cat === activeTab);

  return (
    <section style={{ padding:'90px 80px', background:'linear-gradient(160deg, #eaf8f5 0%, #e0f5f0 50%, #e5f7f2 100%)', fontFamily:SF }}>
      <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:'55px' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'rgba(48,111,116,0.1)', border:'1px solid rgba(48,111,116,0.25)', borderRadius:'50px', padding:'6px 18px', marginBottom:'16px' }}>
            <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#306F74', display:'inline-block' }} />
            <span style={{ fontSize:'11px', fontWeight:'700', letterSpacing:'3px', textTransform:'uppercase', color:'#306F74' }}>Global &amp; Local Standards</span>
          </div>
          <h2 style={{ fontSize:'2.6rem', fontWeight:'900', color:'#163d28', letterSpacing:'-1px', lineHeight:1.1, margin:'0 0 14px', fontFamily:SF }}>
            Explore Compliance <span style={{ color:'#306F74' }}>Frameworks</span>
          </h2>
          <p style={{ fontSize:'15px', color:'rgba(20,60,40,0.55)', lineHeight:1.8, maxWidth:'640px', margin:'0 auto' }}>
            Select a framework to see its requirements, who must comply, and the penalties for falling short.
          </p>
        </div>

        <div style={{ display:'flex', gap:'10px', justifyContent:'center', flexWrap:'wrap', marginBottom:'42px' }}>
          {fwCategories.map(cat => (
            <button key={cat} className={`reg-tab ${activeTab===cat?'active':''}`} onClick={()=>setActiveTab(cat)}>{cat}</button>
          ))}
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))', gap:'16px' }}>
          {filtered.map((fw, i) => (
            <a key={fw.slug} href={`/regulations/${fw.slug}`} className="fw-btn" style={{ animationDelay:`${i*0.05}s`, animation:'slideUp 0.45s ease both' }}>
              <div className="fw-icon-box" style={{ width:'46px', height:'46px', flexShrink:0, borderRadius:'12px', background:'rgba(48,111,116,0.1)', border:'1px solid rgba(48,111,116,0.2)', display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.3s ease' }}>
                {fw.icon}
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div className="fw-code" style={{ fontSize:'15px', fontWeight:'800', color:'#163d28', marginBottom:'2px', transition:'color 0.3s ease' }}>{fw.code}</div>
                <div className="fw-title" style={{ fontSize:'12px', color:'rgba(20,60,40,0.55)', lineHeight:1.4, transition:'color 0.3s ease' }}>{fw.title}</div>
                <div className="fw-cat" style={{ fontSize:'10.5px', fontWeight:'700', letterSpacing:'0.5px', textTransform:'uppercase', color:'#306F74', marginTop:'6px', transition:'color 0.3s ease' }}>{fw.cat}</div>
              </div>
              <span className="fw-arrow" style={{ color:'#306F74', fontSize:'18px', flexShrink:0, transition:'all 0.3s ease' }}>→</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── 2. COMPLIANCE STEPS — DARK IMAGE BACKGROUND ──────
const ComplianceSection = () => {
  const steps = [
    { num:'01', title:'Gap Analysis', desc:'We audit your current security posture against all applicable regulations and identify non-compliant areas.' },
    { num:'02', title:'Remediation Plan', desc:'A tailored roadmap is created with prioritized actions, timelines, and resource requirements.' },
    { num:'03', title:'Implementation', desc:'Our team deploys the required controls, policies, and technical safeguards to meet each requirement.' },
    { num:'04', title:'Audit & Certify', desc:'We prepare documentation, conduct mock audits, and support your certification or regulatory review.' },
  ];
  return (
    <section style={{ padding:'90px 80px', position:'relative', overflow:'hidden', fontFamily:SF }}>
      {/* Dark image background */}
      <div style={{ position:'absolute', inset:0, backgroundImage:`url(${formBg})`, backgroundSize:'cover', backgroundPosition:'center', filter:'brightness(0.8)' }} />
      <div style={{ position:'absolute', inset:0, background:'rgba(10,35,45,0.35)' }} />

      <div style={{ maxWidth:'1200px', margin:'0 auto', position:'relative', zIndex:2 }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'80px', alignItems:'center' }}>
          <div>
            <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'rgba(116,195,186,0.1)', border:'1px solid rgba(116,195,186,0.25)', borderRadius:'50px', padding:'6px 18px', marginBottom:'20px' }}>
              <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#74C3BA', display:'inline-block' }} />
              <span style={{ fontSize:'11px', fontWeight:'700', letterSpacing:'3px', textTransform:'uppercase', color:'#74C3BA' }}>Our Process</span>
            </div>
            <h2 style={{ fontSize:'2.5rem', fontWeight:'900', color:'#fff', letterSpacing:'-1px', lineHeight:1.1, margin:'0 0 18px', fontFamily:SF }}>
              How We Get You <span style={{ color:'#74C3BA' }}>Compliant</span>
            </h2>
            <p style={{ fontSize:'16px', color:'rgba(255,255,255,0.55)', lineHeight:1.8, marginBottom:'32px' }}>
              From initial assessment to full certification — we handle every step of your compliance journey.
            </p>
            <a href="/contact" style={{ display:'inline-flex', alignItems:'center', gap:'12px', padding:'15px 32px', background:'linear-gradient(135deg,#306F74,#74C3BA)', color:'white', borderRadius:'50px', textDecoration:'none', fontWeight:'700', fontSize:'15px', transition:'all 0.3s', boxShadow:'0 8px 25px rgba(48,111,116,0.4)' }}
              onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 12px 35px rgba(48,111,116,0.55)'; }}
              onMouseLeave={e=>{ e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 8px 25px rgba(48,111,116,0.4)'; }}>
              Start Compliance Review
              <span style={{ width:'28px', height:'28px', background:'rgba(255,255,255,0.25)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center' }}>→</span>
            </a>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:'4px' }}>
            {steps.map((step, i) => (
              <div key={i}
                style={{ display:'flex', gap:'20px', padding:'22px 20px', borderBottom: i < steps.length-1 ? '1px solid rgba(116,195,186,0.12)' : 'none', transition:'all 0.3s ease', borderRadius:'12px', cursor:'pointer' }}
                onMouseEnter={e=>{ e.currentTarget.style.background='linear-gradient(135deg, #2d7a7a 0%, #3a9494 100%)'; e.currentTarget.style.paddingLeft='28px'; e.currentTarget.style.borderBottom='1px solid transparent'; e.currentTarget.querySelector('.step-num').style.color='rgba(255,255,255,0.3)'; e.currentTarget.querySelector('.step-title').style.color='#fff'; e.currentTarget.querySelector('.step-desc').style.color='rgba(255,255,255,0.75)'; }}
                onMouseLeave={e=>{ e.currentTarget.style.background='transparent'; e.currentTarget.style.paddingLeft='20px'; e.currentTarget.style.borderBottom= i < steps.length-1 ? '1px solid rgba(116,195,186,0.12)' : 'none'; e.currentTarget.querySelector('.step-num').style.color='rgba(116,195,186,0.25)'; e.currentTarget.querySelector('.step-title').style.color='#fff'; e.currentTarget.querySelector('.step-desc').style.color='rgba(255,255,255,0.45)'; }}>
                <div className="step-num" style={{ fontSize:'2.2rem', fontWeight:'900', color:'rgba(116,195,186,0.25)', lineHeight:1, minWidth:'52px', fontFamily:SF, transition:'color 0.3s' }}>{step.num}</div>
                <div>
                  <h4 className="step-title" style={{ fontSize:'1rem', fontWeight:'700', color:'#fff', margin:'0 0 8px', fontFamily:SF, transition:'color 0.3s' }}>{step.title}</h4>
                  <p className="step-desc" style={{ fontSize:'14px', color:'rgba(255,255,255,0.45)', lineHeight:1.7, margin:0, transition:'color 0.3s' }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ── DATA (FAQs) ──────────────────────────────────────
const faqs = [
  { q:'Does my business need to comply with PECA 2016?', a:'Yes, PECA 2016 applies to all individuals and organizations operating digitally in Pakistan. Non-compliance can result in fines up to Rs. 10 million and criminal proceedings by FIA.' },
  { q:'What counts as a reportable incident under CERT-PK?', a:'Any unauthorized access, data breach, ransomware attack, DDoS, or system compromise affecting business operations must be reported within 24 hours. Critical infrastructure operators have a 6-hour window.' },
  { q:'Is ISO 27001 mandatory in Pakistan?', a:'While not legally mandatory for all organizations, SECP requires it for financial institutions and it is increasingly demanded in government tenders. Many enterprise clients now mandate ISO 27001 from their vendors.' },
  { q:'What is the penalty for non-compliance with PDPA 2023?', a:'Fines range from Rs. 1 million for minor violations up to Rs. 25 million or 2% of annual turnover for serious breaches. Repeated violations can result in criminal prosecution of responsible officers.' },
  { q:'Do startups and SMEs need to follow these regulations?', a:'Yes — PECA 2016 and PDPA 2023 apply to all organizations regardless of size. SBP and SECP regulations apply if you operate in fintech or capital markets. iSeeWaves offers SME-specific compliance packages.' },
  { q:'How can iSeeWaves help with compliance?', a:'We conduct full compliance gap analyses, implement required controls, prepare documentation, train staff, and provide ongoing monitoring to keep your organization audit-ready across all applicable regulations.' },
];

// ── 3. FAQ — LIGHT GREEN BACKGROUND ─────────────────
const FAQSection = () => {
  const [open, setOpen] = useState(null);
  return (
    <section style={{ padding:'90px 80px', background:'linear-gradient(160deg, #eaf8f5 0%, #e0f5f0 50%, #e5f7f2 100%)', fontFamily:SF }}>
      <div style={{ maxWidth:'800px', margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:'56px' }}>
          <h2 style={{ fontSize:'2.4rem', fontWeight:'900', color:'#163d28', letterSpacing:'-1px', margin:'0 0 14px', fontFamily:SF }}>
            Frequently Asked <span style={{ color:'#306F74' }}>Questions</span>
          </h2>
          <p style={{ fontSize:'15px', color:'rgba(20,60,40,0.55)', lineHeight:1.8 }}>Common questions about Pakistan's cybersecurity regulatory landscape.</p>
        </div>
        {faqs.map((faq, i) => (
          <div key={i} className="accordion-item" style={{ background: open===i ? 'rgba(48,111,116,0.06)' : 'rgba(255,255,255,0.7)' }}>
            <button onClick={()=>setOpen(open===i?null:i)}
              style={{ width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center', padding:'22px 24px', background:'transparent', border:'none', cursor:'pointer', textAlign:'left', gap:'16px' }}>
              <span style={{ fontSize:'15px', fontWeight:'600', color: open===i ? '#306F74' : 'rgba(20,60,40,0.8)', transition:'color 0.3s', fontFamily:SF }}>{faq.q}</span>
              <span style={{ color:'#306F74', fontSize:'22px', flexShrink:0, transition:'transform 0.3s ease', transform: open===i ? 'rotate(45deg)' : 'rotate(0)', lineHeight:1 }}>+</span>
            </button>
            {open===i && (
              <div style={{ padding:'0 24px 22px', animation:'heroFadeUp 0.3s ease both' }}>
                <p style={{ fontSize:'14px', color:'rgba(20,60,40,0.55)', lineHeight:1.85, margin:0, borderTop:'1px solid rgba(48,111,116,0.12)', paddingTop:'16px' }}>{faq.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

// ── 4. CTA — DARK IMAGE BACKGROUND ──────────────────
const CTASection = () => (
  <div style={{ background:'#eaf8f5', padding:'0 0 60px' }}>
  <section style={{ padding:'80px', position:'relative', overflow:'hidden', fontFamily:SF }}>
    <div style={{ position:'absolute', inset:0, backgroundImage:`url(${ctaBg})`, backgroundSize:'cover', backgroundPosition:'center', filter:'brightness(0.8)' }} />
    <div style={{ position:'absolute', inset:0, background:'rgba(10,35,45,0.35)' }} />
    <div style={{ maxWidth:'1200px', margin:'0 auto', display:'flex', justifyContent:'space-between', alignItems:'center', gap:'40px', flexWrap:'wrap', position:'relative', zIndex:2 }}>
      <div>
        <h2 style={{ fontSize:'2.2rem', fontWeight:'900', color:'#fff', margin:'0 0 12px', lineHeight:1.1, fontFamily:SF }}>
          Not sure if you're <span style={{ color:'#74C3BA' }}>compliant?</span>
        </h2>
        <p style={{ fontSize:'16px', color:'rgba(255,255,255,0.5)', margin:0, lineHeight:1.7 }}>
          Get a free compliance assessment from our expert team — no commitment required.
        </p>
      </div>
      <a href="/contact" style={{ display:'inline-flex', alignItems:'center', gap:'12px', padding:'18px 38px', background:'linear-gradient(135deg,#306F74,#74C3BA)', color:'white', borderRadius:'50px', textDecoration:'none', fontWeight:'700', fontSize:'16px', transition:'all 0.3s', boxShadow:'0 8px 30px rgba(48,111,116,0.4)', whiteSpace:'nowrap' }}
        onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow='0 14px 40px rgba(48,111,116,0.55)'; }}
        onMouseLeave={e=>{ e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 8px 30px rgba(48,111,116,0.4)'; }}>
        Get Free Assessment
        <span style={{ width:'30px', height:'30px', background:'rgba(255,255,255,0.25)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center' }}>→</span>
      </a>
    </div>
  </section>
  </div>
);

// ── FOOTER ────────────────────────────────────────────
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
            <span style={{ fontSize:'28px', fontWeight:'700' }}>iSeeWaves</span>
          </div>
          <p style={{ color:'#b8d4d6', fontSize:'16px', lineHeight:1.6, marginBottom:'20px' }}>Protecting your digital assets with advanced cybersecurity solutions.</p>
          <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
            <div style={{ display:'flex', alignItems:'flex-start', gap:'12px' }}>
              <img src={gmailIcon} style={{ width:'20px', height:'20px', objectFit:'contain', marginTop:'2px', opacity:0.8 }} alt="email" />
              <span style={{ fontSize:'15px', lineHeight:1.5 }}>iseewaves.pk@gmail.com</span>
            </div>
            <div style={{ display:'flex', alignItems:'flex-start', gap:'12px' }}>
              <img src={locationIcon} style={{ width:'20px', height:'20px', objectFit:'contain', marginTop:'2px', opacity:0.8 }} alt="location" />
              <span style={{ fontSize:'15px', lineHeight:1.5 }}>Shop # 10, Plot # 237, Banda Phugwarian,<br/>Banda Batang, Abbottabad</span>
            </div>
          </div>
        </div>
        <FooterSection title="Quick Links" links={[{label:'Home',href:'/'},{label:'About Us',href:'/about'},{label:'Services',href:'/services'},{label:'Products',href:'/products'},{label:'Blog',href:'#blog'}]} />
        <FooterSection title="Company" links={[{label:'Contact',href:'/contact'},{label:'Careers',href:'/careers'},{label:'Our Team',href:'/careers'},{label:'Partners',href:'#partners'},{label:'News',href:'#news'}]} />
        <div>
          <FooterHeading title="Connect With Us" />
          <div style={{ display:'flex', gap:'15px', marginTop:'10px', flexWrap:'wrap' }}>
            {[{href:'https://www.instagram.com/iseewaves.pk',icon:instagramIcon,alt:'Instagram'},{href:'https://m.facebook.com/iseewaves.pk',icon:facebookIcon,alt:'Facebook'},{href:'https://x.com/iseewaves_',icon:twitterIcon,alt:'X'},{href:'http://www.linkedin.com/company/iseewaves/',icon:linkedinIcon,alt:'LinkedIn'}].map(s=>(
              <a key={s.alt} href={s.href} target="_blank" rel="noreferrer"
                style={{ width:'45px',height:'45px',background:'rgba(243,247,236,0.1)',border:'2px solid rgba(243,247,236,0.2)',borderRadius:'12px',display:'flex',alignItems:'center',justifyContent:'center',textDecoration:'none',transition:'all 0.3s' }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor='#f3f7ec';e.currentTarget.style.background='rgba(243,247,236,0.15)';e.currentTarget.style.transform='translateY(-3px)';}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(243,247,236,0.2)';e.currentTarget.style.background='rgba(243,247,236,0.1)';e.currentTarget.style.transform='translateY(0)';}}>
                <img src={s.icon} style={{ width:'24px',height:'24px',objectFit:'contain',opacity:0.8 }} alt={s.alt} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div style={{ borderTop:'1px solid rgba(243,247,236,0.1)', paddingTop:'30px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'20px' }}>
          <span style={{ color:'#b8d4d6', fontSize:'14px' }}>© 2025 iSeeWaves. All rights reserved.</span>
          <div style={{ display:'flex', gap:'30px' }}>
            {[{label:'Privacy Policy',href:'/privacy'},{label:'Terms of Policy',href:'/tos'},{label:'Security',href:'#security'}].map(link=>(
              <a key={link.label} href={link.href} style={{ color:'#b8d4d6',textDecoration:'none',fontSize:'14px',transition:'color 0.3s' }}
                onMouseEnter={e=>e.target.style.color='#f3f7ec'} onMouseLeave={e=>e.target.style.color='#b8d4d6'}>{link.label}</a>
            ))}
          </div>
        </div>
      </div>
    </div>
  </footer>
);

const CyberRegulations = () => (
  <>
    <GlobalStyles />
    <Navbar />
    <HeroSection />
    <ComplianceFrameworksSection />
    <ComplianceSection />
    <FAQSection />
    <CTASection />
    <Footer />
  </>
);

export default CyberRegulations;