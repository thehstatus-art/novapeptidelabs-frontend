
import React from "react";
import { Link, useLocation } from "react-router-dom";

function Header({ cart, setCheckoutOpen }) {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const itemCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const isActive = (path) =>
    location.pathname === path ? "active-link" : "";
  return (
    <header className="navbar">
      <div className="logo">
        <Link to="/" className="logo-text">
          NovaPeptide <span>LABS</span>
        </Link>
      </div>

      <nav className="nav-links">
        <Link to="/" className={isActive("/")}>
          SHOP
        </Link>

        <Link to="/privacy" className={isActive("/privacy")}>
          PRIVACY POLICY
        </Link>

        <Link to="/terms" className={isActive("/terms")}>
          TERMS & CONDITIONS
        </Link>

        <Link to="/disclaimer" className={isActive("/disclaimer")}>
          RESEARCH USE DISCLAIMER
        </Link>
      </nav>

      <div className="nav-right">

        {token ? (
          <span className="user-greeting">My Account</span>
        ) : (
          <Link to="/login" className="login-btn">
            LOGIN / REGISTER
          </Link>
        )}

        <button
          className="cart-btn"
          onClick={() => setCheckoutOpen(true)}
        >
          🛒
          {itemCount > 0 && (
            <span className="cart-badge">{itemCount}</span>
          )}
        </button>
      </div>
    </header>
  );
}

export default Header;