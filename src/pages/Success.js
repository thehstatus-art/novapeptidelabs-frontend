import React, { useEffect, useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"

const API = "https://nova-backend-lu2l.onrender.com"

function Success() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const sessionId = searchParams.get("session_id")

  useEffect(() => {
    localStorage.removeItem("cart")

    if (!sessionId) {
      setError("Missing session ID.")
      setLoading(false)
      return
    }

    const fetchOrder = async () => {
      try {
        const res = await fetch(
          `${API}/api/orders/by-session/${sessionId}`
        )

        if (!res.ok) {
          throw new Error("Order not found")
        }

        const data = await res.json()
        setOrder(data)
      } catch (err) {
        console.error("Failed to load order:", err)
        setError("Unable to load order details.")
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
  }, [sessionId])

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.icon}>✅</div>

        <h1>Payment Successful</h1>
        <p>Your order has been received and is being processed.</p>

        {loading && <p>Loading order details...</p>}

        {error && <p style={{ color: "red" }}>{error}</p>}

        {order && (
          <>
            {order.orderNumber && (
              <h3 style={{ marginTop: 20 }}>
                Order #{order.orderNumber}
              </h3>
            )}

            {order.customerEmail && (
              <p>Email: {order.customerEmail}</p>
            )}

            {order.shippingDetails && (
              <div style={{ marginTop: 15, textAlign: "left" }}>
                <strong>Shipping To:</strong>
                <p>
                  {order.shippingDetails.name}<br />
                  {order.shippingDetails.address}<br />
                  {order.shippingDetails.city},{" "}
                  {order.shippingDetails.state}{" "}
                  {order.shippingDetails.postalCode}<br />
                  {order.shippingDetails.country}
                </p>
              </div>
            )}

            {order.items && order.items.length > 0 && (
              <div style={{ marginTop: 20, textAlign: "left" }}>
                <h3>Order Summary</h3>

                {order.items.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 8
                    }}
                  >
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}

                <hr />

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontWeight: "bold",
                    marginTop: 10
                  }}
                >
                  <span>Total</span>
                  <span>
                    $
                    {order.totalAmount
                      ? order.totalAmount.toFixed(2)
                      : "0.00"}
                  </span>
                </div>
              </div>
            )}
          </>
        )}

        {/* 🔥 MATCHES YOUR SITE BUTTONS */}
        <button
          className="primary-btn"
          style={{ marginTop: 30 }}
          onClick={() => navigate("/shop")}
        >
          Continue Shopping
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
    background: "#f5f5f5",
    padding: 20
  },
  card: {
    background: "#fff",
    padding: 40,
    borderRadius: 10,
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: 600,
    textAlign: "center"
  },
  icon: {
    fontSize: 50,
    marginBottom: 15
  }
}

export default Success