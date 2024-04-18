import React, { useContext } from "react";
import { useState, useEffect } from "react";
import './../css/LoginRegister/Login.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

const AddAdmin = () => {
  const [displayText, setDisplayText] = useState(
    "Please enter the new movie's show times"
  );

  const [showTimes, setShowTimes] = useState([]);
  const { title } = useParams();
  
  const [time, setTime] = useState('');
  const [id, setId] = useState('');

  const [userInput, setUserInput] = useState({
    startAt: "",
    startDate: "null",
    endDate: "null",
    movieId: ""
  })
    const navigate = useNavigate();

 
    useEffect(() => {
        const fetchShowtimesData = async () => {
          try {
            const resp = await axios.get(`http://localhost:3000/movieByName/${title}`);
            setId(resp.data.id);
            setUserInput({
                startAt: "",
                startDate: "null",
                endDate: "null",
                movieId: resp.data.id
            });
            console.log(userInput);
            // const response = await axios.get(`http://localhost:3000/showtimes/${id}`);
            // setShowTimes(response.data);
          } catch (error) {
            alert(error);
          }
        };

        fetchShowtimesData();
      }, [id]); 

    const handleTimeChange = (e) => {
        const inputValue = e.target.value;
        // const formattedTime = validateAndFormatTime(inputValue);
        setTime(inputValue);
      };
    
    const validateAndFormatTime = (inputValue) => {
    // Regular expression to validate time in HH:MM format (24-hour)
    const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (timePattern.test(inputValue)) {
        return inputValue;
    } else {
        return '';
    }
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInput({...userInput, [name]: value + ':00' });
      };

   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:3000/showTimes', userInput)
        const response1 = await axios.get(`http://localhost:3000/showtimes/${id}`);
        setShowTimes(response1.data);
        setUserInput({
            startAt: "",
            startDate: "null",
            endDate: "null",
            movieId: id
        })
    } catch (error) {
      alert(error);
    }
  };

    return (
    <div class = "background">
          <hr></hr>
          
          <Link to="/ManageMovie"><button class="register-button">Manage Movies</button></Link>
          <h2 class="register">Add Show Times</h2>
        <div className="center">
        <div class="formcontainer">
          <form className ="forms-reset" onSubmit={handleSubmit}>
            <h3 style={{ textAlign: 'center' }}>{displayText}</h3>
            <label class="forms-label">
              Enter Time: 
            </label>
              <input class="forms-input"
                type="time"
                name="startAt"
                value={userInput.startAt}
                onChange={handleChange}
                required
              /> 
            <br/>    
            <button type="submit" className="reset-button">Add Show Time</button>            
          </form>
      </div>
      </div>
    </div>
    )
  }

  export default AddAdmin;