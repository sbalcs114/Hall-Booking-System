import React, { useState } from 'react';

const Booking = ({ hall, onBack }) => {
  const [name, setName] = useState("");

  const handleBooking = (e) => {
    e.preventDefault();
    if (!name) {
      alert('Please enter your name before confirming the booking.'); // Alert when name is empty
      return; // Prevent further execution
    }
    alert(`Hall ${hall.name} booked for ${name}`);
    onBack(); // Go back to Home after booking
  };

  return (
    <div className="container">
      <button className="btn btn-secondary" onClick={onBack}>Back</button>
      <h2>Booking for {hall.name}</h2>
      <p><strong>Description:</strong> {hall.description}</p>
      <p><strong>Capacity:</strong> {hall.capacity}</p>
      <p><strong>Amenities:</strong> {hall.amenities.join(', ')}</p>
      <p><strong>Price per Hour:</strong> ${hall.pricePerHour}</p>
      <form onSubmit={handleBooking}>
        <div className="mb-3">
          <label className="form-label">Your Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">Confirm Booking</button>
      </form>
    </div>
  );
};

export default Booking;
