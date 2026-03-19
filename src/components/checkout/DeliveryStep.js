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
    <div className="delivery-step-card">
        <div className="step-panel-header">
          <div className="step-panel-eyebrow">Step 3 of 5</div>
          <h2 className="step-panel-title">Choose Delivery Speed</h2>
          <p className="step-panel-copy">
            Select the shipping method that best matches your timeline.
          </p>
        </div>

        <div className="delivery-options">
          {deliveryOptions.map((option) => {
            const isSelected = selected === option.id;

            return (
              <button
                key={option.id}
                type="button"
                className={`delivery-card ${isSelected ? "selected" : ""}`}
                onClick={() => setSelected(option.id)}
              >
                <div className="delivery-card-top">
                  <div>
                    <div className="delivery-label">{option.label}</div>
                    <div className="delivery-eta">{option.eta}</div>
                  </div>
                  <div className="delivery-price">${option.price.toFixed(2)}</div>
                </div>
                <div className="delivery-description">{option.description}</div>
              </button>
            );
          })}
        </div>

        <div className="checkout-nav">
          <button type="button" onClick={back}>Back</button>
          <button type="button" onClick={next}>Continue</button>
        </div>
        <div className="delivery-selected-note">
          Selected: {deliveryOptions.find((option) => option.id === selected)?.label} for ${deliveryOptions.find((option) => option.id === selected)?.price.toFixed(2)}
        </div>
    </div>
  );

}
