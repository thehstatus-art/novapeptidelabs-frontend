              {/* CTA + CART */}
              <div className="research-actions">

                <Link
                  to={`/product/${product.slug || product._id}`}
                  className="research-cta"
                >
                  View Research →
                </Link>

                <button
                  className="research-cart-btn"
                  onClick={() => {

                    const existing =
                      JSON.parse(localStorage.getItem("cart")) || [];

                    existing.push(product);

                    localStorage.setItem("cart", JSON.stringify(existing));

                    alert(`${product.name} added to cart`);

                  }}
                >
                  Add to Cart
                </button>

                <a
                  href={`/coa/${product.slug || product._id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="research-coa-btn"
                >
                  COA
                </a>

              </div>

              {/* COA VERIFIED */}
              <div className="coa-verified">
                ✓ COA Verified
              </div>