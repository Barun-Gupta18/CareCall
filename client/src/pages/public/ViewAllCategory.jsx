import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { utilityFunctions } from "../../utils/module";
import { Server_URL, Server_URL2 } from "../../utils/config";
import { showErrorToast, showSuccessToast } from "../../utils/Toasthelper";
import { Link } from "react-router-dom";


function ViewAllCategory() {
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
      const url = Server_URL + "view-category-partner";
      const response = await axios.get(url);
      const { error, message } = response.data;
      if (error) {
        showErrorToast(message);
      } else {
        const { result } = response.data;
        setCategory(result);
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  }



  useEffect(() => {
    getCategory();
  }, []);

  async function sendCategoryId(id) {
    navigate('/particular-subcategory', { state: { id } })
  }

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
                      <img src={value.photo ? `${Server_URL2}${value.photo}` : '/whychoose.png'} alt={value.categoryname} />
                    </div>
                    <div className="service-text text-center">
                      <div className="service-icon-img">
                        <i className="flaticon-house-icon"></i>
                      </div>
                      <h2 onClick={() => sendCategoryId(value._id)}><Link>{value.categoryname}</Link></h2>
                      <h4>{value.description} </h4><br />
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

export default ViewAllCategory;
