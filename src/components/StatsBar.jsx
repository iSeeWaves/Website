import React, { useState, useEffect, useRef } from 'react';

const stats = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#74C3BA" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 12l2 2 4-4" stroke="#74C3BA" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    target: 500,
    suffix: '+',
    label: 'Clients Protected',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" stroke="#74C3BA" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    target: 99,
    suffix: '%',
    label: 'Uptime Guaranteed',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" stroke="#74C3BA" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    target: 4,
    suffix: '',
    label: 'Core Security Services',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="#74C3BA" strokeWidth="1.8"/>
        <line x1="2" y1="12" x2="22" y2="12" stroke="#74C3BA" strokeWidth="1.8"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="#74C3BA" strokeWidth="1.8"/>
      </svg>
    ),
    target: 2025,
    suffix: '',
    prefix: 'Est. ',
    label: 'Abbottabad, Pakistan',
    noCount: true,
  },
];

const useCounter = (target, duration, start) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);

  return count;
};

const StatItem = ({ stat, index, started }) => {
  const count = useCounter(stat.target, 1800 + index * 200, started);
  const display = stat.noCount ? stat.target : count;

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '18px',
      flex: 1,
      padding: '0 40px',
      position: 'relative',
    }}>
      {/* Icon */}
      <div style={{
        width: '52px', height: '52px',
        borderRadius: '14px',
        background: 'rgba(116,195,186,0.12)',
        border: '1px solid rgba(116,195,186,0.2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        {stat.icon}
      </div>

      {/* Text */}
      <div>
        <div style={{
          fontSize: '2rem',
          fontWeight: '800',
          color: '#74C3BA',
          lineHeight: 1.1,
          letterSpacing: '-1px',
          fontFamily: "'Segoe UI', sans-serif",
        }}>
          {stat.prefix || ''}{display}{stat.suffix}
        </div>
        <div style={{
          fontSize: '13px',
          color: 'rgba(255,255,255,0.6)',
          marginTop: '4px',
          fontWeight: '500',
          letterSpacing: '0.3px',
        }}>
          {stat.label}
        </div>
      </div>
    </div>
  );
};

const StatsBar = () => {
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={{
      background: 'linear-gradient(135deg, #1e4f54 0%, #2a6b70 50%, #1e4f54 100%)',
      padding: '42px 0',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Subtle background glow */}
      <div style={{
        position: 'absolute', top: '-60px', left: '25%',
        width: '400px', height: '200px',
        background: 'radial-gradient(ellipse, rgba(116,195,186,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
      }}>
        {stats.map((stat, index) => (
          <React.Fragment key={stat.label}>
            <StatItem stat={stat} index={index} started={started} />
            {/* Divider */}
            {index < stats.length - 1 && (
              <div style={{
                width: '1px',
                height: '60px',
                background: 'rgba(116,195,186,0.2)',
                flexShrink: 0,
              }} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default StatsBar;