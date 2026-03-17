import React from "react";

export default function CheckoutSteps({ step }) {

  const steps = ["Cart","Shipping","Delivery","Payment","Review"]

  return(

    <div className="checkout-steps">

      {steps.map((label,i)=>(

        <div key={label} className={`step ${step === i+1 ? "active":""}`}>

          <span>{i+1}</span>

          {label}

        </div>

      ))}

    </div>

  )

}