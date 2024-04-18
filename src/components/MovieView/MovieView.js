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
                reviews: ["It was kind of mid", "Another Sony Pictures stinker", "My five year old really enjoyed it", "Awful"],
                cast: response.data.cast
            });
            setShowtimesArray(stringToArray(movie.showtimes));
            setCastArray(stringToArray(movie.cast));
          } catch (error) {
            
          }
        };
    
        fetchMovieData();
      }, [id, showtimesArray, castArray]);

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
    
      const handleChange = (event) => {
        setComment(event.target.value);
      };

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
                    <div id="showtime-container">
                    {showtimesArray.map((showtime, index) => (
                    <Link to={`/tickets?showtime=${showtime}&title=${movie.title}`} className="componenetLink">
                    <h4 className="showtime" key={index}>
                        {showtime} 
                    </h4>
                    </Link>
                ))}
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
