import React, { useState } from "react";

import CheckoutSteps from "./CheckoutSteps";
import CartStep from "./CartStep";
import ShippingStep from "./ShippingStep";
import DeliveryStep from "./DeliveryStep";
import PaymentStep from "./PaymentStep";
import ReviewStep from "./ReviewStep";
import OrderSummary from "./OrderSummary";

export default function CheckoutFlow(props) {

  const [step, setStep] = useState(1);

  const next = () => setStep(prev => Math.min(5, prev + 1));
  const back = () => setStep(prev => Math.max(1, prev - 1));
  const goTo = (s) => setStep(prev => Math.min(5, Math.max(1, s)));

  const renderStep = () => {

    switch(step){

      case 1:
        return <CartStep {...props} next={next} />

      case 2:
        return <ShippingStep {...props} next={next} back={back} />

      case 3:
        return <DeliveryStep {...props} next={next} back={back} />

      case 4:
        return <PaymentStep {...props} next={next} back={back} />

      case 5:
        return <ReviewStep {...props} back={back} />

      default:
        return null

    }

  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">

        <div className="checkout-header checkout-steps-bar">
          <div className="checkout-steps-wrapper">
            <CheckoutSteps step={step} onStepClick={goTo} />
          </div>
        </div>

        <div className="checkout-grid">

          <div className="checkout-left">
            <div className="checkout-step-content">
              {renderStep()}
            </div>
          </div>

          {step !== 5 && (
            <div className="checkout-payment">
              <OrderSummary {...props} />
            </div>
          )}

        </div>

      </div>
    </div>
  )

}