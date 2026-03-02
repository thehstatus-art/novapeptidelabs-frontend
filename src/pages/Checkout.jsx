import { useState } from 'react'
import axios from 'axios'

function Checkout({ cartItems }) {

  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: ''
  })

  const [researchConfirmed, setResearchConfirmed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value
    })
  }

  const handleCheckout = async () => {
    if (!researchConfirmed) {
      setError('You must confirm research use.')
      return
    }

    setLoading(true)

    try {
      const token = localStorage.getItem('token')

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/orders`,
        {
          items: cartItems.map(item => ({
            productId: item._id,
            quantity: item.quantity
          })),
          shippingAddress
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      console.log('Order Created:', res.data)

      // Redirect to payment page later
      // navigate(`/payment/${res.data._id}`)

    } catch (err) {
      setError(err.response?.data?.message || 'Checkout failed')
    }

    setLoading(false)
  }

  return (
    <div className="checkout-container">

      <h1>Checkout</h1>

      {/* Shipping Form */}
      <div>
        <input name="fullName" placeholder="Full Name" onChange={handleChange} />
        <input name="address" placeholder="Address" onChange={handleChange} />
        <input name="city" placeholder="City" onChange={handleChange} />
        <input name="state" placeholder="State" onChange={handleChange} />
        <input name="postalCode" placeholder="Postal Code" onChange={handleChange} />
        <input name="country" placeholder="Country" onChange={handleChange} />
      </div>

      {/* Research Confirmation */}
      <div>
        <input
          type="checkbox"
          checked={researchConfirmed}
          onChange={() => setResearchConfirmed(!researchConfirmed)}
        />
        <label>
          I confirm these products are for laboratory research use only.
        </label>
      </div>

      {error && <p style={{color:'red'}}>{error}</p>}

      <button onClick={handleCheckout} disabled={loading}>
        {loading ? 'Processing...' : 'Place Order'}
      </button>

    </div>
  )
}

export default Checkout
