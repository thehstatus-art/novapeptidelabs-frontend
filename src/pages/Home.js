import React from "react";

function Home({ products, addToCart }) {
  return (
    <div className="home-container">
      <div className="hero">
        <h1>ADVANCED RESEARCH PEPTIDES</h1>
        <p>Premium Quality • Lab Tested • Fast Shipping</p>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product._id} className="card">
            <img
              src={`${process.env.REACT_APP_API_URL}${product.image}`}
              alt={product.name}
            />

            <h3>{product.name}</h3>
            <p className="price">${product.price.toFixed(2)}</p>

            <button onClick={() => addToCart(product)}>
              ADD TO CART
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;