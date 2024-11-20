import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { utilityFunctions } from "../../../utils/module";
import { Server_URL } from "../../../utils/config";
import { showErrorToast, showSuccessToast } from "../../../utils/Toasthelper";
import "./ViewCites.css"; // Import the CSS file for styling

function ViewCity() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
  } = useForm();

  const [city, setCity] = useState([]);
  const navigate = useNavigate();

  async function getCityData() {
    try {
      const token = utilityFunctions.getCookieValue('adminAuthToken');
      const url = Server_URL + "admin-view-city";
      const response = await axios.get(url, {
        headers: {
          Authorization: token ? `Bearer ${token}` : ""
        }
      });
      const { error, message } = response.data;
      if (error && message === "SignIn") {
        navigate('/admin-login')
      }
      else if (error) {
        showErrorToast(message);
      } else {
        const { result } = response.data;
        setCity(result);
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  }

  async function deleteCity(id) {
    try {
      const token = utilityFunctions.getCookieValue('adminAuthToken');
      const url = Server_URL + "admin-delete-city/" + id;
      const res = await axios.delete(url, {
        headers: {
          Authorization: token ? `Bearer ${token}` : ""
        }
      });
      const { error, message } = res.data;
      if (error && message === "SignIn") {
        navigate('/admin-login')
      }
      else if (error) {
        showErrorToast(message);
      } else {
        showSuccessToast(message);
        getCityData();
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  }

  useEffect(() => {
    getCityData();
  }, []);

  return (
    <div className="view-city-container">
      <h1 className="view-city-title">City Management</h1>
      <div className="table-responsive">
        <table className="table table-striped custom-table">
          <thead>
            <tr>
              <th>State Name</th>
              <th>City Name</th>
              <th>Pin Code</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {city.map((value, index) => (
              <tr key={index}>
                <td>{value.stateInfo}</td>
                <td>{value.cityname}</td>
                <td>{value.pincode}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => deleteCity(value._id)}
                    className=" delete-btn"
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
  );
}

export default ViewCity;
