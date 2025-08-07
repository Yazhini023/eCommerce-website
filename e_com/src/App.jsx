// In App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import SignUp from './Components/Signup';
import OtpVerify from './Components/OtpVerify'; // ✅ Import OTP Page

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/verify' element={<OtpVerify />} /> {/* ✅ New OTP Route */}
      </Routes>
    </Router>
  );
}

export default App;
