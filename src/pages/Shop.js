import React from "react";
import { Link } from "react-router-dom";

const API = "https://nova-backend-lu2l.onrender.com";
const FALLBACK_IMAGE = "/no-image.png";

function Shop({ products = [], addToCart }) {
  return (
    <div style={{ padding: "40px" }}>
      <h1>Shop Research Compounds</h1>

      <div className="product-grid">
        {products.length === 0 ? (
          <p>Loading products...</p>
        ) : (
          products.map((product) => {
            let imageValue = product.image?.trim();

            // 🔥 Clean corrupted image values
            if (imageValue?.startsWith("undefined")) {
              imageValue = imageValue.replace("undefined", "");
            }

            const hasValidImage =
              imageValue &&
              imageValue !== "undefined" &&
              imageValue !== "null" &&
              imageValue !== "";

            let imageUrl = FALLBACK_IMAGE;

            if (hasValidImage) {
              imageUrl = imageValue.startsWith("/uploads")
                ? `${API}${imageValue}`
                : `${API}/uploads/${imageValue}`;
            }

            return (
              <div key={product._id} className="card">
                <Link
                  to={`/product/${product._id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <img
                    src={imageUrl}
                    alt={product.name}
                    style={{ width: "100%" }}
                    loading="lazy"
                    onError={(e) => {
                      if (e.target.dataset.errorHandled) return;
                      e.target.dataset.errorHandled = "true";
                      e.target.src = FALLBACK_IMAGE;
                    }}
                  />

                  <h3>{product.name}</h3>
                  <p>${product.price}</p>
                </Link>

                <button onClick={() => addToCart(product)}>
                  Add To Cart
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Shop;