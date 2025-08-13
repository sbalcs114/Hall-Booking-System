import { useState } from "react";
import "../css/Hall.css";


const halls = [
  { id: 1, name: 'Hall A', capacity: 100, description: 'A spacious hall suitable for small to medium-sized events.', amenities: ['Projector', 'Sound System', 'Air Conditioning'], pricePerHour: 150, available:true },
    { id: 2, name: 'Hall B', capacity: 200, description: 'Perfect for large gatherings and conferences.', amenities: ['Stage', 'Microphones', 'Wi-Fi'], pricePerHour: 250, available:false },
    { id: 3, name: 'Hall C', capacity: 150, description: 'An elegant hall ideal for weddings and receptions.', amenities: ['Lighting', 'Catering Service', 'Dance Floor'], pricePerHour: 300, available:false },
    { id: 4, name: 'Hall D', capacity: 50, description: 'A cozy hall for intimate gatherings and meetings.', amenities: ['Whiteboard', 'Coffee Station', 'Air Conditioning'], pricePerHour: 100, available:false },
    { id: 5, name: 'Hall E', capacity: 300, description: 'The largest hall available, suitable for exhibitions and trade shows.', amenities: ['Audio-Visual Equipment', 'Parking', 'Catering Service'], pricePerHour: 400, available:false },
    { id: 6, name: 'Hall F', capacity: 80, description: 'A versatile space for workshops and seminars.', amenities: ['Projector', 'Flip Charts', 'Wi-Fi'], pricePerHour: 120, available:false },
];

export default function HallBookingSystem() {
const [name, setName] = useState("");
const [alertMessage, setAlertMessage] = useState("");
const [selectedHall, setSelectedHall] = useState(null);

const handleBooking = () => {
if (!name) {
setAlertMessage("Please enter your name");
return;
}
setAlertMessage(`Booking confirmed for ${name} at ${selectedHall?.name}`);
};

return (
<div className="container">
<h1 data-testid="main-title" className="title">Hall Booking System</h1>

{alertMessage && <div data-testid="alert-message" className="alert">{alertMessage}</div>}

<div className="grid-container">
<div data-testid="hall-list" className="hall-list">
<h2 className="subtitle">Available Halls</h2>
<ul>
  {halls.map(hall => (
    <li key={hall.id} data-testid={`hall-${hall.id}`} className="hall-item">
      {hall.name} (Capacity: {hall.capacity}, Amenities: {hall.amenities}, 
      {hall.available ? " Available" : " Not Available"})
      {hall.available && (
        <button onClick={() => setSelectedHall(hall)} className="select-button">
          Select
        </button>
      )}
    </li>
  ))}
</ul>

</div>

<div className="booking-section">
<h2 className="subtitle">Book a Hall</h2>
<input
type="text"
placeholder="Enter your name"
value={name}
onChange={(e) => setName(e.target.value)}
className="input-field"
data-testid="name-input"
/>
<button
onClick={handleBooking}
className="confirm-button"
data-testid="confirm-booking"
>
Confirm Booking
</button>
</div>

{selectedHall && (
<div data-testid="hall-details" className="hall-details">
<h2 className="subtitle">Selected Hall Details</h2>
<p data-testid="hall-name">Name: {selectedHall.name}</p>
<p data-testid="hall-capacity">Capacity: {selectedHall.capacity}</p>
<p data-testid="hall-description">Description: {selectedHall.description}</p>
<p data-testid="hall-amenities">Amenities: {selectedHall.amenities}</p>
</div>
)}
</div>
</div>
);
}

export { HallBookingSystem };