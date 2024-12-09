import { Link } from "react-router-dom";

function PublicNavbar() {
  return (
    <>
      <header>
        {/* <!-- header-top-area-start --> */}
        <div className="header-top-area blue-bg">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-3 col-6 site-branding">
                <div className="header-logo">
                  <Link to="/"><img src="/assets/img/logo/logo-png.png" alt="" style={{ height: "70px", width: "170px" }} /> </Link>
                </div>
              </div>
              <div className="col-xl-5 col-lg-6 col-md-9 d-none d-md-block">
                <div className="header-left">
                  <div className="header-text">
                    <div className="header-icon">
                      <i className="fa fa-phone"></i>
                      <i className="paint-roller"></i>
                    </div>
                    <div className="header-info">
                      <span className="phone">+00-0000-000</span>
                      <span className="gmail">CareCall@gmail.com</span>
                    </div>
                  </div>
                  <div className="header-text">
                    <div className="header-icon">
                      <i className="fa fa-home"></i>
                    </div>
                    <div className="header-info">
                      <span className="phone">2024 Amritsar-1,</span>
                      <span className="gmail">Punjab, INDIA</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-3 col-6 d-block d-md-none d-lg-block">
                <div className="header-left-icon">
                  <Link to="https://www.facebook.com/"><i className="fa fa-facebook"></i></Link>
                  <Link to="https://vimeo.com/"><i className="fa fa-vimeo"></i></Link>
                  <Link to="https://www.tumblr.com/"><i className="fa fa-tumblr"></i></Link>
                  <Link to="https://in.pinterest.com/"><i className="fa fa-pinterest-p"></i></Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- main-menu-area-start --> */}
        {/* <div id="header-sticky" className="main-menu-area gray-bg ">
          <div className="container">
            <div className="row">
              <div className=" col-xl-10 col-lg-8">
                <div className="main-menu">
                  <nav>
                    <ul>
                      <li className=""><Link to="/">home</Link>
                      </li>

                      <li><Link to="/partner-registration">Service provider</Link>
                        <ul className="sub-menu">
                          <li><Link to="/partner-registration">Create Account</Link></li>
                          <li><Link to="/partner-login">Sign-In</Link></li>
                        </ul>
                      </li>
                      <li><Link to="/about-us">About Us</Link></li>
                      <li><Link to="/contact-us">contact</Link></li>
                    </ul>
                  </nav>
                </div>
              </div>
              <div className=" col-xl-2 col-lg-4">
                <div className="make-appointment">
                  <img src="assets/img/logo/2.png" alt="" />
                  <Link to="/email">Login/Register</Link>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="mobile-menu"></div>
              </div>
            </div>
          </div>
        </div> */}
        {/* <!-- main-menu-area-end --> */}

        {/* <!-- main-menu-area-start --> */}
        <div id="header-sticky" className="main-menu-area gray-bg ">
          <div className="container">
            <div className="row">
              <div className=" col-xl-10 col-lg-8">
                <div className="main-menu">
                  <nav>
                    <ul>
                      <li ><Link to="/">Home</Link>
                      </li>
                      <li><Link to="/partner-registration">Partners</Link>
                        <ul className="sub-menu">
                          <li><Link to="/partner-registration">SignUp</Link></li>
                          <li><Link to="/partner-login">SignIn</Link></li>
                        </ul>
                      </li>
                      <li><Link to="/about-us">About Us</Link></li>
                      <li><Link to="/contact-us">contact</Link></li>
                    </ul>
                  </nav>
                </div>
              </div>
              <div className=" col-xl-2 col-lg-4">
                <div className="make-appointment">
                  <img src="assets/img/logo/2.png" alt="" />
                  <Link to="/email">SignUp/SignIn</Link>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="mobile-menu"></div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- main-menu-area-end --> */}


      </header>
    </>
  )
}

export default PublicNavbar;