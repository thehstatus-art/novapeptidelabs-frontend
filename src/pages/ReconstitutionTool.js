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

<div className="preset-buttons">

{[1,2,3,5].map((v)=>(
<button
key={v}
onClick={()=>setVolume(v)}
>
{v} mL
</button>
))}

</div>

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
<div className="syringe-chart">

<h3>Insulin Syringe Reference</h3>

<div className="syringe-grid">

<div>5 units = 0.05 mL</div>
<div>10 units = 0.10 mL</div>
<div>20 units = 0.20 mL</div>
<div>25 units = 0.25 mL</div>
<div>50 units = 0.50 mL</div>
<div>100 units = 1 mL</div>

</div>

</div>
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

<div className="lab-display">

<div className="lab-row">

<div className="lab-box">
<span>Injection Volume</span>
<p>{doseVolume.toFixed(2)} mL</p>
</div>

<div className="lab-box">
<span>Syringe Units</span>
<p>{syringeUnits.toFixed(0)}</p>
</div>

<div className="lab-box">
<span>Doses Per Vial</span>
<p>{totalDoses.toFixed(0)}</p>
</div>

</div>

</div>

)}
{concentration && (

<div className="dose-chart">

<h3>Common Research Dose Reference</h3>

<table>

<thead>
<tr>
<th>Dose (mg)</th>
<th>Injection (mL)</th>
<th>Syringe Units</th>
</tr>
</thead>

<tbody>

{[0.25,0.5,1,2].map((d)=>{

const vol = d / concentration
const units = vol * 100

return(

<tr key={d}>
<td>{d}</td>
<td>{vol.toFixed(2)}</td>
<td>{units.toFixed(0)}</td>
</tr>

)

})}

</tbody>

</table>

</div>

)}
            </div>

       

        

        <div className="research-disclaimer">

<div className="disclaimer-icon">⚠️</div>

<div className="disclaimer-text">

<strong>Research Use Only</strong>

<p>
This calculator is provided strictly for laboratory reference purposes.
Compounds supplied by Nova Peptide Labs are intended solely for
scientific research and laboratory investigation. These materials
are not approved for human consumption or medical use.
</p>

</div>

</div>

      </div>

    </div>

  );

}