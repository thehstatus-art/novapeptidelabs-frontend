import React from "react";

export default function VerifiedBatches(){

  const batches = [
    {name:"Retatrutide", batch:"NP2408", purity:"99.21%"},
    {name:"Tesamorelin", batch:"NP2411", purity:"99.34%"},
    {name:"BPC-157", batch:"NP2413", purity:"99.11%"},
    {name:"MOTS-c", batch:"NP2416", purity:"99.28%"},
  ];

  return(

    <div className="batch-section">

      <h2>Verified Laboratory Batches</h2>

      <p className="batch-sub">
        Independent analytical testing confirms the purity of every batch.
      </p>

      <div className="batch-grid">

        {batches.map((b,i)=>(
          <div key={i} className="batch-card">

            <h4>{b.name}</h4>

            <div className="batch-line">
              <span>Batch</span>
              <p>{b.batch}</p>
            </div>

            <div className="batch-line">
              <span>Purity</span>
              <p>{b.purity}</p>
            </div>

            <button className="coa-btn">
              View COA
            </button>

          </div>
        ))}

      </div>

    </div>

  )
}