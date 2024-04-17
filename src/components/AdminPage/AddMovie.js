import React, { useState, useEffect, useContext} from "react";
import '../css/MovieView/MovieView.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import EmbeddedVideo from "../EmbeddedVideo";
import UserContext from "../context/UserContext";


const AddMovie = ({ onSubmit }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [displayText, setDisplayText] = useState(
        "This will add a new movie to be displayed for users"
      );

    const [movie, setMovie] = useState({
        title:'',
        trailerPicture:'',
        category:'',
        mpaaRating:'',
        director:'',
        producer:'',
        trailerVideo:'',
        synopsis:'',
        rating:'',  
        releaseDate: '',
        cast: '',
        posterBase64: '',
        showTimesDates: '',
        end_date: ''
    });

    function stringToArray(inputString) {
        // Split the input string by comma and space
        const items = inputString.split(", ");
        // Return the resulting array
        return items;
    }

    const [showtimesArray, setShowtimesArray] = useState([]);
    const [castArray, setCastArray] = useState([]);
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setMovie({ ...movie, [name]: value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const response = await axios.post("http://localhost:3000/movies", movie);
        setDisplayText("Movie has been added!");
        setTimeout(() => {
        setMovie({
          title:'',
          trailerPicture:'',
          category:'',
          mpaaRating:'',
          director:'',
          producer:'',
          trailerVideo:'',
          synopsis:'',
          rating:'',  
          releaseDate: '',
          cast: '',
          posterBase64: '',
          showTimesDates: '',
          end_date: ''
      });
            // Code to be executed after 2 seconds
          
        navigate("/ManageMovie", { state: { props: true } });
    }, 1000);
      } catch (error) {
        console.error('Edit Movie failed', error);
        alert(error);
      }
      };
    return (
    <div className="centerFormRegister">  
    <div className="containerForm">
    <h2 class="register">Add Movie</h2>
    <h3 style={{ color: '#FF6666', textAlign: "center" }}>{displayText}</h3>
      <form className="bodyRegisterForm" onSubmit={handleSubmit}>
      <div>
        {/* <h2>Movie Information</h2> */}
        <div className="form-group">
          <label>Title: </label>
          <br></br>
          <input className="forms-inputRegister"
                type="text"
                name="title"
                value={movie.title}
                onChange={handleChange}
                required
              />
        </div>
        <div className="form-group">
          <label>Category: </label>
          <br></br>
          <input className="forms-inputRegister"
                type="text"
                name="category"
                value={movie.category}
                onChange={handleChange}
                required
              />
        </div>
        <div className="form-group">
          <label>cast: </label>
          <br></br>
          <input className="forms-inputRegister"
                type="text"
                name="cast"
                value={movie.cast}
                onChange={handleChange}
                required
              />
        </div>
        <div className="form-group">
          <label>Director: </label>
          <br></br>
          <input className="forms-inputRegister"
                type="text"
                name="director"
                value={movie.director}
                onChange={handleChange}
                required
              />
        </div>
        <div className="form-group">
          <label>Release Date For Showings: </label>
          <br></br>
          <input className="forms-inputRegister"
              type="date"
              name="releaseDate"
              value={movie.releaseDate}
              onChange={handleChange}
              required
            />
        </div>
        <div className="form-group">
          <label>End Date for Showings: </label>
          <br></br>
          <input className="forms-inputRegister"
                type="date"
                name="end_date"
                value={movie.end_date}
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
          <label>Synopsis: </label>
          <br></br>
          <input className="forms-inputRegister"
              type="text"
              name="synopsis"
              value={movie.synopsis}
              onChange={handleChange}
              required
            />
        </div>
        <div className="form-group">
          <label>Trailer Picture (link/url): </label>
          <br></br>
          <input className="forms-inputRegister"
              type="text"
              name="trailerPicture"
              value={movie.trailerPicture}
              onChange={handleChange}
              required
            />
        </div>
        <div className="form-group">
          <label>Trailer Video (link/url): </label>
          <br></br>
          <input className="forms-inputRegister"
              type="text"
              name="trailerVideo"
              value={movie.trailerVideo}
              onChange={handleChange}
              required
            />
        </div>
        <div className="form-group">
          <label>mpaa Rating: </label>
          <br></br>
          <input className="forms-inputRegister"
              type="text"
              name="mpaaRating"
              value={movie.mpaaRating}
              onChange={handleChange}
              required
            />
        </div>
        <div className="form-group">
          <label>Producer: </label>
          <br></br>
          <input className="forms-inputRegister"
                type="text"
                name="producer"
                value={movie.producer}
                onChange={handleChange}
                required
              />
        </div>
        <div className="form-group">
          <label>Movie Poster (Base 64 format)</label>
          <br></br>
          <input className="forms-inputRegister"
              type="text"
              name="posterBase64"
              value={movie.posterBase64}
              onChange={handleChange}
              required
            />
        </div>
        <div className="form-group">
          <label>Show Dates and Times</label>
          <br></br>
          <input className="forms-inputRegister"
              type="text"
              name="showDatesTimes"
              value={movie.showDatesTimes}
              onChange={handleChange}
              placeholder="xxxx/xx/xx @ xx:xx A.M./P.M., ..."
              required
            />
        </div>
        <div className="fillInSpaceRegister"></div>
      </div> 
      </form>
      </div>
  </div>
  );
};
export default AddMovie;