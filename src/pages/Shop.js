import React from "react";
import { Link } from "react-router-dom";

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
                  <img
                    src={imageUrl}
                    alt={product.name}
                    style={{ width: "100%" }}
                    loading="lazy"
                    onError={(e) => {
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