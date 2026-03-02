import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import ProductDetail from "./pages/ProductDetail";
import Home from "./pages/Home";


import Disclaimer from "./pages/Disclaimer";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Orders from "./pages/Orders";
import Admin from "./pages/Admin";
import AdminOrders from "./pages/AdminOrders";
import Shop from "./pages/Shop";

const API = "https://nova-backend-lu2l.onrender.com";
const FALLBACK_IMAGE = "/no-image.png";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  /* =============================
     LOAD PRODUCTS
  ============================== */
  useEffect(() => {
    fetch(`${API}/api/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Product load error:", err));
  }, []);

  /* =============================
     CART PERSISTENCE
  ============================== */
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  /* =============================
     CART FUNCTIONS
  ============================== */

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item._id === product._id);

      if (exists) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item._id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  /* =============================
     CHECKOUT
  ============================== */

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert("Cart is empty.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API}/api/orders/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart.map((item) => ({
            productId: item._id,
            quantity: item.quantity
          }))
        })
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Checkout failed.");
      }
    } catch (err) {
      console.error("Checkout error:", err);
    }

    setLoading(false);
  };

  /* =============================
     SAFE IMAGE VALIDATION
  ============================== */

  const getSafeImageUrl = (imageValue) => {
    const value = imageValue?.trim();

    const hasValidImage =
      value &&
      value !== "undefined" &&
      value !== "null" &&
      !value.includes("300x300") &&
      !value.includes("placeholder");

    if (!hasValidImage) return FALLBACK_IMAGE;

    return value.startsWith("/uploads")
      ? `${API}${value}`
      : `${API}/uploads/${value}`;
  };

  /* =============================
     RENDER
  ============================== */

  return (
    <div>
      <Header cart={cart} setCheckoutOpen={setCheckoutOpen} />

      <Routes>
        <Route
          path="/product/:id"
          element={<ProductDetail products={products} addToCart={addToCart} />}
        />
        <Route
          path="/"
          element={<Home products={products} addToCart={addToCart} />}
        />
        <Route
          path="/shop"
          element={<Shop products={products} addToCart={addToCart} />}
        />
        
        
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
      </Routes>

      {checkoutOpen && (
        <div className="checkout-overlay">
          <div className="checkout-container">
            <div className="checkout-left">
              <h2>Shopping Cart</h2>

              {cart.map((item) => (
                <div key={item._id} className="checkout-item">
                  <img
                    src={getSafeImageUrl(item.image)}
                    alt={item.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = FALLBACK_IMAGE;
                    }}
                  />

                  <div className="item-info">
                    <h4>{item.name}</h4>
                    <p>${item.price.toFixed(2)}</p>
                  </div>

                  <div className="qty-controls">
                    <button onClick={() => decreaseQty(item._id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQty(item._id)}>+</button>
                  </div>

                  <div className="subtotal">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="checkout-right">
              <button
                className="back-btn"
                onClick={() => setCheckoutOpen(false)}
              >
                ← Back
              </button>

              <h3>Cart Totals</h3>

              <div className="totals-row">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>

              <button
                className="checkout-btn"
                onClick={handleCheckout}
                disabled={loading}
              >
                {loading ? "Processing..." : "Pay with Debit / Credit Card"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;