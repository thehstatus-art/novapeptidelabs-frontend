import { useState } from 'react'
import axios from 'axios'

function AdminCreateProduct() {

  const [form, setForm] = useState({
    name: '',
    slug: '',
    price: '',
    stock: '',
    batchNumber: '',
    purity: ''
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    const token = localStorage.getItem('token')

    await axios.post(
      `${import.meta.env.VITE_API_URL}/api/products`,
      {
        name: form.name,
        slug: form.slug,
        price: Number(form.price),
        stock: Number(form.stock),
        batchNumber: form.batchNumber,
        specifications: {
          purity: form.purity
        }
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    alert('Product Created')
  }

  return (
    <div>
      <h1>Create Product</h1>

      <input name="name" placeholder="Product Name" onChange={handleChange} />
      <input name="slug" placeholder="Slug (retatrutide-10mg)" onChange={handleChange} />
      <input name="price" placeholder="Price" onChange={handleChange} />
      <input name="stock" placeholder="Stock" onChange={handleChange} />
      <input name="batchNumber" placeholder="Batch Number" onChange={handleChange} />
      <input name="purity" placeholder="Purity %" onChange={handleChange} />

      <button onClick={handleSubmit}>Create</button>
    </div>
  )
}

export default AdminCreateProduct
