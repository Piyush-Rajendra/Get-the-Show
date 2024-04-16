import React, { useState, useEffect, useContext} from "react";
import '../css/MovieView/MovieView.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import EmbeddedVideo from "../EmbeddedVideo";
import UserContext from "../context/UserContext";


const EditUser = ({ onSubmit }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { userData, setUserData } = useContext(UserContext);
    const [displayText, setDisplayText] = useState(
      "This will edit the current user's profile"
    );

    const [user, setUser] = useState({
        username: '',
        profilePhoto: '',
        fullName: '',
        street: '',
        state: '',
        zipCode: '',
        city: '',
        phoneNumber: ''
    });


    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const response = await axios.get(`http://localhost:3000/users/${id}`);
            console.log(response);
            setUser({
                username: response.data.userInfo[0].username,
                profilePhoto: response.data.userInfo[0].profilePhoto,
                fullName: response.data.userInfo[0].fullName,
                street: response.data.userInfo[0].street,
                state: response.data.userInfo[0].state,
                zipCode: response.data.userInfo[0].zipCode,
                city: response.data.userInfo[0].city,
                phoneNumber: response.data.userInfo[0].phoneNumber
            });

          } catch (error) {
            alert(error)          }
        };
        fetchUserData();
      }, [id]);

    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const response = await axios.put(`http://localhost:3000/users/${id}`, user);
        setDisplayText("User has been updated!");
        setTimeout(() => {
        setUser({
            username: '',
            profilePhoto: '',
            fullName: '',
            street: '',
            state: '',
            zipCode: '',
            city: '',
            phoneNumber: ''
      });
        navigate("/ManageUser", { state: { props: true } });
      }, 1000);
      } catch (error) {
        alert(error);
      }
      };
    return (
        <div className="centerFormRegister">  
    <div className="containerForm">
    <h2 class="register">Edit User</h2>
    <h3 style={{ color: '#FF6666', textAlign: "center" }}>{displayText}</h3>
      <form className="bodyRegisterFormUser" onSubmit={handleSubmit}>
      <div>
        <h2>User Information</h2>
             <div className="form-group">
           <label>Username: </label>
           <input className="forms-inputRegister"
                type="text"
                name="username"
                value={user.username}
                onChange={handleChange}
                required
              />
        </div>
        <div className="form-group">
          <label>Profile Photo (URL): </label>
          <input className="forms-inputRegister"
                type="text"
                name="profilePhoto"
                value={user.profilePhoto}
                onChange={handleChange}
                required
              />
        </div>
        <div className="form-group">
          <label>Full Name: </label>
          <input className="forms-inputRegister"
                type="text"
                name="fullName"
                value={user.fullName}
                onChange={handleChange}
                required
              />
        </div>
        <div className="form-group">    
          <button className="registerButtonRegister" type="submit">Submit</button>
        </div>          
    </div>
    
      <div>
      <div className="form-group">
          <label>Street: </label>
          <input className="forms-inputRegister"
                type="text"
                name="street"
                value={user.street}
                onChange={handleChange}
                required
              />
        </div>
        <div className="form-group">
          <label>City: </label>
          <input className="forms-inputRegister"
                type="text"
                name="city"
                value={user.city}
                onChange={handleChange}
                required
              />
        </div>
             <div className="form-group">
          <label>State: </label>
          <input className="forms-inputRegister"
                type="text"
                name="state"
                value={user.state}
                onChange={handleChange}
                required
              />
        </div>
        <div className="form-group">
          <label>Phone Number: </label>
          <input className="forms-inputRegister"
                type="text"
                name="phoneNumber"
                value={user.phoneNumber}
                onChange={handleChange}
                required
              />
        </div>
        </div>
        <div className="fillInSpaceRegister"></div>
      </form>
      </div>
  </div>
  );
};
export default EditUser;