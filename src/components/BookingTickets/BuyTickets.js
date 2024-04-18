import React, { useState, useEffect, } from "react";
import '../css/BookingTickets/BuyTickets.css';
import { Link, useNavigate, useSearchParams, useParams} from 'react-router-dom';
import axios from "axios";

const BuyTickets = (props) => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { id } = useParams(); // Retrieve the movie ID from URL

    const [token, setToken] = useState(localStorage.getItem('token'));

    const [childTicket, setChildTicket] = useState();
    const [adultTicket, setAdultTicket] = useState();
    const [seniorTicket, setSeniorTicket] = useState();
    //const [tax, setTax] = useState();
    //const [availableSeats, setAvailableSeats] = useState([]); 
    const [movieTitle, setMovieTitle] = useState();
    const [movieTime, setMovieTime] = useState();
    //const [total, setTotal] = useState();
    const [numOfChildTickets, setNumOfChildTickets] = useState(0);
    const [numOfAdultTickets, setNumOfAdultTickets] = useState(0);
    const [numOfSeniorTickets, setNumOfSeniorTickets] = useState(0);

    const [seats, setSeats] = useState(["A1", "A2", "A3", "A4", "A5", "A6", "C5", "C6"]);
    const [selectedSeat, setSelectedSeat] = useState(""); // Initialize with an empty string
    //const [checkSeatSelected, setCheckSeatSelected] = useState(false);
    const [check, setCheck] = useState(false);
    const totalChildPrice = numOfChildTickets * childTicket;
    const totalAdultPrice = numOfAdultTickets * adultTicket;
    const totalSeniorPrice = numOfSeniorTickets * seniorTicket;
    const tax = (totalChildPrice + totalAdultPrice + totalSeniorPrice) * .06;
    const taxFormatted = tax.toFixed(2);
    const total = (totalChildPrice + totalAdultPrice + totalSeniorPrice) + tax; 
    const totalFormatted = total.toFixed(2);
    const renderTimes = numOfChildTickets + numOfAdultTickets + numOfSeniorTickets;
    const [selectedSeats, setSelectedSeats] = useState(Array(renderTimes).fill(""));
    const [availableSeats, setAvailableSeats] = useState(seats);

    /*const handleSeatSelection = (event) => {
    const selectedValue = event.target.value;
    setSelectedSeat(selectedValue);
    setCheckSeatSelected(true);
    }; */

    const handleSeatSelection = (event, index) => {
        const selectedValue = event.target.value;
        const newSelectedSeats = [...selectedSeats]; // Create a copy of the selectedSeats array
        newSelectedSeats[index] = selectedValue; // Update the value at the specified index
        setSelectedSeats(newSelectedSeats); // Update the selectedSeats state
        setAvailableSeats(prevSeats => prevSeats.filter(seat => seat !== selectedValue));
    };


    useEffect(() => {
        setMovieTitle('The Emoji Movie');
        setMovieTime('2/23/24 @ 4:30 P.M.');
        const fetchTicketData = async () => {
            try {
              const responseOne = await axios.get(`http://localhost:3000/ticket-prices/children`);
              setChildTicket(responseOne.data.price); 
              const responseTwo = await axios.get(`http://localhost:3000/ticket-prices/adult`);
              setAdultTicket(responseTwo.data.price); 
              const responseThree = await axios.get(`http://localhost:3000/ticket-prices/senior`);
              setSeniorTicket(responseThree.data.price); 
              
            } catch (error) {
              console.error('Error fetching ticket data:', error);
            }
          };
      
          fetchTicketData();
      }, []);

      useEffect(() => {
        // Check if all seats have been selected for renderTimes
        setMovieTime(searchParams.get('showtime'));
        setMovieTitle(searchParams.get('title'));
        console.log(selectedSeats);
        console.log(selectedSeats.length == renderTimes)
        //if (selectedSeats.every(seat => seat !== "")) {
        if (selectedSeats.length == renderTimes) {
          setCheck(true); // Set check to true if all seats have been selected
        } else {
          setCheck(false); // Set check to false if any seat is not selected
        }
      }, [selectedSeats, renderTimes, movieTime, movieTitle]);

      const handleAddChildTicket = () => {
        setNumOfChildTickets(prevNum => prevNum + 1); 
      };
      const handleRemoveChildTicket = () => {
        if (numOfChildTickets > 0) {
            setNumOfChildTickets(prevNum => prevNum - 1); 
        }
      };
      

      const handleAddAdultTicket = () => {
        setNumOfAdultTickets(prevNum => prevNum + 1); 
      };
      const handleRemoveAdultTicket = () => {
        if (numOfAdultTickets > 0) {
            setNumOfAdultTickets(prevNum => prevNum - 1); 
        }
      };
      

      const handleAddSeniorTicket = () => {
        setNumOfSeniorTickets(prevNum => prevNum + 1); 
      };
      const handleRemoveSeniorTicket = () => {
        if (numOfSeniorTickets > 0) {
            setNumOfSeniorTickets(prevNum => prevNum - 1); // Increment numOfChildTickets by 1
        }
      };
      
    const totalAmount = 1500; 
    const handlePaymentButton = () => {
        //navigate('/payment');
        /*event.preventDefault();
        const numberOfTickets = renderTimes;*/
        const cost = (totalChildPrice + totalAdultPrice + totalSeniorPrice);
        //const fullTotal = cost + tax; 
        //updateOrderData(numberOfTickets, cost, taxTotal); 
        sessionStorage.setItem('numberOfTickets', renderTimes);
        sessionStorage.setItem('cost', cost);
        sessionStorage.setItem('tax', tax);
        sessionStorage.setItem('fullTotal', totalFormatted);
        sessionStorage.setItem('movie-time', movieTime);
        sessionStorage.setItem('movie-title', movieTitle);


        navigate('/payment');

    } 

    
    //const total = searchParams.get('total');


    if (token) {
    return (
        <div className="movie-page">
            <Link to={`/`} className="backButtonPaymentOptionView">
                <button className="backButtonPaymentTickets">Cancel Tickets</button>
            </Link>
            <div className="movie-title">
                <h2 id="ticket-movie-title">Movie: {movieTitle}</h2>
                <h2 id="ticket-movie-time">Time: {movieTime}</h2>
            </div>
            <hr/>
            <div className="two-columns">
                <div id="ticket-column-one">
                    <div id="prices">
                        <h3 id="price-title">Prices:</h3>
                        <h5 className="price">Child Ticket: ${childTicket}</h5>
                        <h5 className="price">Adult Ticket: ${adultTicket}</h5>
                        <h5 className="price">Senior Ticket: ${seniorTicket}</h5>
                    </div>
                    <div id="ticket-buttons">
                        <div className="add-delete">
                            <h3 onClick={handleAddChildTicket} className="add-button">Add Child Ticket</h3>
                            <button onClick={handleRemoveChildTicket} className="remove">Remove Child Ticket</button>
                        </div>
                        <div className="add-delete">
                            <h3 onClick={handleAddAdultTicket} className="add-button">Add Adult Ticket</h3>
                            <button onClick={handleRemoveAdultTicket} className="remove">Remove Adult Ticket</button>
                        </div>
                        <div className="add-delete">
                            <h3 onClick={handleAddSeniorTicket} className="add-button">Add Senior Ticket</h3>
                            <button onClick={handleRemoveSeniorTicket} className="remove">Remove Senior Ticket</button>
                        </div>
                    </div>
                    <div id="totals">
                    {numOfChildTickets > 0 && (
                        <h5 className="sum" id="child-ticket-total">{numOfChildTickets}x Child Tickets (${totalChildPrice})</h5>
                    )}
                    {numOfAdultTickets > 0 && (
                        <h5 className="sum" id="adult-ticket-total">{numOfAdultTickets}x Adult Tickets (${totalAdultPrice})</h5>
                    )}
                    {numOfSeniorTickets > 0 && (
                        <h5 className="sum" id="senior-ticket-total">{numOfSeniorTickets}x Senior Tickets (${totalSeniorPrice})</h5>
                    )}
                    </div>
                    <div id="final-price">
                    {(numOfSeniorTickets > 0 || numOfAdultTickets > 0 || numOfChildTickets > 0) && (
                        <h5 id="tax">Tax: (${taxFormatted})</h5>
                    )}
                    {(numOfSeniorTickets > 0 || numOfAdultTickets > 0 || numOfChildTickets > 0) && (
                        <h5 id="final-sum">Total: ${totalFormatted}</h5>
                    )}
                    </div>
                </div>
                <div id="ticket-column-two">
                    <div id="movie-image">
                        <div id="movie-img-container">
                        <img id="seat-image" src="https://amc-theatres-res.cloudinary.com/amc-cdn/production/2/attributes/HybridSeating_promo.jpg" width="400px"/>
                        </div>
                        <h5 id="seat-select-text">Select Your Seat(s):</h5>
                        {[...Array(renderTimes)].map((_, index) => (
                            <div className="seat-dropdown" key={index}>
                            <select id={`seatSelector${index}`} value={selectedSeats[index]} onChange={(event) => handleSeatSelection(event, index)}>
                                <option value="">Select a seat...</option>
                                {availableSeats.map((seat, seatIndex) => (
                                <option key={seatIndex} value={seat}>
                                    {seat}
                                </option>
                                ))}
                            </select>
                            <p className="selected-seat-text">Selected Seat: {selectedSeats[index]}</p>
                            </div>
                        ))}
                    </div>
                    {(total > 0 && check == true) && (
                    <div id="proceed-container">
                    <button id="proceed" onClick={handlePaymentButton}>Proceed to Payment</button>
                    </div>
                    )}
                </div>
            </div>
        </div>
    )
                    }
    else {
        return (
            <div className="not-logged-in">
                <h2 style={{ color: 'red' }}>Please login to be able to purchase tickets.</h2>
                <Link to="/Login">
                <h3>Click here to login</h3>
                </Link>
            </div>
        )
    }



}

export default BuyTickets; 