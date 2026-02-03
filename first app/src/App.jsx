import React from "react";
import { CartProvider } from "./component/CartProvider";
import ProductList from "./component/ProductList";
import Cart from "./component/Cart";

function App() {
  return (
    <CartProvider>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <ProductList />
        <Cart />
      </div>
    </CartProvider>
  );
}

export default App;
