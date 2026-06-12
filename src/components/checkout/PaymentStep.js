import React, { useState } from "react";

export default function PaymentStep({
  cartTotal = 0,
  shippingCost = 0,
  selectedShipping,
  discountRate = 0,
  discountAmount = 0,
  back,
  shippingAddress,
  isShippingComplete,
  onConfirmPayment,
}) {
  const [copyStatus, setCopyStatus] = useState("Copy address");
  const amountDue = cartTotal - discountAmount + shippingCost;
  const walletAddress = "bc1q8q6y858k8scl7ky35r8usp6vuged5d2ycppxwd";
  const canPay = isShippingComplete && Boolean(selectedShipping);

  return (
    <div className="checkout-step checkout-step--payment">
      <div className="checkout-step__header">
        <div className="checkout-step__eyebrow">Step 4 of 5</div>
        <h2 className="checkout-step__title">Payment</h2>
        <p className="checkout-step__copy">
          Pay with BTC only. After sending payment, please email support@novapeptidelabs.org to confirm your payment and include the products you ordered, quantities, and your payment receipt.
        </p>
      </div>

      <div className="checkout-payment-step__banner">
        <span>Amount Due</span>
        <strong>${amountDue.toFixed(2)}</strong>
      </div>

      {discountRate > 0 ? (
        <div className="checkout-payment-step__note" style={{ marginBottom: 18, padding: 14, borderRadius: 12, background: "#eef9f1", color: "#1b5e20", border: "1px solid #c8e6c9" }}>
          Bitcoin discount applied: 10% off (${discountAmount.toFixed(2)} savings).
        </div>
      ) : null}

      <div className="checkout-payment-step__provider" style={{ border: "1px solid #ddd", borderRadius: 16, padding: 24, background: "#fafafa" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <div style={{ textAlign: "center", color: "#333", marginBottom: 8 }}>
            <strong>Copy the wallet address below to pay BTC</strong>
          </div>
          <div style={{ width: "100%", textAlign: "center" }}>
            <div style={{ marginBottom: 10, color: "#555" }}>BTC Wallet Address</div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
              <code style={{ flex: "1 1 320px", minWidth: 0, fontSize: 16, padding: 18, border: "1px dashed #bbb", borderRadius: 10, background: "#fff", color: "#000", wordBreak: "break-all", textAlign: "left" }}>
                {walletAddress}
              </code>
              <button
                type="button"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(walletAddress);
                    setCopyStatus("Copied!");
                    window.setTimeout(() => setCopyStatus("Copy address"), 2200);
                  } catch (err) {
                    setCopyStatus("Copy failed");
                    window.setTimeout(() => setCopyStatus("Copy address"), 2200);
                  }
                }}
                style={{
                  padding: "10px 18px",
                  borderRadius: 10,
                  border: "1px solid #999",
                  background: "#fff",
                  cursor: "pointer",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                }}
              >
                {copyStatus}
              </button>
            </div>
          </div>
          <div style={{ color: "#333", textAlign: "center", lineHeight: 1.6 }}>
            After sending BTC, please email your payment receipt and the products you ordered to <a href="mailto:support@novapeptidelabs.org">support@novapeptidelabs.org</a>.
          </div>
          <div style={{ color: "#555", textAlign: "center" }}>
            We will ship your order once payment confirmation is received.
          </div>
        </div>
      </div>

      {canPay ? (
        <>
          <div className="checkout-payment-step__shipping">
            <strong>Shipping To</strong>
            <span>
              {shippingAddress.name} • {shippingAddress.street}, {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zip}
            </span>
          </div>

          <div className="checkout-payment-step__shipping">
            <strong>Shipping Method</strong>
            <span>
              {selectedShipping?.label} • ${Number(shippingCost).toFixed(2)}
            </span>
          </div>
        </>
      ) : (
        <div className="checkout-payment-step__warning">
          Complete your shipping address and choose a shipping option before paying, so we can ship your order correctly after payment confirmation.
        </div>
      )}

      <div className="checkout-step__actions">
        <button type="button" className="checkout-step__button checkout-step__button--secondary" onClick={back}>
          Back
        </button>
        <button
          type="button"
          className="checkout-step__button checkout-step__button--primary"
          onClick={onConfirmPayment}
          disabled={!canPay}
        >
          I sent BTC and emailed the receipt
        </button>
      </div>
    </div>
  );
}
