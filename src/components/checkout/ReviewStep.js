import React from "react";
import { getProductImageUrl } from "../../utils/images";

export default function ReviewStep({
  cart = [],
  back,
  completedOrder,
}) {

  const total = cart.reduce((sum, item) => {
    return sum + (item.price || 0) * (item.quantity || 1);
  }, 0);
  const emailBody = [
    "Hi NovaPeptide Labs,",
    "",
    "I completed payment for my order. Here are the products and quantities I purchased:",
    "",
    ...cart.map((item) => `${item.name} - Qty ${item.quantity || 1}`),
  ].filter(Boolean).join("\n");
  const emailHref = `mailto:support@novapeptidelabs.org?subject=${encodeURIComponent("Paid order details")}&body=${encodeURIComponent(emailBody)}`;

  return (
    <div className="checkout-step checkout-step--review">

      <div className="checkout-step__header">
        <div className="checkout-step__eyebrow">Step 5 of 5</div>
        <h2 className="checkout-step__title">Payment Received</h2>
        <p className="checkout-step__copy">
          Your payment was completed. Please send us your order details so fulfillment can verify the items.
        </p>
      </div>

      <div className="checkout-review">

        {cart.map((item) => {

          const subtotal = (item.price || 0) * (item.quantity || 1);

          return (
            <div key={item._id} className="checkout-review__item">

              <div className="checkout-review__left">

                <img
                  src={getProductImageUrl(item.image)}
                  alt={item.name}
                  className="checkout-review__image"
                />

                <div>
                  <div className="checkout-review__name">{item.name}</div>
                  <div className="checkout-review__meta">
                    Qty: {item.quantity}
                  </div>
                </div>

              </div>

              <div className="checkout-review__right">
                ${subtotal.toFixed(2)}
              </div>

            </div>
          );

        })}

      </div>

      <div className="checkout-review__summary">

        <div className="checkout-review__total">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>

      </div>

      <div style={emailNoticeStyle}>
        <strong>Required next step:</strong> Please email{" "}
        <a href={emailHref} style={emailNoticeLinkStyle}>
          support@novapeptidelabs.org
        </a>{" "}
        to confirm your payment and include the products you ordered, quantities, and your payment receipt.
      </div>

      <button
        className="checkout-step__button checkout-step__button--primary checkout-step__button--full"
        onClick={() => {
          window.location.href = emailHref;
        }}
        type="button"
      >
        Email Order Details
      </button>

      <div className="checkout-step__actions">
        <button type="button" className="checkout-step__button checkout-step__button--secondary" onClick={() => window.location.assign("/shop")}>
          Continue Shopping
        </button>
        <button type="button" className="checkout-step__button checkout-step__button--secondary" onClick={back}>
          Back
        </button>
      </div>

    </div>
  );
}

const emailNoticeStyle = {
  background: "#fff3cd",
  color: "#856404",
  border: "1px solid #ffeeba",
  borderRadius: "8px",
  padding: "14px",
  margin: "18px 0",
  fontWeight: 500,
};

const emailNoticeLinkStyle = {
  color: "#5f4300",
  fontWeight: 700,
};
