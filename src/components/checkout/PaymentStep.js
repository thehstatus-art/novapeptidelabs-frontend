import React from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";

export default function PaymentStep({
  cartTotal = 0,
  back,
  shippingAddress,
  isShippingComplete,
  isSubmittingOrder,
  onPaymentApproved,
}) {

  return(
    <div className="checkout-step checkout-step--payment">
        <div className="checkout-step__header">
          <div className="checkout-step__eyebrow">Step 4 of 5</div>
          <h2 className="checkout-step__title">Payment</h2>
          <p className="checkout-step__copy">
            Complete checkout securely with PayPal. Your order summary remains visible on the right.
          </p>
        </div>

        <div className="checkout-payment-step__banner">
          <span>Amount Due</span>
          <strong>${cartTotal.toFixed(2)}</strong>
        </div>

        {isShippingComplete ? (
          <>
            <div className="checkout-payment-step__shipping">
              <strong>Shipping To</strong>
              <span>
                {shippingAddress.name} • {shippingAddress.street}, {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zip}
              </span>
            </div>

            <div className="checkout-payment-step__provider">
              <PayPalButtons
                style={{ layout: "vertical", color: "gold", shape: "rect", label: "paypal" }}
                createOrder={(data, actions) => actions.order.create({
                  purchase_units: [{ amount: { value: cartTotal.toFixed(2) } }]
                })}
                onApprove={async (data, actions) => {
                  const details = await actions.order.capture();

                  try {
                    await onPaymentApproved?.({
                      orderID: data.orderID,
                      details,
                      shippingAddress: {
                        ...shippingAddress,
                        email: details?.payer?.email_address || shippingAddress?.email || "",
                      },
                    });

                  } catch (err) {
                    console.error("ORDER SAVE ERROR:", err);
                    alert("Payment succeeded but order failed to save. Contact support.");
                  }
                }}
                onError={(err) => {
                  console.error("PayPal error:", err);
                  alert("Payment failed. Please try again.");
                }}
              />
            </div>
          </>
        ) : (
          <div className="checkout-payment-step__warning">
            Complete your shipping address before paying so the order can be saved and labeled correctly.
          </div>
        )}

        {isSubmittingOrder && (
          <div className="checkout-payment-step__status">
            Saving your order and preparing fulfillment details...
          </div>
        )}

        <div className="checkout-step__actions">
          <button type="button" className="checkout-step__button checkout-step__button--secondary" onClick={back}>
            Back
          </button>
        </div>
    </div>
  );

}
