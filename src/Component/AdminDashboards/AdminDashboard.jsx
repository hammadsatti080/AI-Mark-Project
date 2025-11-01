import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";

export default function AdminDashboard() {
  const nav = useNavigate();
  const [me, setMe] = useState(null);
  const [members, setMembers] = useState([]);
  const [msg, setMsg] = useState("");

  const [form, setForm] = useState({
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

  useEffect(() => {
    API("/api/auth/me").then((r) => {
      if (r.status === 200) setMe(r.data);
      else nav("/login");
    });

    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    const r = await API("/api/team");
    if (r.data) setMembers(r.data);
  };

  const submit = async (e) => {
    e.preventDefault();
    const r = await API("/api/team", {
      method: "POST",
      body: JSON.stringify(form),
    });

    if (r.status === 200) {
      setMsg("Member Added");
      setForm({
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
      fetchMembers();
    } else setMsg(r.data?.msg || "Error");
  };

  const remove = async (id) => {
    if (!confirm("Delete?")) return;
    const r = await API(`/api/team/${id}`, { method: "DELETE" });
    if (r.status === 200) fetchMembers();
  };

  if (!me) return <div>Loading...</div>;
  if (me.role !== "admin") return <div style={{ padding: 20 }}>Access denied</div>;

  return (
    <div className="container">

      <h2 style={{ marginBottom: 20 }}>Admin Dashboard</h2>
      <p>Logged in as <strong>{me.name}</strong> ({me.role})</p>

      <form onSubmit={submit} className="card" style={{ marginTop: 20 }}>
        <h3 style={{ marginBottom: 10 }}>Add Team Member</h3>

        <div className="grid grid-2">
          {Object.keys(form).map((key) => (
            <input
              key={key}
              className="input"
              placeholder={key}
              value={form[key]}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            />
          ))}
        </div>

        <button className="btn btn-primary" style={{ marginTop: 10 }}>Add Member</button>
        <button
          type="button"
          className="btn"
          style={{ marginLeft: 10 }}
          onClick={() => {
            localStorage.removeItem("token");
            nav("/login");
          }}
        >
          Logout
        </button>

        {msg && <div style={{ marginTop: 10 }}>{msg}</div>}
      </form>

      <div className="grid grid-2" style={{ marginTop: 20 }}>
        {members.map((m) => (
          <div key={m._id} className="card">
            <img
              src={m.image || "https://via.placeholder.com/400x200"}
              alt={m.name}
              style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "6px" }}
            />
            <h4>{m.name}</h4>
            <p>{m.post}</p>
            <button className="btn btn-danger" onClick={() => remove(m._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
