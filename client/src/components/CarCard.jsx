import React, { useState } from 'react';
import API from '../services/api';

const CarCard = ({ car, user, onBooked }) => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleBook = async () => {
    if (!user) {
      setMessage('Please login to book');
      return;
    }
    if(!fromDate || !toDate) {
      setMessage('Please select from and to dates');
      return;
    }
    setLoading(true);
    try {
      const res = await API.post('/api/book', { carId: car._id, fromDate, toDate });
      setMessage('Booked successfully');
      onBooked && onBooked();
    } catch (err) {
      console.error(err);
      setMessage(err?.response?.data?.message || 'Booking failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card h-100 shadow-sm">
      <img src={car.image} className="card-img-top" alt={car.name} style={{height: '180px', objectFit: 'cover'}} />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{car.name}</h5>
        <h6 className="text-muted">{car.carNumber}</h6>
        <p className="card-text">{car.description}</p>
        <p className="mb-1"><strong>₹{car.pricePerDay} / day</strong></p>

        <div className="mt-auto">
          <div className="d-flex gap-2 mb-2">
            <input type="date" className="form-control form-control-sm" value={fromDate} onChange={(e)=>setFromDate(e.target.value)} />
            <input type="date" className="form-control form-control-sm" value={toDate} onChange={(e)=>setToDate(e.target.value)} />
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <button className="btn btn-primary btn-sm" onClick={handleBook} disabled={loading}>
              {loading ? 'Booking...' : 'Rent'}
            </button>
            <small className="text-muted">₹{car.pricePerDay}/day</small>
          </div>
          {message && <div className="mt-2"><small className="text-danger">{message}</small></div>}
        </div>
      </div>
    </div>
  );
};

export default CarCard;
