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

                    <div className="checkout-specs premium-specs">
                      <span className="spec-badge">≥99% Purity</span>
                      <span className="spec-badge">COA Verified</span>
                      <span className="spec-badge">Lab Grade</span>
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

            <h3 className="summary-title">Secure Order Summary</h3>

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
                🎟 Research Discount Code
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

            <div className="checkout-total summary-card">

              <div className="summary-header">
                <span className="summary-header-label">Secure Research Order</span>
              </div>

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

              {/* SAVINGS LINE */}

              {discountAmount > 0 && (
                <div className="checkout-savings">
                  You saved ${discountAmount.toFixed(2)} on this research order 🎉
                </div>
              )}

              {/* FREE SHIPPING PROGRESS */}

              <div className="shipping-progress">

                {orderSubtotal < FREE_STANDARD_SHIPPING && (
                  <div className="shipping-label">
                    🚚 ${amountToStandard.toFixed(2)} away from <strong>FREE standard shipping</strong>
                  </div>
                )}

                {orderSubtotal >= FREE_STANDARD_SHIPPING && orderSubtotal < FREE_EXPRESS_SHIPPING && (
                  <div className="shipping-label">
                    ⚡ ${amountToExpress.toFixed(2)} away from <strong>FREE 2-day shipping</strong>
                  </div>
                )}

                {orderSubtotal >= FREE_EXPRESS_SHIPPING && (
                  <div className="shipping-unlocked">
                    🎉 Free 2-Day Research Shipping Unlocked
                  </div>
                )}

                <div className="shipping-bar">
                  <div
                    className="shipping-fill"
                    style={{ width: `${shippingProgress}%` }}
                  ></div>
                </div>

                <div className="shipping-tier-labels">
                  <span>Free Standard · $100</span>
                  <span>Free 2-Day · $175</span>
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
                  I confirm these compounds are being purchased strictly for
                  laboratory research and analytical purposes and not for
                  human or veterinary consumption.
                </p>
              </div>

            </div>

            <div className="research-batch-badge">
              Verified Research Batch
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

            <div className="checkout-trust-panel">
              <strong>Secure Laboratory Checkout</strong>
              <p>
                All research compounds are produced in certified laboratory
                environments and verified through third‑party analytical
                testing. Payments are processed through encrypted
                infrastructure and secured payment providers.
              </p>
              <p>
                Orders are packaged in laboratory‑grade sterile containers
                and shipped with tracking from verified fulfillment partners.
              </p>
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