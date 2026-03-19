import React from "react";

export default function ShippingStep({ next, back }) {

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
          <input className="checkout-step__input" placeholder="Full Name" />
          <input className="checkout-step__input" placeholder="Email Address" />
          <input className="checkout-step__input checkout-step__input--wide" placeholder="Street Address" />
          <input className="checkout-step__input" placeholder="City" />
          <input className="checkout-step__input" placeholder="State" />
          <input className="checkout-step__input" placeholder="ZIP Code" />
        </div>

        <div className="checkout-step__actions">
          <button className="checkout-step__button checkout-step__button--secondary" onClick={back}>
            Back
          </button>

          <button className="checkout-step__button checkout-step__button--primary" onClick={next}>
            Continue
          </button>
        </div>
    </div>
  );
}
