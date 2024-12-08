import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect } from "react";
import { Server_URL } from "../../../utils/config";
import { useNavigate } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../../../utils/Toasthelper";
import { FaLock } from 'react-icons/fa';
import { Container, Row, Col } from 'react-bootstrap';

function AdminResetPassword() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
  } = useForm();

  async function onSubmit(data) {

    const email = localStorage.getItem('email');

    try {
      const payload = { ...data, email };  // Add the OTP to form data
      // console.log(payload)

      const url = Server_URL + "admin-reset-password";
      const response = await axios.post(url, payload);
      const { error, message } = response.data;

      if (error) {
        showErrorToast(message);
      } else {
        showSuccessToast(message);
        reset();
        localStorage.removeItem('email');
        navigate("/admin-login");
      }
    } catch (e) {
      showErrorToast(e.message);
    }
  }

  useEffect(() => {
    setFocus("newpassword");
  }, []);

  return (
    <Container fluid className="d-flex justify-content-center align-items-center min-vh-100" style={styles.background}>
      <Row className="w-100 d-flex justify-content-center align-items-center">
        <Col md={8} lg={6} className="d-flex justify-content-center align-items-center">
          <div style={styles.formContainer}>
            <h3 className="text-center mb-4" style={styles.headerText}>Reset password</h3><br />
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <div className="input-group">
                  <span className="input-group-text" style={styles.iconContainer}><FaLock /></span>
                  <input
                    {...register("newpassword", {
                      required: "Password is required",
                      validate: (value) => {
                        if (value.length < 2) return "Password must be at least 2 characters";
                        if (value.length > 6) return "Password must not exceed 6 characters";
                        return true;
                      },
                    })}
                    className="form-control"
                    type="password"
                    placeholder="Enter your new password"
                    style={styles.input}
                    onInput={(e) => e.target.value = e.target.value.replace(/\s/g, '')} // Remove spaces on input
                  />
                </div>
                {errors.newpassword && <p className="text-danger">This field is required</p>}
              </div><br />
              <div className="mb-3">
                <div className="input-group">
                  <span className="input-group-text" style={styles.iconContainer}><FaLock /></span>
                  <input
                    {...register("confirmpassword", {
                      required: "Password is required",
                      validate: (value) => {
                        if (value.length < 2) return "Password must be at least 2 characters";
                        if (value.length > 6) return "Password must not exceed 6 characters";
                        return true;
                      },
                    })}
                    className="form-control"
                    type="password"
                    placeholder="Enter your password again"
                    style={styles.input}
                    onInput={(e) => e.target.value = e.target.value.replace(/\s/g, '')} // Remove spaces on input
                  />
                </div>
                {errors.confirmpassword && <p className="text-danger">This field is required</p>}
              </div><br />
              <button className="btn w-100" style={styles.button}>Reset</button>
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
export default AdminResetPassword;