import React, { useEffect, useState } from "react";

const API = process.env.REACT_APP_API_URL || "https://nova-backend-lu2l.onrender.com";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${API}/api/orders`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h2>Your Orders</h2>

      {orders.length === 0 && <p>No orders found.</p>}

      {orders.map((order) => (
        <div
          key={order._id}
          style={{
            border: "1px solid rgba(110,193,255,.2)",
            borderRadius: "12px",
            padding: "20px",
            marginBottom: "20px",
            background: "#081523",
            color: "#fff"
          }}
        >
          <h4>Order ID: {order._id}</h4>

          <p>
            <strong>Total:</strong> ${order.totalAmount || 0}
          </p>

          {order.items && order.items.length > 0 && (
            <div>
              <strong>Items:</strong>

              {order.items.map((item, index) => (
                <div key={index} style={{ marginLeft: "10px" }}>
                  <span style={{ opacity: 0.7 }}>Product:</span> {item.product || item.productId} 
                  <span style={{ marginLeft: "10px", opacity: 0.7 }}>Qty:</span> {item.quantity}
                </div>
              ))}
            </div>
          )}

          {order.paypalOrderId && (
            <p>
              <strong>PayPal Order:</strong> {order.paypalOrderId}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default Orders;
