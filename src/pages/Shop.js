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
            const imageUrl =
              product.image?.startsWith("/uploads")
                ? `${API}${product.image}`
                : `${API}/uploads/${product.image}`;

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
                      e.target.src =
                        "https://via.placeholder.com/300x300?text=No+Image";
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