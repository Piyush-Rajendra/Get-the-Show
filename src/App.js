import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/LoginRegister/Login';
import Register from './components/LoginRegister/Register';
import Forgot from './components/LoginRegister/Forgot';
import ConfirmPage from './components/LoginRegister/ConfirmPage';
import AdminPanel from './components/AdminPage/AdminPanel'
import HomePage from './components/MainPage/HomePage';
import ManageMovie from './components/AdminPage/ManageMovie';
import ManageUser from './components/AdminPage/ManageUser';
import ProfilePage from './components/MainPage/ProfilePage';
import MovieView from './components/MovieView/MovieView';
import BuyTickets from './components/BookingTickets/BuyTickets';
import Payment from './components/BookingTickets/Payment';
import PaymentConfirmation from './components/BookingTickets/PaymentConfirmation';
import OrderSummary from './components/BookingTickets/OrderSummary';


function App() {

  
  return (
    <Router>
      <div>
        <Routes>
          {/* Route for the home page when not authenticated */}
          <Route exact path='/' element={<HomePage props={true}/>} />
          <Route exact path='/Login' element={<Login/>} />
          <Route exact path='/Register' element={<Register/>} />
          <Route exact path='/AdminPanel' element={<AdminPanel/>}/>
          <Route exact path='/ManageMovie' element={<ManageMovie/>}/>
          <Route exact path='/ManageUser' element={<ManageUser/>}/>
          <Route exact path='/Profile' element={<ProfilePage/>}/>
          <Route path='/registerPage' element={<Register/>} />
          <Route path='/forgotPage' element={<Forgot/>} />
          <Route path='/confirmationPage' element={<ConfirmPage/>}/> 
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
