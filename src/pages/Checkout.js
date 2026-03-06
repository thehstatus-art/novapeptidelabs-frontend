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

          <button
            className="stripe-premium-btn"
            onClick={handleCheckout}
          >
            💳 Pay with Debit / Credit Card
          </button>

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

        </div>

      </div>

    </div>
  );
}