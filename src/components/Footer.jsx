import React from 'react';

// ✅ Correct import path: src/assets/images/icons/
import logoIcon from '../assets/images/icons/logo.png';
import gmailIcon from '../assets/images/icons/gmail.png';
import locationIcon from '../assets/images/icons/placeholder.png';
import instagramIcon from '../assets/images/icons/instagram.png';
import facebookIcon from '../assets/images/icons/facebook.png';
import twitterIcon from '../assets/images/icons/twitter.png';
import linkedinIcon from '../assets/images/icons/linkedin.png';

const Footer = () => {
  return (
    <footer style={{
      background: 'linear-gradient(135deg, #307075 0%, #2a5f63 100%)',
      color: '#f3f7ec',
      padding: '60px 0 20px 0',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Top border line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: '1px',
        background: 'linear-gradient(90deg, transparent 0%, #f3f7ec 50%, transparent 100%)',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        {/* Footer Grid */}
        <div className="footer-grid" style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: '40px',
          marginBottom: '40px',
        }}>

          {/* Company Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
              <div style={{
                width: '50px', height: '50px',
                background: '#f3f7ec',
                borderRadius: '12px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                overflow: 'hidden',
              }}>
                <img src={logoIcon} alt="Company Logo" style={{ width: '35px', height: '35px', objectFit: 'contain' }} />
              </div>
              <span style={{ fontSize: '28px', fontWeight: '700', letterSpacing: '-0.5px' }}>iSeeWaves</span>
            </div>

            <p style={{ color: '#b8d4d6', fontSize: '16px', lineHeight: '1.6', marginBottom: '20px' }}>
              Protecting your digital assets with advanced cybersecurity solutions and cutting-edge threat detection technologies.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <img src={gmailIcon} alt="Email" style={{ width: '20px', height: '20px', objectFit: 'contain', marginTop: '2px', opacity: 0.8 }} />
                <span style={{ fontSize: '15px', lineHeight: '1.5' }}>iseewaves.pk@gmail.com</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <img src={locationIcon} alt="Location" style={{ width: '20px', height: '20px', objectFit: 'contain', marginTop: '2px', opacity: 0.8 }} />
                <span style={{ fontSize: '15px', lineHeight: '1.5' }}>
                  Shop # 10, Plot # 237, Banda Phugwarian,<br />Banda Batang, Abbottabad
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <FooterSection title="Quick Links" links={[
            { label: 'Home', href: '#home' },
            { label: 'About Us', href: '/about' },
            { label: 'Services', href: '/services' },
            { label: 'Products', href: '/products' },
            { label: 'Blog', href: '#blog' },
          ]} />

          {/* Company */}
          <FooterSection title="Company" links={[
            { label: 'Contact', href: '/contact' },
            { label: 'Careers', href: '/careers' },
            { label: 'Our Team', href: '/careers' },
            { label: 'Partners', href: '#partners' },
            { label: 'News', href: '#news' },
          ]} />

          {/* Connect With Us */}
          <div>
            <SectionHeading title="Connect With Us" />
            <div style={{ display: 'flex', gap: '15px', marginTop: '10px', flexWrap: 'wrap' }}>
              {[
                { href: 'https://www.instagram.com/iseewaves.pk', icon: instagramIcon, alt: 'Instagram' },
                { href: 'https://m.facebook.com/iseewaves.pk', icon: facebookIcon, alt: 'Facebook' },
                { href: 'https://x.com/iseewaves_', icon: twitterIcon, alt: 'X (Twitter)' },
                { href: 'http://www.linkedin.com/company/iseewaves/', icon: linkedinIcon, alt: 'LinkedIn' },
              ].map((social) => (
                <a
                  key={social.alt}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  title={social.alt}
                  style={{
                    width: '45px', height: '45px',
                    background: 'rgba(243,247,236,0.1)',
                    border: '2px solid rgba(243,247,236,0.2)',
                    borderRadius: '12px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = '#f3f7ec';
                    e.currentTarget.style.background = 'rgba(243,247,236,0.15)';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(243,247,236,0.2)';
                    e.currentTarget.style.background = 'rgba(243,247,236,0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <img src={social.icon} alt={social.alt} style={{ width: '24px', height: '24px', objectFit: 'contain', opacity: 0.8 }} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div style={{ borderTop: '1px solid rgba(243,247,236,0.1)', paddingTop: '30px' }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            flexWrap: 'wrap', gap: '20px',
          }}>
            <span style={{ color: '#b8d4d6', fontSize: '14px' }}>
              © 2025 iSeeWaves. All rights reserved.
            </span>
            <div style={{ display: 'flex', gap: '30px' }}>
              {[
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Terms of Policy', href: '/tos' },
                { label: 'Security', href: '#security' },
              ].map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  style={{ color: '#b8d4d6', textDecoration: 'none', fontSize: '14px', transition: 'color 0.3s' }}
                  onMouseEnter={e => e.target.style.color = '#f3f7ec'}
                  onMouseLeave={e => e.target.style.color = '#b8d4d6'}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterSection = ({ title, links }) => (
  <div>
    <SectionHeading title={title} />
    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {links.map(link => (
        <li key={link.label}>
          <a
            href={link.href}
            style={{ color: '#b8d4d6', textDecoration: 'none', fontSize: '15px', display: 'inline-block', transition: 'all 0.3s ease' }}
            onMouseEnter={e => { e.target.style.color = '#f3f7ec'; e.target.style.transform = 'translateX(8px)'; }}
            onMouseLeave={e => { e.target.style.color = '#b8d4d6'; e.target.style.transform = 'translateX(0)'; }}
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const SectionHeading = ({ title }) => (
  <div style={{ marginBottom: '20px', position: 'relative', paddingBottom: '10px' }}>
    <h3 style={{ color: '#f3f7ec', fontSize: '18px', fontWeight: '600', margin: 0 }}>{title}</h3>
    <div style={{
      position: 'absolute', bottom: 0, left: 0,
      width: '30px', height: '2px',
      background: '#f3f7ec', borderRadius: '2px',
    }} />
  </div>
);

export default Footer;