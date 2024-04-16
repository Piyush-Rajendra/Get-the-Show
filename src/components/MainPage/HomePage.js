import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import '../css/HomePage/HomePage.css';
import MovieCard from './MovieCard';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import SidebarPopup from './SidebarPopup';
import UserContext from "../context/UserContext";


const HomePage = ({props}) => {
  //const { userData } = useContext(UserContext);
  //<h1>{userData.userName}</h1>
  //<h1>{localstoage.getItem("username")}</h1>
  const [myValue, setMyValue] = useState(false)
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchActive, setSearchActive] = useState(false);
  const { userData, setUserData } = useContext(UserContext);
  const [token, setToken] = useState()
  const isAdmin = localStorage.getItem('isAdmin');



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

  const logout = () => {
    setUserData(prevUserData => ({
      ...prevUserData,
      token: null,
    }));
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate('/logout');
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
                <option value="title">Title</option>
                <option value="category">Category</option>
                <option value="showDatesTimes">Show Date</option>
              </select>
              <input type="text" id="myInput" placeholder="Search for Movies..." value={searchQuery} onChange={handleSearchInputChange}></input>
              <button onClick={handleSearch}>Search</button>
              {searchActive && 
                <button onClick={toggleActive}>Reset</button>
              }
            </div>
            <div class = "buttons">
              {!userData.token &&
                <Link to="/Login">
                  <button>Login</button>
                </Link>
              }
              {userData.token && 
                  <button onClick={logout}>Logout</button>
              }
              {isAdmin &&
                <Link to="/AdminPanel">
                  <button>Admin</button>
                </Link>
              }
              {userData.token &&
               <button className="hambugerMainPage" onClick={toggleSidebar}>&#8801;</button> 
              }
              {userData.token && 
                <SidebarPopup isOpen={isOpen} onClose={toggleSidebar} />
              }
              <div>

              </div>
              
            </div>
          </div>
          <div class = "homeNowPlaying">
            <h1>Now Playing</h1>
          </div>
          <div class="homeListNowPlaying">
            <ul class="item-list">
              <li class="movie-card-container">
              {searchActive && filteredMovies.slice(0, movieList.length/2).map((location, index) => (
                  <Link to={`/movieview/${location.id}`}  key={index}>
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
                {!searchActive && movieList.slice(0, movieList.length/2).map((location, index) => (
                  <Link to={`/movieview/${location.id}`}  key={index}>
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
                  <Link to={`/movieview/${location.id}`}  >
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
                  <Link to={`/movieview/${location.id}`}  >
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