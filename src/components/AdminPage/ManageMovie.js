import React from "react";
import { Link } from 'react-router-dom';
import { useState, useContext } from "react";
import '../css/AdminPage/ManageMovie.css'
import MovieCard from "../MainPage/MovieCard";
import axios from 'axios';
import {useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import UserContext from "../context/UserContext";

const ManageMovie = ({props}) => {
  const isAdmin = localStorage.getItem('isAdmin');

  const { userData, setUserData } = useContext(UserContext);
  

  const [myValue, setMyValue] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchActive, setSearchActive] = useState(false);
  const navigate = useNavigate();




// Define the URL
const url = 'http://localhost:3000/movies';
const location = useLocation();
useEffect(() => {
  if (location.state != null) {

    setMyValue(location.state.props);
  }
});

const toggleActive = () => {
  setSearchActive(false);
  // window.location.reload();
  setSearchQuery(''); // Clear the value of the input field
};

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

  const logout = () => {
    setUserData(prevUserData => ({
      ...prevUserData,
      token: null,
    }));
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate('/logout');
  } 

  const deleteMovie = async (ind) => {
    try {
      const response = await axios.delete(`http://localhost:3000/movies/${ind}`);
      window.location.reload();
    } catch (error) {
      alert(error);
    }
  }


  if (isAdmin) {
    return(
        <div class = "homeBody">
          <div class = "homeHeader">
            <h1>E-Cinema Booking</h1>
            <div class = "homeSearch">
              <select id="filter-dropdown">
                <option value="">Title</option>
              </select>
              <input type="text" id="myInput" placeholder="Search for Movies..." value={searchQuery} onChange={handleSearchInputChange}></input>
              <button onClick={handleSearch}>Search</button>
              {searchActive && 
                <button onClick={toggleActive}>Reset</button>
              }
            </div>
            <div class = "buttons">
                <Link to="/AdminPanel">
                  <button>Admin</button>
                </Link>
                <button onClick={logout}>Logout</button>
            </div>
          </div>
          <div class = "ManageMovieNowPlaying">
            <h1>Manage Movies</h1>
          </div>
          <div class = "ManageMovieButton"> 
          <Link to="/AddMovie"><button>Add Movie</button></Link>
          </div>
          <div class="homeListNowPlaying">
            <ul class="item-list">
              {searchActive && filteredMovies.map((location, index) => (
                  <li key={index} class="movie-card-container">
                    <div class="movie-card-wrapper">
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
                        />
                      <div class="button-group">
                        <button><Link to={`/editmovie/${location.id}`}  key={index}></Link>Edit</button>
                        <button onClick={() => deleteMovie(location.id)}>Delete</button>
                      </div>
                    </div>
                  </li>
                ))}
              {!searchActive && movieList.map((location, index) => (
                <li key={index} class="movie-card-container">
                  <div class="movie-card-wrapper">
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
                      />
                    <div class="button-group">
                    <Link to={`/editmovie/${location.id}`}  key={index}><button>Edit</button></Link>
                    <button onClick={() => deleteMovie(location.id)}>Delete</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
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

export default ManageMovie;