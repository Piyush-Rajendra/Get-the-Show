import React, { useState, useEffect, useContext } from "react";
import '../css/Promotions/AddPromotions.css';
import { Link, useNavigate, useSearchParams, useParams } from 'react-router-dom';
import axios from "axios";
import UserContext from "../context/UserContext";

const AddPromotions = () => {
    const { id } = useParams();

    const [formData, setFormData] = useState({
        id: '',
        name: '',
        promoCode: '',
        description: '',
        percentoffPromo: false,
        valueoffPromo: true,
        percentoff: 0,
        valueoff: 0
      });
    
      const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
    
        if (name === 'percentOffPromo' && newValue) {
          setFormData({
            ...formData,
            percentoffPromo: true,
            valueoffPromo: false,
            percentoff: 0,
            valueoff: 0
          });
        } else if (name === 'valueOffPromo' && newValue) {
          setFormData({
            ...formData,
            percentoffPromo: false,
            valueoffPromo: true,
            percentoff: 0,
            valueoff: 0
          });
        } else {
          setFormData({
            ...formData,
            [name]: newValue
          });
        }
      };

      useEffect(() => {
        const fetchPromotionsData = async () => {
          try {
            const response = await axios.get(`http://localhost:3000/promotions/${id}`);
            setFormData(response.data);
          } catch (error) {
            alert("Error fetching promotion data: " + error);
          }
        };
    
        fetchPromotionsData();
      }, [id]);
    
      const handleSubmit = (e) => {
        e.preventDefault();
        try {
            axios.put(`http://localhost:3000/promotions/${formData.id}`, formData); // Replace with your server endpoint
            alert("Form submitted successfully!");
          } catch (error) {
            alert('Error submitting form: '+ error);
          }

        setFormData({
            name: '',
            promoCode: '',
            description: '',
            percentoffPromo: false,
            valueoffPromo: true,
            percentoff: 0,
            valueoff: 0
          });
      };
    
      return (
        <div id="add-promo-page">
        <div id="add-promo-header">
            <h1>E-Cinema Booking</h1>
        </div>
        <div id="add-promo">
            <h2>Edit Promo</h2>
        </div>
        <div id="promo-add-form-center">
        <form id="promo-add-form" className="form-container" onSubmit={handleSubmit}>
          <label className="add-promo-label">
            Name:
            <div></div>
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
          </label>
          <div></div>
          <label className="add-promo-label">
            Promo Code:
            <div></div>
            <input type="text" name="promoCode" value={formData.promoCode} onChange={handleChange} />
          </label>
          <div></div>
          <label className="add-promo-label">
            Description:
            <div></div>
            <input type="text" name="description" value={formData.description} onChange={handleChange} />
          </label>
          <div></div>
          <label className="add-promo-label">
            Percent Off Promo: 
            <div></div>
            <input type="checkbox" name="percentoffPromo" checked={formData.percentoffPromo} onChange={handleChange} />
          </label>
          <div></div>
          <label className="add-promo-label">
            Value Off Promo:
            <div></div>
            <input type="checkbox" name="valueoffPromo" checked={formData.valueoffPromo} onChange={handleChange} />
          </label>
          <div></div>
          {formData.percentoffPromo == 1 && (
            <label className="add-promo-label">
              Percent Off: (Decimal Notation)
              <div></div>
              <input type="number" name="percentoff" value={formData.percentoff} onChange={handleChange} />
            </label>
          )}
          <div></div>
          {formData.valueoffPromo == 1 && (
            <label className="add-promo-label">
              Value Off:
              <div></div>
              <input type="number" name="valueoff" value={formData.valueoff} onChange={handleChange} />
            </label>
          )}
          <div></div>
          <button id="add-promo-button" type="submit">Submit</button>
        </form>
        </div>
        </div>
      );
    }


export default AddPromotions; 