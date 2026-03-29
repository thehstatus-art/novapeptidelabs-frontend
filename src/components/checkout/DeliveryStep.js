import React, { useEffect, useState } from "react";
import { API } from "../../config/api";

const fallbackDeliveryOptions = [
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

export default function DeliveryStep({
  next,
  back,
  cart,
  shippingAddress,
  selectedShipping,
  onSelectShipping,
}) {
  const [deliveryOptions, setDeliveryOptions] = useState(fallbackDeliveryOptions);
  const [isLoadingRates, setIsLoadingRates] = useState(false);
  const [rateError, setRateError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchRates = async () => {
      if (!shippingAddress?.zip) {
        setDeliveryOptions(fallbackDeliveryOptions);
        return;
      }

      try {
        setIsLoadingRates(true);
        setRateError("");

        const res = await fetch(`${API}/api/shipping/rates`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            shippingAddress,
            items: (cart || []).map((item) => ({
              productId: item._id,
              quantity: item.quantity,
            })),
          }),
        });

        const data = await res.json();

        if (!isMounted) return;

        if (!res.ok || !Array.isArray(data) || data.length === 0) {
          setDeliveryOptions(fallbackDeliveryOptions);
          setRateError("Live shipping rates unavailable. Showing backup rates.");
          return;
        }

        const normalizedOptions = data.map((rate) => ({
          id: rate.rateId,
          label: `${rate.provider} ${rate.service}`,
          eta: rate.estimated_days ? `${rate.estimated_days} business days` : "Tracked delivery",
          price: Number(rate.price),
          description: "Live carrier rate based on the shipping address.",
        }));

        setDeliveryOptions(normalizedOptions);

        if (!selectedShipping || !normalizedOptions.some((option) => option.id === selectedShipping.id)) {
          onSelectShipping?.(normalizedOptions[0]);
        }
      } catch (err) {
        if (!isMounted) return;
        setDeliveryOptions(fallbackDeliveryOptions);
        setRateError("Live shipping rates unavailable. Showing backup rates.");
      } finally {
        if (isMounted) {
          setIsLoadingRates(false);
        }
      }
    };

    fetchRates();

    return () => {
      isMounted = false;
    };
  }, [cart, onSelectShipping, selectedShipping, shippingAddress]);

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
          {isLoadingRates ? (
            <div className="checkout-delivery__note">Loading live shipping rates...</div>
          ) : null}

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
          {rateError || (
            selectedShipping
              ? `Selected: ${selectedShipping.label} for $${Number(selectedShipping.price).toFixed(2)}`
              : "Choose a shipping option to continue."
          )}
        </div>
    </div>
  );
}
