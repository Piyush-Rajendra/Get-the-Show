import React, { useState, useEffect, useContext } from "react";
import '../css/Promotions/Promotions.css';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import axios from "axios";
import UserContext from "../context/UserContext";

const Promotions = () => {

    const navigate = useNavigate();
    const { userData } = useContext(UserContext);
    const isAdmin = localStorage.getItem('isAdmin');

    const [promotions, setPromotions] = useState([]);
    useEffect(() => {
        async function fetchPromotions() {
          try {
            const response = await axios.get('http://localhost:3000/promotions'); // Use Axios to make a GET request
            setPromotions(response.data); // Set the promotions data into the state
          } catch (error) {
            console.error('Error fetching promotions:', error);
          }
        }
    
        fetchPromotions();
      }, [promotions]);

    const DUMMY_PROMOTIONS = [
        {
            name: 'Promo1',
            promoCode: 'GHUYYRT34',
            description: 'A code for new members',
            percentOffPromo: false,
            valueOffPromo: true,
            percentOff: 0,
            valueOff: 2
        },
        {
            name: 'Promo2',
            promoCode: '567FHB8',
            description: 'A code for old members',
            percentOffPromo: true,
            valueOffPromo: false,
            percentOff: 0.15,
            valueOff: 0
        },
        {
            name: 'Promo3',
            promoCode: '8QY7JNB35',
            description: 'A student discount',
            percentOffPromo: true,
            valueOffPromo: false,
            percentOff: 0.20,
            valueOff: 0
        },
        {
            name: 'Promo4',
            promoCode: '78778BHG',
            description: 'A senior discount new members',
            percentOffPromo: false,
            valueOffPromo: true,
            percentOff: 0,
            valueOff: 20
        },
        {
            name: 'Promo5',
            promoCode: 'FHJ432JKL',
            description: 'Special weekend offer',
            percentOffPromo: true,
            valueOffPromo: false,
            percentOff: 0.25,
            valueOff: 0
        },
        {
            name: 'Promo6',
            promoCode: '67GHBFD9',
            description: 'Early bird discount',
            percentOffPromo: false,
            valueOffPromo: true,
            percentOff: 0,
            valueOff: 15
        },
        {
            name: 'Promo7',
            promoCode: 'KJH876TY',
            description: 'Holiday season sale',
            percentOffPromo: true,
            valueOffPromo: false,
            percentOff: 0.30,
            valueOff: 0
        },
        {
            name: 'Promo8',
            promoCode: 'KI8U7JNB',
            description: 'Flash sale',
            percentOffPromo: false,
            valueOffPromo: true,
            percentOff: 0,
            valueOff: 10
        },
        {
            name: 'Promo9',
            promoCode: 'OIUHJ8Y7',
            description: 'Referral discount',
            percentOffPromo: true,
            valueOffPromo: false,
            percentOff: 0.10,
            valueOff: 0
        },
        {
            name: 'Promo10',
            promoCode: '7JNHJU78',
            description: 'Summer discount',
            percentOffPromo: false,
            valueOffPromo: true,
            percentOff: 0,
            valueOff: 30
        },
        {
            name: 'Promo11',
            promoCode: 'UJNHJKI8',
            description: 'Back-to-school promotion',
            percentOffPromo: true,
            valueOffPromo: false,
            percentOff: 0.18,
            valueOff: 0
        }
    ];
    
    

    const ToAddPromo = () => {
        navigate('/AddPromotion');
    }
    
    function deletePromotion(promoID) {
        axios.delete(`http://localhost:3000/promotions/${promoID}`)
            .then(response => {
                console.log('Promotion deleted successfully');
                // Handle any UI updates or further actions here
            })
            .catch(error => {
                console.error('Error deleting promotion:', error);
                // Handle error cases here
            });
            //alert("button pressed");
    }


    

    if (isAdmin) {
    return (
        <div id="promotions-page">
            <div id="promo-title">
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
                <div className="card" key={index}>
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
