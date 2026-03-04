import React, { useState, useEffect } from "react";
import React, { useState, useEffect, useRef } from "react";


function Home({ products, addToCart }) {
  
  const [notification, setNotification] = useState(null);

  /* ================= Fake Live Purchases ================= */

  useEffect(() => {
  const names = [
    "Michael",
    "Daniel",
    "Chris",
    "Anthony",
    "Ryan",
    "Brandon",
    "Ethan",
    "Jason"
  ];

  const cities = [
    "New York",
    "Los Angeles",
    "Miami",
    "Chicago",
    "Houston",
    "Dallas",
    "Phoenix",
    "Atlanta",
    "Las Vegas",
    "San Diego"
  ];

  const interval = setInterval(() => {
    const name = names[Math.floor(Math.random() * names.length)];
    const city = cities[Math.floor(Math.random() * cities.length)];

    const messages = [
      `${name} from ${city} just placed an order`,
      `${name} in ${city} secured a compound`,
      `${name} from ${city} completed a checkout`,
      `${name} in ${city} ordered a research peptide`
    ];

    const randomMessage =
      messages[Math.floor(Math.random() * messages.length)];

    setNotification(randomMessage);

    setTimeout(() => setNotification(null), 4000);

  }, 12000);

  return () => clearInterval(interval);
}, []);

  return (
    <div className="home-container">

      {notification && (
        <div className="live-notification">{notification}</div>
      )}

      {/* ================= HERO ================= */}

      <div className="hero">
        <div className="hero-content fade-in">

          <h1>Advanced Research Peptides</h1>

          <p className="hero-sub">
            Pharmaceutical-grade compounds engineered for serious laboratory research.
            Third-party tested. Ultra-high purity. Zero compromise.
          </p>

          {/* ===== ELITE TRUST PANEL ===== */}

          <div className="trust-panel">

            <div className="trust-item elite">
              <span className="trust-icon">🧪</span>
              <div className="trust-content">
                <h4>Third-Party Lab Verified</h4>
                <p>Each batch independently tested for analytical accuracy</p>
              </div>
            </div>

            <div className="trust-item elite">
              <span className="trust-icon">📊</span>
              <div className="trust-content">
                <h4>99%+ Purity Standards</h4>
                <p>HPLC certified compounds meeting strict research criteria</p>
              </div>
            </div>

            <div className="trust-item elite">
              <span className="trust-icon">🔒</span>
              <div className="trust-content">
                <h4>Secure Encrypted Checkout</h4>
                <p>Enterprise-grade SSL protection</p>
              </div>
            </div>

            <div className="trust-item elite">
              <span className="trust-icon">🚚</span>
              <div className="trust-content">
                <h4>Rapid U.S. Fulfillment</h4>
                <p>Orders processed within 24–48 hours</p>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* ================= PRODUCTS ================= */}

      <div className="product-grid fade-in">
        {products.map((product) => (
          <div className="card" key={product._id}>

            <Link
              to={`/product/${product._id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <img src={product.image} alt={product.name} />

              <div className="card-body">
                <h3>{product.name}</h3>
                <p className="category">{product.category}</p>
                <p className="price">${product.price}</p>
              </div>
            </Link>

            <div className="card-overlay">
              <p>{product.description}</p>
              <button
                disabled={product.stock === 0}
                onClick={() => addToCart(product)}
              >
                {product.stock > 0 ? "ADD TO CART" : "SOLD OUT"}
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* ================= FOOTER ================= */}

      <footer className="premium-footer">
        © 2026 NovaPeptide Labs • Third-Party Tested • Secure Checkout • Research Use Only
      </footer>

    </div>
  );
}

export default Home;