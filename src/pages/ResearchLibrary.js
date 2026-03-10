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

        {safeProducts.map((product) => {

          const imageUrl =
            product.image && product.image.startsWith("http")
              ? product.image
              : "/no-image.png";

          return (

            <div className="research-card" key={product._id}>

              {/* IMAGE */}

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

              {/* RESEARCH AREAS */}

              <div className="compound-applications">

                <span className="area">Metabolic Research</span>
                <span className="area">Endocrine Signaling</span>
                <span className="area">Longevity Studies</span>
                <span className="area">Cellular Regeneration</span>

              </div>

              {/* RESEARCH SCORE */}

              <div className="research-score">

                <div className="score-label">
                  Research Interest
                </div>

                <div className="score-bar">
                  <div className="score-fill"></div>
                </div>

              </div>

              {/* DECISION PANEL */}

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

          );

        })}

      </div>

    </div>
  );
}