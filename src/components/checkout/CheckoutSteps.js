import React from "react";

export default function CheckoutSteps({ step, onStepClick }) {

  const steps = ["Cart","Shipping","Delivery","Payment","Review"];

    return (
      <div className="checkout-progress">

        {steps.map((label, i) => {
          const current = i + 1;
          const isActive = step === current;
          const isDone = step > current;

          return (
            <div
              key={label}
              className={`checkout-progress__step ${isActive ? "is-active" : ""} ${isDone ? "is-done" : ""}`}
              onClick={() => {
                if (onStepClick) onStepClick(current);
              }}
            >

              <div className="checkout-progress__badge">
                {isDone ? "✓" : current}
              </div>

              <div className="checkout-progress__label">{label}</div>

              {i !== steps.length - 1 && (
                <div className="checkout-progress__line">
                  <div className={`checkout-progress__line-fill ${isDone ? "is-filled" : ""}`} />
                </div>
              )}

            </div>
          );
        })}

      </div>
    );
  
}
