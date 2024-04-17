import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext} from "react";
import '../css/AdminPage/AdminPanel.css';
import MovieCard from "../MainPage/MovieCard";
import UserContext from "../context/UserContext";

const AdminPanel = props => {
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(UserContext);
  //const isAdmin = userData && userData.isAdmin;
  const isAdmin = localStorage.getItem('isAdmin');
  console.log(isAdmin);

  const changeMovie = () => {
    navigate('/ManageMovie');
  }
  const changeUser = () => {
    navigate('/ManageUser');
  }
  const homeScreen = () => {
    navigate('/');
  }
  const logout = () => {
    setUserData(prevUserData => ({
      ...prevUserData,
      token: null,
    }));
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate('/logout');
  } 
   
  const changePromotions = () => {
    navigate('/promotions');
  }

  const changeTickets = () => {
    navigate('/ManageTickets');
  }

  if (isAdmin) {
    return(
        <div class = "homeBody">
          <div class = "homeHeader">
            <h1>E-Cinema Booking</h1>
            <div class = "buttons">
              <button onClick={logout}>Logout</button>
              <button onClick={homeScreen}>Home Page</button>
            </div>
          </div>
          {/* <div class = "homeSearch">
            <select id="filter-dropdown">
              <option value="">Title</option>
              <option value="genre">Genre</option>
              <option value="year">Year</option>
            </select>
            <input type="text" placeholder="Search for Movies..."></input>
            <button>Search</button>
          </div> */}
          <div class = "adminPanel">
            <h1>ADMIN PANEL</h1>
          </div>
          <div class = "adminChoices">
              <button onClick={changeMovie}>Manage Movies</button>
            <br></br>
            <button onClick={changePromotions}>Manage Promotions</button>
            <br></br>

            {/* <button>Ticket Prices</button>            
            <br></br>*/}
            <button onClick={changeUser}>Members & Admin</button>
            <br></br>
            <button onClick={changeTickets}>Manage Ticket Prices</button>
          </div>
          
        <footer>
      </footer>
      </div>
    )
          }
    else {
      return (
      <h2 style={{ color: 'red' }}>You are not authorized to view this page.</h2>
      )
    }
};

export default AdminPanel;