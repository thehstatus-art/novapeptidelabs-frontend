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
  const [shippingAddress, setShippingAddress] = useState({
    name: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "US",
  });
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);
  const [selectedShipping, setSelectedShipping] = useState(null);

  const next = () => setStep(prev => Math.min(5, prev + 1));
  const back = () => setStep(prev => Math.max(1, prev - 1));
  const goTo = (s) => setStep(prev => Math.min(5, Math.max(1, s)));
  const updateShippingField = (field, value) => {
    setShippingAddress((prev) => ({ ...prev, [field]: value }));
  };
  const isShippingComplete = Boolean(
    shippingAddress.name &&
    shippingAddress.email &&
    shippingAddress.street &&
    shippingAddress.city &&
    shippingAddress.state &&
    shippingAddress.zip
  );
  const shippingCost = Number(selectedShipping?.price || 0);
  const orderTotal = props.cartTotal + shippingCost;

  const renderStep = () => {

    switch(step){

      case 1:
        return <CartStep {...props} next={next} />

      case 2:
        return (
          <ShippingStep
            {...props}
            next={next}
            back={back}
            shippingAddress={shippingAddress}
            onShippingChange={updateShippingField}
          />
        )

      case 3:
        return (
          <DeliveryStep
            {...props}
            next={next}
            back={back}
            shippingAddress={shippingAddress}
            selectedShipping={selectedShipping}
            onSelectShipping={setSelectedShipping}
          />
        )

      case 4:
        return (
          <PaymentStep
            {...props}
            next={next}
            back={back}
            shippingAddress={shippingAddress}
            isShippingComplete={isShippingComplete}
            isSubmittingOrder={isSubmittingOrder}
            cartTotal={props.cartTotal}
            shippingCost={shippingCost}
            selectedShipping={selectedShipping}
            onPaymentApproved={async (orderID) => {
              setIsSubmittingOrder(true);
              try {
                const success = await props.handlePayPalSuccess?.({
                  orderID,
                  shippingAddress,
                  shippingCost,
                  shippingMethod: selectedShipping?.label || "",
                });

                if (success) {
                  next();
                } else {
                  alert("Order was paid but could not be saved. Please contact support.");
                }
              } finally {
                setIsSubmittingOrder(false);
              }
            }}
          />
        )

      case 5:
        return (
          <ReviewStep
            {...props}
            back={back}
            shippingAddress={shippingAddress}
            isShippingComplete={isShippingComplete}
          />
        )

      default:
        return null

    }

  }

  return (
    <div className="checkout-shell">
      <div className="checkout-shell__inner">

        <div className="checkout-shell__header">
          <div className="checkout-shell__steps">
            <CheckoutSteps step={step} onStepClick={goTo} />
          </div>
        </div>

        <div className="checkout-shell__grid">

          <div className="checkout-shell__main">
            <div className="checkout-shell__panel">
              {renderStep()}
            </div>
          </div>

          <aside className="checkout-shell__summary">
            <OrderSummary
              {...props}
              shippingCost={shippingCost}
              shippingLabel={selectedShipping?.label || ""}
              orderTotal={orderTotal}
            />
          </aside>

        </div>

      </div>
    </div>
  )

}
