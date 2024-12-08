import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { utilityFunctions } from "../../utils/module";
import { Server_URL } from "../../utils/config";
import { showErrorToast } from "../../utils/Toasthelper";

function ShowUsers() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // Fetch user data
  async function getUserData() {
    try {
      const token = utilityFunctions.getCookieValue("adminAuthToken");
      const url = `${Server_URL}show-all-user`;
      const response = await axios.get(url, {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      });
      const { error, message, result } = response.data;
      if (error && message === "SignIn") navigate("/user-login");
      else if (error) showErrorToast(message);
      else setUsers(result);
    } catch (error) {
      showErrorToast(error.message);
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <div className="container my-5">
        <h2 className="text-center mb-4">User List</h2>
        <div className="row">
          {users.map((user, index) => (
            <div className="col-md-6 col-lg-4 mb-4" key={index}>
              <div className="custom-card shadow">
                <div className="custom-card-header">
                  <img
                    src={user.photo ? user.photo : '/photo.jpeg'}
                    alt={user.fullName}
                    className="custom-card-img"
                  />
                </div>
                <div className="custom-card-body">
                  <h5 className="custom-card-title">{user.fullName}</h5>
                  <p className="custom-card-text">
                    <strong>Email:</strong> {user.email} <br />
                    <strong>Mobile:</strong> {user.mobile} <br />
                    <strong>Address:</strong> {user.address}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>
        {`
          .custom-card {
            background-color: #f9f9f9;
            border: 1px solid #e0e0e0;
            border-radius: 12px;
            overflow: hidden;
            transition: all 0.3s ease-in-out;
          }

          .custom-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
          }

          .custom-card-header {
            background-color: #e0f7fa;
            padding: 0;
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
            font-size: 20px;
            font-weight: 600;
            color: #193e40;
            margin-bottom: 10px;
          }

          .custom-card-text {
            font-size: 14px;
            color: #555;
            line-height: 1.6;
          }

          @media (max-width: 768px) {
            .custom-card-img {
              height: 150px;
            }

            .custom-card-title {
              font-size: 18px;
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

export default ShowUsers;
