import React, { useState, useEffect } from 'react';

import logo          from '../assets/images/icons/logo.png';
import gmailIcon     from '../assets/images/icons/gmail.png';
import locationIcon  from '../assets/images/icons/placeholder.png';
import instagramIcon from '../assets/images/icons/instagram.png';
import facebookIcon  from '../assets/images/icons/facebook.png';
import twitterIcon   from '../assets/images/icons/twitter.png';
import linkedinIcon  from '../assets/images/icons/linkedin.png';
import aboutus1      from '../assets/images/s4.jpg';
import heroBg        from '../assets/images/about3.jpg';
import videoBg       from '../assets/images/video_bg.mp4';
import img1          from '../assets/images/ceo1.jpg';
import img2          from '../assets/images/sec3.jpg';
import img3          from '../assets/images/sec4.jpg';
import hackerImg     from '../assets/images/hacker.jpg';
import cyberIcon     from '../assets/images/icons/logo.png';

const SF = "'Segoe UI', Arial, sans-serif";

const GlobalStyles = () => (
  <style>{`
    * { box-sizing: border-box; margin: 0; padding: 0; }
    @keyframes heroFadeUp   { from { opacity:0; transform:translateY(40px); } to { opacity:1; transform:translateY(0); } }
    @keyframes shimmerLine  { 0% { transform:translateX(-100%); } 100% { transform:translateX(300%); } }
    @keyframes floatBubble  { 0%,100% { transform:translateY(0px); } 50% { transform:translateY(-18px); } }
    @keyframes pulseRing    { 0% { box-shadow:0 0 0 0 rgba(116,195,186,0.5); } 70% { box-shadow:0 0 0 16px rgba(116,195,186,0); } 100% { box-shadow:0 0 0 0 rgba(116,195,186,0); } }
    @keyframes spinBadge    { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
    @keyframes fadeInDown   { from { opacity:0; transform:translateY(-16px); } to { opacity:1; transform:translateY(0); } }
    @keyframes fadeInLeft   { from { opacity:0; transform:translateX(-30px); } to { opacity:1; transform:translateX(0); } }
    @keyframes fadeInRight  { from { opacity:0; transform:translateX(30px); } to { opacity:1; transform:translateX(0); } }
    @keyframes scanLine     { 0% { top:-100%; } 100% { top:200%; } }
    @keyframes glowPulse    { 0%,100% { opacity:0.4; } 50% { opacity:0.9; } }
    @keyframes borderFlow   { 0% { background-position:0% 50%; } 100% { background-position:200% 50%; } }
    @keyframes countUp      { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }

    .about-nav-link { text-decoration:none; color:#F4F7EC; font-size:16px; font-weight:bold; transition:color 0.3s; padding-bottom:3px; }
    .about-nav-link:hover { color:#fff; border-bottom:2px solid #fff; }
    .mvv-card { transition:all 0.35s cubic-bezier(0.23,1,0.32,1); }
    .mvv-card:hover { transform:translateX(10px) scale(1.02) !important; box-shadow:0 20px 60px rgba(48,111,116,0.25) !important; }
    .footer-link { color:#b8d4d6; text-decoration:none; font-size:15px; display:inline-block; transition:all 0.3s ease; }
    .footer-link:hover { color:#f3f7ec; transform:translateX(8px); }

    .hero-stat-card {
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(116,195,186,0.25);
      backdrop-filter: blur(12px);
      border-radius: 16px;
      padding: 20px 26px;
      transition: all 0.3s ease;
    }
    .hero-stat-card:hover {
      background: rgba(116,195,186,0.12);
      border-color: rgba(116,195,186,0.55);
      transform: translateY(-4px);
      box-shadow: 0 12px 40px rgba(116,195,186,0.2);
    }
  `}</style>
);

// ════════════ NAVBAR ════════════
const Navbar = () => {
  useEffect(() => {}, []);
  return (
    <header style={{ backgroundColor:'#306F74', padding:'0px 50px', position:'fixed', width:'100%', top:0, zIndex:1000, boxShadow:'0 2px 10px rgba(0,0,0,0.2)' }}>
      <nav style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <img src={logo} alt="iSeeWaves" style={{ height:'90px', borderRadius:'8px' }} />
        <ul style={{ display:'flex', listStyle:'none', margin:0, padding:0 }}>
          {[['Products','/products'],['Services','/services'],['About Us','/about'],['Cyber Regulations','/regulations'],['Contact','/contact'],['Careers','/careers']].map(([label,href]) => (
            <li key={label} style={{ marginRight:'20px' }}>
              <a href={href} className="about-nav-link">{label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

// ════════════ HERO — CINEMATIC ════════════
const HeroSection = () => (
  <section style={{
    marginTop: '90px',
    minHeight: '400px',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    fontFamily: SF,
  }}>
    {/* BG VIDEO */}
    <video autoPlay muted loop playsInline style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', objectPosition:'center', zIndex:0 }}>
      <source src={videoBg} type="video/mp4" />
    </video>
    {/* dark overlay */}
    <div style={{ position:'absolute', inset:0, background:'rgba(5,15,20,0.55)', zIndex:1 }} />
    {/* teal glow bottom-left */}
    <div style={{ position:'absolute', bottom:'-80px', left:'-60px', width:'450px', height:'450px', borderRadius:'50%', background:'radial-gradient(circle, rgba(48,111,116,0.32) 0%, transparent 65%)', zIndex:2, pointerEvents:'none' }} />
    {/* scan line */}
    <div style={{ position:'absolute', left:0, right:0, height:'2px', background:'linear-gradient(90deg, transparent, rgba(116,195,186,0.35), transparent)', zIndex:3, animation:'scanLine 6s linear infinite', pointerEvents:'none' }} />
    {/* fine grid */}
    <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(116,195,186,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(116,195,186,0.04) 1px, transparent 1px)', backgroundSize:'60px 60px', zIndex:2, pointerEvents:'none' }} />
    {/* left accent bar */}
    <div style={{ position:'absolute', left:0, top:0, bottom:0, width:'4px', background:'linear-gradient(180deg, transparent, #74C3BA, #306F74, transparent)', zIndex:4 }} />

    {/* CONTENT */}
    <div style={{ position:'relative', zIndex:5, padding:'50px 90px' }}>

      {/* breadcrumb */}
      <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'20px', animation:'fadeInDown 0.5s ease both' }}>
        <span style={{ width:'24px', height:'1px', background:'#74C3BA', display:'inline-block' }} />
        <a href="/" style={{ color:'rgba(255,255,255,0.45)', textDecoration:'none', fontSize:'11px', letterSpacing:'2px', textTransform:'uppercase', fontWeight:'600', transition:'color 0.2s' }}
          onMouseEnter={e=>e.target.style.color='#74C3BA'} onMouseLeave={e=>e.target.style.color='rgba(255,255,255,0.45)'}>Home</a>
        <span style={{ color:'rgba(255,255,255,0.2)' }}>›</span>
        <span style={{ color:'#74C3BA', fontSize:'11px', letterSpacing:'2px', textTransform:'uppercase', fontWeight:'700' }}>About Us</span>
      </div>

      {/* MAIN HEADING */}
      <h1 style={{ fontFamily:SF, fontWeight:'900', lineHeight:0.95, letterSpacing:'-2px', margin:0, animation:'heroFadeUp 0.7s ease both', animationDelay:'0.15s' }}>
        <span style={{ fontSize:'clamp(3.8rem,8vw,7rem)', color:'#ffffff' }}>About </span>
        <span style={{ fontSize:'clamp(3.8rem,8vw,7rem)', color:'#74C3BA', position:'relative', display:'inline-block' }}>
          Us
          <span style={{ position:'absolute', bottom:'-6px', left:0, width:'100%', height:'3px', background:'linear-gradient(90deg,#74C3BA,transparent)', borderRadius:'2px', overflow:'hidden' }}>
            <span style={{ position:'absolute', top:0, left:0, width:'40%', height:'100%', background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.8),transparent)', animation:'shimmerLine 2.5s ease-in-out infinite' }} />
          </span>
        </span>
      </h1>
    </div>

    {/* right glow orb */}
    <div style={{ position:'absolute', right:'10%', top:'50%', transform:'translateY(-50%)', width:'180px', height:'180px', borderRadius:'50%', background:'radial-gradient(circle, rgba(116,195,186,0.10) 0%, transparent 70%)', border:'1px solid rgba(116,195,186,0.12)', zIndex:4, animation:'glowPulse 3s ease-in-out infinite', pointerEvents:'none' }} />
  </section>
);

// ════════════ ABOUT CONTENT ════════════
const ImageCard = ({ src, style }) => (
  <div style={{ ...style, overflow:'hidden', boxShadow:'0 15px 40px rgba(0,0,0,0.12)', transition:'all 0.4s ease', cursor:'pointer' }}
    onMouseEnter={e=>{ e.currentTarget.style.transform=(style.transform||'')+'scale(1.04)'; e.currentTarget.style.boxShadow='0 0 0 4px #74C3BA, 0 20px 60px rgba(116,195,186,0.4)'; }}
    onMouseLeave={e=>{ e.currentTarget.style.transform=style.transform||''; e.currentTarget.style.boxShadow='0 15px 40px rgba(0,0,0,0.12)'; }}>
    <img src={src} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
  </div>
);

const AboutContentSection = () => (
  <section style={{ padding:'100px 80px', background:'#fff', fontFamily:SF, overflow:'hidden' }}>
    <div style={{ maxWidth:'1200px', margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'80px', alignItems:'center' }}>

      {/* LEFT — Image Collage */}
      <div style={{ position:'relative', height:'580px' }}>
        <ImageCard src={img1} style={{ position:'absolute', top:'80px', left:0, width:'48%', height:'72%', borderRadius:'16px', zIndex:1 }} />
        <ImageCard src={img2} style={{ position:'absolute', top:0, right:0, width:'50%', height:'46%', borderRadius:'16px', zIndex:1 }} />
        <ImageCard src={img3} style={{ position:'absolute', bottom:0, right:0, width:'50%', height:'50%', borderRadius:'16px', zIndex:1 }} />
        <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', zIndex:10, width:'150px', height:'150px' }}>
          <svg viewBox="0 0 150 150" width="150" height="150" style={{ animation:'spinBadge 10s linear infinite', position:'absolute', top:0, left:0 }}>
            <defs><path id="cpAU" d="M 75,75 m -58,0 a 58,58 0 1,1 116,0 a 58,58 0 1,1 -116,0" /></defs>
            <circle cx="75" cy="75" r="72" fill="white" stroke="#306F74" strokeWidth="1.5" />
            <text fontSize="11" fill="#306F74" fontWeight="600" letterSpacing="2.5">
              <textPath href="#cpAU">• Get Free Cyber Security • Get Free Cyber Security •</textPath>
            </text>
          </svg>
          <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:'64px', height:'64px', background:'#306F74', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 4px 20px rgba(48,111,116,0.5)', animation:'pulseRing 2.5s infinite' }}>
            <img src={cyberIcon} alt="icon" style={{ width:'38px', height:'38px', objectFit:'contain', filter:'brightness(10)' }} />
          </div>
        </div>
      </div>

      {/* RIGHT — Content */}
      <div>
        <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'20px' }}>
          <img src={cyberIcon} alt="" style={{ width:'26px', height:'26px', objectFit:'contain' }} />
          <span style={{ fontSize:'13px', fontWeight:'700', letterSpacing:'4px', textTransform:'uppercase', color:'#555' }}>ABOUT US</span>
        </div>
        <h2 style={{ fontSize:'2.8rem', fontWeight:'800', color:'#1a1a2e', lineHeight:1.2, marginBottom:'20px', fontFamily:SF }}>
          Your trusted partner in our{' '}<span style={{ color:'#306F74' }}>cyber security solutions</span>
        </h2>
        <p style={{ fontSize:'16px', color:'#666', lineHeight:1.8, marginBottom:'35px' }}>
          We provide reliable, cutting-edge cybersecurity solutions to protect your digital assets, ensuring safety and peace of mind.
        </p>

        <div style={{ display:'flex', alignItems:'center', borderRadius:'60px', overflow:'hidden', marginBottom:'35px', boxShadow:'0 8px 30px rgba(48,111,116,0.2)' }}>
          <div style={{ width:'110px', height:'100px', flexShrink:0, overflow:'hidden', borderRadius:'60px' }}>
            <img src={hackerImg} alt="24/7" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
          </div>
          <div style={{ background:'linear-gradient(135deg,#306F74,#74C3BA)', padding:'22px 28px', flex:1 }}>
            <h4 style={{ color:'white', fontSize:'17px', fontWeight:'700', margin:'0 0 8px' }}>24/7 Security Assistance</h4>
            <p style={{ color:'rgba(255,255,255,0.9)', fontSize:'13px', margin:0, lineHeight:1.6 }}>Real-time support for all cybersecurity concerns, including breach response, threat detection, guidance.</p>
          </div>
        </div>

        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', gap:'20px', flexWrap:'wrap' }}>
          <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:'14px' }}>
            {['Threat Detection and Monitoring','Access Control Management','Security Awareness Training'].map(item => (
              <li key={item} style={{ display:'flex', alignItems:'center', gap:'10px', color:'#333', fontSize:'15px' }}>
                <span style={{ width:'24px', height:'24px', borderRadius:'50%', border:'2px solid #306F74', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <svg width="11" height="11" viewBox="0 0 11 11"><path d="M1.5 5.5L4.5 8.5L9.5 2.5" stroke="#306F74" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
                {item}
              </li>
            ))}
          </ul>
          <div style={{ display:'flex', alignItems:'center', gap:'12px', background:'#f0f8f8', borderRadius:'50px', padding:'12px 20px' }}>
            <div style={{ width:'48px', height:'48px', background:'#306F74', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <svg width="22" height="22" fill="white" viewBox="0 0 24 24"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
            </div>
            <span style={{ fontWeight:'700', color:'#1a1a2e', fontSize:'15px', whiteSpace:'nowrap' }}>+92 3141966547</span>
          </div>
        </div>

      </div>
    </div>
  </section>
);

// ════════════ MISSION VISION VALUE ════════════
const mvvData = [
  { title:'Our Mission', desc:'To empower businesses with robust cybersecurity solutions, ensuring data integrity, privacy & resilience against evolving threats.',
    svg:(a)=>(<svg width="46" height="46" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="28" r="12" stroke={a?'#fff':'#307075'} strokeWidth="2"/><circle cx="24" cy="28" r="6" stroke={a?'#74C3BA':'#307075'} strokeWidth="2"/><circle cx="24" cy="28" r="2" fill={a?'#fff':'#307075'}/><path d="M24 6v8M18 10l3 5M30 10l-3 5" stroke={a?'#74C3BA':'#307075'} strokeWidth="2" strokeLinecap="round"/><path d="M10 30H6M42 30h-4" stroke={a?'#fff':'#307075'} strokeWidth="2" strokeLinecap="round"/></svg>) },
  { title:'Our Vision', desc:'To become the leading cybersecurity solutions provider in South Asia, fostering a secure digital ecosystem where innovation thrives.',
    svg:(a)=>(<svg width="46" height="46" viewBox="0 0 48 48" fill="none"><rect x="4" y="4" width="10" height="10" rx="1" stroke={a?'#fff':'#307075'} strokeWidth="2"/><rect x="34" y="4" width="10" height="10" rx="1" stroke={a?'#fff':'#307075'} strokeWidth="2"/><rect x="4" y="34" width="10" height="10" rx="1" stroke={a?'#fff':'#307075'} strokeWidth="2"/><rect x="34" y="34" width="10" height="10" rx="1" stroke={a?'#fff':'#307075'} strokeWidth="2"/><circle cx="24" cy="24" r="8" stroke={a?'#74C3BA':'#307075'} strokeWidth="2"/><circle cx="24" cy="24" r="3" fill={a?'#fff':'#307075'}/><path d="M14 24h4M30 24h4M24 14v4M24 30v4" stroke={a?'#74C3BA':'#307075'} strokeWidth="2" strokeLinecap="round"/></svg>) },
  { title:'Our Value', desc:'Integrity, excellence, and client-first thinking guide everything we do — from code quality to customer support and beyond.',
    svg:(a)=>(<svg width="46" height="46" viewBox="0 0 48 48" fill="none"><path d="M24 6L28 18h13l-10.5 7.6 4 12.4L24 30.5 13.5 38l4-12.4L7 18h13z" stroke={a?'#fff':'#307075'} strokeWidth="2" strokeLinejoin="round" fill={a?'rgba(255,255,255,0.15)':'rgba(48,112,117,0.08)'}/><circle cx="24" cy="24" r="5" fill={a?'#74C3BA':'#307075'}/></svg>) },
];

const MVVSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [imgHovered, setImgHovered]   = useState(false);
  return (
    <section style={{ padding:'100px 0', background:'linear-gradient(160deg,#f0f9f8 0%,#fafffe 50%,#e8f5f2 100%)', fontFamily:SF, overflow:'hidden' }}>
      <div style={{ maxWidth:'1200px', margin:'0 auto', padding:'0 60px' }}>
        <div style={{ textAlign:'center', marginBottom:'70px' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'rgba(48,111,116,0.08)', border:'1px solid rgba(48,111,116,0.18)', borderRadius:'50px', padding:'7px 20px', marginBottom:'18px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#307075" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span style={{ fontSize:'11px', fontWeight:'700', letterSpacing:'3px', textTransform:'uppercase', color:'#307075' }}>Our Approach</span>
          </div>
          <h2 style={{ fontFamily:SF, fontSize:'2.9rem', fontWeight:'900', color:'#0f2027', letterSpacing:'-1px', lineHeight:1.1, margin:'0 0 14px' }}>
            Strengthening security,{' '}<span style={{ color:'#307075' }}>your future</span>
          </h2>
          <p style={{ fontSize:'16px', color:'#6b7280', maxWidth:'460px', margin:'0 auto', lineHeight:1.8 }}>Every decision we make is rooted in these three pillars that define who we are.</p>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'60px', alignItems:'center' }}>
          <div style={{ display:'flex', flexDirection:'column', gap:'20px' }}>
            {mvvData.map((item,i) => {
              const isHov = hoveredCard===i;
              return (
                <div key={i} className="mvv-card"
                  onMouseEnter={()=>setHoveredCard(i)} onMouseLeave={()=>setHoveredCard(null)}
                  style={{ display:'flex', alignItems:'flex-start', gap:'20px', padding:'26px 30px', borderRadius:'20px', background:isHov?'linear-gradient(135deg,#306F74,#74C3BA)':'white', boxShadow:isHov?'0 20px 55px rgba(48,111,116,0.28)':'0 4px 22px rgba(0,0,0,0.06)', border:isHov?'1px solid rgba(255,255,255,0.18)':'1px solid rgba(48,111,116,0.08)', cursor:'default', position:'relative', overflow:'hidden' }}>
                  <div style={{ width:'70px', height:'70px', borderRadius:'16px', flexShrink:0, background:isHov?'rgba(255,255,255,0.18)':'rgba(48,112,117,0.07)', display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.35s ease' }}>
                    {item.svg(isHov)}
                  </div>
                  <div style={{ flex:1 }}>
                    <h3 style={{ fontFamily:SF, fontSize:'1.1rem', fontWeight:'800', margin:'0 0 8px', color:isHov?'#fff':'#0f2027', transition:'color 0.35s ease' }}>{item.title}</h3>
                    <p style={{ fontSize:'14px', color:isHov?'rgba(255,255,255,0.85)':'#6b7280', margin:0, lineHeight:1.75, transition:'color 0.35s ease' }}>{item.desc}</p>
                  </div>
                  <span style={{ fontSize:'18px', color:isHov?'rgba(255,255,255,0.6)':'rgba(48,111,116,0.25)', alignSelf:'center', transition:'all 0.35s ease' }}>→</span>
                </div>
              );
            })}
          </div>

          <div onMouseEnter={()=>setImgHovered(true)} onMouseLeave={()=>setImgHovered(false)}
            style={{ position:'relative', borderRadius:'28px', overflow:'hidden', height:'520px', boxShadow:imgHovered?'0 0 0 5px #74C3BA, 0 30px 80px rgba(116,195,186,0.4)':'0 30px 80px rgba(0,0,0,0.15)', transition:'all 0.4s ease', cursor:'pointer' }}>
            <img src={aboutus1} alt="Cybersecurity Team" style={{ width:'100%', height:'100%', objectFit:'cover', display:'block', transition:'filter 0.4s ease, transform 0.4s ease', filter:imgHovered?'brightness(1.12) saturate(1.2)':'brightness(1)', transform:imgHovered?'scale(1.04)':'scale(1)' }} />
            <div style={{ position:'absolute', inset:0, background:imgHovered?'linear-gradient(to top,rgba(48,111,116,0.45) 0%,transparent 55%)':'linear-gradient(to top,rgba(30,79,84,0.5) 0%,transparent 60%)', transition:'background 0.4s ease' }} />
            {imgHovered && <div style={{ position:'absolute', inset:0, border:'3px solid rgba(116,195,186,0.6)', borderRadius:'28px', animation:'pulseRing 1s infinite', pointerEvents:'none' }} />}
          </div>
        </div>
      </div>
    </section>
  );
};

// ════════════ FOOTER ════════════
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
        <FooterSection title="Company"     links={[{label:'Contact',href:'/contact'},{label:'Careers',href:'/careers'},{label:'Our Team',href:'/careers'},{label:'Partners',href:'#partners'},{label:'News',href:'#news'}]} />
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

// ════════════ ABOUT PAGE ════════════
const AboutUs = () => (
  <>
    <GlobalStyles />
    <Navbar />
    <HeroSection />
    <AboutContentSection />
    <MVVSection />
    <Footer />
  </>
);

export default AboutUs;