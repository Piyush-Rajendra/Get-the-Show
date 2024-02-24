import React from "react";
import { Link } from 'react-router-dom';
import { useState, useContext } from "react";
import '../css/HomePage/HomePage.css'
import MovieCard from "./MovieCard";
import axios from 'axios';
import {useEffect} from 'react';

const HomePage = ({movies}) => {

// Define the URL
const url = 'http://localhost:3000/movies';

useEffect(() => {
  axios.get(url)
    .then(response => {
      // Handle successful response
      setMovieList(response.data);
      console.log('Data:', response.data);
    })
    .catch(error => {
      // Handle error
      console.error('Error fetching data:', error);
    });
}, []); // empty dependency array ensures this effect runs only once

  const [movieList, setMovieList] = useState([]);

  const addMovieHandler = (newMovie) => {
    setMovieList((prevMovies) => [newMovie, ...prevMovies]);
  };
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
          <div class = "homeNowPlaying">
            <h1>Now Playing</h1>
          </div>
          <div class="homeListNowPlaying">
            <ul class="item-list">
              <li class="movie-card-container">
                {movieList.slice(0, movieList.length/2).map((location) => (
                  <Link to="/">
                    <MovieCard 
                      movie={location.title}
                      category={location.category}
                      cast={location.cast}
                      director={location.director}
                      producer={location.producer}
                      synopsis={location.synopsis}
                      trailerPicture={location.trailerPicture}
                      trailerVideo={location.trailerVideo}
                      mpaaRating={location.mpaaRating}
                      showDatesTimes={location.showDatesTimes}
                      posterBase64={location.posterBase64}
                    ></MovieCard>
                </Link>
                ))}
              </li>
            </ul>
          </div>
          <div class = "homeComingSoon">
            <h1>Coming Soon</h1>
          </div>
          <div class="homeListNowPlaying">
            <ul class="item-list">
              <li class="movie-card-container">
                {movieList.slice(movieList.length/2, movieList.length).map((location) => (
                  <Link to="/">
                    <MovieCard 
                      movie={location.title}
                      category={location.category}
                      cast={location.cast}
                      director={location.director}
                      producer={location.producer}
                      synopsis={location.synopsis}
                      trailerPicture={location.trailerPicture}
                      trailerVideo={location.trailerVideo}
                      mpaaRating={location.mpaaRating}
                      showDatesTimes={location.showDatesTimes}
                      posterBase64={location.posterBase64}
                    ></MovieCard>
                  </Link>
                ))}
              </li>
            </ul>
          </div>
      </div>
    )
};

export default HomePage;