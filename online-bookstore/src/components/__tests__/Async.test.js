import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BookList from "../BookList";

test("displays book list after async fetch", async () => {
  render(<BookList />);

  userEvent.click(screen.getByText(/Load Books/i));

  await waitFor(() => {
    expect(screen.getByText("React Basics")).toBeInTheDocument();
  });
});
