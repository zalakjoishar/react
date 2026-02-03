import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BookList from "../BookList";
import Cart from "../Cart";

test("adds a book to the cart", () => {
  const cartItems = [];
  const addToCart = (book) => cartItems.push(book);

  render(
    <>
      <BookList addToCart={addToCart} />
      <Cart cartItems={cartItems} removeFromCart={() => {}} updateQuantity={() => {}} />
    </>
  );

  // Simulate user clicking "Add to Cart" button
  const addButton = screen.getByText(/Add to Cart/i);
  userEvent.click(addButton);

  // Assert that the book appears in the cart
  expect(cartItems.length).toBe(1);
});
