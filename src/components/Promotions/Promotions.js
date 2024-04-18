import React, { useState, useEffect } from "react";
import '../css/Promotions/Promotions.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

const Promotions = () => {

    const navigate = useNavigate();
    const isAdmin = localStorage.getItem('isAdmin');

    const [promotions, setPromotions] = useState([]);
    useEffect(() => {
        async function fetchPromotions() {
          try {
            const response = await axios.get('http://localhost:3000/promotions'); // Use Axios to make a GET request
            setPromotions(response.data); 
          } catch (error) {
            alert("Error fetching promotions: " + error);
          }
        }
    
        fetchPromotions();
      }, [promotions]);

    const ToAddPromo = () => {
        navigate('/AddPromotion');
    }
    
    function deletePromotion(promoID) {
        axios.delete(`http://localhost:3000/promotions/${promoID}`)
            .then((response) => {                
                alert("'Promotion deleted successfully!")
            })
            .catch(error => {
                alert("Error deleting promotion: " + error);
            });
    }

    if (isAdmin) {
    return (
        <div id="promotions-page">
            <div id="promo-title">
            <Link to="/AdminPanel">
                <button className="backButtonPromotionUserAdmin">Back</button>
              </Link>   
                <div id="logo-center">
                <h1 id="logo-title">E-Cinema Booking</h1>
                </div>
                <div id="label-center">
                <h2 id="promotions-label">Promotions</h2>
                </div>
            </div>
            <div id="promo-add-button">
                <button id="add-promo-button" onClick={ToAddPromo}>Add New Promotion</button>
            </div>
            <div id="promos-container">
            
            {promotions.map((promo, index) => (
                <div className="cardPromotionsPage" key={index}>
                    <h2>{promo.name}</h2>
                    <p>Promo Code: {promo.promoCode}</p>
                    <p>Description: {promo.description}</p>
                    {promo.percentoffPromo == 1 && <p>Percent Off: {promo.percentoff * 100}%</p>}
                    {promo.valueoffPromo == 1 && <p>Value Off: ${promo.valueoff}</p>}
                    <div id="promo-buttons">
                    <button className="promo-button" onClick={() => deletePromotion(promo.id)}>Remove</button>
                        <Link to={`/EditPromotion/${promo.promoCode}`}>
                            <button className="promo-button">Edit</button>
                        </Link>
                    </div>
                </div>
            ))}
        

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

export default Promotions; 
