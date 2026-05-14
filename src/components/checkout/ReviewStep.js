import React from "react";

export default function ReviewStep({
  cart = [],
  back,
  handleCheckout,
  shippingAddress,
  isShippingComplete,
}) {

  const total = cart.reduce((sum, item) => {
    return sum + (item.price || 0) * (item.quantity || 1);
  }, 0);

  return (
    <div className="checkout-step checkout-step--review">

      <div className="checkout-step__header">
        <div className="checkout-step__eyebrow">Step 5 of 5</div>
        <h2 className="checkout-step__title">Review Your Order</h2>
        <p className="checkout-step__copy">
          Confirm your research compounds before placing order
        </p>
      </div>

      <div className="checkout-review">

        {cart.map((item) => {

          const subtotal = (item.price || 0) * (item.quantity || 1);

          return (
            <div key={item._id} className="checkout-review__item">

              <div className="checkout-review__left">

                <img
                  src={item.image}
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
        <strong>After payment:</strong> Please email{" "}
        <a href="mailto:support@novapeptidelabs.org" style={emailNoticeLinkStyle}>
          support@novapeptidelabs.org
        </a>{" "}
        with the product name and quantity for each item you purchased.
      </div>

      <button
        className="checkout-step__button checkout-step__button--primary checkout-step__button--full"
        onClick={() =>
          handleCheckout?.({
            email: shippingAddress?.email || "",
            shippingAddress,
          })
        }
        disabled={!isShippingComplete}
        type="button"
      >
        Place Secure Order →
      </button>

      <div className="checkout-step__actions">
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
