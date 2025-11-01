import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const navigateTo = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const styles = {
    navbar: {
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      padding: '0 20px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    },
    navContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '15px 0',
      position: 'relative'
    },
    logo: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: 'white',
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      zIndex: 1001
    },
    logoAccent: {
      color: '#ffd700',
      marginLeft: '5px'
    },
    navMenu: {
      display: 'flex',
      listStyle: 'none',
      margin: 0,
      padding: 0,
      alignItems: 'center',
      gap: '30px'
    },
    navItem: {
      position: 'relative'
    },
    navLink: {
      color: 'white',
      textDecoration: 'none',
      fontSize: '16px',
      fontWeight: '500',
      padding: '8px 16px',
      borderRadius: '25px',
      transition: 'all 0.3s ease',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      cursor: 'pointer'
    },
    activeNavLink: {
      background: 'rgba(255,255,255,0.2)',
      boxShadow: '0 2px 10px rgba(255,255,255,0.2)'
    },
    authButtons: {
      display: 'flex',
      gap: '15px',
      alignItems: 'center'
    },
    loginBtn: {
      background: 'transparent',
      color: 'white',
      border: '2px solid white',
      padding: '8px 20px',
      borderRadius: '25px',
      textDecoration: 'none',
      fontSize: '14px',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    },
    signupBtn: {
      background: '#ffd700',
      color: '#333',
      border: 'none',
      padding: '10px 25px',
      borderRadius: '25px',
      textDecoration: 'none',
      fontSize: '14px',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 15px rgba(255,215,0,0.3)',
      cursor: 'pointer'
    },
    mobileMenuButton: {
      display: 'none',
      background: 'none',
      border: 'none',
      color: 'white',
      fontSize: '24px',
      cursor: 'pointer',
      zIndex: 1001,
      padding: '10px'
    },
    mobileMenu: {
      display: 'none',
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      padding: '20px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
      borderTop: '1px solid rgba(255,255,255,0.1)'
    },
    mobileNavMenu: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: '10px'
    },
    mobileNavItem: {
      padding: '12px 0',
      borderBottom: '1px solid rgba(255,255,255,0.1)'
    },
    mobileNavLink: {
      color: 'white',
      textDecoration: 'none',
      fontSize: '16px',
      fontWeight: '500',
      padding: '12px 16px',
      borderRadius: '8px',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      cursor: 'pointer',
      width: '100%'
    },
    mobileAuthButtons: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      marginTop: '15px',
      paddingTop: '15px',
      borderTop: '1px solid rgba(255,255,255,0.1)'
    },
    mobileLoginBtn: {
      background: 'transparent',
      color: 'white',
      border: '2px solid white',
      padding: '12px 20px',
      borderRadius: '25px',
      textDecoration: 'none',
      fontSize: '14px',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      textAlign: 'center',
      width: '100%'
    },
    mobileSignupBtn: {
      background: '#ffd700',
      color: '#333',
      border: 'none',
      padding: '14px 20px',
      borderRadius: '25px',
      textDecoration: 'none',
      fontSize: '14px',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      textAlign: 'center',
      width: '100%'
    }
  };

  const responsiveStyles = `
    @media (max-width: 768px) {
      .nav-menu {
        display: none !important;
      }
      .auth-buttons {
        display: none !important;
      }
      .mobile-menu-button {
        display: block !important;
      }
      .mobile-menu {
        display: ${isOpen ? 'block' : 'none'} !important;
      }
    }
    
    @media (min-width: 769px) {
      .mobile-menu {
        display: none !important;
      }
    }

    /* Mobile menu animation */
    .mobile-menu {
      animation: slideDown 0.3s ease-out;
    }

    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;

  return (
    <>
      <style>{responsiveStyles}</style>
      <nav style={styles.navbar}>
        <div style={styles.navContainer}>
          {/* Logo */}
          <div 
            style={styles.logo}
            onClick={() => navigateTo('/')}
          >
            Company<span style={styles.logoAccent}>.</span>
          </div>

          {/* Desktop Menu */}
          <ul style={styles.navMenu} className="nav-menu">
            {[
              { path: '/', label: '🏠 Home', name: 'Home' },
              { path: '/about', label: '👥 About', name: 'About' },
              { path: '/service', label: '⚡ Services', name: 'Services' },
              { path: '/team', label: '👨‍💼 Team', name: 'Team' },
              { path: '/contact', label: '📞 Contact', name: 'Contact' },
              { path: '/admin', label: '⚙️ Admin', name: 'Admin' }
            ].map((item) => (
              <li key={item.path} style={styles.navItem}>
                <div
                  style={{
                    ...styles.navLink,
                    ...(isActive(item.path) && styles.activeNavLink)
                  }}
                  onClick={() => navigateTo(item.path)}
                  onMouseEnter={(e) => {
                    if (!isActive(item.path)) {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 4px 15px rgba(255,255,255,0.3)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive(item.path)) {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }
                  }}
                >
                  {item.label}
                </div>
              </li>
            ))}
          </ul>

          {/* Desktop Auth Buttons */}
          <div style={styles.authButtons} className="auth-buttons">
            <div
              style={styles.loginBtn}
              onClick={() => navigateTo('/login')}
              onMouseEnter={(e) => {
                e.target.style.background = 'white';
                e.target.style.color = '#667eea';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.color = 'white';
              }}
            >
              Login
            </div>
            <div
              style={styles.signupBtn}
              onClick={() => navigateTo('/signup')}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(255,215,0,0.5)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(255,215,0,0.3)';
              }}
            >
              Sign Up
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            style={styles.mobileMenuButton} 
            className="mobile-menu-button"
            onClick={toggleNavbar}
            aria-label="Toggle menu"
          >
            {isOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu */}
        <div style={styles.mobileMenu} className="mobile-menu">
          <ul style={styles.mobileNavMenu}>
            {[
              { path: '/', label: '🏠 Home' },
              { path: '/about', label: '👥 About' },
              { path: '/services', label: '⚡ Services' },
              { path: '/team', label: '👨‍💼 Team' },
              { path: '/contact', label: '📞 Contact' },
              { path: '/admin', label: '⚙️ Admin' }
            ].map((item) => (
              <li key={item.path} style={styles.mobileNavItem}>
                <div 
                  style={{
                    ...styles.mobileNavLink,
                    ...(isActive(item.path) && styles.activeNavLink)
                  }} 
                  onClick={() => navigateTo(item.path)}
                >
                  {item.label}
                </div>
              </li>
            ))}
          </ul>
          
          {/* Mobile Auth Buttons */}
          <div style={styles.mobileAuthButtons}>
            <div
              style={styles.mobileLoginBtn}
              onClick={() => navigateTo('/login')}
            >
              🔐 Login
            </div>
            <div
              style={styles.mobileSignupBtn}
              onClick={() => navigateTo('/signup')}
            >
              📝 Sign Up
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;