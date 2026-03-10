import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ProductDetail() {

  const { slug } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/products/${slug}`)
      .then((res) => setProduct(res.data))
      .catch(() => setProduct(null));

  }, [slug]);

  if (!product)
    return (
      <p style={{ padding: "80px", textAlign: "center" }}>
        Loading compound data...
      </p>
    );

  const imageUrl =
    product.image && product.image.startsWith("http")
      ? product.image
      : "/no-image.png";

  return (
    <div className="compound-page">

      {/* HEADER */}

      <div className="compound-header-section">

        {/* IMAGE */}

        <div className="compound-image-block">

          <img
            src={imageUrl}
            alt={product.name}
            className="compound-image-large"
          />

        </div>

        {/* INFO */}

        <div className="compound-main-info">

          <h1>{product.name}</h1>

          <p className="compound-description">
            {product.description ||
              "Research peptide currently investigated in metabolic signaling pathways, endocrine receptor activation, and regenerative cellular models."}
          </p>

          {/* TAGS */}

          <div className="compound-tags">

            <span>Peptide</span>
            <span>Research Grade</span>
            <span>{product.specifications?.purity || "≥99% HPLC"}</span>

          </div>

          {/* PRICE */}

          <div className="checkout-unit-price">
            ${product.price}
          </div>

        </div>

      </div>

      {/* SCIENTIFIC DATA */}

      <div className="compound-science-grid">

        <div className="science-card">

          <h3>Scientific Data</h3>

          <div className="science-row">
            <span>Purity</span>
            <p>{product.specifications?.purity || "≥99%"}</p>
          </div>

          <div className="science-row">
            <span>Batch Number</span>
            <p>{product.batchNumber || "Research Batch"}</p>
          </div>

          <div className="science-row">
            <span>Storage</span>
            <p>-20°C recommended</p>
          </div>

          <div className="science-row">
            <span>Grade</span>
            <p>Research Grade</p>
          </div>

        </div>

        <div className="science-card">

          <h3>Primary Research Areas</h3>

          <ul>
            <li>Metabolic regulation studies</li>
            <li>Endocrine receptor signaling</li>
            <li>Growth hormone pathway research</li>
            <li>Cellular regeneration models</li>
          </ul>

        </div>

      </div>

      {/* DISCLAIMER */}

      <div className="research-disclaimer">

        <div className="disclaimer-icon">⚠️</div>

        <div className="disclaimer-text">

          <strong>Research Use Only</strong>

          <p>
            Compounds supplied by Nova Peptide Labs are intended strictly for
            laboratory research purposes. These materials are not approved for
            human consumption or medical use.
          </p>

        </div>

      </div>

    </div>
  );
}

export default ProductDetail;