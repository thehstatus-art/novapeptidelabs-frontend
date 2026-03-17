import React from "react";

export default function CartStep({ cart = [], increaseQty, decreaseQty, next }) {

  return (

    <div className="cart-step-container">

      <h2 style={{ marginBottom: "24px" }}>Your Cart</h2>

      {cart.map((item) => {

        const subtotal = (item.price || 0) * (item.quantity || 1);

        return (

          <div key={item._id} className="cart-card">

            <img
              src={item.image}
              alt={item.name}
              style={{
                width: "60px",
                height: "60px",
                objectFit: "cover",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.08)"
              }}
            />

            <div style={{ flex: 1 }}>

              <h3 style={{ margin: "0 0 6px 0", fontSize: "15px" }}>
                {item.name}
              </h3>

              <div style={{ fontSize: "13px", opacity: 0.75 }}>
                ${item.price} each
              </div>

              <div style={{ fontSize: "13px", marginTop: "4px", opacity: 0.85 }}>
                Subtotal: ${subtotal.toFixed(2)}
              </div>

            </div>

            <div className="qty">

              <button onClick={() => decreaseQty(item._id)}>-</button>

              <span>{item.quantity}</span>

              <button onClick={() => increaseQty(item._id)}>+</button>

            </div>

          </div>

        );

      })}

      <button
        className="checkout-next"
        onClick={next}
        style={{
          marginTop: "30px",
          padding: "14px 22px",
          borderRadius: "8px",
          border: "none",
          background: "#0ea5e9",
          color: "white",
          fontWeight: "600",
          cursor: "pointer",
          width: "100%"
        }}
      >
        Continue to Shipping
      </button>

    </div>

  );

}