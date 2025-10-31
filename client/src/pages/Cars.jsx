import React, { useEffect, useState } from 'react';
import API from '../services/api';
import CarCard from '../components/CarCard';

const Cars = ({ user }) => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCars = async () => {
    try {
      const res = await API.get('/api/cars');
      setCars(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <div className="container py-4">
      <h3>Available Cars</h3>
      <p className="text-muted">Choose a car and select From and To dates to rent.</p>
      <div className="row g-3">
        {loading && <div className="text-center">Loading cars...</div>}
        {!loading && cars.map(car => (
          <div className="col-md-4" key={car._id}>
            <CarCard car={car} user={user} onBooked={() => { /* optional: refresh bookings */ }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cars;
