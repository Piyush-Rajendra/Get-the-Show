import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import '../css/HomePage/HomePage.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import SidebarPopup from './SidebarPopup';
import UserContext from "../context/UserContext";
import CardFactory from "../MainPage/CardFactory";


const HomePage = () => {

  const [myValue, setMyValue] = useState(false)
  const [searchQuery, setSearchQuery] = useState('');
  const [moviesPlayingNow, setMoviesPlayingNow] = useState([]);
  const [moviesComingSoon, setMoviesComingSoon] = useState([]);
  const [filteredPlayingNowMovies, setFilteredPlayingNowMovies] = useState([]);
  const [filteredComingSoonMovies, setFilteredComingSoonMovies] = useState([]);
  const [searchActive, setSearchActive] = useState(false);
  const { userData, setUserData } = useContext(UserContext);
  const isAdmin = localStorage.getItem('isAdmin');
  const [filter, setFilter] = useState("title"); // State to store the selected filter

  const navigate = useNavigate();
  const toggleActive = () => {
    setSearchActive(false);
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


const handleSearchInputChange = (event) => {
  setSearchQuery(event.target.value);
};
const handleSearch = async () => {
  // Filter movieList based on searchQuery
  const selectedFilter = document.getElementById('filter-dropdown').value;
  setSearchActive(true);
  let filtered;
  let filtered1;
  if (selectedFilter === 'category') {
    // Filter by category
    filtered = moviesPlayingNow.filter(movie =>
      movie.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    filtered1 = moviesComingSoon.filter(movie =>
      movie.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  } else if (selectedFilter === 'title') {
    // Filter by title or showDatesTimes (you can add more filters as needed)
    filtered = moviesPlayingNow.filter(movie =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    filtered1 = moviesComingSoon.filter(movie =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  } else if (selectedFilter === 'showDatesTimes') {
    // Filter by title or showDatesTimes (you can add more filters as needed)
    const filtering = await axios.get(`http://localhost:3000/moviesByQuery?date=${searchQuery}`);
    const currentDateTime = new Date();
      const nowPlayingMoviesNow = filtering.data.filter(movie => {
        const releaseDateTime = new Date(movie.releaseDate);
        const endDateTime = new Date(movie.end_date);
        return ((releaseDateTime <= currentDateTime)  && (movie.MovieStatus === "Released") && (endDateTime > currentDateTime));
      });
      const comingSoonMoviesComing = filtering.data.filter(movie => {
        const releaseDateTime = new Date(movie.releaseDate);
        const endDateTime = new Date(movie.end_date);
        return releaseDateTime > currentDateTime || (movie.MovieStatus === "Unreleased") || (endDateTime <= currentDateTime);
      });
    filtered = nowPlayingMoviesNow;
    filtered1 = comingSoonMoviesComing;
    
  }
  setFilteredPlayingNowMovies(filtered);
  setFilteredComingSoonMovies(filtered1);
};

const [isOpen, setIsOpen] = useState(false);

useEffect(() => {
  axios.get(url)
    .then(response => {
      // Handle successful response
      setMovieList(response.data);
      const currentDateTime = new Date();
      const nowPlayingMovies = response.data.filter(movie => {
        const releaseDateTime = new Date(movie.releaseDate);
        const endDateTime = new Date(movie.end_date);
        return ((releaseDateTime <= currentDateTime)  && (movie.MovieStatus === "Released") && (endDateTime > currentDateTime));
      });
      const comingSoonMovies = response.data.filter(movie => {
        const releaseDateTime = new Date(movie.releaseDate);
        const endDateTime = new Date(movie.end_date);
        return releaseDateTime > currentDateTime || (movie.MovieStatus === "Unreleased") || (endDateTime <= currentDateTime);
      });
      setMoviesPlayingNow(nowPlayingMovies);
      setMoviesComingSoon(comingSoonMovies);
    })
    .catch(error => {
      // Handle error
      alert(error);
    });
}, []); 

  const [movieList, setMovieList] = useState([]);

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

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setSearchQuery('');
  };

    return(
        <div class = "homeBody">
          <div class = "homeHeader">
            <h1>E-Cinema Booking</h1>
            <div class = "homeSearch">
              <select id="filter-dropdown" value={filter} onChange={handleFilterChange}>
                <option value="title">Title</option>
                <option value="category">Category</option>
                <option value="showDatesTimes">Show Date</option>
              </select>
              {filter === "showDatesTimes" ? (
              <input 
                type="date" 
                id="myInput" 
                value={searchQuery} 
                onChange={handleSearchInputChange}
                min={new Date().toISOString().split('T')[0]}
              />
              ) : (
                <input 
                  type="text" 
                  id="myInput" 
                  placeholder="Search for Movies..." 
                  value={searchQuery} 
                  onChange={handleSearchInputChange}
                />
              )}
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
              {userData.token && !isAdmin &&
               <button className="hambugerMainPage" onClick={toggleSidebar}>&#8801;</button> 
              }
              {userData.token && !isAdmin &&
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
              {searchActive && filteredPlayingNowMovies.map((location, index) => (
                  <Link to={`/movieview/${location.id}`}  key={index}>
                    <CardFactory
                      type="movie" 
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
                </Link>
                ))}
                {!searchActive && moviesPlayingNow.map((location, index) => (
                  <Link to={`/movieview/${location.id}`}  key={index}>
                    <CardFactory
                      type="movie" 
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
              {searchActive && filteredComingSoonMovies.map((location) => (
                  <Link to={`/movieview/${location.id}`}  >
                    <CardFactory
                      type="movie" 
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
                </Link>
                ))}
                {!searchActive && moviesComingSoon.map((location) => (
                  <Link to={`/movieview/${location.id}`}  >
                    <CardFactory
                      type="movie" 
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