import React, { useEffect, useState } from "react";

const API = process.env.REACT_APP_API_URL;
function Admin() {
  const [products, setProducts] = useState([]);

  const token = localStorage.getItem("token");

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API}/api/products`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Toggle visibility
  const toggleProduct = async (id) => {
    await fetch(`${API}/api/products/admin/toggle/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    fetchProducts();
  };

  // Mark sold out
  const markSoldOut = async (id) => {
    await fetch(`${API}/api/products/admin/soldout/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    fetchProducts();
  };

  // Restock
  const restock = async (id) => {
    const amount = prompt("Enter restock amount:");

    await fetch(`${API}/api/products/admin/restock/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ amount: Number(amount) })
    });

    fetchProducts();
  };

  // Delete
  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    await fetch(`${API}/api/products/admin/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    fetchProducts();
  };

  return (
    <div style={{ padding: "60px" }}>
      <h1>Admin Dashboard</h1>

      {products.map((product) => (
        <div
          key={product._id}
          style={{
            border: "1px solid #6ec1ff",
            padding: "20px",
            marginBottom: "20px",
            borderRadius: "12px",
            background: "#081523"
          }}
        >
          <h3>{product.name}</h3>

          <p>
            Stock:{" "}
            <span style={{ color: product.stock < 5 ? "red" : "white" }}>
              {product.stock}
            </span>
          </p>

          <p>
            Status: {product.isActive ? "Active" : "Hidden"}
          </p>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button onClick={() => toggleProduct(product._id)}>
              {product.isActive ? "Deactivate" : "Activate"}
            </button>

            <button onClick={() => markSoldOut(product._id)}>
              Mark Sold Out
            </button>

            <button onClick={() => restock(product._id)}>
              Restock
            </button>

            <button onClick={() => deleteProduct(product._id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Admin;