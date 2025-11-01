import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState('');

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/[\s\-\(\)]/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Business Name validation
    if (!formData.businessName.trim()) {
      newErrors.businessName = 'Business name is required';
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) {
      return;
    }
  
    setIsSubmitting(true);
  
    try {
      const res = await fetch("http://localhost:5000/api/contactHere", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
  
      const data = await res.json();
  
      if (data.success) {
        alert("Message sent successfully! ✅");
        setFormData({
          name: '',
          email: '',
          phone: '',
          businessName: '',
          subject: '',
          message: ''
        });
      } else {
        alert(data.message || "Failed to send message ❌");
      }
    } catch (error) {
      alert("Server Error. Try again later ❌");
    }
  
    setIsSubmitting(false);
  };
  

  return (
    <div
      style={{
        padding: '60px 20px',
        background: 'white',
        fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Animated Background Elements */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: '300px',
            height: '300px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '50%',
            top: '-150px',
            right: '-150px',
            opacity: 0.03,
            animation: 'float 8s ease-in-out infinite'
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: '200px',
            height: '200px',
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            borderRadius: '50%',
            bottom: '-100px',
            left: '-100px',
            opacity: 0.03,
            animation: 'float 6s ease-in-out infinite reverse'
          }}
        />
      </div>

      <div
        style={{
          maxWidth: '1200px',
          width: '100%',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '50px',
            alignItems: 'center'
          }}
          className="contact-container"
        >
          {/* Header Section */}
          <div
            style={{
              textAlign: 'center',
              color: '#0f172a',
              maxWidth: '700px',
              opacity: 0,
              animation: 'slideUp 0.8s ease-out 0.2s forwards'
            }}
          >
            <h1
              style={{
                fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
                fontWeight: 800,
                marginBottom: '20px',
                lineHeight: 1.1,
                background: 'linear-gradient(135deg, #0f172a 0%, #475569 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Send a Message
            </h1>
            <p
              style={{
                fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)',
                color: '#64748b',
                lineHeight: 1.6,
                fontWeight: 500
              }}
            >
              With AI Mark Labs, Get Cutting-edge AI solutions to supercharge your marketing. 
              Automate, optimize, and scale like never before!
            </p>
          </div>

          {/* Contact Form */}
          <div
            style={{
              background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
              padding: '50px 40px',
              borderRadius: '24px',
              boxShadow: `
                0 25px 50px -12px rgba(15, 23, 42, 0.25),
                0 0 0 1px rgba(255, 255, 255, 0.1)
              `,
              width: '100%',
              maxWidth: '800px',
              position: 'relative',
              overflow: 'hidden',
              opacity: 0,
              animation: 'slideUp 0.8s ease-out 0.4s forwards'
            }}
            className="contact-form-container"
          >
            {/* Form Background Pattern */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: `
                  radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.03) 0%, transparent 50%),
                  radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.03) 0%, transparent 50%),
                  radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.02) 0%, transparent 50%)
                `,
                pointerEvents: 'none'
              }}
            />

            <form onSubmit={handleSubmit}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '25px',
                  marginBottom: '25px'
                }}
                className="form-grid"
              >
                {/* Name Field */}
                <div className="form-group">
                  <label
                    style={{
                      display: 'block',
                      marginBottom: '10px',
                      fontWeight: 600,
                      color: '#e2e8f0',
                      fontSize: '0.95rem',
                      transition: 'all 0.3s ease'
                    }}
                    htmlFor="name"
                  >
                    Name*
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => handleFocus('name')}
                    onBlur={handleBlur}
                    style={{
                      width: '100%',
                      padding: '16px 20px',
                      border: `2px solid ${errors.name ? '#ef4444' : '#334155'}`,
                      borderRadius: '12px',
                      fontSize: '1rem',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      outline: 'none',
                      background: 'rgba(15, 23, 42, 0.6)',
                      color: 'white',
                      backdropFilter: 'blur(10px)'
                    }}
                    className="form-input"
                  />
                  {errors.name && (
                    <span
                      style={{
                        color: '#f87171',
                        fontSize: '0.85rem',
                        marginTop: '6px',
                        display: 'block',
                        fontWeight: 500
                      }}
                    >
                      {errors.name}
                    </span>
                  )}
                </div>

                {/* Email Field */}
                <div className="form-group">
                  <label
                    style={{
                      display: 'block',
                      marginBottom: '10px',
                      fontWeight: 600,
                      color: '#e2e8f0',
                      fontSize: '0.95rem',
                      transition: 'all 0.3s ease'
                    }}
                    htmlFor="email"
                  >
                    Email*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => handleFocus('email')}
                    onBlur={handleBlur}
                    style={{
                      width: '100%',
                      padding: '16px 20px',
                      border: `2px solid ${errors.email ? '#ef4444' : '#334155'}`,
                      borderRadius: '12px',
                      fontSize: '1rem',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      outline: 'none',
                      background: 'rgba(15, 23, 42, 0.6)',
                      color: 'white',
                      backdropFilter: 'blur(10px)'
                    }}
                    className="form-input"
                  />
                  {errors.email && (
                    <span
                      style={{
                        color: '#f87171',
                        fontSize: '0.85rem',
                        marginTop: '6px',
                        display: 'block',
                        fontWeight: 500
                      }}
                    >
                      {errors.email}
                    </span>
                  )}
                </div>

                {/* Phone Field */}
                <div className="form-group">
                  <label
                    style={{
                      display: 'block',
                      marginBottom: '10px',
                      fontWeight: 600,
                      color: '#e2e8f0',
                      fontSize: '0.95rem',
                      transition: 'all 0.3s ease'
                    }}
                    htmlFor="phone"
                  >
                    Phone*
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={() => handleFocus('phone')}
                    onBlur={handleBlur}
                    style={{
                      width: '100%',
                      padding: '16px 20px',
                      border: `2px solid ${errors.phone ? '#ef4444' : '#334155'}`,
                      borderRadius: '12px',
                      fontSize: '1rem',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      outline: 'none',
                      background: 'rgba(15, 23, 42, 0.6)',
                      color: 'white',
                      backdropFilter: 'blur(10px)'
                    }}
                    className="form-input"
                  />
                  {errors.phone && (
                    <span
                      style={{
                        color: '#f87171',
                        fontSize: '0.85rem',
                        marginTop: '6px',
                        display: 'block',
                        fontWeight: 500
                      }}
                    >
                      {errors.phone}
                    </span>
                  )}
                </div>

                {/* Business Name Field */}
                <div className="form-group">
                  <label
                    style={{
                      display: 'block',
                      marginBottom: '10px',
                      fontWeight: 600,
                      color: '#e2e8f0',
                      fontSize: '0.95rem',
                      transition: 'all 0.3s ease'
                    }}
                    htmlFor="businessName"
                  >
                    Business Name*
                  </label>
                  <input
                    type="text"
                    id="businessName"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    onFocus={() => handleFocus('businessName')}
                    onBlur={handleBlur}
                    style={{
                      width: '100%',
                      padding: '16px 20px',
                      border: `2px solid ${errors.businessName ? '#ef4444' : '#334155'}`,
                      borderRadius: '12px',
                      fontSize: '1rem',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      outline: 'none',
                      background: 'rgba(15, 23, 42, 0.6)',
                      color: 'white',
                      backdropFilter: 'blur(10px)'
                    }}
                    className="form-input"
                  />
                  {errors.businessName && (
                    <span
                      style={{
                        color: '#f87171',
                        fontSize: '0.85rem',
                        marginTop: '6px',
                        display: 'block',
                        fontWeight: 500
                      }}
                    >
                      {errors.businessName}
                    </span>
                  )}
                </div>
              </div>

              {/* Subject Field - Full Width */}
              <div className="form-group" style={{ marginBottom: '25px' }}>
                <label
                  style={{
                    display: 'block',
                    marginBottom: '10px',
                    fontWeight: 600,
                    color: '#e2e8f0',
                    fontSize: '0.95rem',
                    transition: 'all 0.3s ease'
                  }}
                  htmlFor="subject"
                >
                  Subject*
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onFocus={() => handleFocus('subject')}
                  onBlur={handleBlur}
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    border: `2px solid ${errors.subject ? '#ef4444' : '#334155'}`,
                    borderRadius: '12px',
                    fontSize: '1rem',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    outline: 'none',
                    background: 'rgba(15, 23, 42, 0.6)',
                    color: 'white',
                    backdropFilter: 'blur(10px)'
                  }}
                  className="form-input"
                />
                {errors.subject && (
                  <span
                    style={{
                      color: '#f87171',
                      fontSize: '0.85rem',
                      marginTop: '6px',
                      display: 'block',
                      fontWeight: 500
                    }}
                  >
                    {errors.subject}
                  </span>
                )}
              </div>

              {/* Message Field - Full Width */}
              <div className="form-group" style={{ marginBottom: '35px' }}>
                <label
                  style={{
                    display: 'block',
                    marginBottom: '10px',
                    fontWeight: 600,
                    color: '#e2e8f0',
                    fontSize: '0.95rem',
                    transition: 'all 0.3s ease'
                  }}
                  htmlFor="message"
                >
                  Message*
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => handleFocus('message')}
                  onBlur={handleBlur}
                  rows="6"
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    border: `2px solid ${errors.message ? '#ef4444' : '#334155'}`,
                    borderRadius: '12px',
                    fontSize: '1rem',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    outline: 'none',
                    resize: 'vertical',
                    fontFamily: 'inherit',
                    background: 'rgba(15, 23, 42, 0.6)',
                    color: 'white',
                    backdropFilter: 'blur(10px)'
                  }}
                  className="form-input"
                />
                {errors.message && (
                  <span
                    style={{
                      color: '#f87171',
                      fontSize: '0.85rem',
                      marginTop: '6px',
                      display: 'block',
                      fontWeight: 500
                    }}
                  >
                    {errors.message}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  padding: '18px 24px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '14px',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                  opacity: isSubmitting ? 0.8 : 1,
                  boxShadow: '0 8px 30px rgba(102, 126, 234, 0.3)'
                }}
                className="submit-button"
              >
                {isSubmitting ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                    <div
                      style={{
                        width: '18px',
                        height: '18px',
                        border: '2px solid transparent',
                        borderTop: '2px solid white',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                      }}
                    />
                    Sending Message...
                  </div>
                ) : (
                  <>
                    Send Message
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: '-100%',
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                        transition: 'left 0.5s ease'
                      }}
                      className="button-shine"
                    />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Inline Styles for Animations and Responsive Design */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(2deg); }
          }

          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes glow {
            0%, 100% { box-shadow: 0 0 20px rgba(102, 126, 234, 0.1); }
            50% { box-shadow: 0 0 30px rgba(102, 126, 234, 0.2); }
          }

          /* Form Input Animations */
          .form-input:focus {
            border-color: #667eea !important;
            box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
            transform: translateY(-2px);
          }

          .form-input:hover {
            border-color: #475569 !important;
            transform: translateY(-1px);
          }

          /* Submit Button Animations */
          .submit-button:hover:not(:disabled) {
            transform: translateY(-3px);
            box-shadow: 0 15px 40px rgba(102, 126, 234, 0.4) !important;
          }

          .submit-button:hover:not(:disabled) .button-shine {
            left: 100%;
          }

          .submit-button:active:not(:disabled) {
            transform: translateY(-1px);
          }

          /* Form Group Animation */
          .form-group {
            transition: all 0.3s ease;
          }

          .form-group:hover {
            transform: translateX(5px);
          }

          /* Mobile Responsive */
          @media (max-width: 768px) {
            .contact-container {
              gap: 40px !important;
            }
            
            .contact-form-container {
              padding: 40px 25px !important;
              margin: 0 10px;
              border-radius: 20px !important;
            }
            
            .form-grid {
              grid-template-columns: 1fr !important;
              gap: 20px !important;
            }

            .form-group:hover {
              transform: none !important;
            }
          }

          @media (max-width: 480px) {
            .contact-form-container {
              padding: 30px 20px !important;
              border-radius: 18px !important;
            }
            
            .form-input {
              padding: 14px 16px !important;
            }
            
            button {
              padding: 16px 20px !important;
              font-size: 1rem !important;
            }
          }

          /* Desktop Enhancements */
          @media (min-width: 769px) {
            .contact-form-container {
              animation: glow 3s ease-in-out infinite;
            }
            
            .contact-form-container:hover {
              animation: glow 2s ease-in-out infinite;
            }
          }

          /* Reduced motion for accessibility */
          @media (prefers-reduced-motion: reduce) {
            * {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Contact;