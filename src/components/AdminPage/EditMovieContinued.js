import React, { useContext } from "react";
import { useState, useEffect } from "react";
import './../css/LoginRegister/Login.css';
import './../css/MovieView/MovieView.css'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import myImage from './deleteicon.png'; // Import the image file

const EditMovieContinued = () => {
  const [displayText, setDisplayText] = useState(
    "Please enter the new movie's show times"
  );

  

  const {id} = useParams();
  const [showTimes, setShowTimes] = useState([]);
  
  const [time, setTime] = useState('');

  const [userInput, setUserInput] = useState({
    startAt: "",
    startDate: "null",
    endDate: "null",
    movieId: id
  })
    const navigate = useNavigate();

 
    useEffect(() => {
        const fetchShowtimesData = async () => {
          try {
            const resp = await axios.get(`http://localhost:3000/showtimes/${id}`);
            setShowTimes(resp.data);
            // console.log(showTimes);
            // const response = await axios.get(`http://localhost:3000/showtimes/${id}`);
            // setShowTimes(response.data);
          } catch (error) {
            alert(error);
          }
        };
        fetchShowtimesData();
      }, [id, showTimes]); 

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

        const response = await axios.post('http://localhost:3000/showTimes', userInput);
        // const response1 = await axios.get(`http://localhost:3000/showtimes/${id}`);
        // window.location.reload();
        // setShowTimes(response1.data);
        setUserInput({
            startAt: "",
            startDate: "null",
            endDate: "null",
            movieId: id
        })
        // console.log(showTimes);
    } catch(error ) {
        if (error.response && error.response.status === 500) {
            // Server error
            const errorMessage = error.response.data.error;
            alert(errorMessage);
        } else {
            // Other errors
            console.error('Error submitting form:', error);
            // Handle the error here, e.g., show an error message to the user
        }
    };
  };

  const showTheTimes = async () => {
    const help = await axios.get(`http://localhost:3000/showtimes/${id}`);
  }

  function formatTime(timeString) {
    const time = new Date(`1970-01-01T${timeString}`);
    let hours = time.getHours();
    const minutes = time.getMinutes();
    const period = hours < 12 ? 'A.M.' : 'P.M.';

    // Convert hours to 12-hour format
    hours = hours % 12 || 12;

    // Ensure two-digit format for minutes
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${formattedMinutes} ${period}`;
}

    const deleteTime = async (del) => {
        try {
        const response = await axios.delete(`http://localhost:3000/showtimes/${del}`);
        } catch (error) {
            alert(error);
        }
    }

    // const getStuff = async () => {
    //     try {
    //     const res = await axios.get(`http://localhost:3000/showtimes/${id}`);
    //     return res;
    //     } catch (error) {
    //         alert(error);
    //     }
    // }

    return (
    <div class = "background">
          <hr></hr>
          <Link to="/ManageMovie"><button class="register-button">Manage Movies</button></Link>
          <h2 class="register">Edit Show Times</h2>
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
               
               
            <button type="submit" className="reset-button">Add Show Time</button>            
          </form>
          
      </div>
      </div>
      {/* <div> 
      {showTimes.map((showtime, index) => (
                    <h4 className="showtime" style={{ alignItems: 'center' }}>
                        {formatTime(showtime.startAt)} <br></br>
                    <button onClick={() => deleteTime(showtime.id)}>Delete</button>
                    <button onClick={() => deleteTime(showtime.id)}>Edit</button>
                    </h4>
            ))}  
            </div> */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
    {showTimes.map((showtime, index) => (
        <div key={index} style={{ width: '20%', padding: '10px', boxSizing: 'border-box', textAlign: 'center' }}>
            <h4 className="showtime">{formatTime(showtime.startAt)}</h4>
            <button onClick={() => deleteTime(showtime.id)}>Delete</button>
            <Link to={`/edittime/${showtime.id}`}><button>Edit</button></Link>
        </div>
    ))}
</div>
    </div>
    )
  }

  export default EditMovieContinued;