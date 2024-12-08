import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { utilityFunctions } from "../utils/module";
function AdminNavbar() {

  const navigate = useNavigate();

  function adminlogout(e) {
    e.preventDefault(); // link not navigate anywhere
    utilityFunctions.removeCookie('adminAuthToken');
    navigate('/');
  }
  return (
    <>
      <header>
        {/* <!-- header-top-area-start --> */}
        <div className="header-top-area blue-bg">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-3 col-6 site-branding">
                <div className="header-logo">
                  <Link to="/admin/dashboard"><img src="/assets/img/logo/logo-png.png" alt="" style={{ height: "70px", width: "170px" }} /> </Link>
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
        <div id="header-sticky" className="main-menu-area gray-bg">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-6 col-lg-10">
                <div className="main-menu d-none d-lg-block">
                  <nav>
                    <ul>
                      <li>
                        <Link to="/admin/dashboard">Dashboard</Link>
                      </li>
                      <li>
                        <Link to="/admin/registration">Admin</Link>
                        <ul className="sub-menu">
                          <li>
                            <Link to="/admin/registration">Add Admin</Link>
                            <Link to="/admin/view">View Admin</Link>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <Link to="/admin/add-category">Service</Link>
                        <ul className="sub-menu">
                          <li>
                            <Link to="/admin/add-category">Add Service</Link>
                            <Link to="/admin/view-category">View Service</Link>
                          </li>
                        </ul>
                      </li>
                      <li><Link to="/admin/add-subcategory">Sub-service</Link>
                        <ul className="sub-menu">
                          <li>
                            <Link to='/admin/add-subcategory'>Add sub-service</Link>
                            <Link to='/admin/view-subcategory'>View Sub-service</Link>
                          </li>
                        </ul>
                      </li>

                      <li><Link to="/admin/add-state">State</Link>
                        <ul className="sub-menu">
                          <li>
                            <Link to='/admin/add-state'>Add State</Link>
                            <Link to='/admin/view-state'>View States</Link>
                          </li>
                        </ul>
                      </li>

                      <li><Link to="/admin/add-city">City</Link>
                        <ul className="sub-menu">
                          <li>
                            <Link to='/admin/add-city'>Add City</Link>
                            <Link to='/admin/view-city'>View Cites</Link>
                          </li>
                        </ul>
                      </li>

                      <li><Link to="/admin/confirm-booking">Bookings</Link>
                        <ul className="sub-menu">
                          <li>
                            <Link to='/admin/confirm-booking'>Confirmed</Link>
                            <Link to='/admin/complete-booking'>Completed</Link>
                            <Link to='/admin/cancele-booking'>Canceled</Link>
                          </li>
                        </ul>
                      </li>

                      <li className=""><Link to='/admin/show-all-partner'>Partners</Link></li>

                      <li className=""><Link to='/admin/show-all-user'>Users</Link></li>

                      <li><Link to="/admin/dashboard">Setting</Link>
                        <ul className="sub-menu">
                          <li>
                            <Link to='/admin/view'>Profile</Link>
                            <Link to="/admin/change-password">Change password</Link>
                            {/* <Link onClick={adminlogout} to="#">Logout</Link> */}
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </nav>
                </div>
                {/* Mobile Menu */}
                <div className="mobile-menu d-lg-none">
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                      <li className="nav-item">
                        <Link className="nav-link" to="/admin/dashboard">
                          Dashboard
                        </Link>
                      </li>
                      {/* Other menu items */}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-6 col-lg-2 text-end">
                <div className="make-appointment">
                  <img src="/assets/img/logo/2.png" alt="Make Appointment" />
                  <Link onClick={adminlogout} to="#">Logout</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- main-menu-area-end --> */}
      </header>

    </>
  )
}

export default AdminNavbar;