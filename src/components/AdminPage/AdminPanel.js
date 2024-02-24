import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext} from "react";
import '../css/AdminPage/AdminPanel.css';
import MovieCard from "../MainPage/MovieCard";

const AdminPanel = props => {
  const navigate = useNavigate();

  const changeMovie = () => {
    navigate('/ManageMovie');
  }
  const changeUser = () => {
    navigate('/ManageUser');
  }
  const changeHome = () => {
    navigate('/');
  }
    return(
        <div class = "homeBody">
          <div class = "homeHeader">
            <h1>E-Cinema Booking</h1>
            <div class = "buttons">
              <button onClick={changeHome}>Logout</button>
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
            <button >Manage Promotions</button>
            <br></br>
            <button>Ticket Prices</button>
            <br></br>
            <button onClick={changeUser}>Members & Admin</button>
          </div>
          
        <footer>
      </footer>
      </div>
    )
};

export default AdminPanel;