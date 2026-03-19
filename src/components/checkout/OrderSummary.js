import React from "react";

export default function OrderSummary({cart=[],cartTotal=0}){

  return (

    <div className="checkout-summary">

      <h3 className="checkout-summary__title">Order Summary</h3>

      <div className="checkout-summary__items">
        {cart.map(item => (

          <div key={item._id} className="checkout-summary__item">

            <div className="checkout-summary__product">
              <span className="checkout-summary__name">{item.name}</span>
              <span className="checkout-summary__qty">Qty {item.quantity}</span>
            </div>

            <div className="checkout-summary__price">
              ${(item.quantity * item.price).toFixed(2)}
            </div>

          </div>

        ))}
      </div>

      <div className="checkout-summary__divider"></div>

      <div className="checkout-summary__row">
        <span>Subtotal</span>
        <span>${cartTotal.toFixed(2)}</span>
      </div>

      <div className="checkout-summary__row">
        <span>Shipping</span>
        <span>Calculated at next step</span>
      </div>

      <div className="checkout-summary__row checkout-summary__row--total">
        <span>Total</span>
        <span>${cartTotal.toFixed(2)}</span>
      </div>

      <div className="checkout-summary__security">
        🔒 Secure Checkout • 256-bit SSL
      </div>

    </div>

  )

}
