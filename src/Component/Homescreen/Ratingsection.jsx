import React, { useState, useEffect, useRef } from 'react';

const RatingSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [counters, setCounters] = useState({
    experience: 0,
    orders: 0,
    clients: 0,
    experts: 0
  });
  
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
      { threshold: 0.2 }
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

  // Counter animation
  useEffect(() => {
    if (isVisible) {
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;

      const targetValues = {
        experience: 15,
        orders: 380,
        clients: 195,
        experts: 75
      };

      const increments = {
        experience: targetValues.experience / steps,
        orders: targetValues.orders / steps,
        clients: targetValues.clients / steps,
        experts: targetValues.experts / steps
      };

      let currentStep = 0;

      const counterInterval = setInterval(() => {
        currentStep++;
        
        setCounters({
          experience: Math.min(Math.floor(increments.experience * currentStep), targetValues.experience),
          orders: Math.min(Math.floor(increments.orders * currentStep), targetValues.orders),
          clients: Math.min(Math.floor(increments.clients * currentStep), targetValues.clients),
          experts: Math.min(Math.floor(increments.experts * currentStep), targetValues.experts)
        });

        if (currentStep >= steps) {
          clearInterval(counterInterval);
          setCounters(targetValues);
        }
      }, stepDuration);

      return () => clearInterval(counterInterval);
    }
  }, [isVisible]);

  // Stats data with enhanced design
  const statsData = [
    {
      id: 'experience',
      number: counters.experience,
      suffix: '+',
      title: 'Yrs of Experience',
      subtitle: 'Digital Marketing Excellence',
      icon: '⏳',
      color: '#FF6B6B',
      animation: 'bounce'
    },
    {
      id: 'orders',
      number: counters.orders,
      suffix: '+',
      title: 'Orders Completed',
      subtitle: 'Successful Projects Delivered',
      icon: '🚀',
      color: '#4ECDC4',
      animation: 'pulse'
    },
    {
      id: 'clients',
      number: counters.clients,
      suffix: '+',
      title: 'Satisfied Clients',
      subtitle: 'Happy Customers Worldwide',
      icon: '⭐',
      color: '#FFD93D',
      animation: 'tada'
    },
    {
      id: 'experts',
      number: counters.experts,
      suffix: '+',
      title: 'Marketing Experts',
      subtitle: 'Professional Team Members',
      icon: '👨‍💻',
      color: '#6BCF7F',
      animation: 'wobble'
    }
  ];

  // Inline Styles
  const styles = {
    // Main Container
    container: {
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      padding: isMobile ? '20px 20px' : '60px 5%',
      fontFamily: "'Inter', sans-serif",
      color: 'white',
      position: 'relative',
      overflow: 'hidden'
    },

    // Content Wrapper
    contentWrapper: {
      maxWidth: '1200px',
      width: '100%',
      margin: '0 auto',
      position: 'relative',
      zIndex: 2
    },

    // Section Header
    header: {
      textAlign: 'center',
      marginBottom: isMobile ? '50px' : '80px'
    },

    title: {
      fontSize: isMobile ? '2.2rem' : 'clamp(2.8rem, 5vw, 4rem)',
      fontWeight: '800',
      background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      marginBottom: '20px',
      lineHeight: '1.2'
    },

    subtitle: {
      fontSize: isMobile ? '1.1rem' : '1.3rem',
      color: 'rgba(255, 255, 255, 0.9)',
      maxWidth: '600px',
      margin: '0 auto',
      lineHeight: '1.6'
    },

    // Stats Grid - 4 cards in 1 row on desktop, 2 cards in 1 row on mobile
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
      gap: isMobile ? '20px' : '30px',
      alignItems: 'stretch'
    },

    // Stat Card
    statCard: {
      background: 'rgba(255, 255, 255, 0.1)',
      padding: isMobile ? '25px 15px' : '40px 25px',
      borderRadius: '25px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      textAlign: 'center',
      backdropFilter: 'blur(15px)',
      transition: 'all 0.4s ease',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0) rotate(0deg)' : 'translateY(50px) rotate(5deg)',
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden',
      minHeight: isMobile ? '180px' : '220px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },

    statCardHover: {
      background: 'rgba(255, 255, 255, 0.15)',
      transform: 'translateY(-10px) scale(1.05)',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
    },

    // Card background effect
    cardGlow: {
      position: 'absolute',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      background: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)',
      opacity: 0,
      transition: 'opacity 0.3s ease'
    },

    cardGlowHover: {
      opacity: 1
    },

    statIcon: {
      fontSize: isMobile ? '2.5rem' : '3.5rem',
      marginBottom: '15px',
      display: 'inline-block',
      padding: '10px',
      borderRadius: '50%',
      background: 'rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(10px)',
      animation: 'iconFloat 3s ease-in-out infinite'
    },

    statNumber: {
      fontSize: isMobile ? '2rem' : 'clamp(2.5rem, 3vw, 3rem)',
      fontWeight: '800',
      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      marginBottom: '8px',
      lineHeight: '1'
    },

    statTitle: {
      fontSize: isMobile ? '1rem' : '1.2rem',
      fontWeight: '700',
      color: 'white',
      marginBottom: '8px',
      lineHeight: '1.3'
    },

    statSubtitle: {
      fontSize: isMobile ? '0.8rem' : '0.9rem',
      color: 'rgba(255, 255, 255, 0.8)',
      lineHeight: '1.4',
      margin: '0'
    },

    // Animation Keyframes
    animationStyles: `
      @keyframes iconFloat {
        0%, 100% { transform: translateY(0px) scale(1); }
        50% { transform: translateY(-5px) scale(1.1); }
      }
      
      @keyframes bounce {
        0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
        40%, 43% { transform: translateY(-15px); }
        70% { transform: translateY(-7px); }
        90% { transform: translateY(-3px); }
      }
      
      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
      }
      
      @keyframes tada {
        0% { transform: scale(1); }
        10%, 20% { transform: scale(0.9) rotate(-3deg); }
        30%, 50%, 70%, 90% { transform: scale(1.1) rotate(3deg); }
        40%, 60%, 80% { transform: scale(1.1) rotate(-3deg); }
        100% { transform: scale(1) rotate(0); }
      }
      
      @keyframes wobble {
        0% { transform: translateX(0%); }
        15% { transform: translateX(-5%) rotate(-5deg); }
        30% { transform: translateX(4%) rotate(3deg); }
        45% { transform: translateX(-3%) rotate(-3deg); }
        60% { transform: translateX(2%) rotate(2deg); }
        75% { transform: translateX(-1%) rotate(-1deg); }
        100% { transform: translateX(0%); }
      }
      
      @keyframes glow {
        0%, 100% { box-shadow: 0 0 20px rgba(255, 255, 255, 0.3); }
        50% { box-shadow: 0 0 40px rgba(255, 255, 255, 0.6); }
      }
    `,

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
    delay4: {
      transitionDelay: '0.4s'
    },

    // Individual icon animations
    bounceAnimation: {
      animation: 'bounce 2s ease infinite'
    },
    pulseAnimation: {
      animation: 'pulse 2s ease-in-out infinite'
    },
    tadaAnimation: {
      animation: 'tada 2s ease-in-out infinite'
    },
    wobbleAnimation: {
      animation: 'wobble 2s ease-in-out infinite'
    }
  };

  return (
    <section style={styles.container} ref={sectionRef}>
      <style>{styles.animationStyles}</style>
      
      <div style={styles.contentWrapper}>
        {/* Header */}
        <div style={styles.header}>
          <h2 style={styles.title}>Why Choose AIMarkLabs?</h2>
          <p style={styles.subtitle}>
            Years of excellence in digital marketing with proven results and satisfied clients worldwide
          </p>
        </div>

        {/* Stats Grid */}
        <div style={styles.statsGrid}>
          {statsData.map((stat, index) => (
            <div
              key={stat.id}
              style={{
                ...styles.statCard,
                ...styles[`delay${index + 1}`]
              }}
              onMouseEnter={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.background = styles.statCardHover.background;
                  e.currentTarget.style.transform = styles.statCardHover.transform;
                  e.currentTarget.style.boxShadow = styles.statCardHover.boxShadow;
                  
                  // Show glow effect
                  const glow = e.currentTarget.querySelector('.card-glow');
                  if (glow) glow.style.opacity = '1';
                }
              }}
              onMouseLeave={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.background = styles.statCard.background;
                  e.currentTarget.style.transform = 'translateY(0) rotate(0deg)';
                  e.currentTarget.style.boxShadow = 'none';
                  
                  // Hide glow effect
                  const glow = e.currentTarget.querySelector('.card-glow');
                  if (glow) glow.style.opacity = '0';
                }
              }}
            >
              {/* Glow Effect */}
              <div 
                className="card-glow"
                style={styles.cardGlow}
              />
              
              {/* Animated Icon */}
              <div 
                style={{
                  ...styles.statIcon,
                  ...styles[`${stat.animation}Animation`]
                }}
              >
                {stat.icon}
              </div>
              
              {/* Counter Number */}
              <div style={styles.statNumber}>
                {stat.number}
                <span style={{ 
                  background: 'linear-gradient(135deg, #ffd89b 0%, #19547b 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  {stat.suffix}
                </span>
              </div>
              
              {/* Title */}
              <h3 style={styles.statTitle}>{stat.title}</h3>
              
              {/* Subtitle */}
              <p style={styles.statSubtitle}>{stat.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RatingSection;