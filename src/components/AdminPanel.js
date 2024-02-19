import React from "react";
import { Link } from 'react-router-dom';
import { useState, useContext } from "react";
import './css/AdminPanel.css';
import Gorgi from './img/Gorgi.png';
import Kevin from './img/Kevin_Hungy.png';
import MovieCard from "./MovieCard";

const AdminPanel = props => {
    return(
        <div class = "homeBody">
          <div class = "homeHeader">
            <h1>E-Cinema Booking</h1>
            <div class = "buttons">
              <button>Logout</button>
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
            <button>Add New Movie</button>
            <br></br>
            <button>Edit Movie</button>
            <br></br>
            <button>Promotions</button>
            <br></br>
            <button>Ticket Prices</button>
            <br></br>
            <button>Members & Admin</button>
          </div>
      </div>
    )
};

export default AdminPanel;