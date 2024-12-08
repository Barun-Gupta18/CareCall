import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect } from "react";
import { utilityFunctions } from "../../../utils/module";
import { Server_URL } from "../../../utils/config";
import { showErrorToast, showSuccessToast } from "../../../utils/Toasthelper";
import { Container, Col } from "react-bootstrap";
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

  async function submitCategory(data) {
    try {
      const token = utilityFunctions.getCookieValue("adminAuthToken");
      const response = await axios.post(`${Server_URL}manage-category`, data, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      const { error, message } = response.data;

      if (error) {
        if (message === "SignIn") {
          showErrorToast("Session expired. Please sign in again.");
        } else {
          showErrorToast(message);
        }
      } else {
        reset();
        showSuccessToast(message);
      }
    } catch (error) {
      showErrorToast("An error occurred. Please try again.");
    }
  }

  useEffect(() => {
    setFocus("categoryname");
  }, [setFocus]);

  return (
    <Container fluid className="d-flex justify-content-center align-items-center min-vh-100" style={styles.background}>
      <div className="d-flex justify-content-center align-items-center w-100">
        <Col md={6} lg={5} className="d-flex justify-content-center align-items-center">
          <div style={styles.formContainer}>
            <h3 className="text-center mb-4" style={styles.headerText}>
              Add Service
            </h3>
            <form onSubmit={handleSubmit(submitCategory)}>
              {/* Category Name */}
              <div className="mb-3">
                <div className="input-group">
                  <span className="input-group-text" style={styles.iconContainer}>
                    <BiSolidCategory />
                  </span>
                  <input
                    {...register("categoryname", {
                      required: "Category name is required.",
                      validate: (value) =>
                        /^[A-Za-z]+(?: [A-Za-z]+)*$/.test(value.trim())
                          ? true
                          : "Enter a valid name with only one space between words.",
                    })}
                    className="form-control"
                    type="text"
                    placeholder="Enter service name"
                    style={styles.input}
                  />
                </div>
                {errors.categoryname && (
                  <p className="text-danger">{errors.categoryname.message}</p>
                )}
              </div><br />

              {/* Description */}
              <div className="mb-3">
                <div className="input-group">
                  <span className="input-group-text" style={styles.iconContainer}>
                    <MdDescription />
                  </span>
                  <input
                    {...register("description", {
                      required: "Description is required.",
                      validate: (value) => {
                        const trimmedValue = value.trim();
                        if (trimmedValue.length < 5) return "Description must be at least 5 characters.";
                        if (trimmedValue.length > 150) return "Description must not exceed 100 characters.";
                        return true;
                      },
                    })}
                    className="form-control"
                    type="text"
                    placeholder="Enter service description"
                    style={styles.input}
                  />
                </div>
                {errors.description && (
                  <p className="text-danger">{errors.description.message}</p>
                )}
              </div><br />

              {/* Brief Description */}
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

              {/* Submit Button */}
              <button type="submit" className="btn w-100" style={styles.button}>
                Add
              </button>
            </form>
          </div>
        </Col>
      </div>
    </Container>
  );
}

const styles = {
  background: {
    background: "linear-gradient(135deg, #193e40, #132e4f)",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    backgroundColor: "rgba(0, 40, 72, 0.9)",
    borderRadius: "10px",
    padding: "60px 40px",
    width: "100%",
    maxWidth: "500px",
    backdropFilter: "blur(10px)",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
  },
  headerText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: "28px",
  },
  iconContainer: {
    backgroundColor: "#FFFFFF",
    border: "none",
  },
  input: {
    border: "none",
    paddingLeft: "10px",
    fontSize: "16px",
  },
  button: {
    background: "linear-gradient(135deg, #4E54C8, #132e4f)",
    color: "#FFFFFF",
    border: "none",
    padding: "12px",
    fontSize: "18px",
  },
};

export default AddCategory;
