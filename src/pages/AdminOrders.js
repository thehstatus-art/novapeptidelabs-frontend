import React, { useEffect, useState } from "react";

const API = process.env.REACT_APP_API_URL;

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API}/api/admin/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setOrders(data);
    };

    fetchOrders();
  }, []);

  const totalRevenue = orders.reduce(
    (sum, order) => sum + order.totalAmount,
    0
  );

  return (
    <div style={{ padding: "40px", color: "white" }}>
      <h1>Admin Orders</h1>

      <h2>Total Revenue: ${totalRevenue.toFixed(2)}</h2>

      {orders.map((order) => (
        <div
          key={order._id}
          style={{
            marginBottom: "20px",
            padding: "20px",
            background: "#111",
            borderRadius: "8px",
          }}
        >
          <p><strong>Email:</strong> {order.email}</p>
          <p><strong>Total:</strong> ${order.totalAmount}</p>
          <p>
            <strong>Date:</strong>{" "}
            {new Date(order.createdAt).toLocaleString()}
          </p>

          <h4>Items:</h4>
          {order.items.map((item, index) => (
            <div key={index}>
              {item.name} — ${item.price} x {item.quantity}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default AdminOrders;
