import React, { useState } from "react";
import { Link } from "react-router-dom";

const FALLBACK_IMAGE = "/no-image.png";

function Shop({ products = [], addToCart }) {

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [restockModal, setRestockModal] = useState(false);
  const [restockProduct, setRestockProduct] = useState(null);
  const [restockEmail, setRestockEmail] = useState("");
  const [restockSubmitted, setRestockSubmitted] = useState(false);

  const categories = [
    "all",
    "metabolic",
    "regenerative",
    "growth-hormone",
    "antioxidant",
    "sleep",
    "experimental"
  ];

  const filteredProducts = products.filter((product) => {

    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "all" || product.category === category;

    return matchesSearch && matchesCategory;

  });

  return (
    <div style={{ padding: "40px" }}>

      <h1>Shop Research Compounds</h1>

      {/* SEARCH BAR */}

      <div className="shop-search">

        <input
          type="text"
          placeholder="Search compounds..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      {/* CATEGORY FILTER */}

      <div className="shop-filters">

        {categories.map((cat) => (

          <button
            key={cat}
            className={`filter-btn ${category === cat ? "active" : ""}`}
            onClick={() => setCategory(cat)}
          >
            {cat.toUpperCase()}
          </button>

        ))}

      </div>

      {/* PRODUCT GRID */}

      <div className="product-grid fade-in">

        {filteredProducts.length === 0 ? (

          <p>No compounds found.</p>

        ) : (

          filteredProducts.map((product) => {

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

                    {product.stock === 0 && (
                      <div className="sold-out-badge">SOLD OUT</div>
                    )}

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

                    {product.stock > 0 && product.stock <= 5 && (
                      <span className="low-stock">
                        Only {product.stock} left
                      </span>
                    )}

                  </div>

                </Link>

                <div className="card-overlay">

                  <button
                    className={product.stock === 0 ? "sold-out-btn" : "add-cart-btn"}
                    onClick={() => {
                      if (product.stock > 0) {
                        addToCart(product);
                      } else {
                        setRestockProduct(product);
                        setRestockModal(true);
                      }
                    }}
                  >
                    {product.stock > 0 ? "ADD TO CART" : "SOLD OUT"}
                  </button>

                </div>

              </div>

            );

          })

        )}

      </div>

      {restockModal && (
        <div
          className="restock-modal-overlay"
          onClick={() => {
            setRestockModal(false);
            setRestockEmail("");
            setRestockSubmitted(false);
          }}
        >
          <div
            className="restock-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Compound Currently Unavailable</h3>
            <p>
              {restockProduct?.name} is currently unavailable.
            </p>
            <p>
              <strong>Next Lab Batch Arrival: ~7 Days</strong>
            </p>

            <p className="modal-sub">
              Enter your email to get notified when this compound is restocked.
            </p>

            {!restockSubmitted ? (
              <div className="restock-email-capture">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={restockEmail}
                  onChange={(e) => setRestockEmail(e.target.value)}
                  className="restock-email-input"
                />

                <button
                  className="restock-modal-btn"
                  onClick={() => {
                    if (!restockEmail) return;
                    console.log("Restock request for", restockProduct?.name, restockEmail);
                    setRestockSubmitted(true);
                  }}
                >
                  Notify Me
                </button>
              </div>
            ) : (
              <p className="restock-success">
                You're on the list! We'll notify you when the next batch arrives.
              </p>
            )}

            <div className="modal-actions">
              <button
                className="restock-modal-btn"
                onClick={() => {
                  setRestockModal(false);
                  setRestockEmail("");
                  setRestockSubmitted(false);
                }}
              >
                Continue Browsing
              </button>

              <button
                className="restock-modal-btn"
                onClick={() => {
                  setRestockModal(false);
                  setRestockEmail("");
                  setRestockSubmitted(false);
                }}
              >
                Join Newsletter
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Shop;