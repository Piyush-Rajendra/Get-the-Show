import React from "react";
import { Link } from 'react-router-dom';
import { useState, useContext } from "react";
import '../css/AdminPage/ManageMovie.css'
import UserCard from "../MainPage/UserCard";
import axios from 'axios';
import {useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';

const ManageUser = () => {

  const [userList, setUserList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchActive, setSearchActive] = useState(false);

  const navigate = useNavigate();
  const changeHome = () => {
      navigate('/');
  }

  const toggleActive = () => {
    setSearchActive(false);
    // window.location.reload();
    setSearchQuery(''); // Clear the value of the input field
  };
  const url = 'http://localhost:3000/users';
  useEffect(() => {
    axios.get(url)
      .then(response => {
        // Handle successful response
        setUserList(response.data);
        console.log('Data:', response.data);
      })
      .catch(error => {
        // Handle error
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleSearch = () => {
    // Filter movieList based on searchQuery
    setSearchActive(true);
    const filtered = userList.filter(user =>
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

    return(
        <div class = "homeBody">
          <div class = "homeHeader">
            <h1>E-Cinema Booking</h1>
            <div class = "homeSearch">
              <select id="filter-dropdown">
                <option value="fullName">Name</option>
                <option value="username">Username</option>
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
                <button onClick={changeHome}>Logout</button>
            </div>
          </div>
          <div class = "ManageMovieNowPlaying">
            <h1>Manage Users</h1>
          </div>
          <div class="homeListNowPlaying">
            <ul class="item-list">
            {searchActive && filteredUsers.map((location, index) => (
                  <li key={index} class="movie-card-container">
                    <div class="movie-card-wrapper">
                      <UserCard 
                          fullName={location.fullName}
                          userName={location.username}
                          age={location.age}
                          email={location.email}
                          profilePhoto={location.profilePhoto}
                          paymentInfo={location.paymentInfo}
                        />
                      <div class="button-group">
                        <button>Edit</button>
                        <button>Delete</button>
                      </div>
                    </div>
                  </li>
                ))}
              {!searchActive && userList.map((location, index) => (
                <li key={index} class="movie-card-container">
                  <div class="movie-card-wrapper">
                    <UserCard 
                          fullName={location.fullName}
                          userName={location.username}
                          age={location.age}
                          email={location.email}
                          profilePhoto={location.profilePhoto}
                          paymentInfo={location.paymentInfo}
                        />
                    <div class="button-group">
                      <button>Edit</button>
                      <button>Delete</button>
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

export default ManageUser;