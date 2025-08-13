import React from 'react';

const Home = ({ halls, onBook }) => {
  return (
    <div className="container">
      <h1 className="text-center">Hall Booking System</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Capacity</th>
            <th>Description</th>
            <th>Amenities</th>
            <th>Price per Hour</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {halls.map(hall => (
            <tr key={hall.id}>
              <td>{hall.name}</td>
              <td>{hall.capacity}</td>
              <td>{hall.description}</td>
              <td>{hall.amenities.join(', ')}</td>
              <td>${hall.pricePerHour}</td>
              <td>
                <button className="btn btn-primary" onClick={() => onBook(hall)}>Book</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
