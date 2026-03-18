import React from "react";

export default function OrderSummary({cart=[],cartTotal=0}){

  return (

    <div className="order-summary-premium">

      <h3 className="summary-title">Order Summary</h3>

      <div className="summary-items">
        {cart.map(item => (

          <div key={item._id} className="summary-item">

            <div className="summary-product">
              <span className="product-name">{item.name}</span>
              <span className="product-qty">Qty {item.quantity}</span>
            </div>

            <div className="product-price">
              ${(item.quantity * item.price).toFixed(2)}
            </div>

          </div>

        ))}
      </div>

      <div className="summary-divider"></div>

      <div className="summary-row">
        <span>Subtotal</span>
        <span>${cartTotal.toFixed(2)}</span>
      </div>

      <div className="summary-row">
        <span>Shipping</span>
        <span>Calculated at next step</span>
      </div>

      <div className="summary-row total">
        <span>Total</span>
        <span>${cartTotal.toFixed(2)}</span>
      </div>

      <div className="checkout-security">
        🔒 Secure Checkout • 256-bit SSL
      </div>

    </div>

  )

}