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
    <div>
      <h1>Research Catalog</h1>

      {products.map(product => (
        <div key={product._id}>
          <h3>{product.name}</h3>
          <p>${product.price}</p>
          <Link to={`/product/${product.slug}`}>View</Link>
        </div>
      ))}
    </div>
  )
}

export default Products
