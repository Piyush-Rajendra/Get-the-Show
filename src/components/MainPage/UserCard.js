import React from "react";
import '../css/HomePage/MovieCard.css'

const UserCard = (props) => {
  const base64String = props.profilePhoto;
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
        <h1>{props.fullName}</h1>
        <div class="card-sum">
          <h3>Username: {props.userName}</h3>
          <hr></hr>
          <p>Email: {props.email}</p>
          <p>Payment Info: {props.paymentInfo}</p>
        </div>
      </div>
    </div>
  </div>
</div>
    )

}

export default UserCard;