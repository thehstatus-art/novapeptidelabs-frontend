import React from "react"
import { useNavigate } from "react-router-dom"

function Cancel() {
  const navigate = useNavigate()

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={{ fontSize: 50 }}>❌</div>
        <h1>Payment Cancelled</h1>
        <p>Your payment was not completed.</p>

        <button
          style={styles.button}
          onClick={() => navigate("/shop")}
        >
          Return to Shop
        </button>
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f5f5"
  },
  card: {
    background: "#fff",
    padding: 40,
    borderRadius: 10,
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    textAlign: "center"
  },
  button: {
    marginTop: 20,
    padding: "12px 25px",
    border: "none",
    background: "#111",
    color: "#fff",
    borderRadius: 6,
    cursor: "pointer"
  }
}

export default Cancel