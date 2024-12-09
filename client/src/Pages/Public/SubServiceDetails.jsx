import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Server_URL } from "../../utils/config";
import { showErrorToast } from "../../utils/Toasthelper";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaUserCheck, FaHeadset, FaShieldAlt, FaThumbsUp, FaDollarSign } from "react-icons/fa";

function ViewParticularPartner() {
  const { register, handleSubmit, formState: { errors }, reset, setFocus } = useForm();
  const location = useLocation();
  const id = location.state?.id;
  const navigate = useNavigate();

  const [particularpartner, setParticularpartner] = useState([]);
  const [subcategory, setSubcategory] = useState([]);

  // Fetch subcategory data
  async function getSubcategoryData() {
    try {
      const url = `${Server_URL}view-subcategory-data/${id}`;
      const response = await axios.get(url);
      const { error, message, result } = response.data;

      if (error) {
        showErrorToast(message);
      } else {
        setSubcategory(result);
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  }

  // Fetch particular partner data
  async function getParticularPartner() {
    try {
      const url = `${Server_URL}view-particular-partner/${id}`;
      const response = await axios.get(url);
      const { error, message, result } = response.data;

      if (error) {
        showErrorToast(message);
      } else {
        const activePartners = result.filter(partner => partner.status === "active");
        setParticularpartner(activePartners);
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  }

  // Navigate to partner details
  function sendPartnerId(pid) {
    navigate("/partner-detail", { state: { pid } });
  }

  useEffect(() => {
    getSubcategoryData();
    getParticularPartner();
  }, []);

  return (
    <>
      {/* Inline CSS */}
      <style>{`
        .service-description {
          text-align: left;
          padding: 2rem;
        }

        .image-container {
          position: relative;
          display: inline-block;
        }

        .service-image {
          width: 80%;
          border-radius: 50%;
        }

        .overlay-circle {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0, 183, 255, 0.2), rgba(0, 183, 255, 0));
          z-index: -1;
        }

        .large-circle {
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 120%;
          height: 120%;
        }

         h4 {
          color: #333;
          font-weight: 700;
        }

        p {
          color: #555;
        }

        .quality-info {
          background-color: #f9fcff;
          padding: 1rem;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        @media (max-width: 768px) {
          .service-description {
            padding: 1rem;
          }

          .service-image {
            width: 90%;
          }

          h2, h4 {
            font-size: 1.5rem;
          }

          p {
            font-size: 1rem;
          }
        }
      `}</style>

      {/* Breadcrumb Section */}
      <div className="breadcrumb-banner-area ptb-120 bg-opacity" style={{ backgroundImage: 'url("assets/img/bg/6.jpg")' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2>Sub-service Details</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Subcategory Section */}
      {subcategory.map((value, index) => (
        <Container className="service-description my-5" key={index}>
          <Row className="align-items-center mb-5">
            <Col md={5} className="text-center">
              <div className="image-container">
                <img
                  src={value.photo || '/whychoose.png'}
                  alt={value.subcategory}
                  className="service-image"
                />
                <div className="overlay-circle large-circle"></div>
              </div>
            </Col>
            <Col md={7}>
              <h2>{value.subcategory}</h2>
              <p>{value.briefDescription || "No description available"}</p>
              <h4>General {value.categoryInfo} Check Up</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
              </p>
            </Col>
          </Row>
        </Container>
      ))}

      {/* Partner Section */}
      <div className="our-service-area pt-120 pb-90">
        <div className="container">
          <div className="section-title mb-60 text-center">
            <h4>Service</h4>
            <h2>Partners</h2>
          </div>
          <div className="row">
            {particularpartner.map((value, index) => (
              <div className="col-lg-4 col-md-6 mb-4" key={index}>
                <div className="service-wrapper">
                  <div className="service-img">
                    <img
                      src={value.photo || '/whychoose.png'}
                      alt={value.fullname}
                      style={{ height: '100%', width: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div className="service-text text-center mt-3">
                    <h3>{value.fullname}</h3>
                    <p>{value.subcategoryInfo}</p>
                    <h5 style={{ fontWeight: "bold" }}>${value.price} (Per-Hour)</h5>
                    <Link
                      onClick={(event) => {
                        event.preventDefault();
                        sendPartnerId(value._id);
                      }}
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewParticularPartner;
