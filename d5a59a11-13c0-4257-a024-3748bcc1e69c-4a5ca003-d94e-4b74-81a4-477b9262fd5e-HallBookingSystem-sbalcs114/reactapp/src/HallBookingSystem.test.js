import { render, screen, fireEvent } from "@testing-library/react";
import HallBookingSystem from "./HallBookingSystem";

test("renders the main title of the Hall Booking System", () => {
  render(<HallBookingSystem />);
  expect(screen.getByTestId("main-title")).toHaveTextContent("Hall Booking System");
});

test("displays available halls correctly", () => {
  render(<HallBookingSystem />);
  expect(screen.getByTestId("hall-list")).toBeInTheDocument();
  expect(screen.getByTestId("hall-1")).toBeInTheDocument();
  expect(screen.queryByTestId("hall-2")).toBeNull(); // Hall 2 is unavailable
});

test("displays alert when trying to confirm booking without a name", () => {
  render(<HallBookingSystem />);
  fireEvent.click(screen.getByTestId("confirm-booking"));
  expect(screen.getByTestId("alert-message")).toHaveTextContent("Please enter your name");
});

test("confirms booking with a name", () => {
  render(<HallBookingSystem />);
  fireEvent.change(screen.getByTestId("name-input"), { target: { value: "John Doe" } });
  fireEvent.click(screen.getByTestId("confirm-booking"));
  expect(screen.getByTestId("alert-message")).toHaveTextContent("Booking confirmed for John Doe");
});

test("displays error message when trying to confirm booking with an empty name", () => {
  render(<HallBookingSystem />);
  fireEvent.click(screen.getByTestId("confirm-booking"));
  expect(screen.getByTestId("alert-message")).toHaveTextContent("Please enter your name");
});

test("displays correct hall details when a hall is selected", () => {
  render(<HallBookingSystem />);
  fireEvent.click(screen.getByText("Select"));
  expect(screen.getByTestId("hall-name")).toHaveTextContent("Conference Room A");
  expect(screen.getByTestId("hall-capacity")).toHaveTextContent("Capacity: 50");
  expect(screen.getByTestId("hall-description")).toHaveTextContent("Spacious conference hall");
  expect(screen.getByTestId("hall-amenities")).toHaveTextContent("Projector, WiFi");
});
