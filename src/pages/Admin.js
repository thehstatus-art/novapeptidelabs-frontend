import React, { useEffect, useState } from "react";
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

  const fetchProducts = async () => {
    const res = await fetch(`${API}/api/products`);
    const data = await res.json();
    setProducts(data);
  };

  const fetchOrders = async () => {
    const res = await fetch(`${API}/api/admin/orders`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setOrders(data);
  };

  const fetchStats = async () => {
    const res = await fetch(`${API}/api/admin/stats`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setStats(data);
  };

  useEffect(() => {
    fetchProducts();
    fetchStats();
    fetchOrders();
  }, []);

  /* ================= REVENUE CHART ================= */

  const revenueByDate = orders.reduce((acc, order) => {
    const date = new Date(order.createdAt).toLocaleDateString();
    if (!acc[date]) acc[date] = 0;
    if (order.isPaid) acc[date] += order.totalAmount;
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
    const rows = orders.map(order => ({
      id: order._id,
      total: order.totalAmount,
      status: order.status,
      email: order.customerEmail
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
        <button onClick={() => setActiveTab("dashboard")}>Dashboard</button>
        <button onClick={() => setActiveTab("products")}>Products</button>
        <button onClick={() => setActiveTab("orders")}>Orders</button>
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
                defaultValue={product.stock}
                onBlur={(e) =>
                  updateProduct(product._id, { stock: Number(e.target.value) })
                }
              />

              <button onClick={() => toggleProduct(product._id)}>
                {product.isActive ? "Deactivate" : "Activate"}
              </button>

              <button onClick={() => deleteProduct(product._id)}>
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
              <p><strong>Total:</strong> ${order.totalAmount}</p>

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

const statsGrid = {
  display: "flex",
  gap: "20px",
  marginBottom: "40px",
  flexWrap: "wrap"
};

const card = {
  background: "rgba(8,21,35,0.95)",
  padding: "20px",
  borderRadius: "16px",
  marginBottom: "20px",
  border: "1px solid rgba(110,193,255,0.3)",
  boxShadow: "0 0 20px rgba(110,193,255,0.2)"
};

const primaryBtn = {
  padding: "10px 20px",
  background: "#6ec1ff",
  border: "none",
  borderRadius: "8px",
  marginBottom: "20px",
  cursor: "pointer"
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