import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { utilityFunctions } from "../../utils/module";
import { Server_URL } from "../../../utils/config";
import { showErrorToast, showSuccessToast } from "../../utils/Toasthelper";
import { Server_URL2 } from "../../utils/config";

function ShowPartner() {
  const [partner, setPartner] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch partner data
  async function getPartnerData() {
    try {
      const token = utilityFunctions.getCookieValue('adminAuthToken');
      const url = `${Server_URL}show-all-partner`;
      const response = await axios.get(url, {
        headers: { Authorization: token ? `Bearer ${token}` : "" }
      });
      const { error, message, result } = response.data;
      if (error && message === "SignIn") navigate('/admin-login');
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
      const token = utilityFunctions.getCookieValue('adminAuthToken');
      const newStatus = currentStatus === 'active' ? 'In-active' : 'active';
      const url = `${Server_URL}admin-status-update/${id}`;
      const data = { status: newStatus };
      const res = await axios.put(url, data, {
        headers: { Authorization: token ? `Bearer ${token}` : "" }
      });

      const { error, message } = res.data;
      if (error && message === "SignIn") navigate('/admin-login');
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

  // Delete partner
  async function deletePartner(id) {
    try {
      const token = utilityFunctions.getCookieValue('adminAuthToken');
      const url = `${Server_URL}admin-manage-partner/${id}`;
      const res = await axios.delete(url, {
        headers: { Authorization: token ? `Bearer ${token}` : "" }
      });
      const { error, message } = res.data;
      if (error && message === "SignIn") navigate('/admin-login');
      else if (error) showErrorToast(message);
      else getPartnerData();
    } catch (error) {
      showSuccessToast(error.message);
    }
  }

  useEffect(() => {
    getPartnerData();
  }, []);

  return (
    <>
      <div
        className="container my-5"
        style={{ overflowX: "auto", whiteSpace: "nowrap" }}
      >
        <h2 className="text-center mb-4">Partners List</h2>
        <table className="table ">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Category</th>
              <th>Sub-category</th>
              <th>State</th>
              <th>City</th>
              <th>Address</th>
              <th>Status</th>
              <th>Start</th>
              <th>End</th>
              <th>Price</th>
              <th>Photo</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {partner.map((value, index) => (
              <tr key={index}>
                <td>{value.fullname}</td>
                <td>{value.email}</td>
                <td>{value.mobile}</td>
                <td>{value.categoryInfo}</td>
                <td>{value.subcategoryInfo}</td>
                <td>{value.stateInfo}</td>
                <td>{value.cityInfo}</td>
                <td>{value.address}</td>
                <td>
                  <button
                    onClick={() => handleStatusUpdate(value._id, value.status)}
                    disabled={loading}
                    className={`status-btn ${value.status === "active" ? "status-active" : "status-inactive"}`}
                  >
                    {loading
                      ? "Updating..."
                      : value.status === "In-active"
                        ? "Activate"
                        : "Deactivate"}
                  </button>
                </td>
                <td>{value.starttime}</td>
                <td>{value.endtime}</td>
                <td>{value.price}</td>
                <td>
                  <img
                    src={`${Server_URL2}${value.photo}`}
                    alt="img"
                    style={{ height: 75 }}
                  />
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => deletePartner(value._id)}
                    className="btn btn-danger btn-sm me-5"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style>
        {`
          // .container {
          //   max-width: 1200px;
          //   margin: 0 auto;
          //   padding: 20px;
          //   background-color: #f9f9f9;
          //   border-radius: 10px;
          //   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          // }

          .table {
            width: 100%;
            margin-top: 20px;
          }

          .table thead th {
            background-color: #193e40;
            color: white;
            font-weight: bold;
            padding: 10px;
            font-size: 14px;
          }

           .table tbody td {
            padding: 10px;
            font-size: 13px;
            color: #555;
          }

           .table tbody tr:hover {
            background-color: #f1f1f1;
          }

          .btn-danger {
            background-color: #e74c3c;
            color: white;
            border-radius: 5px;
            transition: background-color 0.3s;
          }

          .btn-danger:hover {
            background-color: #c0392b;
          }

          .status-btn {
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
          }

          .status-active {
            background-color: #27ae60;
          }

          .status-inactive {
            background-color: #e74c3c;
          }

          /* Responsive adjustments */
          @media (max-width: 768px) {
            .container {
              padding: 10px;
            }

            .table-dark thead th,
            .table-dark tbody td {
              font-size: 12px;
              padding: 8px;
            }

            .status-btn {
              padding: 4px 8px;
              font-size: 12px;
            }
          }

          @media (max-width: 576px) {
            .table-dark thead th,
            .table-dark tbody td {
              font-size: 10px;
              padding: 5px;
            }
          }
        `}
      </style>
    </>
  );
}

export default ShowPartner;
