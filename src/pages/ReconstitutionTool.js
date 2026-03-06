import React, { useState } from "react";

export default function ReconstitutionTool() {

  const [peptide, setPeptide] = useState("");
  const [volume, setVolume] = useState("");

  const peptideNum = parseFloat(peptide);
  const volumeNum = parseFloat(volume);

  let concentration = null;

  if (!isNaN(peptideNum) && !isNaN(volumeNum) && volumeNum > 0) {
    concentration = (peptideNum / volumeNum).toFixed(2);
  }

  const presets = [5, 10, 15, 20];

  return (
    <div className="tool-container">

      <h1 className="tool-title">
        Laboratory Reconstitution Reference Tool
      </h1>

      <p className="tool-sub">
        This reference calculator assists laboratory researchers in
        determining peptide solution concentrations.
      </p>

      <div className="tool-card">

        {/* Peptide amount */}

        <div className="tool-input-group">
          <label>Peptide Amount (mg)</label>

          <input
            type="number"
            placeholder="Example: 10"
            value={peptide}
            onChange={(e) => setPeptide(e.target.value)}
          />

          <div className="preset-buttons">
            {presets.map((p) => (
              <button
                key={p}
                onClick={() => setPeptide(p)}
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
            onChange={(e) => setVolume(e.target.value)}
          />
        </div>

        {/* Result */}

        {concentration && (
          <div className="tool-result-box">
{peptideNum && (
  <div className="tool-table">

    <h3>Dilution Reference Table</h3>

    <table>
      <thead>
        <tr>
          <th>Volume (mL)</th>
          <th>Concentration</th>
        </tr>
      </thead>

      <tbody>
        {[1,2,3,4,5].map((v) => (
          <tr key={v}>
            <td>{v} mL</td>
            <td>{(peptideNum / v).toFixed(2)} mg/mL</td>
          </tr>
        ))}
      </tbody>

    </table>

  </div>
)}
            <div className="tool-result-label">
              Resulting Concentration
            </div>

            <div className="tool-result">
              {concentration} mg/mL
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
  );
}