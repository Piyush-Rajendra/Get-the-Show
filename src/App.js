import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/LoginRegister/Login';
import Register from './components/LoginRegister/Register';
import Forgot from './components/LoginRegister/Forgot';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* Route for the home page when not authenticated */}
          <Route exact path='/' element={<Login />} />
          <Route path='/register' element={<Register/>} />
          <Route path='/forgot' element={<Forgot/>} />
          
        </Routes>
      </div>
    </Router>
    )
}

export default App;
