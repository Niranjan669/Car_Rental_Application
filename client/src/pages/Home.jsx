import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div className="container py-5">
    {/* Hero Section */}
    <div className="row mb-4">
      <div className="col text-center">
        <h1>Car Rental App</h1>
        <p className="lead">
          A simple car rental system built with React, Express, and MongoDB Atlas. Login, browse cars, and book with ease.
        </p>
        <p>
          Use the <Link to="/register">Register</Link> or <Link to="/login">Login</Link> to start booking cars.
        </p>
      </div>
    </div>

    {/* Project Description */}
    <div className="row">
      <div className="col">
        <div className="card shadow-sm">
          <div className="card-body">
            <h5 className="card-title">Project Description</h5>
            <p className="card-text">
              This Car Rental App demonstrates a session-based authentication system. 
              Users can view available cars, select rental dates, and make bookings. All data is securely stored in MongoDB Atlas.
            </p>
            <div className="text-center mt-3">
              <Link to="/login" className="btn btn-primary">
                Explore Cars
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Home;
