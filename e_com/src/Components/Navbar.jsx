import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ padding: '1rem', backgroundColor: '#f0f0f0' }}>
      <Link to="/signup" style={{ marginRight: '1rem' }}>Sign Up</Link>
      <Link to="/login">Login</Link>
    </nav>
  );
};

export default Navbar;
