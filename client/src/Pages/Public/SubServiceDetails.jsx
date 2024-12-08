import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Server_URL } from "../../utils/config";
import { showErrorToast } from "../../utils/Toasthelper";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaUserCheck, FaHeadset, FaShieldAlt, FaThumbsUp, FaDollarSign } from 'react-icons/fa';
import './ServiceDescription.css';



function ViewParticularPartner() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
  } = useForm();


  const location = useLocation();
  const id = location.state?.id;

  const navigate = useNavigate();

  const [particularpartner, setParticularpartner] = useState([]);
  const [subcategory, setSubcategory] = useState([]);



  async function getSubcategoryData() {
    try {
      // console.log(id)
      const url = Server_URL + "view-subcategory-data/" + id;
      const response = await axios.get(url);
      // console.log(response);
      const { error, message } = response.data;
      if (error) {
        showErrorToast(message);
      } else {
        const { result } = response.data;
        // console.log(result)
        setSubcategory(result);
        // console.log(particularsubcategory)
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  }

  useEffect(() => {
    getSubcategoryData();
  }, []);


  async function getParticularPartner() {
    try {
      // console.log('dghj')
      const url = Server_URL + "view-particular-partner/" + id;
      const response = await axios.get(url);
      // console.log(response);
      const { error, message } = response.data;
      if (error) {
        showErrorToast(message);
      } else {
        const { result } = response.data;
        const activePartners = result.filter(partner => partner.status === 'active');
        setParticularpartner(activePartners);
      }
      // }
    } catch (error) {
      showErrorToast(error.message);
    }
  }

  useEffect(() => {
    getParticularPartner();
  }, []);

  async function sendPartnerId(pid) {
    navigate('/partner-detail', { state: { pid } });
  }

  return (
    <>

      {/* <!-- breadcrumb-banner-area --> */}
      <div className="breadcrumb-banner-area ptb-120 bg-opacity" style={{ backgroundImage: 'url("assets/img/bg/6.jpg")' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb-text text-center">
                <h2>sub-service details</h2>
                {/* <ul className="breadcrumb-menu">
                            <li><a href="#">service</a></li>
                            <li><a href="#">about us</a></li>
                        </ul> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- breadcrumb-banner-area-end --> */}


      {subcategory.map((value, index) => {
        return (
          <Container className="service-description my-5" key={index}>
            {/* AC Service Section */}
            <Row className="align-items-center mb-5">
              <Col md={5} className="text-center">
                <div className="image-container">
                  <img
                    src={value.photo ? value.photo : '/whychoose.png'}
                    alt={value.subcategory}
                    className="service-image"
                  />
                  <div className="overlay-circle large-circle"></div>
                </div>
              </Col>
              <Col md={7}>
                <h2>{value.subcategory}</h2>
                <p>
                  {value.briefDescription}
                </p>
                <h4>General {value.categoryInfo} Check Up</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper
                  mattis, pulvinar dapibus leo.
                </p>
                <ul>
                  <li>Proin interdum vitae ex eget rutrum</li>
                  <li>Curabitur placerat dolor at metus</li>
                  <li>Fusce tincidunt sodales nulla</li>
                  <li>Vestibulum ante ipsum primis</li>
                </ul>
                {/* <Button variant="info" className="mt-3">Order Service</Button> */}
              </Col>
            </Row>

            {/* Quality Work Section */}
            <Row className="align-items-center">
              <Col md={5} className="text-center">
                <div className="image-container">
                  <img
                    src="/qualitywork.jpg"
                    alt="Quality Work"
                    className="service-image"
                  />
                  <div className="overlay-circle large-circle"></div>
                  <div className="overlay-circle small-circle"></div>
                </div>
              </Col>
              <Col md={7}>
                <h2>Quality Work Every Time</h2>
                <ul>
                  <li>
                    Quality is our commitment. We take pride in providing meticulous attention to detail on every project, ensuring your home is serviced with the utmost care.
                  </li>
                  <li>
                    Reliable, consistent quality, every visit. We stand by our standards, so you can always count on a professional job well done.
                  </li>
                </ul>
                <div className="quality-info">
                  <h4>Why Choose Us</h4>
                  <ul className="quality-list">
                    <li><FaUserCheck className="icon" /> Connects you to Verified and Trained Technicians</li>
                    <li><FaHeadset className="icon" /> Offers Impeccable Customer Support</li>
                    <li><FaShieldAlt className="icon" /> Guarantees Secure Transactions</li>
                    <li><FaThumbsUp className="icon" /> Provides High-quality, Reliability, and Safety</li>
                    <li><FaDollarSign className="icon" /> Ensures Cost-effectiveness</li>
                  </ul>
                </div>
              </Col>
            </Row>
          </Container>
        )
      })}

      <div className="our-service-area pt-120 pb-90">
        <div className="container">
          <div className="section-title mb-60 text-center" style={{ backgroundImage: "url('assets/img/logo/section.png')" }}>
            <h4>Service</h4>
            <h2>Partners</h2>
          </div>
          <div className="row">
            {particularpartner.map((value, index) => {
              return (
                <div className="col-lg-4 col-md-6" key={index}>
                  <div className="service-wrapper mb-30">
                    <div className="service-img">
                      <img src={value.photo ? value.photo : '/whychoose.png'} alt={value.fullname}
                        style={{ height: '100%', width: '100%', objectFit: 'cover' }}

                      />
                    </div>
                    <div className="service-text text-center">
                      <div className="service-icon-img">
                        <i className="flaticon-house-icon"></i>
                      </div>
                      <h1>{value.fullname}</h1>
                      <p>{value.subcategoryInfo}</p><br />
                      <h5 style={{ fontWeight: "bold" }}>${value.price} (Per-Hour)</h5>
                      <Link
                        onClick={(event) => {
                          event.preventDefault(); // Prevent default link behavior
                          sendPartnerId(value._id); // Call your function
                        }}
                      >read more</Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewParticularPartner;
