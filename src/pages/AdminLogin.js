import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_URL || "https://nova-backend-lu2l.onrender.com";

function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok || !data.token) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("adminUser", JSON.stringify(data.user || null));
      navigate("/admin/orders");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={pageStyle}>
      <form style={cardStyle} onSubmit={handleSubmit}>
        <h1 style={titleStyle}>Admin Login</h1>
        <p style={subtitleStyle}>Sign in to view orders and fulfillment data.</p>

        <label style={labelStyle}>
          Email
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            autoComplete="username"
            required
            style={inputStyle}
          />
        </label>

        <label style={labelStyle}>
          Password
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            autoComplete="current-password"
            required
            style={inputStyle}
          />
        </label>

        {error ? <div style={errorStyle}>{error}</div> : null}

        <button type="submit" style={buttonStyle} disabled={loading}>
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}

const pageStyle = {
  minHeight: "100vh",
  display: "grid",
  placeItems: "center",
  padding: "120px 24px 48px",
};

const cardStyle = {
  width: "100%",
  maxWidth: "420px",
  padding: "32px",
  borderRadius: "24px",
  background: "rgba(8, 21, 35, 0.94)",
  border: "1px solid rgba(110, 193, 255, 0.22)",
  boxShadow: "0 24px 60px rgba(0, 0, 0, 0.35)",
  color: "#fff",
};

const titleStyle = {
  margin: "0 0 8px",
  fontSize: "2rem",
};

const subtitleStyle = {
  margin: "0 0 24px",
  color: "rgba(225, 235, 245, 0.72)",
  lineHeight: 1.5,
};

const labelStyle = {
  display: "block",
  marginBottom: "18px",
  fontWeight: 600,
};

const inputStyle = {
  width: "100%",
  marginTop: "8px",
  borderRadius: "14px",
  border: "1px solid rgba(110, 193, 255, 0.22)",
  background: "rgba(14, 22, 34, 0.95)",
  color: "#fff",
  padding: "14px 16px",
  fontSize: "1rem",
  boxSizing: "border-box",
};

const buttonStyle = {
  width: "100%",
  border: "none",
  borderRadius: "14px",
  background: "linear-gradient(135deg, #49a6ff, #77bdff)",
  color: "#07111c",
  fontWeight: 700,
  fontSize: "1rem",
  padding: "14px 18px",
  cursor: "pointer",
  boxShadow: "0 18px 40px rgba(73, 166, 255, 0.28)",
};

const errorStyle = {
  marginBottom: "16px",
  padding: "12px 14px",
  borderRadius: "12px",
  background: "rgba(127, 29, 29, 0.25)",
  border: "1px solid rgba(248, 113, 113, 0.4)",
  color: "#fecaca",
};

export default AdminLogin;
