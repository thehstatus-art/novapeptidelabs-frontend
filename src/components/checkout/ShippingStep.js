import React from "react";

export default function ShippingStep({next, back}) {

  return (
    <div className="shipping-layout">

      <div className="shipping-left">
        <h2 className="shipping-title">Shipping Address</h2>

        <div className="shipping-form">
          <input placeholder="Full Name" />
          <input placeholder="Street Address" className="shipping-row-2" />
          <input placeholder="City" />
          <input placeholder="State" />
          <input placeholder="ZIP Code" />
        </div>

        <div className="shipping-actions">
          <button className="shipping-back" onClick={back}>
            Back
          </button>

          <button className="shipping-next" onClick={next}>
            Continue
          </button>
        </div>
      </div>

      <div className="order-summary-premium">

        <h3 className="summary-title">Order Summary</h3>

        <div className="summary-item">
          <span>Tesamorelin 10mg</span>
          <span>$80</span>
        </div>

        <div className="summary-divider"></div>

        <div className="summary-total">
          <span>Total</span>
          <span>$80.00</span>
        </div>

        <div className="checkout-security">
          🔒 Secure Checkout • 256‑bit SSL
        </div>

      </div>

    </div>
  );
}