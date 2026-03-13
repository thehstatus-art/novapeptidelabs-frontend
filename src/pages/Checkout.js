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

    <div
      className="checkout-page"
      style={{
        minHeight: "100vh",
        overflowY: "auto",
        position: "relative",
        paddingBottom: "140px"
      }}
    >

      <div
        className="checkout-container"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "70px 24px"
        }}
      >

        {/* HEADER */}

        <div className="checkout-header">

          <h1>Secure Laboratory Checkout</h1>

          <div className="checkout-badges">
            <span>🔬 Research Grade</span>
            <span>🔒 Secure Checkout</span>
            <span>🧪 Lab Verified</span>
          </div>

        </div>


        <div className="checkout-grid">

          {/* LEFT — PRODUCTS */}

          <div className="checkout-products">

            <h2>Your Research Cart</h2>

            {cart.length === 0 && (
              <p>Your cart is empty.</p>
            )}

            {cart.map((item) => {

              const price = item.price || 0;
              const quantity = item.quantity || 1;
              const image = item.image || item.imageUrl || "/no-image.png";

              return (

                <div key={item._id} className="checkout-item">

                  <img
                    src={image}
                    alt={item.name}
                    className="checkout-product-image"
                  />

                  <div className="checkout-item-info">

                    <h3>{item.name}</h3>

                    <div className="checkout-tags">
                      <span>Research Grade</span>
                      <span>≥99% Purity</span>
                    </div>

                    <p className="checkout-price">${price.toFixed(2)}</p>

                    <div className="qty-controls">

                      <button onClick={() => decreaseQty(item._id)}>
                        -
                      </button>

                      <span>{quantity}</span>

                      <button onClick={() => increaseQty(item._id)}>
                        +
                      </button>

                    </div>

                  </div>

                </div>

              );

            })}

          </div>


          {/* RIGHT — PAYMENT */}

          <div className="checkout-payment">

            <h3>Order Summary</h3>

            <div className="checkout-total">

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

              I confirm these compounds are for laboratory research only and not for human consumption.

            </label>


            {/* STRIPE */}

            <button
              className="stripe-premium-btn"
              onClick={startCheckout}
            >
              💳 Pay with Debit / Credit Card
            </button>


            {/* PAYPAL */}

            <div className="paypal-section">

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

                    console.error("Order save error", err);

                    alert("Payment succeeded but the order could not be saved. Please contact support.");

                  }

                }}
              />

            </div>


            {/* PAYMENT ICONS */}

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