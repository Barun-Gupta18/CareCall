import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { Link, useNavigate } from "react-router-dom";
import { utilityFunctions } from "../../utils/module";
import { Server_URL } from "../../utils/config";
import { showErrorToast, showSuccessToast } from "../../utils/Toasthelper";
import { FaStar } from "react-icons/fa";

function UserMyOrders() {
  const { register, handleSubmit, formState: { errors }, reset, setFocus } = useForm();
  const [show, setShow] = useState(false);
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const [reviewText, setReviewText] = useState("");
  const [booking, setBooking] = useState([]);
  const [selectedPartnerId, setSelectedPartnerId] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const navigate = useNavigate();

  function handleShow(partnerId, userId) {
    setSelectedPartnerId(partnerId);
    setSelectedUserId(userId);
    setShow(true);
  }

  function handleClose() {
    setShow(false);
    setCurrentValue(0);
    setReviewText("");
  }

  const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9"
  };

  async function getBookingData() {
    try {
      const token = utilityFunctions.getCookieValue("userAuthToken");
      const url = `${Server_URL}user-booking-data`;
      const { data } = await axios.get(url, {
        headers: { Authorization: token ? `Bearer ${token}` : "" }
      });
      if (data.error) {
        if (data.message === "SignIn") navigate("/user-login");
        else showErrorToast(data.message);
      } else {
        setBooking(data.result);
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  }

  useEffect(() => {
    getBookingData();
  }, []);

  async function goMoreDetails(value) {
    navigate("/user/more-details", { state: { value } });
  }

  async function handleSubmitReview() {
    try {
      const payload = { currentValue, reviewText, selectedPartnerId, selectedUserId };
      const token = utilityFunctions.getCookieValue("userAuthToken");
      const response = await axios.post(`${Server_URL}user-add-review`, payload, {
        headers: { Authorization: token ? `Bearer ${token}` : "" }
      });
      const { error, message } = response.data;
      if (error) {
        message === "SignIn" ? navigate('/user-login') : showErrorToast(message);
      } else {
        handleClose();
        showSuccessToast(message);
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  }

  return (
    <>
      <div className="container">
        <div className="row">
          {booking.map((value, index) => (
            <div className="col-lg-4 col-md-6 mb-4" key={index}>
              <div style={styles.serviceCard}>
                <div style={styles.serviceImg}>
                  <img src={value.subcategoryPhoto ? value.subcategoryPhoto : '/whychoose.png'} alt={value.subcategoryName} />
                </div>
                <div style={styles.serviceContent}>
                  <h2 style={styles.serviceTitle}>{value.subcategoryInfo}</h2>
                  <h5>Total: {value.total}</h5>
                  <h5>Status: {value.status}</h5>
                  <h5>Date: {value.date}</h5>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Link
                      style={{ marginRight: "20px" }}
                      onClick={(e) => { e.preventDefault(); goMoreDetails(value); }}
                    >
                      View Details
                    </Link>
                    {value.status === 'Completed' && (
                      <Link onClick={(e) => { e.preventDefault(); handleShow(value.partnerId, value.userId); }}>
                        Give Review
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Body style={styles.modalBody}>
          <div style={styles.container}>
            <h2 style={styles.heading}>Rate Our Partner</h2>
            <div style={styles.stars}>
              {Array(5).fill(0).map((_, index) => (
                <FaStar
                  key={index}
                  size={30}
                  style={styles.starIcon}
                  color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
                  onClick={() => setCurrentValue(index + 1)}
                  onMouseOver={() => setHoverValue(index + 1)}
                  onMouseLeave={() => setHoverValue(undefined)}
                />
              ))}
            </div>
            <textarea
              style={styles.textarea}
              placeholder="What's your feedback?"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
            <button onClick={handleSubmitReview} style={styles.button}>Submit Review</button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

const styles = {
  serviceCard: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'center',
    padding: '15px',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '8px',
    minHeight: '400px',
    width: '100%',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  },
  serviceImg: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  serviceContent: {
    marginTop: '15px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  serviceTitle: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#333',
    margin: '10px 0',
  },
  modalBody: {
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '15px',
    color: '#333',
  },
  stars: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  starIcon: {
    cursor: 'pointer',
    marginRight: '8px',
    transition: 'transform 0.2s ease-in-out',
  },
  textarea: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    width: '100%',
    minHeight: '100px',
    padding: '12px',
    marginBottom: '20px',
    fontSize: '16px',
    resize: 'vertical',
    boxShadow: 'inset 0px 1px 4px rgba(0, 0, 0, 0.1)',
    transition: 'border-color 0.3s ease',
  },
  button: {
    backgroundColor: '#FFBA5A',
    border: 'none',
    color: '#fff',
    padding: '12px 24px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    boxShadow: '0px 4px 8px rgba(255, 186, 90, 0.4)',
    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
  },
};

export default UserMyOrders;
