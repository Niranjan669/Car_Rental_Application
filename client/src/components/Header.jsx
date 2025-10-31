import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api';

const Header = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await API.post('/api/logout');
      setUser(null);
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link to="/" className="navbar-brand">Car Rental</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav ms-auto">
            {!user && <>
              <li className="nav-item"><Link to="/login" className="nav-link">Login</Link></li>
              <li className="nav-item"><Link to="/register" className="nav-link">Register</Link></li>
            </>}
            {user && <>
              <li className="nav-item"><Link to="/cars" className="nav-link">Cars</Link></li>
              <li className="nav-item"><Link to="/booking" className="nav-link">Booking</Link></li>
              <li className="nav-item"><button className="btn btn-sm btn-light ms-2" onClick={handleLogout}>Logout</button></li>
            </>}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
