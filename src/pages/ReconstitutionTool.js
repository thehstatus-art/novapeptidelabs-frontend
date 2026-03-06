import React, { useState } from "react";

export default function ReconstitutionTool() {

  const [peptide, setPeptide] = useState("");
  const [volume, setVolume] = useState("");
  const [dose, setDose] = useState("");

  const peptideNum = parseFloat(peptide);
  const volumeNum = parseFloat(volume);
  const doseNum = parseFloat(dose);

  let concentration = null;
  let unitsNeeded = null;

  if (!isNaN(peptideNum) && !isNaN(volumeNum) && volumeNum > 0) {
    concentration = peptideNum / volumeNum;
  }

  if (concentration && doseNum) {
    const mgPerUnit = concentration / 100;
    unitsNeeded = (doseNum / mgPerUnit).toFixed(1);
  }

  const presets = [5, 10, 15, 20];

  return (
    <div className="tool-page">

      <div className="tool-container">

        <h1 className="tool-title">
          Laboratory Reconstitution Reference Tool
        </h1>

        <p className="tool-sub">
          Laboratory reference calculator for determining peptide
          concentrations and dilution values.
        </p>

        <div className="tool-card">

          {/* Peptide Amount */}

          <div className="tool-input-group">
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
                  className="preset-btn"
                >
                  {p} mg
                </button>
              ))}
            </div>

          </div>

          {/* Diluent */}

          <div className="tool-input-group">

            <label>Diluent Volume (mL)</label>

            <input
              type="number"
              placeholder="Example: 2"
              value={volume}
              onChange={(e)=>setVolume(e.target.value)}
            />

          </div>

          {/* Concentration Result */}

          {concentration && (

            <div className="tool-result-box">

              <div className="tool-result-label">
                Resulting Concentration
              </div>

              <div className="tool-result">
                {concentration.toFixed(2)} mg/mL
              </div>

              <div className="tool-result-small">
                {(concentration*1000).toFixed(0)} mcg/mL
              </div>

            </div>

          )}

          {/* Dose Calculator */}

          {concentration && (

            <div className="tool-dose">

              <h3>Dose Calculator</h3>

              <label>Desired Dose (mg)</label>

              <input
                type="number"
                placeholder="Example: 0.5"
                value={dose}
                onChange={(e)=>setDose(e.target.value)}
              />

              {unitsNeeded && (

                <div className="tool-dose-result">

                  Required Syringe Units

                  <strong>
                    {unitsNeeded} units
                  </strong>

                  <span>
                    (100 unit insulin syringe reference)
                  </span>

                </div>

              )}

            </div>

          )}

          {/* Dilution Table */}

          {!isNaN(peptideNum) && (

            <div className="tool-table">

              <h3>Dilution Reference Table</h3>

              <table>

                <thead>
                  <tr>
                    <th>Volume</th>
                    <th>Concentration</th>
                  </tr>
                </thead>

                <tbody>
                  {[1,2,3,4,5].map((v)=>(
                    <tr key={v}>
                      <td>{v} mL</td>
                      <td>{(peptideNum/v).toFixed(2)} mg/mL</td>
                    </tr>
                  ))}
                </tbody>

              </table>

            </div>

          )}

        </div>

        <div className="tool-disclaimer">

          This calculator is provided for laboratory reference purposes
          only. All materials sold by Nova Peptide Labs are intended
          strictly for research use and are not approved for human
          consumption.

        </div>

      </div>

    </div>
  );

}