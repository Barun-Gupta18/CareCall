import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { utilityFunctions } from "../../../utils/module";
import { Server_URL } from "../../../utils/config";
import { showErrorToast, showSuccessToast } from "../../../utils/Toasthelper";
import { Container, Row, Col } from 'react-bootstrap';
import { FaAddressCard } from "react-icons/fa";
import { MdDescription } from "react-icons/md";
import { BiSolidCategory } from "react-icons/bi";



function AddCategory() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
  } = useForm();


  // const navigate = useNavigate();

  async function submitCategory(data) {
    try {
      // console.log(data);
      const token = utilityFunctions.getCookieValue('adminAuthToken');
      // console.log(token)
      const url = Server_URL + "manage-category";
      const response = await axios.post(url, data, {
        headers: {
          Authorization: token ? `Bearer ${token}` : ""
        }
      });
      // console.log(response.data);
      const { error, message } = response.data;
      if (error && message === "SignIn") {

      }
      else if (error) {
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
    setFocus('categoryname')
  }, []);

  return (
    <>
      <Container fluid className="d-flex justify-content-center align-items-center min-vh-100" style={styles.background}>
        <Row className="w-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} className="d-flex justify-content-center align-items-center">
            <div style={styles.formContainer}>
              <h3 className="text-center mb-4" style={styles.headerText}>Add Service</h3><br />
              <form onSubmit={handleSubmit(submitCategory)}>
                <div className="mb-3">
                  <div className="input-group">
                    <span className="input-group-text" style={styles.iconContainer}><BiSolidCategory /></span>
                    <input
                      {...register("categoryname", {
                        required: true,
                        validate: (value) => {
                          const trimmedValue = value.trim().replace(/\s+/g, " "); // Trim and remove extra spaces
                          return /^[A-Za-z]+(?: [A-Za-z]+)*$/.test(trimmedValue)
                            ? true
                            : "Enter a valid name with only one space between words and no extra spaces";
                        },
                        onChange: (e) => {
                          // Dynamically sanitize input value
                          e.target.value = e.target.value.trimStart().replace(/\s+/g, " ");
                        },
                      })}
                      className="form-control"
                      type="text"
                      placeholder="Enter your service name"
                      style={styles.input}
                    />
                  </div>
                  {errors.categoryname && <p className="text-danger">This field is required</p>}
                </div><br />

                <div className="mb-3">
                  <div className="input-group">
                    <span className="input-group-text" style={styles.iconContainer}><MdDescription /></span>
                    <input
                      {...register("description", {
                        required: true,
                        validate: (value) => {
                          const trimmedValue = value.trim().replace(/\s+/g, " ");
                          if (trimmedValue.length < 5) return "Address must be at least 5 characters";
                          if (trimmedValue.length > 100) return "Address must not exceed 25 characters";
                          return true;
                        },
                        onChange: (e) => {
                          e.target.value = e.target.value.trimStart().replace(/\s+/g, " ");
                        },
                      })}
                      className="form-control"
                      type="text"
                      placeholder="Enter your service description"
                      style={styles.input}
                    />
                  </div>
                  {errors.description && <p className="text-danger">This field is required</p>}
                </div><br />

                <div className="mb-3">
                  <div className="input-group">
                    <span className="input-group-text" style={styles.iconContainer}><FaAddressCard /></span>
                    <textarea {...register('briefDescription', {
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
                    })} className="form-control shadow" rows="5" placeholder="Brief description for service"></textarea>
                  </div>
                  {errors.briefDescription && <p className="text-danger">This field is required</p>}
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

export default AddCategory;