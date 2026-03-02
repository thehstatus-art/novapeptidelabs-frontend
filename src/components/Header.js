import React from "react";
import { Link, useLocation } from "react-router-dom";

const ENABLE_AUTH = false; // 🔐 Change to true if you want login back
const API = "https://nova-backend-lu2l.onrender.com";

function Header({ cart, setCheckoutOpen }) {
  const location = useLocation();
  const token = localStorage.getItem("token");

  const itemCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const isActive = (path) =>
    location.pathname === path ? "active-link" : "";

  const getImageUrl = (image) => {
    if (!image) return "/no-image.png";
    return image.startsWith("/uploads")
      ? `${API}${image}`
      : `${API}/uploads/${image}`;
  };

  return (
    <header className="navbar">
      <div className="logo">
        <Link to="/" className="logo-text">
          NovaPeptide <span>LABS</span>
        </Link>
      </div>

      <nav className="nav-links">
        <Link to="/shop" className={isActive("/shop")}>
          Shop
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
        {ENABLE_AUTH && (
          token ? (
            <span className="user-greeting">My Account</span>
          ) : (
            <Link to="/login" className="login-btn">
              LOGIN / REGISTER
            </Link>
          )
        )}

        <div className="cart-wrapper">
          <button
            className="cart-btn"
            onClick={() => setCheckoutOpen(true)}
          >
            🛒
            {itemCount > 0 && (
              <span className="cart-badge">{itemCount}</span>
            )}
          </button>

          <div className="mini-cart">
            {cart.length === 0 ? (
              <p className="empty-cart">No products in cart.</p>
            ) : (
              <>
                {cart.slice(0, 3).map((item) => (
                  <div key={item._id} className="mini-cart-item">
                    <img
                      src={getImageUrl(item.image)}
                      alt={item.name}
                    />
                    <div className="mini-cart-info">
                      <span className="mini-cart-name">
                        {item.name}
                      </span>
                      <span className="mini-cart-qty">
                        {item.quantity} × ${item.price}
                      </span>
                    </div>
                  </div>
                ))}

                <div className="mini-cart-total">
                  Total: ${cartTotal.toFixed(2)}
                </div>

                <button
                  className="view-cart-btn"
                  onClick={() => setCheckoutOpen(true)}
                >
                  View Cart
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;