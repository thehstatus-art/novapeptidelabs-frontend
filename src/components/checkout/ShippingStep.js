import React from "react";

export default function ShippingStep({next, back}) {

  return (
    <div className="shipping-container">
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
  );
}