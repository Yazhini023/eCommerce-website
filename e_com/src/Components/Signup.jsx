import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    contact: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:1000/api/user/register", formData);
      
      const { activationToken } = response.data;

      // ✅ Save token to localStorage
      localStorage.setItem("activationToken", activationToken);

      // ✅ Navigate to OTP page
      navigate("/verify");
    } catch (error) {
      const errMsg = error.response?.data?.message || "Registration failed";
      alert(errMsg);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required /><br /><br />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required /><br /><br />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required /><br /><br />
        <input type="text" name="contact" placeholder="Contact" onChange={handleChange} required /><br /><br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Signup;
