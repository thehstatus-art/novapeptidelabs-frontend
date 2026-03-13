import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const ENABLE_AUTH = false;

function Header({ cart, setCheckoutOpen }) {

  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [miniCartOpen, setMiniCartOpen] = useState(false);

  const itemCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const isActive = (path) =>
    location.pathname === path ? "nav-btn active-link" : "nav-btn";

  const getImageUrl = (image) => {
    if (!image) return "/no-image.png";
    return image.startsWith("http") ? image : "/no-image.png";
  };

  return (
    <header className="navbar">

      {/* LOGO */}

      <div className="logo">
        <Link to="/" className="logo-text">
          NovaPeptide <span>LABS</span>
        </Link>
      </div>


      {/* NAVIGATION */}

      <nav className="nav-links">

        <Link to="/shop" className={isActive("/shop")}>
          SHOP
        </Link>

        <Link to="/reconstitution-tool" className={isActive("/reconstitution-tool")}>
          RESEARCH TOOL
        </Link>

        <Link to="/research" className={isActive("/research")}>
          RESEARCH
        </Link>

        <Link to="/compounds" className={isActive("/compounds")}>
          COMPOUND DATABASE
        </Link>

      </nav>


      {/* RIGHT SIDE */}

      <div className="nav-right">

        {ENABLE_AUTH && (
          token ? (
            <span className="user-greeting">
              My Account
            </span>
          ) : (
            <Link to="/login" className="nav-btn">
              LOGIN / REGISTER
            </Link>
          )
        )}


        {/* CART */}

        <div className="cart-wrapper">

          <button
            className="cart-btn"
            onClick={() => setMiniCartOpen(!miniCartOpen)}
          >
            🛒

            {cartTotal > 0 && (
              <span className="cart-total">
                ${cartTotal.toFixed(0)}
              </span>
            )}

            {itemCount > 0 && (
              <span className="cart-badge">
                {itemCount}
              </span>
            )}

          </button>


          {/* MINI CART DRAWER */}

          {miniCartOpen && (
            <>
              {/* BACKGROUND OVERLAY */}

              <div
                className="cart-overlay"
                onClick={() => setMiniCartOpen(false)}
              />

              {/* DRAWER */}

              <div className="mini-cart">

                <button
                  className="mini-cart-close"
                  onClick={() => setMiniCartOpen(false)}
                >
                  ← Continue Shopping
                </button>


                {cart.length === 0 ? (

                  <p className="empty-cart">
                    No products in cart.
                  </p>

                ) : (

                  <>

                    {cart.slice(0,3).map((item) => (

                      <div
                        key={item._id}
                        className="mini-cart-item"
                      >

                        <img
                          src={getImageUrl(item.image)}
                          alt={item.name}
                        />

                        <div className="mini-cart-info">

                          <h4>{item.name}</h4>

                          <p className="mini-cart-line">

                            <span className="mini-qty">
                              {item.quantity}×
                            </span>

                            <span className="mini-price">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>

                          </p>

                        </div>

                      </div>

                    ))}


                    {/* TOTAL */}

                    <div className="mini-cart-total">

                      <span>Total</span>

                      <span className="mini-total-amount">
                        ${cartTotal.toFixed(2)}
                      </span>

                    </div>


                    {/* VIEW CART */}

                    <button
                      className="view-cart-btn"
                      onClick={() => {
                        setMiniCartOpen(false);
                        navigate("/checkout");
                      }}
                    >
                      View Cart
                    </button>

                  </>

                )}

              </div>

            </>
          )}

        </div>

      </div>

    </header>
  );
}

export default Header;