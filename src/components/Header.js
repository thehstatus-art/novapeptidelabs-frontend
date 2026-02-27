import React from "react";
import { Link } from "react-router-dom";

function Header({ cart, setCheckoutOpen }) {
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <header className="navbar">
      <div className="logo">
        <Link to="/" className="logo-text">
          NovaPeptide <span>LABS</span>
        </Link>
      </div>

      <nav className="nav-links">
        <Link to="/">SHOP</Link>
        <Link to="/privacy">PRIVACY POLICY</Link>
        <Link to="/terms">TERMS & CONDITIONS</Link>
        <Link to="/disclaimer">RESEARCH USE DISCLAIMER</Link>
      </nav>

      <div className="nav-right">
        <Link to="/login" className="login-btn">
          LOGIN / REGISTER
        </Link>

        <button
          className="cart-btn"
          onClick={() => setCheckoutOpen(true)}
        >
          CART / ${total.toFixed(2)}
        </button>
      </div>
    </header>
  );
}

export default Header;
