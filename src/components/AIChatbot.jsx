import React, { useState, useEffect, useRef } from 'react';



// ── Connected to chatbot_backend/chatbot_app.py (Flask + Groq) ──
const API_BASE = 'http://localhost:5008/api';

/* ── Styles ── */
const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

    /* ── Animations ── */
    @keyframes isw-fadeUp   { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
    @keyframes isw-fadeIn   { from{opacity:0} to{opacity:1} }
    @keyframes isw-bounce   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
    @keyframes isw-ping     { 0%{transform:scale(1);opacity:1} 100%{transform:scale(2.2);opacity:0} }
    @keyframes isw-spin     { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
    @keyframes isw-pulse    { 0%,100%{box-shadow:0 0 0 0 rgba(116,195,186,0.5)} 50%{box-shadow:0 0 0 10px rgba(116,195,186,0)} }
    @keyframes isw-typing   { 0%,80%,100%{transform:scale(0.6);opacity:0.4} 40%{transform:scale(1);opacity:1} }
    @keyframes isw-slideIn  { from{opacity:0;transform:translateX(30px) scale(0.96)} to{opacity:1;transform:translateX(0) scale(1)} }
    @keyframes isw-msgIn    { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
    @keyframes isw-shimmer  { 0%{transform:translateX(-100%)} 100%{transform:translateX(200%)} }

    /* ── FAB Button ── */
    .isw-fab {
      position: fixed;
      bottom: 32px;
      right: 32px;
      z-index: 9998;
      width: 62px;
      height: 62px;
      border-radius: 50%;
      background: linear-gradient(135deg, #306F74 0%, #74C3BA 100%);
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 8px 32px rgba(48,111,116,0.5), 0 2px 8px rgba(0,0,0,0.2);
      transition: all 0.35s cubic-bezier(0.23,1,0.32,1);
      animation: isw-pulse 3s ease-in-out infinite;
      outline: none;
    }
    .isw-fab:hover {
      transform: scale(1.1) translateY(-3px);
      box-shadow: 0 14px 40px rgba(48,111,116,0.6), 0 4px 12px rgba(0,0,0,0.25);
      animation: none;
    }
    .isw-fab.open {
      background: linear-gradient(135deg, #1a3d40, #306F74);
      animation: none;
      transform: rotate(0deg);
    }
    .isw-fab-ping {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      background: rgba(116,195,186,0.4);
      animation: isw-ping 2s ease-out infinite;
    }
    .isw-fab-badge {
      position: absolute;
      top: -3px;
      right: -3px;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: #ff4d6d;
      border: 2px solid white;
      font-size: 10px;
      font-weight: 800;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Plus Jakarta Sans', sans-serif;
    }

    /* ── Chat Panel ── */
    .isw-chat-panel {
      position: fixed;
      bottom: 108px;
      right: 32px;
      z-index: 9999;
      width: 370px;
      height: 560px;
      border-radius: 24px;
      background: #0a1a1f;
      border: 1px solid rgba(116,195,186,0.2);
      box-shadow: 0 24px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(116,195,186,0.08);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      animation: isw-slideIn 0.35s cubic-bezier(0.23,1,0.32,1) both;
      font-family: 'Plus Jakarta Sans', sans-serif;
    }

    /* ── Header ── */
    .isw-chat-header {
      padding: 18px 20px 16px;
      background: linear-gradient(135deg, rgba(48,111,116,0.4) 0%, rgba(116,195,186,0.1) 100%);
      border-bottom: 1px solid rgba(116,195,186,0.12);
      position: relative;
      overflow: hidden;
      flex-shrink: 0;
    }
    .isw-chat-header::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 2px;
      background: linear-gradient(90deg, transparent, #74C3BA, transparent);
    }

    /* ── Messages ── */
    .isw-chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 16px 14px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      scrollbar-width: thin;
      scrollbar-color: rgba(116,195,186,0.25) transparent;
    }
    .isw-chat-messages::-webkit-scrollbar { width: 4px; }
    .isw-chat-messages::-webkit-scrollbar-thumb { background: rgba(116,195,186,0.25); border-radius: 4px; }

    /* ── Message Bubbles ── */
    .isw-msg {
      display: flex;
      align-items: flex-end;
      gap: 8px;
      animation: isw-msgIn 0.3s ease both;
      max-width: 92%;
    }
    .isw-msg.user { flex-direction: row-reverse; align-self: flex-end; }
    .isw-msg.bot  { align-self: flex-start; }

    .isw-msg-avatar {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
    }
    .isw-msg-avatar.bot-av {
      background: linear-gradient(135deg, #306F74, #74C3BA);
      box-shadow: 0 2px 8px rgba(48,111,116,0.4);
    }
    .isw-msg-avatar.user-av {
      background: rgba(116,195,186,0.15);
      border: 1px solid rgba(116,195,186,0.25);
    }

    .isw-bubble {
      padding: 10px 14px;
      border-radius: 18px;
      font-size: 13.5px;
      line-height: 1.65;
      max-width: 100%;
      word-break: break-word;
    }
    .isw-bubble.bot {
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(116,195,186,0.12);
      color: #e0f0ee;
      border-bottom-left-radius: 4px;
    }
    .isw-bubble.user {
      background: linear-gradient(135deg, #306F74, #3a9098);
      color: #ffffff;
      border-bottom-right-radius: 4px;
      box-shadow: 0 4px 16px rgba(48,111,116,0.3);
    }
    .isw-bubble-time {
      font-size: 10px;
      color: rgba(116,195,186,0.35);
      margin-top: 4px;
      padding: 0 4px;
    }

    /* ── Typing indicator ── */
    .isw-typing-dots {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 12px 16px;
    }
    .isw-typing-dots span {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #74C3BA;
      display: inline-block;
      animation: isw-typing 1.2s ease-in-out infinite;
    }
    .isw-typing-dots span:nth-child(2) { animation-delay: 0.2s; }
    .isw-typing-dots span:nth-child(3) { animation-delay: 0.4s; }

    /* ── Quick replies ── */
    .isw-quick-replies {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      padding: 0 14px 10px;
    }
    .isw-quick-btn {
      padding: 6px 12px;
      border-radius: 20px;
      border: 1px solid rgba(116,195,186,0.25);
      background: rgba(116,195,186,0.07);
      color: #74C3BA;
      font-size: 11.5px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      font-family: 'Plus Jakarta Sans', sans-serif;
      white-space: nowrap;
    }
    .isw-quick-btn:hover {
      background: rgba(116,195,186,0.18);
      border-color: #74C3BA;
      transform: translateY(-1px);
    }

    /* ── Input area ── */
    .isw-chat-input-area {
      padding: 12px 14px 16px;
      border-top: 1px solid rgba(116,195,186,0.1);
      background: rgba(0,0,0,0.2);
      flex-shrink: 0;
    }
    .isw-chat-input-row {
      display: flex;
      gap: 8px;
      align-items: flex-end;
    }
    .isw-chat-textarea {
      flex: 1;
      background: rgba(116,195,186,0.06);
      border: 1.5px solid rgba(116,195,186,0.18);
      border-radius: 14px;
      color: #e0f0ee;
      font-size: 13.5px;
      font-family: 'Plus Jakarta Sans', sans-serif;
      outline: none;
      resize: none;
      padding: 10px 14px;
      min-height: 42px;
      max-height: 100px;
      transition: all 0.25s;
      line-height: 1.5;
    }
    .isw-chat-textarea:focus {
      border-color: #74C3BA;
      background: rgba(116,195,186,0.1);
      box-shadow: 0 0 0 3px rgba(116,195,186,0.1);
    }
    .isw-chat-textarea::placeholder { color: rgba(116,195,186,0.3); }

    .isw-send-btn {
      width: 42px;
      height: 42px;
      border-radius: 12px;
      border: none;
      background: linear-gradient(135deg, #306F74, #74C3BA);
      color: white;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: all 0.25s;
      box-shadow: 0 4px 14px rgba(48,111,116,0.4);
    }
    .isw-send-btn:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 7px 20px rgba(48,111,116,0.55);
    }
    .isw-send-btn:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }

    /* ── Status bar ── */
    .isw-status-bar {
      display: flex;
      align-items: center;
      gap: 5px;
      padding: 6px 14px;
      font-size: 10.5px;
      color: rgba(116,195,186,0.4);
      border-top: 1px solid rgba(116,195,186,0.06);
      background: rgba(0,0,0,0.15);
    }

    /* ── Responsive ── */
    @media (max-width: 480px) {
      .isw-chat-panel {
        right: 12px;
        width: calc(100vw - 24px);
        bottom: 90px;
        height: 70vh;
        border-radius: 20px;
      }
      .isw-fab { right: 20px; bottom: 20px; }
    }
  `}</style>
);

/* ── Helper: current time ── */
const now = () => new Date().toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' });

/* ── Initial bot greeting ── */
const GREETING = {
  id: 0,
  role: 'bot',
  text: "👋 Hi! I'm **SecureBot**, iSeeWaves' AI security assistant.\n\nI can help you with cybersecurity questions, explain our tools, or guide you through reconnaissance, IP tracking, and more. How can I help you today?",
  time: now(),
};

/* ── Quick reply suggestions ── */
const QUICK_REPLIES = [
  ' What is Reconnaissance?',
  ' How to check password strength?',
  'How does IP Tracker work?',
  ' What is a VPN?',
  ' What are common cyber threats?',
];

/* ══════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════ */
const AIChatbot = () => {
  const [open,     setOpen]     = useState(false);
  const [messages, setMessages] = useState([GREETING]);
  const [input,    setInput]    = useState('');
  const [typing,   setTyping]   = useState(false);
  const [unread,   setUnread]   = useState(1);
  const [showQuick,setShowQuick]= useState(true);
  const [error,    setError]    = useState(false);

  const messagesEndRef = useRef(null);
  const textareaRef    = useRef(null);

  /* Auto scroll */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  /* Clear unread when opened */
  useEffect(() => {
    if (open) setUnread(0);
  }, [open]);

  /* Auto resize textarea */
  const handleInputChange = (e) => {
    setInput(e.target.value);
    const ta = textareaRef.current;
    if (ta) { ta.style.height = 'auto'; ta.style.height = Math.min(ta.scrollHeight, 100) + 'px'; }
  };

  /* ── Send message ── */
  const sendMessage = async (text) => {
    const msg = (text || input).trim();
    if (!msg) return;

    setInput('');
    setShowQuick(false);
    setError(false);
    if (textareaRef.current) textareaRef.current.style.height = '42px';

    const userMsg = { id: Date.now(), role: 'user', text: msg, time: now() };

    // Build history from current messages BEFORE adding the new one,
    // so the backend (Gemini) remembers the conversation so far.
    // Backend expects: [{ role: "user"|"model", text }]
    const history = messages
      .filter(m => !m.isError)                 // don't send error bubbles as context
      .map(m => ({
        role: m.role === 'bot' ? 'model' : 'user',
        text: m.text,
      }));

    setMessages(prev => [...prev, userMsg]);
    setTyping(true);

    try {
      const res  = await fetch(`${API_BASE}/chat`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ message: msg, history }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');

      setMessages(prev => [...prev, {
        id:   Date.now() + 1,
        role: 'bot',
        text: data.reply || data.response || 'Sorry, I could not process that.',
        time: now(),
      }]);
    } catch {
      setError(true);
      setMessages(prev => [...prev, {
        id:   Date.now() + 1,
        role: 'bot',
        text: '⚠️ Could not reach the AI backend. Make sure chatbot_app.py is running on port 5008.',
        time: now(),
        isError: true,
      }]);
    } finally {
      setTyping(false);
    }
  };

  /* Enter to send (Shift+Enter = newline) */
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  /* ── Render markdown-like bold ── */
  const renderText = (text) =>
    text.split(/\*\*(.*?)\*\*/g).map((part, i) =>
      i % 2 === 1
        ? <strong key={i} style={{ color: '#74C3BA', fontWeight: 700 }}>{part}</strong>
        : <span key={i}>{part}</span>
    );

  return (
    <>
      <Styles />

      {/* ══ CHAT PANEL ══ */}
      {open && (
        <div className="isw-chat-panel">

          {/* Header */}
          <div className="isw-chat-header">
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'11px' }}>
                {/* Bot avatar */}
                <div style={{ position:'relative', width:'38px', height:'38px' }}>
                  <div style={{ width:'38px', height:'38px', borderRadius:'50%', background:'linear-gradient(135deg,#306F74,#74C3BA)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'18px', boxShadow:'0 4px 14px rgba(48,111,116,0.45)' }}>🛡️</div>
                  {/* Online dot */}
                  <div style={{ position:'absolute', bottom:'1px', right:'1px', width:'10px', height:'10px', borderRadius:'50%', background:'#52c97a', border:'2px solid #0a1a1f', boxShadow:'0 0 6px rgba(82,201,122,0.6)' }}/>
                </div>
                <div>
                  <p style={{ fontSize:'14px', fontWeight:'800', color:'#e8f5f3', margin:0, letterSpacing:'-0.3px' }}>SecureBot</p>
                  <div style={{ display:'flex', alignItems:'center', gap:'5px', marginTop:'2px' }}>
                    <div style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#52c97a', animation:'isw-pulse 2s infinite' }}/>
                    <span style={{ fontSize:'11px', color:'rgba(116,195,186,0.6)', fontWeight:'500' }}>Online · iSeeWaves AI</span>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>
                {/* Clear chat */}
                <button onClick={() => { setMessages([GREETING]); setShowQuick(true); setError(false); }}
                  style={{ width:'28px', height:'28px', borderRadius:'8px', border:'1px solid rgba(116,195,186,0.18)', background:'rgba(116,195,186,0.06)', color:'rgba(116,195,186,0.6)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', transition:'all .2s' }}
                  title="Clear chat"
                  onMouseEnter={e=>{ e.currentTarget.style.background='rgba(116,195,186,0.15)'; e.currentTarget.style.color='#74C3BA'; }}
                  onMouseLeave={e=>{ e.currentTarget.style.background='rgba(116,195,186,0.06)'; e.currentTarget.style.color='rgba(116,195,186,0.6)'; }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.5"/></svg>
                </button>
                {/* Close */}
                <button onClick={() => setOpen(false)}
                  style={{ width:'28px', height:'28px', borderRadius:'8px', border:'1px solid rgba(116,195,186,0.18)', background:'rgba(116,195,186,0.06)', color:'rgba(116,195,186,0.6)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', transition:'all .2s', fontSize:'16px' }}
                  onMouseEnter={e=>{ e.currentTarget.style.background='rgba(255,100,100,0.12)'; e.currentTarget.style.color='#ff6b7a'; }}
                  onMouseLeave={e=>{ e.currentTarget.style.background='rgba(116,195,186,0.06)'; e.currentTarget.style.color='rgba(116,195,186,0.6)'; }}>
                  ✕
                </button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="isw-chat-messages">
            {messages.map((msg, idx) => (
              <div key={msg.id} style={{ display:'flex', flexDirection:'column', alignItems: msg.role==='user' ? 'flex-end' : 'flex-start', animation:`isw-msgIn 0.3s ease ${idx*0.04}s both` }}>
                <div className={`isw-msg ${msg.role}`}>
                  {/* Avatar */}
                  <div className={`isw-msg-avatar ${msg.role==='bot'?'bot-av':'user-av'}`}>
                    {msg.role==='bot' ? '🤖' : '👤'}
                  </div>
                  {/* Bubble */}
                  <div className={`isw-bubble ${msg.role}`} style={{ opacity: msg.isError ? 0.8 : 1 }}>
                    {renderText(msg.text)}
                  </div>
                </div>
                <span className="isw-bubble-time" style={{ alignSelf: msg.role==='user'?'flex-end':'flex-start', marginLeft: msg.role==='bot'?'40px':'0', marginRight: msg.role==='user'?'40px':'0' }}>
                  {msg.time}
                </span>
              </div>
            ))}

            {/* Typing indicator */}
            {typing && (
              <div className="isw-msg bot" style={{ animation:'isw-msgIn 0.3s ease both' }}>
                <div className="isw-msg-avatar bot-av">🤖</div>
                <div className="isw-bubble bot" style={{ padding:'8px 14px' }}>
                  <div className="isw-typing-dots">
                    <span/><span/><span/>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick replies */}
          {showQuick && messages.length <= 1 && (
            <div className="isw-quick-replies">
              {QUICK_REPLIES.map(q => (
                <button key={q} className="isw-quick-btn" onClick={() => sendMessage(q)}>{q}</button>
              ))}
            </div>
          )}

          {/* Input area */}
          <div className="isw-chat-input-area">
            <div className="isw-chat-input-row">
              <textarea
                ref={textareaRef}
                className="isw-chat-textarea"
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything about cybersecurity…"
                rows={1}
                disabled={typing}
              />
              <button className="isw-send-btn" onClick={() => sendMessage()} disabled={!input.trim() || typing} title="Send">
                {typing
                  ? <div style={{ width:'16px', height:'16px', border:'2px solid rgba(255,255,255,0.3)', borderTopColor:'white', borderRadius:'50%', animation:'isw-spin 0.7s linear infinite' }}/>
                  : <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                }
              </button>
            </div>
          </div>

          {/* Status bar */}
          <div className="isw-status-bar">
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="rgba(116,195,186,0.5)" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <span>Powered by iSeeWaves AI · Secure & Private</span>
          </div>
        </div>
      )}

      {/* ══ FLOATING ACTION BUTTON ══ */}
      <button className={`isw-fab ${open?'open':''}`} onClick={() => setOpen(o => !o)} title="Chat with SecureBot" aria-label="Open AI Chatbot">
        {/* Ping ring — only when closed */}
        {!open && <div className="isw-fab-ping"/>}

        {/* Unread badge */}
        {!open && unread > 0 && (
          <div className="isw-fab-badge">{unread}</div>
        )}

        {/* Icon — toggles between chat and close */}
        {open
          ? <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          : <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              <circle cx="9" cy="10" r="1" fill="white"/>
              <circle cx="12" cy="10" r="1" fill="white"/>
              <circle cx="15" cy="10" r="1" fill="white"/>
            </svg>
        }
      </button>
    </>
  );
};

export default AIChatbot;