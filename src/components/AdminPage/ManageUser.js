import React from "react";
import { Link } from 'react-router-dom';
import { useState, useContext } from "react";
import '../css/AdminPage/ManageMovie.css';
import '../css/AdminPage/ManageUser.css';
import UserCard from "../MainPage/UserCard";
import axios from 'axios';
import {useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import UserContext from "../context/UserContext";

const ManageUser = () => {

  const [suspended, setSuspended] = useState('');
  const [userList, setUserList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchActive, setSearchActive] = useState(false);
  const isAdmin = localStorage.getItem('isAdmin');
  const { userData, setUserData } = useContext(UserContext);

  const navigate = useNavigate();
  const logout = () => {
    setUserData(prevUserData => ({
      ...prevUserData,
      token: null,
    }));
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate('/logout');
  } 

  const toggleActive = () => {
    setSearchActive(false);
    // window.location.reload();
    setSearchQuery(''); // Clear the value of the input field
  };
  const url = 'http://localhost:3000/users';
  const url1 = 'http://localhost:3000/admin/users';
  useEffect(() => {
    axios.get(url)
      .then(response => {
        // Handle successful response
        setUserList(response.data);
      })
      .catch(error => {
        // Handle error
        alert(error);
      });
  }, []);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleSearch = () => {
    // Filter movieList based on searchQuery
    setSearchActive(true);
    const filtered = userList.filter(user =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const deleteUser = async (ind) => {
    try {
      const response = await axios.delete(`http://localhost:3000/deleteUser/${ind}`);
      window.location.reload();
    } catch (error) {
      alert(error);
    }
  }

  const suspendUser = async (ind) => {
    try {
      const response = await axios.put(`http://localhost:3000/suspend/${ind}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }


  if (isAdmin) {
    return(
        <div class = "homeBody">
          <div class = "homeHeader">
            <h1>E-Cinema Booking</h1>
            <div class = "homeSearch">
              <input type="text" id="myInput" placeholder="Search For User By username..." value={searchQuery} onChange={handleSearchInputChange}></input>
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
            <h1>Manage Users</h1>
          </div>
          <div class = "ManageMovieButton"> 
          <Link to="/addadmin"><button>Add Admin</button></Link>
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
                    <div class="button-group-user">
                      <Link to={`/edituser/${location.id}`}  key={index}><button>Edit</button></Link>
                      {console.log(location.suspendStatus)}
                      {location.SuspendStatus === "not_suspended" && 
                      <button onClick={() => suspendUser(location.id)}>Suspend</button>
                      }
                      {location.SuspendStatus !== "not_suspended" && 
                      <button onClick={() => suspendUser(location.id)}>Unsuspend</button>
                      }
                      <button onClick={() => deleteUser(location.id)}>Delete</button>
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
                    <div class="button-group-user">
                      <Link to={`/edituser/${location.id}`}  key={index}><button>Edit</button></Link>
                      {console.log(location.suspendStatus)}
                      {location.SuspendStatus === "not_suspended" && 
                      <button onClick={() => suspendUser(location.id)}>Suspend</button>
                      }
                      {location.SuspendStatus !== "not_suspended" && 
                      <button onClick={() => suspendUser(location.id)}>Unsuspend</button>
                      }
                      <button onClick={() => deleteUser(location.id)}>Delete</button>
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
}

export default ManageUser;