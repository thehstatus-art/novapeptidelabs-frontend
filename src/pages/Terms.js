import React from "react";

function Terms() {
  return (
    <div className="legal-page">
      <h1>Terms and Conditions</h1>

      <p>
        Effective Date: {new Date().getFullYear()}
      </p>

      <h2>1. Acceptance of Terms</h2>
      <p>
        By accessing and using NovaPeptide Labs ("Company", "we", "our"),
        you agree to be bound by these Terms and Conditions. If you do not
        agree, you may not access or use this website.
      </p>

      <h2>2. Research Use Only</h2>
      <p>
        All products sold by NovaPeptide Labs are intended strictly for
        laboratory research purposes only. Products are not intended for
        human consumption, medical use, veterinary use, or therapeutic
        purposes.
      </p>

      <h2>3. Eligibility</h2>
      <p>
        Purchasers must be at least 18 years of age and represent that
        they are qualified professionals engaged in scientific research.
      </p>

      <h2>4. Order Acceptance</h2>
      <p>
        We reserve the right to refuse or cancel any order at our sole
        discretion, including but not limited to suspected misuse,
        regulatory concerns, or compliance issues.
      </p>

      <h2>5. Limitation of Liability</h2>
      <p>
        NovaPeptide Labs shall not be liable for any indirect, incidental,
        consequential, or punitive damages arising from the use or misuse
        of products purchased through this website.
      </p>

      <h2>6. Governing Law</h2>
      <p>
        These Terms shall be governed by the laws of the jurisdiction in
        which the Company operates.
      </p>
    </div>
  );
}

export default Terms;
