import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Server_URL } from "../../utils/config";
import { showErrorToast } from "../../utils/Toasthelper";


function About() {

  const [partner, setPartner] = useState([]);


  async function getPartnerData() {
    try {
      const url = Server_URL + "show-all-partner-public";
      const response = await axios.get(url);
      const { error, message, result } = response.data;
      if (error) {
        showErrorToast(message);
      } else {
        const activePartners = result.filter(partner => partner.status === 'active');
        setPartner(activePartners);
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  }

  useEffect(() => {
    getPartnerData();
  }, []);

  return (
    <>
      {/* <!-- breadcrumb-banner-area --> */}
      <div className="breadcrumb-banner-area ptb-120 bg-opacity" style={{ backgroundImage: 'url("assets/img/bg/6.jpg")' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb-text text-center">
                <h2>about us</h2>
                <p>Make's your Life easy. </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- breadcrumb-banner-area-end --> */}


      {/* <!-- about-area-start --> */}
      <div className="about-area">
        <div className="container">
          <div className="row">
            <div className="col-xl-5 col-lg-6">
              <div className="about-wrapper">
                <div className="about-text">
                  <h2><span>15 years</span> of experience in this business.</h2>
                  <h4> Bringing Expertise and Care Right to Your CareCall.</h4>
                  <p>
                    At CareCall, we’re more than just a service provider; we’re a dedicated partner in keeping your home running smoothly and comfortably. Our team of experienced professionals is committed to delivering reliable, efficient, and high-quality home services tailored to meet your needs. From quick fixes to detailed repairs, we approach every job with the highest standards of care and expertise, ensuring peace of mind for you and your family.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-7 col-lg-6">
              <div className="about-right-wrapper" style={{ backgroundImage: 'url("assets/img/bg/7.png")' }}>
                <div className="about">
                  <div className="about-right-text">
                    <div className="about-right-img">
                      <img src="assets/img/about/1.png" alt="" />
                    </div>
                    <div className="about-content">
                      <h2>24/7 Services</h2>
                    </div>
                  </div>
                  <div className="about-right-text">
                    <div className="about-right-img">
                      <img src="assets/img/about/2.png" alt="" />
                    </div>
                    <div className="about-content">
                      <h2>Affordable Price</h2>
                    </div>
                  </div>
                  <div className="about-right-text">
                    <div className="about-right-img">
                      <img src="assets/img/about/3.png" alt="" />
                    </div>
                    <div className="about-content">
                      <h2>Professional HandyMan</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- about-area-end --> */}


      {/* <!-- counter-2-area-start --> */}
      <div className="counter-area pt-120 pb-90 bg-opacity" style={{ backgroundImage: 'url("assets/img/bg/1.jpg")' }}>
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-6">
              <div className="counter-2-wrapper mb-30">
                <div className="counter-2-img text-center">
                  <img src="assets/img/counter/1.png" alt="" />
                </div>
                <div className="counter-2-text text-center">
                  <h2 className="counter">340</h2>
                  <span>Happy Customers</span>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="counter-2-wrapper mb-30">
                <div className="counter-2-img text-center">
                  <img src="assets/img/counter/2.png" alt="" />
                </div>
                <div className="counter-2-text text-center">
                  <h2 className="counter">440</h2>
                  <span>Happy Customers</span>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="counter-2-wrapper mb-30">
                <div className="counter-2-img text-center">
                  <img src="assets/img/counter/3.png" alt="" />
                </div>
                <div className="counter-2-text text-center">
                  <h2 className="counter">100</h2>
                  <span>Happy Customers</span>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="counter-2-wrapper mb-30">
                <div className="counter-2-img text-center">
                  <img src="assets/img/counter/4.png" alt="" />
                </div>
                <div className="counter-2-text text-center">
                  <h2 className="counter">720</h2>
                  <span>Happy Customers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- counter-2-area-end --> */}


      {/* <!-- team-area-start --> */}
      <div className="team-area pt-110 pb-90">
        <div className="container">
          <div className="section-info text-center mb-65">
            <h2>Team Member</h2>
            <p>your hard work, passion, and commitment inspire us every day. </p>
          </div>
          <div className="row">
            {(partner.slice(0, 3)).map((value, index) => {
              return (
                <div className="col-lg-3 col-sm-6" key={index}>
                  <div className="team-wrapper mb-30">
                    <div className="team-img">
                      <img
                        src={value.photo}
                        alt={value.fullname}
                        style={{
                          height: '250px', // Adjust as needed
                          width: '250px',  // Adjust as needed
                          objectFit: 'cover', // Ensures the image fills the area without stretching
                          borderRadius: '50%', // Optional: makes the image circular
                        }}
                      />
                      <div className="team-text text-center">
                        <h3>{value.fullname}</h3>
                        <span>{value.categoryInfo}</span>
                        <div className="team-icon">
                          <Link to="https://www.facebook.com/"><i className="fa fa-facebook"></i></Link>
                          <Link to="https://vimeo.com/"><i className="fa fa-vimeo"></i></Link>
                          <Link to="https://www.tumblr.com/"><i className="fa fa-tumblr"></i></Link>
                          <Link to="https://in.pinterest.com/"><i className="fa fa-pinterest-p"></i></Link>
                          <Link to="https://x.com/?lang=en"><i className="fa fa-twitter"></i></Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}

          </div>
        </div>
      </div>
      {/* <!-- team-area-start --> */}


      {/* <!-- action-area-start --> */}
      <div className="action-area bg-opacity ptb-110" style={{ backgroundImage: 'url("assets/img/bg/7.jpg")' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="action-wrapper">
                <div className="action-text">
                  <h2>We provide professional services with an amazing team. </h2>
                  {/* <a href="#">get a quote</a> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- action-area-end --> */}


      {/* <!-- brand-area-start --> */}
      <div className="brand-area ptb-120">
        <div className="container">
          <div className="section-info text-center mb-70">
            <h2>Our Clients</h2>
            <p>They can trust on us since last ten years.</p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "20px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="brand-wrapper">
              <div className="brand-img">
                <img src="assets/img/brand/1.png" alt="" />
              </div>
            </div>
            <div className="brand-wrapper">
              <div className="brand-img">
                <img src="assets/img/brand/2.png" alt="" />
              </div>
            </div>
            <div className="brand-wrapper">
              <div className="brand-img">
                <img src="assets/img/brand/3.png" alt="" />
              </div>
            </div>
            <div className="brand-wrapper">
              <div className="brand-img">
                <img src="assets/img/brand/4.png" alt="" />
              </div>
            </div>
            <div className="brand-wrapper">
              <div className="brand-img">
                <img src="assets/img/brand/1.png" alt="" />
              </div>
            </div>
            <div className="brand-wrapper">
              <div className="brand-img">
                <img src="assets/img/brand/4.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- brand-area-end --> */}
    </>
  )
};

export default About;