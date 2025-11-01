import React, { useState, useEffect } from "react";
import "./Adminlog.css";

const Adminlog = () => {
  const backend = "http://localhost:5000";

  // State Management
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("adminToken") || "");
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [activeTab, setActiveTab] = useState("team");

  // Form States
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [memberData, setMemberData] = useState({
    name: "",
    post: "",
    image: "",
    experienceTime: "",
    startOfJoining: "",
    growthAreas: "",
    education: "",
    cnic: "",
    achievements: "",
  });

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        await verifyToken();
      } else {
        setAuthLoading(false);
      }
      await fetchTeam();
    };
    
    checkAuth();
  }, []);

  // Verify token validity
  const verifyToken = async () => {
    try {
      console.log("Verifying token...", token);
      
      const res = await fetch(`${backend}/api/authadmin/me`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });
      
      console.log("Token verification response:", res.status);
      
      if (res.ok) {
        const userData = await res.json();
        console.log("User data:", userData);
        
        const isUserAdmin = userData.role === "admin" || 
                           userData.user?.role === "admin" ||
                           userData.isAdmin === true;
        
        console.log("Is user admin?", isUserAdmin);
        setIsAdmin(isUserAdmin);
        
        if (!isUserAdmin) {
          localStorage.removeItem("adminToken");
          setToken("");
          setError("❌ Admin access required");
        }
      } else {
        console.log("Token verification failed");
        localStorage.removeItem("adminToken");
        setToken("");
        setIsAdmin(false);
      }
    } catch (error) {
      console.error("Token verification error:", error);
      localStorage.removeItem("adminToken");
      setToken("");
      setIsAdmin(false);
      setError("❌ Authentication failed");
    } finally {
      setAuthLoading(false);
    }
  };

  // Fetch team members
  const fetchTeam = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${backend}/api/team`);
      if (res.ok) {
        const data = await res.json();
        setTeam(data);
      } else {
        setError("Failed to fetch team members");
      }
    } catch (error) {
      setError("Network error while fetching team");
    } finally {
      setLoading(false);
    }
  };

  // Admin Login
  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log("Attempting login with:", loginData);
      
      const res = await fetch(`${backend}/api/authadmin/login`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify(loginData),
      });

      const data = await res.json();
      console.log("Login response:", data);

      if (res.ok && data.token) {
        const userRole = data.role || data.user?.role;
        const isUserAdmin = userRole === "admin";
        
        if (isUserAdmin) {
          setToken(data.token);
          localStorage.setItem("adminToken", data.token);
          setIsAdmin(true);
          setSuccess("✅ Admin logged in successfully!");
          setLoginData({ email: "", password: "" });
        } else {
          setError("❌ Admin access required - insufficient permissions");
        }
      } else {
        setError(data.message || "❌ Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("❌ Network error. Please check backend connection.");
    } finally {
      setLoading(false);
    }
  };

  // Add team member
  const handleAddMember = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${backend}/api/team`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(memberData),
      });

      const data = await res.json();

      if (data._id) {
        setSuccess("✅ Team member added successfully!");
        setMemberData({
          name: "",
          post: "",
          image: "",
          experienceTime: "",
          startOfJoining: "",
          growthAreas: "",
          education: "",
          cnic: "",
          achievements: "",
        });
        fetchTeam();
        setActiveTab("team");
      } else {
        setError(data.message || "❌ Failed to add team member");
      }
    } catch (error) {
      setError("❌ Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Delete team member
  const handleDeleteMember = async (id) => {
    if (!window.confirm("Are you sure you want to delete this team member?")) {
      return;
    }

    try {
      const res = await fetch(`${backend}/api/team/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setSuccess("✅ Team member deleted successfully!");
        fetchTeam();
      } else {
        setError("❌ Failed to delete team member");
      }
    } catch (error) {
      setError("❌ Network error. Please try again.");
    }
  };

  // Logout
  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("adminToken");
    setIsAdmin(false);
    setSuccess("✅ Logged out successfully!");
    setActiveTab("team");
  };

  // Clear messages after 3 seconds
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError("");
        setSuccess("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Checking authentication...</p>
      </div>
    );
  }

  // Login Form
  const renderLoginForm = () => (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>🔐 Admin Login</h2>
          <p>Access the admin dashboard to manage team members</p>
        </div>

        {error && <div className="message error">{error}</div>}
        {success && <div className="message success">{success}</div>}

        <form onSubmit={handleAdminLogin} className="login-form">
          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="admin@wowlahir.com"
              value={loginData.email}
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
              required
            />
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? (
              <>
                <div className="spinner"></div>
                Logging in...
              </>
            ) : (
              "Login to Dashboard"
            )}
          </button>
        </form>

        <div className="demo-info">
          <h4>Demo Credentials:</h4>
          <p>Email: admin@wowlahir.com</p>
          <p>Password: admin123</p>
        </div>

        <div className="debug-info">
          <h4>Debug Information:</h4>
          <p>Backend: {backend}</p>
          <p>Token: {token ? "Present" : "Not present"}</p>
          <p>Admin Status: {isAdmin ? "Yes" : "No"}</p>
        </div>
      </div>
    </div>
  );

  // Admin Dashboard - YE ADD KARNA THA
  const renderAdminDashboard = () => (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>👥 Team Management Dashboard</h1>
          <div className="header-actions">
            <span className="admin-badge">Admin</span>
            <button onClick={handleLogout} className="logout-btn">
              🚪 Logout
            </button>
          </div>
        </div>

        <nav className="dashboard-nav">
          <button
            className={`nav-tab ${activeTab === "team" ? "active" : ""}`}
            onClick={() => setActiveTab("team")}
          >
            👥 View Team
          </button>
          <button
            className={`nav-tab ${activeTab === "add" ? "active" : ""}`}
            onClick={() => setActiveTab("add")}
          >
            ➕ Add Member
          </button>
          <button
            className={`nav-tab ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            ⚙️ Settings
          </button>
        </nav>
      </header>

      {error && <div className="message error">{error}</div>}
      {success && <div className="message success">{success}</div>}

      <main className="dashboard-main">
        {activeTab === "team" && renderTeamList()}
        {activeTab === "add" && renderAddMemberForm()}
        {activeTab === "profile" && renderProfileSettings()}
      </main>
    </div>
  );

  // Team List - YE ADD KARNA THA
  const renderTeamList = () => (
    <div className="team-section">
      <div className="section-header">
        <h2>Team Members ({team.length})</h2>
        <button
          onClick={() => setActiveTab("add")}
          className="add-member-btn"
        >
          ➕ Add New Member
        </button>
      </div>

      {loading ? (
        <div className="loading">Loading team members...</div>
      ) : team.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">👥</div>
          <h3>No Team Members Yet</h3>
          <p>Start by adding your first team member!</p>
          <button
            onClick={() => setActiveTab("add")}
            className="add-member-btn"
          >
            Add First Member
          </button>
        </div>
      ) : (
        <div className="team-grid">
          {team.map((member) => (
            <div key={member._id} className="team-card">
              <div className="member-image">
                <img
                  src={member.image || "/api/placeholder/200/200"}
                  alt={member.name}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/200x200/667eea/ffffff?text=No+Image";
                  }}
                />
              </div>
              
              <div className="member-info">
                <h3 className="member-name">{member.name}</h3>
                <p className="member-post">{member.post}</p>
                <p className="member-experience">
                  <strong>Experience:</strong> {member.experienceTime}
                </p>
                <p className="member-education">
                  <strong>Education:</strong> {member.education}
                </p>
                
                {member.achievements && (
                  <p className="member-achievements">
                    <strong>Achievements:</strong> {member.achievements}
                  </p>
                )}
                
                <div className="member-actions">
                  <button
                    onClick={() => handleDeleteMember(member._id)}
                    className="delete-btn"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // Add Member Form - YE ADD KARNA THA
  const renderAddMemberForm = () => (
    <div className="add-member-section">
      <div className="section-header">
        <h2>Add New Team Member</h2>
        <button
          onClick={() => setActiveTab("team")}
          className="back-btn"
        >
          ← Back to Team
        </button>
      </div>

      <form onSubmit={handleAddMember} className="member-form">
        <div className="form-grid">
          <div className="input-group">
            <label>Full Name *</label>
            <input
              type="text"
              placeholder="Enter full name"
              value={memberData.name}
              onChange={(e) =>
                setMemberData({ ...memberData, name: e.target.value })
              }
              required
            />
          </div>

          <div className="input-group">
            <label>Position/Post *</label>
            <input
              type="text"
              placeholder="e.g., Software Engineer"
              value={memberData.post}
              onChange={(e) =>
                setMemberData({ ...memberData, post: e.target.value })
              }
              required
            />
          </div>

          <div className="input-group">
            <label>Experience Time *</label>
            <input
              type="text"
              placeholder="e.g., 5 years"
              value={memberData.experienceTime}
              onChange={(e) =>
                setMemberData({ ...memberData, experienceTime: e.target.value })
              }
              required
            />
          </div>

          <div className="input-group">
            <label>Start of Joining *</label>
            <input
              type="date"
              value={memberData.startOfJoining}
              onChange={(e) =>
                setMemberData({ ...memberData, startOfJoining: e.target.value })
              }
              required
            />
          </div>

          <div className="input-group">
            <label>Education *</label>
            <input
              type="text"
              placeholder="e.g., BS Computer Science"
              value={memberData.education}
              onChange={(e) =>
                setMemberData({ ...memberData, education: e.target.value })
              }
              required
            />
          </div>

          <div className="input-group">
            <label>CNIC *</label>
            <input
              type="text"
              placeholder="XXXXX-XXXXXXX-X"
              value={memberData.cnic}
              onChange={(e) =>
                setMemberData({ ...memberData, cnic: e.target.value })
              }
              required
            />
          </div>

          <div className="input-group full-width">
            <label>Image URL</label>
            <input
              type="url"
              placeholder="https://example.com/image.jpg"
              value={memberData.image}
              onChange={(e) =>
                setMemberData({ ...memberData, image: e.target.value })
              }
            />
          </div>

          <div className="input-group full-width">
            <label>Growth Areas</label>
            <input
              type="text"
              placeholder="Web Development, UI/UX Design, etc."
              value={memberData.growthAreas}
              onChange={(e) =>
                setMemberData({ ...memberData, growthAreas: e.target.value })
              }
            />
          </div>

          <div className="input-group full-width">
            <label>Achievements</label>
            <textarea
              placeholder="List notable achievements, awards, certifications..."
              value={memberData.achievements}
              onChange={(e) =>
                setMemberData({ ...memberData, achievements: e.target.value })
              }
              rows="3"
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Adding Member..." : "➕ Add Team Member"}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("team")}
            className="cancel-btn"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );

  // Profile Settings - YE ADD KARNA THA
  const renderProfileSettings = () => (
    <div className="settings-section">
      <h2>Admin Settings</h2>
      <div className="settings-card">
        <h3>Dashboard Information</h3>
        <div className="settings-info">
          <p><strong>Admin Access:</strong> Full permissions</p>
          <p><strong>Team Members:</strong> {team.length}</p>
          <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>
        </div>
        
        <div className="settings-actions">
          <button onClick={fetchTeam} className="refresh-btn">
            🔄 Refresh Data
          </button>
          <button onClick={handleLogout} className="logout-btn">
            🚪 Logout
          </button>
        </div>
      </div>
    </div>
  );

  return isAdmin ? renderAdminDashboard() : renderLoginForm();
};

export default Adminlog;