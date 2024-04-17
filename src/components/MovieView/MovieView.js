import React, { useState, useEffect, useContext} from "react";
import '../css/MovieView/MovieView.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import EmbeddedVideo from "../EmbeddedVideo";
import UserContext from "../context/UserContext";

const MovieView = (props) => {
    //const base64String = props.posterBase64;
    const { id } = useParams();
    const navigate = useNavigate();

    const { userData } = useContext(UserContext);
    const [username, setUsername] = useState();
    const [review, setReview] = useState([]);
    const [comment, setComment] = useState();

    useEffect(() => {
        // Get username from localStorage and set it
        const username = localStorage.getItem('username');
        setUsername(username);
    
      }, []);
    //console.log(userData.username)

    // Access isAdmin from userData
    //const isAdmin = userData && userData.isAdmin;

    const [movie, setMovie] = useState({
        title:'',
        poster:'',
        category:'',
        ageRating:'',
        director:'',
        producer:'',
        base64: '',
        //code:'',
        trailer:'',
        synopsis:'',
        rating:'',  
        showtimes: '',
        reviews: [],
        cast: ''
    });

    function stringToArray(inputString) {
        // Split the input string by comma and space
        const items = inputString.split(", ");
        // Return the resulting array
        return items;
    }

    const [showtimesArray, setShowtimesArray] = useState([]);
    const [castArray, setCastArray] = useState([]);

    /*useEffect(() => {
        setMovie({
            title: 'The Emoji Movie',
            poster: 'https://image.tmdb.org/t/p/original/60bTx5z9zL1AqCjZ0gmWoRMJ6Bb.jpg',
            category: 'Animation/Comedy',
            ageRating: 'PG',
            director: 'Tony Leondis',
            producer: 'Michelle Raimo Kouyate',
            code: 'EMOJ001',
            trailer: 'https://www.youtube.com/embed/r8pJt4dK_s4?si=4klZuvFIk6_PMTIU',
            synopsis: 'In Textopolis, where the emojis are expected to display just one emotion, Gene, an exuberant emoji, sets out on a journey to become a normal emoji.',
            rating: 4.5,
            showtimes: ["2/23/24 @ 4:30 P.M.", "2/27/24 @ 7:30 P.M.", "3/1/24 @ 1:00 P.M.", "3/16/24 @ 11:15 A.M."],
            reviews: ["It was kind of mid", "Another Sony Pictures stinker", "My five year old really enjoyed it", "Awful"],
            cast: ["Filler Guy Jr.", "Guy Ray", "Ray Guy", "Batman Robin", "Barack Obama", "Fake Person IV"]
        });
    }, []);*/


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
            //setShowtimesArray(["2/23/24 @ 4:30 P.M.", "2/27/24 @ 7:30 P.M.", "3/1/24 @ 1:00 P.M.", "3/16/24 @ 11:15 A.M."]);
            //setCastArray(["Filler Guy Jr.", "Guy Ray", "Ray Guy", "Batman Robin", "Barack Obama", "Fake Person IV"]);
            setShowtimesArray(stringToArray(movie.showtimes));
            setCastArray(stringToArray(movie.cast));

            //setFormData(response.data);
          } catch (error) {
            console.error('Error fetching movie data:', error);
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
            console.error('Error fetching review data:', error);
          }
        };
    
        fetchReviewData();
      }, [id, review]);

      const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission here, for example, send inputValue to server or perform any action
        //alert(comment);
        //setComment('');
        try {
            // Send form data to your server, which will interact with MongoDB
            const commentData = {
                movie_id: id,
                username: username,
                review: comment
            }
            axios.post('http://localhost:3000/reviews', commentData); // Replace with your server endpoint
            alert("Comment added!");
            //console.log('Form submitted successfully:', commentData);
            //clear
          } catch (error) {
            console.error('Error submitting form:', error);
          }
          setComment('');


      };
    
      const handleChange = (event) => {
        setComment(event.target.value);
      };

    const navigateHome = () => {
        navigate('/');
    }

      

    return (
        <div className="page">
            <div id="title-logo">

                <h1 onClick={navigateHome}>E-Cinema Booking</h1>
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
