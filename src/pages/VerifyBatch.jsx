import { useState } from 'react'
import axios from 'axios'

function VerifyBatch() {
  const [batch, setBatch] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const handleVerify = async () => {
    try {
      const res = await axios.get(`/api/batch/${batch}`)
      setResult(res.data)
      setError('')
    } catch (err) {
      setError('Batch not found')
      setResult(null)
    }
  }

  return (
    <div>
      <h1>Batch Verification</h1>
      <input
        type="text"
        placeholder="Enter Batch Number"
        value={batch}
        onChange={(e) => setBatch(e.target.value)}
      />
      <button onClick={handleVerify}>Verify</button>

      {error && <p>{error}</p>}

      {result && (
        <div>
          <p><strong>Product:</strong> {result.productName}</p>
          <p><strong>Purity:</strong> {result.purity}</p>
          <p><strong>Test Date:</strong> {new Date(result.testDate).toLocaleDateString()}</p>
          <a href={result.coaUrl} target="_blank">Download COA</a>
        </div>
      )}
    </div>
  )
}

export default VerifyBatch
