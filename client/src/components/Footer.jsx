import React from 'react';

const Footer = () => (
  <footer className="bg-dark text-white text-center py-3 mt-5">
    <div className="container">
      <p className="mb-1">&copy; {new Date().getFullYear()} Car Rental App. All rights reserved.</p>
      <p className="mb-0">
        Built with <span className="text-primary">React</span>, <span className="text-primary">Express</span>, and <span className="text-primary">MongoDB Atlas</span>
      </p>
    </div>
  </footer>
);

export default Footer;
