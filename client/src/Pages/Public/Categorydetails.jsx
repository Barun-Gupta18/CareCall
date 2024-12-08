import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Server_URL } from '../../utils/config';
import { showErrorToast } from '../../utils/Toasthelper';


function Categorydetails() {
  const { register, handleSubmit, formState: { errors }, reset, setFocus } = useForm();


  const navigate = useNavigate();
  const location = useLocation();

  const [category, setCategory] = useState([]);
  const [id, setId] = useState(() => location.state?.cid || localStorage.getItem('categoryId'));

  useEffect(() => {
    // If `id` is defined, save it to local storage and fetch data.
    if (id) {
      console.log(id)
      localStorage.setItem('categoryId', id);
      getParticularCategoryData(id);
    } else {
      showErrorToast("Category ID is missing.");
    }
  }, [id]);
  async function getParticularCategoryData() {
    try {
      // console.log(id)
      const url = Server_URL + "view-Particular-Category-Data/" + id;
      const response = await axios.get(url);
      // console.log(response);
      const { error, message } = response.data;
      if (error) {
        showErrorToast(message);
      } else {
        const { result } = response.data;
        // console.log(result)
        setCategory(result);
        // console.log(particularsubcategory)
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  }

  useEffect(() => {
    getParticularCategoryData();
  }, []);

  async function sendCategoryId(id) {
    navigate('/particular-subcategory', { state: { id } });
  }


  return (
    <>

      {/* // <!-- breadcrumb-banner-area --> */}
      <div className="breadcrumb-banner-area ptb-120 bg-opacity" style={{ backgroundImage: 'url("assets/img/bg/6.jpg")' }}>
        <div className="container">
          <div className="row">
            {category.map((value, index) => {
              return (
                <div className="col-lg-12" key={index}>
                  <div className="breadcrumb-text text-center">
                    <h2>{value.categoryname}</h2>
                    <ul className="breadcrumb-menu">
                      <li><p>{value.description}</p></li>
                      {/* <li><a href="#">about us</a></li> */}
                    </ul>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      {/* // <!-- breadcrumb-banner-area-end --> */}
      {/* // <!-- project-details-area-start --> */}
      <div className="project-details-area pt-120">
        <div className="container">
          <div className="row justify-content-center">
            {category.map((value, index) => (
              <div className="col-md-6 d-flex justify-content-center" key={index}>
                <div className="project-details-img-wrapper">
                  <img
                    src={value.photo ? value.photo : '/whychoose.png'}
                    alt={value.categoryname}
                    className="img-fluid shadow-lg rounded"
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* // <!-- project-details-area-start --> */}
      {/* // <!-- project-details-3-start --> */}
      <div className="project-details-3 pt-40 pb-50">
        <div className="container">
          <div className="row">
            {category.map((value, index) => {
              return (
                <div className="col-lg-12" key={index}>
                  <div className="project-text">
                    <h3>{value.categoryname}</h3>
                    {/* <p>{value.description}</p> */}
                    <p>{value.briefDescription}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      {/* // <!-- project-details-3-end --> */}
      {/* // <!-- project-details-2-start --> */}
      <div className="project-details-2 pb-90">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="project-details-2-wrapper mb-30">
                <h3 className="project-2-text">Why Choose Us</h3>
                <div className="project-details-2-content">
                  <p>Our team is made up of certified experts, ensuring that every service meets the highest standards of quality and reliability.We believe in honesty and transparency, providing upfront pricing with no hidden fees, so you know exactly what to expect.With flexible booking options and prompt service, we fit seamlessly into your schedule to keep your home running smoothly.</p>
                  <ul className="deatils-menu">
                    <li>Fast & Convenient</li>
                    <li>Transparent Pricing</li>
                    <li>Trusted Professionals</li>
                    <li>Fast Completion Date</li>
                  </ul>
                  <ul className="deatils-menu floatright">
                    <li>Customer Satisfaction Guaranteed</li>
                    <li> Comprehensive Range of Services</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="project-details-2-wrapper mb-30">
                <img className='img-fluid shadow-lg rounded' src="/whychoose.png" alt='' />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* // <!-- project-details-2-end --> */}

      {category.map((value, index) => (
        <div className="pricing-btn d-flex justify-content-center mt-4" key={index}>
          <Link
            to="#"
            className="btn btn-dark"
            onClick={(event) => {
              event.preventDefault(); // Prevent default link behavior
              sendCategoryId(value._id); // Call your function
            }}
          >
            Sub-service
          </Link>
        </div>
      ))}



    </>
  )
};

export default Categorydetails;

