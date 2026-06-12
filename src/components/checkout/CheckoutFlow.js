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
  });
  const [selectedShipping, setSelectedShipping] = useState(null);
  const [completedOrder, setCompletedOrder] = useState(null);

  const cart = props.cart || [];
  const cartTotal = Number(props.cartTotal ?? cart.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0));
  const shippingCost = Number(selectedShipping?.price || 0);
  const discountRate = cartTotal > 0 ? 0.1 : 0;
  const discountAmount = Number((cartTotal * discountRate).toFixed(2));
  const orderTotal = cartTotal - discountAmount + shippingCost;
  const isShippingComplete = Boolean(
    shippingAddress.name &&
    shippingAddress.email &&
    shippingAddress.street &&
    shippingAddress.city &&
    shippingAddress.state &&
    shippingAddress.zip
  );

  const next = () => setStep((current) => Math.min(current + 1, 5));
  const back = () => setStep((current) => Math.max(current - 1, 1));
  const goTo = (index) => {
    if (index >= 1 && index <= 5) {
      setStep(index);
    }
  };

  const onShippingChange = (field, value) => {
    setShippingAddress((prev) => ({ ...prev, [field]: value }));
  };

  const confirmPayment = () => {
    setCompletedOrder({
      items: cart,
      shippingAddress,
      shippingCost,
      shippingMethod: selectedShipping?.label || "",
      orderTotal,
    });
    setStep(5);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <CartStep
            cart={cart}
            increaseQty={props.increaseQty}
            decreaseQty={props.decreaseQty}
            next={next}
          />
        );

      case 2:
        return (
          <ShippingStep
            next={next}
            back={back}
            shippingAddress={shippingAddress}
            onShippingChange={onShippingChange}
          />
        );

      case 3:
        return (
          <DeliveryStep
            next={next}
            back={back}
            cart={cart}
            shippingAddress={shippingAddress}
            selectedShipping={selectedShipping}
            onSelectShipping={setSelectedShipping}
          />
        );

      case 4:
        return (
          <PaymentStep
            back={back}
            shippingAddress={shippingAddress}
            isShippingComplete={isShippingComplete}
            cartTotal={cartTotal}
            shippingCost={shippingCost}
            selectedShipping={selectedShipping}
            discountRate={discountRate}
            discountAmount={discountAmount}
            onConfirmPayment={confirmPayment}
          />
        );

      case 5:
        return (
          <ReviewStep
            cart={cart}
            back={back}
            completedOrder={completedOrder}
          />
        );

      default:
        return null;
    }
  };

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
            <div className="checkout-shell__panel">{renderStep()}</div>
          </div>

          <aside className="checkout-shell__summary">
            <OrderSummary
              {...props}
              shippingCost={shippingCost}
              shippingLabel={selectedShipping?.label || ""}
              discountRate={discountRate}
              discountAmount={discountAmount}
              orderTotal={orderTotal}
            />
          </aside>
        </div>
      </div>
    </div>
  );
}

