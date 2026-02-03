import React from "react";

function Cart({ cartItems, removeFromCart, updateQuantity }) {
  return (
    <div>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in the cart</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.id} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
            <h3>{item.title}</h3>
            <p>Author: {item.author}</p>
            <p>Price: ${item.price}</p>
            <p>
              Quantity: {item.quantity}{" "}
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
            </p>
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </div>
        ))
      )}
    </div>
  );
}

export default Cart;
