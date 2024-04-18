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
import Promotions from './components/Promotions/Promotions';
import React, { useState, useEffect } from "react";
import UserContext from './components/context/UserContext';
import Logout from './components/Logout/Logout';
import UpdatePassword from './components/LoginRegister/UpdatePassword';
import RegisterContinued from './components/LoginRegister/RegisterContinued';
import AdminLogIn from './components/LoginRegister/AdminLogIn';
import ChangePassword from './components/LoginRegister/ChangePassword';
import ManageTickets from './components/AdminPage/ManageTickets';
import AddPromotions from './components/Promotions/AddPromotions';
import EditPromotions from './components/Promotions/EditPromotions';
import OrderHistory from './components/MainPage/OrderHistory';
import ErrorPage from './components/ErrorPage';
import EditMovie from './components/AdminPage/EditMovie';
import AddMovie from './components/AdminPage/AddMovie';
import AddAdmin from './components/AdminPage/AddAdmin';
import EditUser from './components/AdminPage/EditUser';
import EditMovieContinued from './components/AdminPage/EditMovieContinued';
import AddMovieContinued from './components/AdminPage/AddMovieContinued';
import EditTime from './components/AdminPage/EditTime';

function App() {
  const [userData, setUserData] = useState({
    username: undefined,
    token: undefined,
    isAdmin: false,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("token");
      if (token === null) {
        localStorage.setItem("token", "");
        console.log("null token");
        token = "";
      }

      else if (token != null) {
        console.log(token); 
        setUserData(prevUserData => ({
          ...prevUserData,
          token: token
        }));
      }
    };
    checkLoggedIn();
  }, [])



  return (
    <UserContext.Provider value ={{userData, setUserData}}>
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
          <Route exact path='/promotions' element={<Promotions />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/adminlogin' element={<AdminLogIn />} />
          <Route path='/ChangePassword' element={<ChangePassword />} />
          <Route path='/ManageTickets' element={<ManageTickets />} />
          <Route path='/AddPromotion' element={<AddPromotions />} />
          <Route path='/EditPromotion/:id' element={<EditPromotions />} />
          <Route path='/OrderHistory' element={<OrderHistory />} />
          <Route path='*' element={<ErrorPage />} />
          <Route path='/editmovie/:id' element={<EditMovie />} />
          <Route exact path='/reset/:token' element={<UpdatePassword />} />
          <Route exact path='/registerContinued' element={<RegisterContinued />} /> 
          <Route exact path='/AddMovie' element ={<AddMovie />} />
          <Route exact path='/addadmin' element ={<AddAdmin />} />
          <Route exact path='/edituser/:id' element={<EditUser/>} />
          <Route exact path='/editmoviecontinued/:id' element={<EditMovieContinued/>} />
          <Route exact path='/addmoviecontinued/:title' element={<AddMovieContinued/>} />
          <Route exact path='/edittime/:id' element={<EditTime/>}/>
        </Routes>
      </div>
    </Router>
    </UserContext.Provider>
    )
}

export default App;
