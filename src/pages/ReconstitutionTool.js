import React, { useState } from "react";

export default function ReconstitutionTool() {

  const [peptide, setPeptide] = useState("");
  const [volume, setVolume] = useState("");

  const concentration =
    peptide && volume ? (peptide / volume).toFixed(2) : null;

  return (
    <div className="tool-page">

      <h1>Laboratory Reconstitution Reference Tool</h1>

      <p className="tool-desc">
        This reference calculator assists laboratory researchers in
        determining solution concentrations for peptide preparation.
      </p>

      <div className="tool-card">

        <label>Peptide Amount (mg)</label>
        <input
          type="number"
          value={peptide}
          onChange={(e) => setPeptide(e.target.value)}
          placeholder="Example: 10"
        />

        <label>Diluent Volume (mL)</label>
        <input
          type="number"
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          placeholder="Example: 2"
        />

        {concentration && (
          <div className="tool-result">
            Resulting Concentration:
            <strong> {concentration} mg/mL</strong>
          </div>
        )}

      </div>

      <div className="tool-disclaimer">
        This calculator is provided for laboratory reference purposes only.
        All products sold by Nova Peptide Labs are intended strictly for
        research use and are not approved for human consumption.
      </div>

    </div>
  );
}