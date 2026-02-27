import React, { useEffect, useState } from "react";

const API = process.env.REACT_APP_API_URL;

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
    <div>
      <h2>Your Orders</h2>
      {orders.map((order) => (
        <div key={order._id}>
          ${order.totalAmount}
        </div>
      ))}
    </div>
  );
}

export default Orders;
