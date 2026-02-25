import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";
import { Routes, Route, Link } from "react-router-dom";

const API = "https://nova-backend-lu2l.onrender.com";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  /* ======================
     FETCH PRODUCTS
  ====================== */
  useEffect(() => {
    axios
      .get(`${API}/api/products`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Product fetch error:", err));
  }, []);

  /* ======================
     PAYPAL BUTTON RENDER
  ====================== */
  useEffect(() => {
    if (checkoutOpen && window.paypal) {
      window.paypal
        .Buttons({
          style: {
            layout: "vertical",
            color: "gold",
            shape: "rect",
            label: "paypal",
          },
          createOrder: async () => {
            const res = await axios.post(
              `${API}/api/paypal/create-order`,
              { cartItems: cart }
            );
            return res.data.id;
          },
          onApprove: async (data) => {
            await axios.post(`${API}/api/paypal/capture-order`, {
              orderID: data.orderID,
              cartItems: cart,
            });

            alert("PayPal Payment Successful!");
            setCart([]);
            setCheckoutOpen(false);
          },
          onError: (err) => {
            console.error(err);
            alert("PayPal payment failed.");
          },
        })
        .render("#paypal-button-container");
    }
  }, [checkoutOpen, cart]);

  /* ======================
     CART LOGIC
  ====================== */
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item._id === product._id);
      if (existing) {
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
      prev.map((item) =>
        item._id === id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
  };

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  /* ======================
     STRIPE CHECKOUT
  ====================== */
  const handleCheckout = async () => {
    if (cart.length === 0) return;

    try {
      setLoading(true);

      const res = await axios.post(
        `${API}/api/stripe/create-checkout-session`,
        { cartItems: cart }
      );

      if (res.data?.url) {
        window.location.href = res.data.url;
      } else {
        alert("Stripe did not return URL");
      }
    } catch (err) {
      console.error(err);
      alert("Checkout failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">

      {/* HEADER */}
      <div className="header-wrapper">

        <div className="top-bar">
          <div className="logo">
            <span className="logo-glow">NovaPeptide</span>
            <span className="labs">LABS</span>
          </div>

          <div className="account-cart">
            <button className="login-btn">
              LOGIN / REGISTER
            </button>

            <button
              className="cart"
              onClick={() => setCheckoutOpen(true)}
            >
              CART / ${cartTotal.toFixed(2)}
            </button>
          </div>
        </div>

        <div className="nav-bar">
          <Link to="/shop">SHOP</Link>
          <Link to="/about">ABOUT</Link>
          <Link to="/contact">CONTACT</Link>
          <Link to="/terms">TERMS & CONDITIONS</Link>
          <Link to="/privacy">PRIVACY POLICY</Link>
          <Link to="/disclaimer">RESEARCH USE DISCLAIMER</Link>
        </div>
      </div>

      {/* ROUTES */}
      <Routes>

        <Route
          path="/"
          element={
            <>
              <section className="hero">
                <h1>Advanced Research Peptides</h1>
                <p>
                  Pharmaceutical-grade compounds engineered for
                  laboratory precision and research excellence.
                </p>
              </section>
              <div className="products">
                {products.length === 0 ? (
                  <div style={{ color: '#38bdf8', textAlign: 'center', width: '100%' }}>
                    No products found.
                  </div>
                ) : (
                  products.map((product) => (
                    <ProductCard
                      key={product._id}
                      product={product}
                      addToCart={addToCart}
                    />
                  ))
                )}
              </div>
            </>
          }
        />

        <Route
          path="/shop"
          element={
            <div className="products">
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  addToCart={addToCart}
                />
              ))}
            </div>
          }
        />

        <Route
          path="/about"
          element={
            <section className="legal-page premium-about">
              <div className="about-hero">
                <h2>About <span className="logo-glow">NovaPeptide</span></h2>
                <p className="about-tagline">Redefining Research Excellence</p>
              </div>
              <div className="about-content">
                <div className="about-card">
                  <h3>Our Mission</h3>
                  <p>
                    NovaPeptide is dedicated to providing pharmaceutical-grade research compounds engineered for precision, purity, and innovation. Our mission is to empower scientists and researchers with the highest quality peptides and compounds for groundbreaking discoveries.
                  </p>
                </div>
                <div className="about-card">
                  <h3>Why Choose Us?</h3>
                  <ul>
                    <li>99%+ Purity, Lab-Tested Batches</li>
                    <li>Fast, Secure, and Discreet Shipping</li>
                    <li>Dedicated Support for Research Professionals</li>
                    <li>Transparent Sourcing &amp; Full Documentation</li>
                  </ul>
                </div>
                <div className="about-card">
                  <h3>Our Facilities</h3>
                  <p>
                    All products are manufactured in state-of-the-art, GMP-compliant facilities, ensuring the highest standards of quality and safety for your research needs.
                  </p>
                </div>
              </div>
              <div className="about-footer">
                <span className="logo-glow">NovaPeptide</span> — Trusted by leading laboratories worldwide.
              </div>
            </section>
          }
        />

        <Route
          path="/contact"
          element={
            <section className="legal-page">
              <h2>Contact Us</h2>
              <p>Email: support@novapeptide.com</p>
              <p>Mon–Fri 9AM–5PM EST</p>
            </section>
          }
        />

        <Route
          path="/terms"
          element={
            <section className="legal-page">
              <h2>Terms & Conditions</h2>
              <p>All research compounds are for laboratory use only. Not for human consumption.</p>
            </section>
          }
        />

        <Route
          path="/privacy"
          element={
            <section className="legal-page">
              <h2>Privacy Policy</h2>
              <p>Your personal information is protected and never shared with third parties.</p>
            </section>
          }
        />

        <Route
          path="/disclaimer"
          element={
            <section className="legal-page">
              <h2>Research Use Disclaimer</h2>
              <p>These products are intended for research purposes only and must be handled in accordance with applicable regulations.</p>
            </section>
          }
        />

      </Routes>

      {/* CHECKOUT OVERLAY */}
      {checkoutOpen && (
        <div className="checkout-overlay">
          <div className="checkout-container">

            <div className="checkout-left">
              <h2>Shopping Cart</h2>

              {cart.map((item) => (
                <div key={item._id} className="checkout-item">
                  <img src={`${API}${item.image}`} alt={item.name} />

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
                {loading
                  ? "Processing..."
                  : "Pay with Debit / Credit Card"}
              </button>

              <div id="paypal-button-container"
                   style={{ marginTop: "20px" }}>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

function ProductCard({ product, addToCart }) {
  return (
    <div className="card">
      <img src={`${API}${product.image}`} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="price">${product.price.toFixed(2)}</p>
      <button onClick={() => addToCart(product)}>
        ADD TO CART
      </button>
    </div>
  );
}

export default App;