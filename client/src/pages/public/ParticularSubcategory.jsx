import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Server_URL } from "../../utils/config";
import { showErrorToast } from "../../utils/Toasthelper";

function ViewParticularSubCategory() {
  const { register, handleSubmit, formState: { errors }, reset, setFocus } = useForm();
  const navigate = useNavigate();
  const location = useLocation(); // Initialize `id` with `location.state?.id` or retrieve it from localStorage if undefined.
  const [id, setId] = useState(location.state?.id || localStorage.getItem('subcategoryId'));
  const [particularsubcategory, setParticularsubcategory] = useState([]);

  useEffect(() => {
    // If `id` exists, save it to local storage and fetch data.
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
    <div className="our-service-area pt-120 pb-90">
      <div className="container">
        <div className="section-title mb-60 text-center" style={{ backgroundImage: "url('assets/img/logo/section.png')" }}>
          <h4>Services</h4>
          <h2>Sub-services</h2>
        </div>
        <div className="row">
          {particularsubcategory.map((value, index) => (
            <div className="col-lg-4 col-md-6" key={index}>
              <div className="service-wrapper mb-30">
                <div className="service-img" style={{ height: '450px', overflow: 'hidden' }}>
                  <img
                    src={value.photo ? value.photo : '/whychoose.png'}
                    alt={value.subcategory}
                    style={{ height: '100%', width: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div className="service-text text-center">
                  <div className="service-icon-img">
                    <i className="flaticon-house-icon"></i>
                  </div>
                  <h2 onClick={() => sendSubcategoryId(value._id)}><Link>{value.subcategory}</Link></h2>
                  <p>{value.categoryInfo}</p><br />
                  {/* <Link
                    to="#"
                    onClick={(event) => {
                      event.preventDefault(); // Prevent default link behavior
                      sendSubcategoryId(value._id); // Call your function
                    }}
                  >
                    Read more
                  </Link> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ViewParticularSubCategory;
