import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { FaUserEdit } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import { utilityFunctions } from "../../utils/module";
import { Server_URL } from "../../utils/config";
import { showErrorToast, showSuccessToast } from "../../utils/Toasthelper";
import { Container, Row, Col } from 'react-bootstrap';


function ViewPartner() {

  const [partner, setPartner] = useState([]);

  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const navigate = useNavigate();


  async function getPartnerData() {
    try {
      const token = utilityFunctions.getCookieValue('partnerAuthToken');
      const url = Server_URL + "manage-partner";
      const response = await axios.get(url, {
        headers: {
          Authorization: token ? `Bearer ${token}` : ""
        }
      });
      const { error, message } = response.data;
      if (error && message === "SignIn") {
        navigate('/partner-login')
      }
      else if (error) {
        // alert(message);
        showErrorToast(message);
      } else {
        const { result } = response.data;
        setPartner(result[0]);
        // console.log(partner)
      }
      // }
    } catch (error) {
      // console.log(error.message);
      showErrorToast(message);
    }
  }


  useEffect(() => {
    getPartnerData();

  }, []);


  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: partner,
  });

  useEffect(() => {
    if (partner) reset(partner);
  }, [partner, reset]);

  async function editPartner(Info) {
    try {
      const token = utilityFunctions.getCookieValue('partnerAuthToken');
      const url = `${Server_URL}manage-partner`;
      const { data } = await axios.put(url, Info, {
        headers: { Authorization: token ? `Bearer ${token}` : "" }
      });
      if (data.error) {
        if (data.message === "SignIn") navigate('/partner-login');
        else showErrorToast(data.message);
      } else {
        showSuccessToast(data.message);
        getPartnerData();
        handleClose1();
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  }

  // Upload Partner Photo
  const onSubmitPhoto = async (data) => {
    try {
      console.log(data)
      const formData = new FormData();
      formData.append("photo", data.photo[0]);

      const token = utilityFunctions.getCookieValue("partnerAuthToken");
      const url = `${Server_URL}partner-manage-photo`;

      const res = await axios.post(url, formData, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "Content-Type": "multipart/form-data",
        },
      });

      const { error, message } = res.data;
      if (error) {
        if (message === "SignIn") navigate("/partner-login");
        else showErrorToast(message);
      } else {
        // showSuccessToast(message);
        getPartnerData();
        handleClose();
      }
    } catch (err) {
      showErrorToast(err.message || "Failed to upload photo");
    }
  };

  async function deletePartner(id) {
    try {
      const token = utilityFunctions.getCookieValue('partnerAuthToken');
      const url = Server_URL + "manage-partner/" + id;
      const res = await axios.delete(url, {
        headers: {
          Authorization: token ? `Bearer ${token}` : ""
        }
      });
      // console.log(headers)
      const { error, message } = res.data;
      if (error && message === "SignIn") {
        navigate('/partner-login')
      }
      else if (error) {
        showErrorToast(message);
      } else {
        showSuccessToast(message);
        getPartnerData();
        navigate('/partner-registration')
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  }

  return (
    <>

      <Container fluid className="d-flex justify-content-center align-items-center min-vh-100" style={styles.background}>
        <Row className="w-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} className="d-flex justify-content-center align-items-center">
            {/* <div style={styles.formContainer}> */}
            <div className="col-md-9">
              {partner &&
                <table className="table">
                  <tbody>
                    <tr>
                      <td>
                        <h3 style={{ color: '#FFFFFF' }}><b>Profile Info</b></h3>
                      </td>
                      <td className="text-end">
                        <button className="btn btn-primary" onClick={handleShow1}>Edit<span>     </span><FaUserEdit /></button>
                        {/* <button className="btn btn-danger mx-3" onClick={() => deletePartner(partner._id)}>Delete<span>     </span><FaUserEdit /></button> */}

                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2} className="text-center">
                        <img src={partner.photo ? partner.photo : '/photo.jpeg'} alt="Partner-Photo" style={{ height: 100, borderRadius: 10 }} />
                        <br /><br />
                        <button type="butto" className=" btn btn-warning" onClick={handleShow}>Upload <span>   </span> <FiUpload /></button>
                      </td>
                    </tr>
                    <tr>
                      <th className="text-end" style={{ color: '#FFFFFF' }}>Name :</th>
                      <td style={{ color: '#FFFFFF' }}>{partner.fullname}</td>
                    </tr>
                    <tr>
                      <th className="text-end" style={{ color: '#FFFFFF' }}>Email :</th>
                      <td style={{ color: '#FFFFFF' }}>{partner.email}</td>
                    </tr>
                    <tr>
                      <th className="text-end" style={{ color: '#FFFFFF' }}>Mobile :</th>
                      <td style={{ color: '#FFFFFF' }}>{partner.mobile}</td>
                    </tr>
                    <tr>
                      <th className="text-end" style={{ color: '#FFFFFF' }}>Service :</th>
                      <td style={{ color: '#FFFFFF' }}>{partner.subcategoryInfo}</td>
                    </tr>
                    {/* <tr>
                      <th className="text-end" style={{ color: '#FFFFFF' }}>State :</th>
                      <td style={{ color: '#FFFFFF' }}>{partner.stateInfo}</td>
                    </tr>
                    <tr>
                      <th className="text-end" style={{ color: '#FFFFFF' }}>City :</th>
                      <td style={{ color: '#FFFFFF' }}>{partner.cityInfo}</td>
                    </tr> */}
                    <tr>
                      <th className="text-end" style={{ color: '#FFFFFF' }}>Status :</th>
                      <td style={{ color: '#FFFFFF' }}>{partner.status}</td>
                    </tr>
                    <tr>
                      <th className="text-end" style={{ color: '#FFFFFF' }}>Price :</th>
                      <td style={{ color: '#FFFFFF' }}>{partner.price}</td>
                    </tr>
                    <tr>
                      <th className="text-end" style={{ color: '#FFFFFF' }}>Address :</th>
                      <td style={{ color: '#FFFFFF' }}>{partner.address}</td>
                    </tr>
                  </tbody>
                </table>
              }
            </div>
            {/* </div> */}
          </Col>
        </Row>
      </Container>

      {/* Modal for Photo Upload */}
      <Modal
        show={show}
        onHide={handleClose}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Upload Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmitPhoto)}>
            <div className="mb-3">
              <label>Photo</label>
              <input
                type="file"
                {...register("photo", { required: "Photo is required" })}
                className="form-control"
              />
              {errors.photo && (
                <p className="text-danger">{errors.photo.message}</p>
              )}
            </div>
            <button className="btn btn-primary">Upload</button>
          </form>
        </Modal.Body>
      </Modal>

      {/* Modal for Info Update */}
      <Modal show={show1} onHide={handleClose1} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Update Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(editPartner)}>
            <div className="mb-3">
              <label>Full Name</label>
              <input {...register("fullname", {
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
              })} className="form-control" type="text" placeholder="Enter Full Name" />
              {errors.fullname && <p className="text-danger">This field is required</p>}
            </div>
            <div className="mb-3">
              <label>Email</label>
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
              })} className="form-control" type="email" placeholder="Enter Email" />
              {errors.email && <p className="text-danger">This field is required</p>}
            </div>
            <div className="mb-3">
              <label>Mobile Number</label>
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
              })} className="form-control" type="tel" placeholder="Enter Mobile Number" />
              {errors.mobile && <p className="text-danger">This field is required</p>}
            </div>
            <div className="mb-3">
              <label>Price (Per-Hour)</label>
              <input {...register("price", { required: true })} className="form-control" type="number" placeholder="Enter per hour price" />
              {errors.price && <p className="text-danger">This field is required</p>}
            </div>
            <div className="mb-3">
              <label>Address</label>
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
              })} className="form-control shadow" rows="5"></textarea>
              {errors.address && <p className="text-danger"  >This field is required</p>}
            </div>
            <button className="btn btn-success mt-2">Save</button>
          </form>
        </Modal.Body>
      </Modal>
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
  }
}

export default ViewPartner;