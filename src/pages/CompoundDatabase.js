import React from "react";
import { Link } from "react-router-dom";

export default function CompoundDatabase({ products = [] }) {

  const [search, setSearch] = React.useState("");

  const filtered = products.filter((p) =>
    p.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="compound-page">

      <div className="compound-hero">
        <h1>Research Compound Database</h1>
        <p className="compound-intro">
          Explore detailed molecular information, storage data, and
          scientific specifications for research peptides available
          through Nova Peptide Labs.
        </p>

        <div className="compound-search">
          <input
            type="text"
            placeholder="Search research compounds..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="compound-grid">

        {filtered.length === 0 && (
          <div className="compound-empty">
            No compounds found.
          </div>
        )}

        {filtered.map((product) => (

          <Link
            key={product._id}
            to={`/product/${product._id}`}
            className="compound-card"
          >

            <div className="compound-image-wrap">
              <img
                src={
                  product.image && product.image.startsWith("http")
                    ? product.image
                    : "/no-image.png"
                }
                alt={product.name}
                className="compound-image"
              />

              <div className="compound-badges">
                <span className="badge-blue">Peptide</span>
                <span className="badge-green">≥99% Purity</span>
              </div>
            </div>

            <h3 className="compound-name">{product.name}</h3>

            <p className="compound-description">
              {product.shortDescription ||
                "Laboratory research compound studied for metabolic signaling, receptor interaction, and regenerative models."}
            </p>

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
                <p>{product.storage || "-20°C"}</p>
              </div>

            </div>

            <div className="compound-view">
              View Full Research Profile →
            </div>

          </Link>

        ))}

      </div>

    </div>
  );
}