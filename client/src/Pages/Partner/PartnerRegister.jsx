import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Server_URL } from "../../utils/config";
import { showErrorToast, showSuccessToast } from "../../utils/Toasthelper";
import { FaEnvelope, FaLock, FaPhoneAlt, FaAddressCard, FaBuilding } from 'react-icons/fa';
import { IoManSharp } from "react-icons/io5";
import { Container, Row, Col } from 'react-bootstrap';

function PartnerRegister() {
  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm();
  const navigate = useNavigate();

  const [category, setCategory] = useState([]);
  const [subcategory, setSubcategory] = useState([]);
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [pincode, setPincode] = useState("");


  // Load categories
  async function ReadCategory() {
    const url = `${Server_URL}view-category-partner`;
    const response = await axios.get(url);
    const { error, message, result } = response.data;
    error ? showErrorToast(message) : setCategory(result);
  }

  // Load subcategories based on selected category
  async function ReadSubCategory(catId) {
    const url = `${Server_URL}manage-subcategory/${catId}`;
    const response = await axios.get(url);
    const { error, message, result } = response.data;
    error ? showErrorToast(message) : setSubcategory(result);
  }

  // Load states
  async function getStateData() {
    const url = `${Server_URL}partner-view-state`;
    const response = await axios.get(url);
    const { error, message, result } = response.data;
    error ? showErrorToast(message) : setState(result);
  }

  // Load cities based on selected state
  async function ReadCity(stateId) {
    const url = `${Server_URL}partner-view-city/${stateId}`;
    const response = await axios.get(url);
    const { error, message, result } = response.data;
    error ? showErrorToast(message) : setCity(result);
  }

  function handleCityChange(e) {
    const cityId = e.target.value;
    const selectedCity = city.find(city => city._id === cityId);
    if (selectedCity) {
      setPincode(selectedCity.pincode);
      setValue("pincode", selectedCity.pincode);
    }
  }

  useEffect(() => {
    ReadCategory();
    getStateData();
  }, []);

  async function onSubmit(data) {
    try {
      console.log(data)
      const url = `${Server_URL}manage-partner`;
      const response = await axios.post(url, data);
      const { error, message } = response.data;
      if (error) {
        showErrorToast(message);
      } else {
        reset();
        showSuccessToast(message);
        navigate('/partner-login');
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
            <h3 className="text-center mb-4" style={styles.headerText}>Partner Registration</h3><br />
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Full Name */}
              <div className="mt-2 mb-3">
                <div className="input-group">
                  <span className="input-group-text" style={styles.iconContainer}>
                    <IoManSharp />
                  </span>
                  <input
                    {...register("fullname", {
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
                      setValue("fullname", sanitizedValue, { shouldValidate: true });
                    }}
                    onBlur={(e) => {
                      // Remove trailing spaces when the field loses focus
                      const sanitizedValue = e.target.value.trim();
                      setValue("fullname", sanitizedValue, { shouldValidate: true });
                    }}
                  />
                </div>
                {errors.fullname && <p className="text-danger">{errors.fullName.message}</p>}
              </div> <br />

              {/* Email */}
              <div className="mt-2 mb-3">
                <div className="input-group">
                  <span className="input-group-text" style={styles.iconContainer}><FaEnvelope /></span>
                  <input {...register("email", {
                    required: true, validate: (value) => {
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
                {errors.email && <p className="text-danger">This field is required</p>}
              </div><br />

              {/* Password */}
              <div className="mt-2 mb-3">
                <div className="input-group">
                  <span className="input-group-text" style={styles.iconContainer}><FaLock /></span>
                  <input {...register("password", {
                    required: true, validate: (value) => {
                      const trimmedValue = value.trim();
                      if (trimmedValue.length < 2) return "Password must be at least 2 characters";
                      if (trimmedValue.length > 6) return "Password must not exceed 6 characters";
                      return true;
                    },
                    onChange: (e) => {
                      e.target.value = e.target.value.trimStart();
                    },
                  })} className="form-control" type="password" placeholder="Enter your Password"
                    onInput={(e) => e.target.value = e.target.value.replace(/\s/g, '')} // Remove spaces on input
                  />
                </div>
                {errors.password && <p className="text-danger">This field is required</p>}
              </div><br />

              {/* Mobile */}
              <div className="mt-2 mb-3">
                <div className="input-group">
                  <span className="input-group-text" style={styles.iconContainer}><FaPhoneAlt /></span>
                  <input {...register("mobile", {
                    required: true, validate: (value) => {
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
                {errors.mobile && <p className="text-danger">This field is required</p>}
              </div><br />

              {/* Category & Subcategory */}
              <div className="mt-2 mb-3">
                <div className="input-group">
                  <span className="input-group-text" style={styles.iconContainer}><FaBuilding /></span>
                  <select {...register('category', { required: true })} className="form-control" onChange={(e) => ReadSubCategory(e.target.value)}>
                    <option value="">Select Category</option>
                    {category.map(cat => <option key={cat._id} value={cat._id}>{cat.categoryname}</option>)}
                  </select>
                  <select {...register('subcategory', { required: true })} className="form-control ms-2">
                    <option value="">Select Subcategory</option>
                    {subcategory.map(sub => <option key={sub._id} value={sub._id}>{sub.subcategory}</option>)}
                  </select>
                </div>
              </div><br />

              {/* State, City & Pincode */}
              <div className="mt-2 mb-3">
                <div className="input-group">
                  <span className="input-group-text" style={styles.iconContainer}><FaAddressCard /></span>
                  <select {...register('state', { required: true })} className="form-control" onChange={(e) => ReadCity(e.target.value)}>
                    <option value="">Select State</option>
                    {state.map(st => <option key={st._id} value={st._id}>{st.statename}</option>)}
                  </select>
                  <select {...register("city", { required: "City is required" })} className="form-control ms-2" onChange={handleCityChange}>
                    <option value="">Select City</option>
                    {city.map(city => <option key={city._id} value={city._id}>{city.cityname}</option>)}
                  </select>
                  <input {...register("pincode", { required: "Pincode is required" })} className="form-control ms-2" type="text" placeholder="Pincode" value={pincode} readOnly />
                </div>
              </div><br />

              {/* Status */}
              <div className="mt-2 mb-3">
                <div className="input-group">
                  <span className="input-group-text" style={styles.iconContainer}><FaAddressCard /></span>
                  <select {...register('status', { required: true })} className="form-control">
                    <option value="">Select Status</option>
                    <option value="In-active">In-active</option>
                  </select>
                </div>
              </div><br />

              {/* Start Time, End Time & Price */}
              <div className="mt-2 mb-3">
                <div className="input-group">
                  <span className="input-group-text" style={styles.iconContainer}><FaBuilding /></span>
                  <input
                    {...register("starttime", {
                      required: "Start time is required",
                    })}
                    className="form-control"
                    type="time"
                    step="1"
                    placeholder="Start Time"
                  /> <br />
                  <input
                    {...register("endtime", {
                      required: "End time is required",
                      validate: (value) => {
                        const startTime = watch("starttime"); // Watch the start time value
                        if (!startTime) return "Please select a start time first";
                        if (value <= startTime) return "End time must be greater than start time";
                        return true;
                      },
                    })}
                    className="form-control ms-2"
                    type="time"
                    step="1"
                    placeholder="End Time"
                  /> <br />
                  <input {...register("price", { required: true })} className="form-control ms-2" type="number" placeholder="Price per Hour" />
                </div>
                {errors.starttime && <p className="text-danger">{errors.starttime.message}</p>}
                {errors.endtime && <p className="text-danger">{errors.endtime.message}</p>}
              </div><br />

              {/* Description */}
              <div className="mt-2 mb-3">
                <div className="input-group">
                  <span className="input-group-text" style={styles.iconContainer}><FaAddressCard /></span>
                  <textarea {...register('description', {
                    required: "Address is required",
                    validate: (value) => {
                      const trimmedValue = value.trim().replace(/\s+/g, " ");
                      if (trimmedValue.length < 5) return "Address must be at least 5 characters";
                      if (trimmedValue.length > 30) return "Address must not exceed 100 characters";
                      return true;
                    },
                    onChange: (e) => {
                      e.target.value = e.target.value.trimStart().replace(/\s+/g, " ");
                    },
                  })} className="form-control" placeholder="Describe your self in few words"></textarea>
                </div>
                {errors.description && <p className="text-danger">This field is required</p>}
              </div><br />

              {/* Address */}
              <div className="mt-2 mb-3">
                <div className="input-group">
                  <span className="input-group-text" style={styles.iconContainer}><FaAddressCard /></span>
                  <textarea {...register('address', {
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
                {errors.address && <p className="text-danger">This field is required</p>}
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
    minHeight: '100vh'
  },

  formContainer: {
    backgroundColor: 'rgba(0, 40, 72, 0.9)',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    padding: '30px',
    width: '100%',
    maxWidth: '600px'
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

  input: {
    paddingLeft: '10px',
  },

  dateInput: {
    border: '1px solid #ced4da',
    marginLeft: '0',
  },

  button: {
    background: 'linear-gradient(135deg, #4E54C8, #132e4f)',
    color: '#FFFFFF',
    border: 'none',
    padding: '12px',
    fontSize: '18px',
  },

  textArea: {
    height: '80px',
  },

  available: {
    color: 'green',
  },

  booked: {
    color: 'red',
  },
};

export default PartnerRegister;
