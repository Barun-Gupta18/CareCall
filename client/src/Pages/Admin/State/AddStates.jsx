import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect } from "react";
import { Server_URL } from "../../../utils/config";
import { utilityFunctions } from "../../../utils/module";
import { showErrorToast, showSuccessToast } from "../../../utils/Toasthelper";
import { MdRealEstateAgent } from "react-icons/md";
import { Container, Row, Col } from 'react-bootstrap';



function addState() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
    setValue,
  } = useForm();


  // const navigate = useNavigate();

  async function onSubmit(data) {
    try {
      // console.log(data)
      const token = utilityFunctions.getCookieValue('adminAuthToken');
      const url = Server_URL + "manage-add-state";
      const response = await axios.post(url, data, {
        headers: {
          Authorization: token ? `Bearer ${token}` : ""
        }
      });
      // console.log(response.data);
      const { error, message } = response.data;
      if (error) {
        showErrorToast(message);
      } else {
        reset();
        showSuccessToast(message);
        // navigate('/admin-login');
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  }


  useEffect(() => {
    setFocus('Statename')
  }, []);

  return (
    <>
      <Container fluid className="d-flex justify-content-center align-items-center min-vh-100" style={styles.background}>
        <Row className="w-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} className="d-flex justify-content-center align-items-center">
            <div style={styles.formContainer}>
              <h3 className="text-center mb-4" style={styles.headerText}>Add State</h3><br />
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <div className="input-group">
                    <span className="input-group-text" style={styles.iconContainer}><MdRealEstateAgent /></span>
                    <input
                      {...register("statename", {
                        required: "state is required",
                        validate: (value) => {
                          const sanitizedValue = value.trim().replace(/\s+/g, " "); // Trim and allow only single spaces
                          const namePattern = /^[A-Za-z]+(?: [A-Za-z]+)*$/; // Validates single or multiple words with one space between
                          return namePattern.test(sanitizedValue)
                            ? true
                            : "Enter a valid state with only one space between words and no extra spaces";
                        },
                      })}
                      className="form-control"
                      type="text"
                      placeholder="Enter your state Name"
                      onChange={(e) => {
                        // Dynamically sanitize the input value
                        const sanitizedValue = e.target.value
                          .trimStart()
                          .replace(/\s+/g, " ");
                        setValue("statename", sanitizedValue, { shouldValidate: true });
                      }}
                      onBlur={(e) => {
                        // Remove trailing spaces when the field loses focus
                        const sanitizedValue = e.target.value.trim();
                        setValue("statename", sanitizedValue, { shouldValidate: true });
                      }}
                    />
                  </div>
                  {errors.statename && <p className="text-danger">This field is required</p>}
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

export default addState;