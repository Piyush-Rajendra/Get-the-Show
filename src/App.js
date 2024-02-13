import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import HomePage from './components/HomePage';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* Route for the home page when not authenticated */}
          <Route exact path='/' element={<Login />} />
          <Route exact path='/HomePage' element={<HomePage/>} />
        </Routes>
      </div>
    </Router>
    )
}

export default App;
