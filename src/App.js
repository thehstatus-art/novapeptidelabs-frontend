import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Particles from "@tsparticles/react";
import { io } from "socket.io-client";
import AgeGate from "./components/AgeGate";
import Header from "./components/Header";
import EmailCapture from "./components/EmailCapture";
import OrderPopup from "./components/OrderPopup";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import Disclaimer from "./pages/Disclaimer";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Orders from "./pages/Orders";
import Admin from "./pages/Admin";
import AdminOrders from "./pages/AdminOrders";
import ResearchLibrary from "./pages/ResearchLibrary";
import ReconstitutionTool from "./pages/ReconstitutionTool";
import VerifyBatch from "./pages/VerifyBatch";
import CompoundDatabase from "./pages/CompoundDatabase";
import Checkout from "./pages/Checkout";

import "./App.css";


const API = "https://nova-backend-lu2l.onrender.com";

// live purchase socket connection
const socket = io(API);

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

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [loading, setLoading] = useState(true);

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    fetch(`${API}/api/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Product load error:", err));
  }, []);

  // listen for live purchases from backend
  useEffect(() => {
    socket.on("purchase", (data) => {
      console.log("Live purchase event:", data);

      // trigger the popup component
      window.dispatchEvent(
        new CustomEvent("live-order", {
          detail: {
            name: data.name || "Researcher",
            product: data.product || "Research compound",
            location: data.location || "USA"
          }
        })
      );
    });

    return () => {
      socket.off("purchase");
    };
  }, []);

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

  const handleCheckout = async (email) => {
    if (cart.length === 0) return alert("Cart is empty.");

    try {
      const res = await fetch(`${API}/api/orders/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          items: cart.map((item) => ({
            productId: item._id,
            quantity: item.quantity,
          })),
        }),
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
    try {
      const res = await fetch(`${API}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paypalOrderId: orderID,
          items: cart.map((item) => ({
            productId: item._id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
          totalAmount: cartTotal,
          email: "paypal-order@novapeptidelabs.org"
        }),
      });

      const data = await res.json();

      console.log("Order saved:", data);

      setCart([]);

    } catch (err) {
      console.error("Order save failed:", err);
    }
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
      <OrderPopup />
      {/* Biotech UI background effects */}
      <div className="lab-grid-glow"></div>

      <div className="molecule-node"></div>
      <div className="molecule-node"></div>
      <div className="molecule-node"></div>
      <div className="molecule-node"></div>
      <div className="molecule-node"></div>
      <div className="molecule-node"></div>

      <AgeGate />

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
              color: "#6ec1ff",
            },
          },
        }}
        style={{ position: "fixed", top: 0, left: 0, zIndex: -4 }}
      />

      <Header cart={cart} />

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
            path="/checkout"
            element={
              <div className="checkout-route">
                <Checkout
                  cart={cart}
                  cartTotal={cartTotal}
                  increaseQty={increaseQty}
                  decreaseQty={decreaseQty}
                  handleCheckout={handleCheckout}
                  handlePayPalSuccess={handlePayPalSuccess}
                />
              </div>
            }
          />

          <Route
            path="/product/:id"
            element={<PageWrapper><ProductDetail products={products} addToCart={addToCart} /></PageWrapper>}
          />

          <Route path="/success" element={<PageWrapper><Success /></PageWrapper>} />
          <Route path="/cancel" element={<PageWrapper><Cancel /></PageWrapper>} />
          <Route path="/disclaimer" element={<PageWrapper><Disclaimer /></PageWrapper>} />
          <Route path="/privacy" element={<PageWrapper><Privacy /></PageWrapper>} />
          <Route path="/terms" element={<PageWrapper><Terms /></PageWrapper>} />
          <Route path="/orders" element={<PageWrapper><Orders /></PageWrapper>} />
          <Route path="/admin" element={<PageWrapper><Admin /></PageWrapper>} />
          <Route path="/admin/orders" element={<PageWrapper><AdminOrders /></PageWrapper>} />
          <Route path="/research" element={<PageWrapper><ResearchLibrary products={products} /></PageWrapper>} />
          <Route path="/reconstitution-tool" element={<PageWrapper><ReconstitutionTool /></PageWrapper>} />
          <Route path="/verify" element={<PageWrapper><VerifyBatch /></PageWrapper>} />
          <Route path="/compounds" element={<PageWrapper><CompoundDatabase products={products} /></PageWrapper>} />

        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
