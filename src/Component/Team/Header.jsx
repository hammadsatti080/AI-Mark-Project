// components/Team.jsx
import React, { useState, useEffect } from "react";

const Header = () => {
  const backend = "http://localhost:5000";
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Main container - REMOVED BACKGROUND COLOR
  const containerStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: isMobile ? "10px" : "20px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    minHeight: "100vh"
  };

  // Header - REMOVED WHITE BACKGROUND
  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: isMobile ? "20px" : "30px",
    padding: isMobile ? "15px 0" : "20px 0",
    flexDirection: isMobile ? "column" : "row",
    gap: isMobile ? "15px" : "0"
  };

  // Title
  const titleStyle = {
    color: "white",
    fontSize: isMobile ? "1.5rem" : "2.5rem",
    margin: "0",
    fontWeight: "700",
    textAlign: isMobile ? "center" : "left"
  };

  // Buttons
  const buttonStyle = {
    padding: isMobile ? "10px 20px" : "12px 24px",
    backgroundColor: "#667eea",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: isMobile ? "14px" : "16px",
    fontWeight: "600",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    ':hover': {
      backgroundColor: "#5a6fd8",
      transform: "translateY(-2px)"
    }
  };

  // Loading
  const loadingStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: isMobile ? "40px 20px" : "60px 20px",
    textAlign: "center"
  };

  const spinnerStyle = {
    width: isMobile ? "40px" : "50px",
    height: isMobile ? "40px" : "50px",
    border: "4px solid #f3f3f3",
    borderTop: "4px solid #667eea",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    marginBottom: "20px"
  };

  // Error - REMOVED WHITE BACKGROUND
  const errorStyle = {
    textAlign: "center",
    padding: isMobile ? "30px 15px" : "40px 20px",
    borderRadius: "12px",
    margin: "20px 0"
  };

  // Team grid
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(350px, 1fr))",
    gap: isMobile ? "15px" : "25px",
    marginBottom: "30px"
  };

  // Team card - ONLY WHITE ELEMENT
  const cardStyle = {
    backgroundColor: "white",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    transition: "all 0.3s ease",
    display: "flex",
    flexDirection: "column",
    height: "100%"
  };

  // Image
  const imageStyle = {
    width: "100%",
    height: isMobile ? "200px" : "250px",
    overflow: "hidden"
  };

  const imgStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  };

  // Details
  const detailsStyle = {
    padding: isMobile ? "15px" : "25px",
    flex: "1"
  };

  const nameStyle = {
    fontSize: isMobile ? "1.3rem" : "1.5rem",
    fontWeight: "700",
    color: "#2c3e50",
    margin: "0 0 8px 0"
  };

  const positionStyle = {
    fontSize: isMobile ? "1rem" : "1.1rem",
    color: "#667eea",
    fontWeight: "600",
    margin: "0 0 15px 0"
  };

  // Info grid
  const infoGridStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  };

  const infoItemStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: "6px 0",
    borderBottom: "1px solid #f0f0f0",
    fontSize: isMobile ? "13px" : "14px",
    lineHeight: "1.4",
    flexDirection: isMobile ? "column" : "row",
    gap: isMobile ? "2px" : "0"
  };

  const fullWidthItemStyle = {
    display: "flex",
    flexDirection: "column",
    padding: "6px 0",
    borderBottom: "1px solid #f0f0f0",
    fontSize: isMobile ? "13px" : "14px",
    lineHeight: "1.4",
    gap: "4px"
  };

  // Empty team - ONLY WHITE CARD
  const emptyTeamStyle = {
    textAlign: "center",
    padding: isMobile ? "40px 15px" : "60px 20px",
    backgroundColor: "white",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    margin: "20px 0"
  };

  const emptyIconStyle = {
    fontSize: isMobile ? "3rem" : "4rem",
    marginBottom: "15px"
  };

  // Debug info - REMOVED BACKGROUND COLOR
  const debugStyle = {
    color: "white",
    padding: isMobile ? "12px 15px" : "15px 20px",
    borderRadius: "8px",
    fontSize: isMobile ? "12px" : "14px",
    marginTop: "20px",
    border: "1px solid #e0e0e0"
  };

  // Automatically fetch team data when component loads
  useEffect(() => {
    fetchTeam();
  }, []);

  // Fetch team members from backend
  const fetchTeam = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(`${backend}/api/team`);
      
      if (res.ok) {
        const data = await res.json();
        setTeam(data);
        console.log("Team data fetched:", data);
      } else {
        setError("Failed to fetch team members");
      }
    } catch (error) {
      console.error("Error fetching team:", error);
      setError("Network error while fetching team");
    } finally {
      setLoading(false);
    }
  };

  // Refresh team data manually
  const handleRefresh = () => {
    fetchTeam();
  };

  if (loading) {
    return (
      <div style={containerStyle}>
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
        <div style={loadingStyle}>
          <div style={spinnerStyle}></div>
          <p style={{ 
            fontSize: isMobile ? "16px" : "18px", 
            color: "#666", 
            margin: "0" 
          }}>
            Loading team members...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={containerStyle}>
        <div style={errorStyle}>
          <p style={{ 
            fontSize: isMobile ? "16px" : "18px", 
            margin: "0 0 20px 0" 
          }}>
            ❌ {error}
          </p>
          <button 
            onClick={handleRefresh} 
            style={buttonStyle}
          >
            🔄 Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      {/* Header - NO WHITE BACKGROUND */}
      <div style={headerStyle}>
        <h1 style={titleStyle}>👥 Our Amazing Team</h1>
        <button 
          onClick={handleRefresh} 
          style={buttonStyle}
        >
          🔄 Refresh
        </button>
      </div>

      {/* Team Grid - ONLY CARDS HAVE WHITE BACKGROUND */}
      {team.length === 0 ? (
        <div style={emptyTeamStyle}>
          <div style={emptyIconStyle}>👥</div>
          <h3 style={{ color: "#2c3e50", margin: "0 0 10px 0" }}>
            No Team Members Yet
          </h3>
          <p style={{ color: "#666", margin: "0" }}>
            Our team is growing soon!
          </p>
        </div>
      ) : (
        <div style={gridStyle}>
          {team.map((member) => (
            <div key={member._id} style={cardStyle}>
              {/* Member Image */}
              <div style={imageStyle}>
                <img
                  src={member.image || "https://via.placeholder.com/400x300/667eea/ffffff?text=No+Image"}
                  alt={member.name}
                  style={imgStyle}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/400x300/667eea/ffffff?text=No+Image";
                  }}
                />
              </div>
              
              {/* Member Info */}
              <div style={detailsStyle}>
                <h3 style={nameStyle}>{member.name}</h3>
                <p style={positionStyle}>{member.post}</p>
                
                <div style={infoGridStyle}>
                  <div style={infoItemStyle}>
                    <strong>🎯 Experience:</strong>
                    <span>{member.experienceTime}</span>
                  </div>
                  
                  <div style={infoItemStyle}>
                    <strong>📚 Education:</strong>
                    <span>{member.education}</span>
                  </div>
                  
                  {member.startOfJoining && (
                    <div style={infoItemStyle}>
                      <strong>📅 Joined:</strong>
                      <span>{new Date(member.startOfJoining).toLocaleDateString()}</span>
                    </div>
                  )}
                  
                  {member.growthAreas && (
                    <div style={infoItemStyle}>
                      <strong>🚀 Growth Areas:</strong>
                      <span>{member.growthAreas}</span>
                    </div>
                  )}
                  
                  {member.achievements && (
                    <div style={fullWidthItemStyle}>
                      <strong>🏆 Achievements:</strong>
                      <span>{member.achievements}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Debug Info - NO BACKGROUND COLOR */}
      <div style={debugStyle}>
        <p style={{ margin: "0 0 8px 0" }}>
          <strong>Team Members Count:</strong> {team.length}
        </p>
        <p style={{ margin: "0" }}>
          <strong>Last Updated:</strong> {new Date().toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
};

export default Header;