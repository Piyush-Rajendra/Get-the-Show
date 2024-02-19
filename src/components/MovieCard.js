import React from "react";
import './css/MovieCard.css';
import Kevin from './img/Kevin_Hungy.png';

const MovieCard = (props) => {
  
    return (
    <div class="card">
  <div class="card-inner">
    <div class="card-front">
      <img src={props.movie.img} alt="FUCKY"></img>
    </div>
    <div class="card-back">
      <div class="back-title">
        <h1>{props.movie.title}</h1>
        <div class="card-sum">
          <h3>SUMMARY:</h3>
          <p>{props.movie.summary}</p>
        </div>
      </div>
    </div>
  </div>
</div>
    )

}

export default MovieCard;