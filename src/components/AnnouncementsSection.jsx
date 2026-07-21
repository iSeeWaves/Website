import React, { useState } from 'react';

const featured = {
  date: 'FEBRUARY 2025',
  tag: 'FEATURED',
  title: 'iSeeWaves Platform Officially Launched — Integrated Security Tools Now Live',
  description: 'We are proud to announce the official launch of the iSeeWaves Security Platform. All four core modules — Reconnaissance, Scanning, Tracker, and Password Tools — are now fully operational and available.',
  label: '🚀 Platform Launch',
};

const items = [
  {
    emoji: '🔔',
    tag: 'UPDATE',
    title: 'Subdomain Enumeration Now Supports AlienVault OTX',
    description: 'Passive recon module upgraded with OTX threat intelligence integration for deeper subdomain discovery.',
  },
  {
    emoji: '📣',
    tag: 'ANNOUNCEMENT',
    title: 'Internship Program Open — Join Team Alpha',
    description: 'We are accepting applications for cybersecurity interns. Work on real-world offensive security tooling.',
  },
  {
    emoji: '⚠️',
    tag: 'ADVISORY',
    title: 'Cyber Regulations Repository Updated with 2025 Laws',
    description: 'International cyber law references updated. Pakistan PECA amendments now included in our database.',
  },
];

const AnnouncementsSection = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [featuredHovered, setFeaturedHovered] = useState(false);

  return (
    <section style={{
      padding: '90px 0',
      background: '#ffffff',
      fontFamily: "'Segoe UI', sans-serif",
    }}>
      <div style={{ maxWidth: '1150px', margin: '0 auto', padding: '0 60px' }}>

        {/* 2 Column Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '50px',
          alignItems: 'stretch',
        }}>

          {/* ===== LEFT — Heading + Featured Card ===== */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', flex: 1 }}>

            {/* Heading */}
            <div>
              <div style={{
                display: 'inline-flex', alignItems: 'center',
                border: '1.5px solid rgba(48,111,116,0.3)',
                borderRadius: '50px', padding: '5px 16px',
                marginBottom: '18px',
              }}>
                <span style={{
                  fontSize: '11px', fontWeight: '700',
                  letterSpacing: '2px', textTransform: 'uppercase',
                  color: '#306F74',
                }}>
                  Latest Updates
                </span>
              </div>

              <h2 style={{
                fontSize: '2.8rem', fontWeight: '900',
                color: '#0f2027', margin: '0 0 14px',
                letterSpacing: '-1px', lineHeight: 1.1,
              }}>
                News & <span style={{ color: '#306F74' }}>Announcements</span>
              </h2>

              <p style={{
                fontSize: '15px', color: '#6b7280',
                lineHeight: 1.75, margin: 0,
              }}>
                Stay informed about the latest in cybersecurity and iSeeWaves platform updates.
              </p>
            </div>

            {/* Featured Card */}
            <div
              onMouseEnter={() => setFeaturedHovered(true)}
              onMouseLeave={() => setFeaturedHovered(false)}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: 'linear-gradient(145deg, #2a6b70, #1e4f54)',
                borderRadius: '20px',
                padding: '36px 38px',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.4s ease',
                boxShadow: featuredHovered
                  ? '0 0 45px rgba(116,195,186,0.4), 0 24px 60px rgba(48,111,116,0.45)'
                  : '0 8px 30px rgba(0,0,0,0.15)',
                transform: featuredHovered ? 'translateY(-5px)' : 'translateY(0)',
              }}
            >
              {/* Top right glow */}
              <div style={{
                position: 'absolute', top: '-40px', right: '-40px',
                width: '220px', height: '220px',
                background: featuredHovered
                  ? 'radial-gradient(circle, rgba(116,195,186,0.3) 0%, transparent 70%)'
                  : 'radial-gradient(circle, rgba(116,195,186,0.12) 0%, transparent 70%)',
                pointerEvents: 'none',
                transition: 'background 0.4s ease',
              }} />
              {/* Bottom left glow on hover */}
              {featuredHovered && (
                <div style={{
                  position: 'absolute', bottom: '-30px', left: '-30px',
                  width: '180px', height: '180px',
                  background: 'radial-gradient(circle, rgba(116,195,186,0.18) 0%, transparent 70%)',
                  pointerEvents: 'none',
                }} />
              )}

              <div style={{
                fontSize: '11.5px', fontWeight: '700',
                letterSpacing: '2px', color: 'rgba(116,195,186,0.8)',
                marginBottom: '14px',
              }}>
                {featured.date} · {featured.tag}
              </div>

              <h3 style={{
                fontSize: '1.45rem', fontWeight: '800',
                color: 'white', margin: '0 0 14px',
                lineHeight: 1.3, letterSpacing: '-0.3px',
              }}>
                {featured.title}
              </h3>

              <p style={{
                fontSize: '13.5px', color: 'rgba(255,255,255,0.72)',
                lineHeight: 1.75, margin: '0 0 24px',
              }}>
                {featured.description}
              </p>

              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '50px', padding: '7px 16px',
                fontSize: '12.5px', color: 'white', fontWeight: '600',
              }}>
                {featured.label}
              </div>
            </div>
          </div>

          {/* ===== RIGHT — 3 Small Cards ===== */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', paddingTop: '8px', alignSelf: 'stretch' }}>
            {items.map((item, i) => (
              <div
                key={i}
                onMouseEnter={() => setHoveredItem(i)}
                onMouseLeave={() => setHoveredItem(null)}
                style={{
                  background: hoveredItem === i ? '#f0f9f9' : '#f8fafa',
                  border: hoveredItem === i
                    ? '1.5px solid rgba(48,111,116,0.25)'
                    : '1.5px solid rgba(0,0,0,0.06)',
                  borderRadius: '16px',
                  padding: '26px 28px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  transform: hoveredItem === i ? 'translateX(6px)' : 'translateX(0)',
                  boxShadow: hoveredItem === i ? '0 6px 24px rgba(48,111,116,0.1)' : '0 2px 8px rgba(0,0,0,0.04)',
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  marginBottom: '10px',
                }}>
                  <span style={{ fontSize: '15px' }}>{item.emoji}</span>
                  <span style={{
                    fontSize: '10.5px', fontWeight: '800',
                    letterSpacing: '2px', textTransform: 'uppercase',
                    color: '#306F74',
                  }}>
                    {item.tag}
                  </span>
                </div>

                <h4 style={{
                  fontSize: '0.98rem', fontWeight: '700',
                  color: hoveredItem === i ? '#306F74' : '#0f2027',
                  margin: '0 0 8px', lineHeight: 1.35,
                  transition: 'color 0.3s ease',
                }}>
                  {item.title}
                </h4>

                <p style={{
                  fontSize: '13px', color: '#6b7280',
                  lineHeight: 1.65, margin: 0,
                }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default AnnouncementsSection;