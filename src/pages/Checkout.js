import React from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";

export default function Checkout({
  cart,
  cartTotal,
  increaseQty,
  decreaseQty,
  handleCheckout,
  handlePayPalSuccess
}) {

  return (
    <div className="checkout-page">

      {/* HEADER */}

      <div className="checkout-header">
        <h1>Secure Checkout</h1>

        <div className="checkout-trust">
          🔒 Encrypted Payment • 💳 Stripe Secure • 🧪 Research Use Verified
        </div>
      </div>

      <div className="checkout-grid">

        {/* LEFT — CART ITEMS */}

        <div className="checkout-products">

          <h2>Your Cart</h2>

          {cart.map(item => (

            <div key={item._id} className="checkout-item">

              <img src={item.image} alt={item.name} />

              <div className="checkout-item-info">

                <h4>{item.name}</h4>

                <p>${item.price.toFixed(2)}</p>

                <div className="qty-controls">
                  <button onClick={() => decreaseQty(item._id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQty(item._id)}>+</button>
                </div>

              </div>

            </div>

          ))}

        </div>

        {/* RIGHT — PAYMENT */}

        <div className="checkout-payment">

          <h3>Order Summary</h3>

          <div className="summary-row total">
            <span>Total</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>

          {/* CREDIT CARD BUTTON */}
{/* RESEARCH CONFIRMATION */}

<label className="research-confirm">
  <input type="checkbox" id="research-confirm" />
  I confirm these products are purchased for laboratory research purposes only and not for human consumption.
</label>
          <button
            className="stripe-premium-btn"
            onClick={handleCheckout}
          >
            💳 Pay with Debit / Credit Card
          </button>

          {/* PAYPAL */}

          <div className="paypal-section">
<div className="checkout-security">
🔐 256-bit SSL encryption • Payments processed securely
</div>
            <PayPalButtons
              style={{
                layout: "vertical",
                color: "gold",
                shape: "rect",
                height: 50
              }}
              createOrder={(data, actions) =>
                actions.order.create({
                  purchase_units: [
                    { amount: { value: cartTotal.toFixed(2) } }
                  ]
                })
              }
              onApprove={async (data, actions) => {
                await actions.order.capture();
                await handlePayPalSuccess(data.orderID);
              }}
            />

          </div>

          {/* SECURITY TRUST TEXT */}

          <div className="checkout-security">

  <div className="secure-lock">
    🔒
  </div>

  <p>
    256-bit SSL encrypted checkout
  </p>

</div>

<div className="checkout-cards">

  <span>💳 Visa</span>
  <span>💳 Mastercard</span>
  <span>💳 Amex</span>
  <span>🅿 PayPal</span>

</div>

        </div>

      </div>

    </div>
  );
}