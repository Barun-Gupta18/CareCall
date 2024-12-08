import { useForm } from "react-hook-form";
import { utilityFunctions } from '../../utils/module';
import { Server_URL } from '../../utils/config';
import axios from 'axios';
import { showErrorToast, showSuccessToast } from '../../utils/Toasthelper';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { Container, Row, Col } from 'react-bootstrap';

function PartnerChangePassword() {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
  } = useForm();

  const navigate = useNavigate();

  async function onSubmit(data) {
    try {
      console.log(data)
      const token = utilityFunctions.getCookieValue('partnerAuthToken');
      const url = Server_URL + "partner-change-password";
      const res = await axios.put(url, data, {
        headers: {
          Authorization: token ? `Bearer ${token}` : ""
        }
      });
      console.log(res.data);
      const { error, message } = res.data;
      if (error) {
        showErrorToast(message);
      } else {
        reset();
        showSuccessToast(message);
        // navigate('/partner-login')
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  }

  return (
    <>
      {/* <div className="container py-5">
        <div className="row">
          <div className="col-md-8 offset-md-2 ">
            <div className="card shadow-lg">
              <div className="card-header bg-dark text-white py-2">
                Change Password
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-1">
                    <label className='form-label'>Current password</label>
                    <input
                      {...register("currentpassword", { required: true })}
                      className="form-control"
                      // autoComplete="off"
                      type="text"
                      placeholder="Enter your current password"
                    ></input>
                    <br />
                    {errors.currentpassword && (
                      <p className="text-danger">This field is required</p>
                    )}
                  </div>
                  <div className="mb-2">
                    <label>New Password</label>
                    <input
                      {...register("password", { required: true })}
                      className="form-control"
                      type="password"
                      placeholder="Enter your new Password"
                    ></input>
                    <br />
                    {errors.password && (
                      <p className="text-danger">This field is required</p>
                    )}
                  </div>
                  <div className="mb-2">
                    <label>Confirm Password</label>
                    <input
                      {...register("confirmpassword", { required: true })}
                      className="form-control"
                      type="password"
                      placeholder="Repeat your Password"
                    ></input>
                    <br />
                    {errors.confirmpassword && (
                      <p className="text-danger">This field is required</p>
                    )}
                  </div>
                  <button className="btn btn-success mt-2">update</button><br /><br />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <Container fluid className="d-flex justify-content-center align-items-center min-vh-100" style={styles.background}>
        <Row className="w-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} className="d-flex justify-content-center align-items-center">
            <div style={styles.formContainer}>
              <h3 className="text-center mb-4" style={styles.headerText}>Change password</h3>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <div className="input-group">
                    <span className="input-group-text" style={styles.iconContainer}><FaEnvelope /></span>
                    <input
                      {...register("currentpassword", { required: true })}
                      className="form-control"
                      type="text"
                      placeholder="Enter your current password"
                      style={styles.input}
                    />
                  </div>
                  {errors.currentpassword && <p className="text-danger">This field is required</p>}
                </div><br />
                <div className="mb-3">
                  <div className="input-group">
                    <span className="input-group-text" style={styles.iconContainer}><FaLock /></span>
                    <input
                      {...register("password", {
                        required: true, validate: (value) => {
                          const trimmedValue = value.trim();
                          if (trimmedValue.length < 2) return "Password must be at least 2 characters";
                          if (trimmedValue.length > 6) return "Password must not exceed 6 characters";
                          return true;
                        },
                        onChange: (e) => {
                          e.target.value = e.target.value.trimStart();
                        },
                      })}
                      className="form-control"
                      type="password"
                      placeholder="Enter your new password"
                      onInput={(e) => e.target.value = e.target.value.replace(/\s/g, '')} // Remove spaces on input
                      style={styles.input}
                    />
                  </div>
                  {errors.password && <p className="text-danger">This field is required</p>}
                </div><br />
                <div className="mb-3">
                  <div className="input-group">
                    <span className="input-group-text" style={styles.iconContainer}><FaLock /></span>
                    <input
                      {...register("confirmpassword", {
                        required: true, validate: (value) => {
                          const trimmedValue = value.trim();
                          if (trimmedValue.length < 2) return "Password must be at least 2 characters";
                          if (trimmedValue.length > 6) return "Password must not exceed 6 characters";
                          return true;
                        },
                        onChange: (e) => {
                          e.target.value = e.target.value.trimStart();
                        },
                      })}
                      className="form-control"
                      type="password"
                      placeholder="Repeat your Password"
                      onInput={(e) => e.target.value = e.target.value.replace(/\s/g, '')} // Remove spaces on input
                      style={styles.input}
                    />
                  </div>
                  {errors.confirmpassword && <p className="text-danger">This field is required</p>}
                </div><br />
                <button className="btn w-100" style={styles.button}>update</button><br />
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
};

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

export default PartnerChangePassword;