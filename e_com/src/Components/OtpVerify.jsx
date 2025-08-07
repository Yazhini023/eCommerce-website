import React, { useState } from 'react';
import axios from 'axios';

function OtpVerify() {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);

    const activationToken = localStorage.getItem("activationToken"); // ✅ Read token

    try {
      const response = await axios.post('http://localhost:1000/api/user/verify', {
        otp,
        activationToken,
      });

      alert(response.data.message); // "User Registration Successful"
      setOtp('');
      localStorage.removeItem("activationToken"); // Clean up
    } catch (error) {
      const errMsg = error.response?.data?.message || "Verification failed";
      alert(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>OTP Verification</h2>
      <form onSubmit={handleVerify}>
        <input
          type="number"
          placeholder="Enter 6-digit OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <br /><br />
        <button type="submit" disabled={loading}>
          {loading ? 'Verifying...' : 'Verify OTP'}
        </button>
      </form>
    </div>
  );
}

export default OtpVerify;
