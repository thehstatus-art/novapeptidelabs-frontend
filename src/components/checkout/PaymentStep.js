import React from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";

export default function PaymentStep({cartTotal=0,next,back}){

  return(

    <div>

      <h2>Payment</h2>

      <PayPalButtons
        createOrder={(data,actions)=>actions.order.create({
          purchase_units:[{amount:{value:cartTotal.toFixed(2)}}]
        })}
        onApprove={async(data,actions)=>{
          await actions.order.capture()
          next()
        }}
      />

      <button onClick={back}>Back</button>

    </div>

  )

}