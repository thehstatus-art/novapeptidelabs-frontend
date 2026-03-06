import React, { useState, useEffect } from "react";

const API = process.env.REACT_APP_API_URL;

export default function EmailCapture() {

  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  const submit = async () => {

    if (!email) {
      setMessage("Please enter an email.");
      return;
    }

    try {

      setLoading(true);

      const res = await fetch(`${API}/api/email/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });

      if (!res.ok) throw new Error("Subscription failed");

      setMessage("You're in! Welcome to Nova Research Network.");
      setEmail("");

      setTimeout(() => {
        setShow(false);
      }, 2000);

    } catch (err) {

      console.error(err);
      setMessage("Something went wrong. Try again.");

    } finally {

      setLoading(false);

    }

  };

  if (!show) return null;

  return (
    <div className="email-overlay">

      <div className="email-modal">

        <button
          className="email-close"
          onClick={() => setShow(false)}
        >
          ✕
        </button>

        <h2 className="email-title">
          Join the Nova Research Network
        </h2>

        <p className="email-sub">
          Get research updates, compound releases,
          and laboratory insights.
        </p>

        <input
          className="email-input"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          className="email-btn"
          onClick={submit}
          disabled={loading}
        >
          {loading ? "Joining..." : "Join Network"}
        </button>

        {message && (
          <div className="email-message">
            {message}
          </div>
        )}

        <div className="email-note">
          No spam. Research updates only.
        </div>

      </div>

    </div>
  );
}