import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect } from "react";
import { utilityFunctions } from "../../../utils/module";
import { Server_URL } from "../../../utils/config";
import { showErrorToast, showSuccessToast } from "../../../utils/Toasthelper";
import { Container, Row, Col } from 'react-bootstrap';
import { FaAddressCard } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";


function AddSubCategory() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
  } = useForm();


  // const navigate = useNavigate();

  const [category, setCategory] = useState([]);


  async function getCategory() {
    try {
      const token = utilityFunctions.getCookieValue('adminAuthToken');
      const url = Server_URL + "manage-category";
      const response = await axios.get(url, {
        headers: {
          Authorization: token ? `Bearer ${token}` : ""
        }
      });
      // console.log(headers);
      const { error, message } = response.data;
      if (error && message === "SignIn") {

      }
      else if (error) {
        showErrorToast(message);
      } else {
        const { result } = response.data;
        setCategory(result);
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  }


  async function onSubmit(data) {
    try {
      // console.log(data)
      const token = utilityFunctions.getCookieValue('adminAuthToken');
      const url = Server_URL + "manage-subcategory";
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
        showSuccessToast(message)
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  }


  useEffect(() => {
    getCategory()
  }, []);

  return (
    <>
      <Container fluid className="d-flex justify-content-center align-items-center min-vh-100" style={styles.background}>
        <Row className="w-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} className="d-flex justify-content-center align-items-center">
            <div style={styles.formContainer}>
              <h3 className="text-center mb-4" style={styles.headerText}>Add Sub-service</h3><br />
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <div className="input-group">
                    <span className="input-group-text" style={styles.iconContainer}><FaAddressCard /></span>
                    <select className="form-select" {...register('category', { required: true })} name="category" id="category" >
                      <option value="">Please Select Category</option>
                      {category.map(x => <option key={x._id} value={x._id}>{x.categoryname}</option>)}
                    </select>
                    {errors.category && (
                      <p className="text-danger">This field is required</p>
                    )}
                  </div>
                </div><br />

                <div className="mb-3">
                  <div className="input-group">
                    <span className="input-group-text" style={styles.iconContainer}><BiSolidCategory /></span>
                    <input
                      {...register("subcategory", {
                        required: true, validate: (value) => {
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
                      placeholder="Enter your sub-service name"
                      style={styles.input}
                    />
                  </div>
                  {errors.subcategory && <p className="text-danger">This field is required</p>}
                </div><br />

                <div className="mb-3">
                  <div className="input-group">
                    <span className="input-group-text" style={styles.iconContainer}>
                      <FaAddressCard />
                    </span>
                    <textarea
                      {...register("briefDescription", {
                        required: "Brief description is required.",
                        validate: (value) => {
                          const trimmedValue = value.trim();
                          if (trimmedValue.length < 5)
                            return "Brief description must be at least 5 characters.";
                          if (trimmedValue.length > 1000)
                            return "Brief description must not exceed 100 characters.";
                          return true;
                        },
                      })}
                      className="form-control shadow"
                      rows="5"
                      placeholder="Enter a brief description for the service"
                      style={{ ...styles.input, resize: "none" }}
                    ></textarea>
                  </div>
                  {errors.briefDescription && (
                    <p className="text-danger">{errors.briefDescription.message}</p>
                  )}
                </div><br />

                <button className="btn w-100" style={styles.button}>Add</button>
              </form>
            </div>
          </Col>
        </Row>
      </Container>

      <hr />
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

export default AddSubCategory;