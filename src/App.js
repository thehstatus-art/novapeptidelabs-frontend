import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Disclaimer from "./pages/Disclaimer";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

const API = process.env.REACT_APP_API_URL;

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

  // Load products
  useEffect(() => {
    fetch(`${API}/api/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  // Persist cart
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

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

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/stripe/create-checkout-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItems: cart }),
      });

      const data = await res.json();
      window.location.href = data.url;
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div>
      {/* ROUTES */}
      <Routes>
        <Route
          path="/"
          element={
            <Home
              products={products}
              addToCart={addToCart}
              setCheckoutOpen={setCheckoutOpen}
              cart={cart}
            />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
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

              <div
                id="paypal-button-container"
                style={{ marginTop: "20px" }}
              />
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default App;