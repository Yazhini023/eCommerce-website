// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import SignUp from './Components/Signup';
import Login from './Components/Login';
import Home from './Components/Home';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
