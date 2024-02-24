import React from "react";
import { Link } from 'react-router-dom';
import { useState, useContext } from "react";
import '../css/HomePage/HomePage.css'
import MovieCard from "./MovieCard";
import axios from 'axios';
import {useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import SidebarPopup from './SidebarPopup';


const HomePage = ({props}) => {

  const [myValue, setMyValue] = useState(false)
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchActive, setSearchActive] = useState(false);

  const navigate = useNavigate();
  const toggleActive = () => {
    setSearchActive(false);
    // window.location.reload();
    setSearchQuery(''); // Clear the value of the input field
  }

// Define the URL
const url = 'http://localhost:3000/movies';
const location = useLocation();
useEffect(() => {
  if (location.state != null) {

    setMyValue(location.state.props);
  }
})

// if (myValue !== true || myValue !== false) {
//   myValue = false;
// }
const handleSearchInputChange = (event) => {
  setSearchQuery(event.target.value);
};
const handleSearch = () => {
  // Filter movieList based on searchQuery
  setSearchActive(true);
  const filtered = movieList.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  setFilteredMovies(filtered);
};

const [isOpen, setIsOpen] = useState(false);

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

  const updateVal = () => {
    setMyValue(false);
    navigate('/', { state: {props: false} });
    
  }
  
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
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
              <input type="text" id="myInput" placeholder="Search for Movies..." value={searchQuery} onChange={handleSearchInputChange}></input>
              <button onClick={handleSearch}>Search</button>
              {searchActive && 
                <button onClick={toggleActive}>Reset</button>
              }
            </div>
            <div class = "buttons">
              {!myValue &&
                <Link to="/Register">
                  <button>Register</button>
                </Link>
              }
              {!myValue &&
                <Link to="/Login">
                  <button>Login</button>
                </Link>
              }
              {myValue && 
                  <button onClick={updateVal}>Logout</button>
              }
              <button>Register</button>
              <button>Logout</button>
              <div>
                <button className="hambugerMainPage" onClick={toggleSidebar}>&#8801;</button>
                <SidebarPopup isOpen={isOpen} onClose={toggleSidebar} />
              </div>
            </div>
          </div>
          <div class = "homeNowPlaying">
            <h1>Now Playing</h1>
          </div>
          <div class="homeListNowPlaying">
            <ul class="item-list">
              <li class="movie-card-container">
              {searchActive && filteredMovies.slice(0, movieList.length/2).map((location) => (
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
                {!searchActive && movieList.slice(0, movieList.length/2).map((location) => (
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
              {searchActive && filteredMovies.slice(movieList.length/2).map((location) => (
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
                {!searchActive && movieList.slice(movieList.length/2, movieList.length).map((location) => (
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
          
        <footer>
      </footer>
      </div>
    )
};


export default HomePage;