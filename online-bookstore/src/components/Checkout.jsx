import React, { useState } from "react";

function Checkout({ cartItems }) {
  const [formData, setFormData] = useState({ name: "", address: "", payment: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Order submitted:", formData, cartItems);
    setSubmitted(true);
  };

  if (submitted) return <h2>Thank you for your purchase!</h2>;

  return (
    <div>
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input id="name" name="name"/>

        <label htmlFor="address">Address:</label>
        <input id="address" name="address"/>

        <label htmlFor="payment">Credit Card:</label>
        <input id="payment" name="payment"/>

        <button type="submit">Submit Order</button>
      </form>
    </div>
  );
}

export default Checkout;
