import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/LoginRegister/Login';
import Register from './components/LoginRegister/Register';
import Forgot from './components/LoginRegister/Forgot';
import ConfirmPage from './components/LoginRegister/ConfirmPage';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* Route for the home page when not authenticated */}
          <Route exact path='/' element={<Login />} />
          <Route path='/registerPage' element={<Register/>} />
          <Route path='/forgotPage' element={<Forgot/>} />
          <Route path='/confirmationPage' element={<ConfirmPage/>}/> 
        </Routes>
      </div>
    </Router>
    )
}

export default App;
