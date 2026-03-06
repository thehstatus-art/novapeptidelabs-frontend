import React from "react";
import { Link } from "react-router-dom";

export default function ResearchLibrary({ products = [] }) {

  return (
    <div className="research-page">

      <div className="research-hero">

        <h1>Peptide Research Library</h1>

        <p>
          Scientific reference database covering laboratory research
          compounds, mechanisms of action, and analytical specifications.
        </p>

      </div>

      <div className="research-grid">

        {products.map((product) => (

          <div className="research-card" key={product._id}>

            <div className="compound-header">
              <h2>{product.name}</h2>
              <span className="compound-badge">Research Compound</span>
            </div>

            {/* Compound Overview */}

            <p className="compound-summary">
              {product.description ||
              "Peptide compound currently studied in metabolic signaling, endocrine pathways, and regenerative research models."}
            </p>

            {/* Scientific Data */}

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

            {/* Research Applications */}

            <div className="compound-applications">

              <h4>Primary Research Areas</h4>

              <ul>
                <li>Metabolic regulation studies</li>
                <li>Endocrine receptor signaling</li>
                <li>Cellular regeneration models</li>
                <li>Growth factor expression research</li>
              </ul>

            </div>

            {/* Quick Decision Panel */}

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