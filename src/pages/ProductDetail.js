import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

export default function ProductDetail({ products = [], addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();

  // Try to find it from already-loaded products first (fast)
  const fromList = useMemo(
    () => products.find((p) => p._id === id),
    [products, id]
  );

  const [product, setProduct] = useState(fromList || null);
  const [loading, setLoading] = useState(!fromList);
  const [error, setError] = useState("");

  useEffect(() => {
    // If we already have it, don't refetch
    if (fromList) return;

    const run = async () => {
      try {
        setLoading(true);
        setError("");

        // Fallback: fetch all products then find by id (works with your current backend)
        const res = await fetch(`${API}/api/products`);
        const data = await res.json();

        const found = Array.isArray(data) ? data.find((p) => p._id === id) : null;
        if (!found) {
          setError("Product not found.");
        }
        setProduct(found || null);
      } catch (e) {
        setError("Failed to load product.");
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [id, fromList]);

  if (loading) {
    return (
      <div className="legal-page">
        <h2>Loading product…</h2>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="legal-page">
        <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
        <h2>{error || "Product not found."}</h2>
      </div>
    );
  }

  const specs = [
    { label: "Category", value: product.category || "—" },
    { label: "Purity", value: product.purity || "—" },
    { label: "Stock", value: product.stock ?? "—" },
    { label: "Specifications", value: product.specifications || "—" },
  ];

  return (
    <div className="product-detail-page">
      <div className="product-detail-wrap">
        <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>

        <div className="product-detail-grid">
          <div className="product-detail-image">
            <img src={`${API}${product.image}`} alt={product.name} />
          </div>

          <div className="product-detail-info">
            <h1 className="product-detail-title">{product.name}</h1>
            <div className="product-detail-price">${Number(product.price).toFixed(2)}</div>

            <p className="product-detail-desc">
              {product.description || "Premium research compound. For laboratory research use only."}
            </p>

            <button className="checkout-btn" onClick={() => addToCart(product)}>
              Add to Cart
            </button>

            <div className="product-detail-specs">
              <h3>Specifications</h3>
              <div className="specs-grid">
                {specs.map((s) => (
                  <div className="spec-row" key={s.label}>
                    <div className="spec-label">{s.label}</div>
                    <div className="spec-value">{String(s.value)}</div>
                  </div>
                ))}
              </div>

              <div className="spec-note">
                *All products are intended for research use only and are not for human consumption.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
