import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { utilityFunctions } from "../../utils/module";
import { Server_URL } from "../../../utils/config";
import { showErrorToast, showSuccessToast } from "../../utils/Toasthelper";

function ShowUsers() {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  // Fetch user data
  async function getUserData() {
    try {
      const token = utilityFunctions.getCookieValue('adminAuthToken');
      const url = Server_URL + "show-all-user";
      const response = await axios.get(url, {
        headers: {
          Authorization: token ? `Bearer ${token}` : ""
        }
      });
      const { error, message, result } = response.data;
      if (error && message === "SignIn") {
        navigate('/user-login');
      } else if (error) {
        showErrorToast(message);
      } else {
        setUser(result);
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  }

  // Delete user
  async function deleteUser(id) {
    try {
      const token = utilityFunctions.getCookieValue('adminAuthToken');
      const url = Server_URL + "admin-manage-user/" + id;
      const res = await axios.delete(url, {
        headers: {
          Authorization: token ? `Bearer ${token}` : ""
        }
      });
      const { error, message } = res.data;
      if (error && message === "SignIn") {
        navigate('/user-login');
      } else if (error) {
        showErrorToast(message);
        getUserData();
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <style>
        {`
          .view-city-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }

          .view-city-title {
            font-size: 28px;
            font-weight: bold;
            color: #333;
            text-align: center;
            margin-bottom: 20px;
          }

          .table-responsive {
            overflow-x: auto;
          }

          .custom-table {
            width: 100%;
            border-collapse: collapse;
          }

          .custom-table thead th {
            background-color: #193e40;
            color: white;
            font-weight: bold;
            padding: 12px;
            text-align: left;
            font-size: 16px;
          }

          .custom-table tbody tr {
            transition: background-color 0.3s;
          }

          .custom-table tbody tr:hover {
            background-color: #f1f1f1;
          }

          .custom-table tbody td {
            padding: 12px;
            border-bottom: 1px solid #ddd;
            font-size: 15px;
            color: #555;
          }

          .delete-btn {
            padding: 6px 12px;
            background-color: #e74c3c;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
          }

          .delete-btn:hover {
            background-color: #c0392b;
          }
        `}
      </style>
      <div className="view-city-container">
        <h1 className="view-city-title">User List</h1>
        <div className="table-responsive">
          <table className="table table-striped custom-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Address</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {user.map((value, index) => (
                <tr key={index}>
                  <td>{value.fullName}</td>
                  <td>{value.email}</td>
                  <td>{value.mobile}</td>
                  <td>{value.address}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => deleteUser(value._id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ShowUsers;
