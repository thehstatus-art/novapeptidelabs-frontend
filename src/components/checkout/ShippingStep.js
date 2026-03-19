import React from "react";

export default function ShippingStep({ next, back, shippingAddress, onShippingChange }) {
  const canContinue = Boolean(
    shippingAddress.name &&
    shippingAddress.email &&
    shippingAddress.street &&
    shippingAddress.city &&
    shippingAddress.state &&
    shippingAddress.zip
  );

  return (
    <div className="checkout-step checkout-step--shipping">
        <div className="checkout-step__header">
          <div className="checkout-step__eyebrow">Step 2 of 5</div>
          <h2 className="checkout-step__title">Shipping Address</h2>
          <p className="checkout-step__copy">
            Enter the destination for your order so we can prepare delivery options.
          </p>
        </div>

        <div className="checkout-step__form">
          <input className="checkout-step__input" placeholder="Full Name" value={shippingAddress.name} onChange={(e) => onShippingChange("name", e.target.value)} />
          <input className="checkout-step__input" placeholder="Email Address" value={shippingAddress.email} onChange={(e) => onShippingChange("email", e.target.value)} />
          <input className="checkout-step__input checkout-step__input--wide" placeholder="Street Address" value={shippingAddress.street} onChange={(e) => onShippingChange("street", e.target.value)} />
          <input className="checkout-step__input" placeholder="City" value={shippingAddress.city} onChange={(e) => onShippingChange("city", e.target.value)} />
          <input className="checkout-step__input" placeholder="State" value={shippingAddress.state} onChange={(e) => onShippingChange("state", e.target.value)} />
          <input className="checkout-step__input" placeholder="ZIP Code" value={shippingAddress.zip} onChange={(e) => onShippingChange("zip", e.target.value)} />
        </div>

        <div className="checkout-step__actions">
          <button className="checkout-step__button checkout-step__button--secondary" onClick={back}>
            Back
          </button>

          <button className="checkout-step__button checkout-step__button--primary" onClick={next} disabled={!canContinue}>
            Continue
          </button>
        </div>
    </div>
  );
}
