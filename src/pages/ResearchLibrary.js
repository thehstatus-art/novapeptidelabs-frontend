import React from "react";
import { Link } from "react-router-dom";

export default function ResearchLibrary({ products }) {

  const safeProducts = Array.isArray(products) ? products : [];

  return (
    <div className="research-page">

      {/* HERO */}

      <div className="research-hero">

        <h1>Peptide Research Library</h1>

        <p>
          Scientific reference database covering laboratory research
          compounds, mechanisms of action, and analytical specifications.
        </p>

      </div>

      {/* PRODUCTS */}

      <div className="research-grid">

        {safeProducts.length === 0 && (
          <p className="research-empty">
            No research compounds available.
          </p>
        )}

        {safeProducts.map((product) => (
          <div className="research-card" key={product._id}>

            {/* HEADER */}

            <div className="compound-header">
              <h2>{product.name}</h2>
              <span className="compound-badge">
                Research Compound
              </span>
            </div>

            {/* SUMMARY */}

            <p className="compound-summary">
              {product.description ||
                "Peptide compound currently studied in metabolic signaling, endocrine pathways, and regenerative research models."}
            </p>

            {/* SCIENTIFIC DATA */}

            <div className="compound-data">

              <h4>Scientific Data</h4>

              <div className="compound-grid">

                <div>
                  <span>Molecular Weight</span>
                  <p>{product.molecularWeight || "N/A"}</p>
                </div>

                <div>
                  <span>Formula</span>
                  <p>{product.formula || "N/A"}</p>
                </div>

                <div>
                  <span>Storage</span>
                  <p>{product.storage || "-20°C recommended"}</p>
                </div>

                <div>
                  <span>Purity</span>
                  <p>≥99% (HPLC)</p>
                </div>

              </div>

            </div>

            {/* RESEARCH APPLICATIONS */}

            <div className="compound-applications">

              <h4>Primary Research Areas</h4>

              <ul>
                <li>Metabolic regulation studies</li>
                <li>Endocrine receptor signaling</li>
                <li>Cellular regeneration models</li>
                <li>Growth factor expression research</li>
              </ul>

            </div>

            {/* QUICK DECISION PANEL */}

            <div className="compound-decision">

              <div className="decision-box">
                <span>Stability</span>
                <p>High</p>
              </div>

              <div className="decision-box">
                <span>Research Interest</span>
                <p>Very High</p>
              </div>

              <div className="decision-box">
                <span>Typical Storage</span>
                <p>-20°C</p>
              </div>

            </div>

            {/* CTA */}

            <Link
              to={`/product/${product._id}`}
              className="research-cta"
            >
              View Full Research Profile →
            </Link>

          </div>
        ))}

      </div>

    </div>
  );
}