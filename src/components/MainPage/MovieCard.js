import React from "react";
import '../css/HomePage/MovieCard.css'

const MovieCard = (props) => {
  const base64String = props.posterBase64;
    return (
    <div class="card">
  <div class="card-inner">
    <div class="card-front">
    {base64String ? (
          <img src={base64String} alt="Base64 Image" />
        ) : (
          <p>No valid base64 string provided</p>
        )}
    </div>
    <div class="card-back">
      <div class="back-title">
        <h1>{props.movie}</h1>
        <div class="card-sum">
          <h3>Rating: {props.mpaaRating}</h3>
          <hr></hr>
          <p>Director: {props.director}</p>
          <p>Cast: {props.cast}</p>
        </div>
      </div>
    </div>
  </div>
</div>
    )

}

export default MovieCard;