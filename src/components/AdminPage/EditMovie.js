import React, { useState, useEffect, useContext} from "react";
import '../css/MovieView/MovieView.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import EmbeddedVideo from "../EmbeddedVideo";
import UserContext from "../context/UserContext";


const EditMovie = ({ onSubmit }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { userData, setUserData } = useContext(UserContext);const [displayText, setDisplayText] = useState(
      "This will edit the current movie for users to see"
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
        end_date: '',
        MovieStatus: ''
    });

    function stringToArray(inputString) {
        // Split the input string by comma and space
        const items = inputString.split(", ");
        // Return the resulting array
        return items;
    }

    const [showtimesArray, setShowtimesArray] = useState([]);
    const [castArray, setCastArray] = useState([]);

    function formatDate(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return ''; // Return empty string for invalid date
      }
      // Adjust date to UTC timezone
      const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
      const year = utcDate.getFullYear();
      let month = utcDate.getMonth() + 1;
      if (month < 10) {
        month = `0${month}`;
      }
      let day = utcDate.getDate();
      if (day < 10) {
        day = `0${day}`;
      }
      return `${year}-${month}-${day}`;
    }

      useEffect(() => {
          const fetchMovieData = async () => {
            try {
              const response = await axios.get(`http://localhost:3000/moviesById/${id}`);
              setMovie({
                  title: response.data.title,
                  trailerPicture: response.data.trailerPicture,
                  category: response.data.category,
                  mpaaRating: response.data.mpaaRating,
                  director: response.data.director,
                  producer: response.data.producer,
                  trailerVideo: response.data.trailerVideo,
                  synopsis: response.data.synopsis,
                  releaseDate: response.data.releaseDate,
                  cast: response.data.cast,
                  posterBase64: response.data.posterBase64,
                  end_date: response.data.end_date,
                  MovieStatus: response.data.MovieStatus
              });
            } catch (error) {
              alert(error);  
            }
          };
      
          fetchMovieData();
        }, [id, showtimesArray, castArray]);

      
        const handleChange = (e) => {
          const { name, value } = e.target;
          setMovie({ ...movie, [name]: value });
        };
      
        const handleSubmit = async (e) => {
          e.preventDefault();
          try {
          const response = await axios.put(`http://localhost:3000/movie/${id}`, movie);
          setDisplayText("Movie has been edited!");
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
            end_date: '',
            MovieStatus: ''
        });
          navigate(`/editmoviecontinued/${id}`, { state: { props: true } });
        }, 1000);
        } catch (error) {
          alert(error);
        }
        };

    const handleFileChange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = `data:${file.type};base64,${reader.result.split(',')[1]}`;
        setMovie({ ...movie, posterBase64: base64 });
      };
      reader.readAsDataURL(file);
    };

      return (
      <div className="centerFormRegister">  
      <div className="containerForm">
        <div className="containerFormEditMovieAdminister">
          <Link to="/ManageMovie">
            <button className="backButtonForgotEditMovieAdmin">Back</button>
          </Link>   
          <h2 class="register">Edit Movie</h2>
        </div>
      <h3 style={{ color: '#FF6666', textAlign: "center" }}>{displayText}</h3>
        <form className="bodyRegisterFormMovie" onSubmit={handleSubmit}>
        <div>
          {/* <h2>Movie Information</h2> */}
          <div className="form-group">
            <label>Title: </label>
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
            <input className="forms-inputRegister"
                  type="text"
                  name="director"
                  value={movie.director}
                  onChange={handleChange}
                  required
                />
          </div>
           <div className="form-group">
            <label>Release Date for Showings: </label>
            <input className="forms-inputRegister"
                type="date"
                pattern="\d{4}-\d{2}-\d{2}"
                name="releaseDate"
                value={formatDate(movie.releaseDate)}
                onChange={handleChange}
                // min={new Date().toISOString().split('T')[0]}
                required
              />
          </div>
        <div className="form-group">
          <label>End Date for Showings: </label>
          <br></br>
          <input className="forms-inputRegister"
                type="date"
                name="end_date"
                value={formatDate(movie.end_date)}
                onChange={handleChange}
                min={formatDate(movie.releaseDate)}
                required
              />
        </div>
          <div className="form-group">
            <label>Movie Status (Released or Unreleased): </label>
            <br />
            <select
              className="releasedOrUnreleasedEditMovie"
              name="MovieStatus"
              placeholder="Choose"
              value={movie.MovieStatus}
              onChange={handleChange}
              required
            >
              <option value="Released">Released</option>
              <option value="Unreleased">Unreleased</option>
            </select>
          </div>     
        <div className="form-group">    
          <button className="registerButtonRegister" type="submit">Submit</button>
        </div>   
      </div>
      
        <div>
          {/* <h2>More Movie Information</h2> */}
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
            <input className="forms-inputRegister"
                type="text"
                name="trailerVideo"
                value={movie.trailerVideo}
                onChange={handleChange}
                required
              />
          </div>
          <div className="form-group">
            <label>MPAA Rating: </label><div></div>
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
            <label>Movie Poster:</label>
            <input
              className="forms-inputRegister"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          {/* <div className="form-group">
            <label>Director: </label>
            <br></br>
            <input className="forms-inputRegister"
                  type="text"
                  name="director"
                  value={movie.director}
                  onChange={handleChange}
                  required
                />
          </div> */}
          {/* <div className="form-group">
            <label>Show Dates and Times</label>
            <input className="forms-inputRegister"
                type="text"
                name="showDatesTimes"
                value={movie.showDatesTimes}
                onChange={handleChange}
                placeholder="xxxx/xx/xx @ xx:xx A.M./P.M., ..."
                required
              />
              
          </div> */}
          <div className="fillInSpaceRegister">
          </div>
        </div> 
        
        </form> 
        </div>
    </div>
    );
  };
  export default EditMovie;