import React from "react";

export default function ShippingStep({ next, back }) {

  return (
    <div className="shipping-step-card shipping-left">
        <div className="step-panel-header">
          <div className="step-panel-eyebrow">Step 2 of 5</div>
          <h2 className="shipping-title">Shipping Address</h2>
          <p className="step-panel-copy">
            Enter the destination for your order so we can prepare delivery options.
          </p>
        </div>

        <div className="shipping-form">
          <input placeholder="Full Name" />
          <input placeholder="Email Address" />
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
