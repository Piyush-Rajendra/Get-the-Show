import React, { useState, useEffect, useContext} from "react";
import '../css/MovieView/MovieView.css';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from "axios";
import EmbeddedVideo from "../EmbeddedVideo";

const MovieView = () => {
    const { id } = useParams();
    const navigate = useNavigate();


    const [username, setUsername] = useState();
    const [review, setReview] = useState([]);
    const [comment, setComment] = useState();
    const [showtimes, setShowtimes] = useState([]);
    const [date, setDate] = useState();

    useEffect(() => {
        const username = localStorage.getItem('username');
        setUsername(username);
    
      }, []);
    const [movie, setMovie] = useState({
        title:'',
        poster:'',
        category:'',
        ageRating:'',
        director:'',
        producer:'',
        base64: '',
        trailer:'',
        synopsis:'',
        rating:'',  
        showtimes: '',
        reviews: [],
        cast: ''
    });

    function stringToArray(inputString) {
        const items = inputString.split(", ");
        return items;
    }

    const [showtimesArray, setShowtimesArray] = useState([]);
    const [castArray, setCastArray] = useState([]);

    useEffect(() => {
        const fetchMovieData = async () => {
          try {
            const response = await axios.get(`http://localhost:3000/moviesById/${id}`);
            setMovie({
                title: response.data.title,
                poster: response.data.trailerPicture,
                category: response.data.category,
                ageRating: response.data.mpaaRating,
                director: response.data.director,
                producer: response.data.producer,
                trailer: response.data.trailerVideo,
                synopsis: response.data.synopsis,
                base64: response.data.posterBase64,
                rating: 4.5,
                showtimes: response.data.showDatesTimes,
                cast: response.data.cast,
                releaseDate: response.data.releaseDate,
                endDate: response.data.end_date
            });
            setShowtimesArray(stringToArray(movie.showtimes));
            setCastArray(stringToArray(movie.cast));
          } catch (error) {
            
          }
        };
    
        fetchMovieData();
      }, [id, showtimesArray, castArray]);

      useEffect(() => {
        const fetchShowtimesData = async () => {
          try {
            const response = await axios.get(`http://localhost:3000/showtimes/${id}`);
            setShowtimes(response.data);
            
          } catch (error) {
            console.error('Error fetching review data:', error);
          }
        };
    
        fetchShowtimesData();
      }, [id]);

      useEffect(() => {
        const fetchReviewData = async () => {
          try {
            const response = await axios.get(`http://localhost:3000/reviews/${id}`);
            setReview(response.data);
            
          } catch (error) {
            
          }
        };
    
        fetchReviewData();
      }, [id, review]);

      const handleSubmit = (event) => {
        event.preventDefault();
        try {
            const commentData = {
                movie_id: id,
                username: username,
                review: comment
            }
            axios.post('http://localhost:3000/reviews', commentData); 
            alert("Comment added!");
          } catch (error) {
            alert('Error submitting form: ' + error);
          }
          setComment('');


      };

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
    
    
      const handleChange = (event) => {
        setComment(event.target.value);
      };

      const handleCalenderChange = (event) => {
        setDate(event.target.value);
      };

    const navigateHome = () => {
        navigate('/');
    }

    return (
        <div className="page">
            <Link to="/">
            <button className="backButtonMoviewDetailView">Back</button>
            </Link>   
            <div id="title-logo">
                <h1>E-Cinema Booking</h1>
            </div>
            <div className="three-containers">
                <div id="column-one" className="view-page-column">
                {movie.base64 ? (
                        <img src={movie.base64} width="250" alt="Base64 Image" />
                        ) : (
                        <p>No valid base64 string provided</p>
                        )}
                    <div id="whole-info-container">
                    <div id="center-movie-title">
                    <h2 id="movie-title">{movie.title}</h2>
                    </div>
                    <div id="info-container">
                    <div id="movie-info">
                        <h3>{movie.category}</h3>
                        <h3>Rated: {movie.ageRating}</h3>
                        <h3>Director: {movie.director}</h3>
                        <h3>Prodcuer: {movie.producer}</h3>
                    </div>
                    </div>
                    </div>
                </div>
                <div id="column-two" className="view-page-column">
                    <h3 id="watch-trailer" className="red">Watch Trailer</h3>
                    <div id="video">
                    <EmbeddedVideo videoUrl={movie.trailer} />
                    </div>
                    <h3 className="red">Showtimes</h3>
                    <h5 className="white">Click to purchase tickets:</h5>
                    <input
                        type="date"
                        value={date}
                        onChange={handleCalenderChange}
                        placeholder="Pick date here..."
                        min={formatDate(movie.releaseDate)}
                        max={formatDate(movie.endDate)}
                    />
                    <br></br>
                    <div id="showtime-container">
                    {date && (
                        <div id="showtimes">
                            {showtimes.map((showtime, index) => (
                                <Link 
                                    to={`/tickets?showtime=${date}&title=${movie.title}&time=${showtime.startAt}&id=${id}&showid=${showtime.id}`} 
                                    className="componenetLink" 
                                    key={index} // Move key to Link component
                            
                                >
                                    <h4 className="showtime">
                                        {formatTime(showtime.startAt)} 
                                    </h4>
                                </Link>
                            ))}
                        </div>
                        )}
                <div id="review-container">
                    <h3 className="red" id="review-title">Reviews</h3>
                    {review.map((review, index) => (
                    <h5 className="review-single" key={index}>
                        <div id="comment">{review.username}: {review.review}</div>
                    </h5>
                ))}
                <h5><u>Leave a comment: </u></h5>
                <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={comment}
                    onChange={handleChange}
                    placeholder="Enter text here..."
                />
                <button type="submit">Submit</button>
                </form>

                </div>
                </div>
                </div>
                <div id="column-three" className="view-page-column">
                    <h3 id="synopsis-title" className="red">Synopsis</h3>
                    <h4 id="synopsis-info" className="white">
                        <p>
                            {movie.synopsis}
                        </p>
                    </h4>
                    <h3 id="cast-title" className="red">Cast</h3>
                    <div id="the-cast">
                    {castArray.map((cast, index) => (
                    <h4 className="cast-member" key={index}>
                        {cast} 
                    </h4>
                ))}

                    </div>
                </div>
            </div>
        </div>
    );

}

export default MovieView; 
