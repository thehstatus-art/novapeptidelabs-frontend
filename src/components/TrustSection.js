export default function TrustSection() {
  return (
    <div className="trust-panel">

      <div className="trust-item">
        <div className="trust-icon">🧪</div>
        <div className="trust-content">
          <h4>Research Grade Compounds</h4>
          <p>All peptides manufactured to ≥99% purity and verified through HPLC testing.</p>
        </div>
      </div>

      <div className="trust-item">
        <div className="trust-icon">📄</div>
        <div className="trust-content">
          <h4>Certificate of Analysis</h4>
          <p>Every batch includes analytical verification and documentation.</p>
        </div>
      </div>

      <div className="trust-item">
        <div className="trust-icon">📦</div>
        <div className="trust-content">
          <h4>Discreet Shipping</h4>
          <p>Secure packaging and tracked delivery for all research orders.</p>
        </div>
      </div>

      <div className="trust-item">
        <div className="trust-icon">🔒</div>
        <div className="trust-content">
          <h4>Secure Checkout</h4>
          <p>Payments processed securely through Stripe and PayPal encryption.</p>
        </div>
      </div>

    </div>
  );
}