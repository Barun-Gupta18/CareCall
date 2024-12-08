import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <footer>
        {/* <!-- footer-top-area-start --> */}
        <div className="footer-top-area footer-top pt-100 bg-opacity pb-70" style={{ backgroundImage: 'url("/assets/img/bg/5.jpg")' }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-sm-6 pe-0">
                <div className="footer-wrapper mb-30">
                  <h2 className="footer-section">about us</h2>
                  <div className="footer-text">
                    <p> At CareCall, we’re more than just a service provider; we’re a dedicated partner in keeping your home running smoothly and comfortably. </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-2 offset-lg-1 col-sm-6">
                <div className="footer-wrapper mb-30">
                  <h2 className="footer-section">SERVICES</h2>
                  <ul className="footer-menu">
                    <li><Link to="/all-category">Repair</Link></li>
                    <li><Link to="/all-category">Wash</Link></li>
                    <li><Link to="/all-category">Paint</Link></li>
                    <li><Link to="/all-category">Maintains</Link></li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-2 offset-lg-1 col-sm-6">
                <div className="footer-wrapper mb-30">
                  <h2 className="footer-section">link</h2>
                  <ul className="footer-menu">
                    <li><Link to="/about-us">Our Company</Link></li>
                    <li><Link to="/all-category">Services</Link></li>
                    <li><Link to="#">Recent Work</Link></li>
                    <li><Link to="/contact-us">Contact Us</Link></li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="footer-wrapper mb-30">
                  <h2 className="footer-section">address</h2>
                  <ul className="footer-link">
                    <li><i className="fa fa-envelope-open"></i><span>House no.122(c), Amritsar-1 </span></li>
                    <li><i className="fa fa-phone "></i><span>(000) 999 9999</span></li>
                    <li><i className="fa fa-envelope-open"></i><span>CareCall@gmail.com</span></li>
                    <li><i className="fa fa-clock-o"></i><span>Sat - Fry: 9:00 am- 6:00pm</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- footer-top-area-end --> */}
        {/* <!-- footer-bottom-area-start --> */}
        <div className="footer-bottom-area footer-bottom footer-bottom-1 black-bg-2 ptb-20">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="copyright">
                  <p>&copy; CareCall
                    <script>
                      document.write(new Date().getFullYear() + ' ');
                    </script> Made  <i className="fa fa-heart"></i> by <a href="https://hasthemes.com/" target="_blank" rel="noopener">Barun Gupta</a></p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="footer-icon">
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
        {/* <!-- footer-bottom-area-end --> */}
      </footer>
    </>
  )
}

export default Footer;