import React from "react";
import { Link } from 'react-router-dom';
import { useState, useContext } from "react";
import './css/HomePage.css';
import Gorgi from './img/Gorgi.png';
import Kevin from './img/Kevin_Hungy.png';
import MovieCard from "./MovieCard";

const HomePage = ({movies}) => {

  const DUMMY_MOVIE = [
    {
      id: 'Interstellar',
      title: 'Interstellar',
      date: new Date('2015/2/21').toLocaleDateString(),
      img: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg',
      summary: 'Good ass fucking movie it will make u shit urself all over hahahaha'
    }
    ,
    {
      id: 'Interstellar',
      title: 'Despicable Me 4',
      date: new Date('2015/2/21').toLocaleDateString(),
      img: 'https://th.bing.com/th/id/OIP.cOVn6ZqBSLuUC7-09h-RiQHaLu?w=115&h=180&c=7&r=0&o=5&dpr=2&pid=1.7',
      summary: 'The little minions are the fucking shit'
    }
    ,
    {
      id: 'Interstellar',
      title: 'Inside Out',
      date: new Date('2015/2/21').toLocaleDateString(),
      img: 'https://th.bing.com/th/id/OIP.BWYvd8CBfgoNrMJ0sS3fNwHaLH?w=121&h=182&c=7&r=0&o=5&dpr=2&pid=1.7',
      summary: 'She should have kept running tbh'
    }
    ,
    {
      id: 'Interstellar',
      title: 'The Martian',
      date: new Date('2015/2/21').toLocaleDateString(),
      img: 'https://th.bing.com/th/id/OIP.fQY4rVCdjBbF9ZG_ViE1jAHaKj?w=125&h=180&c=7&r=0&o=5&dpr=2&pid=1.7',
      summary: 'Yeah im not tryna go to mars'
    }
    ,
    {
      id: 'Interstellar',
      title: 'I LOVE GORGI!',
      date: new Date('2015/2/21').toLocaleDateString(),
      img: 'https://media.licdn.com/dms/image/D5603AQHiUbg4O1-m_g/profile-displayphoto-shrink_400_400/0/1671975201543?e=1714003200&v=beta&t=0AN7bjkrGtnFO5Mw6yOJ34LyhQ_F65Hp86n1ticUJ2E',
      summary: 'I would literally die for you gorgi'
    }
    ,
    {
      id: 'Interstellar',
      title: 'MY FATHER!!!!',
      date: new Date('2015/2/21').toLocaleDateString(),
      img: 'https://media.licdn.com/dms/image/D5603AQGEKtGkMopOkQ/profile-displayphoto-shrink_100_100/0/1695422033675?e=1714003200&v=beta&t=TNxIbNGLwg7q4_9CfDi0SMp4xpJCIecxkNaTtbtaqyU',
      summary: 'Absolute Cutie Patootie! CUTENESS OVERLOAD!!'
    }
  ]
  
    return(
        <div class = "homeBody">
          <div class = "homeHeader">
            <h1>E-Cinema Booking</h1>
            <div class = "homeSearch">
              <select id="filter-dropdown">
                <option value="">Title</option>
                <option value="genre">Genre</option>
                <option value="year">Year</option>
              </select>
              <input type="text" placeholder="Search for Movies..."></input>
              <button>Search</button>
            </div>
            <div class = "buttons">
              <button>Register</button>
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
          <div class = "homeNowPlaying">
            <h1>Now Playing</h1>
          </div>
          <div class = "homeListNowPlaying">
            <ul class="item-list">
              <li><MovieCard movie={DUMMY_MOVIE[0]}></MovieCard></li>
              <li><MovieCard movie={DUMMY_MOVIE[1]}></MovieCard></li>
              <li><MovieCard movie={DUMMY_MOVIE[2]}></MovieCard></li>
              <li><MovieCard movie={DUMMY_MOVIE[3]}></MovieCard></li>
              <li><MovieCard movie={DUMMY_MOVIE[4]}></MovieCard></li>
              <li><MovieCard movie={DUMMY_MOVIE[5]}></MovieCard></li>
          </ul>
          </div>
          <div class = "homeComingSoon">
            <h1>Coming Soon</h1>
          </div>
          <div class = "homeListNowPlaying">
            <ul class="item-list">
            <li><MovieCard movie={DUMMY_MOVIE[0]}></MovieCard></li>
              <li><MovieCard movie={DUMMY_MOVIE[1]}></MovieCard></li>
              <li><MovieCard movie={DUMMY_MOVIE[2]}></MovieCard></li>
              <li><MovieCard movie={DUMMY_MOVIE[3]}></MovieCard></li>
              <li><MovieCard movie={DUMMY_MOVIE[4]}></MovieCard></li>
              <li><MovieCard movie={DUMMY_MOVIE[5]}></MovieCard></li>
          </ul>
          </div>
      </div>
    )
};

export default HomePage;