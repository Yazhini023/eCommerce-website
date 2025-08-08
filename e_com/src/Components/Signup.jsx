import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/Signup.css'; // ✅ Import external CSS

function SignUp() {
  const navigate = useNavigate();
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
      navigate('/login');
    } catch (error) {
      setError(error.response?.data?.message || 'OTP verification failed');
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>

      {error && <p className="signup-error">{error}</p>}
      {message && <p className="signup-message">{message}</p>}

      {!showOtpInput ? (
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} />
          <input type="text" name="contact" placeholder="Contact" onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} />
          <button type="submit">Register</button>
        </form>
      ) : (
        <div>
          <h3>Enter OTP</h3>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <br /><br />
          <button onClick={handleVerifyOtp}>Verify OTP</button>
        </div>
      )}
    </div>
  );
}

export default SignUp;
