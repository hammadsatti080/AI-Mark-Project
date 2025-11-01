import React, { useState, useEffect } from 'react';

const Testimonial = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 300);
  }, []);

  return (
    <div
      style={{
        backgroundColor: 'white',
        color: 'black',
        padding: '40px 20px',
        fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        width: '100%',
        maxWidth: '100%',
        margin: '0 auto',
        position: 'relative',
        overflow: 'hidden',
        opacity: isVisible ? 1 : 0,
        transform: `translateY(${isVisible ? '0' : '20px'})`,
        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        minHeight: 'auto'
      }}
      className="main-container"
    >
      {/* Animated Background Shapes */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 0
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: '60px',
            height: '60px',
            background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
            top: '10%',
            left: '5%',
            opacity: 0.08,
            animation: 'float 6s ease-in-out infinite'
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: '40px',
            height: '40px',
            background: 'linear-gradient(45deg, #f093fb 0%, #f5576c 100%)',
            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
            top: '80%',
            right: '8%',
            opacity: 0.08,
            animation: 'float 8s ease-in-out infinite 1s'
          }}
        />
      </div>

      {/* Main Content - Flex column for mobile, row for desktop */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column', // Fixed typo here
          gap: '40px',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
          maxWidth: '1100px',
          margin: '0 auto'
        }}
        className="content-flex"
      >
        {/* Text Content Section - Top on Mobile, Left on Desktop */}
        <div
          style={{
            flex: 1,
            minWidth: 0
          }}
          className="text-section"
        >
          <h2
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              fontWeight: 700,
              marginBottom: '16px',
              lineHeight: 1.2,
              background: 'linear-gradient(135deg, #000000 0%, #434343 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              opacity: isVisible ? 1 : 0,
              transform: `translateX(${isVisible ? '0' : '-30px'})`,
              transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.1s'
            }}
          >
            Ready to Transform Your
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)'
              }}
            >
              Online Presence?
            </span>
          </h2>

          <p
            style={{
              fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)',
              color: '#64748b',
              lineHeight: 1.5,
              marginBottom: '25px',
              opacity: isVisible ? 1 : 0,
              transform: `translateX(${isVisible ? '0' : '-30px'})`,
              transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.2s'
            }}
          >
            Schedule your free consultation and watch your business grow with our expert digital solutions.
          </p>

          {/* Feature List */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              opacity: isVisible ? 1 : 0,
              transform: `translateX(${isVisible ? '0' : '-30px'})`,
              transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.3s'
            }}
          >
            {[
              'Free Strategy Session',
              'Custom Growth Plan',
              'No Commitment Required',
              '30-Day Results Guarantee'
            ].map((feature, index) => (
              <div
                key={feature}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: 'clamp(0.85rem, 1.6vw, 0.95rem)',
                  color: '#374151'
                }}
                className="feature-item"
              >
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    flexShrink: 0
                  }}
                >
                  ✓
                </div>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section - Bottom on Mobile, Right on Desktop */}
        <div
          style={{
            flex: 1,
            padding: '30px 25px',
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
            borderRadius: '16px',
            textAlign: 'center',
            boxShadow: `
              0 10px 25px rgba(0, 0, 0, 0.08),
              0 0 0 1px rgba(255, 255, 255, 0.8)
            `,
            border: '1px solid rgba(255, 255, 255, 0.9)',
            position: 'relative',
            overflow: 'hidden',
            opacity: isVisible ? 1 : 0,
            transform: `translateX(${isVisible ? '0' : '30px'}) scale(${isVisible ? 1 : 0.95})`,
            transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.2s',
            minHeight: 'auto',
            minWidth: 0,
            width: '100%'
          }}
          className="contact-section"
        >
          {/* Phone Contact */}
          <div
            style={{
              marginBottom: '20px',
              padding: '15px',
              background: 'white',
              borderRadius: '12px',
              boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)',
              border: '1px solid #f1f5f9',
              transition: 'all 0.2s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(59, 130, 246, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.06)';
            }}
          >
            <span
              style={{
                display: 'block',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: '#475569',
                marginBottom: '6px',
                textTransform: 'uppercase',
                letterSpacing: '0.03em'
              }}
            >
              Call Us Now
            </span>
            <div
              style={{
                fontSize: '1.1rem',
                fontWeight: 700,
                color: '#1e293b',
                textDecoration: 'none',
                display: 'block'
              }}
            >
              +1 (304) 920-5203
            </div>
          </div>

          {/* Email Contact */}
          <div
            style={{
              marginBottom: '20px',
              padding: '15px',
              background: 'white',
              borderRadius: '12px',
              boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)',
              border: '1px solid #f1f5f9',
              transition: 'all 0.2s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(16, 185, 129, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.06)';
            }}
          >
            <span
              style={{
                display: 'block',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: '#475569',
                marginBottom: '6px',
                textTransform: 'uppercase',
                letterSpacing: '0.03em'
              }}
            >
              Email Us Now
            </span>
            <div
              style={{
                fontSize: '1rem',
                fontWeight: 700,
                color: '#1e293b',
                textDecoration: 'none',
                display: 'block'
              }}
            >
              sales@aimarklabs.com
            </div>
          </div>

          {/* CTA Button */}
          <button
            style={{
              width: '100%',
              padding: '14px 24px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '0.95rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
              letterSpacing: '0.01em'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-1px)';
              e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
            }}
            onClick={(e) => {
              e.target.style.transform = 'scale(0.98)';
              setTimeout(() => {
                e.target.style.transform = 'scale(1)';
              }, 150);
            }}
          >
            📅 Schedule Free Consultation
          </button>
        </div>
      </div>

      {/* Inline Styles for Animations and Mobile Responsive */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(3deg); }
          }
          
          /* Desktop - Side by Side */
          @media (min-width: 769px) {
            .content-flex {
              flex-direction: row !important;
              align-items: stretch;
            }
            
            .contact-section {
              max-width: 400px;
            }
            
            .text-section {
              padding-right: 40px;
            }
          }
          
          /* Mobile - Top to Bottom */
          @media (max-width: 768px) {
            .main-container {
              padding: 30px 16px !important;
            }
            
            .content-flex {
              flex-direction: column !important;
              gap: 30px !important;
            }
            
            .contact-section, .text-section {
              width: 100% !important;
              flex: none !important;
            }
            
            .contact-section {
              padding: 25px 20px !important;
            }
          }
          
          @media (max-width: 480px) {
            .main-container {
              padding: 25px 12px !important;
            }
            
            .contact-section {
              padding: 20px 16px !important;
            }
            
            .feature-item {
              font-size: 0.8rem !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Testimonial;