import React from "react";

export default function ReviewStep({ cart = [], back }) {

  const total = cart.reduce((sum, item) => {
    return sum + (item.price || 0) * (item.quantity || 1);
  }, 0);

  return (
    <div className="review-container">

      {/* HEADER */}
      <div className="review-header">
        <div className="step-panel-eyebrow">Step 5 of 5</div>
        <h2>Review Your Order</h2>
        <p className="review-subtitle">
          Confirm your research compounds before placing order
        </p>
      </div>

      {/* ORDER LIST */}
      <div className="review-list">

        {cart.map((item) => {

          const subtotal = (item.price || 0) * (item.quantity || 1);

          return (
            <div key={item._id} className="review-card">

              <div className="review-left">

                <img
                  src={item.image}
                  alt={item.name}
                  className="review-image"
                />

                <div>
                  <div className="review-name">{item.name}</div>
                  <div className="review-meta">
                    Qty: {item.quantity}
                  </div>
                </div>

              </div>

              <div className="review-right">
                ${subtotal.toFixed(2)}
              </div>

            </div>
          );

        })}

      </div>

      {/* TOTAL */}
      <div className="review-summary">

        <div className="review-total-row">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>

      </div>

      {/* CTA */}
      <button className="checkout-complete premium-btn">
        Place Secure Order →
      </button>

      <div className="payment-actions">
        <button type="button" className="payment-back" onClick={back}>
          Back
        </button>
      </div>

    </div>
  );
}
