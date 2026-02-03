import React, { useContext } from "react";
import { CartContext } from "./CartProvider";

const products = [
  { id: 1, name: "Laptop", price: 1200 },
  { id: 2, name: "Phone", price: 800 },
  { id: 3, name: "Headphones", price: 150 },
];

function ProductList() {
  const { dispatch } = useContext(CartContext);

  return (
    <div>
      <h2>Products</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {products.map(product => (
          <li key={product.id} style={{ margin: "10px 0" }}>
            {product.name} - ${product.price}
            <button
              onClick={() => dispatch({ type: "ADD_ITEM", payload: product })}
              style={{ marginLeft: "10px" }}
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
