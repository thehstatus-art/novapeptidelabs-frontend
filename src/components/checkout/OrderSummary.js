import React from "react";

export default function OrderSummary({cart=[],cartTotal=0}){

  return(

    <div className="order-summary-card">

      <h3>Order Summary</h3>

      {cart.map(item=>(

        <div key={item._id} className="summary-item">

          <span>{item.name}</span>

          <span>{item.quantity} × ${item.price}</span>

        </div>

      ))}

      <div className="summary-total">

        Total: <strong>${cartTotal.toFixed(2)}</strong>

      </div>

    </div>

  )

}