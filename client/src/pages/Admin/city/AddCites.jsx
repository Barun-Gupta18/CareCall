import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Server_URL } from "../../../utils/config";
import { utilityFunctions } from "../../../utils/module";
import { showErrorToast, showSuccessToast } from "../../../utils/Toasthelper";
import { TbMapPinCode } from "react-icons/tb";
import { MdRealEstateAgent } from "react-icons/md";
import { FaCity } from "react-icons/fa";
import { Container, Row, Col } from 'react-bootstrap';

function AddCity() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const [state, setState] = useState([]);
  const navigate = useNavigate();

  async function viewStateData() {
    try {
      const token = utilityFunctions.getCookieValue('adminAuthToken');
      const url = Server_URL + "view-state";
      const response = await axios.get(url, {
        headers: {
          Authorization: token ? `Bearer ${token}` : ""
        }
      });
      const { error, message } = response.data;
      if (error && message === "SignIn") {
        navigate('/admin-login');
      }
      else if (error) {
        showErrorToast(message);
      } else {
        const { result } = response.data;
        setState(result);
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  }

  async function onSubmit(data) {
    try {
      const token = utilityFunctions.getCookieValue('adminAuthToken');
      const url = Server_URL + "admin-add-city";
      const response = await axios.post(url, data, {
        headers: {
          Authorization: token ? `Bearer ${token}` : ""
        }
      });
      const { error, message } = response.data;
      if (error) {
        showErrorToast(message);
      } else {
        reset();
        showSuccessToast(message);
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  }

  useEffect(() => {
    viewStateData();
  }, []);

  return (
    <>
      <Container fluid className="d-flex justify-content-center align-items-center min-vh-100" style={styles.background}>
        <Row className="w-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} className="d-flex justify-content-center align-items-center">
            <div style={styles.formContainer}>
              <h3 className="text-center mb-4" style={styles.headerText}>Add City</h3><br />
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <div className="input-group">
                    <span className="input-group-text" style={styles.iconContainer}><MdRealEstateAgent /></span>
                    <select className="form-select" {...register('stateId', { required: true })} name="stateId" id="stateId">
                      <option value="">Please Select state</option>
                      {state.map(x => <option key={x._id} value={x._id}>{x.statename}</option>)}
                    </select>
                    {errors.stateId && (
                      <p className="text-danger">This field is required</p>
                    )}
                  </div>
                </div><br />

                <div className="mb-3">
                  <div className="input-group">
                    <span className="input-group-text" style={styles.iconContainer}><FaCity /></span>
                    <input
                      {...register("cityname", {
                        required: "City name is required",
                        validate: (value) => {
                          const sanitizedValue = value.trim().replace(/\s+/g, " "); // Trim and allow only single spaces
                          const namePattern = /^[A-Za-z]+(?: [A-Za-z]+)*$/; // Validates single or multiple words with one space between
                          return namePattern.test(sanitizedValue)
                            ? true
                            : "Enter a valid city with only one space between words and no extra spaces";
                        },
                      })}
                      className="form-control"
                      type="text"
                      placeholder="Enter your City name"
                      onChange={(e) => {
                        const sanitizedValue = e.target.value
                          .trimStart()
                          .replace(/\s+/g, " ");
                        setValue("cityname", sanitizedValue, { shouldValidate: true });
                      }}
                      onBlur={(e) => {
                        const sanitizedValue = e.target.value.trim();
                        setValue("cityname", sanitizedValue, { shouldValidate: true });
                      }}
                    />
                  </div>
                  {errors.cityname && <p className="text-danger">{errors.cityname.message}</p>}
                </div><br />

                <div className="mb-3">
                  <div className="input-group">
                    <span className="input-group-text" style={styles.iconContainer}><TbMapPinCode /></span>
                    <input
                      {...register("pincode", {
                        required: "Pincode is required",
                        validate: (value) => {
                          const trimmedValue = value.trim();
                          return /^[0-9]{6}$/.test(trimmedValue) // Updated to 6-digit pincode
                            ? true
                            : "Enter a valid 6-digit pincode";
                        },
                      })}
                      className="form-control"
                      type="tel"
                      placeholder="Enter your city pincode"
                    />
                  </div>
                  {errors.pincode && <p className="text-danger">{errors.pincode.message}</p>}
                </div><br />

                <button className="btn w-100" style={styles.button}>Add</button>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </>
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
    padding: '40px', // Reduced padding for more compact form
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
  button: {
    background: 'linear-gradient(135deg, #4E54C8, #132e4f)',
    color: '#FFFFFF',
    border: 'none',
    padding: '12px',
    fontSize: '18px', // Larger button size
  },
};

export default AddCity;
