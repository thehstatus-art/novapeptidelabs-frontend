import React, { useState, useEffect } from "react";

export default function EmailCapture() {

  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {

    const timer = setTimeout(() => {
      setShow(true);
    }, 8000);

    return () => clearTimeout(timer);

  }, []);

  const submit = () => {

    if (!email) return;

    fetch("/api/email/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email })
    });

    setShow(false);

  };

  if (!show) return null;

  return (
    <div className="email-popup">

      <div className="email-box">

        <h2>Join Nova Research Network</h2>

        <p>
          Get laboratory research updates, protocols,
          and new compound releases.
        </p>

        <input
          placeholder="Enter email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <button onClick={submit}>
          Join
        </button>

      </div>

    </div>
  );
}