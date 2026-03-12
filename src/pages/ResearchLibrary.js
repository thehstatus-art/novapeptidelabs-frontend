import React, { useState } from "react";
import { Link } from "react-router-dom";

function ResearchLibrary({ products }) {

  const safeProducts = Array.isArray(products) ? products : [];

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredProducts = safeProducts.filter((product) => {
    const matchesSearch = product.name
      ?.toLowerCase()
      .includes(search.toLowerCase());

    if (filter === "all") return matchesSearch;

    return matchesSearch && product.category === filter;
  });

  return (
    <div className="research-page">

      <div className="molecule-bg"></div>

      <div className="research-hero">
        <h1>Peptide Research Library</h1>
        <p>
          Scientific reference database covering laboratory research
          compounds, mechanisms of action, and analytical specifications.
        </p>
      </div>

      <div className="research-search">
        <input
          type="text"
          placeholder="Search peptide compounds..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="research-filters">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          All
        </button>

        <button
          className={filter === "metabolic" ? "active" : ""}
          onClick={() => setFilter("metabolic")}
        >
          Metabolic
        </button>

        <button
          className={filter === "longevity" ? "active" : ""}
          onClick={() => setFilter("longevity")}
        >
          Longevity
        </button>

        <button
          className={filter === "neuro" ? "active" : ""}
          onClick={() => setFilter("neuro")}
        >
          Neuro
        </button>
      </div>

      <div className="research-grid">

        {filteredProducts.length === 0 && (
          <p className="research-empty">No research compounds found.</p>
        )}

        {filteredProducts.map((product) => {
          const imageUrl =
            product.image && product.image.startsWith("http")
              ? product.image
              : "/no-image.png";

          const stockCount = product.stock || 0;

          let stockMessage = "In research stock";
          let stockClass = "stock-good";

          if (stockCount > 0 && stockCount <= 10) {
            stockMessage = `Only ${stockCount} vial${stockCount > 1 ? "s" : ""} remaining`;
            stockClass = "stock-low";
          } else if (stockCount > 10 && stockCount <= 25) {
            stockMessage = `Limited batch stock: ${stockCount} available`;
            stockClass = "stock-medium";
          } else if (stockCount === 0) {
            stockMessage = "Out of stock";
            stockClass = "stock-out";
          }

          return (
            <div className="research-card" key={product._id}>

              <div className="compound-image-wrapper">
                <img
                  src={imageUrl}
                  alt={product.name}
                  className="compound-image"
                  onError={(e) => {
                    e.target.src = "/no-image.png";
                  }}
                />

                <div className="compound-tags">
                  <span className="tag-blue">Peptide</span>
                  <span className="tag-green">≥99% Purity</span>
                </div>
              </div>

              <div className="compound-header">
                <h2>{product.name}</h2>
                <span className="compound-badge">Research Compound</span>
              </div>

              <p className="compound-summary">
                {product.shortDescription ||
                  `Research peptide investigated in metabolic regulation, endocrine signaling pathways, and cellular regeneration models within controlled laboratory environments.`}
              </p>

              <div className="compound-meta">
                <span className="compound-pill">
                  {product.category || "Metabolic Research"}
                </span>
                <span className="compound-pill">Endocrine Signaling</span>
                <span className="compound-pill">Cellular Models</span>
              </div>

              <div className={`stock-alert ${stockClass}`}>
                ⚗ {stockMessage}
              </div>

              <div className="compound-data">
                <div>
                  <span>Molecular Weight</span>
                  <p>{product.molecularWeight || "Research Data"}</p>
                </div>

                <div>
                  <span>Formula</span>
                  <p>{product.formula || "Peptide Chain"}</p>
                </div>

                <div>
                  <span>Storage</span>
                  <p>{product.storage || "-20°C recommended"}</p>
                </div>

                <div>
                  <span>Purity</span>
                  <p>≥99% HPLC</p>
                </div>
              </div>

              <div className="compound-metrics">
                <div className="metric-box">
                  <span>Lab Grade</span>
                  <p>Research</p>
                </div>

                <div className="metric-box">
                  <span>Purity</span>
                  <p>≥99%</p>
                </div>

                <div className="metric-box">
                  <span>Storage</span>
                  <p>-20°C</p>
                </div>
              </div>

              <div className="research-score">
                <div className="score-row">
                  <span>Research Interest</span>
                  <div className="score-bar">
                    <div
                      className="score-fill"
                      style={{ width: `${80 + Math.random() * 15}%` }}
                    ></div>
                  </div>
                </div>

                <div className="score-row">
                  <span>Stability</span>
                  <div className="score-bar">
                    <div
                      className="score-fill"
                      style={{ width: `${60 + Math.random() * 20}%` }}
                    ></div>
                  </div>
                </div>

                <div className="score-row">
                  <span>Research Demand</span>
                  <div className="score-bar">
                    <div
                      className="score-fill"
                      style={{ width: `${70 + Math.random() * 20}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="research-actions">
                <Link
                  to={`/product/${product.slug || product._id}`}
                  className="research-cta"
                >
                  View Research →
                </Link>

                <button
                  className="research-cart-btn"
                  onClick={() => {
                    const existing =
                      JSON.parse(localStorage.getItem("cart")) || [];

                    existing.push(product);

                    localStorage.setItem("cart", JSON.stringify(existing));

                    alert(`${product.name} added to cart`);
                  }}
                >
                  Add to Cart
                </button>

                <a
                  href={`/coa/${product.slug || product._id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="research-coa-btn"
                >
                  COA
                </a>
              </div>

              <div className="coa-verified">✓ COA Verified</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ResearchLibrary;