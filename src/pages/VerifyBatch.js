import React, { useState } from "react";

const API = process.env.REACT_APP_API_URL;

export default function VerifyBatch() {

  const [batch, setBatch] = useState("");
  const [result, setResult] = useState(null);

  const verify = async () => {

    const res = await fetch(`${API}/api/verify/${batch}`);
    const data = await res.json();

    setResult(data);

  };

  return (
    <div className="verify-page">

      <h1>Certificate Verification</h1>

      <p>Enter batch number to verify authenticity.</p>

      <input
        placeholder="Example: NP-RETA-2404-A"
        value={batch}
        onChange={(e)=>setBatch(e.target.value)}
      />

      <button onClick={verify}>
        Verify Batch
      </button>

      {result && result.verified && (

        <div className="verify-result">

          <h3>Verified Batch</h3>

          <p><strong>Product:</strong> {result.product}</p>

          <p><strong>Purity:</strong> {result.purity}</p>

          <p>
            <strong>Manufactured:</strong>{" "}
            {new Date(result.manufacturedDate).toLocaleDateString()}
          </p>

          <a
            href={result.coaUrl}
            target="_blank"
            rel="noreferrer"
          >
            Download COA
          </a>

        </div>

      )}

    </div>
  );
}