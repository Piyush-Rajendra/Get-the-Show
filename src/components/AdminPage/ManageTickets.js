import React from "react";
import { Link } from 'react-router-dom';
import { useState, useContext } from "react";
import '../css/AdminPage/ManageTickets.css'
import MovieCard from "../MainPage/MovieCard";
import axios from 'axios';
import {useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import UserContext from "../context/UserContext";


const ManageTickets = (props) => {

    const isAdmin = localStorage.getItem('isAdmin');
    const navigate = useNavigate();

    const [childEdit, setChildEdit] = useState(false);
    const [adultEdit, setAdultEdit] = useState(false);
    const [seniorEdit, setSeniorEdit] = useState(false);


    const [childPrice, setChildPrice] = useState(8);
    const [adultPrice, setAdultPrice] = useState(12);
    const [seniorPrice, setSeniorPrice] = useState(9);

    const handleEdit = (type) => {
        switch (type) {
            case 'child':
                setChildEdit(true);
                break;
            case 'adult':
                setAdultEdit(true);
                break;
            case 'senior':
                setSeniorEdit(true);
                break;
            default:
                break;
        }
    };

    const handleSubmit = (type) => {
        switch (type) {
            case 'child':
                setChildEdit(false);
                alert("Child ticket price edited!");
                break;
            case 'adult':
                setAdultEdit(false);
                alert("Adult ticket price edited!");
                break;
            case 'senior':
                setSeniorEdit(false);
                alert("Senior ticket price edited!");
                break;
            default:
                break;
        }
    };


    if (isAdmin) {
    return (
        <div className="manage-tickets-page">
            <div id="header">
                <div id="center-tickets">
                <h1 id="title-header">E-Cinema Booking</h1>
                </div>
                <div id="center-header">
                <h2 id="ticket-header">Manage Tickets</h2>
                </div>
            </div>
            <div className="ticket-section" id="child-section">
                <div className="section-content">
                    {childEdit ? (
                        <>
                            <input
                                type="text"
                                value={childPrice}
                                onChange={(e) => setChildPrice(e.target.value)}
                            />
                            <button className="submit-button" onClick={() => handleSubmit('child')}>Submit</button>
                        </>
                    ) : (
                        <>
                            <h3 id="child-tickets">Child Ticket Price: ${childPrice}</h3>
                            <button className="edit-button" onClick={() => handleEdit('child')}>Edit</button>
                        </>
                    )}
                </div>
            </div>
            <div className="ticket-section" id="adult-section">
                <div className="section-content">
                    {adultEdit ? (
                        <>
                            <input
                                type="text"
                                value={adultPrice}
                                onChange={(e) => setAdultPrice(e.target.value)}
                            />
                            <button className="submit-button" onClick={() => handleSubmit('adult')}>Submit</button>
                        </>
                    ) : (
                        <>
                            <h3 id="adult-tickets">Adult Ticket Price: ${adultPrice}</h3>
                            <button className="edit-button" onClick={() => handleEdit('adult')}>Edit</button>
                        </>
                    )}
                </div>
            </div>
            <div className="ticket-section" id="senior-section">
                <div className="section-content">
                    {seniorEdit ? (
                        <>
                            <input
                                type="text"
                                value={seniorPrice}
                                onChange={(e) => setSeniorPrice(e.target.value)}
                            />
                            <button className="submit-button" onClick={() => handleSubmit('senior')}>Submit</button>
                        </>
                    ) : (
                        <>
                            <h3 id="senior-tickets">Senior Ticket Price: ${seniorPrice}</h3>
                            <button className="edit-button" onClick={() => handleEdit('senior')}>Edit</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
else {
    return (
      <h2 style={{ color: 'red' }}>You are not authorized to view this page.</h2>
    )
  }

}

export default ManageTickets; 