import React from "react";

export default function ReviewStep({cart=[]}){

  return(

    <div>

      <h2>Review Order</h2>

      {cart.map(item=>(

        <div key={item._id}>

          {item.name} — {item.quantity}

        </div>

      ))}

      <button className="checkout-complete">
        Place Order
      </button>

    </div>

  )

}