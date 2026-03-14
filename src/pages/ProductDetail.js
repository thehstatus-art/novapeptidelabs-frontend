import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

export default function ProductDetail({ products = [], addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const fromList = useMemo(
    () => products.find((p) => p._id === id),
    [products, id]
  );

  const [product, setProduct] = useState(fromList || null);
  const [loading, setLoading] = useState(!fromList);
  const [error, setError] = useState("");
  const [waitEmail, setWaitEmail] = useState("");
  const [waitMsg, setWaitMsg] = useState("");

  useEffect(() => {
    if (fromList) return;

    const run = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(`${API}/api/products`);
        const data = await res.json();

        const found = Array.isArray(data) ? data.find((p) => p._id === id) : null;

        if (!found) {
          setError("Product not found.");
        }

        setProduct(found || null);

      } catch (e) {
        setError("Failed to load product.");
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [id, fromList]);

  if (loading) {
    return (
      <div className="legal-page">
        <h2>Loading product…</h2>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="legal-page">
        <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
        <h2>{error || "Product not found."}</h2>
      </div>
    );
  }

  const specs = [
    { label: "Category", value: product.category || "Research Compound" },
    { label: "Purity", value: product.purity || "≥99%" },
    { label: "Stock", value: product.stock ?? "—" },
    { label: "Molecular Weight", value: product.molecularWeight || "See COA" },
    { label: "Formula", value: product.formula || "See COA" },
    { label: "Storage", value: product.storage || "-20°C recommended" },
    { label: "Appearance", value: "Lyophilized Powder" },
    { label: "Use", value: "Laboratory Research Only" }
  ];

  return (
    <div className="product-detail-page">
      <div className="product-detail-wrap">

        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <div className="product-detail-grid">

          <div className="product-detail-image">
            <img src={`${API}${product.image}`} alt={product.name} />
          </div>

          <div className="product-detail-info">

            <h1 className="product-detail-title">
              {product.name}
            </h1>

            <div className="product-detail-price">
              ${Number(product.price).toFixed(2)}
            </div>

            <p className="product-detail-desc">
              {product.description ||
                "High purity research compound intended strictly for laboratory research applications."}
            </p>

            {product.stock > 0 ? (
              <button
                className="checkout-btn"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            ) : (
              <div style={{ marginTop: "20px" }}>
                <div style={{
                  color: "#ff6b6b",
                  marginBottom: "10px",
                  fontWeight: "600"
                }}>
                  Out of Stock — Restocking Soon
                </div>
                <input
                  type="email"
                  placeholder="Enter email for restock alert"
                  value={waitEmail}
                  onChange={(e) => setWaitEmail(e.target.value)}
                  style={{
                    padding: "10px",
                    width: "100%",
                    marginBottom: "10px",
                    borderRadius: "6px",
                    border: "1px solid rgba(255,255,255,0.2)",
                    background: "#081523",
                    color: "white"
                  }}
                />
                <button
                  className="checkout-btn"
                  onClick={async () => {
                    if (!waitEmail.includes("@")) {
                      setWaitMsg("Please enter a valid email.");
                      return;
                    }
                    try {
                      await fetch(`${API}/api/waitlist`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          email: waitEmail,
                          productId: product._id
                        })
                      });
                      setWaitMsg("You're on the waitlist. We'll email you when it restocks.");
                      setWaitEmail("");
                    } catch (err) {
                      setWaitMsg("Failed to join waitlist. Try again later.");
                    }
                  }}
                >
                  Join Waitlist
                </button>
                {waitMsg && (
                  <div style={{ marginTop: "10px", fontSize: "13px", opacity: 0.9 }}>
                    {waitMsg}
                  </div>
                )}
              </div>
            )}

            {/* ===== SCIENTIFIC SPECIFICATIONS ===== */}

            <div className="product-detail-specs">
              <h3>Scientific Specifications</h3>

              <div className="specs-grid">
                {specs.map((s) => (
                  <div className="spec-row" key={s.label}>
                    <div className="spec-label">{s.label}</div>
                    <div className="spec-value">{String(s.value)}</div>
                  </div>
                ))}
              </div>

              <div className="spec-note">
                *All materials are sold strictly for laboratory research use only
                and are not approved for human consumption.
              </div>
            </div>

            {/* ===== RESEARCH REFERENCES ===== */}

            <div className="research-section">
              <h3>Research References</h3>

              <ul className="research-links">
                <li>
                  <a
                    href="https://pubmed.ncbi.nlm.nih.gov/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    PubMed Research Database
                  </a>
                </li>

                <li>
                  <a
                    href="https://www.ncbi.nlm.nih.gov/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    National Center for Biotechnology Information
                  </a>
                </li>

                <li>
                  <a
                    href="https://www.sciencedirect.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    ScienceDirect Publications
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}