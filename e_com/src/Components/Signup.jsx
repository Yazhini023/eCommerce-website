// Signup.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const navigate = useNavigate(); // For navigation
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [activationToken, setActivationToken] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const validateForm = () => {
    const { name, email, contact, password } = formData;

    if (!name || !email || !contact || !password) {
      setError('All fields are required');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const contactRegex = /^\d{10}$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!emailRegex.test(email)) {
      setError('Invalid email format');
      return false;
    }

    if (!contactRegex.test(contact)) {
      setError('Contact must be 10 digits');
      return false;
    }

    if (!passwordRegex.test(password)) {
      setError(
        'Password must be at least 8 characters and include uppercase, lowercase, number, and special character'
      );
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post('http://localhost:1000/api/user/register', formData);
      setMessage(response.data.message);
      setActivationToken(response.data.activationToken);
      setShowOtpInput(true);
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post('http://localhost:1000/api/user/verify', {
        otp,
        activationToken,
      });
      setMessage(response.data.message);
      setShowOtpInput(false);

      // Redirect to login page after successful verification
      navigate('/login');
    } catch (error) {
      setError(error.response?.data?.message || 'OTP verification failed');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <h2>Sign Up</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}

      {!showOtpInput ? (
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" onChange={handleChange} /><br /><br />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} /><br /><br />
          <input type="text" name="contact" placeholder="Contact" onChange={handleChange} /><br /><br />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} /><br /><br />
          <button type="submit">Register</button>
        </form>
      ) : (
        <div>
          <h3>Enter OTP</h3>
          <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
          <br /><br />
          <button onClick={handleVerifyOtp}>Verify OTP</button>
        </div>
      )}
    </div>
  );
}

export default SignUp;
