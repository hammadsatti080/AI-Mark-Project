import React, { useState, useEffect, useRef } from 'react';

const Processsection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSmallMobile, setIsSmallMobile] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const sectionRef = useRef(null);

  // Check screen size and resize
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsSmallMobile(width <= 480);
      setIsMobile(width <= 768);
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

  // Process steps data
  const processSteps = [
    {
      id: 1,
      number: '01',
      title: 'Discovery & Research',
      description: 'We begin by understanding your goals, audience, and challenges. Through research, data analysis, and brand insights, we uncover the foundation needed to build a winning strategy.',
      icon: '🔍',
      color: '#667eea'
    },
    {
      id: 2,
      number: '02',
      title: 'Planning & Strategy',
      description: 'Based on our findings, we craft a tailored action plan. From defining objectives to selecting the right digital channels, we set a clear roadmap for success.',
      icon: '📋',
      color: '#4facfe'
    },
    {
      id: 3,
      number: '03',
      title: 'Creative & Development',
      description: 'Our designers and developers bring ideas to life through compelling visuals, seamless interfaces, and high-performance builds—ensuring your brand looks great and functions even better.',
      icon: '🎨',
      color: '#43e97b'
    },
    {
      id: 4,
      number: '04',
      title: 'Execution & Launch',
      description: 'We implement the strategy with precision. Campaigns go live, websites launch, and content rolls out—optimized for maximum impact from day one.',
      icon: '🚀',
      color: '#ff9a9e'
    },
    {
      id: 5,
      number: '05',
      title: 'Optimization & Growth',
      description: 'After launch, we monitor performance, gather analytics, and continuously improve. With regular updates and data-driven enhancements, your brand keeps growing stronger.',
      icon: '📈',
      color: '#f093fb'
    }
  ];

  // Inline Styles
  const styles = {
    // Main Container - FIXED: No horizontal scrolling
    container: {
      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
      padding: isSmallMobile ? '40px 15px' : isMobile ? '50px 20px' : '80px 5%',
      fontFamily: "'Inter', sans-serif",
      color: '#333333',
      position: 'relative',
      minHeight: isSmallMobile ? 'auto' : '100vh',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden', // Prevent horizontal scroll
      width: '100%',
      boxSizing: 'border-box'
    },

    // Content Wrapper - FIXED: Proper width constraints
    contentWrapper: {
      maxWidth: '1200px',
      width: '100%',
      margin: '0 auto',
      padding: '0',
      boxSizing: 'border-box',
      position: 'relative'
    },

    // Header Section - FIXED: Proper text alignment and width
    header: {
      textAlign: 'center',
      marginBottom: isSmallMobile ? '30px' : isMobile ? '40px' : '60px',
      width: '100%',
      padding: '0',
      boxSizing: 'border-box'
    },

    badge: {
      display: 'inline-block',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      color: 'white',
      padding: isSmallMobile ? '8px 20px' : '10px 25px',
      borderRadius: '20px',
      fontSize: isSmallMobile ? '12px' : '14px',
      fontWeight: '600',
      marginBottom: '15px',
      letterSpacing: '0.5px',
      maxWidth: '100%',
      boxSizing: 'border-box'
    },

    title: {
      fontSize: isSmallMobile ? '1.8rem' : isMobile ? '2.2rem' : 'clamp(2.8rem, 5vw, 4rem)',
      fontWeight: '800',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      marginBottom: '15px',
      lineHeight: '1.2',
      padding: '0',
      width: '100%',
      wordWrap: 'break-word',
      boxSizing: 'border-box'
    },

    subtitle: {
      fontSize: isSmallMobile ? '0.95rem' : isMobile ? '1.1rem' : '1.3rem',
      color: '#64748b',
      maxWidth: '600px',
      margin: '0 auto',
      lineHeight: '1.5',
      padding: '0 10px',
      width: '100%',
      boxSizing: 'border-box'
    },

    // Process Container - FIXED: Grid layout with proper constraints
    processContainer: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
      gap: isSmallMobile ? '20px' : isMobile ? '25px' : '50px',
      alignItems: 'start',
      width: '100%',
      boxSizing: 'border-box',
      margin: '0',
      padding: '0'
    },

    // Steps List (Left Side) - FIXED: No overflow
    stepsList: {
      display: 'flex',
      flexDirection: 'column',
      gap: isSmallMobile ? '10px' : '12px',
      width: '100%',
      boxSizing: 'border-box',
      padding: '0',
      margin: '0',
      
    },

    stepItem: {
      background: 'white',
      padding: isSmallMobile ? '15px' : isMobile ? '18px 15px' : '25px 20px',
      borderRadius: isSmallMobile ? '15px' : '20px',
      border: '2px solid transparent',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: isSmallMobile ? '12px' : '15px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.06)',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
      minHeight: isSmallMobile ? '70px' : isMobile ? '80px' : 'auto',
      width: '100%',
      boxSizing: 'border-box',
      margin: '0',
      background:"linear-gradient(135deg, #0f172a 0%, #1e293b 100%)      ",
    },

    stepItemActive: {
      borderColor: '#667eea',
      background: 'red',
      transform: isMobile ? 'translateX(5px)' : 'translateX(10px)',
      boxShadow: '0 8px 25px rgba(102, 126, 234, 0.12)'
    },

    stepNumber: {
      width: isSmallMobile ? '35px' : isMobile ? '40px' : '50px',
      height: isSmallMobile ? '35px' : isMobile ? '40px' : '50px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: isSmallMobile ? '0.9rem' : isMobile ? '1rem' : '1.2rem',
      fontWeight: '800',
      color: 'white',
      transition: 'all 0.3s ease',
      flexShrink: 0,
      boxSizing: 'border-box'
    },

    stepContent: {
      flex: 1,
      minWidth: 0, // Prevents text overflow
      boxSizing: 'border-box',
      overflow: 'hidden',
      
    },

    stepTitle: {
      fontSize: isSmallMobile ? '0.9rem' : isMobile ? '1rem' : '1.1rem',
      fontWeight: '700',
      color: 'white',

      marginBottom: '2px',
      lineHeight: '1.3',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      width: '100%',
      boxSizing: 'border-box'
    },

    stepIcon: {
      fontSize: isSmallMobile ? '1rem' : isMobile ? '1.1rem' : '1.3rem',
      opacity: 0,
      transition: 'all 0.3s ease',
      transform: 'translateX(-8px)',
      flexShrink: 0,
      boxSizing: 'border-box'
    },

    stepIconActive: {
      opacity: 1,
      transform: 'translateX(0)'
    },

    // Step Description (Right Side) - FIXED: Proper width constraints
    stepDescription: {
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)      ',
      padding: isSmallMobile ? '20px 15px' : isMobile ? '25px 20px' : '40px 30px',
      borderRadius: isSmallMobile ? '18px' : '25px',
      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.06)',
      border: '1px solid #f1f5f9',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: 'all 0.5s ease',
      minHeight: isSmallMobile ? '200px' : isMobile ? '250px' : 'auto',
      width: '100%',
      boxSizing: 'border-box',
      margin: '0'
    },

    descriptionHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: isSmallMobile ? '12px' : '15px',
      marginBottom: isSmallMobile ? '15px' : '20px',
      flexWrap: isSmallMobile ? 'wrap' : 'nowrap',
      width: '100%',
      boxSizing: 'border-box'
    },

    descriptionIcon: {
      fontSize: isSmallMobile ? '1.5rem' : isMobile ? '1.8rem' : '2.2rem',
      width: isSmallMobile ? '45px' : isMobile ? '50px' : '60px',
      height: isSmallMobile ? '45px' : isMobile ? '50px' : '60px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      flexShrink: 0,
      boxSizing: 'border-box'
    },

    descriptionTitle: {
      fontSize: isSmallMobile ? '1.2rem' : isMobile ? '1.3rem' : '1.6rem',
      fontWeight: '800',
      color: 'white',
      margin: '0',
      lineHeight: '1.2',
      flex: 1,
      minWidth: 0,
      wordWrap: 'break-word',
      boxSizing: 'border-box'
    },

    descriptionText: {
      fontSize: isSmallMobile ? '0.9rem' : isMobile ? '0.95rem' : '1.05rem',
      color: '#64748b',
      lineHeight: '1.6',
      margin: '0',
      width: '100%',
      boxSizing: 'border-box'
    },

    // Animation Delays
    delay1: { transitionDelay: '0.1s' },
    delay2: { transitionDelay: '0.2s' },
    delay3: { transitionDelay: '0.3s' },
    delay4: { transitionDelay: '0.4s' },
    delay5: { transitionDelay: '0.5s' },

    // Process Line (Visual Connector) - FIXED: Proper positioning
    processLine: {
      position: 'absolute',
      left: isSmallMobile ? '25px' : '32px',
      top: '0',
      bottom: '0',
      width: '2px',
      background: 'linear-gradient(to bottom, #667eea, #764ba2)',
      opacity: 0.2,
      display: isMobile ? 'block' : 'none',
      zIndex: 1
    },

    // Progress Dots - FIXED: Centered and contained
    progressContainer: {
      textAlign: 'center',
      marginTop: isSmallMobile ? '25px' : isMobile ? '30px' : '40px',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      transition: 'all 0.6s ease-out 0.4s',
      width: '100%',
      boxSizing: 'border-box',
      padding: '0 10px'
    },

    progressDots: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '15px',
      width: '100%',
      flexWrap: 'wrap'
    },

    progressDot: {
      width: isSmallMobile ? '8px' : '10px',
      height: isSmallMobile ? '8px' : '10px',
      borderRadius: '50%',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      flexShrink: 0
    },

    progressText: {
      color: '#64748b',
      fontSize: isSmallMobile ? '0.8rem' : '0.9rem',
      fontWeight: '500',
      width: '100%'
    }
  };

  const activeStepData = processSteps.find(step => step.id === activeStep);

  return (
    <section style={styles.container} ref={sectionRef}>
      {/* Process Line for Mobile */}
      <div style={styles.processLine}></div>

      <div style={styles.contentWrapper}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.badge}>OUR PROCESS</div>
        </div>

        {/* Process Content */}
        <div style={styles.processContainer}>
          {/* Steps List - Left Side */}
          <div style={styles.stepsList}>
            {processSteps.map((step, index) => (
              <div
                key={step.id}
                style={{
                  ...styles.stepItem,
                  ...styles[`delay${index + 1}`],
                  ...(activeStep === step.id ? styles.stepItemActive : {})
                }}
                onClick={() => setActiveStep(step.id)}
                onMouseEnter={() => {
                  if (!isMobile) {
                    setActiveStep(step.id);
                  }
                }}
              >
                <div 
                  style={{
                    ...styles.stepNumber,
                    background: step.color,
                    transform: activeStep === step.id ? 'scale(1.05)' : 'scale(1)'
                  }}
                >
                  {step.number}
                </div>
                
                <div style={styles.stepContent}>
                  <h3 style={styles.stepTitle}>{step.title}</h3>
                </div>
                
                <div 
                  style={{
                    ...styles.stepIcon,
                    ...(activeStep === step.id ? styles.stepIconActive : {})
                  }}
                >
                  {step.icon}
                </div>
              </div>
            ))}
          </div>

          {/* Step Description - Right Side */}
          <div style={styles.stepDescription}>
            {activeStepData && (
              <>
                <div style={styles.descriptionHeader}>
                  <div 
                    style={{
                      ...styles.descriptionIcon,
                      background: activeStepData.color
                    }}
                  >
                    {activeStepData.icon}
                  </div>
                  <h3 style={styles.descriptionTitle}>{activeStepData.title}</h3>
                </div>
                
                <p style={styles.descriptionText}>{activeStepData.description}</p>
              </>
            )}
          </div>
        </div>

        {/* Process Progress */}
        <div style={styles.progressContainer}>
          <div style={styles.progressDots}>
            {processSteps.map((step) => (
              <div
                key={step.id}
                style={{
                  ...styles.progressDot,
                  background: activeStep === step.id ? step.color : '#e2e8f0'
                }}
                onClick={() => setActiveStep(step.id)}
              />
            ))}
          </div>
          
          <p style={styles.progressText}>
            Step {activeStep} of {processSteps.length}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Processsection;