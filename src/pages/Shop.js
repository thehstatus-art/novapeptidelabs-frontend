import React from "react";
import { Link } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

function Shop({ products, addToCart }) {
  return (
    <div style={{ padding: "40px" }}>
      <h1>Shop Research Compounds</h1>

      <div className="product-grid">
        {products.map((product) => (
          <div key={product._id} className="card">
            <Link to={`/product/${product._id}`} style={{ textDecoration: "none", color: "inherit" }}>
              <img
                src={`${API}${product.image}`}
                alt={product.name}
                style={{ width: "100%" }}
              />
              <h3>{product.name}</h3>
              <p>${product.price}</p>
            </Link>

            <button onClick={() => addToCart(product)}>
              Add To Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shop;
