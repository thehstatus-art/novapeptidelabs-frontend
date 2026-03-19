import React from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";

export default function PaymentStep({ cartTotal = 0, next, back }){

  return(
    <div className="payment-step-card">
        <div className="step-panel-header">
          <div className="step-panel-eyebrow">Step 4 of 5</div>
          <h2 className="step-panel-title">Payment</h2>
          <p className="step-panel-copy">
            Complete checkout securely with PayPal. Your order summary remains visible on the right.
          </p>
        </div>

        <div className="payment-total-banner">
          <span>Amount Due</span>
          <strong>${cartTotal.toFixed(2)}</strong>
        </div>

        <div className="payment-provider-card">
          <PayPalButtons
            createOrder={(data, actions) => actions.order.create({
              purchase_units: [{ amount: { value: cartTotal.toFixed(2) } }]
            })}
            onApprove={async (data, actions) => {
              await actions.order.capture();
              next();
            }}
          />
        </div>

        <div className="payment-actions">
          <button type="button" className="payment-back" onClick={back}>
            Back
          </button>
        </div>
    </div>
  );

}
