import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Server_URL } from "../../utils/config";
import { showSuccessToast, showErrorToast } from "../../utils/Toasthelper";
import { FaEnvelope, FaLock, FaPhoneAlt, FaAddressCard, FaBuilding } from 'react-icons/fa';
import { IoManSharp } from "react-icons/io5";
import { Container, Row, Col } from 'react-bootstrap';

function UserRegister() {
  const { register, handleSubmit, formState: { errors }, reset, setFocus, setValue } = useForm();
  const navigate = useNavigate();
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [pincode, setPincode] = useState("");

  useEffect(() => {
    async function fetchStates() {
      try {
        const { data } = await axios.get(`${Server_URL}partner-view-state`);
        if (data.error) showErrorToast(data.message);
        else setStates(data.result);
      } catch (error) {
        showErrorToast(error.message);
      }
    }
    fetchStates();
    setFocus("fullName");
  }, [setFocus]);

  async function handleStateChange(e) {
    const stateId = e.target.value;
    setCities([]);
    setPincode("");
    try {
      const { data } = await axios.get(`${Server_URL}partner-view-city/${stateId}`);
      if (data.error) showErrorToast(data.message);
      else setCities(data.result);
    } catch (error) {
      showErrorToast(error.message);
    }
  }

  function handleCityChange(e) {
    const cityId = e.target.value;
    const selectedCity = cities.find(city => city._id === cityId);
    if (selectedCity) {
      setPincode(selectedCity.pincode);
      setValue("pincode", selectedCity.pincode);
    }
  }

  async function onSubmit(data) {
    try {
      const { data: response } = await axios.post(`${Server_URL}manage-user`, data);
      if (response.error) showErrorToast(response.message);
      else {
        reset();
        showSuccessToast(response.message);
        navigate("/user-login");
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  }

  return (
    <Container fluid className="container-background d-flex justify-content-center align-items-center min-vh-100" style={styles.containerBackground}>
      <Row className="w-100 d-flex justify-content-center align-items-center">
        <Col md={8} lg={6}>
          <div style={styles.formContainer}>
            <h3 className="text-center mb-4" style={styles.headerText}>Create User Account</h3><br />
            <form onSubmit={handleSubmit(onSubmit)}>

              {/* Full Name */}
              <div className="mt-2 mb-3">
                <div className="input-group">
                  <span className="input-group-text" style={styles.iconContainer}>
                    <IoManSharp />
                  </span>
                  <input
                    {...register("fullName", {
                      required: "Full Name is required",
                      validate: (value) => {
                        const sanitizedValue = value.trim().replace(/\s+/g, " "); // Trim and allow only single spaces
                        const namePattern = /^[A-Za-z]+(?: [A-Za-z]+)*$/; // Validates single or multiple words with one space between
                        return namePattern.test(sanitizedValue)
                          ? true
                          : "Enter a valid name with only one space between words and no extra spaces";
                      },
                    })}
                    className="form-control"
                    type="text"
                    placeholder="Enter your Full Name"
                    onChange={(e) => {
                      // Dynamically sanitize the input value
                      const sanitizedValue = e.target.value
                        .trimStart()
                        .replace(/\s+/g, " ");
                      setValue("fullName", sanitizedValue, { shouldValidate: true });
                    }}
                    onBlur={(e) => {
                      // Remove trailing spaces when the field loses focus
                      const sanitizedValue = e.target.value.trim();
                      setValue("fullName", sanitizedValue, { shouldValidate: true });
                    }}
                  />
                </div>
                {errors.fullName && <p className="text-danger">{errors.fullName.message}</p>}
              </div><br />

              {/* Email */}
              <div className="mt-2 mb-3">
                <div className="input-group">
                  <span className="input-group-text" style={styles.iconContainer}><FaEnvelope /></span>
                  <input {...register("email", {
                    required: "Email is required", validate: (value) => {
                      const trimmedValue = value.trim();
                      return /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(trimmedValue)
                        ? true
                        : "Only @gmail.com is allowed";
                    },
                    onChange: (e) => {
                      e.target.value = e.target.value.trimStart();
                    },
                  })} className="form-control" type="email" placeholder="Enter your Email" />
                </div>
                {errors.email && <p className="text-danger">{errors.email.message}</p>}
              </div><br />

              {/* Password */}
              <div className="mt-2 mb-3">
                <div className="input-group">
                  <span className="input-group-text" style={styles.iconContainer}><FaLock /></span>
                  <input
                    {...register("password", {
                      required: "Password is required",
                      validate: (value) => {
                        if (value.length < 2) return "Password must be at least 2 characters";
                        if (value.length > 6) return "Password must not exceed 6 characters";
                        return true;
                      },
                    })}
                    className="form-control"
                    type="password"
                    placeholder="Enter your Password"
                    onInput={(e) => e.target.value = e.target.value.replace(/\s/g, '')} // Remove spaces on input
                  />
                </div>
                {errors.password && <p className="text-danger">{errors.password.message}</p>}
              </div> <br />

              {/* Mobile Number */}
              <div className="mt-2 mb-3">
                <div className="input-group">
                  <span className="input-group-text" style={styles.iconContainer}><FaPhoneAlt /></span>
                  <input {...register("mobile", {
                    required: "Mobile Number is required", validate: (value) => {
                      const trimmedValue = value.trim();
                      return /^[0-9]{10}$/.test(trimmedValue)
                        ? true
                        : "Enter a valid 10-digit mobile number without spaces";
                    },
                    onChange: (e) => {
                      e.target.value = e.target.value.trimStart();
                    },
                  })} className="form-control" type="tel" placeholder="Enter your Mobile Number" />
                </div>
                {errors.mobile && <p className="text-danger">{errors.mobile.message}</p>}
              </div><br />

              {/* State, City, and Pincode */}
              <div className="mt-2 mb-3">
                <div className="input-group">
                  <span className="input-group-text" style={styles.iconContainer}><FaBuilding /></span>
                  <select {...register("state", { required: "State is required" })} className="form-control" onChange={handleStateChange}>
                    <option value="">Select State</option>
                    {states.map(state => <option key={state._id} value={state._id}>{state.statename}</option>)}
                  </select>
                  <select {...register("city", { required: "City is required" })} className="form-control ms-2" onChange={handleCityChange}>
                    <option value="">Select City</option>
                    {cities.map(city => <option key={city._id} value={city._id}>{city.cityname}</option>)}
                  </select>
                  <input {...register("pincode", { required: "Pincode is required" })} className="form-control ms-2" type="text" placeholder="Pincode" value={pincode} readOnly />
                </div>
              </div><br />

              {/* Address */}
              <div className="mt-2 mb-3">
                <div className="input-group">
                  <span className="input-group-text" style={styles.iconContainer}><FaAddressCard /></span>
                  <textarea {...register("address", {
                    required: "Address is required",
                    validate: (value) => {
                      const trimmedValue = value.trim().replace(/\s+/g, " ");
                      if (trimmedValue.length < 5) return "Address must be at least 5 characters";
                      if (trimmedValue.length > 100) return "Address must not exceed 100 characters";
                      return true;
                    },
                    onChange: (e) => {
                      e.target.value = e.target.value.trimStart().replace(/\s+/g, " ");
                    },
                  })} className="form-control" placeholder="Enter your Address" rows="5"></textarea>
                </div>
              </div><br />

              <button type="submit" className="btn w-100" style={styles.button}>Register</button>
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

const styles = {
  containerBackground: {
    background: 'linear-gradient(135deg, #193e40, #132e4f)',
    paddingTop: '60px',
    paddingBottom: '60px',
    minHeight: '100vh',
  },
  formContainer: {
    backgroundColor: 'rgba(0, 40, 72, 0.9)',
    borderRadius: '8px',
    padding: '30px',
    width: '100%',
    maxWidth: '600px',
  },
  headerText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: '24px',
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
    fontSize: '18px',
  },
};

export default UserRegister;
