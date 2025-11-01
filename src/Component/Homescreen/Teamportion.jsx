import React, { useState, useRef, useEffect } from 'react';

const Teamportion = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const cardsRef = useRef([]);
  const scrollContainerRef = useRef(null);

  const teamMembers = [
    {
      id: 1,
      name: "John Smith",
      post: "Project Manager",
      image: "./Homescreen/One.jpg",
      details: "5+ years experience in project management. Specialized in agile methodologies and team leadership."
    },
    {
      id: 2,
      name: "Sarah Johnson",
      post: "UI/UX Designer",
      image: "./Homescreen/Two.jpg",
      details: "Creative designer with expertise in user-centered design principles and modern UI trends."
    },
    {
      id: 3,
      name: "Mike Chen",
      post: "Frontend Developer",
      image: "./Homescreen/Three.jpg",
      details: "React specialist with 4 years of experience in modern web development and responsive design."
    },
    {
      id: 4,
      name: "Emily Davis",
      post: "Backend Developer",
      image: "./Homescreen/Four.jpg",
      details: "Node.js and database expert with strong backend architecture skills and API development."
    },
    {
      id: 5,
      name: "Alex Rodriguez",
      post: "DevOps Engineer",
      image: "./Homescreen/Five.jpg",
      details: "Cloud infrastructure specialist with expertise in AWS, Docker, and CI/CD pipelines."
    },
    {
      id: 6,
      name: "Priya Patel",
      post: "Data Scientist",
      image: "./Homescreen/One.jpg",
      details: "Machine learning expert with strong background in data analysis and predictive modeling."
    }
  ];

  // Check mobile device and handle resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Scroll animation effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = entry.target.getAttribute('data-index');
            setTimeout(() => {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateX(0) scale(1)';
            }, index * 100);
          }
        });
      },
      { threshold: 0.1 }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      cardsRef.current.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);

  const handleCardClick = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const addToRefs = (el, index) => {
    if (el && !cardsRef.current.includes(el)) {
      el.setAttribute('data-index', index);
      cardsRef.current[index] = el;
    }
  };

  // Scroll functions
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = isMobile ? 280 : 320;
      scrollContainerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = isMobile ? 280 : 320;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Touch scroll handling
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftStart, setScrollLeftStart] = useState(0);

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeftStart(scrollContainerRef.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeftStart - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Inline CSS Styles
  const styles = {
    teamSection: {
      padding: isMobile ? '40px 10px' : '80px 20px',
      background: 'white',
      minHeight: isMobile ? 'auto' : '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative'
    },
    container: {
      maxWidth: '1400px',
      width: '100%',
      margin: '0 auto',
      position: 'relative'
    },
    sectionHeader: {
      textAlign: 'center',
      marginBottom: isMobile ? '40px' : '60px',
      color: 'black',
      padding: isMobile ? '0 10px' : '0 20px'
    },
    sectionTitle: {
      fontSize: isMobile ? '2rem' : '3.5rem',
      marginBottom: isMobile ? '0.8rem' : '1rem',
      fontWeight: '800',
      margin: 0,
      background: 'linear-gradient(45deg, #000, #333)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    },
    sectionSubtitle: {
      fontSize: isMobile ? '1rem' : '1.3rem',
      color: '#666',
      margin: 0,
      fontWeight: '500',
      lineHeight: '1.4'
    },
    scrollContainer: {
      display: 'flex',
      overflowX: 'auto',
      gap: isMobile ? '15px' : '25px',
      padding: isMobile ? '10px 5px' : '20px',
      scrollbarWidth: 'none',
      msOverflowStyle: 'none',
      cursor: isDragging ? 'grabbing' : 'grab',
      WebkitOverflowScrolling: 'touch'
    },
    teamGrid: {
      display: 'flex',
      gap: isMobile ? '15px' : '25px',
      minWidth: 'min-content',
      padding: isMobile ? '0 5px' : '0'
    },
    cardWrapper: {
      opacity: 0,
      transform: 'translateX(-50px) scale(0.9)',
      transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
      minWidth: isMobile ? '85vw' : '300px',
      flexShrink: 0,
      maxWidth: isMobile ? '85vw' : '320px'
    },
    teamCard: {
      background: 'white',
      borderRadius: isMobile ? '16px' : '20px',
      overflow: 'hidden',
      boxShadow: isMobile ? '0 4px 15px rgba(0, 0, 0, 0.1)' : '0 8px 25px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      height: isMobile ? '320px' : '380px',
      display: 'flex',
      flexDirection: 'column',
      cursor: 'pointer',
      border: '1px solid #f0f0f0',
      position: 'relative'
    },
    cardImage: {
      width: '100%',
      height: isMobile ? '140px' : '200px',
      overflow: 'hidden',
      position: 'relative'
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'all 0.4s ease'
    },
    cardContent: {
      padding: isMobile ? '15px' : '20px',
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
      position: 'relative'
    },
    memberName: {
      fontSize: isMobile ? '1.1rem' : '1.3rem',
      fontWeight: '700',
      color: '#000',
      marginBottom: isMobile ? '0.3rem' : '0.5rem',
      margin: 0,
      lineHeight: '1.2'
    },
    memberPost: {
      color: '#666',
      fontWeight: '500',
      marginBottom: isMobile ? '0.8rem' : '1rem',
      fontSize: isMobile ? '0.8rem' : '0.9rem',
      margin: 0,
      lineHeight: '1.3'
    },
    detailsBtn: {
      background: 'black',
      color: 'white',
      border: '2px solid black',
      padding: isMobile ? '6px 12px' : '8px 16px',
      borderRadius: '20px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      marginTop: 'auto',
      fontSize: isMobile ? '0.75rem' : '0.85rem',
      width: 'fit-content',
      minWidth: isMobile ? '100px' : '120px'
    },
    memberDetails: {
      marginTop: isMobile ? '0.8rem' : '1rem',
      paddingTop: isMobile ? '0.8rem' : '1rem',
      borderTop: '1px solid #eee',
      animation: 'slideDown 0.3s ease'
    },
    detailsText: {
      color: '#666',
      lineHeight: '1.4',
      margin: 0,
      fontSize: isMobile ? '0.75rem' : '0.85rem'
    },
    scrollButtons: {
      display: 'flex',
      justifyContent: 'center',
      gap: isMobile ? '12px' : '15px',
      marginTop: isMobile ? '25px' : '30px',
      padding: isMobile ? '0 10px' : '0 20px'
    },
    scrollButton: {
      background: 'black',
      color: 'white',
      border: 'none',
      borderRadius: '50%',
      width: isMobile ? '45px' : '50px',
      height: isMobile ? '45px' : '50px',
      fontSize: isMobile ? '1.1rem' : '1.2rem',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
      touchAction: 'manipulation'
    },
    mobileIndicator: {
      textAlign: 'center',
      color: '#666',
      fontSize: '0.8rem',
      marginTop: '10px',
      display: isMobile ? 'block' : 'none'
    }
  };

  return (
    <section style={styles.teamSection}>
      <div style={styles.container}>
        {/* Section Header */}
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Our Amazing Team</h2>
          <p style={styles.sectionSubtitle}>
            Meet the talented professionals behind our success
          </p>
        </div>
        
        {/* Scroll Container */}
        <div 
          ref={scrollContainerRef}
          style={styles.scrollContainer}
          onMouseDown={(e) => {
            if (e.button === 0 && !isMobile) {
              const container = scrollContainerRef.current;
              let isDown = true;
              let startX = e.pageX - container.offsetLeft;
              let scrollLeft = container.scrollLeft;

              const mouseMove = (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - container.offsetLeft;
                const walk = (x - startX) * 2;
                container.scrollLeft = scrollLeft - walk;
              };

              const mouseUp = () => {
                isDown = false;
                document.removeEventListener('mousemove', mouseMove);
                document.removeEventListener('mouseup', mouseUp);
              };

              document.addEventListener('mousemove', mouseMove);
              document.addEventListener('mouseup', mouseUp);
            }
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div style={styles.teamGrid}>
            {teamMembers.map((member, index) => (
              <div 
                key={member.id}
                ref={(el) => addToRefs(el, index)}
                style={styles.cardWrapper}
              >
                {/* Team Card */}
                <div 
                  style={{
                    ...styles.teamCard,
                    transform: expandedCard === member.id ? 
                      `translateY(${isMobile ? '-3px' : '-5px'}) scale(1.02)` : 'none',
                    boxShadow: expandedCard === member.id ? 
                      `0 ${isMobile ? '8px' : '15px'} ${isMobile ? '20px' : '35px'} rgba(0, 0, 0, 0.15), 0 0 0 2px #000` : 
                      styles.teamCard.boxShadow
                  }}
                  onClick={() => handleCardClick(member.id)}
                  onMouseEnter={(e) => {
                    if (!isMobile && expandedCard !== member.id) {
                      e.currentTarget.style.transform = 'translateY(-3px) scale(1.01)';
                      e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.15)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isMobile && expandedCard !== member.id) {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.boxShadow = styles.teamCard.boxShadow;
                    }
                  }}
                >
                  {/* Card Image */}
                  <div style={styles.cardImage}>
                    <img 
                      src={member.image} 
                      alt={member.name}
                      style={{
                        ...styles.image,
                        filter: expandedCard === member.id ? 'grayscale(0)' : 'grayscale(0.1)',
                        transform: expandedCard === member.id ? 'scale(1.05)' : 'scale(1)'
                      }}
                    />
                  </div>
                  
                  {/* Card Content */}
                  <div style={styles.cardContent}>
                    <h3 style={styles.memberName}>
                      {member.name}
                    </h3>
                    <p style={styles.memberPost}>{member.post}</p>
                    
                    <button 
                      style={{
                        ...styles.detailsBtn,
                        background: expandedCard === member.id ? 'white' : 'black',
                        color: expandedCard === member.id ? 'black' : 'white'
                      }}
                      onMouseOver={(e) => {
                        if (!isMobile) {
                          e.target.style.transform = 'scale(1.05)';
                          e.target.style.background = 'black';
                          e.target.style.color = 'white';
                        }
                      }}
                      onMouseOut={(e) => {
                        if (!isMobile) {
                          e.target.style.transform = 'scale(1)';
                          e.target.style.background = expandedCard === member.id ? 'white' : 'black';
                          e.target.style.color = expandedCard === member.id ? 'black' : 'white';
                        }
                      }}
                    >
                      {expandedCard === member.id ? 'Hide Details' : 'View Details'}
                    </button>
                    
                    {/* Member Details */}
                    {expandedCard === member.id && (
                      <div style={styles.memberDetails}>
                        <p style={styles.detailsText}>{member.details}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Swipe Indicator */}
        <div style={styles.mobileIndicator}>
          {isMobile && "Swipe to explore more team members →"}
        </div>

        {/* Scroll Buttons */}
        <div style={styles.scrollButtons}>
          <button 
            style={styles.scrollButton}
            onClick={scrollLeft}
            onMouseOver={(e) => {
              if (!isMobile) {
                e.target.style.background = '#333';
                e.target.style.transform = 'scale(1.1)';
              }
            }}
            onMouseOut={(e) => {
              if (!isMobile) {
                e.target.style.background = 'black';
                e.target.style.transform = 'scale(1)';
              }
            }}
          >
            ←
          </button>
          <button 
            style={styles.scrollButton}
            onClick={scrollRight}
            onMouseOver={(e) => {
              if (!isMobile) {
                e.target.style.background = '#333';
                e.target.style.transform = 'scale(1.1)';
              }
            }}
            onMouseOut={(e) => {
              if (!isMobile) {
                e.target.style.background = 'black';
                e.target.style.transform = 'scale(1)';
              }
            }}
          >
            →
          </button>
        </div>
      </div>

      {/* Add CSS animations */}
      <style>
        {`
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-10px);
              max-height: 0;
            }
            to {
              opacity: 1;
              transform: translateY(0);
              max-height: 200px;
            }
          }
          
          /* Hide scrollbar for all devices */
          .scroll-container::-webkit-scrollbar {
            display: none;
          }
          
          /* Improved touch scrolling */
          @media (max-width: 768px) {
            * {
              -webkit-tap-highlight-color: transparent;
            }
          }
        `}
      </style>
    </section>
  );
};

export default Teamportion;