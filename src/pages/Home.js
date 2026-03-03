import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

/* ================= Animated Stat Counter ================= */

function Stat({ number, suffix, label }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const increment = number / (duration / 16);

    const counter = setInterval(() => {
      start += increment;
      if (start >= number) {
        setCount(number);
        clearInterval(counter);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(counter);
  }, [number]);

  return (
    <div className="stat">
      <h2>{count}{suffix}</h2>
      <p>{label}</p>
    </div>
  );
}

function Home({ products, addToCart }) {
  const [selected, setSelected] = useState(null);
  const [notification, setNotification] = useState(null);
  const [timer, setTimer] = useState(900);

  /* Countdown */
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  /* Fake Live Purchases */
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

  /* Scroll Reveal */
  useEffect(() => {
    const elements = document.querySelectorAll(".fade-in");

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, { threshold: 0.15 });

    elements.forEach(el => observer.observe(el));
  }, []);

  return (
    <div className="home-container">

      {notification && (
        <div className="live-notification">{notification}</div>
      )}

      {/* ================= HERO ================= */}

      <div className="hero">
        <div className="particles"></div>
        <div className="hero-glow"></div>

        <div className="hero-content fade-in">
          <h1>Advanced Research Peptides</h1>

          <p className="hero-sub">
            Pharmaceutical-grade compounds engineered for serious laboratory research.
            Third-party tested. Ultra-high purity. Zero compromise.
          </p>

          <div className="countdown">
            Limited Batch Ends In: {formatTime(timer)}
          </div>

          <div className="hero-cta">
            <button
              className="primary-btn"
              onClick={() => window.location.href = "/shop"}
            >
              View Products
            </button>

            <button
              className="secondary-btn"
              onClick={() => window.location.href = "/disclaimer"}
            >
              Research Disclaimer
            </button>
          </div>
        </div>
      </div>

      {/* ================= AUTHORITY STRIP ================= */}

      <div className="authority-strip fade-in">
        <div>✔ Third-Party Lab Tested</div>
        <div>✔ 99%+ Purity Guarantee</div>
        <div>✔ Secure Encrypted Checkout</div>
        <div>✔ Fast U.S. Shipping</div>
      </div>

      {/* ================= STATS ================= */}

      <div className="stats-section fade-in">
        <Stat number={10000} suffix="+" label="Orders Fulfilled" />
        <Stat number={99} suffix="%" label="Purity Standards" />
        <Stat number={48} suffix="h" label="Avg. Shipping Time" />
      </div>

      <div className="dna-divider"></div>

      {/* ================= PRODUCTS ================= */}

      <div className="product-grid fade-in">
        {products.map(product => (
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

      {/* ================= LAB PROCESS ================= */}

      <div className="lab-section fade-in">
        <h2>Our Quality Process</h2>

        <div className="lab-steps">
          <div className="lab-step">
            <h3>01</h3>
            <p>Synthesis & Purification</p>
          </div>

          <div className="lab-step">
            <h3>02</h3>
            <p>Independent HPLC Testing</p>
          </div>

          <div className="lab-step">
            <h3>03</h3>
            <p>Secure Packaging & Shipment</p>
          </div>
        </div>
      </div>

      {/* ================= TESTIMONIAL ================= */}

      <div className="testimonial-section fade-in">
        <div className="testimonial-card">
          <p>
            "The purity and consistency of NovaPeptide products exceeded expectations.
            Highly reliable research-grade compounds."
          </p>
          <span>— Research Lab Director</span>
        </div>
      </div>

      {/* ================= NEWSLETTER ================= */}

      <div className="newsletter fade-in">
        <h2>Stay Updated</h2>
        <p>Be the first to know about new compounds and restocks.</p>
        <input type="email" placeholder="Enter your email" />
        <button>Subscribe</button>
      </div>

      {/* ================= FOOTER ================= */}

      <footer className="premium-footer">
        © 2026 NovaPeptide Labs • Third-Party Tested • Secure Checkout • Research Use Only
      </footer>
    </div>
  );
}

export default Home;