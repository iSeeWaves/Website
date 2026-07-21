import React, { useState, useEffect } from 'react';

import logo          from '../assets/images/icons/logo.png';
import gmailIcon     from '../assets/images/icons/gmail.png';
import locationIcon  from '../assets/images/icons/placeholder.png';
import instagramIcon from '../assets/images/icons/instagram.png';
import facebookIcon  from '../assets/images/icons/facebook.png';
import twitterIcon   from '../assets/images/icons/twitter.png';
import linkedinIcon  from '../assets/images/icons/linkedin.png';
import videoBg       from '../assets/images/video_bg.mp4';
import f1            from '../assets/images/f1.jpeg';
import f2            from '../assets/images/f2.jpeg';
import f3            from '../assets/images/f3.jpeg';
import f4            from '../assets/images/f4.jpeg';

const SF = "'Segoe UI', Arial, sans-serif";

const GlobalStyles = () => (
  <style>{`
    * { box-sizing: border-box; margin: 0; padding: 0; }
    @keyframes fadeUp    { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
    @keyframes fadeIn    { from{opacity:0} to{opacity:1} }
    @keyframes shimmer   { 0%{transform:translateX(-100%)} 100%{transform:translateX(300%)} }
    @keyframes modalIn   { from{opacity:0;transform:translateY(40px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }

    .career-nav-link { text-decoration:none; color:#F4F7EC; font-size:16px; font-weight:700; transition:all 0.3s; padding-bottom:3px; }
    .career-nav-link:hover { color:#fff; border-bottom:2px solid #fff; }

    .job-card {
      background: linear-gradient(145deg, #f0f5f8 0%, #e8f2f5 100%);
      border-radius: 18px; padding: 32px 28px;
      border: 1px solid rgba(48,111,116,0.1);
      position: relative; overflow: hidden;
      transition: all 0.4s cubic-bezier(0.23,1,0.32,1);
      animation: fadeUp 0.6s ease both;
    }
    .job-card::before {
      content:''; position:absolute; top:0; left:0; right:0;
      height:3px; background:linear-gradient(90deg,#306F74,#74C3BA);
      opacity:0; transition:opacity 0.4s ease;
    }
    .job-card:hover { transform:translateY(-4px); box-shadow:0 20px 55px rgba(48,111,116,0.18); border-color:rgba(48,111,116,0.25); }
    .job-card:hover::before { opacity:1; }

    .apply-btn {
      display:flex; flex-direction:column; align-items:center; justify-content:center;
      gap:6px; width:100px; height:100px; border-radius:50%;
      background:rgba(255,255,255,0.7); border:1.5px solid rgba(48,111,116,0.15);
      cursor:pointer; transition:all 0.35s ease; flex-shrink:0;
      font-family:${SF};
    }
    .apply-btn:hover { background:linear-gradient(135deg,#306F74,#74C3BA); border-color:transparent; box-shadow:0 10px 30px rgba(48,111,116,0.35); transform:scale(1.05); }
    .apply-btn:hover .apply-text { color:white; }
    .apply-btn:hover .apply-icon { color:white; }
    .apply-text { font-size:12px; font-weight:700; color:#306F74; transition:color 0.35s; letter-spacing:0.3px; }
    .apply-icon { font-size:20px; color:#306F74; transition:color 0.35s; }

    .filter-btn {
      padding:9px 22px; border-radius:50px; font-family:${SF};
      border:1.5px solid rgba(48,111,116,0.2); background:white;
      color:#6b7280; font-size:13px; font-weight:600; cursor:pointer;
      transition:all 0.25s ease;
    }
    .filter-btn:hover { border-color:#306F74; color:#306F74; }
    .filter-btn.active { background:linear-gradient(135deg,#306F74,#74C3BA); color:white; border-color:transparent; box-shadow:0 4px 16px rgba(48,111,116,0.35); }

    .footer-link { color:#b8d4d6; text-decoration:none; font-size:15px; display:inline-block; transition:all 0.3s ease; }
    .footer-link:hover { color:#f3f7ec; transform:translateX(8px); }

    .scroll-top {
      position:fixed; bottom:28px; right:28px; width:46px; height:46px;
      border-radius:50%; background:linear-gradient(135deg,#306F74,#74C3BA);
      border:2px solid white; color:white; font-size:20px; cursor:pointer;
      display:flex; align-items:center; justify-content:center;
      box-shadow:0 6px 20px rgba(48,111,116,0.4); transition:all 0.3s;
      z-index:999;
    }
    .scroll-top:hover { transform:translateY(-3px); box-shadow:0 10px 28px rgba(48,111,116,0.55); }

    /* ── Modal ── */
    .modal-overlay {
      position:fixed; inset:0; background:rgba(5,20,25,0.65);
      backdrop-filter:blur(4px); z-index:2000;
      display:flex; align-items:center; justify-content:center;
      animation:fadeIn 0.25s ease both; padding:20px;
    }
    .modal-box {
      width:100%; max-width:900px; max-height:90vh; overflow-y:auto;
      border-radius:24px; display:grid; grid-template-columns:2fr 3fr;
      box-shadow:0 30px 80px rgba(0,0,0,0.35);
      animation:modalIn 0.35s cubic-bezier(0.23,1,0.32,1) both;
    }
    .modal-left {
      background:linear-gradient(160deg,#2a6b70 0%,#1e4f54 100%);
      border-radius:24px 0 0 24px; padding:48px 36px;
      display:flex; flex-direction:column; justify-content:center;
      position:relative; overflow:hidden;
    }
    .modal-left::before {
      content:''; position:absolute; top:-60px; right:-60px;
      width:220px; height:220px; border-radius:50%;
      background:radial-gradient(circle,rgba(116,195,186,0.18) 0%,transparent 70%);
    }
    .modal-right {
      background:white; border-radius:0 24px 24px 0; padding:48px 40px;
    }

    /* Form elements */
    .form-input, .form-select, .form-textarea {
      width:100%; padding:13px 16px; border-radius:10px;
      border:1.5px solid #e2e8f0; font-family:${SF};
      font-size:14px; color:#0f2027; background:#f8fafc;
      transition:all 0.25s ease; outline:none;
    }
    .form-input:focus, .form-select:focus, .form-textarea:focus {
      border-color:#306F74; background:white;
      box-shadow:0 0 0 3px rgba(48,111,116,0.12);
    }
    .form-textarea { resize:vertical; min-height:110px; }
    .form-label { font-size:13px; font-weight:700; color:#374151; margin-bottom:6px; display:block; font-family:${SF}; }
    .form-label span { color:#e53e3e; margin-left:2px; }

    .submit-btn {
      width:100%; padding:16px; border:none; border-radius:12px;
      background:linear-gradient(135deg,#306F74,#74C3BA);
      color:white; font-size:16px; font-weight:800;
      cursor:pointer; font-family:${SF};
      transition:all 0.3s ease;
      box-shadow:0 6px 20px rgba(48,111,116,0.35);
    }
    .submit-btn:hover { transform:translateY(-2px); box-shadow:0 10px 28px rgba(48,111,116,0.5); }

    .close-btn {
      position:absolute; top:16px; right:20px;
      background:rgba(255,255,255,0.15); border:1.5px solid rgba(255,255,255,0.25);
      color:white; width:34px; height:34px; border-radius:50%;
      font-size:18px; cursor:pointer; display:flex;
      align-items:center; justify-content:center;
      transition:all 0.25s ease; font-family:${SF};
    }
    .close-btn:hover { background:rgba(255,255,255,0.3); transform:scale(1.1); }

    .cta-send-btn {
      display:inline-flex; align-items:center; gap:12px;
      padding:18px 38px; background:linear-gradient(135deg,#306F74,#74C3BA);
      color:white; border-radius:50px; text-decoration:none;
      font-weight:800; font-size:16px; transition:all 0.3s;
      box-shadow:0 8px 28px rgba(48,111,116,0.4);
      white-space:nowrap; font-family:${SF}; cursor:pointer; border:none;
    }
    .cta-send-btn:hover { transform:translateY(-3px); box-shadow:0 14px 38px rgba(48,111,116,0.55); }
  `}</style>
);

// ══════ APPLICATION MODAL ══════
const ApplicationModal = ({ job, onClose }) => {
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '',
    desiredPosition: job ? job.title : '',
    requirements: job ? job.type : '',
    preferredContact: '', details: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    if (!form.fullName || !form.email || !form.phone || !form.desiredPosition || !form.requirements || !form.preferredContact) {
      alert('Please fill in all required fields.');
      return;
    }
    const subject = `Application for ${form.desiredPosition} - iSeeWaves`;
    const body =
`Dear iSeeWaves HR Team,

Full Name         : ${form.fullName}
Email             : ${form.email}
Phone             : ${form.phone}
Desired Position  : ${form.desiredPosition}
Job Requirements  : ${form.requirements}
Preferred Contact : ${form.preferredContact}

Additional Details:
${form.details || 'N/A'}

Best regards,
${form.fullName}`;

    window.open(
      `https://mail.google.com/mail/?view=cm&to=${encodeURIComponent('iseewaves.pk@gmail.com')}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
      '_blank', 'noopener,noreferrer'
    );
    setSubmitted(true);
    setTimeout(onClose, 2500);
  };

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-box">

        {/* LEFT */}
        <div className="modal-left">
          <button className="close-btn" onClick={onClose}>✕</button>
          <h2 style={{ color:'white', fontSize:'1.75rem', fontWeight:'900', lineHeight:1.15, marginBottom:'16px', fontFamily:SF }}>
            Build Your Career<br /><span style={{ color:'#74C3BA' }}>With Us</span>
          </h2>
          <p style={{ color:'rgba(255,255,255,0.65)', fontSize:'14px', lineHeight:1.75, marginBottom:'32px', fontFamily:SF }}>
            Join our cybersecurity and tech team to shape the future.
          </p>
          <div style={{ display:'flex', flexDirection:'column', gap:'14px' }}>
            {['Cutting-edge cybersecurity projects','Collaborative and innovative team','Growth and learning opportunities','Remote & On-site roles','Inclusive work culture'].map(item => (
              <div key={item} style={{ display:'flex', alignItems:'center', gap:'12px' }}>
                <span style={{ color:'#74C3BA', fontSize:'16px', fontWeight:'900' }}>✓</span>
                <span style={{ color:'rgba(255,255,255,0.85)', fontSize:'14px', fontFamily:SF }}>{item}</span>
              </div>
            ))}
          </div>
          {job && (
            <div style={{ marginTop:'36px', padding:'16px 18px', background:'rgba(255,255,255,0.08)', borderRadius:'12px', border:'1px solid rgba(116,195,186,0.25)' }}>
              <p style={{ fontSize:'11px', letterSpacing:'2px', textTransform:'uppercase', color:'#74C3BA', fontWeight:'700', marginBottom:'6px', fontFamily:SF }}>Applying For</p>
              <p style={{ color:'white', fontWeight:'800', fontSize:'15px', fontFamily:SF }}>{job.title}</p>
              <p style={{ color:'rgba(255,255,255,0.55)', fontSize:'13px', fontFamily:SF }}>{job.type} · {job.location}</p>
            </div>
          )}
        </div>

        {/* RIGHT */}
        <div className="modal-right">
          {submitted ? (
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'100%', gap:'16px', textAlign:'center' }}>
              <div style={{ width:'70px', height:'70px', borderRadius:'50%', background:'rgba(48,111,116,0.1)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'34px' }}>✅</div>
              <h3 style={{ fontSize:'1.4rem', fontWeight:'900', color:'#0f2027', fontFamily:SF }}>Application Sent!</h3>
              <p style={{ color:'#6b7280', fontSize:'14px', fontFamily:SF }}>Your Gmail compose window has opened.<br />Please attach your CV and hit Send.</p>
            </div>
          ) : (
            <>
              <h3 style={{ fontSize:'1.5rem', fontWeight:'900', color:'#306F74', marginBottom:'28px', fontFamily:SF }}>Job Requirements Form</h3>

              {/* Row 1 */}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px', marginBottom:'16px' }}>
                <div>
                  <label className="form-label">Full Name <span>*</span></label>
                  <input className="form-input" name="fullName" value={form.fullName} onChange={handleChange} placeholder="Your full name" />
                </div>
                <div>
                  <label className="form-label">Email <span>*</span></label>
                  <input className="form-input" type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
                </div>
              </div>

              {/* Row 2 */}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px', marginBottom:'16px' }}>
                <div>
                  <label className="form-label">Phone <span>*</span></label>
                  <input className="form-input" type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+92 300 0000000" />
                </div>
                <div>
                  <label className="form-label">Desired Position <span>*</span></label>
                  <input className="form-input" name="desiredPosition" value={form.desiredPosition} onChange={handleChange} placeholder="e.g. Web Developer, Analyst" />
                </div>
              </div>

              {/* Row 3 */}
              <div style={{ marginBottom:'16px' }}>
                <label className="form-label">Job Requirements <span>*</span></label>
                <select className="form-select" name="requirements" value={form.requirements} onChange={handleChange}>
                  <option value="">-- Select --</option>
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Internship">Internship</option>
                  <option value="Temporary">Temporary</option>
                </select>
              </div>

              {/* Row 4 */}
              <div style={{ marginBottom:'16px' }}>
                <label className="form-label">Preferred Contact <span>*</span></label>
                <select className="form-select" name="preferredContact" value={form.preferredContact} onChange={handleChange}>
                  <option value="">-- Select --</option>
                  <option value="Email">Email</option>
                  <option value="Phone">Phone</option>
                  <option value="WhatsApp">WhatsApp</option>
                </select>
              </div>

              {/* Row 5 */}
              <div style={{ marginBottom:'24px' }}>
                <label className="form-label">Additional Details <span>*</span></label>
                <textarea className="form-textarea" name="details" value={form.details} onChange={handleChange} placeholder="Share your skills, experience, or availability..." />
              </div>

              <button className="submit-btn" onClick={handleSubmit}>Submit Application</button>
              <p style={{ textAlign:'center', fontSize:'12px', color:'#9ca3af', marginTop:'12px', fontFamily:SF }}>
                Clicking submit opens Gmail with your details pre-filled. Attach your CV before sending.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// ══════ NAVBAR ══════
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);
  return (
    <header style={{ backgroundColor:'#306F74', padding:'0 50px', position:'fixed', width:'100%', top:0, zIndex:1000, boxShadow:scrolled?'0 2px 20px rgba(0,0,0,0.3)':'0 2px 10px rgba(0,0,0,0.2)', transition:'box-shadow 0.3s', fontFamily:SF }}>
      <nav style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <img src={logo} alt="iSeeWaves" style={{ height:'90px', borderRadius:'8px' }} />
        <ul style={{ display:'flex', listStyle:'none', margin:0, padding:0 }}>
          {[['Products','/products'],['Services','/services'],['About Us','/about'],['Regulations','/regulations'],['Contact','/contact'],['Careers','/careers']].map(([label,href]) => (
            <li key={label} style={{ marginRight:'20px' }}>
              <a href={href} className="career-nav-link">{label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

// ══════ HERO ══════
const HeroSection = () => (
  <section style={{ marginTop:'90px', minHeight:'380px', position:'relative', overflow:'hidden', display:'flex', alignItems:'center', fontFamily:SF }}>
    <video autoPlay muted loop playsInline style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', zIndex:0 }}>
      <source src={videoBg} type="video/mp4" />
    </video>
    <div style={{ position:'absolute', inset:0, background:'rgba(5,15,20,0.72)', zIndex:1 }} />
    <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(116,195,186,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(116,195,186,0.03) 1px,transparent 1px)', backgroundSize:'60px 60px', zIndex:2, pointerEvents:'none' }} />
    <div style={{ position:'absolute', left:0, top:0, bottom:0, width:'4px', background:'linear-gradient(180deg,transparent,#74C3BA,#306F74,transparent)', zIndex:3 }} />
    <div style={{ position:'relative', zIndex:4, padding:'60px 90px' }}>
      <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'24px', animation:'fadeUp 0.5s ease both' }}>
        <span style={{ width:'24px', height:'1px', background:'#74C3BA', display:'inline-block' }} />
        <a href="/" style={{ color:'rgba(255,255,255,0.45)', textDecoration:'none', fontSize:'11px', letterSpacing:'2px', textTransform:'uppercase', fontWeight:'600' }}
          onMouseEnter={e=>e.target.style.color='#74C3BA'} onMouseLeave={e=>e.target.style.color='rgba(255,255,255,0.45)'}>Home</a>
        <span style={{ color:'rgba(255,255,255,0.25)', fontSize:'13px' }}>›</span>
        <span style={{ color:'#74C3BA', fontSize:'11px', letterSpacing:'2px', textTransform:'uppercase', fontWeight:'800' }}>Careers</span>
      </div>
      <h1 style={{ fontFamily:SF, fontWeight:'900', lineHeight:1.0, letterSpacing:'-2px', margin:0, animation:'fadeUp 0.7s ease 0.15s both' }}>
        <span style={{ fontSize:'clamp(3.8rem,8vw,7rem)', color:'#ffffff', display:'inline' }}>Careers </span>
        <span style={{ fontSize:'clamp(3.8rem,8vw,7rem)', color:'#74C3BA', position:'relative', display:'inline-block' }}>
          at iSeeWaves
          <span style={{ position:'absolute', bottom:'-4px', left:0, width:'100%', height:'3px', background:'linear-gradient(90deg,#74C3BA,transparent)', borderRadius:'2px', overflow:'hidden' }}>
            <span style={{ position:'absolute', top:0, left:0, width:'40%', height:'100%', background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.8),transparent)', animation:'shimmer 2.5s ease-in-out infinite' }} />
          </span>
        </span>
      </h1>
    </div>
  </section>
);

// ══════ JOB DATA ══════
const jobs = [
  { title:'Development Manager', type:'Full Time', location:'Abbottabad, Pakistan', experience:'5 Years', deadline:'Jun 8, 2026', salary:null, image:f1, desc:'We are seeking an experienced and results-driven Development Manager to lead and oversee software development projects from planning through execution. The ideal candidate will manage cross-functional teams, ensure timely project delivery.', tags:['Management','Development','Leadership'] },
  { title:'Technical Recruiter', type:'Freelance', location:'Remote, Pakistan', experience:'3 Years', deadline:'May 21, 2026', salary:null, image:f2, desc:"Connect with skilled cybersecurity professionals through our expert technical recruiters, ensuring the right talent for our organization's security needs, faster hiring processes, and reliable workforce solutions.", tags:['HR','Recruitment','Tech'] },
  { title:'Payroll Specialist', type:'Internship', location:'Abbottabad, Pakistan', experience:'1 Year', deadline:'Jun 8, 2026', salary:null, image:f3, desc:'Ensure accurate and secure payroll management with our cybersecurity-focused specialists, handling sensitive employee data, compliance, and transactions efficiently while protecting our organization from financial risks.', tags:['Finance','Compliance','HR'] },
  { title:'Recruitment Coordinator', type:'Temporary', location:'Remote, Pakistan', experience:'2 Years', deadline:'Jun 8, 2026', salary:'PKR 50,000', image:f4, desc:'Streamline the hiring process with recruitment coordinators, ensuring secure candidate data handling, efficient interview scheduling, seamless communication, and compliance with cybersecurity standards for a reliable talent workflow.', tags:['Coordination','HR','Admin'] },
];

const typeColors = {
  'Full Time':  { bg:'rgba(82,201,122,0.1)',  color:'#27ae60', border:'rgba(82,201,122,0.3)' },
  'Freelance':  { bg:'rgba(116,195,186,0.1)', color:'#306F74', border:'rgba(116,195,186,0.3)' },
  'Internship': { bg:'rgba(240,165,0,0.1)',   color:'#d4900a', border:'rgba(240,165,0,0.3)' },
  'Temporary':  { bg:'rgba(155,89,182,0.1)',  color:'#8e44ad', border:'rgba(155,89,182,0.3)' },
};

// ══════ JOB CARD ══════
const JobCard = ({ job, index, onApply }) => {
  const tc = typeColors[job.type] || typeColors['Full Time'];
  const [hovered, setHovered] = useState(false);
  return (
    <div className="job-card" style={{ animationDelay:`${index*0.12}s` }}
      onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'24px' }}>
        <h3 style={{ fontSize:'1.25rem', fontWeight:'900', color:'#0f2027', letterSpacing:'-0.3px', fontFamily:SF }}>{job.title}</h3>
        <span style={{ fontSize:'11px', fontWeight:'700', padding:'4px 12px', borderRadius:'20px', background:tc.bg, color:tc.color, border:`1px solid ${tc.border}`, flexShrink:0, marginLeft:'16px' }}>{job.type}</span>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'220px 1fr auto', gap:'28px', alignItems:'start' }}>
        <div style={{ borderRadius:'12px', overflow:'hidden', height:'200px', flexShrink:0 }}>
          <img src={job.image} alt={job.title} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.4s ease', transform:hovered?'scale(1.06)':'scale(1)' }} />
        </div>
        <div>
          <div style={{ display:'flex', alignItems:'center', gap:'6px', marginBottom:'8px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#306F74" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <span style={{ fontSize:'14px', fontWeight:'600', color:'#374151', fontFamily:SF }}>Location: <strong style={{ color:'#0f2027' }}>{job.location}</strong></span>
          </div>
          <p style={{ fontSize:'14px', color:'#6b7280', lineHeight:1.8, margin:'0 0 16px', fontFamily:SF }}>{job.desc}</p>
          <div style={{ height:'1px', background:'rgba(48,111,116,0.12)', margin:'0 0 16px' }} />
          <div style={{ display:'flex', gap:'8px', flexWrap:'wrap', marginBottom:'16px' }}>
            {job.tags.map(tag => <span key={tag} style={{ fontSize:'11px', fontWeight:'700', padding:'3px 10px', borderRadius:'20px', background:'rgba(48,111,116,0.08)', color:'#306F74', border:'1px solid rgba(48,111,116,0.15)' }}>{tag}</span>)}
          </div>
          <div style={{ display:'flex', gap:'28px', flexWrap:'wrap', alignItems:'center' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>
              <span style={{ fontSize:'14px', color:'#6b7280', fontFamily:SF }}>Experience:</span>
              <strong style={{ fontSize:'14px', color:'#0f2027', fontFamily:SF }}>{job.experience}</strong>
            </div>
            {job.salary && <div style={{ display:'flex', alignItems:'center', gap:'6px' }}><span style={{ fontSize:'14px', color:'#6b7280', fontFamily:SF }}>Salary:</span><strong style={{ fontSize:'14px', color:'#306F74', fontFamily:SF }}>{job.salary}</strong></div>}
            <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>
              <span style={{ fontSize:'14px', color:'#6b7280', fontFamily:SF }}>Deadline:</span>
              <strong style={{ fontSize:'14px', color:'#0f2027', fontFamily:SF }}>{job.deadline}</strong>
            </div>
          </div>
        </div>
        {/* Apply Now → opens modal */}
        <div className="apply-btn" onClick={() => onApply(job)} title={`Apply for ${job.title}`}>
          <span className="apply-text">Apply Now</span>
          <span className="apply-icon">✈</span>
        </div>
      </div>
    </div>
  );
};

// ══════ JOBS SECTION ══════
const JobsSection = ({ onApply }) => {
  const filters = ['All', 'Full Time', 'Freelance', 'Internship', 'Temporary'];
  const [active, setActive] = useState('All');
  const filtered = active==='All' ? jobs : jobs.filter(j=>j.type===active);
  return (
    <section style={{ padding:'80px 60px', background:'#fff', fontFamily:SF }}>
      <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:'55px' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', marginBottom:'14px' }}>
            <div style={{ width:'40px', height:'2px', background:'#306F74' }} />
            <span style={{ fontSize:'12px', fontWeight:'700', letterSpacing:'3px', textTransform:'uppercase', color:'#306F74' }}>Open Positions</span>
            <div style={{ width:'40px', height:'2px', background:'#306F74' }} />
          </div>
          <h2 style={{ fontSize:'clamp(2rem,4vw,3rem)', fontWeight:'900', color:'#0f2027', letterSpacing:'-1px', lineHeight:1.1, margin:'0 0 14px', fontFamily:SF }}>Find Your Job Here</h2>
          <p style={{ fontSize:'16px', color:'#6b7280', maxWidth:'520px', margin:'0 auto', lineHeight:1.8 }}>See how iSeeWaves helps shape Pakistan's cybersecurity landscape and achieve measurable security improvements.</p>
        </div>
        <div style={{ display:'flex', gap:'10px', justifyContent:'center', flexWrap:'wrap', marginBottom:'40px' }}>
          {filters.map(f => <button key={f} className={`filter-btn ${active===f?'active':''}`} onClick={()=>setActive(f)}>{f}</button>)}
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:'20px' }}>
          {filtered.map((job,i) => <JobCard key={job.title} job={job} index={i} onApply={onApply} />)}
        </div>
        {filtered.length === 0 && (
          <div style={{ textAlign:'center', padding:'60px', color:'#6b7280' }}>
            <div style={{ fontSize:'3rem', marginBottom:'12px' }}>🔍</div>
            <p style={{ fontSize:'16px', fontWeight:'600' }}>No positions found for this filter.</p>
          </div>
        )}
      </div>
    </section>
  );
};

// ══════ WHY JOIN US ══════
const WhyJoinSection = () => {
  const perks = [
    { icon:<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#306F74" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>, title:'Cybersecurity First', desc:'Work on real offensive tools and defensive systems that protect organizations across Pakistan.' },
    { icon:<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#306F74" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>, title:'Remote Friendly', desc:'Flexible work arrangements — work from anywhere in Pakistan with our distributed team.' },
    { icon:<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#306F74" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>, title:'Career Growth', desc:'Fast-track your career with mentorship, certifications, and hands-on project experience.' },
    { icon:<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#306F74" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, title:'Collaborative Culture', desc:'Join a tight-knit team that values innovation, transparency, and mutual respect.' },
    { icon:<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#306F74" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>, title:'Learning & Development', desc:'Regular training sessions, CTF competitions, and access to premium cybersecurity resources.' },
    { icon:<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#306F74" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>, title:'Innovative Projects', desc:'Contribute to cutting-edge security tools used by clients across the region.' },
  ];
  return (
    <section style={{ padding:'80px 60px', background:'linear-gradient(160deg,#f0f9f8 0%,#fafffe 50%,#e8f5f2 100%)', fontFamily:SF }}>
      <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:'55px' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'rgba(48,111,116,0.08)', border:'1px solid rgba(48,111,116,0.18)', borderRadius:'50px', padding:'7px 20px', marginBottom:'16px' }}>
            <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#306F74', display:'inline-block' }} />
            <span style={{ fontSize:'11px', fontWeight:'700', letterSpacing:'3px', textTransform:'uppercase', color:'#306F74' }}>Why iSeeWaves</span>
          </div>
          <h2 style={{ fontSize:'clamp(2rem,4vw,2.8rem)', fontWeight:'900', color:'#0f2027', letterSpacing:'-1px', margin:'0 0 14px' }}>Why Join <span style={{ color:'#306F74' }}>Our Team?</span></h2>
          <p style={{ fontSize:'16px', color:'#6b7280', maxWidth:'480px', margin:'0 auto', lineHeight:1.8 }}>We're building Pakistan's premier cybersecurity company — come build it with us.</p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'22px' }}>
          {perks.map((p,i) => (
            <div key={i} style={{ background:'white', borderRadius:'18px', padding:'28px 24px', border:'1px solid rgba(48,111,116,0.1)', transition:'all 0.35s ease', animation:`fadeUp 0.6s ease ${i*0.1}s both`, cursor:'default' }}
              onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-6px)'; e.currentTarget.style.boxShadow='0 18px 45px rgba(48,111,116,0.15)'; e.currentTarget.style.borderColor='rgba(48,111,116,0.3)'; }}
              onMouseLeave={e=>{ e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none'; e.currentTarget.style.borderColor='rgba(48,111,116,0.1)'; }}>
              <div style={{ width:'62px', height:'62px', borderRadius:'16px', background:'rgba(48,111,116,0.08)', border:'1.5px solid rgba(48,111,116,0.12)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'16px' }}>{p.icon}</div>
              <h3 style={{ fontSize:'1rem', fontWeight:'800', color:'#0f2027', margin:'0 0 10px', fontFamily:SF }}>{p.title}</h3>
              <p style={{ fontSize:'13.5px', color:'#6b7280', lineHeight:1.75, margin:0 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ══════ CTA SECTION — UPDATED: Direct Gmail open on button click ══════
const CTASection = () => {
  const handleSendCV = () => {
    const to      = encodeURIComponent('iseewaves.pk@gmail.com');
    const subject = encodeURIComponent('Job Application – iSeeWaves');
    const body    = encodeURIComponent(
`Dear iSeeWaves HR Team,

I would like to express my interest in joining iSeeWaves.

Please find my CV attached to this email.

Best regards,`
    );
    window.open(
      `https://mail.google.com/mail/?view=cm&to=${to}&su=${subject}&body=${body}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <section style={{ padding:'70px 60px', background:'linear-gradient(135deg,#1e4f54 0%,#2a6b70 50%,#1e4f54 100%)', position:'relative', overflow:'hidden', fontFamily:SF }}>
      <div style={{ position:'absolute', top:'-80px', right:'-80px', width:'350px', height:'350px', borderRadius:'50%', background:'radial-gradient(circle,rgba(116,195,186,0.15) 0%,transparent 70%)', pointerEvents:'none' }} />
      <div style={{ position:'absolute', bottom:'-60px', left:'-60px', width:'280px', height:'280px', borderRadius:'50%', background:'radial-gradient(circle,rgba(116,195,186,0.1) 0%,transparent 70%)', pointerEvents:'none' }} />
      <div style={{ maxWidth:'1100px', margin:'0 auto', display:'flex', justifyContent:'space-between', alignItems:'center', gap:'40px', flexWrap:'wrap', position:'relative', zIndex:1 }}>
        <div>
          <h2 style={{ fontSize:'clamp(1.8rem,3.5vw,2.5rem)', fontWeight:'900', color:'white', margin:'0 0 12px', lineHeight:1.1, fontFamily:SF }}>Don't see your role? <span style={{ color:'#74C3BA' }}>Reach out!</span></h2>
          <p style={{ fontSize:'16px', color:'rgba(255,255,255,0.55)', margin:0, lineHeight:1.7 }}>We're always looking for talented people. Send us your CV and we'll keep you in mind.</p>
        </div>
        <button className="cta-send-btn" onClick={handleSendCV}>
          Send Your CV
          <span style={{ width:'30px', height:'30px', background:'rgba(255,255,255,0.22)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'16px' }}>✈</span>
        </button>
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
          <span style={{ color:'#b8d4d6', fontSize:'14px', fontFamily:SF }}>© 2025 iSeeWaves. All rights reserved.</span>
          <div style={{ display:'flex', gap:'30px' }}>
            {[{label:'Privacy Policy',href:'/privacy'},{label:'Terms of Policy',href:'/tos'},{label:'Security',href:'#security'}].map(link=>(
              <a key={link.label} href={link.href} style={{ color:'#b8d4d6',textDecoration:'none',fontSize:'14px',transition:'color 0.3s',fontFamily:SF }}
                onMouseEnter={e=>e.target.style.color='#f3f7ec'} onMouseLeave={e=>e.target.style.color='#b8d4d6'}>{link.label}</a>
            ))}
          </div>
        </div>
      </div>
    </div>
  </footer>
);

// ══════ SCROLL TO TOP ══════
const ScrollTop = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const h = () => setShow(window.scrollY > 400);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);
  if (!show) return null;
  return <button className="scroll-top" onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}>↑</button>;
};

// ══════ PAGE ══════
const CareersPage = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [modalOpen, setModalOpen]     = useState(false);

  const handleApply = (job) => { setSelectedJob(job); setModalOpen(true); };
  const handleClose = () => { setModalOpen(false); setSelectedJob(null); };

  return (
    <>
      <GlobalStyles />
      <Navbar />
      <HeroSection />
      <JobsSection onApply={handleApply} />
      <WhyJoinSection />
      <CTASection />
      <Footer />
      <ScrollTop />
      {modalOpen && <ApplicationModal job={selectedJob} onClose={handleClose} />}
    </>
  );
};

export default CareersPage;