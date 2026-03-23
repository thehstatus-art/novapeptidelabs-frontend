import React from "react";

export default function OrderSummary({
  cart=[],
  cartTotal=0,
  shippingCost=0,
  shippingLabel="",
  orderTotal=0,
}){
  const itemCount = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);

  return (

    <div className="checkout-summary">

      <div className="checkout-summary__header">
        <div>
          <h3 className="checkout-summary__title">Order Summary</h3>
          <p className="checkout-summary__caption">
            {itemCount > 0 ? `${itemCount} item${itemCount === 1 ? "" : "s"} in your cart` : "Your selected compounds appear here"}
          </p>
        </div>
        <div className="checkout-summary__badge">Secure</div>
      </div>

      {cart.length > 0 ? (
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
      ) : (
        <div className="checkout-summary__empty">
          <div className="checkout-summary__empty-title">Cart is ready for items</div>
          <div className="checkout-summary__empty-copy">
            Add products to see totals, shipping, and payment details here.
          </div>
        </div>
      )}

      <div className="checkout-summary__divider"></div>

      <div className="checkout-summary__row">
        <span>Subtotal</span>
        <span>${cartTotal.toFixed(2)}</span>
      </div>

      <div className="checkout-summary__row">
        <span>Shipping</span>
        <span>{shippingCost > 0 ? `$${shippingCost.toFixed(2)}` : "Calculated at next step"}</span>
      </div>

      {shippingLabel ? (
        <div className="checkout-summary__row">
          <span>Method</span>
          <span>{shippingLabel}</span>
        </div>
      ) : null}

      <div className="checkout-summary__row checkout-summary__row--total">
        <span>Total</span>
        <span>${(orderTotal || cartTotal).toFixed(2)}</span>
      </div>

      <div className="checkout-summary__security">
        🔒 Secure Checkout • 256-bit SSL
      </div>

    </div>

  )

}
