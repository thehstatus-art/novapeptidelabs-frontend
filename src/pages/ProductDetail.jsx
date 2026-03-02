import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

function ProductDetail() {

  const { slug } = useParams()
  const [product, setProduct] = useState(null)

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/products/${slug}`)
      .then(res => setProduct(res.data))
  }, [slug])

  if (!product) return <p>Loading...</p>

  return (
    <div>
      <h1>{product.name}</h1>
      <p>Purity: {product.specifications?.purity}</p>
      <p>Batch: {product.batchNumber}</p>
      <p>${product.price}</p>
    </div>
  )
}

export default ProductDetail
