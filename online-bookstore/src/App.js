import React, { useState } from "react";
import BookList from "./components/BookList";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Login from "./components/Login";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const addToCart = (book) => {
    const existing = cartItems.find((item) => item.id === book.id);
    if (existing) {
      setCartItems(cartItems.map((item) => (item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item)));
    } else {
      setCartItems([...cartItems, { ...book, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => setCartItems(cartItems.filter((item) => item.id !== id));

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity } : item)));
  };

  if (!isLoggedIn) return <Login onLogin={setIsLoggedIn} />;

  return (
    <div>
      <h1>Online Bookstore</h1>
      <BookList addToCart={addToCart} />
      <Cart cartItems={cartItems} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />
      {cartItems.length > 0 && <Checkout cartItems={cartItems} />}
    </div>
  );
}

export default App;
