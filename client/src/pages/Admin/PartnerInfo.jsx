import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { utilityFunctions } from "../../utils/module";
import { Server_URL } from "../../utils/config";
import { showErrorToast, showSuccessToast } from "../../utils/Toasthelper";

function ShowPartner() {
  const [partner, setPartner] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch partner data
  async function getPartnerData() {
    try {
      const token = utilityFunctions.getCookieValue("adminAuthToken");
      const url = `${Server_URL}show-all-partner`;
      const response = await axios.get(url, {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      });
      const { error, message, result } = response.data;
      if (error && message === "SignIn") navigate("/admin-login");
      else if (error) showErrorToast(message);
      else setPartner(result);
    } catch (error) {
      showErrorToast(error.message);
    }
  }

  // Toggle status (active/inactive)
  const handleStatusUpdate = async (id, currentStatus) => {
    setLoading(true);
    try {
      const token = utilityFunctions.getCookieValue("adminAuthToken");
      const newStatus = currentStatus === "active" ? "In-active" : "active";
      const url = `${Server_URL}admin-status-update/${id}`;
      const data = { status: newStatus };
      const res = await axios.put(url, data, {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      });

      const { error, message } = res.data;
      if (error && message === "SignIn") navigate("/admin-login");
      else if (error) showErrorToast(message);
      else {
        showSuccessToast(message);
        setPartner((prev) =>
          prev.map((x) => (x._id === id ? { ...x, status: newStatus } : x))
        );
        getPartnerData();
      }
    } catch (error) {
      showErrorToast(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPartnerData();
  }, []);

  return (
    <>
      <div className="container my-5">
        <h2 className="text-center mb-4">Service Provider View</h2>
        <div className="row">
          {partner.map((value, index) => (
            <div className="col-md-6 col-lg-4 mb-4" key={index}>
              <div className="custom-card shadow-sm">
                <img
                  src={value.photo ? value.photo : '/photo.jpeg'}
                  alt={value.fullname}
                  className="custom-card-img"
                />
                <div className="custom-card-body">
                  <h5 className="custom-card-title">{value.fullname}</h5>
                  <p className="custom-card-text">
                    <strong>Email:</strong> {value.email} <br />
                    <strong>Mobile:</strong> {value.mobile} <br />
                    <strong>Category:</strong> {value.categoryInfo} <br />
                    <strong>Sub-category:</strong> {value.subcategoryInfo} <br />
                    <strong>State:</strong> {value.stateInfo} <br />
                    <strong>City:</strong> {value.cityInfo} <br />
                    <strong>Address:</strong> {value.address} <br />
                    <strong>Price:</strong> ₹{value.price} <br />
                    <strong>Start Time:</strong> {value.starttime} <br />
                    <strong>End Time:</strong> {value.endtime}
                  </p>
                  <button
                    onClick={() => handleStatusUpdate(value._id, value.status)}
                    disabled={loading}
                    className={`btn btn-block ${value.status === "active" ? "btn-success" : "btn-danger"
                      }`}
                  >
                    {loading
                      ? "Updating..."
                      : value.status === "In-active"
                        ? "Activate"
                        : "Deactivate"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>
        {`
          .custom-card {
            background-color: #fff;
            border: 1px solid #ddd;
            border-radius: 12px;
            overflow: hidden;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          .custom-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
          }

          .custom-card-img {
            width: 100%;
            height: 200px;
            object-fit: cover;
            border-bottom: 1px solid #ddd;
          }

          .custom-card-body {
            padding: 15px;
          }

          .custom-card-title {
            font-size: 18px;
            font-weight: 600;
            color: #193e40;
            margin-bottom: 10px;
          }

          .custom-card-text {
            font-size: 14px;
            color: #555;
            line-height: 1.6;
          }

          .btn {
            display: block;
            width: 100%;
            padding: 10px 0;
            font-size: 14px;
            font-weight: 600;
            text-align: center;
            border-radius: 8px;
            transition: background-color 0.3s ease, transform 0.3s ease;
          }

          .btn-success {
            background-color: #27ae60;
            color: #fff;
          }

          .btn-success:hover {
            background-color: #219150;
            transform: scale(1.02);
          }

          .btn-danger {
            background-color: #e74c3c;
            color: #fff;
          }

          .btn-danger:hover {
            background-color: #c0392b;
            transform: scale(1.02);
          }

          @media (max-width: 768px) {
            .custom-card-img {
              height: 150px;
            }

            .custom-card-title {
              font-size: 16px;
            }

            .custom-card-text {
              font-size: 13px;
            }
          }
        `}
      </style>
    </>
  );
}

export default ShowPartner;
