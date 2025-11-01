import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const res = await API("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (res.status === 200) {
      localStorage.setItem("token", res.data.token);
      nav("/admin");
    } else setErr(res.data?.msg || "Login failed");
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <form onSubmit={submit} className="card" style={{ width: "350px" }}>
        <h2 style={{ marginBottom: "15px" }}>Login</h2>

        {err && <div style={{ color: "red", marginBottom: "10px" }}>{err}</div>}

        <input className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="input" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button className="btn btn-primary" style={{ width: "100%" }}>Login</button>
      </form>
    </div>
  );
}
