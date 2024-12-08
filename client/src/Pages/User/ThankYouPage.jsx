import React from 'react';
import { Link } from 'react-router-dom';
import './ThankYouPage.css';

const ThankYouPage = () => {
  return (
    <div className="thank-you-container">
      <div className="icon-container">
        <img
          src="/home.png"
          alt="Email sent"
          className="email-icon"
        />
      </div>
      <h1>Thank you, enjoy!</h1>
      <h4 >Make's your life you.</h4>
      <Link to="/user/my-orders" className="back-home-button">
        &#8592; View Orders
      </Link>
      <p className="contact-message">
        If you have any issues <Link to="/contact-us">contact us</Link>.
      </p>
    </div>
  );
};

export default ThankYouPage;
