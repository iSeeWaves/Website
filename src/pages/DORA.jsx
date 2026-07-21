import React from 'react';

import logo          from '../assets/images/icons/logo.png';
import gmailIcon     from '../assets/images/icons/gmail.png';
import locationIcon  from '../assets/images/icons/placeholder.png';
import instagramIcon from '../assets/images/icons/instagram.png';
import facebookIcon  from '../assets/images/icons/facebook.png';
import twitterIcon   from '../assets/images/icons/twitter.png';
import linkedinIcon  from '../assets/images/icons/linkedin.png';

const SF = "'Segoe UI', Arial, sans-serif";

/* ──────────────────────────────────────────────────────────
   PAGE DATA
   ────────────────────────────────────────────────────────── */
const data = {
  code: 'DORA',
  title: 'Digital Operational Resilience Act',
  authority: 'European Union',
  authorityUrl: 'https://www.eiopa.europa.eu',
  year: '2023',
  description: 'To ensure the financial sector in Europe is resilient against severe operational disruptions and cyber threats.',

  whatIs: 'DORA is an EU regulation that creates a binding, comprehensive information and communication technology (ICT) risk management framework for the EU financial sector.',
  roleImportance: 'It shifts the focus from financial resilience to operational resilience, ensuring financial entities can withstand, respond to, and recover from all types of ICT-related disruptions.',

  benefits: [
    'Enhanced resilience against cyber attacks',
    'Harmonized ICT risk management across the EU',
    'Better oversight of critical third-party providers',
    'Streamlined incident reporting',
    'Increased consumer trust in financial systems',
  ],
  rules: [
    'Establish a comprehensive ICT risk management framework',
    'Classify and report major ICT-related incidents',
    'Conduct regular digital operational resilience testing',
    'Manage ICT third-party risk effectively',
    'Share cyber threat information and intelligence',
  ],

  whoMustComply: [
    'Banks and credit institutions',
    'Insurance companies',
    'Investment firms',
    'Crypto-asset service providers',
    'Critical ICT third-party service providers (e.g., cloud providers)',
  ],
  complianceRequirements: [
    'ICT Risk Management Framework',
    'Incident Management and Reporting',
    'Resilience Testing (including Threat-Led Penetration Testing)',
    'Third-Party Risk Management Strategy',
    'Information Sharing Arrangements',
  ],

  penalties: 'Fines can reach up to 1% of the average daily worldwide turnover of the critical ICT third-party service provider in the preceding business year, applied daily for up to six months.',

  howWeSupport: [
    'ICT risk management framework design',
    'Threat-Led Penetration Testing (TLPT)',
    'Third-party risk assessment and monitoring',
    'Automated incident classification and reporting',
    'Continuous operational resilience monitoring',
  ],
};

/* ──────────────────────────────────────────────────────────
   GLOBAL STYLES
   ────────────────────────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    * { box-sizing: border-box; margin: 0; padding: 0; }
    @keyframes heroFadeUp { from { opacity:0; transform:translateY(26px); } to { opacity:1; transform:translateY(0); } }
    @keyframes glowPulse  { 0%,100% { opacity:0.35; } 50% { opacity:0.7; } }

    .dora-nav-link { text-decoration:none; color:#F4F7EC; font-size:16px; font-weight:bold; transition:color 0.3s; padding-bottom:3px; }
    .dora-nav-link:hover { color:#fff; border-bottom:2px solid #fff; }

    .dora-footer-link { color:#b8d4d6; text-decoration:none; font-size:15px; display:inline-block; transition:all 0.3s ease; }
    .dora-footer-link:hover { color:#f3f7ec; transform:translateX(8px); }

    .dora-info-card {
      border-radius:18px; padding:28px 26px;
      background:rgba(255,255,255,0.85);
      border:1px solid rgba(48,111,116,0.15);
      transition:all 0.3s ease;
    }
    .dora-info-card:hover { transform:translateY(-3px); border-color:rgba(48,111,116,0.4); box-shadow:0 14px 32px rgba(48,111,116,0.12); }

    .dora-cta-primary {
      display:inline-flex; align-items:center; gap:10px;
      padding:14px 30px; border-radius:50px;
      background:linear-gradient(135deg,#306F74,#74C3BA);
      color:#fff; font-weight:700; font-size:14px;
      text-decoration:none; transition:all 0.3s ease;
      box-shadow:0 8px 22px rgba(48,111,116,0.4);
    }
    .dora-cta-primary:hover { transform:translateY(-2px); box-shadow:0 12px 30px rgba(48,111,116,0.55); }

    .dora-cta-secondary {
      display:inline-flex; align-items:center; gap:10px;
      padding:14px 30px; border-radius:50px;
      background:rgba(255,255,255,0.06); color:#fff;
      font-weight:700; font-size:14px; text-decoration:none;
      border:1px solid rgba(255,255,255,0.3); transition:all 0.3s ease;
    }
    .dora-cta-secondary:hover { background:rgba(255,255,255,0.14); border-color:#74C3BA; transform:translateY(-2px); }
  `}</style>
);

/* ──────────────────────────────────────────────────────────
   NAVBAR
   ────────────────────────────────────────────────────────── */
const Navbar = () => (
  <header style={{ backgroundColor:'#306F74', padding:'0px 50px', position:'fixed', width:'100%', top:0, zIndex:1000, boxShadow:'0 2px 10px rgba(0,0,0,0.2)' }}>
    <nav style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
      <a href="/"><img src={logo} alt="iSeeWaves" style={{ height:'90px', borderRadius:'8px' }} /></a>
      <ul style={{ display:'flex', listStyle:'none', margin:0, padding:0 }}>
        {[
          ['Products',          '/products'   ],
          ['Services',          '/services'   ],
          ['About Us',          '/about'      ],
          ['Cyber Regulations', '/regulations'],
          ['Contact',           '/contact'    ],
          ['Careers',           '/careers'    ],
        ].map(([label, href]) => (
          <li key={label} style={{ marginRight:'20px' }}>
            <a href={href} className="dora-nav-link">{label}</a>
          </li>
        ))}
      </ul>
    </nav>
  </header>
);

/* ──────────────────────────────────────────────────────────
   HERO
   ────────────────────────────────────────────────────────── */
const Hero = () => (
  <section style={{ marginTop:'90px', position:'relative', overflow:'hidden', fontFamily:SF, background:'linear-gradient(180deg,#08191c 0%,#0c2326 60%,#0a1f22 100%)', padding:'90px 30px 80px' }}>
    <div style={{ position:'absolute', top:'-120px', left:'-100px', width:'420px', height:'420px', borderRadius:'50%', background:'radial-gradient(circle,rgba(48,111,116,0.35) 0%,transparent 70%)', animation:'glowPulse 4s ease-in-out infinite', pointerEvents:'none' }} />
    <div style={{ position:'absolute', top:'-80px', right:'-100px', width:'380px', height:'380px', borderRadius:'50%', background:'radial-gradient(circle,rgba(116,195,186,0.25) 0%,transparent 70%)', animation:'glowPulse 5s ease-in-out infinite', pointerEvents:'none' }} />

    <div style={{ position:'relative', zIndex:2, maxWidth:'720px', margin:'0 auto', textAlign:'center', animation:'heroFadeUp 0.6s ease both' }}>
      <a href="/regulations" style={{ textDecoration:'none' }}>
        <span style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'rgba(116,195,186,0.12)', border:'1px solid rgba(116,195,186,0.3)', borderRadius:'50px', padding:'7px 18px', marginBottom:'26px' }}>
          <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#74C3BA', display:'inline-block' }} />
          <span style={{ fontSize:'11px', fontWeight:'700', letterSpacing:'2.5px', textTransform:'uppercase', color:'#74C3BA' }}>Compliance Framework</span>
        </span>
      </a>

      <h1 style={{ fontFamily:SF, fontWeight:'900', letterSpacing:'-2px', color:'#fff', fontSize:'clamp(2.6rem,6vw,4.2rem)', margin:'0 0 12px', lineHeight:1 }}>{data.code}</h1>
      <p style={{ color:'#74C3BA', fontSize:'17px', fontWeight:'700', margin:'0 0 18px' }}>{data.title}</p>
      <p style={{ color:'rgba(255,255,255,0.55)', fontSize:'13.5px', margin:'0 0 22px' }}>
        Established by{' '}
        <a href={data.authorityUrl} target="_blank" rel="noreferrer" style={{ color:'#cfe9e6', fontWeight:'700', textDecoration:'none', borderBottom:'1px solid rgba(207,233,230,0.4)' }}>
          {data.authority}
        </a>{' '}
        in {data.year}.
      </p>
      <p style={{ color:'rgba(255,255,255,0.7)', fontSize:'15px', lineHeight:1.8, margin:'0 auto 34px', maxWidth:'620px' }}>{data.description}</p>

      <div style={{ display:'flex', gap:'14px', justifyContent:'center', flexWrap:'wrap' }}>
        <a href="/contact" className="dora-cta-primary">Get Free Assessment</a>
        <a href="/contact" className="dora-cta-secondary">Talk to an Expert</a>
      </div>
    </div>
  </section>
);

/* ──────────────────────────────────────────────────────────
   INFO CARD
   ────────────────────────────────────────────────────────── */
const InfoCard = ({ title, body, items, bullet }) => (
  <div className="dora-info-card">
    <h3 style={{ fontSize:'1.05rem', fontWeight:'800', color:'#163d28', margin:'0 0 16px', fontFamily:SF }}>{title}</h3>
    {body && <p style={{ fontSize:'14px', color:'rgba(20,60,40,0.65)', lineHeight:1.8, margin:0 }}>{body}</p>}
    {items && (
      <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:'11px' }}>
        {items.map((it, i) => (
          <li key={i} style={{ display:'flex', gap:'10px', fontSize:'13.5px', color:'rgba(20,60,40,0.7)', lineHeight:1.6 }}>
            <span style={{ color:'#306F74', flexShrink:0, fontWeight:'800' }}>{bullet}</span>{it}
          </li>
        ))}
      </ul>
    )}
  </div>
);

/* ──────────────────────────────────────────────────────────
   CONTENT SECTION
   ────────────────────────────────────────────────────────── */
const ContentSection = () => (
  <section style={{ padding:'70px 80px 0', background:'linear-gradient(160deg,#eaf8f5 0%,#e0f5f0 50%,#e5f7f2 100%)', fontFamily:SF }}>
    <div style={{ maxWidth:'1100px', margin:'0 auto' }}>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px', marginBottom:'20px' }}>
        <InfoCard title={`What is ${data.code}?`} body={data.whatIs} />
        <InfoCard title="Role & Importance"        body={data.roleImportance} />
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px', marginBottom:'20px' }}>
        <InfoCard title="Key Benefits" items={data.benefits} bullet="✓" />
        <InfoCard title="Key Rules"    items={data.rules}    bullet="→" />
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px', marginBottom:'20px' }}>
        <InfoCard title="Who Must Comply?"        items={data.whoMustComply}          bullet="•" />
        <InfoCard title="Compliance Requirements" items={data.complianceRequirements} bullet="•" />
      </div>

      {/* Penalties */}
      <div style={{ borderRadius:'18px', padding:'26px 28px', marginBottom:'20px', background:'rgba(193,68,55,0.07)', border:'1px solid rgba(193,68,55,0.25)' }}>
        <h3 style={{ display:'flex', alignItems:'center', gap:'10px', fontSize:'1rem', fontWeight:'800', color:'#a5362a', margin:'0 0 10px', fontFamily:SF }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="#a5362a" strokeWidth="1.8"/>
            <path d="M12 9v4M12 17h.01" stroke="#a5362a" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
          Penalties for Non-Compliance
        </h3>
        <p style={{ fontSize:'13.5px', color:'rgba(120,40,30,0.75)', lineHeight:1.8, margin:0 }}>{data.penalties}</p>
      </div>

      {/* How We Support */}
      <div style={{ borderRadius:'18px', padding:'30px 28px', marginBottom:'70px', background:'linear-gradient(135deg,#2d7a7a 0%,#3a9494 100%)' }}>
        <h3 style={{ fontSize:'1.15rem', fontWeight:'800', color:'#fff', margin:'0 0 20px', fontFamily:SF }}>
          How iSeeWaves Supports {data.code} Compliance
        </h3>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'14px 28px' }}>
          {data.howWeSupport.map((item, i) => (
            <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:'10px' }}>
              <span style={{ width:'20px', height:'20px', borderRadius:'50%', background:'rgba(255,255,255,0.2)', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', marginTop:'1px' }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                  <path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <span style={{ fontSize:'13.5px', color:'rgba(255,255,255,0.9)', lineHeight:1.6 }}>{item}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  </section>
);

/* ──────────────────────────────────────────────────────────
   BOTTOM CTA
   ────────────────────────────────────────────────────────── */
const BottomCTA = () => (
  <section style={{ padding:'70px 30px', textAlign:'center', background:'linear-gradient(135deg,#0c2326 0%,#163d3f 100%)', fontFamily:SF }}>
    <h2 style={{ fontSize:'2rem', fontWeight:'900', color:'#fff', margin:'0 0 14px' }}>Stay Compliant with {data.code}</h2>
    <p style={{ fontSize:'15px', color:'rgba(255,255,255,0.55)', maxWidth:'520px', margin:'0 auto 30px', lineHeight:1.7 }}>
      Don't let compliance complexities slow down your business. Partner with iSeeWaves to ensure continuous adherence and robust security.
    </p>
    <a href="/contact" className="dora-cta-primary">Start Free Assessment</a>
  </section>
);

/* ──────────────────────────────────────────────────────────
   FOOTER
   ────────────────────────────────────────────────────────── */
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
      {links.map(link => (
        <li key={link.label}><a href={link.href} className="dora-footer-link">{link.label}</a></li>
      ))}
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
          <p style={{ color:'#b8d4d6', fontSize:'16px', lineHeight:1.6, marginBottom:'20px' }}>
            Protecting your digital assets with advanced cybersecurity solutions and cutting-edge threat detection technologies.
          </p>
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

        <FooterSection title="Quick Links" links={[
          { label:'Home',     href:'/'         },
          { label:'About Us', href:'/about'    },
          { label:'Services', href:'/services' },
          { label:'Products', href:'/products' },
          { label:'Blog',     href:'#blog'     },
        ]} />

        <FooterSection title="Company" links={[
          { label:'Contact',  href:'/contact'  },
          { label:'Careers',  href:'/careers'  },
          { label:'Our Team', href:'/careers'  },
          { label:'Partners', href:'#partners' },
          { label:'News',     href:'#news'     },
        ]} />

        <div>
          <FooterHeading title="Connect With Us" />
          <div style={{ display:'flex', gap:'15px', marginTop:'10px', flexWrap:'wrap' }}>
            {[
              { href:'https://www.instagram.com/iseewaves.pk',    icon:instagramIcon, alt:'Instagram' },
              { href:'https://m.facebook.com/iseewaves.pk',        icon:facebookIcon,  alt:'Facebook'  },
              { href:'https://x.com/iseewaves_',                   icon:twitterIcon,   alt:'X'         },
              { href:'http://www.linkedin.com/company/iseewaves/', icon:linkedinIcon,  alt:'LinkedIn'  },
            ].map(s => (
              <a key={s.alt} href={s.href} target="_blank" rel="noreferrer"
                style={{ width:'45px', height:'45px', background:'rgba(243,247,236,0.1)', border:'2px solid rgba(243,247,236,0.2)', borderRadius:'12px', display:'flex', alignItems:'center', justifyContent:'center', textDecoration:'none', transition:'all 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor='#f3f7ec'; e.currentTarget.style.background='rgba(243,247,236,0.15)'; e.currentTarget.style.transform='translateY(-3px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(243,247,236,0.2)'; e.currentTarget.style.background='rgba(243,247,236,0.1)'; e.currentTarget.style.transform='translateY(0)'; }}>
                <img src={s.icon} style={{ width:'24px', height:'24px', objectFit:'contain', opacity:0.8 }} alt={s.alt} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div style={{ borderTop:'1px solid rgba(243,247,236,0.1)', paddingTop:'30px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'20px' }}>
          <span style={{ color:'#b8d4d6', fontSize:'14px' }}>© 2025 iSeeWaves. All rights reserved.</span>
          <div style={{ display:'flex', gap:'30px' }}>
            {[
              { label:'Privacy Policy', href:'/privacy'  },
              { label:'Terms of Policy',href:'/tos'      },
              { label:'Security',       href:'#security' },
            ].map(link => (
              <a key={link.label} href={link.href}
                style={{ color:'#b8d4d6', textDecoration:'none', fontSize:'14px', transition:'color 0.3s' }}
                onMouseEnter={e => e.target.style.color='#f3f7ec'}
                onMouseLeave={e => e.target.style.color='#b8d4d6'}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  </footer>
);

/* ──────────────────────────────────────────────────────────
   PAGE
   ────────────────────────────────────────────────────────── */
const DORAPage = () => (
  <>
    <GlobalStyles />
    <Navbar />
    <Hero />
    <ContentSection />
    <BottomCTA />
    <Footer />
  </>
);

export default DORAPage;