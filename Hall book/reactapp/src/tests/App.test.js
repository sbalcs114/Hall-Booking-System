import React from 'react';
import { render, screen, fireEvent, within, waitFor } from '@testing-library/react';
import App from '../App'; // Adjust the path if necessary
import halls from '../data'; // Assuming you have halls data in this path

describe('Hall Booking Management System', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear any mocks before each test
    });

    test('displays hall details correctly', () => {
        render(<App />);
        halls.forEach(hall => {
            expect(screen.getByText(hall.name)).toBeInTheDocument();
            expect(screen.getByText(hall.capacity)).toBeInTheDocument();
            expect(screen.getByText(hall.description)).toBeInTheDocument();
        });
    });

    test('displays alert when trying to confirm booking without a name', async () => {
        window.alert = jest.fn(); // Mocking the alert function
        render(<App />);

        const hallRows = screen.getAllByText(/Hall A/i);
        const hallARow = hallRows[0].closest('tr'); // Get the first matching Hall A cell's row
        const bookButton = within(hallARow).getByRole('button', { name: /Book/i });

        fireEvent.click(bookButton); // Click the "Book" button
        const confirmButton = screen.getByRole('button', { name: /Confirm Booking/i });
        fireEvent.click(confirmButton); // Try to confirm booking without entering a name

        await waitFor(() => {
            expect(window.alert).toHaveBeenCalledWith('Please enter your name before confirming the booking.');
        });
    });

    test('confirms booking with a name', async () => {
        window.alert = jest.fn(); // Mocking the alert function
        render(<App />);

        const hallRows = screen.getAllByText(/Hall A/i);
        const hallARow = hallRows[0].closest('tr');
        const bookButton = within(hallARow).getByRole('button', { name: /Book/i });

        fireEvent.click(bookButton);
        const nameInput = screen.getByRole('textbox');
        fireEvent.change(nameInput, { target: { value: 'John Doe' } });
        const confirmButton = screen.getByRole('button', { name: /Confirm Booking/i });
        fireEvent.click(confirmButton);

        await waitFor(() => {
            expect(window.alert).toHaveBeenCalledWith('Hall Hall A booked for John Doe');
        });
    });

    test('displays error message when trying to confirm booking with an empty name', async () => {
        window.alert = jest.fn(); // Mocking the alert function
        render(<App />);

        const hallRows = screen.getAllByText(/Hall A/i);
        const hallARow = hallRows[0].closest('tr');
        const bookButton = within(hallARow).getByRole('button', { name: /Book/i });

        fireEvent.click(bookButton);
        const confirmButton = screen.getByRole('button', { name: /Confirm Booking/i });
        fireEvent.click(confirmButton);

        await waitFor(() => {
            expect(window.alert).toHaveBeenCalledWith('Please enter your name before confirming the booking.');
        });
    });

    test('back button returns to home', async () => {
        render(<App />);

        const hallRows = screen.getAllByText(/Hall A/i);
        const hallARow = hallRows[0].closest('tr'); // Get the first matching Hall A cell's row
        const bookButton = within(hallARow).getByRole('button', { name: /Book/i });

        fireEvent.click(bookButton); // Click the "Book" button

        // Check that we are in the Booking component
        expect(screen.getByText(/Booking for Hall A/i)).toBeInTheDocument();

        const backButton = screen.getByRole('button', { name: /Back/i });
        fireEvent.click(backButton); // Click the "Back" button

        // Check that we are back in the Home component
                // Check that we are back in the Home component
                expect(screen.getByText(/Hall Booking System/i)).toBeInTheDocument();

                // Use getAllByText to avoid multiple elements issue
                const hallATexts = screen.getAllByText(/Hall A/i);
                expect(hallATexts.length).toBeGreaterThan(0); // Check that at least one Hall A is displayed
            });
            test('displays correct hall amenities', () => {
                render(<App />);
                halls.forEach(hall => {
                    const hallRow = screen.getByText(hall.name).closest('tr'); // Get the row for the specific hall
                    const amenitiesText = hall.amenities.join(', '); // Assuming amenities is an array
            
                    expect(within(hallRow).getByText(amenitiesText)).toBeInTheDocument();
                });
            });
            
            test('displays only available halls', () => {
                render(<App />);
                
                // Assuming you have a way to mark halls as booked in your data
                const bookedHallNames = halls.filter(hall => hall.isBooked).map(hall => hall.name);
                
                bookedHallNames.forEach(name => {
                    expect(screen.queryByText(name)).not.toBeInTheDocument(); // Should not be displayed
                });
            
                halls.forEach(hall => {
                    if (!hall.isBooked) {
                        expect(screen.getByText(hall.name)).toBeInTheDocument(); // Should be displayed
                    }
                });
            });
            test('renders the main title of the Hall Booking System', () => {
                render(<App />);
                const titleElement = screen.getByText(/Hall Booking System/i);
                expect(titleElement).toBeInTheDocument();
            });
            test('displays correct hall capacity', () => {
                render(<App />);
                halls.forEach(hall => {
                    expect(screen.getByText(hall.capacity)).toBeInTheDocument();
                });
            });
            
            test('displays correct hall description', () => {
                render(<App />);
                halls.forEach(hall => {
                    expect(screen.getByText(hall.description)).toBeInTheDocument();
                });
            });
        });