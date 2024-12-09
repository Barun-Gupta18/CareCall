import React from 'react';
import { Link } from 'react-router-dom';

const ThankYouPage = () => {
  return (
    <div style={styles.thankYouContainer}>
      <div style={styles.iconContainer}>
        <img
          src="/home.png"
          alt="Email sent"
          style={styles.emailIcon}
        />
      </div>
      <h1>Thank you, enjoy!</h1>
      <h4>Make's your life you.</h4>
      <Link to="/user/my-orders" style={styles.backHomeButton}>
        &#8592; View Orders
      </Link>
      <p style={styles.contactMessage}>
        If you have any issues <Link to="/contact-us" style={styles.contactLink}>contact us</Link>.
      </p>
    </div>
  );
};

const styles = {
  thankYouContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    height: '70vh',
    fontFamily: 'Poppins, sans-serif',
    color: '#333',
    backgroundColor: '#f7f9fc',
  },
  iconContainer: {
    marginBottom: '20px',
  },
  emailIcon: {
    width: '120px',
    height: '120px',
  },
  backHomeButton: {
    display: 'inline-block',
    marginTop: '20px',
    padding: '12px 25px',
    backgroundColor: '#193e40',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '25px',
    fontWeight: 'bold',
    fontSize: '1rem',
    transition: 'background-color 0.3s',
  },
  backHomeButtonHover: {
    backgroundColor: '#132e4f',
    color: 'white',
  },
  contactMessage: {
    fontSize: '1.5rem',
    color: '#666',
    marginTop: '20px',
  },
  contactLink: {
    color: '#007bff',
    textDecoration: 'none',
    fontWeight: '500',
  },
  contactLinkHover: {
    textDecoration: 'underline',
  },
};

export default ThankYouPage;
