import React, { useState } from 'react';
import whyImg from '../assets/images/cyber1.jpg';

const reasons = [
  {
    title: 'Expertise And Experience',
    description: 'A team of seasoned cybersecurity professionals with extensive industry knowledge and hands-on experience.',
    svg: (activeOrHover) => (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none"
        stroke={activeOrHover ? '#ffffff' : '#74C3BA'}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        <circle cx="12" cy="16" r="1"
          fill={activeOrHover ? '#ffffff' : '#74C3BA'}/>
      </svg>
    ),
  },
  {
    title: 'Proactive Security Approach',
    description: 'Focused on preventing threats before they impact your system, not just reacting after the fact.',
    svg: (activeOrHover) => (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none"
        stroke={activeOrHover ? '#ffffff' : '#74C3BA'}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <polyline points="9 12 11 14 15 10"/>
      </svg>
    ),
  },
  {
    title: 'Tailored Training Programs',
    description: 'Educating your team on security best practices to reduce human error and enhance vigilance.',
    svg: (activeOrHover) => (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none"
        stroke={activeOrHover ? '#ffffff' : '#74C3BA'}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14"/>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14"/>
      </svg>
    ),
  },
  {
    title: 'Cutting-Edge Tools',
    description: 'We use the latest offensive and defensive security tools to stay ahead of evolving cyber threats.',
    svg: (activeOrHover) => (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none"
        stroke={activeOrHover ? '#ffffff' : '#74C3BA'}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
  },
];

const WhyChooseUs = () => {

  const [active, setActive] = useState(null);
  const [hovered, setHovered] = useState(null);

  const handleClick = (i) => {
    setActive(active === i ? null : i);
  };

  return (
    <section style={{
      background: 'linear-gradient(135deg,#0f2027,#1a3a40,#0f2027)',
      fontFamily: "'Segoe UI', sans-serif",
    }}>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        minHeight: '680px'
      }}>

        {/* LEFT IMAGE */}
        <div style={{ position:'relative' }}>
          <img
            src={whyImg}
            alt="Why Choose Us"
            style={{
              width:'100%',
              height:'100%',
              objectFit:'cover',
              filter:'brightness(.75)'
            }}
          />

          <div style={{
            position:'absolute',
            inset:0,
            background:'linear-gradient(to right, transparent 60%, #0f2027)'
          }} />
        </div>


        {/* RIGHT CONTENT */}
        <div style={{
          padding:'70px 60px 70px 50px',
          display:'flex',
          flexDirection:'column',
          justifyContent:'center',
          gap:'28px'
        }}>

          <span style={{
            fontSize:'12px',
            fontWeight:'700',
            letterSpacing:'3px',
            textTransform:'uppercase',
            color:'#74C3BA'
          }}>
            Why Choose Us
          </span>


          <h2 style={{
            fontSize:'2.6rem',
            fontWeight:'900',
            color:'white',
            margin:0
          }}>
            Reliable solutions for{' '}
            <span style={{color:'#74C3BA'}}>
              cybersecurity excellence
            </span>
          </h2>


          <div style={{
            display:'flex',
            flexDirection:'column',
            gap:'14px'
          }}>

            {reasons.map((reason,i)=>{

              const isActive = active === i;
              const isHovered = hovered === i;
              const activeOrHover = isActive || isHovered;

              return(

                <div
                  key={i}
                  onClick={()=>handleClick(i)}
                  onMouseEnter={()=>setHovered(i)}
                  onMouseLeave={()=>setHovered(null)}

                  style={{

                    display:'flex',
                    gap:'20px',
                    padding:'22px 26px',
                    borderRadius:'16px',

                    background:
                      activeOrHover
                      ? 'linear-gradient(135deg,#306F74,#74C3BA)'
                      : 'white',

                    border:'1px solid rgba(116,195,186,0.25)',

                    cursor:'pointer',

                    transition:'all .35s ease',

                    transform:
                      isActive
                      ? 'translateX(6px)'
                      : isHovered
                      ? 'translateX(3px)'
                      : 'translateX(0)',

                    boxShadow:
                      isActive
                      ? '0 10px 30px rgba(0,0,0,0.25)'
                      : isHovered
                      ? '0 4px 18px rgba(116,195,186,0.15)'
                      : 'none'
                  }}
                >

                  {/* ICON */}
                  <div style={{
                    width:'64px',
                    height:'64px',
                    borderRadius:'14px',

                    background:
                      activeOrHover
                      ? 'rgba(255,255,255,0.15)'
                      : 'rgba(48,111,116,0.07)',

                    display:'flex',
                    alignItems:'center',
                    justifyContent:'center'
                  }}>
                    {reason.svg(activeOrHover)}
                  </div>


                  {/* TEXT */}
                  <div>

                    <h4 style={{
                      fontSize:'1rem',
                      fontWeight:'700',
                      margin:'0 0 6px',

                      color:
                        activeOrHover
                        ? '#ffffff'
                        : '#0f2027',

                      transition:'color .3s ease'
                    }}>
                      {reason.title}
                    </h4>


                    <p style={{
                      fontSize:'13.5px',
                      margin:0,
                      lineHeight:1.6,

                      color:
                        activeOrHover
                        ? '#ffffff'
                        : '#6b7280',

                      transition:'color .3s ease'
                    }}>
                      {reason.description}
                    </p>

                  </div>

                </div>

              )

            })}

          </div>

        </div>

      </div>

    </section>
  );
};

export default WhyChooseUs;