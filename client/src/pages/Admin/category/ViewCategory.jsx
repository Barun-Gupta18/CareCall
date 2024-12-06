import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { utilityFunctions } from "../../../utils/module";
import { Server_URL } from "../../../utils/config";
import { showErrorToast, showSuccessToast } from "../../../utils/Toasthelper";
import { Link } from "react-router-dom";


function ViewCategory() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
  } = useForm();

  const navigate = useNavigate();
  const [category, setCategory] = useState([]);


  async function getCategory() {
    try {
      const token = utilityFunctions.getCookieValue('adminAuthToken');
      const url = Server_URL + "manage-category";
      const response = await axios.get(url, {
        headers: {
          Authorization: token ? `Bearer ${token}` : ""
        }
      });
      // console.log(headers);
      const { error, message } = response.data;
      if (error && message === "SignIn") {

      }
      else if (error) {
        showErrorToast(message);
      } else {
        const { result } = response.data;
        // console.log(result)
        setCategory(result);
        // console.log(category)
        // console.log(category.photo)
      }
      // }
    } catch (error) {
      showErrorToast(error.message);
    }
  }


  async function deleteCategory(id) {
    try {
      const token = utilityFunctions.getCookieValue('adminAuthToken');
      const url = Server_URL + "manage-category/" + id;
      const res = await axios.delete(url, {
        headers: {
          Authorization: token ? `Bearer ${token}` : ""
        }
      });
      // console.log(headers)
      const { error, message } = res.data;
      if (error && message === "SignIn") {

      }
      else if (error) {
        showErrorToast(message);
      } else {
        showSuccessToast(message);
        getCategory();
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  }

  async function editCategory(id) {

    navigate('/admin/edit-category', { state: { id } })
  }


  useEffect(() => {
    getCategory();
  }, []);

  return (
    <>
      <div className="our-service-area pt-120 pb-90">
        <div className="container">
          <div className="section-title mb-60 text-center" style={{ backgroundImage: "url('assets/img/logo/section.png')" }}>
            <h4>Services</h4>
            <h2>Category</h2>
          </div>
          <div className="row">
            {category.map((value, index) => {
              return (
                <div className="col-lg-4 col-md-6" key={index}>
                  <div className="service-wrapper mb-30">
                    <div className="service-img">
                      <img src={value.photo ? value.photo : '/whychoose.png'} alt={value.categoryname} />
                    </div>
                    <div className="service-text text-center">
                      <div className="service-icon-img">
                        <i className="flaticon-house-icon"></i>
                      </div>
                      <h2><Link to="service-details.html">{value.categoryname}</Link></h2>
                      <p>{value.description} </p>
                      <button
                        type="button"
                        onClick={() => deleteCategory(value._id)}
                        className="btn btn-danger my-3"
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        onClick={() => editCategory(value._id)}
                        className="btn btn-danger m-3"
                      >
                        Edit
                      </button>
                      {/* <a href="service-details.html">read more</a> */}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewCategory;
