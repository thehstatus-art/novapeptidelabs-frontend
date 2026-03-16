import React, { useEffect, useState, useCallback } from "react";

const API = process.env.REACT_APP_API_URL;

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const token = localStorage.getItem("token");

  const fetchOrders = useCallback(async () => {
    const res = await fetch(`${API}/api/admin/orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setOrders(data);
  }, [token]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const totalRevenue = orders.reduce(
    (sum, order) => sum + order.totalAmount,
    0
  );

  const readyToShip = orders.filter((o) => o.status === "processing").length;
  const shipped = orders.filter((o) => o.status === "shipped").length;

  const createLabel = async (id) => {
    await fetch(`${API}/api/admin/orders/${id}/create-label`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchOrders();
  };

  const markDelivered = async (id) => {
    await fetch(`${API}/api/admin/orders/${id}/delivered`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchOrders();
  };

  const sendNewsletter = async () => {
    const confirmSend = window.confirm("Send newsletter to all Nova Research Network subscribers?");
    if (!confirmSend) return;

    try {
      const res = await fetch(`${API}/api/admin/newsletter/send`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      alert(data.message || "Newsletter sent successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to send newsletter");
    }
  };

  return (
    <div style={{ padding: "40px", color: "white", maxWidth: "1200px", margin: "auto" }}>

      <h1>Fulfillment Dashboard</h1>

      <div style={{ marginBottom: "20px" }}>
        <button
          style={{
            background: "#0ea5e9",
            color: "white",
            border: "none",
            padding: "10px 16px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600"
          }}
          onClick={sendNewsletter}
        >
          📧 Send Newsletter to Subscribers
        </button>
      </div>

      {/* Dashboard Stats */}

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gap: "20px",
        marginBottom: "40px"
      }}>

        <div style={cardStyle}>
          <h3>Total Revenue</h3>
          <p>${totalRevenue.toFixed(2)}</p>
        </div>

        <div style={cardStyle}>
          <h3>Total Orders</h3>
          <p>{orders.length}</p>
        </div>

        <div style={cardStyle}>
          <h3>Ready To Ship</h3>
          <p>{readyToShip}</p>
        </div>

        <div style={cardStyle}>
          <h3>Shipped</h3>
          <p>{shipped}</p>
        </div>

      </div>

      {/* Orders */}

      {orders.map((order) => (

        <div key={order._id} style={orderCard}>

          <div style={{ marginBottom: "10px" }}>
            <strong>Email:</strong> {order.email}
          </div>

          <div>
            <strong>Total:</strong> ${order.totalAmount}
          </div>

          <div>
            <strong>Status:</strong> {order.status}
          </div>

          <div>
            <strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}
          </div>

          <h4 style={{ marginTop: "20px" }}>Items</h4>

          {order.items.map((item, index) => (

            <div key={index} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>

              {item.product?.image && (
                <img
                  src={item.product.image}
                  alt={item.name}
                  style={{ width: "40px", height: "40px", borderRadius: "6px" }}
                />
              )}

              <div>
                {item.name} — ${item.price} x {item.quantity}
              </div>

            </div>

          ))}

          {/* Action Buttons */}

          <div style={{ marginTop: "20px", display: "flex", gap: "10px", flexWrap: "wrap" }}>

            <button style={btn} onClick={() => createLabel(order._id)}>
              Create Label
            </button>

            {order.shippingLabelUrl && (
              <button
                style={btn}
                onClick={() => window.open(order.shippingLabelUrl, "_blank")}
              >
                Print Label
              </button>
            )}

            <button style={btn} onClick={() => markDelivered(order._id)}>
              Mark Delivered
            </button>

          </div>

        </div>

      ))}

    </div>
  );
}

const cardStyle = {
  background: "#081523",
  padding: "20px",
  borderRadius: "10px",
  border: "1px solid rgba(110,193,255,.25)",
  textAlign: "center"
};

const orderCard = {
  marginBottom: "25px",
  padding: "25px",
  background: "#111",
  borderRadius: "10px",
  border: "1px solid rgba(110,193,255,.15)"
};

const btn = {
  background: "#0c3d5a",
  color: "white",
  border: "none",
  padding: "8px 14px",
  borderRadius: "6px",
  cursor: "pointer"
};

export default AdminOrders;
