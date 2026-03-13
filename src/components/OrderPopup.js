import { useEffect, useState } from "react";

const customers = [
  { name: "Anthony", city: "Las Vegas" },
  { name: "David", city: "Miami" },
  { name: "Chris", city: "Dallas" },
  { name: "Michael", city: "San Diego" },
  { name: "James", city: "Phoenix" },
  { name: "Robert", city: "Chicago" },
  { name: "Daniel", city: "New York" },
  { name: "Andrew", city: "Austin" },
  { name: "Kevin", city: "Denver" },
  { name: "Ryan", city: "Seattle" },
  { name: "Brian", city: "Boston" },
  { name: "Jason", city: "Orlando" },
  { name: "Justin", city: "Tampa" },
  { name: "Eric", city: "Los Angeles" },
  { name: "Matt", city: "San Jose" },
  { name: "Ashley", city: "Scottsdale" },
  { name: "Jessica", city: "Atlanta" },
  { name: "Samantha", city: "San Antonio" },
  { name: "Emily", city: "San Francisco" },
  { name: "Nicole", city: "Charlotte" },
  { name: "Rachel", city: "Nashville" }
];

const products = [
  "Retatrutide",
  "Tesamorelin",
  "GHK‑Cu",
  "KLOW‑80",
  "BPC‑157",
  "DSIP",
  "5‑Amino‑1MQ"
];

export default function OrderPopup() {
  const [visible, setVisible] = useState(false);
  const [order, setOrder] = useState({
    ...customers[0],
    product: products[0]
  });

  useEffect(() => {

    const interval = setInterval(() => {

      const randomCustomer =
        customers[Math.floor(Math.random() * customers.length)];

      const randomProduct =
        products[Math.floor(Math.random() * products.length)];

      setOrder({
        ...randomCustomer,
        product: randomProduct
      });

      setVisible(true);

      setTimeout(() => {
        setVisible(false);
      }, 4500);

    }, 9000);

    return () => clearInterval(interval);

  }, []);

  if (!visible) return null;

  return (
    <div className="order-popup">
      <strong>{order.name}</strong> from {order.city} just purchased {order.product}
    </div>
  );
}