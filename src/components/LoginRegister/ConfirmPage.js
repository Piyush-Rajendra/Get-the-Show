import React from "react";
import './../css/LoginRegister/ConfirmPage.css';
import {Link} from 'react-router-dom';
import checkMark from './checkMark.png';

  

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
            <Link to='/Login' ><button className="logInButtonConfirm">Login</button></Link>
        </div>
      </div>
    </div>
    )
  }

  export default ConfirmPage;