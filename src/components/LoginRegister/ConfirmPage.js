import React from "react";
import './../css/LoginRegister/ConfirmPage.css';
import {Link, useState } from 'react';
import checkMark from './checkMark.png'

  

//import UserContext from "./context/UserContext";

const ConfirmPage = () => {


    return (
    <div class = "background">
          <hr></hr>
          <h2 class="register">Thank You For Signing Up!</h2>
        <div className="center">
        <div className="formsConfirmationPage">
            <img className="imageConfirmationPage" src={checkMark}/>
            <h3 className="h3ConfirmationPage">A confirmation has been sent to your email!</h3>         
        </div>
      </div>
    </div>
    )
  }

  export default ConfirmPage;