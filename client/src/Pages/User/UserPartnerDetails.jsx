import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import { Server_URL, Server_URL2 } from "../../utils/config";
import { utilityFunctions } from "../../utils/module";
import { showErrorToast, showSuccessToast } from "../../utils/Toasthelper";


import '../Public/PartnerDetail.css';

const UserPartnerDetail = () => {
  const location = useLocation();
  const id = location.state?.pid;
  const navigate = useNavigate();

  const [partner, setPartner] = useState([]);

  async function getpartnerData() {
    if (!id) return; // Exit if no ID is available
    try {
      // console.log('partner:', id)
      const token = utilityFunctions.getCookieValue('userAuthToken');
      const url = `${Server_URL}user-partner-detail/${id}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: token ? `Bearer ${token}` : ""
        }
      });
      const { error, message, result } = response.data;
      if (error && message === "SignIn") {
        navigate('/user-login')
      }
      else if (error) {
        showErrorToast(message);
      } else {
        setPartner(result);
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  }

  useEffect(() => {
    getpartnerData();
  }, [id]); // Include id as dependency to rerun if id changes

  async function BookNow(value) {
    // navigate('/user-login');
    try {
      console.log(value)
      return false
      const token = utilityFunctions.getCookieValue('userAuthToken');
      const url = Server_URL + "user-exist";
      const response = await axios.get(url, {
        headers: {
          Authorization: token ? `Bearer ${token}` : ""
        }
      });
      const { error, message } = response.data;
      if (error && message === "SignIn") {
        navigate('/user-login');
      } else if (error) {
        showErrorToast(message);
      } else {
        console.log(value)
        // navigate('/user/add-details', { state: { value } })
        showSuccessToast(message)
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  }

  // Static values to replace missing properties
  const staticServices = ['Plumbing', 'Electrical Work', 'Carpentry'];
  const staticReviews = [
    { user: 'Jane Doe', date: '2023-10-25', comment: 'Excellent service!' },
    { user: 'John Smith', date: '2023-10-20', comment: 'Very professional.' }
  ];

  return (
    <>
      {partner.map((value, index) => (
        <div className="provider-detail-container" key={index}>
          <div className="header-section">
            <img src={`${Server_URL2}${value.photo}`} alt={value.fullname} className="provider-photo" />
            <div className="provider-info">
              <h2>{value.fullname}</h2>
              <p>{value.description}.</p>
              <div className="contact-info">
                <p><strong>Email:</strong> {value.email}</p>
                <p><strong>Phone:</strong> {value.mobile}</p>
                <p><strong>Address:</strong> {value.address || 'No address provided'}</p>
              </div>
            </div>
          </div>

          <div className="services-section">
            <h3>Services Offered</h3>
            <ul className="service-list">
              {(value.services || staticServices).map((service, index) => (
                <li key={index}>{service}</li>
              ))}
            </ul>
          </div>

          <div className="ratings-section">
            <h3>Ratings & Reviews</h3>
            <p><strong>Average Rating:</strong> {value.rating || '3.5'} / 5</p>
            <div className="reviews">
              {(value.reviews || staticReviews).map((review, index) => (
                <div className="review" key={index}>
                  <p><strong>{review.user}</strong> ({review.date}):</p>
                  <p>{review.comment}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="cta-section">
            <Link
              onClick={(event) => {
                event.preventDefault(); // Prevent default link behavior
                BookNow(value); // Call your function
              }}
              className="btn-primary"
            >
              Book Service
            </Link>

            {/* <Link to="#" className="btn-secondary">Contact Provider</Link> */}
          </div>
        </div>
      ))}
    </>
  );
};

export default UserPartnerDetail;
