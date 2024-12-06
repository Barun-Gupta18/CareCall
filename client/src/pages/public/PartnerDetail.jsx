import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import { showErrorToast, showSuccessToast } from "../../utils/Toasthelper";
import { Server_URL } from "../../utils/config";
import { utilityFunctions } from "../../utils/module";
import './PartnerDetail.css';

const PartnerDetail = () => {
  const location = useLocation();
  const id = location.state?.pid;
  const navigate = useNavigate();

  const [partner, setPartner] = useState([]);
  const [review, setReview] = useState([]);


  async function getpartnerData() {
    if (!id) return;
    try {
      const url = `${Server_URL}view-partner-detail/${id}`;
      const response = await axios.get(url);
      const { error, message, result } = response.data;
      if (error) {
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
    getReviews();
  }, [id]);

  async function BookNow(value) {
    try {
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
        navigate('/user/add-details', { state: { value } });
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  }

  async function getReviews() {
    try {
      const url = Server_URL + "view-particular-reviews/" + id;
      const response = await axios.get(url);
      // console.log(headers);
      const { error, message } = response.data;
      if (error) {
        showErrorToast(message);
      } else {
        const { result } = response.data;
        setReview(result);
      }
      // }
    } catch (error) {
      showErrorToast(error.message);
    }
  }

  function calculateAverageRating(reviews) {
    if (reviews.length === 0) return 0; // Avoid division by zero
    const totalStars = reviews.reduce((sum, review) => sum + (review.star || 0), 0);
    return (totalStars / reviews.length).toFixed(1); // Returns the average to 1 decimal place
  }
  const avgRating = calculateAverageRating(review);


  return (
    <>
      {partner.map((value, index) => (
        <div className="provider-detail-container" key={index}>
          <div className="header-section">
            <img src={value.photo ? value.photo : '/photo.jpeg'} alt={value.fullname} className="provider-photo" />
            <div className="provider-info">
              <div className="name-and-button">
                <h2>{value.fullname}</h2>
                <div className="button-container">
                  <Link
                    onClick={(event) => {
                      event.preventDefault();
                      BookNow(value);
                    }}
                    className="btn-primary book-service-btn"
                  >
                    Book Service
                  </Link>
                </div>
              </div>
              <p>{value.description}.</p>
              <div className="contact-info">
                <p><strong>Email:</strong> {value.email}</p>
                <p><strong>Phone:</strong> {value.mobile}</p>
                <p><strong>Address:</strong> {value.address || 'No address provided'}</p>
              </div>
            </div>
          </div>
          <div className="ratings-section">
            <h3>Ratings & Reviews</h3>
            <p><strong>Average Rating:</strong> {avgRating || '3.5'} / 5</p>
            <div className="reviews">
              {(review.slice(0, 3)).map((value, index) => (
                <div className="review" key={index}>
                  <p><strong>{value.userName}</strong> ({value.date}):</p>
                  <p>{value.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default PartnerDetail;
