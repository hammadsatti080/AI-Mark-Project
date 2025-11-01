import React from "react";

export default function TeamCard({ member }) {
  return (
    <div className="card">
      <img
        src={member.image || "https://via.placeholder.com/400x200"}
        alt={member.name}
        style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "6px" }}
      />

      <h3 style={{ marginTop: "10px", fontSize: "18px" }}>{member.name}</h3>
      <p style={{ color: "#555" }}>{member.post}</p>

      <p><strong>Experience:</strong> {member.experienceTime}</p>
      <p><strong>Education:</strong> {member.education}</p>
    </div>
  );
}
