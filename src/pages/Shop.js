import React from "react";
import { Link } from "react-router-dom";

const API = "https://nova-backend-lu2l.onrender.com";

function Shop({ products = [], addToCart }) {
  return (
    <div style={{ padding: "40px" }}>
      <h1>Shop Research Compounds</h1>

      <div className="product-grid">
        {products.length === 0 ? (
          <p>Loading products...</p>
        ) : (
          products.map((product) => {
            const imageValue = product.image?.trim();

            const hasValidImage =
              imageValue &&
              imageValue !== "undefined" &&
              imageValue !== "null" &&
              imageValue !== "";

            const imageUrl = hasValidImage
              ? imageValue.startsWith("/uploads")
                ? `${API}${imageValue}`
                : `${API}/uploads/${imageValue}`
              : "/no-image.png";

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
                      e.target.src = "/no-image.png";
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