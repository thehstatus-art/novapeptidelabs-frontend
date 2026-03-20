import React from "react";
import { Link } from "react-router-dom";

export default function CompoundDatabase({ products = [] }) {
  const [search, setSearch] = React.useState("");

  const filtered = products.filter((p) =>
    p.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="compound-page compound-db-page">
      <div className="compound-db-orb compound-db-orb--left" />
      <div className="compound-db-orb compound-db-orb--right" />

      <div className="compound-hero compound-db-hero">
        <div className="compound-db-hero__eyebrow">Scientific Reference Library</div>

        <h1>Research Compound Database</h1>

        <p className="compound-intro compound-db-intro">
          Explore a curated catalog of peptide profiles with molecular specifications,
          storage guidance, and quick-access research context in one premium reference view.
        </p>

        <div className="compound-db-stats">
          <div className="compound-db-stat">
            <span>Catalog Entries</span>
            <strong>{products.length}</strong>
          </div>
          <div className="compound-db-stat">
            <span>Visible Results</span>
            <strong>{filtered.length}</strong>
          </div>
          <div className="compound-db-stat">
            <span>Data Focus</span>
            <strong>Molecular + Storage</strong>
          </div>
        </div>

        <div className="compound-search compound-db-search">
          <span className="compound-db-search__icon">Search</span>
          <input
            type="text"
            placeholder="Search research compounds..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="compound-grid compound-db-grid">
        {filtered.length === 0 && (
          <div className="compound-empty">
            No compounds found.
          </div>
        )}

        {filtered.map((product) => (
          <Link
            key={product._id}
            to={`/product/${product._id}`}
            className="compound-card compound-db-card"
          >
            <div className="compound-db-card__frame" />

            <div className="compound-image-wrap compound-db-image-wrap">
              <img
                src={
                  product.image && product.image.startsWith("http")
                    ? product.image
                    : "/no-image.png"
                }
                alt={product.name}
                className="compound-image"
              />

              <div className="compound-badges compound-db-badges">
                <span className="badge-blue">Peptide</span>
                <span className="badge-green">≥99% Purity</span>
              </div>
            </div>

            <div className="compound-db-card__topline">
              <span className="compound-db-card__category">
                {(product.category || "Research Grade").toUpperCase()}
              </span>
              <span className="compound-db-card__sku">
                {product.sequence ? "Sequence Logged" : "Profile Ready"}
              </span>
            </div>

            <h3 className="compound-name compound-db-name">{product.name}</h3>

            <p className="compound-description">
              {product.shortDescription ||
                "Laboratory research compound studied for metabolic signaling, receptor interaction, and regenerative models."}
            </p>

            <div className="compound-data compound-db-data">
              <div className="compound-db-data__cell">
                <span>Molecular Weight</span>
                <p>{product.molecularWeight || "Research Data"}</p>
              </div>

              <div className="compound-db-data__cell">
                <span>Formula</span>
                <p>{product.formula || "Peptide Chain"}</p>
              </div>

              <div className="compound-db-data__cell">
                <span>Storage</span>
                <p>{product.storage || "-20°C"}</p>
              </div>
            </div>

            <div className="compound-db-footer">
              <div className="compound-db-footer__note">
                <span>Profile depth</span>
                <strong>{product.description ? "Expanded" : "Standard"}</strong>
              </div>

              <div className="compound-view compound-db-view">
                View Full Research Profile
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
