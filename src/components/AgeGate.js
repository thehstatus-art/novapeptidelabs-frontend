import { useState, useEffect } from "react";

function AgeGate() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const verified = localStorage.getItem("novaAgeVerified");
    if (!verified) {
      setVisible(true);
    }
  }, []);

  const enter = () => {
    localStorage.setItem("novaAgeVerified", "true");
    setVisible(false);
  };

  const exit = () => {
    window.location.href = "https://google.com";
  };

  if (!visible) return null;

  return (
    <div style={overlay}>
      <div style={modal}>
        <h1 style={logo}>Nova Peptide Labs</h1>

        <h2 style={title}>Research Access Portal</h2>

        <p style={text}>
          This platform provides access to laboratory research compounds.
          All materials are intended strictly for scientific research use only.
        </p>

        <p style={text}>
          <p>
 By entering you confirm that you are at least <strong>18 years old</strong> and
  understand these materials are <strong>NOT for human consumption</strong>.
</p>
        </p>

        <div style={buttons}>
          <button style={enterBtn} onClick={enter}>
            Enter Research Portal
          </button>

          <button style={exitBtn} onClick={exit}>
            Leave Site
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- STYLES ---------- */

const overlay = {
  position: "fixed",
  inset: 0,
  backdropFilter: "blur(12px)",
  background: "rgba(2,6,15,0.92)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999
};

const modal = {
  background: "rgba(8,21,35,0.95)",
  border: "1px solid rgba(110,193,255,0.3)",
  borderRadius: "16px",
  padding: "50px",
  maxWidth: "520px",
  textAlign: "center",
  color: "white",
  boxShadow: "0 0 40px rgba(110,193,255,0.15)"
};

const logo = {
  fontSize: "26px",
  letterSpacing: "1px",
  marginBottom: "5px"
};

const title = {
  color: "#6ec1ff",
  marginBottom: "20px"
};

const text = {
  opacity: 0.85,
  lineHeight: 1.6,
  marginBottom: "10px"
};

const buttons = {
  display: "flex",
  justifyContent: "center",
  gap: "16px",
  marginTop: "30px"
};

const enterBtn = {
  padding: "12px 26px",
  background: "#6ec1ff",
  border: "none",
  borderRadius: "8px",
  color: "#081523",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "0.2s"
};

const exitBtn = {
  padding: "12px 26px",
  background: "transparent",
  border: "1px solid rgba(255,255,255,0.25)",
  borderRadius: "8px",
  color: "white",
  cursor: "pointer"
};

export default AgeGate;