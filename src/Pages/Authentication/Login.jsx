import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log('Login data:', formData);

      // Send login request to backend
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok && data.token) {
        alert('✅ Login successful!');
        console.log('User:', data.user);

        // Save JWT token for future requests
        localStorage.setItem('token', data.token);

        // Redirect to dashboard or homepage
        navigate('/dashboard');
      } else {
        alert(data.message || 'Login failed. Please try again.');
        console.error('Login error:', data);
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Server error. Please try again later.');
    }
  };

  const goToSignup = () => {
    navigate('/signup');
  };

  const goToForgotPassword = () => {
    navigate('/forgot-password');
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'black',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: "'Inter', sans-serif"
    },
    card: {
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      padding: '50px 40px',
      borderRadius: '24px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
      width: '100%',
      maxWidth: '440px',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    },
    title: {
      textAlign: 'center',
      color: '#2D3748',
      marginBottom: '10px',
      fontSize: '32px',
      fontWeight: '700',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    },
    subtitle: {
      textAlign: 'center',
      color: '#718096',
      marginBottom: '40px',
      fontSize: '16px'
    },
    formGroup: {
      marginBottom: '24px'
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      color: '#4A5568',
      fontWeight: '600',
      fontSize: '14px'
    },
    input: {
      width: '100%',
      padding: '16px 20px',
      border: '2px solid #E2E8F0',
      borderRadius: '12px',
      fontSize: '16px',
      transition: 'all 0.3s ease',
      outline: 'none',
      background: '#FFFFFF',
      boxSizing: 'border-box'
    },
    checkboxGroup: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '30px'
    },
    checkboxWrapper: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    checkbox: {
      width: '18px',
      height: '18px',
      cursor: 'pointer',
      accentColor: '#667eea'
    },
    checkboxLabel: {
      fontSize: '14px',
      color: '#4A5568',
      cursor: 'pointer'
    },
    forgotPassword: {
      color: '#667eea',
      fontSize: '14px',
      fontWeight: '600',
      textDecoration: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    submitButton: {
      width: '100%',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      border: 'none',
      padding: '18px',
      borderRadius: '12px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      marginBottom: '30px',
      boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)'
    },
    linkSection: {
      textAlign: 'center',
      marginTop: '25px',
      paddingTop: '25px',
      borderTop: '1px solid #E2E8F0'
    },
    linkText: {
      color: '#667eea',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '15px'
    },
    normalText: {
      color: '#718096',
      fontSize: '15px'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back</h2>
        <p style={styles.subtitle}>Sign in to your account</p>

        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={styles.input}
              placeholder="Enter your email"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={styles.input}
              placeholder="Enter your password"
            />
          </div>

          <div style={styles.checkboxGroup}>
            <div style={styles.checkboxWrapper}>
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                style={styles.checkbox}
              />
              <label style={styles.checkboxLabel}>Remember me</label>
            </div>

            <span
              style={styles.forgotPassword}
              onClick={goToForgotPassword}
            >
              Forgot password?
            </span>
          </div>

          <button type="submit" style={styles.submitButton}>
            Sign In
          </button>
        </form>

        <div style={styles.linkSection}>
          <span style={styles.normalText}>Don’t have an account? </span>
          <span
            style={styles.linkText}
            onClick={goToSignup}
          >
            Sign up here
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
