import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Cart from "../Cart";

test("updates quantity in the cart", () => {
  const cartItems = [
    { id: 1, title: "React Basics", author: "John Doe", price: 25, quantity: 1 }
  ];
  const updateQuantity = (id, qty) => {
    cartItems[0].quantity = qty;
  };

  render(
    <Cart
      cartItems={cartItems}
      removeFromCart={() => {}}
      updateQuantity={updateQuantity}
    />
  );

  const increaseBtn = screen.getByLabelText("Increase quantity for React Basics");
  userEvent.click(increaseBtn);

  expect(screen.getByText("Quantity: 2")).toBeInTheDocument();
});
