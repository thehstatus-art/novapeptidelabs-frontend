import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { AnimatePresence, motion } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import Particles from "react-tsparticles";
import AgeGate from "./components/AgeGate";
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
import ReconstitutionTool from "./pages/ReconstitutionTool";
import Checkout from "./pages/Checkout";
import EmailCapture from "./components/EmailCapture";
import CompoundDatabase from "./pages/CompoundDatabase";
import VerifyBatch from "./pages/VerifyBatch";
import ResearchLibrary from "./pages/ResearchLibrary";
import "./App.css";
import { useNavigate } from "react-router-dom";
const API = "https://nova-backend-lu2l.onrender.com";
const FALLBACK_IMAGE = "/no-image.png";

/* ================= PAGE TRANSITION ================= */

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -40 }}
    transition={{ duration: 0.6, ease: "easeInOut" }}
  >
    {children}
  </motion.div>
);

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const spotlightRef = useRef(null);

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

  /* ================= LOADER ================= */

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  /* ================= SMOOTH SCROLL ================= */

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.1, smooth: true });
    let rafId;

    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  /* ================= SPOTLIGHT ================= */

  useEffect(() => {
    const spotlight = document.createElement("div");
    spotlight.className = "spotlight";
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    const move = (e) => {
      spotlight.style.transform = `translate(${e.clientX - 300}px, ${e.clientY - 300}px)`;
    };

    window.addEventListener("mousemove", move);

    return () => {
      window.removeEventListener("mousemove", move);
      if (spotlightRef.current) {
        document.body.removeChild(spotlightRef.current);
      }
    };
  }, []);

  /* ================= LOAD PRODUCTS ================= */

  useEffect(() => {
    fetch(`${API}/api/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Product load error:", err));
  }, []);

  /* ================= MAGNETIC BUTTONS ================= */

  useEffect(() => {
    const timer = setTimeout(() => {
      const magnets = document.querySelectorAll(".magnetic");

      magnets.forEach((btn) => {
        const handleMove = (e) => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        };

        const reset = () => {
          btn.style.transform = "translate(0,0)";
        };

        btn.addEventListener("mousemove", handleMove);
        btn.addEventListener("mouseleave", reset);
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [location, checkoutOpen]);

  /* ================= PRODUCT TILT (SAFE) ================= */

useEffect(() => {
  const timer = setTimeout(() => {

    // ONLY target product grid cards
    const cards = document.querySelectorAll(".product-grid .card");

    cards.forEach((card) => {
      const handleMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateX = -(y - rect.height / 2) / 25;
        const rotateY = (x - rect.width / 2) / 25;

        card.style.transform =
          `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
      };

      const reset = () => {
        card.style.transform = "rotateX(0) rotateY(0) scale(1)";
      };

      card.addEventListener("mousemove", handleMove);
      card.addEventListener("mouseleave", reset);
    });

  }, 400);

  return () => clearTimeout(timer);

}, [products, location]);

  /* ================= SMART CTA PULSE ================= */

  useEffect(() => {
    const lowStock = products.some(p => p.stock && p.stock < 10);

    if (lowStock) {
      setTimeout(() => {
        const btn = document.querySelector(".stripe-premium-btn");
        if (btn) btn.classList.add("pulse-cta");
      }, 500);
    }
  }, [products]);

  /* ================= SAVE CART ================= */

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  /* ================= CART LOGIC ================= */

  const addToCart = (product) => {
  setCart(prev => {
    const exists = prev.find(item => item._id === product._id);

    if (exists) {
      return prev.map(item =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }

    return [...prev, { ...product, quantity: 1 }];
  });
};

  const increaseQty = (id) => {
    setCart(prev =>
      prev.map(item =>
        item._id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart(prev =>
      prev
        .map(item =>
          item._id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const handleCheckout = async () => {
    if (cart.length === 0) return alert("Cart is empty.");

    try {
      const res = await fetch(`${API}/api/orders/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart.map(item => ({
            productId: item._id,
            quantity: item.quantity
          }))
        })
      });

      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else alert("Checkout failed.");
    } catch (err) {
      console.error(err);
      alert("Checkout failed.");
    }
  };

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

  if (loading) {
    return (
      
      
      <div className="loader-screen">
        <div className="loader-logo">NovaPeptide Labs</div>
      </div>
    );
  }

  return (
  
  <>
  <EmailCapture />

  <div className="depth-layer"></div>
  <AgeGate />
    <div className="depth-layer"></div>

    <Particles
      options={{
        fpsLimit: 60,
        particles: {
          number: { value: 25 },
          color: { value: "#6ec1ff" },
          opacity: { value: 0.12 },
          size: { value: 2 },
          move: { enable: true, speed: 0.4 },
          links: {
            enable: true,
            distance: 120,
            opacity: 0.08,
            color: "#6ec1ff"
          }
        }
      }}
      style={{ position: "fixed", top: 0, left: 0, zIndex: -4 }}
    />

    <Header cart={cart} setCheckoutOpen={setCheckoutOpen} />

    <AnimatePresence mode="wait">
  <Routes location={location} key={location.pathname}>

    <Route
      path="/"
      element={<PageWrapper><Home products={products} addToCart={addToCart} /></PageWrapper>}
    />

    <Route
      path="/shop"
      element={<PageWrapper><Shop products={products} addToCart={addToCart} /></PageWrapper>}
    />

    <Route
      path="/product/:id"
      element={<PageWrapper><ProductDetail products={products} addToCart={addToCart} /></PageWrapper>}
    />

    <Route
      path="/success"
      element={<PageWrapper><Success /></PageWrapper>}
    />

    <Route
      path="/cancel"
      element={<PageWrapper><Cancel /></PageWrapper>}
    />

    <Route
      path="/disclaimer"
      element={<PageWrapper><Disclaimer /></PageWrapper>}
    />

    <Route
      path="/privacy"
      element={<PageWrapper><Privacy /></PageWrapper>}
    />

    <Route
      path="/terms"
      element={<PageWrapper><Terms /></PageWrapper>}
    />

    <Route
      path="/orders"
      element={<PageWrapper><Orders /></PageWrapper>}
    />

    <Route
      path="/admin"
      element={<PageWrapper><Admin /></PageWrapper>}
    />

    <Route
      path="/admin/orders"
      element={<PageWrapper><AdminOrders /></PageWrapper>}
    />

    <Route
      path="/research"
      element={<PageWrapper><ResearchLibrary products={products} /></PageWrapper>}
    />

    <Route
      path="/reconstitution-tool"
      element={<PageWrapper><ReconstitutionTool /></PageWrapper>}
    />

    <Route
      path="/verify"
      element={<PageWrapper><VerifyBatch /></PageWrapper>}
    />

    <Route
      path="/compounds"
      element={<PageWrapper><CompoundDatabase products={products} /></PageWrapper>}
    />
<Route
  path="/checkout"
  element={
    <PageWrapper>
      <Checkout
        cart={cart}
        cartTotal={cartTotal}
        increaseQty={increaseQty}
        decreaseQty={decreaseQty}
        handleCheckout={handleCheckout}
        handlePayPalSuccess={handlePayPalSuccess}
      />
    </PageWrapper>
  }
/>
  </Routes>
</AnimatePresence>

    {/* ================= CHECKOUT OVERLAY ================= */}

    {checkoutOpen && (
  <div className="checkout-overlay">
    <div className="checkout-panel">

      {/* LEFT SIDE */}
      <div className="checkout-left">
<label className="research-confirm">
  <input
    type="checkbox"
    id="researchCheck"
  />
  I confirm these products are for laboratory research use only and
  not for human consumption.
</label>

<button
  className="stripe-premium-btn magnetic"
  onClick={() => {
    const checked = document.getElementById("researchCheck").checked;

    if (!checked) {
      alert("Please confirm research use before checkout.");
      return;
    }

    handleCheckout();
  }}
>
  💳 Pay with Debit / Credit Card
</button>
       <button
  className="checkout-back-btn"
  onClick={() => navigate("/")}
>
  ← Continue Shopping
</button>

        <h2 className="checkout-title">Your Cart</h2>

        {cart.map(item => (
          <div key={item._id} className="checkout-item">
            <img
              src={
                item.image && item.image.startsWith("http")
                  ? item.image
                  : FALLBACK_IMAGE
              }
              alt={item.name}
            />

            <div className="checkout-item-info">
  <h4>{item.name}</h4>

  {item.description && (
    <p className="checkout-description">
      {item.description}
    </p>
  )}

  <p className="checkout-unit-price">
    ${item.price.toFixed(2)}
  </p>

  <div className="qty-controls">
    <button onClick={() => decreaseQty(item._id)}>-</button>
    <span>{item.quantity}</span>
    <button onClick={() => increaseQty(item._id)}>+</button>
  </div>
</div>
          </div>
        ))}

      </div>

      {/* RIGHT SIDE */}
      <div className="checkout-right">

        <h3>Order Summary</h3>

        <div className="summary-row total">
          <span>Total</span>
          <span>${cartTotal.toFixed(2)}</span>
        </div>

        <button
          className="stripe-premium-btn magnetic"
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
              height: 50
            }}
            createOrder={(data, actions) =>
              actions.order.create({
                purchase_units: [
                  { amount: { value: cartTotal.toFixed(2) } }
                ]
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