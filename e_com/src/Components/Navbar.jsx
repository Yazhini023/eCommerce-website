import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const userRole = sessionStorage.getItem('role'); // 'admin' or 'user'

  const handleLogout = () => {
    sessionStorage.clear(); // remove role or any tokens
    navigate('/login');
  };

  const isAdminPage = location.pathname === '/admin';
  const isUserPage = location.pathname === '/home';

  return (
    <nav style={{ padding: '1rem', backgroundColor: '#f0f0f0' }}>
      {userRole === 'admin' && isAdminPage && (
        <>
          <Link to="/admin" style={{ marginRight: '1rem' }}>Admin Page</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}

      {userRole === 'user' && isUserPage && (
        <>
          <Link to="/home" style={{ marginRight: '1rem' }}>Home</Link>
          <Link to="/product" style={{ marginRight: '1rem' }}>Products</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}

      {!userRole && (
        <>
          <Link to="/signup" style={{ marginRight: '1rem' }}>Sign Up</Link>
          <Link to="/login">Login</Link>
        </>
      )}
      
    </nav>
  );
};

export default Navbar;
