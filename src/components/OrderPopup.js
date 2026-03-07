import { useEffect, useState } from "react";

const customers = [
  { name: "Anthony", city: "Las Vegas" },
  { name: "David", city: "Miami" },
  { name: "Chris", city: "Dallas" },
  { name: "Michael", city: "San Diego" },
  { name: "James", city: "Phoenix" },
  { name: "Robert", city: "Chicago" },
  { name: "Daniel", city: "New York" }
];

export default function OrderPopup() {
  const [visible, setVisible] = useState(false);
  const [order, setOrder] = useState(customers[0]);

  useEffect(() => {

    const interval = setInterval(() => {

      const random =
        customers[Math.floor(Math.random() * customers.length)];

      setOrder(random);

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
      <strong>{order.name}</strong> from {order.city} just placed an order
    </div>
  );
}