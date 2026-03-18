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

  const next = () => setStep(step + 1);
  const back = () => setStep(step - 1);

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

    <div className="checkout-container">

      <div className="checkout-header">
        <CheckoutSteps step={step} />
      </div>

      <div className="checkout-content">

        <div className="checkout-main">
          {renderStep()}
        </div>

        {/* Hide order summary on final step for cleaner UX */}
        {step !== 5 && (
          <div className="checkout-summary">
            <OrderSummary {...props} />
          </div>
        )}

      </div>

    </div>

  )

}