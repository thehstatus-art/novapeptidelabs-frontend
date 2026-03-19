import React, { useState } from "react";

const deliveryOptions = [
  {
    id: "standard",
    label: "Standard Shipping",
    eta: "3-5 business days",
    price: 4.99,
    description: "Reliable tracked delivery for most domestic orders.",
  },
  {
    id: "express",
    label: "Express Shipping",
    eta: "1-2 business days",
    price: 9.99,
    description: "Priority fulfillment when you need a faster turnaround.",
  },
];

export default function DeliveryStep({ next, back }){
  const [selected, setSelected] = useState(deliveryOptions[0].id);

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
            const isSelected = selected === option.id;

            return (
              <button
                key={option.id}
                type="button"
                className={`checkout-delivery__option ${isSelected ? "is-selected" : ""}`}
                onClick={() => setSelected(option.id)}
              >
                <div className="checkout-delivery__top">
                  <div>
                    <div className="checkout-delivery__label">{option.label}</div>
                    <div className="checkout-delivery__eta">{option.eta}</div>
                  </div>
                  <div className="checkout-delivery__price">${option.price.toFixed(2)}</div>
                </div>
                <div className="checkout-delivery__description">{option.description}</div>
              </button>
            );
          })}
        </div>

        <div className="checkout-step__actions">
          <button type="button" className="checkout-step__button checkout-step__button--secondary" onClick={back}>Back</button>
          <button type="button" className="checkout-step__button checkout-step__button--primary" onClick={next}>Continue</button>
        </div>

        <div className="checkout-delivery__note">
          Selected: {deliveryOptions.find((option) => option.id === selected)?.label} for ${deliveryOptions.find((option) => option.id === selected)?.price.toFixed(2)}
        </div>
    </div>
  );

}
