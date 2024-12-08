import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect } from "react";
import { Server_URL } from "../../utils/config"
import { useNavigate } from "react-router-dom";
import { showErrorToast } from "../../utils/Toasthelper";
import { FaEnvelope } from 'react-icons/fa';
import { Container, Row, Col } from 'react-bootstrap';

function UserLogin() {
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
      const url = Server_URL + "user-check-email";
      const res = await axios.post(url, data);
      // console.log(res.data);
      const { error, message } = res.data;
      if (error) {
        // alert(message);
        showErrorToast(message)
      } else {
        const { result } = res.data
        reset();
        if (result.length > 0) {
          navigate('/user-login');
        } else {
          navigate('/user-registration')
        }
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
            <h3 className="text-center mb-4" style={styles.headerText}>Email</h3><br />
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
                </div>
                {errors.email && <p className="text-danger">This field is required</p>}
              </div><br />
              <button className="btn w-100" style={styles.button}>Continue</button>
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

export default UserLogin;
