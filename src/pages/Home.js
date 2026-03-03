import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

function Home({ products, addToCart }) {
  const [selected, setSelected] = useState(null);
  const [notification, setNotification] = useState(null);
  const [timer, setTimer] = useState(900); // 15 minutes
  const API = "https://nova-backend-lu2l.onrender.com";

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  useEffect(() => {
    const names = ["Michael", "Sarah", "David", "James", "Daniel"];
    const cities = ["New York", "Texas", "California", "Florida"];

    const interval = setInterval(() => {
      const name = names[Math.floor(Math.random() * names.length)];
      const city = cities[Math.floor(Math.random() * cities.length)];

      setNotification(`${name} from ${city} purchased a research compound`);

      setTimeout(() => setNotification(null), 4000);
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-container">
      {notification && (
        <div className="live-notification">
          {notification}
        </div>
      )}
      <div className="hero">
        <h1>Advanced Research Peptides</h1>

        <p className="hero-sub">
          Pharmaceutical-Grade Compounds for Laboratory Research Only.
        </p>

        <div className="countdown">
          Limited Batch Ends In: {formatTime(timer)}
        </div>

        <div className="hero-cta">
          <button
            className="primary-btn"
            onClick={() => window.scrollTo({ top: 700, behavior: "smooth" })}
          >
            Shop Now
          </button>

          <button
            className="secondary-btn"
            onClick={() => window.location.href = "/disclaimer"}
          >
            Research Disclaimer
          </button>
        </div>
      </div>
      <div className="trust-section">
        <div>✔ Lab Tested</div>
        <div>✔ Secure Checkout</div>
        <div>✔ Fast US Shipping</div>
        <div>✔ Research Use Only</div>
      </div>
      <div className="newsletter">
        <h2>Stay Updated</h2>
        <p>Be the first to know about new compounds and restocks.</p>

        <input type="email" placeholder="Enter your email" />
        <button>Subscribe</button>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <div className="card" key={product._id}>
            <Link to={`/product/${product._id}`} style={{ textDecoration: "none", color: "inherit" }}>
              <img
  src={
    product.image?.startsWith("/uploads")
      ? `${API}${product.image}`
      : `${API}/uploads/${product.image}`
  }
  alt={product.name}
/>
              <div className="card-body">
                <h3>{product.name}</h3>
                <p className="category">{product.category}</p>
                <p className="purity">Purity: {product.purity}</p>
                <p className="price">${product.price}</p>
              </div>
            </Link>
            <p className={`stock ${product.stock < 10 ? "low" : ""}`}>
              {product.stock > 0
                ? `In Stock (${product.stock})`
                : "Out of Stock"}
            </p>
            <button
              disabled={product.stock === 0}
              onClick={() => addToCart(product)}
            >
              {product.stock > 0 ? "ADD TO CART" : "SOLD OUT"}
            </button>
          </div>
        ))}
      </div>
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <img src={`${API}${selected.image}`} alt={selected.name} />
            <h2>{selected.name}</h2>
            <p>${selected.price.toFixed(2)}</p>
            <button onClick={() => {
              addToCart(selected);
              setSelected(null);
            }}>
              ADD TO CART
            </button>
            <p className="secure-badge">
              🔒 Secure Checkout • Encrypted Payments
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;