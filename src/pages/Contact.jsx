import React, { useState, useEffect } from 'react';

import logo          from '../assets/images/icons/logo.png';
import gmailIcon     from '../assets/images/icons/gmail.png';
import locationIcon  from '../assets/images/icons/placeholder.png';
import instagramIcon from '../assets/images/icons/instagram.png';
import facebookIcon  from '../assets/images/icons/facebook.png';
import twitterIcon   from '../assets/images/icons/twitter.png';
import linkedinIcon  from '../assets/images/icons/linkedin.png';
import formBg        from '../assets/images/s1.jpg';
import videoBg       from '../assets/images/video_bg.mp4';

const SF = "'Segoe UI', Arial, sans-serif";

// ── GLOBAL ANIMATIONS ────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    * { box-sizing: border-box; margin: 0; padding: 0; }
    @keyframes heroFadeUp  { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
    @keyframes shimmerLine { 0% { transform:translateX(-100%); } 100% { transform:translateX(300%); } }
    @keyframes scanLine    { 0% { top:-5%; } 100% { top:110%; } }
    @keyframes glowPulse   { 0%,100% { opacity:0.35; } 50% { opacity:0.8; } }
    @keyframes fadeInDown  { from { opacity:0; transform:translateY(-14px); } to { opacity:1; transform:translateY(0); } }
  `}</style>
);

// ════════════════════════════════════════
//  1. NAVBAR
// ════════════════════════════════════════
const Navbar = () => {
  useEffect(() => {}, []);
  return (
    <header style={{ backgroundColor:'#306F74', padding:'0 50px', position:'fixed', width:'100%', top:0, zIndex:1000, boxShadow:'0 2px 10px rgba(0,0,0,0.2)' }}>
      <nav style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <img src={logo} alt="iSeeWaves" style={{ height:'90px', borderRadius:'8px' }} />
        <ul style={{ display:'flex', listStyle:'none', margin:0, padding:0 }}>
          {[['Products','/products'],['Services','/services'],['About Us','/about'],['Cyber Regulations','/regulations'],['Contact','/contact'],['Careers','/careers']].map(([label,href]) => (
            <li key={label} style={{ marginRight:'20px' }}>
              <a href={href} style={{ textDecoration:'none', color:'#F4F7EC', fontSize:'16px', fontWeight:'bold', paddingBottom:'3px', transition:'all 0.3s' }}
                onMouseEnter={e=>{ e.target.style.color='#fff'; e.target.style.borderBottom='2px solid #fff'; }}
                onMouseLeave={e=>{ e.target.style.color='#F4F7EC'; e.target.style.borderBottom='none'; }}>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

// ════════════════════════════════════════
//  2. HERO — same style as Cyber Regulations
// ════════════════════════════════════════
const ContactHero = () => (
  <section style={{ marginTop:'90px', minHeight:'400px', position:'relative', overflow:'hidden', display:'flex', alignItems:'center', fontFamily:SF }}>
    {/* Video background */}
    <video autoPlay muted loop playsInline
      style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', zIndex:0 }}>
      <source src={videoBg} type="video/mp4" />
    </video>

    {/* Dark overlay */}
    <div style={{ position:'absolute', inset:0, background:'rgba(5,15,20,0.55)', zIndex:1 }} />

    {/* Bottom-left glow blob */}
    <div style={{ position:'absolute', bottom:'-80px', left:'-60px', width:'450px', height:'450px', borderRadius:'50%', background:'radial-gradient(circle, rgba(48,111,116,0.32) 0%, transparent 65%)', zIndex:2, pointerEvents:'none' }} />

    {/* Scan line */}
    <div style={{ position:'absolute', left:0, right:0, height:'2px', background:'linear-gradient(90deg, transparent, rgba(116,195,186,0.35), transparent)', zIndex:3, animation:'scanLine 6s linear infinite', pointerEvents:'none' }} />

    {/* Grid overlay */}
    <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(116,195,186,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(116,195,186,0.04) 1px, transparent 1px)', backgroundSize:'60px 60px', zIndex:2, pointerEvents:'none' }} />

    {/* Left accent bar */}
    <div style={{ position:'absolute', left:0, top:0, bottom:0, width:'4px', background:'linear-gradient(180deg, transparent, #74C3BA, #306F74, transparent)', zIndex:4 }} />

    {/* Content */}
    <div style={{ position:'relative', zIndex:5, padding:'50px 90px' }}>
      {/* Breadcrumb */}
      <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'20px', animation:'fadeInDown 0.5s ease both' }}>
        <span style={{ width:'24px', height:'1px', background:'#74C3BA', display:'inline-block' }} />
        <a href="/" style={{ color:'rgba(255,255,255,0.45)', textDecoration:'none', fontSize:'11px', letterSpacing:'2px', textTransform:'uppercase', fontWeight:'600' }}
          onMouseEnter={e=>e.target.style.color='#74C3BA'}
          onMouseLeave={e=>e.target.style.color='rgba(255,255,255,0.45)'}>Home</a>
        <span style={{ color:'rgba(255,255,255,0.2)' }}>›</span>
        <span style={{ color:'#74C3BA', fontSize:'11px', letterSpacing:'2px', textTransform:'uppercase', fontWeight:'700' }}>Contact Us</span>
      </div>

      {/* Heading */}
      <h1 style={{ fontFamily:SF, fontWeight:'900', lineHeight:0.95, letterSpacing:'-2px', margin:0, animation:'heroFadeUp 0.7s ease both', animationDelay:'0.15s' }}>
        <span style={{ fontSize:'clamp(3.8rem,8vw,7rem)', color:'#ffffff' }}>Contact </span>
        <span style={{ fontSize:'clamp(3.8rem,8vw,7rem)', color:'#74C3BA', position:'relative', display:'inline-block' }}>
          Us
          <span style={{ position:'absolute', bottom:'-6px', left:0, width:'100%', height:'3px', background:'linear-gradient(90deg,#74C3BA,transparent)', borderRadius:'2px', overflow:'hidden' }}>
            <span style={{ position:'absolute', top:0, left:0, width:'40%', height:'100%', background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.8),transparent)', animation:'shimmerLine 2.5s ease-in-out infinite' }} />
          </span>
        </span>
      </h1>
    </div>

    {/* Right glow circle */}
    <div style={{ position:'absolute', right:'10%', top:'50%', transform:'translateY(-50%)', width:'180px', height:'180px', borderRadius:'50%', background:'radial-gradient(circle, rgba(116,195,186,0.10) 0%, transparent 70%)', border:'1px solid rgba(116,195,186,0.12)', zIndex:4, animation:'glowPulse 3s ease-in-out infinite', pointerEvents:'none' }} />
  </section>
);

// ════════════════════════════════════════
//  3. CONTACT SECTION (cards overlap dark)
// ════════════════════════════════════════
const ContactSection = () => {
  const [form, setForm]           = useState({ fname:'', lname:'', phone:'', email:'', message:'' });
  const [focused, setFocused]     = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async () => {

  if (!form.fname || !form.email || !form.message) {
    alert('Please fill required fields');
    return;
  }

  try {

    const response = await fetch(
      'http://localhost:5000/contact',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      }
    );

    const data = await response.json();

    if(data.success){

      setSubmitted(true);

      setTimeout(() => {
        setSubmitted(false);
      }, 5000);

      setForm({
        fname:'',
        lname:'',
        phone:'',
        email:'',
        message:''
      });

    } else {

      alert('Error sending message');

    }

  } catch(error) {

    console.log(error);
    alert('Server Error');

  }

};

  const iStyle = name => ({
    width:'100%', padding:'15px 18px',
    background:'rgba(255,255,255,0.92)',
    border: focused===name ? '2px solid #74C3BA' : '1.5px solid rgba(255,255,255,0.15)',
    borderRadius:'8px', fontSize:'14px', color:'#0f2027',
    outline:'none', fontFamily:SF,
    transition:'all 0.3s', boxSizing:'border-box',
  });

  const OVERLAP = 110;

  const cardData = [
    { title:'Contact Us',   lines:['+92 314 1966547','iseewaves.pk@gmail.com'],
      icon:<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#306F74" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.9 14a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.82 3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 10.91a16 16 0 0 0 5.73 5.73l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg> },
    { title:'E-Mail Us',    lines:['iseewaves.pk@gmail.com','support@iseewaves.com'],
      icon:<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#306F74" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> },
    { title:'Our Location', lines:['Shop #10, Plot #237,','Banda Batang, Abbottabad'],
      icon:<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#306F74" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> },
  ];

  return (
    <div style={{ fontFamily:SF }}>

      {/* WHITE + CARDS WRAPPER */}
      <div style={{ position:'relative', background:'#fff', textAlign:'center', padding:`55px 60px ${OVERLAP}px` }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'7px', marginBottom:'10px' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          <span style={{ fontSize:'10px', fontWeight:'800', letterSpacing:'3px', textTransform:'uppercase', color:'#bbb' }}>CONTACT US</span>
        </div>
        <h2 style={{ fontSize:'2.3rem', fontWeight:'900', color:'#0f2027', margin:'0 0 3px' }}>Do you have questions?</h2>
        <h2 style={{ fontSize:'2.3rem', fontWeight:'900', margin:'0 0 40px' }}>
          <span style={{ color:'#306F74' }}>ask us </span>
          <span style={{ color:'#74C3BA' }}>anytime</span>
        </h2>

        {/* CARDS */}
        <div style={{
          position:'absolute', bottom:`-${OVERLAP}px`, left:'50%', transform:'translateX(-50%)',
          width:'76%', zIndex:10,
          display:'grid', gridTemplateColumns:'repeat(3,1fr)',
          background:'linear-gradient(135deg, #306F74 0%, #74C3BA 100%)',
          borderRadius:'16px', overflow:'hidden',
          boxShadow:'0 20px 55px rgba(48,112,117,0.4)',
        }}>
          {cardData.map((card,i) => (
            <div key={i} style={{ padding:'34px 28px', borderRight:i<2?'1px solid rgba(255,255,255,0.2)':'none', textAlign:'left' }}>
              <div style={{ width:'52px', height:'52px', borderRadius:'50%', background:'rgba(255,255,255,0.22)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'16px' }}>
                <div style={{ width:'44px', height:'44px', borderRadius:'50%', background:'white', display:'flex', alignItems:'center', justifyContent:'center' }}>{card.icon}</div>
              </div>
              <h3 style={{ fontSize:'0.95rem', fontWeight:'700', color:'white', margin:'0 0 8px' }}>{card.title}</h3>
              {card.lines.map((line,j) => <p key={j} style={{ fontSize:'12.5px', color:'rgba(255,255,255,0.87)', lineHeight:1.8, margin:0 }}>{line}</p>)}
            </div>
          ))}
        </div>
      </div>

      {/* DARK FORM SECTION */}
      <div style={{ position:'relative', background:'#fff', padding:'0 80px 60px' }}>
        <div style={{ position:'absolute', top:0, bottom:'60px', left:'80px', right:'80px', backgroundImage:`url(${formBg})`, backgroundSize:'cover', backgroundPosition:'center', filter:'brightness(0.5)', borderRadius:'20px' }} />
        <div style={{ position:'absolute', top:0, bottom:'60px', left:'80px', right:'80px', background:'rgba(20,80,70,0.75)', borderRadius:'20px' }} />

        <div style={{ position:'relative', zIndex:2, maxWidth:'820px', margin:'0 auto', padding:`${OVERLAP + 60}px 40px 70px` }}>
          <h2 style={{ fontSize:'2.2rem', fontWeight:'900', color:'white', textAlign:'center', marginBottom:'36px', letterSpacing:'-0.5px' }}>
            Get in touch with us
          </h2>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'14px', marginBottom:'14px' }}>
            <input name="fname" value={form.fname} onChange={handleChange} placeholder="First name" onFocus={()=>setFocused('fname')} onBlur={()=>setFocused('')} style={iStyle('fname')} />
            <input name="lname" value={form.lname} onChange={handleChange} placeholder="Last name"  onFocus={()=>setFocused('lname')} onBlur={()=>setFocused('')} style={iStyle('lname')} />
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'14px', marginBottom:'14px' }}>
            <input name="phone" type="tel"   value={form.phone} onChange={handleChange} placeholder="Enter Your Phone No." onFocus={()=>setFocused('phone')} onBlur={()=>setFocused('')} style={iStyle('phone')} />
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Enter Your E-mail"    onFocus={()=>setFocused('email')} onBlur={()=>setFocused('')} style={iStyle('email')} />
          </div>
          <textarea name="message" value={form.message} onChange={handleChange} placeholder="Write Message" rows={5}
            onFocus={()=>setFocused('message')} onBlur={()=>setFocused('')}
            style={{ ...iStyle('message'), resize:'vertical', marginBottom:'28px', display:'block' }} />
          <div style={{ textAlign:'center' }}>
            <button onClick={handleSubmit}
              style={{ padding:'13px 36px', background:'white', border:'none', borderRadius:'50px', fontSize:'14.5px', fontWeight:'700', color:'#306F74', cursor:'pointer', transition:'all 0.3s', display:'inline-flex', alignItems:'center', gap:'10px', boxShadow:'0 6px 22px rgba(0,0,0,0.25)' }}
              onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 12px 30px rgba(0,0,0,0.35)'; }}
              onMouseLeave={e=>{ e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 6px 22px rgba(0,0,0,0.25)'; }}>
              Submit Message
              <span style={{ width:'28px', height:'28px', background:'#306F74', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </span>
            </button>
          </div>
        </div>

        {submitted && (
          <div style={{ position:'fixed', top:'20px', right:'20px', background:'#4CAF50', color:'white', padding:'14px 22px', borderRadius:'10px', fontWeight:'600', fontSize:'15px', zIndex:9999 }}>
            ✅ Message sent successfully!
          </div>
        )}
      </div>
    </div>
  );
};

// ════════════════════════════════════════
//  4. FOOTER
// ════════════════════════════════════════
const FooterLink = ({ href, children }) => (
  <a href={href} style={{ color:'#b8d4d6', textDecoration:'none', fontSize:'15px', display:'inline-block', transition:'all 0.3s ease' }}
    onMouseEnter={e=>{ e.target.style.color='#f3f7ec'; e.target.style.transform='translateX(8px)'; }}
    onMouseLeave={e=>{ e.target.style.color='#b8d4d6'; e.target.style.transform='translateX(0)'; }}>
    {children}
  </a>
);
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
      {links.map(l => <li key={l.label}><FooterLink href={l.href}>{l.label}</FooterLink></li>)}
    </ul>
  </div>
);

const Footer = () => (
  <footer style={{ background:'linear-gradient(135deg, #307075 0%, #2a5f63 100%)', color:'#f3f7ec', padding:'60px 0 20px', position:'relative', overflow:'hidden' }}>
    <div style={{ position:'absolute', top:0, left:0, right:0, height:'1px', background:'linear-gradient(90deg, transparent, #f3f7ec, transparent)' }} />
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
            {[{href:'https://www.instagram.com/iseewaves.pk',icon:instagramIcon,alt:'Instagram'},{href:'https://m.facebook.com/iseewaves.pk',icon:facebookIcon,alt:'Facebook'},{href:'https://x.com/iseewaves_',icon:twitterIcon,alt:'X'},{href:'http://www.linkedin.com/company/iseewaves/',icon:linkedinIcon,alt:'LinkedIn'}].map(s => (
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
            {[{label:'Privacy Policy',href:'/privacy'},{label:'Terms of Policy',href:'/tos'},{label:'Security',href:'#security'}].map(l => (
              <a key={l.label} href={l.href} style={{ color:'#b8d4d6',textDecoration:'none',fontSize:'14px',transition:'color 0.3s' }}
                onMouseEnter={e=>e.target.style.color='#f3f7ec'} onMouseLeave={e=>e.target.style.color='#b8d4d6'}>{l.label}</a>
            ))}
          </div>
        </div>
      </div>
    </div>
  </footer>
);

// ════════════════════════════════════════
//  CONTACT PAGE
// ════════════════════════════════════════
const Contact = () => (
  <>
    <GlobalStyles />
    <Navbar />
    <ContactHero />
    <ContactSection />
    <Footer />
  </>
);

export default Contact;