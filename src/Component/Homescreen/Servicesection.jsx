import React, { useState, useEffect, useRef } from 'react';

const Servicesection = () => {
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

  // Services data with images and content
  const servicesData = [
    {
      id: 1,
      title: "Strategy",
      subtitle: "Smart Strategies That Drive Real Growth",
      description: "Unlock your brand's full potential with data-driven digital strategies. Using deep analytics, AI insights, and real-time market intelligence, we design tailored plans that increase visibility, engagement, and ROI—consistently and measurably.",
      image: "./Homescreen/Strategy.avif",
      icon: "⭐",
      color: "#667eea"
    },
    {
      id: 2,
      title: "Creative Designing",
      subtitle: "Creatives That Make Your Brand Unforgettable",
      description: "From stunning graphics to immersive videos and scroll-stopping social content—our creative team crafts visuals that captivate audiences and strengthen brand presence. Creativity that not only looks good, but performs even better.",
      image: "./Homescreen/creative.avif",
      icon: "🎨",
      color: "#f093fb"
    },
    {
      id: 3,
      title: "Web Development",
      subtitle: "High-Performance Websites Built for Results",
      description: "We create fast, secure, and seamless digital experiences—websites and apps engineered for scalability and performance. Whether it's an intuitive business site or a feature-rich application, our development ensures your brand stands strong online.",
      image: "./Homescreen/Web.avif",
      icon: "💻",
      color: "#4facfe"
    },
    {
      id: 4,
      title: "Digital Marketing",
      subtitle: "AI-Powered Marketing That Converts",
      description: "Boost traffic, amplify engagement, and increase conversions with targeted, data-backed digital marketing. Using automation, analytics, and smart AI optimizations, we deliver campaigns that produce measurable results across every platform.",
      image: "./Homescreen/Marketing.avif",
      icon: "🚀",
      color: "#43e97b"
    },
    {
      id: 5,
      title: "ADA Compliance",
      subtitle: "Accessibility That Protects & Empowers Your Brand",
      description: "Ensure your website meets ADA standards with inclusive, legally compliant accessibility solutions. From contrast and navigation fixes to full WCAG alignment, we help you create an online experience accessible to everyone—while protecting your brand from compliance risks.",
      image: "./Homescreen/ADA.avif",
      icon: "♿",
      color: "#ff9a9e"
    }
  ];

  // Inline Styles
  const styles = {
    // Main Container
    container: {
      background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
      padding: isMobile ? '50px 20px' : '80px 5%',
      fontFamily: "'Inter', sans-serif",
      color: '#333333'
    },

    // Content Wrapper
    contentWrapper: {
      maxWidth: '1200px',
      width: '100%',
      margin: '0 auto'
    },

    // Header Section
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: isMobile ? '40px' : '60px',
      flexDirection: isMobile ? 'column' : 'row',
      gap: isMobile ? '20px' : '0'
    },

    headerLeft: {
      textAlign: isMobile ? 'center' : 'left'
    },

    title: {
      fontSize: isMobile ? '2rem' : 'clamp(2.5rem, 4vw, 3.5rem)',
      fontWeight: '800',
   
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'black ',
      backgroundClip: 'text',
      marginBottom: '10px',
      lineHeight: '1.2'
    },

    subtitle: {
      fontSize: isMobile ? '1rem' : '1.1rem',
      color: '#64748b',
      margin: '0'
    },

    allServicesButton: {
      background: 'black',
      color: 'white',
      border: 'none',
      padding: isMobile ? '12px 24px' : '14px 32px',
      borderRadius: '25px',
      fontSize: isMobile ? '14px' : '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },

    buttonHover: {
      transform: 'translateY(-3px)',
      boxShadow: '0 12px 35px rgba(102, 126, 234, 0.4)'
    },

    // Services Grid
    servicesGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
      gap: isMobile ? '25px' : '40px'
    },

    // Service Card
    serviceCard: {
      background: 'white',
      borderRadius: '25px',
      overflow: 'hidden',
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
      transition: 'all 0.4s ease',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
      cursor: 'pointer',
      position: 'relative'
    },

    serviceCardHover: {
      transform: 'translateY(-10px)',
      boxShadow: '0 25px 60px rgba(0, 0, 0, 0.15)'
    },

    // Card Image
    cardImage: {
      width: '100%',
      height: isMobile ? '200px' : '250px',
      objectFit: 'cover',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative'
    },

    imageOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.8) 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: 0,
      transition: 'all 0.3s ease'
    },

    imageOverlayHover: {
      opacity: 1
    },

    overlayIcon: {
      fontSize: '4rem',
      color: 'white',
      transform: 'scale(0.8)',
      transition: 'all 0.3s ease'
    },

    overlayIconHover: {
      transform: 'scale(1)'
    },

    // Card Content
    cardContent: {
      padding: isMobile ? '25px 20px' : '35px 30px',
      position: 'relative'
    },

    serviceIcon: {
      position: 'absolute',
      top: '-25px',
      right: '30px',
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.5rem',
      color: 'white',
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)'
    },

    serviceTitle: {
      fontSize: isMobile ? '1.3rem' : '1.5rem',
      fontWeight: '700',
      color: '#1e293b',
      marginBottom: '10px',
      lineHeight: '1.3',
      paddingRight: '60px'
    },

    serviceSubtitle: {
      fontSize: isMobile ? '1rem' : '1.1rem',
      fontWeight: '600',
      color: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      marginBottom: '15px',
      lineHeight: '1.4'
    },

    serviceDescription: {
      fontSize: isMobile ? '0.9rem' : '1rem',
      color: '#64748b',
      lineHeight: '1.6',
      marginBottom: '20px'
    },

    learnMoreButton: {
      background: 'transparent',
      color: '#667eea',
      border: '2px solid #667eea',
      padding: '8px 20px',
      borderRadius: '20px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '5px'
    },

    learnMoreHover: {
      background: '#667eea',
      color: 'white',
      transform: 'translateX(5px)'
    },

    // Animation Delays
    delay1: { transitionDelay: '0.1s' },
    delay2: { transitionDelay: '0.2s' },
    delay3: { transitionDelay: '0.3s' },
    delay4: { transitionDelay: '0.4s' },
    delay5: { transitionDelay: '0.5s' }
  };

  return (
    <section style={styles.container} ref={sectionRef}>
      <div style={styles.contentWrapper}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <h2 style={styles.title}>Our Services</h2>
            <p style={styles.subtitle}>Comprehensive digital solutions for your business growth</p>
          </div>
          
          <button
            style={styles.allServicesButton}
            onMouseEnter={(e) => {
              if (!isMobile) {
                e.target.style.transform = styles.buttonHover.transform;
                e.target.style.boxShadow = styles.buttonHover.boxShadow;
              }
            }}
            onMouseLeave={(e) => {
              if (!isMobile) {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = styles.allServicesButton.boxShadow;
              }
            }}
          >
            All Services →
          </button>
        </div>

        {/* Services Grid */}
        <div style={styles.servicesGrid}>
          {servicesData.map((service, index) => (
            <div
              key={service.id}
              style={{
                ...styles.serviceCard,
                ...styles[`delay${index + 1}`]
              }}
              onMouseEnter={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.transform = styles.serviceCardHover.transform;
                  e.currentTarget.style.boxShadow = styles.serviceCardHover.boxShadow;
                  
                  // Show overlay
                  const overlay = e.currentTarget.querySelector('.image-overlay');
                  if (overlay) overlay.style.opacity = '1';
                  
                  const overlayIcon = e.currentTarget.querySelector('.overlay-icon');
                  if (overlayIcon) overlayIcon.style.transform = 'scale(1)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = styles.serviceCard.boxShadow;
                  
                  // Hide overlay
                  const overlay = e.currentTarget.querySelector('.image-overlay');
                  if (overlay) overlay.style.opacity = '0';
                  
                  const overlayIcon = e.currentTarget.querySelector('.overlay-icon');
                  if (overlayIcon) overlayIcon.style.transform = 'scale(0.8)';
                }
              }}
            >
              {/* Card Image with Overlay */}
              <div
                style={{
                  ...styles.cardImage,
                  backgroundImage: `url(${service.image})`
                }}
              >
                <div 
                  className="image-overlay"
                  style={styles.imageOverlay}
                >
                  <div 
                    className="overlay-icon"
                    style={styles.overlayIcon}
                  >
                    {service.icon}
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div style={styles.cardContent}>
                {/* Floating Icon */}
                <div 
                  style={{
                    ...styles.serviceIcon,
                    background: service.color
                  }}
                >
                  {service.icon}
                </div>

                <h3 style={styles.serviceTitle}>{service.title}</h3>
                <p style={styles.serviceSubtitle}>{service.subtitle}</p>
                <p style={styles.serviceDescription}>{service.description}</p>
                
                <button
                  style={styles.learnMoreButton}
                  onMouseEnter={(e) => {
                    if (!isMobile) {
                      e.target.style.background = styles.learnMoreHover.background;
                      e.target.style.color = styles.learnMoreHover.color;
                      e.target.style.transform = styles.learnMoreHover.transform;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isMobile) {
                      e.target.style.background = styles.learnMoreButton.background;
                      e.target.style.color = styles.learnMoreButton.color;
                      e.target.style.transform = 'translateX(0)';
                    }
                  }}
                >
                  Learn More →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Servicesection;