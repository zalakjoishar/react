import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../App";

test("redirects to login if not authenticated", async () => {
  render(<App />);

  userEvent.click(screen.getByText("Dashboard"));

  expect(await screen.findByText(/Please login to continue/i)).toBeInTheDocument();
});

test("allows access to dashboard after login", async () => {
  render(<App />);

  userEvent.type(screen.getByLabelText(/username/i), "user1");
  userEvent.type(screen.getByLabelText(/password/i), "password123");
  userEvent.click(screen.getByRole("button", { name: /login/i }));

  expect(await screen.findByText(/Welcome to Dashboard/i)).toBeInTheDocument();
});
