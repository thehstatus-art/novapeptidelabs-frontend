import React from "react";

export default function CartStep({ cart = [], increaseQty, decreaseQty, next }) {

  const total = cart.reduce((sum, item) => {
    return sum + (item.price || 0) * (item.quantity || 1);
  }, 0);

  return (

    <div className="cart-step-container">

      <h2 style={{ marginBottom: "24px", fontSize: "22px", fontWeight: "600" }}>
        Your Cart
      </h2>

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

              <div style={{ fontSize: "15px", fontWeight: "500" }}>
                {item.name}
              </div>

              <div style={{ fontSize: "13px", opacity: 0.7, marginTop: "4px" }}>
                ${item.price} each
              </div>

              <div style={{ fontSize: "13px", marginTop: "4px", opacity: 0.85 }}>
                Subtotal: ${subtotal.toFixed(2)}
              </div>

            </div>

            <div
              className="cart-qty"
            >

              <button onClick={() => decreaseQty(item._id)} style={{ cursor: "pointer" }}>
                −
              </button>

              <span style={{ minWidth: "18px", textAlign: "center" }}>
                {item.quantity}
              </span>

              <button onClick={() => increaseQty(item._id)} style={{ cursor: "pointer" }}>
                +
              </button>

            </div>

          </div>

        );

      })}

      <div
        style={{
          marginTop: "24px",
          paddingTop: "16px",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          display: "flex",
          justifyContent: "space-between",
          fontSize: "16px",
          fontWeight: "600"
        }}
      >
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