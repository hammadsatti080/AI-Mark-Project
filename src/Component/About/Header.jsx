import React, { useEffect, useRef, useState } from "react";
import "./AboutAIMarkLAB.css";

const Header = () => {
  const canvasRef = useRef(null);
  const statsRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [counted, setCounted] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Counting animation effect
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
      const duration = 2000; // 2 seconds
      const steps = 60;
      const stepValue = target / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += stepValue;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        
        // Format numbers properly
        if (target === 99.9) {
          stat.textContent = current.toFixed(1) + '%';
        } else if (target === 1) {
          stat.textContent = current.toFixed(0) + ' Second';
        } else {
          stat.textContent = Math.floor(current);
        }
        
        // Add pop animation
        stat.classList.add('counting');
        setTimeout(() => stat.classList.remove('counting'), 500);
      }, duration / steps);
    });

    // Animate stats container
    const statItems = document.querySelectorAll('.aim-stat-item');
    statItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add('visible');
      }, index * 200);
    });
  };

  const innovations = [
    {
      id: 1,
      icon: "🤖",
      title: "Neural Marketing Engine",
      description: "Self-learning AI that optimizes campaigns in real-time",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      trending: true,
      delay: 0
    },
    {
      id: 2,
      icon: "🧠",
      title: "Predictive Consumer AI",
      description: "Anticipate customer behavior with 95% accuracy",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      trending: true,
      delay: 0.1
    },
    {
      id: 3,
      icon: "⚡",
      title: "Quantum Analytics",
      description: "Process million data points in milliseconds",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      trending: false,
      delay: 0.2
    },
    {
      id: 4,
      icon: "🎯",
      title: "Emotion Recognition AI",
      description: "Understand customer emotions through advanced ML",
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      trending: true,
      delay: 0.3
    }
  ];

  // Particle Animation - Mobile optimized
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      
      // Reduce particles on mobile for performance
      const particleCount = isMobile ? 20 : 50;
      if (particles.length > particleCount) {
        particles = particles.slice(0, particleCount);
      }
    };

    class Particle {
      constructor() {
        this.reset();
        // Slower movement on mobile
        this.speed = isMobile ? 1 : 2;
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * this.speed;
        this.vy = (Math.random() - 0.5) * this.speed;
        this.radius = Math.random() * (isMobile ? 1 : 2) + 1;
        this.alpha = Math.random() * 0.5 + 0.2;
        this.color = `hsla(${Math.random() * 360}, 70%, 60%, ${this.alpha})`;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        this.alpha -= 0.002;
        if (this.alpha <= 0) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    const initParticles = () => {
      particles = [];
      const particleCount = isMobile ? 20 : 50;
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Draw connections - reduced on mobile
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 0.5;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = isMobile ? 80 : 100;
          
          if (distance < maxDistance) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    initParticles();
    animate();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isMobile]);

  return (
    <div className="aimarklab-about">
      {/* Animated Hero Section */}
      <section className="aim-hero-section">
        <canvas 
          ref={canvasRef}
          className="aim-particle-canvas"
        />
        <div className="aim-hero-content">
          <div className="aim-floating-elements">
            {!isMobile && (
              <>
                <div className="aim-floating-card ai">AI</div>
                <div className="aim-floating-card ml">ML</div>
                <div className="aim-floating-card nn">NN</div>
              </>
            )}
          </div>
          
          <h1 className="aim-main-title">
            <span className="aim-title-word">
              <span className="aim-letter" style={{'--delay': '0s'}}>A</span>
              <span className="aim-letter" style={{'--delay': '0.1s'}}>I</span>
            </span>
            <span className="aim-title-word">
              <span className="aim-letter" style={{'--delay': '0.2s'}}>M</span>
              <span className="aim-letter" style={{'--delay': '0.3s'}}>a</span>
              <span className="aim-letter" style={{'--delay': '0.4s'}}>r</span>
              <span className="aim-letter" style={{'--delay': '0.5s'}}>k</span>
            </span>
            <span className="aim-title-word">
              <span className="aim-letter" style={{'--delay': '0.6s'}}>L</span>
              <span className="aim-letter" style={{'--delay': '0.7s'}}>A</span>
              <span className="aim-letter" style={{'--delay': '0.8s'}}>B</span>
            </span>
          </h1>
          
          <p className="aim-hero-subtitle">
            Where <span className="aim-highlight">Artificial Intelligence</span> meets 
            <span className="aim-highlight"> Marketing Innovation</span>
          </p>
          
          <div className="aim-stats-grid" ref={statsRef}>
            <div className="aim-stat-item">
              <div className="aim-stat-number" data-count="500">0</div>
              <div className="aim-stat-label">AI Models</div>
            </div>
            <div className="aim-stat-item">
              <div className="aim-stat-number" data-count="99.9">0%</div>
              <div className="aim-stat-label">Accuracy</div>
            </div>
            <div className="aim-stat-item">
              <div className="aim-stat-number" data-count="24">0</div>
              <div className="aim-stat-label">/7 Monitoring</div>
            </div>
            <div className="aim-stat-item">
              <div className="aim-stat-number" data-count="1">0</div>
              <div className="aim-stat-label">Second Insights</div>
            </div>
          </div>
        </div>
        
        <div className="aim-scroll-indicator">
          <div className="aim-scroll-arrow"></div>
        </div>
      </section>

      {/* Rest of your existing sections remain same */}
      <section className="aim-innovations-section">
        <div className="aim-container">
          <div className="aim-section-header">
            <h2 className="aim-section-title">
              <span>Cutting-Edge</span>
              <span className="aim-gradient-text"> Innovations</span>
            </h2>
            <p className="aim-section-subtitle">
              Powered by next-generation artificial intelligence
            </p>
          </div>

          <div className="aim-innovations-grid">
            {innovations.map((innovation) => (
              <div
                key={innovation.id}
                className="aim-innovation-card"
                style={{
                  '--delay': innovation.delay + 's',
                  '--gradient': innovation.gradient
                }}
              >
                {innovation.trending && (
                  <div className="aim-trending-badge">
                    <span className="aim-fire">🔥</span>
                    TRENDING
                  </div>
                )}
                
                <div className="aim-card-glow"></div>
                
                <div className="aim-innovation-icon">
                  {innovation.icon}
                </div>
                
                <h3 className="aim-innovation-title">
                  {innovation.title}
                </h3>
                
                <p className="aim-innovation-description">
                  {innovation.description}
                </p>
                
                <div className="aim-innovation-footer">
                  <button className="aim-explore-btn">
                    <span>Explore</span>
                    <div className="aim-btn-arrow">→</div>
                  </button>
                  
                  <div className="aim-ai-pulse">
                    <div className="aim-pulse-ring"></div>
                    <div className="aim-pulse-ring"></div>
                    <div className="aim-pulse-ring"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3D Tech Stack - Mobile Optimized */}
      <section className="aim-tech-section">
        <div className="aim-container">
          <div className="aim-tech-content">
            {!isMobile && (
              <div className="aim-tech-visual">
                <div className="aim-orbital-system">
                  <div className="aim-central-orb">AI</div>
                  <div className="aim-orbital-ring">
                    <div className="aim-orbital-node" style={{'--angle': '0deg'}}>
                      <span>ML</span>
                    </div>
                    <div className="aim-orbital-node" style={{'--angle': '60deg'}}>
                      <span>DL</span>
                    </div>
                    <div className="aim-orbital-node" style={{'--angle': '120deg'}}>
                      <span>NLP</span>
                    </div>
                    <div className="aim-orbital-node" style={{'--angle': '180deg'}}>
                      <span>CV</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="aim-tech-info">
              <h2>Advanced AI Architecture</h2>
              <p>
                Our multi-layered neural network processes data through 
                specialized AI modules, each optimized for specific marketing tasks.
              </p>
              
              <div className="aim-tech-features">
                <div className="aim-tech-feature">
                  <div className="aim-feature-icon">⚡</div>
                  <div>
                    <h4>Real-time Processing</h4>
                    <p>Instant analysis of live data streams</p>
                  </div>
                </div>
                
                <div className="aim-tech-feature">
                  <div className="aim-feature-icon">🔒</div>
                  <div>
                    <h4>Secure & Private</h4>
                    <p>Enterprise-grade data protection</p>
                  </div>
                </div>
                
                <div className="aim-tech-feature">
                  <div className="aim-feature-icon">🌍</div>
                  <div>
                    <h4>Global Scale</h4>
                    <p>Deployed across 50+ countries</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Animated CTA */}
      <section className="aim-cta-section">
        <div className="aim-cta-background">
          <div className="aim-cta-glow"></div>
        </div>
        
        <div className="aim-container">
          <div className="aim-cta-content">
            <h2>Ready for the AI Revolution?</h2>
            <p>Join the future of intelligent marketing today</p>
            
            <div className="aim-cta-buttons">
              <button className="aim-cta-btn primary">
                <span>Start Free Trial</span>
                <div className="aim-btn-sparkles">
                  <div className="aim-sparkle"></div>
                  <div className="aim-sparkle"></div>
                  <div className="aim-sparkle"></div>
                </div>
              </button>
              
              <button className="aim-cta-btn secondary">
                <span>View Demo</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Header;