import React, { useState, useEffect } from 'react';
import './Designing/CompanyCards.css';

const Clientportion = () => {
  const [flyingCard, setFlyingCard] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');

  // Enhanced company data with categories and ratings
  const companies = [
    {
      id: 1,
      name: "Tech Solutions Inc.",
      image: "./Homescreen/Company1.jpg",
      detail: "Leading provider of innovative technology solutions for businesses of all sizes.",
      intro: "Founded in 2010, we specialize in custom software development, cloud solutions, and digital transformation services.",
      category: "technology",
      rating: 4.8,
      employees: "250+",
      founded: 2010,
      color: "#3B82F6"
    },
    {
      id: 2,
      name: "Green Energy Corp",
      image: "./Homescreen/Company2.png",
      detail: "Sustainable energy solutions for a greener future.",
      intro: "Our mission is to accelerate the transition to renewable energy through innovative solar and wind technologies.",
      category: "energy",
      rating: 4.6,
      employees: "180+",
      founded: 2015,
      color: "#10B981"
    },
    {
      id: 3,
      name: "Global Finance Partners",
      image: "./Homescreen/Company3.jpg",
      detail: "Your trusted partner in international finance and investments.",
      intro: "With over 20 years of experience, we help clients navigate complex financial markets and maximize returns.",
      category: "finance",
      rating: 4.9,
      employees: "500+",
      founded: 2002,
      color: "#F59E0B"
    },
    {
      id: 4,
      name: "HealthCare Innovations",
      image: "./Homescreen/Company4.avif",
      detail: "Revolutionizing healthcare through technology and research.",
      intro: "We develop cutting-edge medical devices and digital health platforms to improve patient outcomes worldwide.",
      category: "healthcare",
      rating: 4.7,
      employees: "300+",
      founded: 2018,
      color: "#EF4444"
    },
    {
      id: 5,
      name: "Creative Design Studio",
      image: "./Homescreen/Company5.jpg",
      detail: "Transforming ideas into visually stunning experiences.",
      intro: "Our team of designers and developers create compelling brand identities and digital experiences.",
      category: "design",
      rating: 4.5,
      employees: "50+",
      founded: 2019,
      color: "#8B5CF6"
    },
    {
      id: 6,
      name: "Logistics Pro",
      image: "./Homescreen/Company6.jpg",
      detail: "Streamlining supply chains for maximum efficiency.",
      intro: "We provide end-to-end logistics solutions with real-time tracking and optimization algorithms.",
      category: "logistics",
      rating: 4.4,
      employees: "120+",
      founded: 2012,
      color: "#6366F1"
    },
    {
      id: 7,
      name: "EduTech Solutions",
      image: "./Homescreen/Company1.jpg",
      detail: "Transforming education through innovative technology platforms.",
      intro: "Our learning management systems and educational apps are used by millions of students worldwide.",
      category: "education",
      rating: 4.7,
      employees: "90+",
      founded: 2016,
      color: "#EC4899"
    },
    {
      id: 8,
      name: "FoodTech Ventures",
      image: "./Homescreen/Company8.png",
      detail: "Innovating the future of food production and distribution.",
      intro: "We develop sustainable food technologies and delivery solutions for the modern world.",
      category: "food",
      rating: 4.3,
      employees: "75+",
      founded: 2020,
      color: "#84CC16"
    }
  ];

  // Filter companies based on search and category
  useEffect(() => {
    let results = companies;
    
    if (searchTerm) {
      results = results.filter(company => 
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.detail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (activeFilter !== 'all') {
      results = results.filter(company => company.category === activeFilter);
    }
    
    setFilteredCompanies(results);
  }, [searchTerm, activeFilter]);

  const handleCardClick = (company) => {
    setFlyingCard(company.id);
    setTimeout(() => {
      setSelectedCompany(company);
      setFlyingCard(null);
    }, 800);
  };

  const handleCloseDetail = () => {
    setSelectedCompany(null);
  };

  // Get unique categories for filter buttons
  const categories = ['all', ...new Set(companies.map(company => company.category))];

  return (
    <div className="company-cards-container">
      <div className="header-section">
        <h1 className="main-title">Our Partner Companies</h1>
        <p className="subtitle">Discover innovative businesses shaping the future</p>
        
        <div className="controls-section">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
          
          <div className="filter-buttons">
            {categories.map(category => (
              <button
                key={category}
                className={`filter-btn ${activeFilter === category ? 'active' : ''}`}
                onClick={() => setActiveFilter(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {selectedCompany && (
        <div className="company-detail-overlay">
          <div className="company-detail-modal" style={{ borderTop: `5px solid ${selectedCompany.color}` }}>
            <button className="close-btn" onClick={handleCloseDetail}>×</button>
            <div className="modal-header">
              <img src={selectedCompany.image} alt={selectedCompany.name} />
              <div className="company-stats">
                <div className="stat-item">
                  <span className="stat-value">{selectedCompany.rating}</span>
                  <span className="stat-label">Rating</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">{selectedCompany.employees}</span>
                  <span className="stat-label">Employees</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">{selectedCompany.founded}</span>
                  <span className="stat-label">Founded</span>
                </div>
              </div>
            </div>
            <h2>{selectedCompany.name}</h2>
            <p className="company-intro">{selectedCompany.intro}</p>
            <div className="linking-time">
              <p>Linking Time: {new Date().toLocaleTimeString()}</p>
            </div>
            <div className="modal-actions">
              <button className="action-btn primary">Visit Website</button>
              <button className="action-btn secondary">Contact Company</button>
            </div>
          </div>
        </div>
      )}
      
      <div className="cards-grid">
        {filteredCompanies.map(company => (
          <div 
            key={company.id}
            className={`company-card ${flyingCard === company.id ? 'flying' : ''}`}
            onClick={() => handleCardClick(company)}
            style={{ 
              '--card-color': company.color,
              animationDelay: `${company.id * 0.1}s`
            }}
          >
            <div className="card-badge">{company.category}</div>
            <div className="card-image">
              <img src={company.image} alt={company.name} />
              <div className="image-overlay"></div>
            </div>
            <div className="card-content">
              <div className="card-header">
                <h3>{company.name}</h3>
                <div className="rating">
                  <span className="stars">★★★★★</span>
                  <span className="rating-value">{company.rating}</span>
                </div>
              </div>
              <p>{company.detail}</p>
              <div className="card-footer">
                <div className="company-info">
                  <span className="employees">{company.employees} employees</span>
                  <span className="founded">Est. {company.founded}</span>
                </div>
                <div className="click-indicator">
                  <span>View Details</span>
                  <div className="arrow">→</div>
                </div>
              </div>
            </div>
            <div className="card-glow"></div>
          </div>
        ))}
      </div>
      
      {filteredCompanies.length === 0 && (
        <div className="no-results">
          <h3>No companies found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default Clientportion;