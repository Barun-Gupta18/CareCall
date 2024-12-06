import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Server_URL } from "../../utils/config";
import { showErrorToast } from "../../utils/Toasthelper";
import '../css/ParticularSubcategory.css'; // Ensure to import the CSS file for styling

function ViewParticularSubCategory() {
  const { register, handleSubmit, formState: { errors }, reset, setFocus } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const [id, setId] = useState(location.state?.id || localStorage.getItem('subcategoryId'));
  const [particularsubcategory, setParticularsubcategory] = useState([]);

  useEffect(() => {
    if (id) {
      localStorage.setItem('subcategoryId', id);
      getParticularsubcategory(id);
    } else {
      showErrorToast("Subcategory ID is missing.");
    }
  }, [id]);

  async function getParticularsubcategory(id) {
    try {
      const url = `${Server_URL}view-particular-subcategory/${id}`;
      const response = await axios.get(url);
      const { error, message, result } = response.data;

      if (error) {
        showErrorToast(message);
      } else {
        setParticularsubcategory(result);
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  }

  function sendSubcategoryId(id) {
    navigate('/particular-partner', { state: { id } });
  }

  return (
    <>

      {/* <!-- breadcrumb-banner-area --> */}
      <div className="breadcrumb-banner-area ptb-120 bg-opacity" style={{ backgroundImage: 'url("assets/img/bg/6.jpg")' }}>
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
          {/* <div className="section-title mb-60 text-center">
          <h4>Services</h4>
          <h2>Sub-services</h2>
        </div> */}
          <div className="row">
            {particularsubcategory.map((value, index) => (
              <div className="col-lg-4 col-md-6" key={index}>
                <div className="service-wrapper mb-30 shadow-card">
                  <div className="service-img" style={{ height: '350px', overflow: 'hidden' }}>
                    <img
                      src={value.photo ? value.photo : '/whychoose.png'}
                      alt={value.subcategory}
                      style={{ height: '100%', width: '100%', objectFit: 'cover', borderRadius: '8px' }}
                    />
                  </div>
                  <div className="service-text text-center mt-3">
                    <h3 className="service-title">
                      {value.subcategory}
                    </h3>
                    <p className="service-description">{value.categoryInfo}</p>
                    <Link
                      to="#"
                      onClick={(event) => {
                        event.preventDefault();
                        sendSubcategoryId(value._id);
                      }}
                      className="read-more-link"
                    >
                      Read more
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </>
  );
}

export default ViewParticularSubCategory;
