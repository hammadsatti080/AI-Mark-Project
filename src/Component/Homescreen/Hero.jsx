import React, { useState, useEffect, useRef } from 'react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);

  // Check screen size and resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Intersection Observer for animation trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Inline Styles - Mobile First Approach
  const styles = {
    // Main Container
    container: {
      background: 'white',
      padding: isMobile ? '30px 15px' : '80px 5%',
      fontFamily: "'Inter', sans-serif",
      minHeight: isMobile ? 'auto' : '50vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'black',
      overflow: 'hidden', // Prevent horizontal scroll
      boxSizing: 'border-box'
    },

    // Content Wrapper
    contentWrapper: {
      maxWidth: '1000px',
      width: '100%',
      margin: '0 auto',
      boxSizing: 'border-box'
    },

    // Main Content
    mainContent: {
      textAlign: 'center',
      marginBottom: isMobile ? '30px' : '60px',
      width: '100%',
      boxSizing: 'border-box'
    },

    title: {
      fontSize: isMobile ? '1.8rem' : 'clamp(2.5rem, 5vw, 4rem)',
      fontWeight: '800',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'black',
      backgroundClip: 'text',
      marginBottom: isMobile ? '15px' : '30px',
      lineHeight: '1.2',
      padding: isMobile ? '0 5px' : '0',
      wordWrap: 'break-word',
      overflowWrap: 'break-word'
    },

    description: {
      fontSize: isMobile ? '0.95rem' : 'clamp(1.1rem, 2vw, 1.3rem)',
      color: 'black',
      lineHeight: isMobile ? '1.5' : '1.8',
      maxWidth: '800px',
      margin: '0 auto',
      marginBottom: isMobile ? '25px' : '40px',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      transition: 'all 0.8s ease-out',
      padding: isMobile ? '0 5px' : '0',
      wordWrap: 'break-word',
      overflowWrap: 'break-word'
    },

    // Features Grid
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
      gap: isMobile ? '15px' : '30px',
      marginBottom: isMobile ? '30px' : '50px',
      width: '100%',
      boxSizing: 'border-box'
    },

    featureCard: {
      background: 'purple',
      padding: isMobile ? '20px 15px' : '40px 30px',
      borderRadius: isMobile ? '12px' : '20px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      textAlign: 'center',
      backdropFilter: 'blur(10px)',
      transition: 'all 0.3s ease',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateX(0)' : isMobile ? 'translateX(-20px)' : 'translateY(30px)',
      cursor: isMobile ? 'default' : 'pointer',
      minHeight: isMobile ? 'auto' : '250px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      width: '100%',
      boxSizing: 'border-box',
      margin: '0 auto'
    },

    featureCardHover: {
      background: 'black',
      transform: 'translateY(-8px)',
      boxShadow: '0 15px 40px rgba(102, 126, 234, 0.3)'
    },

    featureIcon: {
      fontSize: isMobile ? '2.5rem' : '3rem',
      marginBottom: isMobile ? '15px' : '20px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'orange',
      backgroundClip: 'text'
    },

    featureTitle: {
      fontSize: isMobile ? '1.2rem' : '1.5rem',
      fontWeight: '700',
      color: 'white',
      marginBottom: isMobile ? '8px' : '15px',
      lineHeight: '1.3',
      wordWrap: 'break-word'
    },

    featureDescription: {
      color: 'white',
      lineHeight: isMobile ? '1.4' : '1.6',
      fontSize: isMobile ? '0.85rem' : '1rem',
      margin: '0',
      wordWrap: 'break-word'
    },

    // Stats Section
    statsSection: {
      display: 'flex',
      justifyContent: 'center',
      gap: isMobile ? '15px' : '50px',
      marginBottom: isMobile ? '30px' : '50px',
      flexWrap: 'wrap',
      width: '100%',
      boxSizing: 'border-box'
    },

    statItem: {
      textAlign: 'center',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateX(0)' : isMobile ? 'translateX(20px)' : 'translateY(20px)',
      transition: 'all 0.6s ease-out',
      flex: isMobile ? '1' : 'auto',
      minWidth: isMobile ? '70px' : 'auto',
      maxWidth: isMobile ? '100px' : 'none'
    },

    statNumber: {
      fontSize: isMobile ? '1.8rem' : '3rem',
      fontWeight: '800',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'orange',
      backgroundClip: 'text',
      marginBottom: isMobile ? '3px' : '10px',
      lineHeight: '1'
    },

    statLabel: {
      fontSize: isMobile ? '0.75rem' : '1.1rem',
      fontWeight: '600',
      color: 'black',
      lineHeight: '1.2',
      wordWrap: 'break-word'
    },

    // Animation Delays
    delay1: {
      transitionDelay: '0.1s'
    },

    delay2: {
      transitionDelay: '0.2s'
    },

    delay3: {
      transitionDelay: '0.3s'
    },

    // Mobile specific fixes
    mobileContainer: {
      maxWidth: '100vw',
      overflowX: 'hidden'
    }
  };

  return (
    <section 
      style={{
        ...styles.container,
        ...(isMobile ? styles.mobileContainer : {})
      }} 
      ref={sectionRef}
    >
      <div style={styles.contentWrapper}>
        {/* Main Content */}
        <div style={styles.mainContent}>
          <h1 style={styles.title}>About AIMarkLabs</h1>
          <p style={styles.description}>
            We're a digital marketing agency committed to delivering results that matter. 
            Our team leverages the latest in AI-driven strategies and data analytics to 
            create customized marketing solutions that help businesses grow.
          </p>
        </div>

        {/* Features Grid */}
        <div style={styles.featuresGrid}>
          <div
            style={{
              ...styles.featureCard,
              ...styles.delay1,
              transform: isVisible ? 'translateX(0)' : isMobile ? 'translateX(-30px)' : 'translateY(30px)'
            }}
            onMouseEnter={(e) => {
              if (!isMobile) {
                e.currentTarget.style.background = styles.featureCardHover.background;
                e.currentTarget.style.transform = styles.featureCardHover.transform;
                e.currentTarget.style.boxShadow = styles.featureCardHover.boxShadow;
              }
            }}
            onMouseLeave={(e) => {
              if (!isMobile) {
                e.currentTarget.style.background = styles.featureCard.background;
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }
            }}
          >
            <div style={styles.featureIcon}>🎯</div>
            <h3 style={styles.featureTitle}>Results-Driven Strategies</h3>
            <p style={styles.featureDescription}>
              Data-backed marketing approaches that deliver measurable outcomes and real business growth.
            </p>
          </div>

          <div
            style={{
              ...styles.featureCard,
              ...styles.delay2,
              transform: isVisible ? 'translateX(0)' : isMobile ? 'translateX(30px)' : 'translateY(30px)'
            }}
            onMouseEnter={(e) => {
              if (!isMobile) {
                e.currentTarget.style.background = styles.featureCardHover.background;
                e.currentTarget.style.transform = styles.featureCardHover.transform;
                e.currentTarget.style.boxShadow = styles.featureCardHover.boxShadow;
              }
            }}
            onMouseLeave={(e) => {
              if (!isMobile) {
                e.currentTarget.style.background = styles.featureCard.background;
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }
            }}
          >
            <div style={styles.featureIcon}>⭐</div>
            <h3 style={styles.featureTitle}>Customer Satisfaction</h3>
            <p style={styles.featureDescription}>
              Exceptional client experiences with 95% satisfaction rate and dedicated support.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div style={styles.statsSection}>
          <div style={{
            ...styles.statItem, 
            ...styles.delay1,
            transform: isVisible ? 'translateX(0)' : isMobile ? 'translateX(-20px)' : 'translateY(20px)'
          }}>
            <div style={styles.statNumber}>95%</div>
            <div style={styles.statLabel}>Satisfaction Rate</div>
          </div>
          
          <div style={{
            ...styles.statItem, 
            ...styles.delay2,
            transform: isVisible ? 'translateX(0)' : isMobile ? 'translateY(20px)' : 'translateY(20px)'
          }}>
            <div style={styles.statNumber}>200+</div>
            <div style={styles.statLabel}>Projects</div>
          </div>
          
          <div style={{
            ...styles.statItem, 
            ...styles.delay3,
            transform: isVisible ? 'translateX(0)' : isMobile ? 'translateX(20px)' : 'translateY(20px)'
          }}>
            <div style={styles.statNumber}>3x</div>
            <div style={styles.statLabel}>Average ROI</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;