import React, { useState } from "react";

export default function ReconstitutionTool() {

  const [peptide, setPeptide] = useState("");
  const [volume, setVolume] = useState("");
  const [dose, setDose] = useState("");

  const peptideNum = parseFloat(peptide);
  const volumeNum = parseFloat(volume);
  const doseNum = parseFloat(dose);

  let concentration = null;
  let doseVolume = null;
  let syringeUnits = null;
  let totalDoses = null;

  if (!isNaN(peptideNum) && !isNaN(volumeNum) && volumeNum > 0) {
    concentration = peptideNum / volumeNum;
  }

  if (concentration && !isNaN(doseNum) && doseNum > 0) {

    doseVolume = doseNum / concentration;

    syringeUnits = doseVolume * 100;

    totalDoses = peptideNum / doseNum;

  }
const compoundPresets = [
  { name: "Retatrutide", vial: 10, bac: 2 },
  { name: "Tesamorelin", vial: 10, bac: 2 },
  { name: "BPC-157", vial: 10, bac: 2 },
  { name: "MOTS-c", vial: 10, bac: 2 },
  { name: "DSIP", vial: 5, bac: 2 }
];
  const presets = [5, 10, 15, 20];

  return (

    <div className="tool-page">

      <div className="tool-wrapper">

        <h1 className="tool-title">
          Peptide Reconstitution & Dose Calculator
        </h1>

        <p className="tool-sub">
          This laboratory calculator determines peptide concentration after
          reconstitution and estimates injection volume based on research dosage.
        </p>
<div className="compound-presets">

  <h3>Quick Compound Presets</h3>

  <div className="preset-compounds">

    {compoundPresets.map((c)=>(
      <button
        key={c.name}
        onClick={()=>{
          setPeptide(c.vial);
          setVolume(c.bac);
        }}
      >
        {c.name}
      </button>
    ))}

  </div>

</div>
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

              <label>Bacteriostatic Water (mL)</label>

              <input
                type="number"
                placeholder="Example: 2"
                value={volume}
                onChange={(e)=>setVolume(e.target.value)}
              />

            </div>

            {/* Dose */}

            <div className="tool-field">

              <label>Target Dose (mg)</label>

              <input
                type="number"
                placeholder="Example: 0.5"
                value={dose}
                onChange={(e)=>setDose(e.target.value)}
              />

            </div>

          </div>

          {/* Concentration Result */}

          {concentration && (

            <div className="tool-result-panel">

              <div className="tool-result-label">
                Solution Concentration
              </div>

              <div className="tool-result-value">
                {concentration.toFixed(2)} mg/mL
              </div>

              <div className="tool-result-sub">
                {(concentration*1000).toFixed(0)} mcg/mL
              </div>

            </div>

          )}

          {/* Dose Results */}

          {doseVolume && (

            <div className="tool-result-panel">

              <div className="tool-result-label">
                Dose Calculation
              </div>

              <div className="tool-result-row">
                Injection Volume: <strong>{doseVolume.toFixed(2)} mL</strong>
              </div>

              <div className="tool-result-row">
                Insulin Syringe: <strong>{syringeUnits.toFixed(0)} units</strong>
              </div>

              <div className="tool-result-row">
                Doses Per Vial: <strong>{totalDoses.toFixed(0)}</strong>
              </div>

            </div>

          )}

        </div>

        <div className="tool-disclaimer">
          This calculator is provided strictly as a laboratory reference.
          Compounds sold by Nova Peptide Labs are intended for research use only
          and are not approved for human consumption.
        </div>

      </div>

    </div>

  );

}