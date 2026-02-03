// src/components/Cart.jsx
import React, { useContext } from "react";
import { CartContext } from "./CartProvider";

function Cart() {
  const { cart, dispatch } = useContext(CartContext);

  if (cart.length === 0) return <p>Your cart is empty.</p>;

  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {cart.map(item => (
          <li key={item.id} style={{ margin: "10px 0" }}>
            {item.name} - ${item.price} x {item.quantity}
            <button
              onClick={() => dispatch({ type: "REMOVE_ITEM", payload: item.id })}
              style={{ marginLeft: "10px", color: "red" }}
            >
              Remove
            </button>
            <button
              onClick={() =>
                dispatch({ type: "UPDATE_QUANTITY", payload: { id: item.id, quantity: item.quantity + 1 } })
              }
              style={{ marginLeft: "5px" }}
            >
              +
            </button>
            <button
              onClick={() =>
                dispatch({
                  type: "UPDATE_QUANTITY",
                  payload: { id: item.id, quantity: item.quantity - 1 > 0 ? item.quantity - 1 : 1 },
                })
              }
              style={{ marginLeft: "5px" }}
            >
              -
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Cart;
