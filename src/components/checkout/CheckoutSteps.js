import React from "react";

export default function CheckoutSteps({ step, goToStep }) {

  const steps = ["Cart","Shipping","Delivery","Payment","Review"];

    return (
      <div className="checkout-steps modern-steps">

        {steps.map((label, i) => {
          const current = i + 1;
          const isActive = step === current;
          const isDone = step > current;

          return (
            <div
              key={label}
              className={`step ${isActive ? "active" : ""} ${isDone ? "done" : ""}`}
              onClick={() => goToStep && goToStep(current)}
            >

              {/* Circle */}
              <div className="step-circle">
                {isDone ? "✓" : current}
              </div>

              {/* Label */}
              <div className="step-label">{label}</div>

              {/* Line */}
              {i !== steps.length - 1 && (
                <div className="step-line-wrapper">
                  <div className="step-line" />
                  <div className={`step-line-fill ${isDone ? "filled" : ""}`} />
                </div>
              )}

            </div>
          );
        })}

      </div>
    );
  
}