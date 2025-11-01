import React, { useState, useEffect } from 'react';

const Homepage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Background images with corresponding texts
  const slides = [
    {
      bgImage: './Homescreen/Home8.avif',
      title: 'AI-Powered Solutions',
      subtitle: 'Transforming businesses with cutting-edge artificial intelligence',
      description: 'Harness the power of machine learning and neural networks to drive innovation and growth.',
      cta: 'Explore AI Solutions'
    },
    {
      bgImage: './Homescreen/Home5.jpg',
      title: 'Machine Learning',
      subtitle: 'Intelligent algorithms that learn and adapt',
      description: 'Our ML models continuously improve, providing smarter insights and better outcomes over time.',
      cta: 'Learn About ML'
    },
    {
      bgImage: './Homescreen/Home7.avif',
      title: 'Deep Learning',
      subtitle: 'Advanced neural networks for complex problems',
      description: 'Solve intricate challenges with our deep learning architectures and sophisticated AI systems.',
      cta: 'Discover Deep Learning'
    },
    {
      bgImage: './Homescreen/Home6.webp',
      title: 'Future Technology',
      subtitle: 'Pioneering the next generation of AI',
      description: 'Stay ahead of the curve with our research-driven approach to artificial intelligence development.',
      cta: 'See Our Research'
    }
  ];

  // Auto slide change
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  // Animation on component mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Manual slide navigation
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Inline Styles
  const styles = {
    // Main Container
    homepageHero: {
      position: 'relative',
      height: '100vh',
      width: '100%',
      overflow: 'hidden',
      fontFamily: "'Inter', sans-serif"
    },

    // Slides Container
    slidesContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%'
    },

    slide: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      opacity: 0,
      transition: 'opacity 1.5s ease-in-out, transform 1.5s ease-in-out',
      transform: 'scale(1.1)'
    },

    activeSlide: {
      opacity: 1,
      transform: 'scale(1)'
    },

    // Overlay
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(102, 126, 234, 0.3) 50%, rgba(118, 75, 162, 0.2) 100%)'
    },

    // Hero Content
    heroContent: {
      position: 'relative',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      padding: '0 5%',
      opacity: 0,
      transform: 'translateY(50px)',
      transition: 'all 1s ease-in-out 0.5s'
    },

    visibleHeroContent: {
      opacity: 1,
      transform: 'translateY(0)'
    },

    contentWrapper: {
      maxWidth: '1200px',
      width: '100%',
      margin: '0 auto'
    },

    textContent: {
      maxWidth: '600px',
      color: 'white'
    },

    // Badge
    badge: {
      display: 'inline-flex',
      alignItems: 'center',
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      padding: '8px 16px',
      borderRadius: '25px',
      marginBottom: '30px',
      fontSize: '14px',
      fontWeight: '600',
      letterSpacing: '0.5px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      animation: 'fadeInUp 0.8s ease-out 0.2s both'
    },

    pulseDot: {
      width: '8px',
      height: '8px',
      background: '#00ff88',
      borderRadius: '50%',
      marginRight: '8px',
      animation: 'pulse 2s infinite'
    },

    // Main Title
    mainTitle: {
      fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
      fontWeight: '800',
      lineHeight: '1.1',
      marginBottom: '20px',
      background: 'linear-gradient(135deg, #ffffff 0%, #a8b1ff 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      animation: 'fadeInUp 0.8s ease-out 0.4s both'
    },

    titleLine: {
      display: 'inline-block',
      animation: 'slideInFromLeft 1s ease-out 0.6s both'
    },

    // Subtitle
    subtitle: {
      fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
      fontWeight: '500',
      marginBottom: '20px',
      color: 'rgba(255, 255, 255, 0.9)',
      animation: 'fadeInUp 0.8s ease-out 0.6s both'
    },

    // Description
    description: {
      fontSize: '1.1rem',
      lineHeight: '1.6',
      marginBottom: '40px',
      color: 'rgba(255, 255, 255, 0.8)',
      maxWidth: '500px',
      animation: 'fadeInUp 0.8s ease-out 0.8s both'
    },

    // CTA Buttons
    ctaButtons: {
      display: 'flex',
      gap: '20px',
      marginBottom: '50px',
      flexWrap: 'wrap',
      animation: 'fadeInUp 0.8s ease-out 1s both'
    },

    btn: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      padding: '15px 30px',
      border: 'none',
      borderRadius: '50px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textDecoration: 'none',
      position: 'relative',
      overflow: 'hidden'
    },

    btnPrimary: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)'
    },

    btnSecondary: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      color: 'white',
      border: '2px solid rgba(255, 255, 255, 0.2)'
    },

    btnHover: {
      transform: 'translateY(-3px)',
      boxShadow: '0 12px 35px rgba(102, 126, 234, 0.4)'
    },

    btnSecondaryHover: {
      background: 'rgba(255, 255, 255, 0.2)',
      transform: 'translateY(-3px)'
    },

    // Stats
    stats: {
      display: 'flex',
      gap: '40px',
      animation: 'fadeInUp 0.8s ease-out 1.2s both'
    },

    statItem: {
      textAlign: 'center'
    },

    statNumber: {
      fontSize: '2rem',
      fontWeight: '700',
      background: 'linear-gradient(135deg, #00ff88 0%, #00ccff 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      marginBottom: '5px'
    },

    statLabel: {
      fontSize: '0.9rem',
      color: 'rgba(255, 255, 255, 0.7)',
      fontWeight: '500'
    },

    // Slide Navigation
    slideNavigation: {
      position: 'absolute',
      bottom: '50px',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      alignItems: 'center',
      gap: '30px',
      zIndex: 3
    },

    navBtn: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      color: 'white',
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '20px'
    },

    navBtnHover: {
      background: 'rgba(255, 255, 255, 0.2)',
      transform: 'scale(1.1)'
    },

    slideDots: {
      display: 'flex',
      gap: '10px'
    },

    dot: {
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      border: 'none',
      background: 'rgba(255, 255, 255, 0.3)',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },

    activeDot: {
      background: '#667eea',
      transform: 'scale(1.2)'
    },

    dotHover: {
      background: 'rgba(255, 255, 255, 0.5)'
    },

    // Scroll Indicator
    scrollIndicator: {
      position: 'absolute',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      textAlign: 'center',
      color: 'rgba(255, 255, 255, 0.7)',
      zIndex: 3,
      animation: 'bounce 2s infinite'
    },

    scrollText: {
      fontSize: '12px',
      marginBottom: '5px',
      letterSpacing: '1px'
    },

    scrollArrow: {
      fontSize: '18px'
    },

    // Mobile Styles
    mobileHeroContent: {
      padding: '0 20px',
      textAlign: 'center'
    },

    mobileTextContent: {
      maxWidth: '100%'
    },

    mobileMainTitle: {
      fontSize: 'clamp(2rem, 8vw, 3rem)'
    },

    mobileSubtitle: {
      fontSize: '1.2rem'
    },

    mobileDescription: {
      fontSize: '1rem',
      maxWidth: '100%'
    },

    mobileCtaButtons: {
      justifyContent: 'center',
      gap: '15px'
    },

    mobileBtn: {
      padding: '12px 25px',
      fontSize: '14px'
    },

    mobileStats: {
      justifyContent: 'center',
      gap: '30px'
    },

    mobileStatNumber: {
      fontSize: '1.5rem'
    },

    mobileSlideNavigation: {
      bottom: '30px',
      gap: '20px'
    },

    mobileNavBtn: {
      width: '40px',
      height: '40px',
      fontSize: '16px'
    },

    mobileBadge: {
      fontSize: '12px',
      padding: '6px 12px'
    },

    // Small Mobile
    smallMobileCtaButtons: {
      flexDirection: 'column',
      alignItems: 'center'
    },

    smallMobileBtn: {
      width: '100%',
      maxWidth: '250px',
      justifyContent: 'center'
    },

    smallMobileStats: {
      gap: '20px'
    },

    smallMobileStatItem: {
      flex: 1
    },

    smallMobileStatNumber: {
      fontSize: '1.3rem'
    },

    smallMobileStatLabel: {
      fontSize: '0.8rem'
    },

    smallMobileSlideNavigation: {
      gap: '15px'
    }
  };

  // Animation styles as style tag
  const animationStyles = `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes slideInFromLeft {
      from {
        opacity: 0;
        transform: translateX(-50px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    @keyframes pulse {
      0%, 100% {
        transform: scale(1);
        opacity: 1;
      }
      50% {
        transform: scale(1.2);
        opacity: 0.7;
      }
    }
    
    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% {
        transform: translateX(-50%) translateY(0);
      }
      40% {
        transform: translateX(-50%) translateY(-10px);
      }
      60% {
        transform: translateX(-50%) translateY(-5px);
      }
    }
  `;

  // Check screen size for responsive styles
  const isMobile = window.innerWidth <= 768;
  const isSmallMobile = window.innerWidth <= 480;

  return (
    <section style={styles.homepageHero}>
      {/* Animation Styles */}
      <style>{animationStyles}</style>

      {/* Background Slides */}
      <div style={styles.slidesContainer}>
        {slides.map((slide, index) => (
          <div
            key={index}
            style={{
              ...styles.slide,
              ...(index === currentSlide ? styles.activeSlide : {}),
              backgroundImage: `url(${slide.bgImage})`
            }}
          />
        ))}
        
        {/* Overlay */}
        <div style={styles.overlay}></div>
      </div>

      {/* Content */}
      <div style={{
        ...styles.heroContent,
        ...(isVisible ? styles.visibleHeroContent : {}),
        ...(isMobile ? styles.mobileHeroContent : {})
      }}>
        <div style={styles.contentWrapper}>
          <div style={{
            ...styles.textContent,
            ...(isMobile ? styles.mobileTextContent : {})
          }}>
            {/* Badge */}
            <div style={styles.badge}>
              <span style={styles.pulseDot}></span>
              Innovative AI Solutions
            </div>
            
            {/* Main Title */}
            <h1 style={{
              ...styles.mainTitle,
              ...(isMobile ? styles.mobileMainTitle : {})
            }}>
              <span style={styles.titleLine}>{slides[currentSlide].title}</span>
            </h1>
            
            {/* Subtitle */}
            <h2 style={{
              ...styles.subtitle,
              ...(isMobile ? styles.mobileSubtitle : {})
            }}>
              {slides[currentSlide].subtitle}
            </h2>
            
            {/* Description */}
            <p style={{
              ...styles.description,
              ...(isMobile ? styles.mobileDescription : {})
            }}>
              {slides[currentSlide].description}
            </p>

            {/* CTA Buttons */}
            <div style={{
              ...styles.ctaButtons,
              ...(isMobile ? styles.mobileCtaButtons : {}),
              ...(isSmallMobile ? styles.smallMobileCtaButtons : {})
            }}>
              <button 
                style={{
                  ...styles.btn,
                  ...styles.btnPrimary,
                  ...(isMobile ? styles.mobileBtn : {})
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = styles.btnHover.transform;
                  e.target.style.boxShadow = styles.btnHover.boxShadow;
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = styles.btnPrimary.boxShadow;
                }}
              >
                {slides[currentSlide].cta}
                <span style={{ transition: 'transform 0.3s ease' }}>→</span>
              </button>
              
              <button 
                style={{
                  ...styles.btn,
                  ...styles.btnSecondary,
                  ...(isMobile ? styles.mobileBtn : {})
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = styles.btnSecondaryHover.background;
                  e.target.style.transform = styles.btnSecondaryHover.transform;
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = styles.btnSecondary.background;
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Watch Demo
                <span style={{ transition: 'transform 0.3s ease' }}>▶</span>
              </button>
            </div>

            {/* Stats */}
            <div style={{
              ...styles.stats,
              ...(isMobile ? styles.mobileStats : {}),
              ...(isSmallMobile ? styles.smallMobileStats : {})
            }}>
              <div style={{
                ...styles.statItem,
                ...(isSmallMobile ? styles.smallMobileStatItem : {})
              }}>
                <div style={{
                  ...styles.statNumber,
                  ...(isMobile ? styles.mobileStatNumber : {}),
                  ...(isSmallMobile ? styles.smallMobileStatNumber : {})
                }}>50+</div>
                <div style={styles.statLabel}>AI Projects</div>
              </div>
              
              <div style={{
                ...styles.statItem,
                ...(isSmallMobile ? styles.smallMobileStatItem : {})
              }}>
                <div style={{
                  ...styles.statNumber,
                  ...(isMobile ? styles.mobileStatNumber : {}),
                  ...(isSmallMobile ? styles.smallMobileStatNumber : {})
                }}>98%</div>
                <div style={styles.statLabel}>Accuracy</div>
              </div>
              
              <div style={{
                ...styles.statItem,
                ...(isSmallMobile ? styles.smallMobileStatItem : {})
              }}>
                <div style={{
                  ...styles.statNumber,
                  ...(isMobile ? styles.mobileStatNumber : {}),
                  ...(isSmallMobile ? styles.smallMobileStatNumber : {})
                }}>24/7</div>
                <div style={styles.statLabel}>Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Navigation */}
      <div style={{
        ...styles.slideNavigation,
        ...(isMobile ? styles.mobileSlideNavigation : {}),
        ...(isSmallMobile ? styles.smallMobileSlideNavigation : {})
      }}>
        <button 
          style={{
            ...styles.navBtn,
            ...(isMobile ? styles.mobileNavBtn : {})
          }}
          onClick={prevSlide}
          onMouseEnter={(e) => {
            e.target.style.background = styles.navBtnHover.background;
            e.target.style.transform = styles.navBtnHover.transform;
          }}
          onMouseLeave={(e) => {
            e.target.style.background = styles.navBtn.background;
            e.target.style.transform = 'scale(1)';
          }}
        >
          ‹
        </button>
        
        <div style={styles.slideDots}>
          {slides.map((_, index) => (
            <button
              key={index}
              style={{
                ...styles.dot,
                ...(index === currentSlide ? styles.activeDot : {})
              }}
              onClick={() => goToSlide(index)}
              onMouseEnter={(e) => {
                if (index !== currentSlide) {
                  e.target.style.background = styles.dotHover.background;
                }
              }}
              onMouseLeave={(e) => {
                if (index !== currentSlide) {
                  e.target.style.background = styles.dot.background;
                }
              }}
            />
          ))}
        </div>
        
        <button 
          style={{
            ...styles.navBtn,
            ...(isMobile ? styles.mobileNavBtn : {})
          }}
          onClick={nextSlide}
          onMouseEnter={(e) => {
            e.target.style.background = styles.navBtnHover.background;
            e.target.style.transform = styles.navBtnHover.transform;
          }}
          onMouseLeave={(e) => {
            e.target.style.background = styles.navBtn.background;
            e.target.style.transform = 'scale(1)';
          }}
        >
          ›
        </button>
      </div>

      {/* Scroll Indicator */}
      <div style={styles.scrollIndicator}>
        <div style={styles.scrollText}>Scroll Down</div>
        <div style={styles.scrollArrow}>↓</div>
      </div>
    </section>
  );
};

export default Homepage;