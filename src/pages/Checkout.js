import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PayPalButtons } from "@paypal/react-paypal-js";

const API = process.env.REACT_APP_API_URL || "https://nova-backend-lu2l.onrender.com";

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
  const [discountCode, setDiscountCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountApplied, setDiscountApplied] = useState(false);
  const [loadingRates, setLoadingRates] = useState(false);
  const navigate = useNavigate();

  const shippingCost = selectedRate
    ? Number(selectedRate.price ?? selectedRate.amount ?? 0)
    : 0;

  const FREE_STANDARD_SHIPPING = 100;
  const FREE_EXPRESS_SHIPPING = 175;

  const orderSubtotal = cartTotal - discountAmount;

  const amountToStandard = Math.max(FREE_STANDARD_SHIPPING - orderSubtotal, 0);
  const amountToExpress = Math.max(FREE_EXPRESS_SHIPPING - orderSubtotal, 0);

  const shippingProgress = Math.min((orderSubtotal / FREE_EXPRESS_SHIPPING) * 100, 100);

  const applyDiscount = () => {

    const code = discountCode.trim().toUpperCase();

    if (code === "NOVA10") {
      setDiscountAmount(cartTotal * 0.10);
      setDiscountApplied(true);
    } else if (code === "LAB20") {
      setDiscountAmount(cartTotal * 0.20);
      setDiscountApplied(true);
    } else {
      alert("Invalid discount code");
      setDiscountAmount(0);
      setDiscountApplied(false);
    }

  };

  const fetchShippingRates = async () => {

    if (!zip || zip.length < 5) {
      alert("Enter a valid ZIP code to calculate shipping.");
      return;
    }

    try {

      setLoadingRates(true);

      const res = await fetch(`${API}/api/shipping/rates`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ zip })
      });

      const data = await res.json();

      setShippingRates(data || []);
      if (data && data.length > 0) {
        const cheapest = data[0];
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
              <h1>Checkout</h1>
              <div className="checkout-divider"></div>
            </div>

            <h2 className="cart-title">Cart</h2>

            {cart.length === 0 && (
              <p className="empty-cart">
                Your cart is currently empty.
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

          <div className="checkout-payment" style={{ backdropFilter: "none", WebkitBackdropFilter: "none", filter: "none", background: "#0b1b2e" }}>

            <h3 className="summary-title">Order Summary</h3>

            {/* SHIPPING CALCULATOR */}

            <div className="shipping-box">

              <h4 className="shipping-title">Shipping Destination</h4>

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
                      key={rate.rateId || rate.object_id || rate.provider}
                      className={`shipping-option ${selectedRate === rate ? "active" : ""}`}
                    >

                      <input
                        type="radio"
                        name="shippingRate"
                        checked={selectedRate === rate}
                        onChange={() => setSelectedRate(rate)}
                      />

                      <div className="shipping-option-info">

                        <strong>{rate.provider}</strong>

                        <span>
                          {rate.service || rate.servicelevel?.name} — ${rate.price || rate.amount}
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

            <div className="discount-box premium-discount-panel">

              <h4 className="shipping-title">
                Discount Code
              </h4>

              <div className="shipping-zip-row">

                <input
                  type="text"
                  placeholder="Enter discount code"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  className="shipping-zip-input"
                />

                <button
                  className="shipping-rate-btn premium-calc-btn"
                  onClick={applyDiscount}
                >
                  Apply
                </button>

              </div>

              {discountApplied && (
                <div className="discount-success">
                  <span>✓</span>
                  <p>Discount successfully applied to this research order.</p>
                </div>
              )}

            </div>

            <div className="checkout-total" style={{ backdropFilter: "none", WebkitBackdropFilter: "none", filter: "none", background: "rgba(8,20,40,0.92)", border: "1px solid rgba(120,180,255,0.25)", boxShadow: "0 0 0 rgba(0,0,0,0)" }}>

              <div className="summary-main">

                <div className="summary-row">
                  <span className="summary-name">Products</span>
                  <span className="summary-value">${cartTotal.toFixed(2)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="summary-row discount-row">
                    <span className="summary-name">Discount</span>
                    <span className="summary-value">- ${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                {selectedRate && (
                  <div className="summary-row">
                    <span className="summary-name">Shipping</span>
                    <span className="summary-value">${shippingCost.toFixed(2)}</span>
                  </div>
                )}

                <div className="summary-divider"></div>

                <div className="summary-total-row">
                  <span className="summary-total-label">Order Total</span>
                  <span className="summary-total-price">
                    ${(cartTotal + shippingCost - discountAmount).toFixed(2)}
                  </span>
                </div>

                <div className="delivery-estimate">
                  Estimated delivery: 2‑5 business days
                </div>

                {discountAmount > 0 && (
                  <div className="checkout-savings">
                    You saved ${discountAmount.toFixed(2)} today
                  </div>
                )}

              </div>

              <div className="shipping-progress-panel">

                {orderSubtotal < FREE_STANDARD_SHIPPING && (
                  <div className="shipping-label">
                    ${amountToStandard.toFixed(2)} until free shipping
                  </div>
                )}

                {orderSubtotal >= FREE_STANDARD_SHIPPING && orderSubtotal < FREE_EXPRESS_SHIPPING && (
                  <div className="shipping-label">
                    ${amountToExpress.toFixed(2)} until free 2‑day
                  </div>
                )}

                {orderSubtotal >= FREE_EXPRESS_SHIPPING && (
                  <div className="shipping-unlocked">
                    Free 2‑Day Shipping Unlocked
                  </div>
                )}

                <div className="shipping-bar">
                  <div
                    className="shipping-fill"
                    style={{ width: `${shippingProgress}%` }}
                  ></div>
                </div>

                <div className="shipping-tier-labels">
                  <span>$100 Free Standard</span>
                  <span>$175 Free 2‑Day</span>
                </div>

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
                  I confirm this purchase is for laboratory research purposes only.
                </p>
              </div>
            </div>


            {/* PAYPAL */}

            <div className="paypal-section premium-paypal">

              <PayPalButtons
                style={{
                  layout: "vertical",
                  color: "gold",
                  shape: "rect",
                  height: 50
                }}
                disabled={!confirmed || (shippingRates.length > 0 && !selectedRate)}
                createOrder={(data, actions) =>
                  actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: (cartTotal + shippingCost - discountAmount).toFixed(2)
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

            {/* CHECKOUT TRUST PANEL */}

            <div className="checkout-trust-panel checkout-trust-minimal">
              <strong>Secure Laboratory Checkout</strong>
              <p>
                Payments are encrypted and processed through secure PayPal infrastructure.
                All compounds are verified research batches and shipped with tracking.
              </p>
            </div>


          </div>

        </div>

      </div>

    </div>

  );

}