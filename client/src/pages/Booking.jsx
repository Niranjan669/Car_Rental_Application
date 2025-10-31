import React, { useEffect, useState } from 'react';
import API from '../services/api';

const Booking = ({ user }) => {
  const [bookings, setBookings] = useState([]);

  async function loadBookings() {
    try {
      const res = await API.get('/api/bookings');
      setBookings(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadBookings();
  }, []);

  return (
    <div className="container py-4">
      <h3>My Bookings</h3>
      {user && <p>Hello, <strong>{user.name}</strong></p>}
      <div className="row g-3">
        {bookings.length === 0 && <div className="col-12"><div className="alert alert-info">No bookings yet.</div></div>}
        {bookings.map(b => (
          <div className="col-md-6" key={b._id}>
            <div className="card shadow-sm">
              <div className="row g-0">
                <div className="col-4">
                  <img src={b.carId.image} className="img-fluid rounded-start" alt={b.carId.name} style={{height:'150px', objectFit:'cover', width:'100%'}} />
                </div>
                <div className="col-8">
                  <div className="card-body">
                    <h5 className="card-title">{b.carId.name}</h5>
                    <p className="mb-1"><small className="text-muted">{b.carId.carNumber}</small></p>
                    <p className="mb-1"><strong>From:</strong> {new Date(b.fromDate).toLocaleDateString()}</p>
                    <p className="mb-1"><strong>To:</strong> {new Date(b.toDate).toLocaleDateString()}</p>
                    <p className="mb-1"><strong>Total:</strong> ₹{b.totalAmount}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Booking;
