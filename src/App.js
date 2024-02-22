import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import MovieView from './components/MovieView';
import BuyTickets from './components/BuyTickets';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* Route for the home page when not authenticated */}
          <Route exact path='/' element={<Login />} />
          <Route exact path='/movieview' element={<MovieView />} />
          <Route exact path='/tickets' element={<BuyTickets />} />

        </Routes>
      </div>
    </Router>
    )
}

export default App;
