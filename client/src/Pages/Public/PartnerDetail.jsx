import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import { showErrorToast, showSuccessToast } from "../../utils/Toasthelper";
import { Server_URL } from "../../utils/config";
import { utilityFunctions } from "../../utils/module";

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
      const { error, message } = response.data;
      if (error) {
        showErrorToast(message);
      } else {
        const { result } = response.data;
        setReview(result);
      }
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
      <style>{`
        .provider-detail-container {
          width: 90%;
          max-width: 900px;
          margin: auto;
          padding: 20px;
          background-color: #f9f9f9;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          font-family: Arial, sans-serif;
        }
        .header-section {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          border-bottom: 1px solid #ddd;
          padding-bottom: 20px;
          margin-bottom: 20px;
        }
        .provider-photo {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid #ddd;
        }
        .provider-info h2 {
          font-size: 1.8em;
          margin: 0;
        }
        .provider-info p {
          margin: 5px 0;
          color: #555;
        }
        .contact-info p {
          margin: 3px 0;
          color: #666;
        }
        .ratings-section h3 {
          font-size: 1.5em;
          margin-bottom: 10px;
        }
        .reviews {
          background-color: #fff;
          padding: 15px;
          border-radius: 5px;
          margin-top: 10px;
        }
        .review {
          margin-bottom: 15px;
          border-bottom: 1px solid #ddd;
          padding-bottom: 10px;
        }
        .btn-primary {
          background-color: #4CAF50;
          color: #fff;
          padding: 10px 20px;
          text-decoration: none;
          border-radius: 5px;
          transition: background 0.3s;
          display: inline-block;
        }
        .btn-primary:hover {
          background-color: #45d14c;
        }
        .name-and-button {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
        }
        @media (max-width: 768px) {
          .header-section {
            flex-direction: column;
            align-items: center;
          }
          .provider-info h2 {
            font-size: 1.5em;
          }
          .btn-primary {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>
      {partner.map((value, index) => (
        <div className="provider-detail-container" key={index}>
          <div className="header-section">
            <img src={value.photo || '/photo.jpeg'} alt={value.fullname} className="provider-photo" />
            <div className="provider-info">
              <div className="name-and-button">
                <h2>{value.fullname}</h2>
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
              <p>{value.description}</p>
              <div className="contact-info">
                <p><strong>Email:</strong> {value.email}</p>
                <p><strong>Phone:</strong> {value.mobile}</p>
                <p><strong>Address:</strong> {value.address || 'No address provided'}</p>
              </div>
            </div>
          </div>
          <div className="ratings-section">
            <h3>Ratings & Reviews</h3>
            <p><strong>Average Rating:</strong> {avgRating} / 5</p>
            <div className="reviews">
              {review.slice(0, 3).map((reviewValue, index) => (
                <div className="review" key={index}>
                  <p><strong>{reviewValue.userName}</strong> ({reviewValue.date}):</p>
                  <p>{reviewValue.comment}</p>
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
