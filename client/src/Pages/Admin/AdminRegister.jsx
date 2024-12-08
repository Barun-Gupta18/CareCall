import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Server_URL } from "../../utils/config";
import { showErrorToast, showSuccessToast } from "../../utils/Toasthelper";
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { Container, Row, Col } from 'react-bootstrap';
import { IoManSharp } from "react-icons/io5";
import { FaSquarePhone } from "react-icons/fa6";
import { RiAdminFill } from "react-icons/ri";
import { FaAddressCard } from "react-icons/fa";


function AdminRegister() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
    setValue,
  } = useForm();


  const navigate = useNavigate();

  async function onSubmit(data) {
    try {
      const url = Server_URL + "manage-admin";
      const response = await axios.post(url, data);
      // console.log(response.data);
      const { error, message } = response.data;
      if (error) {
        showErrorToast(message);
      } else {
        reset();
        showSuccessToast(message);
        navigate('/admin-login');
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  }


  useEffect(() => {
    setFocus('FullName')
  }, []);

  return (
    <>
      <Container fluid className="d-flex justify-content-center align-items-center min-vh-100" style={styles.background}>
        <Row className="w-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} className="d-flex justify-content-center align-items-center">
            <div style={styles.formContainer}>
              <h3 className="text-center mb-4" style={styles.headerText}>Admin Create Account</h3><br />
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
                <div className="mb-3">
                  <div className="input-group">
                    <span className="input-group-text" style={styles.iconContainer}>
                      <FaEnvelope />
                    </span>
                    <input
                      {...register("email", {
                        required: "Email is required",
                        validate: (value) => {
                          const trimmedValue = value.trim();
                          return /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(trimmedValue)
                            ? true
                            : "Only @gmail.com is allowed";
                        },
                        onChange: (e) => {
                          e.target.value = e.target.value.trimStart();
                        },
                      })}
                      className="form-control"
                      type="email"
                      placeholder="Email ID"
                      style={styles.input}
                    />
                  </div>
                  {errors.email && <p className="text-danger">{errors.email.message}</p>}
                </div><br />

                {/* Password */}
                <div className="mb-3">
                  <div className="input-group">
                    <span className="input-group-text" style={styles.iconContainer}>
                      <FaLock />
                    </span>
                    <input
                      {...register("password", {
                        required: "Password is required",
                        validate: (value) => {
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
                      placeholder="Password"
                      onInput={(e) => e.target.value = e.target.value.replace(/\s/g, '')} // Remove spaces on input
                      style={styles.input}
                    />
                  </div>
                  {errors.password && <p className="text-danger">{errors.password.message}</p>}
                </div><br />

                {/* Mobile */}
                <div className="mb-3">
                  <div className="input-group">
                    <span className="input-group-text" style={styles.iconContainer}>
                      <FaSquarePhone />
                    </span>
                    <input
                      {...register("mobile", {
                        required: "Mobile number is required",
                        validate: (value) => {
                          const trimmedValue = value.trim();
                          return /^[0-9]{10}$/.test(trimmedValue)
                            ? true
                            : "Enter a valid 10-digit mobile number without spaces";
                        },
                        onChange: (e) => {
                          e.target.value = e.target.value.trimStart();
                        },
                      })}
                      className="form-control"
                      type="tel"
                      placeholder="Enter your phone number"
                      style={styles.input}
                    />
                  </div>
                  {errors.mobile && <p className="text-danger">{errors.mobile.message}</p>}
                </div><br />

                {/* User Role */}
                <div className="mb-3">
                  <div className="input-group">
                    <span className="input-group-text" style={styles.iconContainer}>
                      <RiAdminFill />
                    </span>
                    <select
                      className="form-control"
                      {...register("userRole", { required: "Please select a role" })}
                    >
                      <option value="">Please Select Category</option>
                      <option value="Admin">Admin</option>
                      <option value="Sub-Admin">Sub-Admin</option>
                    </select>
                  </div>
                  {errors.userRole && <p className="text-danger">{errors.userRole.message}</p>}
                </div><br />

                {/* Address */}
                <div className="mb-3">
                  <div className="input-group">
                    <span className="input-group-text" style={styles.iconContainer}>
                      <FaAddressCard />
                    </span>
                    <textarea
                      {...register("address", {
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
                      })}
                      className="form-control shadow"
                      rows="5"
                    ></textarea>
                  </div>
                  {errors.address && <p className="text-danger">{errors.address.message}</p>}
                </div><br />


                {/* Submit Button */}
                <button className="btn w-100" style={styles.button}>
                  Register
                </button>
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

export default AdminRegister;