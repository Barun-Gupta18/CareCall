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

function ViewAdmin() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  async function getAdminData() {
    try {
      const token = utilityFunctions.getCookieValue('adminAuthToken');
      const url = `${Server_URL}manage-admin`;
      const { data } = await axios.get(url, {
        headers: {
          Authorization: token ? `Bearer ${token}` : ""
        }
      });
      if (data.error) {
        if (data.message === "SignIn") navigate('/admin-login');
        else showErrorToast(data.message);
      } else {
        setAdmin(data.result[0]);
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  }

  useEffect(() => {
    getAdminData();
  }, []);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: admin,
  });

  useEffect(() => {
    if (admin) reset(admin);
  }, [admin, reset]);

  async function editAdmin(Info) {
    try {
      const token = utilityFunctions.getCookieValue('adminAuthToken');
      const url = `${Server_URL}manage-admin`;
      const { data } = await axios.put(url, Info, {
        headers: { Authorization: token ? `Bearer ${token}` : "" }
      });
      if (data.error) {
        if (data.message === "SignIn") navigate('/admin-login');
        else showErrorToast(data.message);
      } else {
        showSuccessToast(data.message);
        getAdminData();
        handleClose1();
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  }

  async function onSubmit(data) {
    try {
      const formData = new FormData();
      formData.append("photo", data.photo[0]);
      const token = utilityFunctions.getCookieValue('adminAuthToken');
      const url = `${Server_URL}admin-manage-photo`;
      const { data: resData } = await axios.post(url, formData, {
        headers: { Authorization: token ? `Bearer ${token}` : "" }
      });
      if (resData.error) {
        if (resData.message === "SignIn") navigate('/admin-login');
        else showErrorToast(resData.message);
      } else {
        getAdminData();
        reset();
        handleClose();
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
            <div className="col-md-9">
              {admin && (
                <table className="table">
                  <tbody>
                    <tr>
                      <td>
                        <h3 style={{ color: '#FFFFFF' }}><b>Profile Info</b></h3>
                      </td>
                      <td className="text-end">
                        <button className="btn btn-primary" onClick={handleShow1}>Edit<span> </span><FaUserEdit /></button>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2} className="text-center">
                        <img src={admin.photo ? admin.photo : '/photo.jpeg'} alt="" style={{ height: 100, borderRadius: 10 }} />
                        <br /><br />
                        <button type="button" className="btn btn-warning" onClick={handleShow}>Upload <span> </span> <FiUpload /></button>
                      </td>
                    </tr>
                    <tr><th className="text-end" style={{ color: '#FFFFFF' }}>Name :</th><td style={{ color: '#FFFFFF' }}>{admin.fullName}</td></tr>
                    <tr><th className="text-end" style={{ color: '#FFFFFF' }}>Email :</th><td style={{ color: '#FFFFFF' }}>{admin.email}</td></tr>
                    <tr><th className="text-end" style={{ color: '#FFFFFF' }}>Mobile :</th><td style={{ color: '#FFFFFF' }}>{admin.mobile}</td></tr>
                    <tr><th className="text-end" style={{ color: '#FFFFFF' }}>Address :</th><td style={{ color: '#FFFFFF' }}>{admin.address}</td></tr>
                  </tbody>
                </table>
              )}
            </div>
          </Col>
        </Row>
      </Container>

      {/* Modal for Photo Upload */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Upload Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="photo">Photo</label>
              <input type="file" {...register('photo')} className="form-control" />
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
          <form onSubmit={handleSubmit(editAdmin)}>
            <div className="mb-3">
              <label>Full Name</label>
              <input {...register("fullName", {
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
              {errors.fullName && <p className="text-danger">This field is required</p>}
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
              {errors.address && <p className="text-danger">This field is required</p>}
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
    background: 'linear-gradient(135deg, #193e40, #132e4f)',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default ViewAdmin;
