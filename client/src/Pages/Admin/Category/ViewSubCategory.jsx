import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { utilityFunctions } from "../../../utils/module";
import { Server_URL } from "../../../utils/config";
import { showErrorToast, showSuccessToast } from "../../../utils/Toasthelper";


function ViewSubCategory() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
  } = useForm();

  const navigate = useNavigate();
  const [subcategory, setSubcategory] = useState([]);


  async function getSubcategory() {
    try {
      const token = utilityFunctions.getCookieValue('adminAuthToken');
      const url = Server_URL + "manage-subcategory";
      const response = await axios.get(url, {
        headers: {
          Authorization: token ? `Bearer ${token}` : ""
        }
      });
      // console.log(response.headers.Authorization);
      const { error, message } = response.data;
      if (error && message === "SignIn") {

      }
      else if (error) {
        showErrorToast(message);
      } else {
        const { result } = response.data;
        setSubcategory(result);
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  }


  async function deleteSubcategory(id) {
    try {
      const token = utilityFunctions.getCookieValue('adminAuthToken');
      const url = Server_URL + "manage-subcategory/" + id;
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
        getSubcategory();
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  }

  async function editSubcategory(id) {

    navigate('/admin/edit-subcategory', { state: { id } })
  }


  useEffect(() => {
    getSubcategory();

  }, []);

  return (
    <>

      {/* <!-- breadcrumb-banner-area --> */}
      <div className="breadcrumb-banner-area ptb-120 bg-opacity" style={{ backgroundImage: 'url("/assets/img/bg/6.jpg")' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb-text text-center">
                <h2>Sub-services</h2>
                {/* <p>Make's your Life easy. </p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- breadcrumb-banner-area-end --> */}

      <div className="our-service-area pt-120 pb-90">
        <div className="container">
          {/* <div className="section-title mb-60 text-center" style={{ backgroundImage: "url('assets/img/logo/section.png')" }}>
            <h4>Services</h4>
            <h2>Sub-Category</h2>
          </div> */}
          <div className="row">
            {subcategory.map((value, index) => {
              return (
                <div className="col-lg-4 col-md-6" key={index}>
                  <div className="service-wrapper mb-30">
                    <div className="service-img">
                      <img src={value.photo ? value.photo : '/whychoose.png'} alt={value.categoryname}
                        style={{ height: '300px', width: '370px' }}

                      />
                    </div>
                    <div className="service-text text-center">
                      <div className="service-icon-img">
                        <i className="flaticon-house-icon"></i>
                      </div>
                      <h2><Link to="">{value.subcategory}</Link></h2>
                      <h4>{value.categoryInfo}</h4>
                      {/* <p>{value.description} </p> */}
                      <button
                        type="button"
                        onClick={() => deleteSubcategory(value._id)}
                        className="btn btn-danger my-3"
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        onClick={() => editSubcategory(value._id)}
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

export default ViewSubCategory;
