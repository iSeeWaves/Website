import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// ── Images ──
import videoBg       from '../assets/images/video_bg.mp4';
import img1          from '../assets/images/cs1.jpeg';
import img2          from '../assets/images/s1.jpg';
import logo          from '../assets/images/icons/logo.png';
import gmailIcon     from '../assets/images/icons/gmail.png';
import locationIcon  from '../assets/images/icons/placeholder.png';
import instagramIcon from '../assets/images/icons/instagram.png';
import facebookIcon  from '../assets/images/icons/facebook.png';
import twitterIcon   from '../assets/images/icons/twitter.png';
import linkedinIcon  from '../assets/images/icons/linkedin.png';

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
    * { box-sizing: border-box; }

    @keyframes floatDot {
      0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.35; }
      33%       { transform: translateY(-14px) translateX(6px); opacity: 0.7; }
      66%       { transform: translateY(8px) translateX(-5px); opacity: 0.4; }
    }
    @keyframes scanLine {
      0%   { top: 5%; opacity: 0; } 8% { opacity: 1; }
      92%  { opacity: 1; } 100% { top: 95%; opacity: 0; }
    }
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes badgePulse {
      0%, 100% { box-shadow: 0 0 0 0 rgba(126,216,221,0.4); }
      50%       { box-shadow: 0 0 0 8px rgba(126,216,221,0); }
    }
    @keyframes modalIn {
      from { opacity: 0; transform: translateY(40px) scale(0.97); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }
    @keyframes overlayIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    @keyframes scanPulse {
      0%   { transform: translateY(-100%); opacity: 0.6; }
      100% { transform: translateY(400px); opacity: 0; }
    }
    @keyframes ping {
      0%   { transform: scale(1); opacity: 1; }
      75%, 100% { transform: scale(2); opacity: 0; }
    }
    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    @keyframes blink   { 0%,100%{opacity:1;} 50%{opacity:0;} }
    @keyframes shimmer { 0%{transform:translateX(-100%)} 100%{transform:translateX(300%)} }
    @keyframes ping    { 0%{transform:scale(1);opacity:1} 75%,100%{transform:scale(2);opacity:0} }

    .isw-hero-title { animation: fadeUp 0.7s ease 0.15s both; }
    .isw-hero-bread { animation: fadeUp 0.7s ease 0.05s both; }

    .isw-card { transition: all 0.4s cubic-bezier(0.23,1,0.32,1); }
    .isw-card:hover {
      transform: translateY(-10px) scale(1.015) !important;
      background: linear-gradient(145deg, #235f63 0%, #307075 60%, #3a9098 100%) !important;
      box-shadow: 0 28px 65px rgba(48,112,116,0.35) !important;
      border-color: rgba(243,247,236,0.18) !important;
    }
    .isw-card:hover .isw-num        { color: rgba(243,247,236,0.25) !important; }
    .isw-card:hover .isw-icon-box   { background: rgba(243,247,236,0.15) !important; border-color: rgba(243,247,236,0.2) !important; }
    .isw-card:hover .isw-icon-box svg { stroke: #f3f7ec !important; }
    .isw-card:hover .isw-subtitle   { color: rgba(243,247,236,0.6) !important; }
    .isw-card:hover .isw-card-title { color: #f3f7ec !important; }
    .isw-card:hover .isw-desc       { color: rgba(243,247,236,0.72) !important; }
    .isw-card:hover .isw-divider    { background: rgba(243,247,236,0.15) !important; }
    .isw-card:hover .isw-feat-text  { color: rgba(243,247,236,0.85) !important; }
    .isw-card:hover .isw-feat-dot   { background: rgba(243,247,236,0.18) !important; }
    .isw-card:hover .isw-feat-dot svg path { stroke: #f3f7ec !important; }
    .isw-card:hover .isw-arrow      { background: rgba(243,247,236,0.2) !important; transform: translateX(5px) !important; }
    .isw-card:hover .isw-arrow svg path { stroke: #f3f7ec !important; }
    .isw-card:hover .isw-bottom-line { width: 100% !important; }

    .isw-dot { animation: badgePulse 2.4s ease-in-out infinite; }

    .recon-modal-overlay {
      position: fixed; inset: 0; z-index: 9999;
      background: rgba(5,18,22,0.85);
      backdrop-filter: blur(8px);
      display: flex; align-items: center; justify-content: center;
      animation: overlayIn 0.3s ease both;
      padding: 20px;
    }
    .recon-modal {
      width: 100%; max-width: 880px; max-height: 90vh;
      overflow-y: auto;
      background: #0a1a1f;
      border: 1px solid rgba(116,195,186,0.2);
      border-radius: 24px;
      animation: modalIn 0.4s cubic-bezier(0.23,1,0.32,1) both;
      position: relative;
      scrollbar-width: thin;
      scrollbar-color: rgba(116,195,186,0.3) transparent;
    }
    .recon-modal::-webkit-scrollbar { width: 5px; }
    .recon-modal::-webkit-scrollbar-thumb { background: rgba(116,195,186,0.3); border-radius: 3px; }

    .recon-input {
      width: 100%; padding: 13px 18px;
      background: rgba(116,195,186,0.06);
      border: 1.5px solid rgba(116,195,186,0.2);
      border-radius: 10px; color: #e8f5f3;
      font-size: 14px; font-family: 'Plus Jakarta Sans', sans-serif;
      outline: none; transition: all 0.3s ease;
    }
    .recon-input:focus { border-color: #74C3BA; background: rgba(116,195,186,0.1); box-shadow: 0 0 0 3px rgba(116,195,186,0.12); }
    .recon-input::placeholder { color: rgba(116,195,186,0.35); }

    .recon-btn {
      padding: 13px 28px; border-radius: 10px; border: none; cursor: pointer;
      font-weight: 700; font-size: 14px; font-family: 'Plus Jakarta Sans', sans-serif;
      transition: all 0.3s ease; display: inline-flex; align-items: center; gap: 8px;
    }
    .recon-btn-primary {
      background: linear-gradient(135deg, #306F74, #74C3BA);
      color: white; box-shadow: 0 6px 22px rgba(48,111,116,0.35);
    }
    .recon-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(48,111,116,0.5); }
    .recon-btn-primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
    .recon-btn-secondary {
      background: rgba(116,195,186,0.08); color: #74C3BA;
      border: 1.5px solid rgba(116,195,186,0.25);
    }
    .recon-btn-secondary:hover { background: rgba(116,195,186,0.15); border-color: #74C3BA; }

    .recon-tab {
      padding: 8px 18px; border-radius: 8px; border: 1.5px solid rgba(116,195,186,0.15);
      background: transparent; color: rgba(116,195,186,0.5);
      font-size: 12px; font-weight: 700; cursor: pointer; letter-spacing: 0.5px;
      transition: all 0.25s ease; font-family: 'Plus Jakarta Sans', sans-serif;
    }
    .recon-tab.active { background: rgba(116,195,186,0.12); color: #74C3BA; border-color: rgba(116,195,186,0.4); }
    .recon-tab:hover { color: #74C3BA; border-color: rgba(116,195,186,0.3); }

    .recon-result-row {
      display: flex; gap: 10px; padding: 10px 14px;
      border-radius: 8px; align-items: flex-start;
      background: rgba(116,195,186,0.04);
      border: 1px solid rgba(116,195,186,0.08);
      transition: all 0.2s ease;
    }
    .recon-result-row:hover { background: rgba(116,195,186,0.08); border-color: rgba(116,195,186,0.18); }

    .terminal-line {
      font-family: 'Courier New', monospace;
      font-size: 12px; line-height: 1.8;
      color: #74C3BA; padding: 2px 0;
      animation: fadeUp 0.3s ease both;
    }
    .terminal-line.dim  { color: rgba(116,195,186,0.4); }
    .terminal-line.white{ color: #e8f5f3; }
    .terminal-line.warn { color: #f0a500; }

    .hamburger-btn { display: none !important; }
    @media (max-width: 860px) {
      .hamburger-btn { display: block !important; }
      .nav-links { display: none !important; }
      .nav-links.open { display: flex !important; flex-direction: column; position: absolute; top: 90px; left: 0; right: 0; background: #306F74; padding: 20px; }
      .isw-grid { grid-template-columns: 1fr !important; }
      .isw-whatwedo-grid { grid-template-columns: 1fr !important; }
    }
  `}</style>
);

// ══════════════ NAVBAR ══════════════
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);
  return (
    <header style={{ backgroundColor:'#306F74', padding:'0px 50px', position:'fixed', width:'100%', top:0, zIndex:1000, boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.3)' : '0 2px 10px rgba(0,0,0,0.2)', transition:'box-shadow 0.3s ease', fontFamily:"'Plus Jakarta Sans', sans-serif" }}>
      <nav style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <img src={logo} alt="iSeeWaves" style={{ height:'90px', borderRadius:'8px' }} />
        <button onClick={()=>setMenuOpen(!menuOpen)} className="hamburger-btn" style={{ background:'none', border:'none', color:'#F4F7EC', fontSize:'24px', cursor:'pointer' }}>{menuOpen ? '✕' : '☰'}</button>
        <ul className={`nav-links ${menuOpen?'open':''}`} style={{ display:'flex', listStyle:'none', margin:0, padding:0, gap:0 }}>
          {[['Products','/products'],['Services','/services'],['About Us','/about'],['Regulations','/regulations'],['Contact','/contact'],['Careers','/careers']].map(([label,href]) => (
            <li key={label} style={{ marginRight:'20px' }}>
              <a href={href} style={{ textDecoration:'none', color:'#F4F7EC', fontSize:'16px', fontWeight:'bold', transition:'color 0.3s', paddingBottom:'3px' }}
                onMouseEnter={e=>{ e.target.style.color='#fff'; e.target.style.borderBottom='2px solid #fff'; }}
                onMouseLeave={e=>{ e.target.style.color='#F4F7EC'; e.target.style.borderBottom='none'; }}>{label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

// ══════════════ RECON MODAL ══════════════
const ReconModal = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('whois');
  const [inputs, setInputs] = useState({ whois:'', dns:'', subdomain:'', port:'' });
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState({});
  const [logs, setLogs] = useState([]);
  const logsEndRef = useRef(null);

  useEffect(() => { logsEndRef.current?.scrollIntoView({ behavior:'smooth' }); }, [logs]);
  const addLog = (msg, type='normal') => setLogs(p => [...p, { msg, type, id: Date.now()+Math.random() }]);

  const mockData = {
    whois: (d) => ({ 'Domain':d,'Registrar':'GoDaddy LLC','Created':'2020-03-15','Expires':'2026-03-15','Status':'Active','Name Servers':'ns1.cloudflare.com, ns2.cloudflare.com','Registrant':'iSeeWaves Pvt Ltd','Country':'PK','Email':'admin@'+d }),
    dns:   (d) => [{ type:'A',value:'192.168.1.1',ttl:'3600' },{ type:'MX',value:'mail.'+d,ttl:'3600' },{ type:'NS',value:'ns1.cloudflare.com',ttl:'86400' },{ type:'TXT',value:'v=spf1 include:'+d+' ~all',ttl:'3600' },{ type:'CNAME',value:'www.'+d,ttl:'3600' }],
    subdomains: (d) => ['www','mail','ftp','api','admin','dev','staging','blog','app','cdn','vpn'].map(s=>({ sub:s+'.'+d, ip:'192.168.'+Math.floor(Math.random()*255)+'.'+Math.floor(Math.random()*255), status:Math.random()>0.3?'Active':'Inactive' })),
    ports: () => [{ port:22,service:'SSH',state:'Open',risk:'Medium' },{ port:80,service:'HTTP',state:'Open',risk:'Low' },{ port:443,service:'HTTPS',state:'Open',risk:'Low' },{ port:3306,service:'MySQL',state:'Closed',risk:'High' },{ port:8080,service:'HTTP-Alt',state:'Open',risk:'Medium' },{ port:21,service:'FTP',state:'Closed',risk:'High' }],
  };

  const runScan = async () => {
    const val = inputs[activeTab];
    if (!val.trim()) return;
    setLoading(true); setLogs([]); setResults(p=>({...p,[activeTab]:null}));
    const steps = {
      whois:     ['Initializing WHOIS query...','Connecting to IANA database...','Querying regional registrar...','Parsing registration data...','Scan complete ✓'],
      dns:       ['Starting DNS enumeration...','Querying A records...','Checking MX and NS records...','Fetching TXT and CNAME...','DNS scan complete ✓'],
      subdomain: ['Loading subdomain wordlist...','Running passive enumeration...','Checking DNS resolution...','Verifying active hosts...','Subdomain scan complete ✓'],
      port:      ['Initiating port scan...','Probing common ports...','Fingerprinting services...','Analyzing open ports...','Port scan complete ✓'],
    };
    for (let i=0; i<steps[activeTab].length; i++) {
      await new Promise(r=>setTimeout(r,600));
      addLog(steps[activeTab][i], i===steps[activeTab].length-1?'warn':'normal');
    }
    const r = activeTab==='whois' ? mockData.whois(val) : activeTab==='dns' ? mockData.dns(val) : activeTab==='subdomain' ? mockData.subdomains(val) : mockData.ports();
    setResults(p=>({...p,[activeTab]:r}));
    setLoading(false);
  };

  const tabs = [
    { id:'whois',     label:'WHOIS',      placeholder:'Enter domain (e.g. example.com)' },
    { id:'dns',       label:'DNS',        placeholder:'Enter domain (e.g. example.com)' },
    { id:'subdomain', label:'Subdomains', placeholder:'Enter domain (e.g. example.com)' },
    { id:'port',      label:'Port Scan',  placeholder:'Enter IP or domain' },
  ];
  const riskColor = { Low:'#52c97a', Medium:'#f0a500', High:'#ff6b7a' };

  return (
    <div className="recon-modal-overlay" onClick={e=>{ if(e.target===e.currentTarget) onClose(); }}>
      <div className="recon-modal">
        <div style={{ padding:'28px 32px 22px', borderBottom:'1px solid rgba(116,195,186,0.12)', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg, rgba(48,111,116,0.15) 0%, transparent 60%)', pointerEvents:'none' }}/>
          <div style={{ position:'absolute', top:0, left:0, right:0, height:'2px', background:'linear-gradient(90deg, transparent, #74C3BA, transparent)' }}/>
          <div style={{ position:'absolute', left:0, right:0, height:'1px', background:'linear-gradient(90deg, transparent, rgba(116,195,186,0.5), transparent)', animation:'scanPulse 3s ease-in-out infinite', pointerEvents:'none' }}/>
          <div style={{ position:'relative', zIndex:1, display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
            <div>
              <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'8px' }}>
                <div style={{ position:'relative' }}>
                  <div style={{ width:'10px', height:'10px', borderRadius:'50%', background:'#74C3BA' }}/>
                  <div style={{ position:'absolute', inset:0, borderRadius:'50%', background:'#74C3BA', animation:'ping 1.5s ease-in-out infinite' }}/>
                </div>
                <span style={{ fontSize:'11px', fontWeight:'700', letterSpacing:'3px', textTransform:'uppercase', color:'#74C3BA' }}>ACTIVE — Recon Module v2.4</span>
              </div>
              <h2 style={{ margin:0, fontSize:'1.7rem', fontWeight:'800', color:'#e8f5f3', letterSpacing:'-0.5px', fontFamily:"'Plus Jakarta Sans', sans-serif" }}>Reconnaissance <span style={{ color:'#74C3BA' }}>Tool</span></h2>
              <p style={{ margin:'6px 0 0', fontSize:'13px', color:'rgba(116,195,186,0.55)', fontFamily:"'Plus Jakarta Sans', sans-serif" }}>Passive & active intelligence gathering — WHOIS · DNS · Subdomains · Ports</p>
            </div>
            <button onClick={onClose} style={{ width:'36px', height:'36px', borderRadius:'50%', border:'1.5px solid rgba(116,195,186,0.25)', background:'rgba(116,195,186,0.08)', color:'#74C3BA', fontSize:'18px', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.2s ease', fontFamily:'monospace' }}
              onMouseEnter={e=>{ e.currentTarget.style.background='rgba(116,195,186,0.18)'; e.currentTarget.style.borderColor='#74C3BA'; }}
              onMouseLeave={e=>{ e.currentTarget.style.background='rgba(116,195,186,0.08)'; e.currentTarget.style.borderColor='rgba(116,195,186,0.25)'; }}>✕</button>
          </div>
        </div>

        <div style={{ padding:'18px 32px 0', display:'flex', gap:'8px', flexWrap:'wrap' }}>
          {tabs.map(t=>(
            <button key={t.id} className={`recon-tab ${activeTab===t.id?'active':''}`} onClick={()=>{ setActiveTab(t.id); setLogs([]); }}>{t.label}</button>
          ))}
        </div>

        <div style={{ padding:'16px 32px 20px', display:'flex', gap:'10px', alignItems:'center' }}>
          <div style={{ flex:1, position:'relative' }}>
            <input className="recon-input" value={inputs[activeTab]} onChange={e=>setInputs(p=>({...p,[activeTab]:e.target.value}))} onKeyDown={e=>e.key==='Enter'&&!loading&&runScan()} placeholder={tabs.find(t=>t.id===activeTab)?.placeholder}/>
            {loading && <div style={{ position:'absolute', right:'14px', top:'50%', transform:'translateY(-50%)', width:'16px', height:'16px', border:'2px solid rgba(116,195,186,0.2)', borderTopColor:'#74C3BA', borderRadius:'50%', animation:'spin 0.7s linear infinite' }}/>}
          </div>
          <button className="recon-btn recon-btn-primary" onClick={runScan} disabled={loading||!inputs[activeTab].trim()}>
            {loading?'Scanning...':<><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>Scan</>}
          </button>
          {results[activeTab] && <button className="recon-btn recon-btn-secondary" onClick={()=>setResults(p=>({...p,[activeTab]:null}))}>Clear</button>}
        </div>

        {logs.length>0 && (
          <div style={{ margin:'0 32px 16px', background:'rgba(0,0,0,0.3)', borderRadius:'12px', padding:'14px 18px', border:'1px solid rgba(116,195,186,0.1)' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'6px', marginBottom:'10px' }}>
              {['#ff5f56','#ffbd2e','#27c93f'].map(c=><div key={c} style={{ width:'10px', height:'10px', borderRadius:'50%', background:c }}/>)}
              <span style={{ fontSize:'11px', color:'rgba(116,195,186,0.35)', marginLeft:'6px', fontFamily:'Courier New' }}>terminal — recon@iseewaves</span>
            </div>
            {logs.map((log,i)=>(
              <div key={log.id} className={`terminal-line ${log.type==='warn'?'warn':''}`} style={{ animationDelay:`${i*0.05}s` }}>
                <span style={{ color:'rgba(116,195,186,0.4)', marginRight:'8px' }}>{'>'}</span>{log.msg}
                {i===logs.length-1&&loading&&<span style={{ animation:'blink 1s infinite' }}>_</span>}
              </div>
            ))}
            <div ref={logsEndRef}/>
          </div>
        )}

        {results[activeTab] && (
          <div style={{ margin:'0 32px 28px' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'14px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#74C3BA" strokeWidth="2" strokeLinecap="round"><polyline points="9 12 11 14 15 10"/><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <span style={{ fontSize:'11px', fontWeight:'700', letterSpacing:'2px', textTransform:'uppercase', color:'#74C3BA' }}>Scan Results — {inputs[activeTab]}</span>
            </div>

            {activeTab==='whois' && (
              <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
                {Object.entries(results[activeTab]).map(([k,v])=>(
                  <div key={k} className="recon-result-row">
                    <span style={{ fontSize:'12px', fontWeight:'700', color:'rgba(116,195,186,0.6)', minWidth:'120px', fontFamily:'Courier New' }}>{k}</span>
                    <span style={{ fontSize:'13px', color:'#e8f5f3', wordBreak:'break-all' }}>{v}</span>
                  </div>
                ))}
              </div>
            )}
            {activeTab==='dns' && (
              <div style={{ overflowX:'auto' }}>
                <table style={{ width:'100%', borderCollapse:'collapse' }}>
                  <thead><tr>{['Type','Value','TTL'].map(h=><th key={h} style={{ padding:'10px 14px', textAlign:'left', fontSize:'11px', fontWeight:'700', letterSpacing:'2px', textTransform:'uppercase', color:'rgba(116,195,186,0.5)', borderBottom:'1px solid rgba(116,195,186,0.12)' }}>{h}</th>)}</tr></thead>
                  <tbody>
                    {results[activeTab].map((r,i)=>(
                      <tr key={i} onMouseEnter={e=>e.currentTarget.style.background='rgba(116,195,186,0.05)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                        <td style={{ padding:'10px 14px', borderBottom:'1px solid rgba(116,195,186,0.07)' }}><span style={{ padding:'2px 8px', borderRadius:'4px', background:'rgba(116,195,186,0.12)', color:'#74C3BA', fontSize:'11px', fontWeight:'700', fontFamily:'Courier New' }}>{r.type}</span></td>
                        <td style={{ padding:'10px 14px', fontSize:'13px', color:'#e8f5f3', borderBottom:'1px solid rgba(116,195,186,0.07)', fontFamily:'Courier New' }}>{r.value}</td>
                        <td style={{ padding:'10px 14px', fontSize:'12px', color:'rgba(116,195,186,0.45)', borderBottom:'1px solid rgba(116,195,186,0.07)' }}>{r.ttl}s</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {activeTab==='subdomain' && (
              <div style={{ display:'flex', flexDirection:'column', gap:'8px', maxHeight:'280px', overflowY:'auto' }}>
                {results[activeTab].map((r,i)=>(
                  <div key={i} className="recon-result-row" style={{ justifyContent:'space-between' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                      <div style={{ width:'8px', height:'8px', borderRadius:'50%', background:r.status==='Active'?'#52c97a':'#ff6b7a', flexShrink:0 }}/>
                      <span style={{ fontSize:'13px', color:'#e8f5f3', fontFamily:'Courier New' }}>{r.sub}</span>
                    </div>
                    <div style={{ display:'flex', alignItems:'center', gap:'16px' }}>
                      <span style={{ fontSize:'12px', color:'rgba(116,195,186,0.45)', fontFamily:'Courier New' }}>{r.ip}</span>
                      <span style={{ fontSize:'11px', fontWeight:'700', color:r.status==='Active'?'#52c97a':'#ff6b7a' }}>{r.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {activeTab==='port' && (
              <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
                {results[activeTab].map((r,i)=>(
                  <div key={i} className="recon-result-row" style={{ justifyContent:'space-between' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
                      <span style={{ fontSize:'13px', fontWeight:'700', color:'#74C3BA', fontFamily:'Courier New', minWidth:'50px' }}>{r.port}</span>
                      <span style={{ fontSize:'13px', color:'#e8f5f3' }}>{r.service}</span>
                    </div>
                    <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
                      <span style={{ fontSize:'11px', fontWeight:'700', color:r.state==='Open'?'#52c97a':'rgba(116,195,186,0.35)', padding:'2px 8px', borderRadius:'4px', background:r.state==='Open'?'rgba(82,201,122,0.1)':'rgba(116,195,186,0.06)' }}>{r.state}</span>
                      <span style={{ fontSize:'11px', fontWeight:'700', color:riskColor[r.risk], minWidth:'45px', textAlign:'right' }}>{r.risk}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div style={{ marginTop:'16px', display:'flex', justifyContent:'flex-end', gap:'8px' }}>
              <button className="recon-btn recon-btn-secondary" style={{ fontSize:'12px', padding:'8px 16px' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#74C3BA" strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Export HTML
              </button>
              <button className="recon-btn recon-btn-secondary" style={{ fontSize:'12px', padding:'8px 16px' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#74C3BA" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                Export TXT
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ══════════════ SERVICES DATA ══════════════
const services = [
  {
    num:'01', title:'Reconnaissance', subtitle:'Intelligence & Recon',
    description:'Passive and active intelligence gathering — WHOIS lookups, DNS enumeration, subdomain discovery, port scanning, banner grabbing, and automated HTML/TXT report generation.',
    features:['WHOIS & DNS Lookup','Subdomain Enumeration','Port Scanning & Reporting'],
    href: '/services/reconnaissance',
    icon:<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#306F74" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>,
  },
  {
    num:'02', title:'File & IP Scanner', subtitle:'Threat Detection Engine',
    description:'Deep file hash analysis, VirusTotal-style malicious file scanning, IP geolocation intelligence, and MAC address vendor/device-type detection for complete threat visibility.',
    features:['File Hash & Malware Analysis','IP Geolocation Scan','MAC Vendor Detection'],
    href: '/services/file-scanner',   // ← File Scanner link
    icon:<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#306F74" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>,
  },
  {
    num:'03', title:'IP Tracker', subtitle:'Geolocation Intelligence',
    href: '/services/ip-tracker',
    description:'Real-time geolocation tracking of IP addresses and servers with interactive map visualization, ISP details, ASN info, and complete network metadata.',
    features:['IP Geolocation Map','Server Location Lookup','ISP & ASN Info'],
    icon:<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#306F74" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="10" r="3"/><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 14 8 14s8-8.75 8-14a8 8 0 0 0-8-8z"/></svg>,
  },
  {
    num:'04', title:'Password Tools', subtitle:'Credential Security Suite',
    href: '/services/password-tool',
    description:'Real-time password strength analyzer with entropy scoring, plus a fully configurable secure password generator with custom length, symbols, and character-set controls.',
    features:['Strength Checker','Configurable Generator','Entropy Scoring'],
    icon:<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#306F74" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><circle cx="12" cy="16" r="1" fill="#306F74"/></svg>,
  },
];

// ══════════════ HOOKS ══════════════
const useInView = (threshold=0.1) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e])=>{ if(e.isIntersecting){ setVisible(true); obs.disconnect(); } },{ threshold });
    if(ref.current) obs.observe(ref.current);
    return ()=>obs.disconnect();
  }, [threshold]);
  return [ref, visible];
};

const FloatingDots = () => {
  const dots = [{x:'8%',y:'25%',d:'0s',s:3},{x:'22%',y:'70%',d:'1.1s',s:2},{x:'45%',y:'20%',d:'0.5s',s:3},{x:'65%',y:'60%',d:'1.6s',s:2},{x:'78%',y:'35%',d:'0.9s',s:2},{x:'88%',y:'75%',d:'0.3s',s:3},{x:'33%',y:'50%',d:'2.0s',s:2}];
  return <>{dots.map((d,i)=><div key={i} style={{ position:'absolute', left:d.x, top:d.y, width:`${d.s}px`, height:`${d.s}px`, borderRadius:'50%', background:'rgba(243,247,236,0.55)', animation:`floatDot ${3.2+i*0.35}s ease-in-out ${d.d} infinite`, pointerEvents:'none' }}/>)}</>;
};

// ══════════════ SERVICE CARD ══════════════
const ServiceCard = ({ service, index }) => {
  const [ref, visible] = useInView();
  const navigate = useNavigate();

  const handleClick = () => {
    if (service.href) navigate(service.href);
  };

  return (
    <div ref={ref} className="isw-card"
      onClick={handleClick}
      style={{ background:'#ffffff', borderRadius:'22px', padding:'26px 24px 22px', display:'flex', flexDirection:'column', gap:'11px', border:'1.5px solid rgba(48,112,116,0.1)', position:'relative', overflow:'hidden', cursor:'pointer', opacity:visible?1:0, transform:visible?'translateY(0)':'translateY(28px)', transition:`opacity 0.6s ease ${index*90}ms, transform 0.6s ease ${index*90}ms`, fontFamily:"'Plus Jakarta Sans', sans-serif", boxShadow:'0 2px 18px rgba(0,0,0,0.05)' }}>
      <div className="isw-num" style={{ position:'absolute', top:'24px', right:'26px', fontSize:'11px', fontWeight:'800', letterSpacing:'1px', color:'rgba(48,112,116,0.18)', transition:'color 0.4s ease' }}>{service.num}</div>
      <div className="isw-icon-box" style={{ width:'52px', height:'52px', background:'rgba(48,112,116,0.07)', borderRadius:'14px', display:'flex', alignItems:'center', justifyContent:'center', border:'1.5px solid rgba(48,112,116,0.1)', flexShrink:0, transition:'background 0.4s ease, border-color 0.4s ease' }}>{service.icon}</div>
      <p className="isw-subtitle" style={{ fontSize:'10.5px', fontWeight:'700', letterSpacing:'3px', textTransform:'uppercase', color:'#306F74', margin:0, transition:'color 0.4s ease' }}>{service.subtitle}</p>
      <h3 className="isw-card-title" style={{ fontSize:'1.08rem', fontWeight:'800', color:'#0f1f24', margin:0, letterSpacing:'-0.4px', lineHeight:'1.2', transition:'color 0.4s ease' }}>{service.title}</h3>
      <p className="isw-desc" style={{ fontSize:'13px', color:'#6b7280', lineHeight:1.7, margin:0, flexGrow:1, fontWeight:'400', transition:'color 0.4s ease' }}>{service.description}</p>
      <div className="isw-divider" style={{ height:'1px', background:'rgba(48,112,116,0.09)', transition:'background 0.4s ease' }}/>
      <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:'8px' }}>
        {service.features.map(f=>(
          <li key={f} style={{ display:'flex', alignItems:'center', gap:'8px' }}>
            <span className="isw-feat-dot" style={{ width:'17px', height:'17px', borderRadius:'50%', background:'rgba(48,112,116,0.1)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, transition:'background 0.4s ease' }}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5L4 7L8 3" stroke="#306F74" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
            <span className="isw-feat-text" style={{ fontSize:'13px', color:'#4b5563', fontWeight:'500', transition:'color 0.4s ease' }}>{f}</span>
          </li>
        ))}
      </ul>
      <div style={{ display:'flex', justifyContent:'flex-end', marginTop:'4px' }}>
        <div className="isw-arrow" style={{ width:'30px', height:'30px', borderRadius:'50%', background:'rgba(48,112,116,0.08)', display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.35s ease' }}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M9 4.5L13 8L9 11.5" stroke="#306F74" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      </div>
      <div className="isw-bottom-line" style={{ position:'absolute', bottom:0, left:0, height:'3px', width:'0%', background:'linear-gradient(90deg, #f3f7ec, rgba(243,247,236,0.4))', transition:'width 0.45s ease', borderRadius:'0 0 22px 22px' }}/>
    </div>
  );
};

// ══════════════ FOOTER HELPERS ══════════════
const SectionHeading = ({ title }) => (
  <div style={{ marginBottom:'20px', position:'relative', paddingBottom:'10px' }}>
    <h3 style={{ color:'#f3f7ec', fontSize:'18px', fontWeight:'600', margin:0 }}>{title}</h3>
    <div style={{ position:'absolute', bottom:0, left:0, width:'30px', height:'2px', background:'#f3f7ec', borderRadius:'2px' }}/>
  </div>
);
const FooterSection = ({ title, links }) => (
  <div>
    <SectionHeading title={title}/>
    <ul style={{ listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:'12px' }}>
      {links.map(link=>(
        <li key={link.label}>
          <a href={link.href} style={{ color:'#b8d4d6', textDecoration:'none', fontSize:'15px', display:'inline-block', transition:'all 0.3s ease' }}
            onMouseEnter={e=>{ e.target.style.color='#f3f7ec'; e.target.style.transform='translateX(8px)'; }}
            onMouseLeave={e=>{ e.target.style.color='#b8d4d6'; e.target.style.transform='translateX(0)'; }}>{link.label}</a>
        </li>
      ))}
    </ul>
  </div>
);

// ══════════════ MAIN PAGE ══════════════
const ServicesPage = () => {
  const [cardsRef, cardsVisible] = useInView(0.05);

  return (
    <>
      <GlobalStyles />
      <Navbar />

      {/* ══ HERO — simple video + breadcrumb (same as About Us) ══ */}
      <div style={{ position:'relative', minHeight:'420px', overflow:'hidden', display:'flex', alignItems:'center', padding:'160px 60px 90px', fontFamily:"'Plus Jakarta Sans', sans-serif", marginTop:'90px' }}>

        {/* Video BG */}
        <video autoPlay muted loop playsInline
          style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', zIndex:0, filter:'brightness(0.38)' }}>
          <source src={videoBg} type="video/mp4"/>
        </video>

        {/* Overlay */}
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg, rgba(10,42,45,0.75) 0%, rgba(30,80,85,0.65) 50%, rgba(48,112,116,0.55) 100%)', zIndex:1 }}/>

        {/* Grid */}
        <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(243,247,236,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(243,247,236,0.03) 1px,transparent 1px)', backgroundSize:'55px 55px', zIndex:2, pointerEvents:'none' }}/>

        {/* Scan line */}
        <div style={{ position:'absolute', left:0, right:0, height:'1px', background:'linear-gradient(90deg,transparent,rgba(243,247,236,0.15) 50%,transparent)', animation:'scanLine 5s linear infinite', zIndex:3, pointerEvents:'none' }}/>

        <FloatingDots/>

        {/* Content */}
        <div style={{ position:'relative', zIndex:4 }}>
          {/* Breadcrumb */}
          <div className="isw-hero-bread" style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'18px' }}>
            <span style={{ width:'20px', height:'1.5px', background:'rgba(243,247,236,0.5)', display:'inline-block' }}/>
            <a href="/" style={{ fontSize:'13px', color:'rgba(243,247,236,0.5)', textDecoration:'none', fontWeight:'600', letterSpacing:'1px', transition:'color .2s' }}
              onMouseEnter={e=>e.target.style.color='#f3f7ec'} onMouseLeave={e=>e.target.style.color='rgba(243,247,236,0.5)'}>HOME</a>
            <span style={{ color:'rgba(243,247,236,0.3)', fontSize:'13px' }}>›</span>
            <span style={{ fontSize:'13px', color:'rgba(243,247,236,0.9)', fontWeight:'700', letterSpacing:'1px' }}>SERVICES</span>
          </div>

          {/* Title */}
          <h1 className="isw-hero-title" style={{ fontSize:'clamp(3rem,5.5vw,5rem)', fontWeight:'800', color:'#f3f7ec', margin:0, lineHeight:1.06, letterSpacing:'-2.5px' }}>
            Our{' '}<span style={{ color:'rgba(243,247,236,0.45)', fontStyle:'italic' }}>Services</span>
          </h1>
        </div>
      </div>

      {/* CARDS */}
      <section id="services-grid" style={{ padding:'72px 0 90px', background:'linear-gradient(170deg,#eef8f8 0%,#fafffe 45%,#e6f5f3 100%)', fontFamily:"'Plus Jakarta Sans', sans-serif", position:'relative', overflow:'hidden' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto', padding:'0 32px', position:'relative' }}>
          <div ref={cardsRef} style={{ textAlign:'center', marginBottom:'50px', opacity:cardsVisible?1:0, transform:cardsVisible?'translateY(0)':'translateY(20px)', transition:'all 0.7s ease' }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:'10px', background:'rgba(48,112,116,0.07)', border:'1.5px solid rgba(48,112,116,0.14)', borderRadius:'50px', padding:'7px 20px', marginBottom:'16px' }}>
              <span className="isw-dot" style={{ width:'7px', height:'7px', borderRadius:'50%', background:'#306F74', display:'inline-block' }}/>
              <span style={{ fontSize:'11px', fontWeight:'700', letterSpacing:'3.5px', textTransform:'uppercase', color:'#306F74' }}>Home / Services</span>
            </div>
            <h2 style={{ fontSize:'clamp(1.8rem,3.2vw,2.6rem)', fontWeight:'800', color:'#0c1e22', margin:'0 0 12px 0', letterSpacing:'-1px', lineHeight:1.1 }}>
              Everything You Need to{' '}
              <span style={{ color:'#306F74', position:'relative', display:'inline-block' }}>
                Stay Secure
                <svg viewBox="0 0 220 12" style={{ position:'absolute', bottom:'-4px', left:0, width:'100%', height:'9px', overflow:'visible' }} preserveAspectRatio="none">
                  <path d="M2 8 Q55 2 110 7 Q165 12 218 6" stroke="#306F74" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.38"/>
                </svg>
              </span>
            </h2>
          </div>

          <div className="isw-grid" style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'22px' }}>
            {services.map((s,i)=><ServiceCard key={s.title} service={s} index={i}/>)}
          </div>

          {/* WHAT WE DO */}
          <div style={{ marginTop:'80px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'60px', alignItems:'center' }} className="isw-whatwedo-grid">
            <div style={{ position:'relative', height:'480px' }}>
              <div style={{ position:'absolute', top:0, left:0, width:'85%', height:'78%', borderRadius:'20px', overflow:'hidden', boxShadow:'0 20px 60px rgba(0,0,0,0.15)' }}>
                <img src={img1} alt="Cybersecurity" style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, transparent 50%, rgba(10,42,45,0.3) 100%)' }}/>
              </div>
              <div style={{ position:'absolute', bottom:0, right:0, width:'52%', height:'46%', borderRadius:'16px', overflow:'hidden', boxShadow:'0 12px 40px rgba(0,0,0,0.18)', border:'4px solid white' }}>
                <img src={img2} alt="Security team" style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'bottom' }}/>
              </div>
            </div>
            <div style={{ fontFamily:"'Plus Jakarta Sans', sans-serif" }}>
              <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'18px' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#306F74" strokeWidth="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                <span style={{ fontSize:'11px', fontWeight:'700', letterSpacing:'4px', textTransform:'uppercase', color:'#306F74' }}>What We Do</span>
              </div>
              <h2 style={{ fontSize:'clamp(2rem,3.5vw,2.9rem)', fontWeight:'800', color:'#0c1e22', margin:'0 0 18px 0', lineHeight:1.12, letterSpacing:'-1.2px' }}>
                Protecting, preventing,{' '}<span style={{ color:'#306F74' }}>securing your future</span>
              </h2>
              <p style={{ fontSize:'15px', color:'#6b7280', lineHeight:1.8, margin:'0 0 30px 0' }}>We provide comprehensive cybersecurity services to safeguard your digital assets, prevent potential threats, and ensure a secure environment.</p>
              <div style={{ display:'flex', flexDirection:'column', gap:'16px', marginBottom:'36px' }}>
                {['Proactive Threat Detection and Incident Response','Advanced Network Security and Intrusion Prevention','Data Encryption and Secure Information Management'].map(item=>(
                  <div key={item} style={{ display:'flex', alignItems:'center', gap:'14px' }}>
                    <div style={{ width:'28px', height:'28px', borderRadius:'50%', flexShrink:0, border:'1.5px solid #306F74', display:'flex', alignItems:'center', justifyContent:'center' }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#306F74" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
                    </div>
                    <span style={{ fontSize:'14.5px', color:'#374151', fontWeight:'500' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background:'linear-gradient(135deg, #307075 0%, #2a5f63 100%)', color:'#f3f7ec', padding:'60px 0 20px', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:0, left:0, right:0, height:'1px', background:'linear-gradient(90deg, transparent, #f3f7ec, transparent)' }}/>
        <div style={{ maxWidth:'1200px', margin:'0 auto', padding:'0 20px' }}>
          <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', gap:'40px', marginBottom:'40px' }}>
            <div style={{ display:'flex', flexDirection:'column', gap:'20px' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'15px', marginBottom:'15px' }}>
                <div style={{ width:'50px', height:'50px', background:'#f3f7ec', borderRadius:'12px', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
                  <img src={logo} alt="Logo" style={{ width:'35px', height:'35px', objectFit:'contain' }}/>
                </div>
                <span style={{ fontSize:'28px', fontWeight:'700' }}>iSeeWaves</span>
              </div>
              <p style={{ color:'#b8d4d6', fontSize:'16px', lineHeight:1.6, marginBottom:'20px' }}>Protecting your digital assets with advanced cybersecurity solutions.</p>
              <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
                <div style={{ display:'flex', alignItems:'flex-start', gap:'12px' }}>
                  <img src={gmailIcon} style={{ width:'20px', height:'20px', objectFit:'contain', marginTop:'2px', opacity:0.8 }} alt="email"/>
                  <span style={{ fontSize:'15px', lineHeight:1.5 }}>iseewaves.pk@gmail.com</span>
                </div>
                <div style={{ display:'flex', alignItems:'flex-start', gap:'12px' }}>
                  <img src={locationIcon} style={{ width:'20px', height:'20px', objectFit:'contain', marginTop:'2px', opacity:0.8 }} alt="location"/>
                  <span style={{ fontSize:'15px', lineHeight:1.5 }}>Shop # 10, Plot # 237, Banda Phugwarian,<br/>Banda Batang, Abbottabad</span>
                </div>
              </div>
            </div>
            <FooterSection title="Quick Links" links={[{label:'Home',href:'/'},{label:'About Us',href:'/about'},{label:'Services',href:'/services'},{label:'Products',href:'/products'},{label:'Blog',href:'#blog'}]}/>
            <FooterSection title="Company" links={[{label:'Contact',href:'/contact'},{label:'Careers',href:'/careers'},{label:'Our Team',href:'/careers'},{label:'Partners',href:'#partners'},{label:'News',href:'#news'}]}/>
            <div>
              <SectionHeading title="Connect With Us"/>
              <div style={{ display:'flex', gap:'15px', marginTop:'10px', flexWrap:'wrap' }}>
                {[{href:'https://www.instagram.com/iseewaves.pk',icon:instagramIcon,alt:'Instagram'},{href:'https://m.facebook.com/iseewaves.pk',icon:facebookIcon,alt:'Facebook'},{href:'https://x.com/iseewaves_',icon:twitterIcon,alt:'X'},{href:'http://www.linkedin.com/company/iseewaves/',icon:linkedinIcon,alt:'LinkedIn'}].map(s=>(
                  <a key={s.alt} href={s.href} target="_blank" rel="noreferrer"
                    style={{ width:'45px',height:'45px',background:'rgba(243,247,236,0.1)',border:'2px solid rgba(243,247,236,0.2)',borderRadius:'12px',display:'flex',alignItems:'center',justifyContent:'center',textDecoration:'none',transition:'all 0.3s' }}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor='#f3f7ec';e.currentTarget.style.background='rgba(243,247,236,0.15)';e.currentTarget.style.transform='translateY(-3px)';}}
                    onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(243,247,236,0.2)';e.currentTarget.style.background='rgba(243,247,236,0.1)';e.currentTarget.style.transform='translateY(0)';}}>
                    <img src={s.icon} style={{ width:'24px',height:'24px',objectFit:'contain',opacity:0.8 }} alt={s.alt}/>
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
    </>
  );
};

export default ServicesPage;