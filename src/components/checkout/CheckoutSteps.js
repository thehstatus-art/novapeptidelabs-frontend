import React from "react";

export default function CheckoutSteps({ step, goToStep }) {

  const steps = ["Cart","Shipping","Delivery","Payment","Review"];

  return (

    <div className="checkout-steps">

      {steps.map((label, i) => {
        const current = i + 1;
        const status = step === current ? "active" : step > current ? "done" : "";

        return (
          <div
            key={label}
            className={`step ${status}`}
            onClick={() => goToStep && goToStep(current)}
            style={{ cursor: "pointer" }}
          >

            <div className="step-circle">
              {step > current ? "✓" : current}
            </div>

            <div className="step-label">{label}</div>

            {i !== steps.length - 1 && (
              <div className={`step-line ${step > current ? "filled" : ""}`} />
            )}

          </div>
        );
      })}

    </div>

  );

}