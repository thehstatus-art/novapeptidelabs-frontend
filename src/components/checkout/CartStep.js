import React from "react";

export default function CartStep({ cart = [], increaseQty, decreaseQty, next }) {

  const total = cart.reduce((sum, item) => {
    return sum + (item.price || 0) * (item.quantity || 1);
  }, 0);

  return (

    <div className="cart-step-container" style={{ maxWidth: "720px", margin: "0 auto" }}>

      <h2 style={{ marginBottom: "24px", fontSize: "22px", fontWeight: "600" }}>
        Your Cart
      </h2>

      {cart.map((item) => {

        const subtotal = (item.price || 0) * (item.quantity || 1);

        return (

          <div
            key={item._id}
            className="cart-card"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              padding: "16px",
              marginBottom: "14px",
              borderRadius: "12px",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              backdropFilter: "blur(8px)"
            }}
          >

            <img
              src={item.image}
              alt={item.name}
              style={{
                width: "56px",
                height: "56px",
                objectFit: "cover",
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.1)"
              }}
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
              className="qty"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                background: "rgba(255,255,255,0.05)",
                padding: "6px 10px",
                borderRadius: "8px"
              }}
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
        className="checkout-next"
        onClick={next}
        style={{
          marginTop: "24px",
          padding: "14px",
          borderRadius: "10px",
          border: "none",
          background: "linear-gradient(90deg,#0ea5e9,#0284c7)",
          color: "white",
          fontWeight: "600",
          cursor: "pointer",
          width: "100%",
          fontSize: "15px",
          letterSpacing: "0.3px"
        }}
      >
        Continue to Shipping
      </button>

    </div>

  );

}