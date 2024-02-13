import React from "react";
import { Link } from 'react-router-dom';
import { useState, useContext } from "react";
import './css/HomePage.css';
import Gorgi from './img/Gorgi.png';
import Kevin from './img/Kevin_Hungy.png';

const HomePage = props => {
    return(
        <div class = "homeBody">
          <div class = "homeHeader">
            <h1>E-Cinema Booking</h1>
            <div class = "buttons">
              <button>Register</button>
              <button>Logout</button>
            </div>
          </div>
          <div class = "homeSearch">
            <select id="filter-dropdown">
              <option value="">Title</option>
              <option value="genre">Genre</option>
              <option value="year">Year</option>
            </select>
            <input type="text" placeholder="Search for Movies..."></input>
            <button>Search</button>
          </div>
          <div class = "homeNowPlaying">
            <h1>Now Playing</h1>
          </div>
          <div class = "homeListNowPlaying">
            <ul class="item-list">
              <li><img src={Gorgi}></img></li>
              <li><img src={Kevin}></img></li>
              <li><img src={Gorgi}></img></li>
              <li><img src={Kevin}></img></li>
              <li><img src={Gorgi}></img></li>
              <li><img src={Kevin}></img></li>
          </ul>
          </div>
          <div class = "homeComingSoon">
            <h1>Coming Soon</h1>
          </div>
          <div class = "homeListNowPlaying">
            <ul class="item-list">
              <li><img src={Gorgi}></img></li>
              <li><img src={Kevin}></img></li>
              <li><img src={Gorgi}></img></li>
              <li><img src={Kevin}></img></li>
              <li><img src={Gorgi}></img></li>
              <li><img src={Kevin}></img></li>
          </ul>
          </div>
      </div>
    )
};

export default HomePage;