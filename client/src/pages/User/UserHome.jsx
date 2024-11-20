import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { utilityFunctions } from "../../utils/module";
import { Server_URL, Server_URL2 } from "../../utils/config";
import { showErrorToast, showSuccessToast } from "../../utils/Toasthelper";
import { Link } from "react-router-dom";
import { MdOutlineWash } from "react-icons/md";


function UserHome() {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
  } = useForm();

  const navigate = useNavigate();
  const [category, setCategory] = useState([]);


  async function getCategory() {
    try {
      const token = utilityFunctions.getCookieValue('userAuthToken');
      const url = Server_URL + "view-category-user";
      const response = await axios.get(url, {
        headers: {
          Authorization: token ? `Bearer ${token}` : ""
        }
      });
      // console.log(headers);
      const { error, message } = response.data;
      if (error && message === "SignIn") {
        navigate('/user-login')
      }
      else if (error) {
        showErrorToast(message);
      } else {
        const { result } = response.data;
        setCategory(result);
      }
      // }
    } catch (error) {
      showErrorToast(error.message);
    }
  }

  async function sendCategoryId(id) {
    navigate('/user/sub-category', { state: { id } });
  }

  async function sendCategoryIdfordetails(cid) {
    console.log(cid)
    navigate('/user/single-category', { state: { cid } });
  }

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <>
      {/* <!-- slider-area-start --> */}
      <div className="slider-area">
        <div className="slider-wrapper ptb-250" style={{ backgroundImage: "url('/assets/img/slider/1.jpg')" }}>
          <div className="container">
            <div className="row">
              <div className="col-xl-6 col-lg-8 pr-0">
                <div className="slider-text">
                  <h2 className="cd-headline loading-bar">The most targetted repair
                    <span className="cd-words-wrapper">
                      <b className="is-visible">theme.</b>
                      <b>company.</b>
                      <b>man.</b>
                    </span>
                  </h2>
                  <div className="slider-info">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, seddoi dmj iusmod tempor incididunt ut labore.</p>
                  </div>
                  <a href="#">learn more</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- slider-area-end --> */}

      {/* <!-- what-we-do-start --> */}
      <div className="what-we-do ptb-120">
        <div className="container">
          <div className="section-title mb-60 text-center" style={{ backgroundImage: "url('/assets/img/logo/section.png')" }}>
            <h4>Our Company</h4>
            <h2>What We Do</h2>
          </div>
          <div className="row">
            <div className="col-lg-6 p-r">
              <div>
                {/* <!-- Nav tabs --> */}
                <ul className="nav offer-tab" role="tablist">
                  <li role="presentation">
                    <a className="active" href="#home" aria-controls="home" role="tab" data-bs-toggle="tab">
                      <div className="offer-list">
                        <div className="offer-icon">
                          <i className="flaticon-plus-icon"></i>
                        </div>
                        <div className="offer-text">
                          <span>Repair</span>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li role="presentation">
                    <a href="#profile" aria-controls="home" role="tab" data-bs-toggle="tab">
                      <div className="offer-list">
                        <div className="offer-icon">
                          <i className=""><MdOutlineWash /></i>
                        </div>
                        <div className="offer-text">
                          <span>Wash</span>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li role="presentation">
                    <a href="#messages" aria-controls="home" role="tab" data-bs-toggle="tab">
                      <div className="offer-list">
                        <div className="offer-icon">
                          <i className="flaticon-paint-brush"></i>
                        </div>
                        <div className="offer-text">
                          <span>paint</span>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li role="presentation">
                    <a href="#settings" aria-controls="home" role="tab" data-bs-toggle="tab">
                      <div className="offer-list">
                        <div className="offer-icon">
                          <i className="flaticon-strategy-icon"></i>
                        </div>
                        <div className="offer-text">
                          <span>maintains</span>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6 p-t">
              {/* <!-- Tab panes --> */}
              <div className="tab-content">
                <div role="tabpanel" className="tab-pane show active" id="home">
                  <div className="offer-wrapper" style={{ backgroundImage: "url('/assets/img/tab/1.jpg')" }}>
                    <div className="offer-content">
                      <p>Repair Services the restoration of Equipment to its original function on an as-needed basis, as may be required by the Facility in response to the failure or malfunctioning of such equipment. The repair process may also include servicing, reconditioning, modification, and refurbishment..</p>
                      <ul className="tab-menu">
                        <li> Wooden Repair</li>
                        <li> Electronics Reapir</li>
                        <li> House Repair</li>
                        <li> Bike Repair</li>
                        <li> Wire Change</li>
                        <li> Furniture Repair</li>
                      </ul>
                      <a href="#">contact now</a>
                    </div>
                  </div>
                </div>
                <div role="tabpanel" className="tab-pane" id="profile">
                  <div className="offer-wrapper" style={{ backgroundImage: "url('/assets/img/tab/2.jpg')" }}>
                    <div className="offer-content">
                      <p>Water, sanitation, and hygiene (WASH) services are important for human health and well-being. WASH services can help prevent and manage diseases, improve educational outcomes, and reduce poverty. Here are some facts about WASH services.</p>
                      <ul className="tab-menu">
                        <li> Car wash</li>
                        <li> house wash</li>
                        <li> Backyard wash</li>
                        <li> Cloth wash</li>
                        <li> Bike wash</li>
                        <li> Fash wash</li>
                      </ul>
                      <a href="#">contact now</a>
                    </div>
                  </div>
                </div>
                <div role="tabpanel" className="tab-pane" id="messages">
                  <div className="offer-wrapper" style={{ backgroundImage: "url('/assets/img/tab/3.jpg')" }}>
                    <div className="offer-content">
                      <p>They involve a comprehensive approach that includes proper surface preparation, repair of any imperfections, expert color consultation, and the use of high-quality materials.</p>
                      <ul className="tab-menu">
                        <li> House paint </li>
                        <li> Car paint</li>
                        <li> House-Hold paint</li>
                        <li> Door paint</li>
                        <li> Office paint</li>
                        <li> Windows paint</li>
                      </ul>
                      <a href="#">contact now</a>
                    </div>
                  </div>
                </div>
                <div role="tabpanel" className="tab-pane" id="settings">
                  <div className="offer-wrapper" style={{ backgroundImage: "url('/assets/img/tab/4.jpg')" }}>
                    <div className="offer-content">
                      <p>From the time a business acquires an asset, they should already have a maintenance plan ready for implementation. Routine maintenance techniques like cleaning and regular inspections are often done on a weekly, monthly, and sometimes even daily basis.</p>
                      <ul className="tab-menu">
                        <li> House maintance </li>
                        <li> AC maintance</li>
                        <li> Care Taker</li>
                        <li> Wire maintance</li>
                        <li> Car maintance</li>
                        <li> bike maintance</li>
                      </ul>
                      <a href="#">contact now</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- what-we-do-end --> */}

      {/* <!-- home-service-start --> */}
      <div className="home-service-area gray-bg">
        <div className="row">
          <div className="col-lg-6 p-0">
            <div className="home-service-wrapper ptb-120" style={{ backgroundImage: "url('/assets/img/service/1.jpg')" }}>
              <div className="home-content">
                <h3>Helping centers 24/7 <samp> <br></br></samp>  hours open.</h3>
                <div className="content">
                  <h4>Contact Us :</h4>
                  <p>+00 0000 0000 <samp> <br></br></samp> CareCall@gmail.com</p>
                </div>
              </div>

            </div>
          </div>
          <div className="col-lg-6 p-0">
            <div className="home-area-right">
              <div className="home-section">
                <h3>We Are Professional & Carefully Home Services.</h3>
                <div className="homes-info">
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incidid ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="home-wrapper mb-20">
                    <div className="home-text">
                      <p>Lorem ipsum dolor sit amet consect adipisicing elit sed. </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="home-wrapper mb-20">
                    <div className="home-text">
                      <p>Lorem ipsum dolor sit amet consect adipisicing elit sed. </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-20">
                  <div className="home-wrapper">
                    <div className="home-text">
                      <p>Lorem ipsum dolor sit amet consect adipisicing elit sed. </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-20">
                  <div className="home-wrapper">
                    <div className="home-text">
                      <p>Lorem ipsum dolor sit amet consect adipisicing elit sed. </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- home-service-end --> */}

      {/* <!-- our-service-area-start --> */}
      <div className="our-service-area pt-120 pb-90">
        <div className="container">
          <div className="section-title mb-60 text-center" style={{ backgroundImage: "url('assets/img/logo/section.png')" }}>
            <h4>Our</h4>
            <h2>Services</h2>
          </div>
          <div className="row">
            {(category.slice(0, 3)).map((value, index) => {
              return (
                <div className="col-lg-4 col-md-6" key={index}>
                  <div className="service-wrapper mb-30">
                    <div className="service-img">
                      <img src={`${Server_URL2}${value.photo}`} alt={value.categoryname} />
                    </div>
                    <div className="service-text text-center">
                      <div className="service-icon-img">
                        <i className="flaticon-house-icon"></i>
                      </div>
                      <h2 onClick={() => sendCategoryId(value._id)}><Link>{value.categoryname}</Link></h2>
                      <h4>{value.description} </h4>
                      <Link
                        onClick={(event) => {
                          event.preventDefault(); // Prevent default link behavior
                          sendCategoryIdfordetails(value._id); // Call your function
                        }}
                      >read more</Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="pricing-btn d-flex justify-content-center mt-4">
            <Link to="/all-category" className="btn btn-dark">View All</Link>
          </div>
          {/* <Link className="btn btn-primary btn lg btn-center" to="/all-category">View All</Link> */}
        </div>
      </div>
      {/* <!-- our-service-area-end --> */}

      {/* <!-- testimonial-1-area-start --> */}
      <div className="testimonial-1-area pt-120 pb-200 gray-bg">
        <div className="container">
          <div className="section-title text-center" style={{ backgroundImage: "url('assets/img/logo/section.png')" }}>
            {/* <h4>Testimonial</h4> */}
            <h2>What Clients Say</h2>
          </div>
        </div>
      </div>
      {/* <!-- testimonial-1-area-end --> */}

      {/* <!-- testimonial-area-start --> */}
      <div className="testimonial-area">
        <div className="container">
          <div className="row">
            {/* <div className="testimonial-active owl-carousel"> */}
            <div className="col-md-4">
              <div className="testimonial-wrapper mb-30">
                <div className="testimonial-img text-center">
                  <img src="/assets/img/testimonial/1.jpg" alt="" />
                </div>
                <div className="testimonial-text text-center">
                  <p>Thank you Care-Call for the best finishing, you have exceeded my expectations and my whole family appricated for the colours and designs. Thanks for the right suggestions and work.... </p>
                  <span>Kanika</span>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="testimonial-wrapper mb-30">
                <div className="testimonial-img text-center">
                  <img src="/assets/img/testimonial/2.jpg" alt="" />
                </div>
                <div className="testimonial-text text-center">
                  <p>Team was very responsive and had knowledged persons. I have taken service for my 3bhk house complete balcony and washrooms Washing work. Workers were very polite and workaholic. . </p>
                  <span>Kushi Chaudhary</span>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="testimonial-wrapper mb-30">
                <div className="testimonial-img text-center">
                  <img src="/assets/img/testimonial/3.jpg" alt="" />
                </div>
                <div className="testimonial-text text-center">
                  <p>I recently used online Care-Call services and they are very polite and helpful. The customer service is highly supportive, and the maid working in my house is well trained and well spoken. ..</p>
                  <span>Bharti</span>
                </div>
              </div>
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>
      {/* <!-- testimonial-area-end --> */}
      {/* <!-- counter-area-start --> */}
      <div className="counter-area pt-120 pb-85">
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-6">
              <div className="counter-wrapper mb-30">
                <div className="counter-img">
                  <img src="/assets/img/counter/1.png" alt="" />
                </div>
                <div className="counter-text">
                  <h2 className="counter">340</h2>
                </div>
                <span className="customers">Happy Customers</span>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="counter-wrapper mb-30">
                <div className="counter-img">
                  <img src="/assets/img/counter/2.png" alt="" />
                </div>
                <div className="counter-text">
                  <h2 className="counter">440</h2>
                </div>
                <span className="customers">COMPLET PROJECTS</span>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="counter-wrapper mb-30">
                <div className="counter-img">
                  <img src="/assets/img/counter/3.png" alt="" />
                </div>
                <div className="counter-text">
                  <h2 className="counter">100</h2>
                </div>
                <span className="customers">AWARDS WINNING</span>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="counter-wrapper mb-30">
                <div className="counter-img">
                  <img src="/assets/img/counter/4.png" alt="" />
                </div>
                <div className="counter-text">
                  <h2 className="counter">720</h2>
                </div>
                <span className="customers">WORKERS EMPLOYED</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- counter-area-end --> */}
      {/* <!-- recent-work-area-start --> */}
      <div className="recent-work-area ptb-120 gray-bg ">
        <div className="container">
          <div className="section-title mb-60 text-center" style={{ backgroundImage: "url('assets/img/logo/section.png')" }}>
            <h4>Our Projects</h4>
            <h2>Recent Work</h2>
          </div>
          <div className="row">
            {/* <div className="works-active owl-carousel"> */}
            <div className="col-md-4">
              <div className="work-wrapper">
                <div className="work-img">
                  <a href="#"><img src="/assets/img/work/1.jpg" alt="" /></a>
                  <div className="work-text">
                    <h3><a href="#">Wall Paintings</a></h3>
                    <span>www.example.com</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="work-wrapper">
                <div className="work-img">
                  <a href="#"><img src="/assets/img/work/2.jpg" alt="" /></a>
                  <div className="work-text">
                    <h3><a href="#">Wall Paintings</a></h3>
                    <span>www.example.com</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="work-wrapper">
                <div className="work-img">
                  <a href="#"><img src="/assets/img/work/3.jpg" alt="" /></a>
                  <div className="work-text">
                    <h3><a href="#">Wall Paintings</a></h3>
                    <span>www.example.com</span>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="col-md-4">
              <div className="work-wrapper">
                <div className="work-img">
                  <a href="#"><img src="/assets/img/work/2.jpg" alt="" /></a>
                  <div className="work-text">
                    <h3><a href="#">Wall Paintings</a></h3>
                    <span>www.example.com</span>
                  </div>
                </div>
              </div>
            </div> */}
            {/* </div> */}
          </div>
        </div>
      </div>
      {/* <!-- recent-work-area-end --> */}
      {/* <!-- blog-area-start --> */}
      <div className="blog-area pt-120 pb-90">
        <div className="container">
          <div className="section-title mb-60 text-center" style={{ backgroundImage: "url('/assets/img/logo/section.png')" }}>
            <h4>blog</h4>
            <h2>Latest News</h2>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="blog-wrapper mb-30">
                <div className="blog-img">
                  <a href="#"><img src="/assets/img/blog/1.jpg" alt="" /></a>
                </div>
                <div className="blog-text">
                  <div className="blog-info">
                    <h3><a href="#">Lorem ipsum dolor sit amet conse.</a></h3>
                    <p>Lorem ipsum dolor sit amet con adipisic elit sed do eiusmod tel incididunt ut lab et dolore mag aliqua.</p>
                  </div>
                  <div className="blog-date">
                    <span><i className="fa fa-clock-o"></i>14 Sep, 2022</span>
                    <span><i className="fa fa-heart"></i>20 like</span>
                    <span><i className="fa fa-comment"></i>0 comments</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="blog-wrapper mb-30">
                <div className="blog-img">
                  <a href="#"><img src="/assets/img/blog/2.jpg" alt="" /></a>
                </div>
                <div className="blog-text">
                  <div className="blog-info">
                    <h3><a href="#">Lorem ipsum dolor sit amet conse.</a></h3>
                    <p>Lorem ipsum dolor sit amet con adipisic elit sed do eiusmod tel incididunt ut lab et dolore mag aliqua.</p>
                  </div>
                  <div className="blog-date">
                    <span><i className="fa fa-clock-o"></i>14 Sep, 2022</span>
                    <span><i className="fa fa-heart"></i>20 like</span>
                    <span><i className="fa fa-comment"></i>0 comments</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 d-block d-md-none d-lg-block">
              <div className="blog-wrapper mb-30">
                <div className="blog-img">
                  <a href="#"><img src="/assets/img/blog/3.jpg" alt="" /></a>
                </div>
                <div className="blog-text">
                  <div className="blog-info">
                    <h3><a href="#">Lorem ipsum dolor sit amet conse.</a></h3>
                    <p>Lorem ipsum dolor sit amet con adipisic elit sed do eiusmod tel incididunt ut lab et dolore mag aliqua.</p>
                  </div>
                  <div className="blog-date">
                    <span><i className="fa fa-clock-o"></i>14 Sep, 2022</span>
                    <span><i className="fa fa-heart"></i>20 like</span>
                    <span><i className="fa fa-comment"></i>0 comments</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- blog-area-start --> */}
    </>
  )
};

export default UserHome;
