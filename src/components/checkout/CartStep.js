import React from "react";

export default function CartStep({ cart = [], increaseQty, decreaseQty, next }) {

  return (
    <div className="checkout-cart">

      <div className="checkout-cart__header">
        <h2 className="checkout-cart__title">Your Cart</h2>
        <p className="checkout-cart__subtitle">Review your selected research compounds</p>
      </div>

      {cart.length === 0 && (
        <div className="checkout-cart__empty">
          <p>Your cart is empty.</p>
        </div>
      )}

      <div className="checkout-cart__panel">
        <div className="checkout-cart__list">
          {cart.map((item) => {

            const subtotal = (item.price || 0) * (item.quantity || 1);

            return (
              <div key={item._id} className="checkout-cart__item">

                <img
                  src={item.image}
                  alt={item.name}
                  className="checkout-cart__image"
                />

                <div className="checkout-cart__info">

                  <div className="checkout-cart__name">
                    {item.name}
                  </div>

                  <div className="checkout-cart__price">
                    ${item.price} each
                  </div>

                  <div className="checkout-cart__subtotal">
                    ${subtotal.toFixed(2)}
                  </div>

                </div>

                <div className="checkout-cart__qty">

                  <button className="checkout-cart__qty-btn" onClick={() => decreaseQty(item._id)}>
                    −
                  </button>

                  <span className="checkout-cart__qty-value">
                    {item.quantity}
                  </span>

                  <button className="checkout-cart__qty-btn" onClick={() => increaseQty(item._id)}>
                    +
                  </button>

                </div>

              </div>
            );

          })}
        </div>

        <div className="checkout-cart__actions">
          <button
            className="checkout-cart__continue"
            onClick={next}
            disabled={cart.length === 0}
          >
            Continue to Shipping →
          </button>
        </div>
      </div>

    </div>
  );
}
