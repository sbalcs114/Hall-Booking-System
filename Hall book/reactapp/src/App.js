import React, { useState } from 'react';
import Home from './components/Home';
import Booking from './components/Booking';
import halls from './data';

const App = () => {
  const [selectedHall, setSelectedHall] = useState(null);

  const handleBook = (hall) => {
    setSelectedHall(hall);
  };

  const handleBack = () => {
    setSelectedHall(null);
  };

  return (
    <div className="container">
      {selectedHall ? (
        <Booking hall={selectedHall} onBack={handleBack} />
      ) : (
        <Home halls={halls} onBook={handleBook} />
      )}
    </div>
  );
};

export default App;
