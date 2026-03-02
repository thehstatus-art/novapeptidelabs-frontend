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
            // ✅ Only build API image if it exists
            const imageUrl = product.image
              ? product.image.startsWith("/uploads")
                ? `${API}${product.image}`
                : `${API}/uploads/${product.image}`
              : FALLBACK_IMAGE;

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
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = FALLBACK_IMAGE; // ✅ replace instead of hide
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