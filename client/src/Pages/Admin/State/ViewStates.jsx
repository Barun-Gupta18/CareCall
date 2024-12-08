import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { utilityFunctions } from "../../../utils/module";
import { Server_URL } from "../../../utils/config";
import { showErrorToast, showSuccessToast } from "../../../utils/Toasthelper";
import "../City/ViewCites.css"; // Import the CSS file for styling



function ViewState() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
  } = useForm();

  const [state, setState] = useState([]);


  async function getStateData() {
    try {
      const token = utilityFunctions.getCookieValue('adminAuthToken');
      const url = Server_URL + "view-state";
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
        setState(result);
      }
      // }
    } catch (error) {
      showErrorToast(error.message);
    }
  }


  const navigate = useNavigate();


  async function deleteState(id) {
    try {
      const token = utilityFunctions.getCookieValue('adminAuthToken');
      const url = Server_URL + "delete-state/" + id;
      const res = await axios.delete(url, {
        headers: {
          Authorization: token ? `Bearer ${token}` : ""
        }
      });
      // console.log(headers)
      const { error, message } = res.data;
      if (error && message === "SignIn") {
        navigate('/admin-login')
      }
      else if (error) {
        showErrorToast(message);
      } else {
        showSuccessToast(message);
        getStateData();
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  }

  useEffect(() => {
    getStateData();

  }, []);

  return (
    <>

      <div className="view-city-container">
        <h1 className="view-city-title">State Management</h1>
        <div className="table-responsive">
          <table className="table table-striped custom-table">
            <thead>
              <tr>
                <th>State Name</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {state.map((value, index) => {
                return (
                  <tr key={index}>
                    <td>
                      {value.statename}
                    </td>
                    <td>
                      {
                        <button
                          type="button"
                          onClick={() => deleteState(value._id)}
                          className="delete-btn"

                        >
                          Delete
                        </button>
                      }
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

    </>
  );
}

export default ViewState;
