import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);
  const navigate = useNavigate();

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

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleButtonClick = () => {
    navigate('/Signup');
  };

  const faqData = [
    {
      question: "What services does your agency offer?",
      answer: "We offer a comprehensive range of digital marketing services including SEO, PPC advertising, social media marketing, content creation, web development, and analytics. Our team creates customized strategies to help your business grow online.",
      icon: "🚀",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    {
      question: "Do you work with businesses in all industries?",
      answer: "Yes, we have experience working with businesses across various industries including e-commerce, healthcare, technology, education, and professional services. We tailor our approach to meet the unique needs of each industry.",
      icon: "💼",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    },
    {
      question: "Can you help us target audiences in different countries?",
      answer: "Absolutely! We have expertise in international marketing and can create targeted campaigns for audiences in multiple countries. We consider cultural nuances, local trends, and regional platforms to ensure maximum impact.",
      icon: "🌍",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
    },
    {
      question: "How do you measure the success of your campaigns?",
      answer: "We use a data-driven approach with key performance indicators (KPIs) like conversion rates, ROI, engagement metrics, and traffic analysis. Regular reports and analytics help us optimize campaigns for better results.",
      icon: "📊",
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
    }
  ];

  const styles = {
    // Main Container with Animated Background
    container: {
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      padding: isMobile ? '60px 20px' : '80px 20px',
      fontFamily: "'Inter', sans-serif",
      color: 'white',
      minHeight: '50vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden'
    },

    // Animated Background Elements
    floatingOrbs: {
      position: 'absolute',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(102,126,234,0.1) 0%, rgba(102,126,234,0) 70%)',
      animation: 'float 6s ease-in-out infinite'
    },

    // Content Wrapper
    contentWrapper: {
      maxWidth: '1200px',
      width: '100%',
      margin: '0 auto',
      position: 'relative',
      zIndex: 2
    },

    // Header Section with Animation
    header: {
      textAlign: 'center',
      marginBottom: isMobile ? '40px' : '60px',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: 'all 0.8s ease-out'
    },

    title: {
      fontSize: isMobile ? '2.2rem' : 'clamp(2.5rem, 5vw, 4rem)',
      fontWeight: '800',
      marginBottom: '20px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'white',
      backgroundClip: 'text',
      backgroundSize: '200% 200%',
      animation: 'gradientShift 3s ease infinite'
    },

    subtitle: {
      fontSize: isMobile ? '1rem' : 'clamp(1.1rem, 3vw, 1.3rem)',
      color: '#cbd5e1',
      maxWidth: '600px',
      margin: '0 auto',
      lineHeight: '1.6',
      opacity: 0.9
    },

    // Main Content Row - Row-wise for web, Column-wise for mobile
    mainContent: {
      display: isMobile ? 'flex' : 'grid',
      flexDirection: isMobile ? 'column' : 'unset',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
      gap: isMobile ? '40px' : '60px',
      alignItems: 'start'
    },

    // FAQ Items Container - Left Side for web, Top for mobile
    faqContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      order: isMobile ? 1 : 'unset' // FAQ first on mobile
    },

    // FAQ Item with Advanced Animations
    faqItem: {
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '20px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      overflow: 'hidden',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      backdropFilter: 'blur(10px)',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateX(0)' : 'translateX(-50px)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
    },

    faqItemActive: {
      background: 'rgba(255, 255, 255, 0.08)',
      borderColor: 'rgba(102, 126, 234, 0.4)',
      boxShadow: '0 20px 40px rgba(102, 126, 234, 0.2)',
      transform: 'scale(1.02)'
    },

    // Question Button with Icon
    questionButton: {
      width: '100%',
      padding: isMobile ? '22px 20px' : '28px 24px',
      background: 'none',
      border: 'none',
      color: 'white',
      fontSize: isMobile ? '1rem' : 'clamp(1.1rem, 4vw, 1.3rem)',
      fontWeight: '600',
      textAlign: 'left',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: isMobile ? '15px' : '20px',
      transition: 'all 0.3s ease',
      position: 'relative'
    },

    questionIcon: {
      fontSize: isMobile ? '1.5rem' : '2rem',
      width: isMobile ? '50px' : '60px',
      height: isMobile ? '50px' : '60px',
      borderRadius: '15px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(255, 255, 255, 0.1)',
      flexShrink: 0,
      transition: 'all 0.3s ease'
    },

    questionText: {
      flex: 1,
      lineHeight: '1.4'
    },

    // Animated Arrow
    arrow: {
      fontSize: isMobile ? '1.2rem' : '1.5rem',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      flexShrink: 0,
      opacity: 0.7,
      transform: 'rotate(0deg)'
    },

    arrowActive: {
      transform: 'rotate(180deg)',
      opacity: 1
    },

    // Answer Section with Slide-down Animation
    answer: {
      padding: '0 20px',
      maxHeight: '0',
      overflow: 'hidden',
      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
      color: '#e2e8f0',
      fontSize: isMobile ? '0.95rem' : 'clamp(1rem, 4vw, 1.1rem)',
      lineHeight: '1.7',
      borderTop: '1px solid transparent'
    },

    answerActive: {
      padding: isMobile ? '0 20px 22px 85px' : '0 24px 28px 104px',
      maxHeight: '500px',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)'
    },

    answerText: {
      margin: '0',
      opacity: 0,
      transform: 'translateY(10px)',
      transition: 'all 0.3s ease 0.2s'
    },

    answerTextActive: {
      opacity: 1,
      transform: 'translateY(0)'
    },

    // Right Side Content - Button Section (Right for web, Bottom for mobile)
    rightSide: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '30px',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateX(0)' : isMobile ? 'translateY(30px)' : 'translateX(50px)',
      transition: 'all 0.8s ease-out 0.3s',
      height: '100%',
      padding: isMobile ? '0' : '40px',
      order: isMobile ? 2 : 'unset' // Button section second on mobile (bottom)
    },

    // CTA Section - Right Side for web, Bottom for mobile
    ctaSection: {
      textAlign: 'center',
      padding: isMobile ? '30px 25px' : '50px 40px',
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '25px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      width: '100%',
      maxWidth: isMobile ? '100%' : '400px'
    },

    ctaTitle: {
      fontSize: isMobile ? '1.4rem' : '1.8rem',
      fontWeight: '700',
      marginBottom: '15px',
      color: 'white',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'white',
      backgroundClip: 'text',
      lineHeight: '1.3'
    },

    ctaDescription: {
      color: '#cbd5e1',
      marginBottom: '25px',
      fontSize: isMobile ? '1rem' : '1.1rem',
      lineHeight: '1.6'
    },

    ctaButton: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      border: 'none',
      padding: isMobile ? '16px 35px' : '18px 45px',
      borderRadius: '30px',
      fontSize: isMobile ? '1.1rem' : '1.2rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden',
      width: '100%',
      maxWidth: isMobile ? '100%' : '250px'
    },

    buttonGlow: {
      position: 'absolute',
      top: '0',
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
      transition: 'left 0.5s ease'
    },

    // Additional Info Cards
    infoCard: {
      background: 'rgba(255, 255, 255, 0.05)',
      padding: isMobile ? '25px' : '30px',
      borderRadius: '20px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      textAlign: 'center',
      width: '100%',
      maxWidth: isMobile ? '100%' : '400px'
    },

    infoIcon: {
      fontSize: isMobile ? '2.5rem' : '3rem',
      marginBottom: '15px'
    },

    infoTitle: {
      fontSize: isMobile ? '1.2rem' : '1.3rem',
      fontWeight: '600',
      marginBottom: '12px',
      color: 'white'
    },

    infoText: {
      color: '#cbd5e1',
      fontSize: isMobile ? '0.95rem' : '1rem',
      lineHeight: '1.6'
    }
  };

  // Animation delays for staggered effect
  const getItemDelay = (index) => ({
    transitionDelay: `${index * 0.1}s`,
    transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
  });

  return (
    <section style={styles.container} ref={sectionRef}>
      {/* Animated Background Orbs */}
      <div style={{...styles.floatingOrbs, width: '300px', height: '300px', top: '10%', left: '5%', animationDelay: '0s'}}></div>
      <div style={{...styles.floatingOrbs, width: '200px', height: '200px', top: '60%', right: '10%', animationDelay: '2s'}}></div>
      <div style={{...styles.floatingOrbs, width: '150px', height: '150px', bottom: '20%', left: '15%', animationDelay: '4s'}}></div>

      <div style={styles.contentWrapper}>
        {/* Header */}
        <div style={styles.header}>
          <div style={{
            height: '4px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            width: isMobile ? '60px' : '80px',
            margin: '0 auto 30px auto',
            borderRadius: '2px',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
            transition: 'all 0.8s ease-out 0.2s',
            transformOrigin: 'center'
          }}></div>
          <h2 style={styles.title}>Frequently Asked Questions</h2>
          <p style={styles.subtitle}>
            Discover everything you need to know about our innovative solutions and services
          </p>
        </div>

        {/* Main Content Row - Row-wise for web, Column-wise for mobile */}
        <div style={styles.mainContent}>
          {/* Left Side - FAQ Items (Top on mobile) */}
          <div style={styles.faqContainer}>
            {faqData.map((faq, index) => (
              <div
                key={index}
                style={{
                  ...styles.faqItem,
                  ...getItemDelay(index),
                  ...(activeIndex === index ? styles.faqItemActive : {})
                }}
              >
                <button
                  style={styles.questionButton}
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={activeIndex === index}
                >
                  <div 
                    style={{
                      ...styles.questionIcon,
                      background: activeIndex === index ? faq.gradient : 'rgba(255, 255, 255, 0.1)',
                      transform: activeIndex === index ? 'scale(1.1) rotate(5deg)' : 'scale(1)'
                    }}
                  >
                    {faq.icon}
                  </div>
                  <span style={styles.questionText}>{faq.question}</span>
                  <span
                    style={{
                      ...styles.arrow,
                      ...(activeIndex === index ? styles.arrowActive : {})
                    }}
                  >
                    ▼
                  </span>
                </button>
                
                <div
                  style={{
                    ...styles.answer,
                    ...(activeIndex === index ? styles.answerActive : {})
                  }}
                >
                  <p style={{
                    ...styles.answerText,
                    ...(activeIndex === index ? styles.answerTextActive : {})
                  }}>
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side - Button and Additional Info (Bottom on mobile) */}
          <div style={styles.rightSide}>
            {/* Main CTA Button */}
            <div style={styles.ctaSection}>
              <h3 style={styles.ctaTitle}>
                Ready to Transform Your Business?
              </h3>
              <p style={styles.ctaDescription}>
                Let's discuss how we can help you achieve your goals with our innovative solutions
              </p>
              <button 
                style={styles.ctaButton}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-3px)';
                  e.target.style.boxShadow = '0 15px 35px rgba(102, 126, 234, 0.4)';
                  const glow = e.target.querySelector('.button-glow');
                  if (glow) glow.style.left = '100%';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                  const glow = e.target.querySelector('.button-glow');
                  if (glow) glow.style.left = '-100%';
                }}
                onClick={handleButtonClick}
              >
                <span className="button-glow" style={styles.buttonGlow}></span>
                Get Started Today
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add CSS Animations */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
          }
          
          @keyframes gradientShift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }

          .button-glow {
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transition: left 0.5s ease;
          }
        `}
      </style>
    </section>
  );
};

export default FAQ;