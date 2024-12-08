import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect } from "react";
import { utilityFunctions } from "../../utils/module";
import { Server_URL } from "../../utils/config"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../../utils/Toasthelper";
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { Container, Row, Col } from 'react-bootstrap';


function PartnerLogin() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setFocus,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  async function onSubmit(data) {
    try {
      const url = Server_URL + "partner-login";
      const res = await axios.post(url, data);
      console.log(res.data);
      const { error, message } = res.data;
      if (error) {
        showErrorToast(message);
      } else {
        const { token } = res.data;
        reset();
        showSuccessToast(message);
        utilityFunctions.setCookie('partnerAuthToken', token, 24)
        navigate('/partner/dashboard');
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  }

  useEffect(() => {
    setFocus('email')
  }, []);

  return (
    <Container fluid className="d-flex justify-content-center align-items-center min-vh-100" style={styles.background}>
      <Row className="w-100 d-flex justify-content-center align-items-center">
        <Col md={8} lg={6} className="d-flex justify-content-center align-items-center">
          <div style={styles.formContainer}>
            <h3 className="text-center mb-4" style={styles.headerText}>Partner Login</h3><br />
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <div className="input-group">
                  <span className="input-group-text" style={styles.iconContainer}><FaEnvelope /></span>
                  <input
                    {...register("email", { required: true })}
                    className="form-control"
                    type="email"
                    placeholder="Email ID"
                    style={styles.input}
                  />
                </div><br />
                {errors.email && <p className="text-danger">This field is required</p>}
              </div>
              <div className="mb-3">
                <div className="input-group">
                  <span className="input-group-text" style={styles.iconContainer}><FaLock /></span>
                  <input
                    {...register("password", { required: true })}
                    className="form-control"
                    type="password"
                    placeholder="Password"
                    style={styles.input}
                  />
                </div>
                {errors.password && <p className="text-danger">This field is required</p>}
              </div>
              <div className="d-flex justify-content-end mb-3">
                <Link to="/partner-forgot-password" className="text-primary">Forgot Password?</Link>
              </div>
              <button className="btn w-100" style={styles.button}>Login</button>
              <p className="text-center mt-3">
                Don’t have an account? <Link to="/partner-registration" className="text-primary">Register</Link>
              </p>
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

const styles = {
  background: {
    background: 'linear-gradient(135deg, #193e40, #132e4f)', // Gradient background
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    backgroundColor: 'rgba(0, 40, 72)', // Translucent background
    borderRadius: '10px',
    padding: '60px 40px', // Increased padding for larger form
    width: '100%',
    maxWidth: '500px', // Increased max width for larger form
    backdropFilter: 'blur(10px)', // Blurring the background for effect
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
  },
  headerText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: '28px', // Increased font size for more prominence
  },
  iconContainer: {
    backgroundColor: '#FFFFFF',
    border: 'none',
  },
  input: {
    border: 'none',
    paddingLeft: '10px',
    fontSize: '16px', // Slightly larger text for better readability
  },
  button: {
    background: 'linear-gradient(135deg, #4E54C8, #132e4f)',
    color: '#FFFFFF',
    border: 'none',
    padding: '12px',
    fontSize: '18px', // Larger button size
  },
};

export default PartnerLogin;
