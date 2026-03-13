import React, { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";

export default function Checkout({
  cart = [],
  cartTotal = 0,
  increaseQty,
  decreaseQty,
  handleCheckout,
  handlePayPalSuccess
}) {

  const [confirmed, setConfirmed] = useState(false);

  const startCheckout = () => {
    if (!confirmed) {
      alert("Please confirm research use before checkout.");
      return;
    }

    handleCheckout();
  };

  return (

    <div className="checkout-page">

      <div className="checkout-container">

        {/* HEADER */}

        <div className="checkout-header">

          <h1>Secure Laboratory Checkout</h1>

          <div className="checkout-trust">
            🔬 Research Grade Compounds • 🔒 Secure Payments • 🧪 Lab Verified
          </div>

        </div>


        <div className="checkout-grid">

          {/* LEFT SIDE — CART ITEMS */}

          <div className="checkout-products">

            <h2>Your Research Cart</h2>

            {cart.length === 0 && (
              <p>Your cart is empty.</p>
            )}

            {cart.map((item) => {

              const price = item.price || 0;
              const quantity = item.quantity || 1;
              const imageSrc = item.image || item.imageUrl || "/no-image.png";
              const subtotal = price * quantity;

              return (

                <div key={item._id} className="checkout-item">

                  <img
                    className="checkout-product-image"
                    src={imageSrc}
                    alt={item.name}
                  />

                  <div className="checkout-item-info">

                    <h4>{item.name}</h4>

                    <div className="checkout-meta">
                      <span className="badge">Research Grade</span>
                      <span className="badge">≥99% Purity</span>
                    </div>

                    <p className="checkout-price">${price.toFixed(2)}</p>

                    <span className="item-subtotal">
                      Subtotal: ${subtotal.toFixed(2)}
                    </span>

                    <div className="qty-controls">

                      <button onClick={() => decreaseQty(item._id)}>-</button>

                      <span>{quantity}</span>

                      <button onClick={() => increaseQty(item._id)}>+</button>

                    </div>

                  </div>

                </div>

              );

            })}

          </div>


          {/* RIGHT SIDE — PAYMENT */}

          <div className="checkout-payment">

            <h3>Order Summary</h3>

            <div className="summary-row total">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>


            {/* RESEARCH CONFIRMATION */}

            <label className="research-confirm">

              <input
                type="checkbox"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
              />

              I confirm these products are purchased for laboratory research
              purposes only and not for human consumption.

            </label>


            {/* STRIPE BUTTON */}

            <button
              className="stripe-premium-btn"
              onClick={startCheckout}
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
                      {
                        amount: {
                          value: cartTotal.toFixed(2)
                        }
                      }
                    ]
                  })
                }
                onApprove={async (data, actions) => {

                  const details = await actions.order.capture();

                  try {

                    await fetch("/api/orders/paypal", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json"
                      },
                      body: JSON.stringify({
                        paypalOrderId: details.id,
                        items: cart
                      })
                    });

                    await handlePayPalSuccess(details.id);

                  } catch (err) {

                    console.error("Failed to save PayPal order:", err);

                    alert(
                      "Payment succeeded but the order could not be saved. Please contact support."
                    );

                  }

                }}
              />

            </div>


            {/* TRUST BADGES */}

            <div className="checkout-cards">

              <span>💳 Visa</span>
              <span>💳 Mastercard</span>
              <span>💳 Amex</span>
              <span>🅿 PayPal</span>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}