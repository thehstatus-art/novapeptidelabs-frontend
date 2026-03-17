import React from "react";

export default function DeliveryStep({next,back}){

  return(

    <div>

      <h2>Delivery Method</h2>

      <div className="delivery-card">

        Standard Shipping — $4.99

      </div>

      <div className="delivery-card">

        Express Shipping — $9.99

      </div>

      <div className="checkout-nav">

        <button onClick={back}>Back</button>

        <button onClick={next}>Continue</button>

      </div>

    </div>

  )

}