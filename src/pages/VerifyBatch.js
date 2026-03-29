import React, { useState } from "react";
import { API } from "../config/api";

export default function VerifyBatch() {

  const [batch, setBatch] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const verify = async () => {

    if (!batch) {
      setError("Please enter a batch number.");
      return;
    }

    try {

      setLoading(true);
      setError(null);
      setResult(null);

      const res = await fetch(`${API}/api/verify/${batch}`);

      if (!res.ok) {
        throw new Error("Batch not found");
      }

      const data = await res.json();

      setResult(data);

    } catch (err) {

      setError("Batch not found or verification service unavailable.");

    } finally {

      setLoading(false);

    }

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

      {loading && (
        <p className="verify-loading">Checking laboratory records...</p>
      )}

      {error && (
        <p className="verify-error">{error}</p>
      )}

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

      {result && !result.verified && (

        <div className="verify-result error">

          <h3>Batch Not Verified</h3>

          <p>
            This batch could not be verified in the NovaPeptide Labs
            certificate database.
          </p>

        </div>

      )}

    </div>
  );
}
