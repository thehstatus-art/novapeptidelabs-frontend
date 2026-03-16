import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PayPalButtons } from "@paypal/react-paypal-js";

export default function Checkout({
  cart = [],
  cartTotal = 0,
  increaseQty,
  decreaseQty,
  handlePayPalSuccess
}) {

  const [confirmed, setConfirmed] = useState(false);
  const [zip, setZip] = useState("");
  const [shippingRates, setShippingRates] = useState([]);
  const [selectedRate, setSelectedRate] = useState(null);
  const [loadingRates, setLoadingRates] = useState(false);
  const navigate = useNavigate();

  const fetchShippingRates = async () => {

    if (!zip || zip.length < 5) {
      alert("Enter a valid ZIP code to calculate shipping.");
      return;
    }

    try {

      setLoadingRates(true);

      const res = await fetch("/api/shipping/rates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ zip })
      });

      const data = await res.json();

      setShippingRates(data || []);
      if (data && data.length > 0) {
        const cheapest = [...data].sort((a,b)=>Number(a.amount)-Number(b.amount))[0];
        setSelectedRate(cheapest);
      }
      setLoadingRates(false);

    } catch (err) {

      console.error("Shipping rate error", err);
      setLoadingRates(false);

    }

  };

  return (

    <div className="checkout-page">

      <div
        className="checkout-container"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%"
        }}
      >

        <div className="checkout-back">
          <button
            className="checkout-back-btn"
            onClick={() => navigate(-1)}
          >
            ← Back to Research Library
          </button>
        </div>


        <div className="checkout-grid">

          {/* LEFT COLUMN */}
          <div className="checkout-left">

          {/* LEFT — PRODUCTS */}

          <div className="checkout-products">

            {/* HEADER */}

            <div className="checkout-header checkout-lab-header">

              <h1>Secure Research Compound Checkout</h1>
              <div className="checkout-divider"></div>

              <div className="checkout-badges premium-badges">

                <div className="badge-pill">
                  <span className="badge-icon">🔬</span>
                  <span className="badge-text">Certified Research Grade</span>
                </div>

                <div className="badge-pill">
                  <span className="badge-icon">🔒</span>
                  <span className="badge-text">Encrypted Secure Checkout</span>
                </div>

                <div className="badge-pill">
                  <span className="badge-icon">🧪</span>
                  <span className="badge-text">Laboratory Tested & Verified</span>
                </div>

              </div>

            </div>

            <h2 className="cart-title">Your Research Cart</h2>

            {cart.length === 0 && (
              <p className="empty-cart">
                No research compounds have been added to your cart yet.
              </p>
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
                    className="checkout-product-image checkout-product-image-large"
                  />

                  <div className="checkout-item-info">

                    <h3 className="checkout-product-title">{item.name}</h3>

                    <div className="checkout-tags">
                      <span>Laboratory Research Grade</span>
                      <span>HPLC Purity ≥99%</span>
                    </div>

                    <p className="checkout-price">
                      Price per vial: <strong>${price.toFixed(2)}</strong>
                    </p>
                    <p className="item-subtotal">
                      Subtotal: <strong>${(price * quantity).toFixed(2)}</strong>
                    </p>

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

          </div>

          {/* RIGHT — PAYMENT */}

          <div className="checkout-payment premium-summary">

            <h3 className="summary-title">Research Order Summary</h3>

            {/* SHIPPING CALCULATOR */}

            <div className="shipping-box">

              <h4 className="shipping-title">Research Shipping Destination</h4>

              <div className="shipping-zip-row">

                <input
                  type="text"
                  placeholder="Enter ZIP code"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  className="shipping-zip-input"
                />

                <button
                  className="shipping-rate-btn premium-calc-btn"
                  onClick={fetchShippingRates}
                >
                  Calculate Shipping
                </button>

              </div>

              {loadingRates && (
                <p className="shipping-loading">
                  Calculating shipping rates...
                </p>
              )}

              {shippingRates.length > 0 && (

                <div className="shipping-options">

                  {shippingRates.slice(0,3).map((rate) => (

                    <label
                      key={rate.object_id}
                      className={`shipping-option ${selectedRate === rate ? "active" : ""}`}
                    >

                      <input
                        type="radio"
                        name="shippingRate"
                        onChange={() => setSelectedRate(rate)}
                      />

                      <div className="shipping-option-info">

                        <strong>{rate.provider}</strong>

                        <span>
                          {rate.servicelevel?.name} — ${rate.amount}
                          {rate.estimated_days && (
                            <em style={{marginLeft:"6px",opacity:0.7}}>
                              ({rate.estimated_days} days)
                            </em>
                          )}
                        </span>

                      </div>

                    </label>

                  ))}

                </div>

              )}

            </div>

            <div className="checkout-total summary-card">

              <div className="summary-label">
                Research Order Total
              </div>

              <div className="checkout-total-price premium-total">
                ${(cartTotal + (selectedRate ? Number(selectedRate.amount) : 0)).toFixed(2)}
              </div>

            </div>


            {/* RESEARCH CONFIRMATION */}

            <div className="research-confirm premium-confirm">

              <input
                type="checkbox"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
              />

              <div className="confirm-text">
                <strong>Research Use Confirmation</strong>
                <p>
                  I confirm these compounds are being purchased strictly for
                  laboratory research and analytical purposes and not for
                  human or veterinary consumption.
                </p>
              </div>

            </div>




            {/* PAYPAL */}

            <div className="paypal-section">

              <PayPalButtons
                style={{
                  layout: "vertical",
                  color: "gold",
                  shape: "rect",
                  height: 50
                }}
                disabled={!confirmed || !selectedRate}
                createOrder={(data, actions) =>
                  actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: (cartTotal + (selectedRate ? Number(selectedRate.amount) : 0)).toFixed(2)
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
                        items: cart.map(item => ({
                          productId: item._id,
                          name: item.name,
                          price: item.price,
                          quantity: item.quantity
                        }))
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