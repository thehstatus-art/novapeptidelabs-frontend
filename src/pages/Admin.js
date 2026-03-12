import React, { useEffect, useState, useCallback } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

const API = process.env.REACT_APP_API_URL;

function Admin() {
  const token = localStorage.getItem("token");

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    cost: "",
    stock: "",
    description: "",
    category: "",
    image: ""
  });

  /* ================= FETCH DATA ================= */

  const fetchProducts = useCallback(async () => {
  try {
    const res = await fetch(`${API}/api/products`);
    const data = await res.json();
    setProducts(data);
  } catch (err) {
    console.error("Products fetch failed", err);
  }
}, []);

const fetchOrders = useCallback(async () => {
  try {
    const res = await fetch(`${API}/api/admin/orders`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setOrders(data);
  } catch (err) {
    console.error("Orders fetch failed", err);
  }
}, [token]);

const fetchStats = useCallback(async () => {
  try {
    const res = await fetch(`${API}/api/admin/stats`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setStats(data);
  } catch (err) {
    console.error("Stats fetch failed", err);
  }
}, [token]);
useEffect(() => {
  fetchProducts();
  fetchStats();
  fetchOrders();
}, [fetchProducts, fetchStats, fetchOrders]);

  /* ================= REVENUE CHART ================= */

  const revenueByDate = orders.reduce((acc, order) => {
    const date = new Date(order.createdAt).toLocaleDateString();
    if (!acc[date]) acc[date] = 0;
    const paid = order.isPaid || order.status === "paid";
    if (paid) acc[date] += order.totalAmount;
    return acc;
  }, {});

  const chartData = Object.keys(revenueByDate).map(date => ({
    date,
    revenue: revenueByDate[date]
  }));

  /* ================= PRODUCT ACTIONS ================= */

  const updateProduct = async (id, updates) => {
    await fetch(`${API}/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(updates)
    });
    fetchProducts();
  };

  const toggleProduct = async (id) => {
    await fetch(`${API}/api/products/admin/toggle/${id}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchProducts();
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete product?")) return;
    await fetch(`${API}/api/products/admin/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchProducts();
  };

  /* ================= ORDER ACTIONS ================= */

  const updateOrderStatus = async (id, status) => {
    await fetch(`${API}/api/orders/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ status })
    });
    fetchOrders();
  };

  const handleRefund = async (id) => {
    if (!window.confirm("Issue refund?")) return;
    await fetch(`${API}/api/orders/refund/${id}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchOrders();
  };

  /* ================= CSV EXPORT ================= */

  const exportCSV = () => {
    if (!orders.length) return alert("No orders to export");

    const rows = orders.map(order => ({
      id: order._id,
      total: order.totalAmount || 0,
      status: order.status,
      email: order.email || order.customerEmail || ""
    }));

    const csv =
      "data:text/csv;charset=utf-8," +
      Object.keys(rows[0]).join(",") +
      "\n" +
      rows.map(e => Object.values(e).join(",")).join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = "orders.csv";
    document.body.appendChild(link);
    link.click();
  };

  /* ================= CREATE PRODUCT ================= */

  const handleCreateProduct = async () => {
    await fetch(`${API}/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        ...formData,
        price: Number(formData.price),
        cost: Number(formData.cost),
        stock: Number(formData.stock)
      })
    });

    setShowModal(false);
    fetchProducts();
  };

  /* ================= UI ================= */

  return (
    <div style={adminWrapper}>
      <h1>Nova Admin Control Center</h1>

      <div style={tabBar}>
  <button
    style={tabBtn(activeTab === "dashboard")}
    onClick={() => setActiveTab("dashboard")}
  >
    Dashboard
  </button>

  <button
    style={tabBtn(activeTab === "products")}
    onClick={() => setActiveTab("products")}
  >
    Products
  </button>

  <button
    style={tabBtn(activeTab === "orders")}
    onClick={() => setActiveTab("orders")}
  >
    Orders
  </button>
</div>

      {/* ===== DASHBOARD ===== */}
      {activeTab === "dashboard" && stats && (
        <>
          <div style={statsGrid}>
            <Stat title="Revenue" value={`$${stats.totalRevenue}`} />
            <Stat title="Orders" value={stats.totalOrders} />
            <Stat title="Paid" value={stats.paidOrders} />
            <Stat title="Pending" value={stats.pendingOrders} />
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid stroke="#333" />
              <XAxis dataKey="date" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#6ec1ff"
              />
            </LineChart>
          </ResponsiveContainer>
        </>
      )}

      {/* ===== PRODUCTS ===== */}
      {activeTab === "products" && (
        <>
          <button style={primaryBtn} onClick={() => setShowModal(true)}>
            + Add Product
          </button>

          {products.map(product => (
            <div key={product._id} style={card}>
              <h3>{product.name}</h3>

              <input
                type="number"
                defaultValue={product.price}
                onBlur={(e) =>
                  updateProduct(product._id, { price: Number(e.target.value) })
                }
              />

              <input
                type="number"
                defaultValue={product.cost || 0}
                onBlur={(e) =>
                  updateProduct(product._id, { cost: Number(e.target.value) })
                }
              />

              <p>
                Profit: $
                {(product.price - (product.cost || 0)).toFixed(2)}
              </p>

              <input
                type="number"
                defaultValue={product.stock || 0}
                style={inputStyle}
                placeholder="Stock"
                onBlur={(e) =>
                  updateProduct(product._id, { stock: Number(e.target.value) })
                }
              />

              <button
  style={actionBtn}
  onClick={() => toggleProduct(product._id)}
>
  {product.isActive ? "Deactivate" : "Activate"}
</button>

              <button
  style={dangerBtn}
  onClick={() => deleteProduct(product._id)}
>
  Delete
</button>
            </div>
          ))}
        </>
      )}

      {/* ===== ORDERS ===== */}
      {activeTab === "orders" && (
        <>
          <button style={primaryBtn} onClick={exportCSV}>
            Export CSV
          </button>

          {orders.map(order => (
            <div key={order._id} style={card}>
              <p><strong>ID:</strong> {order._id}</p>
              <p><strong>Email:</strong> {order.email || order.customerEmail || "N/A"}</p>
              <p><strong>Total:</strong> ${order.totalAmount || order.total || 0}</p>
              <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                <strong>Items:</strong>
                {order.items && order.items.map((item, i) => {
                  const name = item.product?.name || item.name || "Unknown Product";
                  const price = item.product?.price || item.price || 0;
                  const qty = item.quantity || 1;

                  return (
                    <div
                      key={i}
                      style={{
                        fontSize: "14px",
                        opacity: 0.95,
                        display: "flex",
                        justifyContent: "space-between",
                        borderBottom: "1px solid rgba(255,255,255,0.05)",
                        padding: "4px 0"
                      }}
                    >
                      <span>{name} × {qty}</span>
                      <span>${(price * qty).toFixed(2)}</span>
                    </div>
                  );
                })}
              </div>
<p><strong>Tracking:</strong> {order.trackingNumber || "Not generated"}</p>

{order.shippingLabelUrl && (
  <a
    href={order.shippingLabelUrl}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      display: "inline-block",
      marginTop: "8px",
      color: "#6ec1ff",
      textDecoration: "none",
      border: "1px solid rgba(110,193,255,0.4)",
      padding: "6px 12px",
      borderRadius: "6px"
    }}
  >
    📦 Download Shipping Label
  </a>
)}
              <select
                value={order.status}
                onChange={(e) =>
                  updateOrderStatus(order._id, e.target.value)
                }
              >
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="shipped">Shipped</option>
                <option value="completed">Completed</option>
                <option value="refunded">Refunded</option>
              </select>

              <button onClick={() => handleRefund(order._id)}>
                Refund
              </button>
            </div>
          ))}
        </>
      )}

      {/* ===== MODAL ===== */}
      {showModal && (
        <div style={modalOverlay}>
          <div style={modalBox}>
            <h2>Add Product</h2>

            {Object.keys(formData).map(field => (
              <input
                key={field}
                placeholder={field}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [field]: e.target.value
                  })
                }
              />
            ))}

            <button onClick={handleCreateProduct}>Create</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ===== COMPONENTS ===== */

const Stat = ({ title, value }) => (
  <div style={card}>
    <h3>{title}</h3>
    <p style={{ fontSize: "24px" }}>{value}</p>
  </div>
);

/* ===== STYLES ===== */

const adminWrapper = {
  minHeight: "100vh",
  padding: "60px",
  background: "linear-gradient(135deg,#05080f,#0d1f35)",
  color: "white"
};

const tabBar = {
  display: "flex",
  gap: "20px",
  marginBottom: "40px"
};

const tabBtn = (active) => ({
  padding: "10px 20px",
  background: active
    ? "linear-gradient(135deg,#0f2b46,#123a63)"
    : "transparent",
  border: "1px solid rgba(110,193,255,0.3)",
  borderRadius: "8px",
  color: "#6ec1ff",
  cursor: "pointer",
  boxShadow: active
    ? "0 0 15px rgba(110,193,255,0.4)"
    : "none",
  transition: "all 0.25s ease"
});

const statsGrid = {
  display: "flex",
  gap: "20px",
  marginBottom: "40px",
  flexWrap: "wrap"
};

const card = {
  background: "rgba(8,21,35,0.95)",
  padding: "25px",
  borderRadius: "16px",
  marginBottom: "20px",
  border: "1px solid rgba(110,193,255,0.2)",
  boxShadow: "0 0 25px rgba(110,193,255,0.15)",
  backdropFilter: "blur(10px)"
};

const primaryBtn = {
  padding: "10px 20px",
  background: "#6ec1ff",
  border: "none",
  borderRadius: "8px",
  marginBottom: "20px",
  cursor: "pointer"
};
const actionBtn = {
  padding: "10px 18px",
  background: "linear-gradient(135deg,#0f2b46,#123a63)",
  border: "1px solid rgba(110,193,255,0.5)",
  borderRadius: "10px",
  color: "#6ec1ff",
  cursor: "pointer",
  marginRight: "10px",
  transition: "all 0.25s ease",
  boxShadow: "0 0 12px rgba(110,193,255,0.3)"
};

const dangerBtn = {
  padding: "10px 18px",
  background: "linear-gradient(135deg,#2a0f18,#3f1522)",
  border: "1px solid rgba(255,80,80,0.5)",
  borderRadius: "10px",
  color: "#ff6b6b",
  cursor: "pointer",
  transition: "all 0.25s ease",
  boxShadow: "0 0 12px rgba(255,80,80,0.3)"
};

const inputStyle = {
  background: "#0d1f35",
  border: "1px solid rgba(110,193,255,0.3)",
  padding: "8px",
  borderRadius: "8px",
  color: "white",
  marginBottom: "10px",
  width: "100%"
};

const modalOverlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.7)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const modalBox = {
  background: "#081523",
  padding: "30px",
  borderRadius: "12px",
  width: "400px",
  display: "flex",
  flexDirection: "column",
  gap: "12px"
};

export default Admin;