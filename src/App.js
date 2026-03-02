import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { PayPalButtons, PayPalMarks } from "@paypal/react-paypal-js";

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

  /* ================= LOAD PRODUCTS ================= */

  useEffect(() => {
    fetch(`${API}/api/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Product load error:", err));
  }, []);

  /* ================= CART STORAGE ================= */

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  /* ================= CART FUNCTIONS ================= */

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

  /* ================= STRIPE CHECKOUT ================= */

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

  /* ================= RENDER ================= */

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
          <div className="checkout-panel">

            {/* LEFT SIDE */}
            <div className="checkout-left">
              <h2>Your Cart</h2>

              {cart.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                cart.map((item) => (
                  <div key={item._id} className="checkout-item">
                    <img
                      src={
                        item.image?.startsWith("/uploads")
                          ? `${API}${item.image}`
                          : `${API}/uploads/${item.image}`
                      }
                      alt={item.name}
                    />

                    <div className="checkout-item-info">
                      <h4>{item.name}</h4>
                      <p>${item.price.toFixed(2)}</p>

                      <div className="qty-controls">
                        <button onClick={() => decreaseQty(item._id)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => increaseQty(item._id)}>+</button>
                      </div>
                    </div>

                    <div className="checkout-subtotal">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* RIGHT SIDE */}
            <div className="checkout-right">
              <button
                className="close-checkout"
                onClick={() => setCheckoutOpen(false)}
              >
                ✕
              </button>

              <h3>Order Summary</h3>

              <div className="summary-row">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>

              {/* Stripe */}
              <button
                className="checkout-stripe-btn"
                onClick={handleCheckout}
                disabled={loading}
              >
                {loading ? "Processing..." : "Pay with Card"}
              </button>

              {/* PayPal */}
              <div className="paypal-section">
                <PayPalButtons
                  style={{
                    layout: "vertical",
                    color: "gold",
                    shape: "rect",
                    label: "paypal",
                    height: 45
                  }}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            value: cartTotal.toFixed(2)
                          }
                        }
                      ]
                    });
                  }}
                  onApprove={async (data, actions) => {
                    await actions.order.capture();

                    await fetch(`${API}/api/orders/paypal`, {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        paypalOrderId: data.orderID,
                        items: cart
                      })
                    });

                    alert("Payment successful!");
                    setCheckoutOpen(false);
                  }}
                />

                <div className="paypal-paylater">
                  <PayPalMarks fundingSource="paylater" />
                </div>
              </div>

              <div className="secure-badge">
                🔒 Secure encrypted checkout
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default App;