import React, { useEffect, useState } from "react";

const flatShippingOption = [
  {
    id: "flat-rate",
    label: "Flat Rate Shipping",
    eta: "3-5 business days",
    price: 9.99,
    description: "Flat $9.99 shipping for all orders.",
  },
];

export default function DeliveryStep({
  next,
  back,
  cart,
  shippingAddress,
  selectedShipping,
  onSelectShipping,
}) {
  const [deliveryOptions] = useState(flatShippingOption);

  useEffect(() => {
    if (!selectedShipping && deliveryOptions.length > 0) {
      onSelectShipping?.(deliveryOptions[0]);
    }
  }, [deliveryOptions, onSelectShipping, selectedShipping]);

  return(
    <div className="checkout-step checkout-step--delivery">
        <div className="checkout-step__header">
          <div className="checkout-step__eyebrow">Step 3 of 5</div>
          <h2 className="checkout-step__title">Choose Delivery Speed</h2>
          <p className="checkout-step__copy">
            Select the shipping method that best matches your timeline.
          </p>
        </div>

        <div className="checkout-delivery">
          {deliveryOptions.map((option) => {
            const isSelected = selectedShipping?.id === option.id;

            return (
              <button
                key={option.id}
                type="button"
                className={`checkout-delivery__option ${isSelected ? "is-selected" : ""}`}
                onClick={() => onSelectShipping?.(option)}
              >
                <div className="checkout-delivery__top">
                  <div>
                    <div className="checkout-delivery__label">{option.label}</div>
                    <div className="checkout-delivery__eta">{option.eta}</div>
                  </div>
                  <div className="checkout-delivery__price">${Number(option.price).toFixed(2)}</div>
                </div>
                <div className="checkout-delivery__description">{option.description}</div>
              </button>
            );
          })}
        </div>

        <div className="checkout-step__actions">
          <button type="button" className="checkout-step__button checkout-step__button--secondary" onClick={back}>Back</button>
          <button type="button" className="checkout-step__button checkout-step__button--primary" onClick={next} disabled={!selectedShipping}>Continue</button>
        </div>

        <div className="checkout-delivery__note">
          {selectedShipping
            ? `Selected: ${selectedShipping.label} for $${Number(selectedShipping.price).toFixed(2)}`
            : "Shipping is a flat $9.99 rate."
          }
        </div>
    </div>
  );
}
