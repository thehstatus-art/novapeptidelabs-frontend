import React from "react";

export default function CartStep({ cart = [], increaseQty, decreaseQty, next }) {

  const total = cart.reduce((sum, item) => {
    return sum + (item.price || 0) * (item.quantity || 1);
  }, 0);

  return (
    <div className="cart-step-container cart-step-premium">

      {/* HEADER */}
      <div className="cart-header">
        <h2 className="cart-title">Your Cart</h2>
        <p className="cart-subtitle">Review your selected research compounds</p>
      </div>

      {cart.length === 0 && (
        <div className="cart-empty">
          <p>Your cart is empty.</p>
        </div>
      )}

      {/* MAIN GRID */}
      <div className="cart-grid">

        {/* LEFT SIDE - PRODUCTS */}
        <div className="cart-left">

          <div className="cart-list">
            {cart.map((item) => {

              const subtotal = (item.price || 0) * (item.quantity || 1);

              return (
                <div key={item._id} className="cart-card premium-card">

                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-product-image"
                  />

                  <div className="cart-info">

                    <div className="cart-product-name">
                      {item.name}
                    </div>

                    <div className="cart-product-price">
                      ${item.price} each
                    </div>

                    <div className="cart-product-subtotal">
                      ${subtotal.toFixed(2)}
                    </div>

                  </div>

                  <div className="cart-qty">

                    <button className="qty-btn" onClick={() => decreaseQty(item._id)}>
                      −
                    </button>

                    <span className="qty-value">
                      {item.quantity}
                    </span>

                    <button className="qty-btn" onClick={() => increaseQty(item._id)}>
                      +
                    </button>

                  </div>

                </div>
              );

            })}
          </div>

        </div>

        {/* RIGHT SIDE - SUMMARY */}
        <div className="cart-right">

          <div className="order-summary premium-summary">

            <h3>Order Summary</h3>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <div className="summary-row">
              <span>Shipping</span>
              <span>Calculated next step</span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button
              className="checkout-next-btn premium-btn"
              onClick={next}
            >
              Continue to Shipping →
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}