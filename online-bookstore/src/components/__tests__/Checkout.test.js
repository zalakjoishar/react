import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Checkout from "../Checkout";

test("submits checkout form successfully", async () => {
  const cartItems = [{ id: 1, title: "React Basics", price: 25, quantity: 1 }];
  render(<Checkout cartItems={cartItems} />);

  userEvent.type(screen.getByLabelText(/name/i), "John Doe");
  userEvent.type(screen.getByLabelText(/address/i), "123 Main St");
  userEvent.type(screen.getByLabelText(/credit card/i), "4111111111111111");

  userEvent.click(screen.getByRole("button", { name: /submit/i }));

  expect(await screen.findByText(/Thank you for your purchase/i)).toBeInTheDocument();
});
