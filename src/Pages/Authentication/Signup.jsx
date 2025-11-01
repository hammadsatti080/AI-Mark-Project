import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
    newsletter: true
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    if (!formData.agreeTerms) {
      alert("Please agree to the Terms and Conditions");
      return;
    }

    try {
      console.log('Signup data:', formData);

      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        alert('✅ Signup successful!');
        console.log('User:', data.user);

        // Save token
        localStorage.setItem('token', data.token);

        // Redirect to login
        navigate('/login');
      } else {
        alert(data.message || 'Signup failed. Please try again.');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Server error. Please try again later.');
    }
  };

  const goToLogin = () => {
    navigate('/login');
  };

  // 💅 Same design styles
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
      maxWidth: '480px',
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
    formGroup: { marginBottom: '20px' },
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
    nameRow: { display: 'flex', gap: '15px' },
    nameGroup: { flex: 1 },
    checkboxGroup: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px',
      marginBottom: '15px'
    },
    checkbox: {
      width: '18px',
      height: '18px',
      cursor: 'pointer',
      accentColor: '#667eea',
      marginTop: '2px'
    },
    checkboxLabel: {
      fontSize: '14px',
      color: '#4A5568',
      cursor: 'pointer',
      lineHeight: '1.4'
    },
    checkboxLink: {
      color: '#667eea',
      textDecoration: 'none',
      fontWeight: '600',
      cursor: 'pointer'
    },
    submitButton: {
      width: '100%',
      background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
      color: '#2D3748',
      border: 'none',
      padding: '18px',
      borderRadius: '12px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      marginTop: '10px',
      marginBottom: '30px',
      boxShadow: '0 8px 25px rgba(255, 215, 0, 0.3)'
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
    normalText: { color: '#718096', fontSize: '15px' },
    passwordHint: {
      fontSize: '12px',
      color: '#718096',
      marginTop: '5px',
      marginBottom: '0'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={styles.title}>Create Account</h2>
          <p style={styles.subtitle}>Join us today and get started</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={styles.nameRow}>
            <div style={styles.nameGroup}>
              <label style={styles.label}>First Name</label>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required style={styles.input} placeholder="First name" />
            </div>
            <div style={styles.nameGroup}>
              <label style={styles.label}>Last Name</label>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required style={styles.input} placeholder="Last name" />
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Email Address</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required style={styles.input} placeholder="Enter your email address" />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required style={styles.input} placeholder="Create a strong password" />
            <p style={styles.passwordHint}>Use 8+ characters with a mix of letters, numbers & symbols</p>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Confirm Password</label>
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required style={styles.input} placeholder="Confirm your password" />
          </div>

          <div style={styles.checkboxGroup}>
            <input type="checkbox" name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} required style={styles.checkbox} />
            <label style={styles.checkboxLabel}>
              I agree to the{' '}
              <span style={styles.checkboxLink}>Terms and Conditions</span> and{' '}
              <span style={styles.checkboxLink}>Privacy Policy</span>
            </label>
          </div>

          <div style={styles.checkboxGroup}>
            <input type="checkbox" name="newsletter" checked={formData.newsletter} onChange={handleChange} style={styles.checkbox} />
            <label style={styles.checkboxLabel}>Send me product updates and marketing communications</label>
          </div>

          <button type="submit" style={styles.submitButton}>Create Account</button>
        </form>

        <div style={styles.linkSection}>
          <span style={styles.normalText}>Already have an account? </span>
          <span style={styles.linkText} onClick={goToLogin}>Login here</span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
