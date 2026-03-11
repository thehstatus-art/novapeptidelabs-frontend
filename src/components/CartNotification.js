import React, { useEffect } from "react";

export default function CartNotification({ product, onClose }) {

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!product) return null;

  return (
    <div className="cart-notification">

      <img src={product.image} alt={product.name} />

      <div>
        <strong>{product.name}</strong>
        <p>Added to cart</p>
      </div>

    </div>
  );
}