import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { AnimatePresence, motion } from "framer-motion";

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
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";

const API = "https://nova-backend-lu2l.onrender.com";
const FALLBACK_IMAGE = "/no-image.png";

/* ================= Page Transition Wrapper ================= */

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -30 }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.div>
);

function App() {
  const location = useLocation();

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  /* ================= LOADING SCREEN ================= */

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  /* ================= LOAD PRODUCTS ================= */

  useEffect(() => {
    fetch(`${API}/api/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Product load error:", err));
  }, []);

  /* ================= SAVE CART ================= */

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
      console.error("Stripe checkout error:", err);
      alert("Checkout failed.");
    }
  };

  /* ================= PAYPAL SUCCESS ================= */

  const handlePayPalSuccess = async (orderID) => {
    await fetch(`${API}/api/orders/paypal`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        paypalOrderId: orderID,
        items: cart
      })
    });

    setCart([]);
    setCheckoutOpen(false);
  };

  /* ================= LOADER ================= */

  if (loading) {
    return (
      <div className="loader-screen">
        <div className="loader-logo">NovaPeptide Labs</div>
      </div>
    );
  }

  return (
    <>
      <Header cart={cart} setCheckoutOpen={setCheckoutOpen} />

      {/* ================= ROUTE TRANSITIONS ================= */}

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageWrapper>
                <Home products={products} addToCart={addToCart} />
              </PageWrapper>
            }
          />
          <Route
            path="/shop"
            element={
              <PageWrapper>
                <Shop products={products} addToCart={addToCart} />
              </PageWrapper>
            }
          />
          <Route
            path="/product/:id"
            element={
              <PageWrapper>
                <ProductDetail products={products} addToCart={addToCart} />
              </PageWrapper>
            }
          />
          <Route path="/success" element={<PageWrapper><Success /></PageWrapper>} />
          <Route path="/cancel" element={<PageWrapper><Cancel /></PageWrapper>} />
          <Route path="/disclaimer" element={<PageWrapper><Disclaimer /></PageWrapper>} />
          <Route path="/privacy" element={<PageWrapper><Privacy /></PageWrapper>} />
          <Route path="/terms" element={<PageWrapper><Terms /></PageWrapper>} />
          <Route path="/orders" element={<PageWrapper><Orders /></PageWrapper>} />
          <Route path="/admin" element={<PageWrapper><Admin /></PageWrapper>} />
          <Route path="/admin/orders" element={<PageWrapper><AdminOrders /></PageWrapper>} />
        </Routes>
      </AnimatePresence>

      {/* ================= CHECKOUT DRAWER ================= */}

      {checkoutOpen && (
        <div className="checkout-overlay">
          <div className="checkout-panel">

            <div className="checkout-left">
              <h2>Your Cart</h2>
              {cart.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                cart.map((item) => (
                  <div key={item._id} className="checkout-item">
                    <img
                      src={
                        item.image && item.image.startsWith("http")
                          ? item.image
                          : FALLBACK_IMAGE
                      }
                      alt={item.name}
                    />
                    <div>
                      <h4>{item.name}</h4>
                      <p>${item.price.toFixed(2)}</p>
                      <div className="qty-controls">
                        <button onClick={() => decreaseQty(item._id)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => increaseQty(item._id)}>+</button>
                      </div>
                    </div>
                    <div>${(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                ))
              )}
            </div>

            <div className="checkout-right">
              <button className="close-checkout" onClick={() => setCheckoutOpen(false)}>✕</button>

              <h3>Order Summary</h3>

              <div className="summary-row total">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>

              <button
                className="stripe-premium-btn"
                onClick={handleCheckout}
              >
                💳 Pay with Debit / Credit Card
              </button>

              <div className="paypal-section">
                <PayPalButtons
                  style={{
                    layout: "vertical",
                    color: "gold",
                    shape: "rect",
                    label: "paypal",
                    height: 50
                  }}
                  createOrder={(data, actions) =>
                    actions.order.create({
                      purchase_units: [{ amount: { value: cartTotal.toFixed(2) } }]
                    })
                  }
                  onApprove={async (data, actions) => {
                    await actions.order.capture();
                    await handlePayPalSuccess(data.orderID);
                  }}
                />
              </div>

              <div className="secure-badge">
                🔒 Secure encrypted checkout
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}

export default App;