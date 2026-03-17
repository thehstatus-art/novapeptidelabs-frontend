import React from "react";

export default function ShippingStep({next,back}){

  return(

    <div>

      <h2>Shipping Address</h2>

      <input placeholder="Full Name"/>
      <input placeholder="Street"/>
      <input placeholder="City"/>
      <input placeholder="State"/>
      <input placeholder="ZIP"/>

      <div className="checkout-nav">

        <button onClick={back}>Back</button>

        <button onClick={next}>Continue</button>

      </div>

    </div>

  )

}