import React, { useState } from "react";

export default function ReconstitutionTool() {

  const [peptide, setPeptide] = useState("");
  const [volume, setVolume] = useState("");


  const peptideNum = parseFloat(peptide);
  const volumeNum = parseFloat(volume);
  

  let concentration = null;
  

  if (!isNaN(peptideNum) && !isNaN(volumeNum) && volumeNum > 0) {
    concentration = peptideNum / volumeNum;
  }

  

  const presets = [5, 10, 15, 20];

  return (
  <div className="tool-page">

    <div className="tool-wrapper">

      <h1 className="tool-title">
        Laboratory Reconstitution Reference Tool
      </h1>

      <p className="tool-sub">
        This reference calculator assists laboratory researchers in determining
        peptide solution concentrations for laboratory preparation.
      </p>

      <div className="tool-card">

        <div className="tool-grid">

          {/* Peptide */}

          <div className="tool-field">

            <label>Peptide Amount (mg)</label>

            <input
              type="number"
              placeholder="Example: 10"
              value={peptide}
              onChange={(e)=>setPeptide(e.target.value)}
            />

            <div className="preset-buttons">
              {presets.map((p)=>(
                <button
                  key={p}
                  onClick={()=>setPeptide(p)}
                >
                  {p} mg
                </button>
              ))}
            </div>

          </div>

          {/* Diluent */}

          <div className="tool-field">

            <label>Diluent Volume (mL)</label>

            <input
              type="number"
              placeholder="Example: 2"
              value={volume}
              onChange={(e)=>setVolume(e.target.value)}
            />

          </div>

        </div>

        {/* Result */}

        {concentration && (

          <div className="tool-result-panel">

            <div className="tool-result-label">
              Resulting Concentration
            </div>

            <div className="tool-result-value">
              {concentration.toFixed(2)} mg/mL
            </div>

            <div className="tool-result-sub">
              {(concentration*1000).toFixed(0)} mcg/mL
            </div>

          </div>

        )}

      </div>

      <div className="tool-disclaimer">
        This calculator is provided for laboratory reference purposes only.
        All materials sold by Nova Peptide Labs are intended strictly for
        research use and are not approved for human consumption.
      </div>

    </div>

  </div>
);
}