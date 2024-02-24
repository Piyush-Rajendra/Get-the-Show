import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import MovieView from './components/MovieView';
import BuyTickets from './components/BuyTickets';
import Payment from './components/Payment';
import PaymentConfirmation from './components/PaymentConfirmation';
import OrderSummary from './components/OrderSummary';


function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* Route for the home page when not authenticated */}
          <Route exact path='/' element={<Login />} />
          <Route exact path='/movieview/:id' element={<MovieView />} />
          
          <Route exact path='/tickets' element={<BuyTickets />} />
          <Route exact path='/payment' element={<Payment  />} />
          
          <Route exact path='/paymentconfirm' element={<PaymentConfirmation />} />
          <Route exact path='/ordersummary' element={<OrderSummary />} />

        
        </Routes>
      </div>
    </Router>
    )
}

export default App;
