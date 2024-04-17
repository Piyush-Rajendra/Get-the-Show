import React from "react";
import "../css/HomePage/MovieCard.css";

const createCard = (cardType) => {
  return (props) => {
    const base64String =
      cardType === "movie" ? props.posterBase64 : props.profilePhoto;
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
              <h1>{cardType === "movie" ? props.movie : props.fullName}</h1>
              <div className="card-sum">
                {cardType === "movie" ? (
                  <h3>Rating: {props.mpaaRating}</h3>
                ) : (
                  <h3>Username: {props.userName}</h3>
                )}
                <hr />
                <p>
                  {cardType === "movie" ? (
                    <>
                      Director: {props.director}
                      <br />
                      Cast: {props.cast}
                    </>
                  ) : (
                    <>
                      Email: {props.email}
                      <br />
                      Payment Info: {props.paymentInfo}
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
};

const MovieCard = createCard("movie");
const UserCard = createCard("user");

export { MovieCard, UserCard };