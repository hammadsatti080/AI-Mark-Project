import React, { useEffect, useRef, useState } from "react";

const Header = () => {
  const canvasRef = useRef(null);
  const statsRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [counted, setCounted] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Counting animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !counted) {
            startCounting();
            setCounted(true);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, [counted]);

  const startCounting = () => {
    const statNumbers = document.querySelectorAll('.aim-stat-number');
    
    statNumbers.forEach((stat) => {
      const target = parseInt(stat.getAttribute('data-count'));
      const duration = 2000;
      const steps = 60;
      const stepValue = target / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += stepValue;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        
        if (target === 99.9) {
          stat.textContent = current.toFixed(1) + '%';
        } else if (target === 1) {
          stat.textContent = current.toFixed(0) + ' Second';
        } else {
          stat.textContent = Math.floor(current);
        }
      }, duration / steps);
    });

    // Animate stats container
    const statItems = document.querySelectorAll('.aim-stat-item');
    statItems.forEach((item, index) => {
      setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      }, index * 200);
    });
  };

  // Real AI Services Data with enhanced features
  const aiServices = [
    {
      id: 1,
      icon: "🤖",
      title: "AI Chatbot Development",
      description: "Intelligent chatbots for customer service, lead generation, and 24/7 support with natural language processing",
      features: ["WhatsApp/Telegram Bots", "Voice Assistants", "Multi-language Support", "CRM Integration"],
      price: "Starting at $999",
      delivery: "2-3 weeks",
      popular: true,
      trending: true,
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      delay: "0s"
    },
    {
      id: 2,
      icon: "📊",
      title: "Predictive Analytics",
      description: "Advanced data analysis and forecasting using machine learning algorithms for business intelligence",
      features: ["Sales Forecasting", "Customer Behavior Analysis", "Risk Assessment", "Real-time Dashboards"],
      price: "Starting at $1,499",
      delivery: "3-4 weeks",
      popular: false,
      trending: true,
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      delay: "0.2s"
    },
    {
      id: 3,
      icon: "🛒",
      title: "E-commerce AI Solutions",
      description: "Smart recommendation engines and personalized shopping experiences powered by AI",
      features: ["Product Recommendations", "Personalized Marketing", "Inventory Optimization", "Price Prediction"],
      price: "Starting at $1,799",
      delivery: "4-5 weeks",
      popular: true,
      trending: false,
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      delay: "0.4s"
    },
    {
      id: 4,
      icon: "📱",
      title: "Mobile App AI Integration",
      description: "Integrate AI capabilities into your existing or new mobile applications",
      features: ["Image Recognition", "Voice Commands", "Smart Search", "Push Notification Optimization"],
      price: "Starting at $1,299",
      delivery: "3-4 weeks",
      popular: false,
      trending: true,
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      delay: "0.6s"
    },
    {
      id: 5,
      icon: "🌐",
      title: "AI-Powered Web Solutions",
      description: "Smart websites with AI capabilities for enhanced user experience and conversions",
      features: ["Smart Content", "User Behavior Analysis", "Automated A/B Testing", "Chat Integration"],
      price: "Starting at $899",
      delivery: "2-3 weeks",
      popular: true,
      trending: true,
      gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      delay: "0.8s"
    },
    {
      id: 6,
      icon: "🔍",
      title: "Computer Vision Solutions",
      description: "Image and video analysis for various business applications and automation",
      features: ["Object Detection", "Face Recognition", "Quality Control", "Document Processing"],
      price: "Starting at $2,199",
      delivery: "5-6 weeks",
      popular: false,
      trending: false,
      gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      delay: "1s"
    }
  ];

  const servicePackages = [
    {
      name: "Startup",
      price: "$499",
      period: "month",
      features: [
        "Basic AI Chatbot",
        "Standard Analytics",
        "Email Support",
        "5,000 Requests/Month",
        "Basic Customization"
      ],
      recommended: false,
      trending: false
    },
    {
      name: "Business",
      price: "$999",
      period: "month",
      features: [
        "Advanced AI Chatbot",
        "Predictive Analytics",
        "Priority Support",
        "50,000 Requests/Month",
        "Custom Integration",
        "API Access"
      ],
      recommended: true,
      trending: true
    },
    {
      name: "Enterprise",
      price: "$2,499",
      period: "month",
      features: [
        "Multi-channel AI Assistant",
        "Real-time Analytics",
        "24/7 Dedicated Support",
        "Unlimited Requests",
        "Custom AI Models",
        "White-label Solution",
        "SLA Guarantee"
      ],
      recommended: false,
      trending: true
    }
  ];

  // Enhanced Inline Styles with Mobile Optimizations
  const styles = {
    // Main Container
    mainContainer: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      color: 'white',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      overflow: 'hidden'
    },

    // Hero Section - Mobile Optimized
    heroSection: {
      position: 'relative',
      minHeight: isMobile ? '70vh' : '60vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      padding: isMobile ? '40px 0' : '0'
    },
    particleCanvas: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 1
    },
    heroContent: {
      position: 'relative',
      zIndex: 2,
      textAlign: 'center',
      maxWidth: '1200px',
      padding: isMobile ? '0 15px' : '0 20px',
      width: '100%'
    },
    mainTitle: {
      fontSize: isMobile ? '2.5rem' : '5rem',
      fontWeight: '800',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      marginBottom: isMobile ? '0.5rem' : '1rem',
      marginTop: isMobile ? '20px' : '50px',
      lineHeight: isMobile ? '1.2' : '1.1',
      padding: isMobile ? '0 10px' : '0'
    },
    heroSubtitle: {
      fontSize: isMobile ? '1rem' : '1.5rem',
      color: '#cbd5e1',
      marginBottom: isMobile ? '2rem' : '3rem',
      maxWidth: isMobile ? '90%' : '600px',
      margin: isMobile ? '0 auto 2rem auto' : '0 auto 3rem auto',
      animation: 'fadeInUp 1s ease-out',
      lineHeight: '1.5',
      padding: isMobile ? '0 10px' : '0'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
      gap: isMobile ? '1rem' : '2rem',
      marginTop: isMobile ? '2rem' : '4rem',
      padding: isMobile ? '0 10px' : '0'
    },
    statItem: {
      textAlign: 'center',
      opacity: 0,
      transform: 'translateY(30px)',
      transition: 'all 0.6s ease',
      padding: isMobile ? '10px' : '0'
    },
    statNumber: {
      fontSize: isMobile ? '2rem' : '3rem',
      fontWeight: '800',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      marginBottom: isMobile ? '0.25rem' : '0.5rem',
      lineHeight: '1'
    },
    statLabel: {
      color: '#cbd5e1',
      fontSize: isMobile ? '0.7rem' : '0.9rem',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      lineHeight: '1.2'
    },

    // Services Section - Mobile Optimized
    servicesSection: {
      padding: isMobile ? '60px 15px' : '100px 20px',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      position: 'relative'
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      position: 'relative',
      zIndex: 2,
      padding: isMobile ? '0 5px' : '0'
    },
    sectionHeader: {
      textAlign: 'center',
      marginBottom: isMobile ? '2rem' : '4rem',
      padding: isMobile ? '0 10px' : '0'
    },
    sectionTitle: {
      fontSize: isMobile ? '2rem' : '3.5rem',
      fontWeight: '700',
      marginBottom: isMobile ? '0.5rem' : '1rem',
      animation: 'fadeInUp 1s ease-out',
      lineHeight: isMobile ? '1.2' : '1.1',
      padding: isMobile ? '0 10px' : '0'
    },
    gradientText: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    sectionSubtitle: {
      fontSize: isMobile ? '1rem' : '1.2rem',
      color: '#cbd5e1',
      maxWidth: isMobile ? '95%' : '600px',
      margin: '0 auto',
      animation: 'fadeInUp 1s ease-out 0.2s both',
      lineHeight: '1.5',
      padding: isMobile ? '0 10px' : '0'
    },
    servicesGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
      gap: isMobile ? '1.5rem' : '2rem',
      marginBottom: isMobile ? '2rem' : '4rem',
      padding: isMobile ? '0 5px' : '0'
    },

    // Service Card with Mobile Optimizations
    serviceCard: {
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: isMobile ? '15px' : '20px',
      padding: isMobile ? '1.5rem 1rem' : '2rem',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      transition: isMobile ? 'none' : 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative',
      overflow: 'hidden',
      cursor: 'pointer',
      opacity: 0,
      transform: isMobile ? 'translateY(30px)' : 'translateY(50px) rotateX(10deg)',
      animation: 'cardEntrance 0.8s ease-out forwards',
      minHeight: isMobile ? 'auto' : '450px',
      display: 'flex',
      flexDirection: 'column'
    },
    serviceCardHover: {
      transform: isMobile ? 'translateY(-5px)' : 'translateY(-15px) scale(1.02) rotateX(0deg)',
      boxShadow: isMobile ? '0 10px 25px rgba(0,0,0,0.3)' : '0 25px 50px rgba(0,0,0,0.5)',
      borderColor: 'rgba(102, 126, 234, 0.8)',
      background: 'rgba(255, 255, 255, 0.08)'
    },
    trendingBadge: {
      position: 'absolute',
      top: isMobile ? '0.5rem' : '1rem',
      right: isMobile ? '0.5rem' : '1rem',
      background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
      padding: isMobile ? '0.3rem 0.7rem' : '0.5rem 1rem',
      borderRadius: '15px',
      fontSize: isMobile ? '0.65rem' : '0.8rem',
      fontWeight: '600',
      animation: 'pulse 2s infinite, glow 1.5s ease-in-out infinite alternate',
      boxShadow: '0 0 20px rgba(255, 107, 107, 0.5)',
      zIndex: 3
    },
    popularBadge: {
      position: 'absolute',
      top: isMobile ? '0.5rem' : '1rem',
      left: isMobile ? '0.5rem' : '1rem',
      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      padding: isMobile ? '0.3rem 0.7rem' : '0.5rem 1rem',
      borderRadius: '15px',
      fontSize: isMobile ? '0.65rem' : '0.8rem',
      fontWeight: '600',
      animation: 'bounce 2s infinite',
      zIndex: 3
    },
    cardGlow: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '2px',
      background: 'linear-gradient(90deg, transparent, #667eea, transparent)',
      animation: 'glowMove 3s linear infinite'
    },
    serviceIcon: {
      fontSize: isMobile ? '2.5rem' : '3rem',
      marginBottom: isMobile ? '0.75rem' : '1rem',
      animation: 'float 3s ease-in-out infinite',
      filter: 'drop-shadow(0 5px 15px rgba(0,0,0,0.3))',
      textAlign: 'center'
    },
    serviceTitle: {
      fontSize: isMobile ? '1.25rem' : '1.5rem',
      fontWeight: '600',
      marginBottom: isMobile ? '0.75rem' : '1rem',
      background: 'linear-gradient(135deg, #fff 0%, #cbd5e1 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      textAlign: 'center',
      lineHeight: '1.3'
    },
    serviceDescription: {
      color: '#cbd5e1',
      marginBottom: isMobile ? '1rem' : '1.5rem',
      lineHeight: '1.5',
      fontSize: isMobile ? '0.9rem' : '0.95rem',
      textAlign: 'center',
      flex: '1'
    },
    featuresList: {
      marginBottom: isMobile ? '1rem' : '2rem',
      display: 'flex',
      flexWrap: 'wrap',
      gap: isMobile ? '0.3rem' : '0.5rem',
      justifyContent: 'center'
    },
    featureTag: {
      display: 'inline-block',
      background: 'rgba(255, 255, 255, 0.1)',
      padding: isMobile ? '0.3rem 0.7rem' : '0.5rem 1rem',
      borderRadius: '12px',
      fontSize: isMobile ? '0.7rem' : '0.8rem',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      transition: 'all 0.3s ease',
      animation: 'fadeInUp 0.5s ease-out',
      lineHeight: '1.2',
      textAlign: 'center'
    },
    featureTagHover: {
      background: 'rgba(102, 126, 234, 0.2)',
      borderColor: 'rgba(102, 126, 234, 0.5)',
      transform: 'scale(1.05)'
    },
    serviceFooter: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      paddingTop: isMobile ? '1rem' : '1.5rem',
      flexDirection: isMobile ? 'column' : 'row',
      gap: isMobile ? '0.75rem' : '0'
    },
    priceInfo: {
      textAlign: isMobile ? 'center' : 'left',
      width: isMobile ? '100%' : 'auto'
    },
    price: {
      fontWeight: '600',
      fontSize: isMobile ? '1rem' : '1.1rem',
      background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      marginBottom: isMobile ? '0.25rem' : '0'
    },
    delivery: {
      color: '#cbd5e1',
      fontSize: isMobile ? '0.8rem' : '0.9rem'
    },
    exploreBtn: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      border: 'none',
      color: 'white',
      padding: isMobile ? '0.6rem 1.2rem' : '0.75rem 1.5rem',
      borderRadius: '20px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden',
      fontSize: isMobile ? '0.9rem' : '1rem',
      width: isMobile ? '100%' : 'auto',
      minWidth: isMobile ? 'auto' : '140px'
    },
    exploreBtnHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 10px 25px rgba(102, 126, 234, 0.4)',
      background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)'
    },
    btnSparkle: {
      position: 'absolute',
      width: '15px',
      height: '15px',
      background: 'white',
      borderRadius: '50%',
      opacity: 0,
      animation: 'sparkle 1.5s linear infinite'
    },

    // Pricing Section - Mobile Optimized
    pricingSection: {
      padding: isMobile ? '60px 15px' : '100px 20px',
      background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
      position: 'relative'
    },
    pricingGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
      gap: isMobile ? '1.5rem' : '2rem',
      marginTop: isMobile ? '2rem' : '3rem',
      padding: isMobile ? '0 5px' : '0'
    },
    pricingCard: {
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: isMobile ? '15px' : '20px',
      padding: isMobile ? '1.5rem 1rem' : '2.5rem 2rem',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      textAlign: 'center',
      transition: isMobile ? 'none' : 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative',
      overflow: 'hidden',
      opacity: 0,
      transform: 'translateY(50px)',
      animation: 'cardEntrance 0.8s ease-out forwards',
      minHeight: isMobile ? 'auto' : '500px',
      display: 'flex',
      flexDirection: 'column'
    },
    pricingCardHover: {
      transform: isMobile ? 'translateY(-5px)' : 'translateY(-10px) scale(1.02)',
      boxShadow: isMobile ? '0 10px 25px rgba(0,0,0,0.3)' : '0 20px 40px rgba(0,0,0,0.4)',
      borderColor: 'rgba(102, 126, 234, 0.6)'
    },
    recommendedBadge: {
      position: 'absolute',
      top: isMobile ? '-8px' : '-10px',
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      color: '#0f172a',
      padding: isMobile ? '0.4rem 1.5rem' : '0.5rem 2rem',
      borderRadius: '15px',
      fontSize: isMobile ? '0.7rem' : '0.8rem',
      fontWeight: '600',
      animation: 'pulse 2s infinite',
      width: isMobile ? '90%' : 'auto'
    },
    trendingPricingBadge: {
      position: 'absolute',
      top: isMobile ? '0.5rem' : '1rem',
      right: isMobile ? '0.5rem' : '1rem',
      background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
      padding: isMobile ? '0.3rem 0.7rem' : '0.5rem 1rem',
      borderRadius: '15px',
      fontSize: isMobile ? '0.65rem' : '0.8rem',
      fontWeight: '600',
      animation: 'bounce 2s infinite, glow 1.5s ease-in-out infinite alternate'
    },
    packageName: {
      fontSize: isMobile ? '1.25rem' : '1.5rem',
      fontWeight: '600',
      marginBottom: isMobile ? '0.75rem' : '1rem',
      background: 'linear-gradient(135deg, #fff 0%, #cbd5e1 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      lineHeight: '1.2'
    },
    packagePrice: {
      fontSize: isMobile ? '2.5rem' : '3rem',
      fontWeight: '700',
      marginBottom: isMobile ? '0.25rem' : '0.5rem',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      lineHeight: '1'
    },
    packagePeriod: {
      color: '#cbd5e1',
      marginBottom: isMobile ? '1.5rem' : '2rem',
      fontSize: isMobile ? '0.9rem' : '1rem'
    },
    featureList: {
      listStyle: 'none',
      padding: 0,
      marginBottom: isMobile ? '1.5rem' : '2rem',
      flex: '1'
    },
    featureItem: {
      padding: isMobile ? '0.6rem 0' : '0.75rem 0',
      color: '#cbd5e1',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      transition: 'all 0.3s ease',
      fontSize: isMobile ? '0.85rem' : '0.9rem',
      lineHeight: '1.3'
    },
    featureItemHover: {
      color: 'white',
      transform: 'translateX(5px)'
    },
    ctaButton: {
      width: '100%',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      border: 'none',
      color: 'white',
      padding: isMobile ? '0.8rem 1.5rem' : '1rem 2rem',
      borderRadius: '20px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden',
      fontSize: isMobile ? '0.9rem' : '1rem'
    },
    ctaButtonHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 10px 25px rgba(102, 126, 234, 0.4)'
    },
    recommendedButton: {
      background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    },

    // Animation Keyframes as inline style
    animationStyles: `
      @keyframes titleGlow {
        0% { text-shadow: 0 0 20px rgba(102, 126, 234, 0.5); }
        100% { text-shadow: 0 0 30px rgba(102, 126, 234, 0.8), 0 0 40px rgba(102, 126, 234, 0.6); }
      }
      
      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      @keyframes cardEntrance {
        from { opacity: 0; transform: translateY(50px) rotateX(10deg); }
        to { opacity: 1; transform: translateY(0) rotateX(0); }
      }
      
      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-5px); }
      }
      
      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }
      
      @keyframes bounce {
        0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
        40%, 43% { transform: translateY(-5px); }
        70% { transform: translateY(-3px); }
        90% { transform: translateY(-1px); }
      }
      
      @keyframes glow {
        from { box-shadow: 0 0 15px rgba(255, 107, 107, 0.5); }
        to { box-shadow: 0 0 25px rgba(255, 107, 107, 0.8), 0 0 35px rgba(255, 107, 107, 0.6); }
      }
      
      @keyframes glowMove {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }
      
      @keyframes sparkle {
        0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
        50% { opacity: 1; }
        100% { transform: translate(50px, -50px) rotate(360deg); opacity: 0; }
      }
      
      .counting {
        animation: countPop 0.5s ease-out;
      }
      
      @keyframes countPop {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
      }

      /* Mobile-specific optimizations */
      @media (max-width: 767px) {
        .service-card-content {
          padding: 0 5px;
        }
        
        .mobile-center {
          text-align: center;
        }
      }
    `
  };

  return (
    <div style={styles.mainContainer}>
      <style>{styles.animationStyles}</style>
      
      {/* Hero Section */}
      <section style={styles.heroSection}>
        <canvas 
          ref={canvasRef}
          style={styles.particleCanvas}
        />
        <div style={styles.heroContent}>
          <h1 style={styles.mainTitle}>
            AI MarkLAB
          </h1>
          <p style={styles.heroSubtitle}>
            Transforming Businesses with Cutting-Edge Artificial Intelligence Solutions
          </p>
          
          <div style={styles.statsGrid} ref={statsRef}>
            <div style={styles.statItem}>
              <div className="aim-stat-number" style={styles.statNumber} data-count="500">0</div>
              <div style={styles.statLabel}>AI Projects</div>
            </div>
            <div style={styles.statItem}>
              <div className="aim-stat-number" style={styles.statNumber} data-count="99.9">0%</div>
              <div style={styles.statLabel}>Client Satisfaction</div>
            </div>
            <div style={styles.statItem}>
              <div className="aim-stat-number" style={styles.statNumber} data-count="50">0</div>
              <div style={styles.statLabel}>Team Experts</div>
            </div>
            <div style={styles.statItem}>
              <div className="aim-stat-number" style={styles.statNumber} data-count="24">0</div>
              <div style={styles.statLabel}>/7 Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Services Section */}
      <section style={styles.servicesSection}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>
              Our <span style={styles.gradientText}>AI Services</span>
            </h2>
            <p style={styles.sectionSubtitle}>
              Custom AI solutions tailored to drive your business growth and innovation
            </p>
          </div>

          <div style={styles.servicesGrid}>
            {aiServices.map((service, index) => (
              <div 
                key={service.id}
                style={{
                  ...styles.serviceCard,
                  animationDelay: service.delay,
                  ...(hoveredCard === service.id && styles.serviceCardHover)
                }}
                onMouseEnter={() => !isMobile && setHoveredCard(service.id)}
                onMouseLeave={() => !isMobile && setHoveredCard(null)}
                className="service-card-content"
              >
                {/* Glow Effect */}
                <div style={styles.cardGlow}></div>
                
                {/* Badges */}
                {service.trending && (
                  <div style={styles.trendingBadge}>
                    🔥 TRENDING
                  </div>
                )}
                {service.popular && (
                  <div style={styles.popularBadge}>
                    ⭐ POPULAR
                  </div>
                )}
                
                <div style={styles.serviceIcon}>
                  {service.icon}
                </div>
                
                <h3 style={styles.serviceTitle}>
                  {service.title}
                </h3>
                
                <p style={styles.serviceDescription}>
                  {service.description}
                </p>

                <div style={styles.featuresList}>
                  {service.features.map((feature, idx) => (
                    <span 
                      key={idx} 
                      style={{
                        ...styles.featureTag,
                        animationDelay: `${idx * 0.1}s`,
                        ...(hoveredCard === service.id && styles.featureTagHover)
                      }}
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                
                <div style={styles.serviceFooter}>
                  <div style={styles.priceInfo}>
                    <div style={styles.price}>{service.price}</div>
                    <div style={styles.delivery}>Delivery: {service.delivery}</div>
                  </div>
                  <button 
                    style={{
                      ...styles.exploreBtn,
                      ...(hoveredCard === service.id && styles.exploreBtnHover)
                    }}
                  >
                    Get Started
                    {!isMobile && (
                      <>
                        <div style={{...styles.btnSparkle, left: '10%', animationDelay: '0s'}}></div>
                        <div style={{...styles.btnSparkle, left: '30%', animationDelay: '0.5s'}}></div>
                        <div style={{...styles.btnSparkle, left: '60%', animationDelay: '1s'}}></div>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Packages */}
      <section style={styles.pricingSection}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>
              Flexible <span style={styles.gradientText}>Pricing</span>
            </h2>
            <p style={styles.sectionSubtitle}>
              Choose the perfect plan that scales with your business needs
            </p>
          </div>

          <div style={styles.pricingGrid}>
            {servicePackages.map((pkg, index) => (
              <div 
                key={index}
                style={{
                  ...styles.pricingCard,
                  animationDelay: `${index * 0.2}s`,
                  ...(hoveredCard === `pricing-${index}` && styles.pricingCardHover)
                }}
                onMouseEnter={() => !isMobile && setHoveredCard(`pricing-${index}`)}
                onMouseLeave={() => !isMobile && setHoveredCard(null)}
              >
                {pkg.recommended && (
                  <div style={styles.recommendedBadge}>
                    RECOMMENDED
                  </div>
                )}
                {pkg.trending && (
                  <div style={styles.trendingPricingBadge}>
                    🔥 TRENDING
                  </div>
                )}
                
                <h3 style={styles.packageName}>{pkg.name}</h3>
                <div style={styles.packagePrice}>{pkg.price}</div>
                <div style={styles.packagePeriod}>per {pkg.period}</div>
                
                <ul style={styles.featureList}>
                  {pkg.features.map((feature, idx) => (
                    <li 
                      key={idx} 
                      style={{
                        ...styles.featureItem,
                        ...(hoveredCard === `pricing-${index}` && styles.featureItemHover)
                      }}
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <button 
                  style={{
                    ...styles.ctaButton,
                    ...(pkg.recommended && styles.recommendedButton),
                    ...(hoveredCard === `pricing-${index}` && styles.ctaButtonHover)
                  }}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Header;