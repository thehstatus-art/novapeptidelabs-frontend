import React from "react";
import { Link } from "react-router-dom";

export default function CompoundDatabase({ products = [] }) {

  return (
    <div className="compound-page">

      <h1>Research Compound Database</h1>

      <p className="compound-intro">
        Explore detailed scientific information for research compounds
        available through Nova Peptide Labs.
      </p>

      <div className="compound-grid">

        {products.map((product) => (
          <Link
            key={product._id}
            to={`/product/${product._id}`}
            className="compound-card"
          >

            <h3>{product.name}</h3>

            <div className="compound-data">

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
                <p>{product.storage || "N/A"}</p>
              </div>

            </div>

          </Link>
        ))}

      </div>

    </div>
  );
}