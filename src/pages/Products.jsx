import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Products() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/products`)
      .then(res => setProducts(res.data))
  }, [])

  return (
    <div className="products-page">
      <h1 className="products-title">Research Catalog</h1>

      <div className="products-grid">
        {products.map(product => (

          <div key={product._id} className="product-card">

            {/* IMAGE */}
            <div className="product-image-wrapper">
              <img
                src={product.image || "/no-image.png"}
                alt={product.name}
              />
            </div>

            {/* INFO */}
            <div className="product-info">

              <span className="product-category">
                {product.category?.toUpperCase()}
              </span>

              <h3 className="product-name">
                {product.name}
              </h3>

              <p className="product-price">
                ${product.price}
              </p>

              {/* STOCK BADGE */}
              {product.stock > 0 && product.stock <= 5 && (
                <span className="stock-badge low">
                  LIMITED BATCH • {product.stock} LEFT
                </span>
              )}

            </div>

            {/* CTA */}
            <div className="product-actions">
              {product.stock === 0 ? (
                <button className="soldout-btn">
                  SOLD OUT
                </button>
              ) : (
                <Link to={`/product/${product.slug}`}>
                  <button className="view-btn">
                    VIEW PRODUCT
                  </button>
                </Link>
              )}
            </div>

          </div>

        ))}
      </div>
    </div>
  )
}

export default Products
