import React from "react";
import '../css/HomePage/MovieCard.css'

const UserCard = (props) => {
  const base64String = props.profilePhoto;
  return (
    <div className="card">
      <div className="card-inner">
        <div className="card-front">
          {base64String ? (
            <img src={base64String} alt="Base64 Image" />
          ) : (
            <p>No valid base64 string provided</p>
          )}
        </div>
        <div className="card-back">
          <div className="back-title">
            <h1>{props.fullName}</h1>
            <div className="card-sum">
              <h3>Username: {props.userName}</h3>
              <hr></hr>
              <p>Email: {props.email}</p>
              <p>Registered for Promotions: {props.subscribeToPromotion}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MovieCard = (props) => {
  const base64String = props.posterBase64;
  return (
    <div className="card">
      <div className="card-inner">
        <div className="card-front">
          {base64String ? (
            <img src={base64String} alt="Base64 Image" />
          ) : (
            <p>No valid base64 string provided</p>
          )}
        </div>
        <div className="card-back">
          <div className="back-title">
            <h1>{props.movie}</h1>
            <div className="card-sum">
              <h3>Rating: {props.mpaaRating}</h3>
              <hr></hr>
              <p>Director: {props.director}</p>
              <p>Cast: {props.cast}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CardFactory = ({ type, ...props }) => {
  switch (type) {
    case "user":
      return <UserCard {...props} />;
    case "movie":
      return <MovieCard {...props} />;
    default:
      return null;
  }
};

export default CardFactory;