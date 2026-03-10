import React from "react";
import { Link } from "react-router-dom";

const FALLBACK_IMAGE = "/no-image.png";

function Shop({ products = [], addToCart }) {
  return (
    <div style={{ padding: "40px" }}>
      <h1 style={{ marginBottom: "30px" }}>
        Shop Research Compounds
      </h1>

      <div className="product-grid fade-in">

        {products.length === 0 ? (

          <p>Loading products...</p>

        ) : (

          products.map((product) => {

            const imageUrl =
              product.image && product.image.startsWith("http")
                ? product.image
                : FALLBACK_IMAGE;

            return (

              <div key={product._id} className="card">

                <Link
                  to={`/product/${product._id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >

                  <div className="product-image-wrapper">

                    <img
                      src={imageUrl}
                      alt={product.name}
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = FALLBACK_IMAGE;
                      }}
                    />

                    <span className="purity-stamp">
                      99%+ Purity
                    </span>

                  </div>

                  <div className="card-body">

                    <span className="product-tag">
                      {product.category?.toUpperCase()}
                    </span>

                    <h3 className="product-title">
                      {product.name}
                    </h3>

                    <p className="product-summary">
                      {product.description}
                    </p>

                    <p className="product-price">
                      ${product.price?.toFixed(2)}
                    </p>

                  </div>

                </Link>

                <div className="card-overlay">

                  <button
                    disabled={product.stock === 0}
                    onClick={() => addToCart(product)}
                  >
                    {product.stock > 0 ? "ADD TO CART" : "SOLD OUT"}
                  </button>

                </div>

              </div>

            );
          })

        )}

      </div>
    </div>
  );
}

export default Shop;