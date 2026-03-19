import React from "react";

export default function CartStep({ cart = [], increaseQty, decreaseQty, next }) {

  const total = cart.reduce((sum, item) => {
    return sum + (item.price || 0) * (item.quantity || 1);
  }, 0);

  return (

    <div className="cart-step-container cart-step-full">

      <h2 className="cart-title">
        Your Cart
      </h2>

      {cart.length === 0 && (
        <div className="cart-empty">
          <p>Your cart is empty.</p>
        </div>
      )}

      <div className="cart-list">
      {cart.map((item) => {

        const subtotal = (item.price || 0) * (item.quantity || 1);

        return (

          <div
            key={item._id}
            className="cart-card"
          >

            <img
              src={item.image}
              alt={item.name}
              className="cart-product-image"
            />

            <div style={{ flex: 1 }}>

              <div className="cart-product-name">
                {item.name}
              </div>

              <div className="cart-product-price">
                ${item.price} each
              </div>

              <div className="cart-product-subtotal">
                Subtotal: ${subtotal.toFixed(2)}
              </div>

            </div>

            <div
              className="cart-qty"
            >

              <button className="qty-btn" onClick={() => decreaseQty(item._id)}>
                −
              </button>

              <span className="qty-value">
                {item.quantity}
              </span>

              <button className="qty-btn" onClick={() => increaseQty(item._id)}>
                +
              </button>

            </div>

          </div>

        );

      })}
      </div>

      <div className="cart-total">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>

      <button
        className="checkout-next-btn"
        onClick={next}
      >
        Continue to Shipping
      </button>

    </div>

  );

}