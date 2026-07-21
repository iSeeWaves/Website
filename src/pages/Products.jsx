import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import videoBg from '../assets/images/video_bg.mp4';

const SF = "'Segoe UI', Arial, sans-serif";

const DEMO_VIDEO_URL = 'https://drive.google.com/file/d/127AB3uc7Vpzo94oDXZgR4cQN2KOi22Uo/preview';
const features = [
  { icon: '🛡️', label: 'Threat Detection' },
  { icon: '🔐', label: 'API Security' },
  { icon: '🕐', label: '24/7 Monitoring' },
  { icon: '🏗️', label: 'Secure Infrastructure' },
  { icon: '🔍', label: 'Vulnerability Scanning' },
  { icon: '☁️', label: 'Cloud Protection' },
];

const problems = [
  { num: '01', title: 'Problem 1', stat: '90%', desc: 'Modern applications rely on open-source components that may contain hidden vulnerabilities and unpatched security risks.' },
  { num: '02', title: 'Problem 2', stat: '96%', desc: 'Applications still include at least one open-source dependency that is outdated, misconfigured, or insecure.' },
  { num: '03', title: 'Problem 3', stat: '30%', desc: 'Developers consistently follow formal secure coding practices — leaving the majority of codebases exposed to threats.' },
];

const whyCards = [
  { icon: '📡', title: 'Real-Time Threat Monitoring', desc: 'Monitor suspicious activities and cyber threats instantly across your entire system landscape with live dashboards.' },
  { icon: '⚠️', title: 'Advanced Vulnerability Detection', desc: 'Identify outdated libraries, weak APIs, and hidden security flaws before attackers exploit them.' },
  { icon: '☁️', title: 'Cloud & Infrastructure Security', desc: 'Protect enterprise servers, cloud services, and digital assets with multi-layered intelligent defense.' },
  { icon: '🤖', title: 'AI-Powered Intelligence', desc: 'Leverage intelligent analytics and automated threat assessments for faster, stronger security decisions.' },
];

const stats = [
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '500+', label: 'Enterprises Protected' },
  { value: '10M+', label: 'Threats Blocked' },
  { value: '<1ms', label: 'Response Time' },
];

const Products = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredProblem, setHoveredProblem] = useState(null);
  const [hoveredDemo, setHoveredDemo] = useState(false);

  return (
    <>
      <style>{`
        @keyframes heroFadeUp  { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
        @keyframes shimmerLine { 0% { transform:translateX(-100%); } 100% { transform:translateX(300%); } }
        @keyframes scanLine    { 0% { top:-5%; } 100% { top:110%; } }
        @keyframes glowPulse   { 0%,100% { opacity:0.35; } 50% { opacity:0.8; } }
        @keyframes fadeInDown  { from { opacity:0; transform:translateY(-14px); } to { opacity:1; transform:translateY(0); } }
        @keyframes playPulse   { 0%,100% { box-shadow:0 0 0 0 rgba(116,195,186,0.4); } 70% { box-shadow:0 0 0 10px rgba(116,195,186,0); } }
      `}</style>

      <Navbar />

      {/* ─── HERO SECTION ─── */}
      <section style={{
        marginTop: '80px',
        minHeight: '450px',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        fontFamily: SF,
      }}>
        <video autoPlay muted loop playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}>
          <source src={videoBg} type="video/mp4" />
        </video>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,15,20,0.55)', zIndex: 1 }} />
        <div style={{ position: 'absolute', bottom: '-80px', left: '-60px', width: '450px', height: '450px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(48,111,116,0.32) 0%, transparent 65%)', zIndex: 2, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, rgba(116,195,186,0.35), transparent)', zIndex: 3, animation: 'scanLine 6s linear infinite', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(116,195,186,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(116,195,186,0.04) 1px, transparent 1px)', backgroundSize: '60px 60px', zIndex: 2, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: 'linear-gradient(180deg, transparent, #74C3BA, #306F74, transparent)', zIndex: 4 }} />
        <div style={{ position: 'absolute', right: '10%', top: '50%', transform: 'translateY(-50%)', width: '180px', height: '180px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(116,195,186,0.10) 0%, transparent 70%)', border: '1px solid rgba(116,195,186,0.12)', zIndex: 4, animation: 'glowPulse 3s ease-in-out infinite', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 5, padding: '50px 90px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', animation: 'fadeInDown 0.5s ease both' }}>
            <span style={{ width: '24px', height: '1px', background: '#74C3BA', display: 'inline-block' }} />
            <a href="/" style={{ color: 'rgba(255,255,255,0.45)', textDecoration: 'none', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: '600', transition: 'color 0.3s' }}
              onMouseEnter={e => e.target.style.color = '#74C3BA'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.45)'}>
              Home
            </a>
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>›</span>
            <span style={{ color: '#74C3BA', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: '700' }}>Products</span>
          </div>

          <h1 style={{ fontFamily: SF, fontWeight: '900', lineHeight: 0.95, letterSpacing: '-2px', margin: 0, animation: 'heroFadeUp 0.7s ease both', animationDelay: '0.15s' }}>
            <span style={{ fontSize: 'clamp(3.8rem,8vw,7rem)', color: '#ffffff' }}>My</span>
            <span style={{ fontSize: 'clamp(3.8rem,8vw,7rem)', color: '#74C3BA', position: 'relative', display: 'inline-block' }}>
              ESI
              <span style={{ position: 'absolute', bottom: '-6px', left: 0, width: '100%', height: '3px', background: 'linear-gradient(90deg,#74C3BA,transparent)', borderRadius: '2px', overflow: 'hidden' }}>
                <span style={{ position: 'absolute', top: 0, left: 0, width: '40%', height: '100%', background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.8),transparent)', animation: 'shimmerLine 2.5s ease-in-out infinite' }} />
              </span>
            </span>
          </h1>

          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem', marginTop: '20px', fontFamily: SF, animation: 'heroFadeUp 0.7s ease both', animationDelay: '0.3s', maxWidth: '500px', lineHeight: 1.7 }}>
            My Enterprise Security Intelligence — your trusted partner in offensive security tools.
          </p>
        </div>
      </section>

      {/* ─── ESI INFO SECTION ─── */}
      <section style={{
        background: 'linear-gradient(135deg, #ffffff 0%, #f0f7f7 50%, #e4f2f2 100%)',
        padding: '120px 70px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', width: '600px', height: '600px', background: 'rgba(116,195,186,0.10)', borderRadius: '50%', top: '-150px', right: '-150px', filter: 'blur(80px)' }} />
        <div style={{ position: 'absolute', width: '400px', height: '400px', background: 'rgba(116,195,186,0.07)', borderRadius: '50%', bottom: '-100px', left: '-100px', filter: 'blur(60px)' }} />

        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <span style={{ background: 'rgba(48,111,116,0.1)', border: '1px solid rgba(48,111,116,0.3)', color: '#306F74', padding: '10px 22px', borderRadius: '40px', fontWeight: '700', fontSize: '13px', display: 'inline-block', marginBottom: '28px', letterSpacing: '2px' }}>
            ENTERPRISE CYBERSECURITY PLATFORM
          </span>

          <h2 style={{ color: '#1f4f53', fontSize: '3.5rem', fontWeight: '900', marginBottom: '10px', letterSpacing: '-2px' }}>
            MyESI
          </h2>
          <h3 style={{ color: '#306F74', fontSize: '1.5rem', marginBottom: '24px', fontWeight: '500', letterSpacing: '1px' }}>
            My Enterprise Security Intelligence
          </h3>

          <p style={{ color: '#4a7a7c', fontSize: '1.1rem', lineHeight: '2', maxWidth: '720px', margin: '0 auto 44px' }}>
            iSeeWaves has developed MyESI, which secures your code by uncovering hidden vulnerabilities
            in modules, third-party frameworks, and APIs. It pinpoints risks from outdated versions,
            misconfigurations, and validates the SSDLC process line-by-line.
          </p>

          {/* ─── CTA Buttons ─── */}
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '16px' }}>
            <a
              href={DEMO_VIDEO_URL}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHoveredDemo(true)}
              onMouseLeave={() => setHoveredDemo(false)}
              style={{
                display        : 'inline-flex',
                alignItems     : 'center',
                gap            : '12px',
                background     : '#306F74',
                color          : '#ffffff',
                padding        : '16px 38px',
                borderRadius   : '50px',
                textDecoration : 'none',
                fontWeight     : '800',
                fontSize       : '1rem',
                boxShadow      : hoveredDemo ? '0 12px 30px rgba(48,111,116,0.4)' : '0 8px 25px rgba(48,111,116,0.3)',
                transition     : 'all 0.25s ease',
                transform      : hoveredDemo ? 'translateY(-2px)' : 'translateY(0)',
              }}
            >
              <span style={{
                width          : '28px',
                height         : '28px',
                borderRadius   : '50%',
                background     : 'rgba(255,255,255,0.2)',
                display        : 'flex',
                alignItems     : 'center',
                justifyContent : 'center',
                flexShrink     : 0,
                animation      : 'playPulse 2s ease-in-out infinite',
              }}>
                <svg width="10" height="12" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1.5L11 7L1 12.5V1.5Z" fill="#ffffff" stroke="#ffffff" strokeWidth="1" strokeLinejoin="round"/>
                </svg>
              </span>
              Watch Product Demo
              <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', fontWeight: '600' }}>32 min</span>
            </a>
            <a href="/contact"
              style={{ border: '2px solid #306F74', color: '#306F74', padding: '16px 38px', borderRadius: '50px', textDecoration: 'none', fontWeight: '700', fontSize: '1rem', display: 'inline-block', transition: 'all 0.2s', background: 'transparent' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#306F74'; e.currentTarget.style.color = '#ffffff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#306F74'; }}>
              Contact Us to Buy
            </a>
          </div>
          <p style={{ marginBottom: '60px', fontSize: '12px', color: '#99b8ba', letterSpacing: '0.5px' }}>
            Opens in Google Drive · No sign-in required
          </p>

          {/* Feature Pills */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', maxWidth: '800px', margin: '0 auto' }}>
            {features.map((item, i) => (
              <div key={i} style={{ background: 'rgba(48,111,116,0.06)', border: '1px solid rgba(48,111,116,0.15)', padding: '16px 20px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '1.3rem' }}>{item.icon}</span>
                <span style={{ color: '#1f4f53', fontWeight: '600', fontSize: '0.95rem' }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STATS STRIP ─── */}
      <section style={{ background: '#306F74', padding: '50px 70px', borderTop: '1px solid rgba(116,195,186,0.2)', borderBottom: '1px solid rgba(116,195,186,0.2)' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', textAlign: 'center' }}>
          {stats.map((s, i) => (
            <div key={i}>
              <div style={{ color: '#F4F7EC', fontSize: '2.8rem', fontWeight: '900', marginBottom: '6px' }}>{s.value}</div>
              <div style={{ color: '#c8e4e1', fontSize: '0.9rem', fontWeight: '500', letterSpacing: '1px', textTransform: 'uppercase' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── WHY MyESI? + PROBLEMS SECTION ─── */}
      <section style={{ background: 'linear-gradient(180deg, #f4f7ec 0%, #eaf4f4 100%)', padding: '120px 70px' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '70px' }}>
            <span style={{ background: 'rgba(48,111,116,0.1)', border: '1px solid rgba(48,111,116,0.25)', color: '#306F74', padding: '8px 20px', borderRadius: '40px', fontWeight: '700', fontSize: '13px', letterSpacing: '2px', display: 'inline-block', marginBottom: '20px' }}>
              THE PROBLEM WE SOLVE
            </span>
            <h2 style={{ color: '#1f4f53', fontSize: '3.2rem', fontWeight: '900', marginBottom: '20px', letterSpacing: '-1px' }}>
              Why MyESI?
            </h2>
            <p style={{ color: '#4a7a7c', fontSize: '1.1rem', lineHeight: '2', maxWidth: '750px', margin: '0 auto' }}>
              iSeeWaves has developed MyESI, which secures your code by uncovering hidden vulnerabilities
              in modules, third-party frameworks, and APIs — validating the SSDLC process line-by-line.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '28px' }}>
            {problems.map((p, i) => (
              <div key={i}
                onMouseEnter={() => setHoveredProblem(i)}
                onMouseLeave={() => setHoveredProblem(null)}
                style={{
                  background : hoveredProblem === i ? '#306F74' : '#ffffff',
                  border     : hoveredProblem === i ? '1px solid #306F74' : '1px solid rgba(48,111,116,0.15)',
                  borderRadius: '24px', padding: '40px 32px',
                  transition : 'all 0.3s ease', cursor: 'default',
                  position   : 'relative', overflow: 'hidden',
                  boxShadow  : hoveredProblem === i ? '0 20px 50px rgba(48,111,116,0.2)' : '0 8px 25px rgba(0,0,0,0.06)',
                }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                  <span style={{ fontSize: '1.5rem' }}>⚠️</span>
                  <span style={{ color: hoveredProblem === i ? '#c8e4e1' : '#306F74', fontWeight: '800', fontSize: '1.1rem' }}>{p.title}</span>
                </div>
                <div style={{ color: hoveredProblem === i ? '#F4F7EC' : '#1f4f53', fontSize: '3.5rem', fontWeight: '900', marginBottom: '14px', lineHeight: '1' }}>{p.stat}</div>
                <p style={{ color: hoveredProblem === i ? '#c8e4e1' : '#4a7a7c', lineHeight: '1.8', fontSize: '0.95rem', margin: 0 }}>{p.desc}</p>
                <div style={{ position: 'absolute', bottom: '-10px', right: '20px', fontSize: '6rem', fontWeight: '900', color: hoveredProblem === i ? 'rgba(255,255,255,0.06)' : 'rgba(48,111,116,0.05)', lineHeight: '1', userSelect: 'none' }}>{p.num}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY BUSINESSES CHOOSE MYESI ─── */}
      <section style={{ background: '#306F74', padding: '120px 70px' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{ background: 'rgba(255,255,255,0.15)', color: '#F4F7EC', padding: '8px 20px', borderRadius: '40px', fontWeight: '700', fontSize: '13px', letterSpacing: '1.5px', display: 'inline-block', marginBottom: '20px' }}>
            PLATFORM CAPABILITIES
          </span>
          <h2 style={{ fontSize: '3.2rem', color: '#F4F7EC', marginBottom: '20px', fontWeight: '900', letterSpacing: '-1px' }}>
            Why Businesses Choose MyESI
          </h2>
          <p style={{ maxWidth: '750px', margin: '0 auto 70px', fontSize: '1.1rem', lineHeight: '2', color: '#c8e4e1' }}>
            One intelligent platform combining enterprise-grade security tools, threat intelligence,
            infrastructure protection, and AI-powered monitoring for modern organizations.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '28px' }}>
            {whyCards.map((card, i) => (
              <div key={i}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  background : hoveredCard === i ? '#1f4f53' : '#ffffff',
                  padding    : '40px 32px', borderRadius: '28px',
                  boxShadow  : hoveredCard === i ? '0 20px 50px rgba(0,0,0,0.25)' : '0 10px 35px rgba(0,0,0,0.07)',
                  textAlign  : 'left', transition: 'all 0.3s ease', cursor: 'default',
                }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '20px', background: hoveredCard === i ? 'rgba(255,255,255,0.1)' : 'rgba(48,111,116,0.1)', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem' }}>
                  {card.icon}
                </div>
                <h3 style={{ color: hoveredCard === i ? '#74C3BA' : '#306F74', fontSize: '1.3rem', marginBottom: '14px', fontWeight: '800' }}>{card.title}</h3>
                <p style={{ color: hoveredCard === i ? '#c8e4e1' : '#607f81', lineHeight: '1.9', fontSize: '0.95rem', margin: 0 }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section style={{ background: 'linear-gradient(135deg, #1f4f53, #1f4f53)', padding: '90px 70px', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ color: '#F4F7EC', fontSize: '3rem', fontWeight: '900', marginBottom: '20px', letterSpacing: '-1px' }}>
            Ready to Secure Your Enterprise?
          </h2>
          <p style={{ color: '#c8e4e1', fontSize: '1.1rem', lineHeight: '2', marginBottom: '40px' }}>
            Join 500+ enterprises that trust MyESI to protect their infrastructure, APIs, and cloud systems 24/7.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/contact" style={{ background: '#74C3BA', color: '#16373a', padding: '18px 42px', borderRadius: '50px', textDecoration: 'none', fontWeight: '800', fontSize: '1rem', boxShadow: '0 8px 25px rgba(116,195,186,0.35)' }}>
              Contact Us to Buy →
            </a>
            <a
              href={DEMO_VIDEO_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ border: '2px solid rgba(244,247,236,0.4)', color: '#F4F7EC', padding: '18px 42px', borderRadius: '50px', textDecoration: 'none', fontWeight: '700', fontSize: '1rem', display: 'inline-flex', alignItems: 'center', gap: '8px', transition: 'border-color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(244,247,236,0.8)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(244,247,236,0.4)'}
            >
              ▶ Watch Demo
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Products;