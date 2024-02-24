import React, { useState, useEffect } from "react";
import './css/MovieView.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import EmbeddedVideo from "./EmbeddedVideo";

const MovieView = (props) => {
    const [movie, setMovie] = useState({
        title:'',
        poster:'',
        category:'',
        ageRating:'',
        director:'',
        producer:'',
        code:'',
        trailer:'',
        synopsis:'',
        rating:'',  
        showtimes: [],
        reviews: [],
        cast: []
    });

    useEffect(() => {
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
    }, []);

    return (
        <div className="page">
            <div id="title-logo">
                <h1>E-Cinema Booking</h1>
            </div>
            <div className="three-containers">
                <div id="column-one" className="view-page-column">
                    <img src={movie.poster} width="250" id="movie-poster" alt={movie.title} />
                    <h2 id="movie-title">{movie.title}</h2>
                    <div id="info-container">
                    <div id="movie-info">
                        <h3>{movie.category}</h3>
                        <h3>Rated: {movie.ageRating}</h3>
                        <h3>Director: {movie.director}</h3>
                        <h3>Prodcuer: {movie.producer}</h3>
                        <h3>Film Code: {movie.code}</h3>
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
                    {movie.showtimes.map((showtime, index) => (
                    <h4 className="showtime" key={index}>
                        {showtime} 
                    </h4>
                ))}
                <div id="review-container">
                    <h3 className="red" id="review-title">Reviews</h3>
                    <h4 className="white" id="movie-rating">{movie.rating}/5</h4>
                    {movie.reviews.map((review, index) => (
                    <h5 className="review-single" key={index}>
                        {review} 
                    </h5>
                ))}
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
                    {movie.cast.map((cast, index) => (
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
