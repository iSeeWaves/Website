import React, { useState, useEffect, useRef } from 'react';
import BG2 from '../assets/images/BG2.jpg';
import BG3 from '../assets/images/BG3.jpg';
import videoBg from '../assets/images/video_bg.mp4';

const slides = [
  {
    type: 'video',
    videoSrc: videoBg,
    heading: (
      <>Welcome to <span style={{ color: '#74C3BA' }}>iSeeWaves</span> Security Solutions</>
    ),
    para: 'Your trusted partner in offensive security tools.',
    btn1: { label: 'Get Started', href: '/products' },
    btn2: { label: 'Request a Demo', href: '/service-form' },
  },
  {
    type: 'image',
    bgImage: BG2,
    heading: (
      <>Advanced <span style={{ color: '#74C3BA' }}>Surveillance</span> Technology</>
    ),
    para: '24/7 monitoring with cutting-edge security systems.',
    btn1: { label: 'Learn More', href: '/about' },
    btn2: { label: 'Get Support', href: '/contact' },
  },
  {
    type: 'image',
    bgImage: BG3,
    heading: (
      <>24/7 <span style={{ color: '#74C3BA' }}>Monitoring</span> & Support</>
    ),
    para: 'Round-the-clock protection for your business infrastructure.',
    btn1: { label: 'Our Services', href: '/services' },
    btn2: { label: 'Contact Us', href: '/contact' },
  },
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);
  const videoRef = useRef(null);

  const goTo = (idx) => {
    setFade(false);
    setTimeout(() => {
      setCurrent(idx);
      setFade(true);
    }, 300);
  };

  const prev = () => goTo((current - 1 + slides.length) % slides.length);
  const next = () => goTo((current + 1) % slides.length);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (slides[current].type === 'video' && videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [current]);

  const slide = slides[current];

  return (
    <section style={{
      height: '100vh',
      marginTop: '80px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background Layer */}
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
        transition: 'opacity 0.4s ease',
        opacity: fade ? 1 : 0,
      }}>
        {slide.type === 'video' ? (
          <video
            ref={videoRef}
            key="hero-video"
            muted
            loop
            playsInline
            autoPlay
            style={{
              position: 'absolute',
              top: '50%', left: '50%',
              width: '177.78vh',
              height: '100vh',
              minWidth: '100%',
              minHeight: '56.25vw',
              transform: 'translate(-50%, -50%) scale(1.1)',
              objectFit: 'cover',
              filter: 'brightness(0.8)',
            }}
          >
            <source src={slide.videoSrc} type="video/mp4" />
          </video>
        ) : (
          <div style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            backgroundImage: `url(${slide.bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.7)',
          }} />
        )}
      </div>

      {/* Text Content */}
      <div style={{
        position: 'relative', zIndex: 2,
        height: '100%',
        display: 'flex', alignItems: 'center',
        padding: '0 80px',
        opacity: fade ? 1 : 0,
        transition: 'opacity 0.4s ease',
      }}>
        <div style={{ maxWidth: '600px' }}>
          <h1 style={{
            color: '#F4F7EC',
            fontSize: '3.5rem',
            fontWeight: 'bold',
            marginBottom: '20px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            lineHeight: 1.2,
          }}>
            {slide.heading}
          </h1>
          <p style={{
            color: '#F4F7EC',
            fontSize: '1.25rem',
            marginBottom: '30px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
          }}>
            {slide.para}
          </p>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <a href={slide.btn1.href} style={btnPrimary}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              {slide.btn1.label}
            </a>
            <a href={slide.btn2.href} style={btnSecondary}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = '#F4F7EC';
                e.currentTarget.style.color = '#306F74';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#F4F7EC';
              }}
            >
              {slide.btn2.label}
            </a>
          </div>
        </div>
      </div>

      {/* Dot Indicators */}
      <div style={{
        position: 'absolute', bottom: '20px', left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', gap: '10px', zIndex: 3,
      }}>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            style={{
              width: '12px', height: '12px',
              borderRadius: '50%',
              background: i === current ? '#F4F7EC' : 'rgba(48,111,116,0.7)',
              border: '2px solid #F4F7EC',
              cursor: 'pointer',
              padding: 0,
              transition: 'background 0.3s',
            }}
          />
        ))}
      </div>

      {/* Prev / Next Arrows */}
      <button onClick={prev} style={controlBtn('left')}>&#8249;</button>
      <button onClick={next} style={controlBtn('right')}>&#8250;</button>
    </section>
  );
};

const btnPrimary = {
  padding: '15px 30px',
  backgroundColor: '#306F74',
  color: 'white',
  textTransform: 'uppercase',
  textDecoration: 'none',
  borderRadius: '50px',
  fontSize: '1rem',
  transition: 'all 0.3s',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  display: 'inline-block',
};

const btnSecondary = {
  ...btnPrimary,
  backgroundColor: 'transparent',
  border: '2px solid #F4F7EC',
  color: '#F4F7EC',
};

const controlBtn = (side) => ({
  position: 'absolute',
  top: '50%',
  [side]: '15px',
  transform: 'translateY(-50%)',
  background: 'rgba(48, 111, 116, 0.7)',
  border: 'none',
  color: 'white',
  fontSize: '40px',
  width: '45px',
  height: '45px',
  borderRadius: '50%',
  cursor: 'pointer',
  zIndex: 3,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export default HeroCarousel;
