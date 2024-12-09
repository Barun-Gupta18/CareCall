import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Server_URL } from "../../utils/config";
import { showErrorToast } from "../../utils/Toasthelper";

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
      {/* Inline CSS */}
      <style>
        {`
          .service-wrapper {
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            overflow: hidden;
          }

          .service-wrapper:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
          }

          .service-img {
            border-radius: 8px;
            overflow: hidden;
            position: relative;
          }

          .service-img img {
            border-radius: 8px;
            transition: transform 0.3s ease;
          }

          .service-img:hover img {
            transform: scale(1.05);
          }

          .service-title {
            font-size: 1.5rem;
            font-weight: bold;
            color: #333;
            transition: color 0.3s ease;
          }

          .service-description {
            font-size: 1rem;
            color: #666;
            margin-top: 10px;
          }

          p.service-description {
            padding: 0px;
          }

          .read-more-link {
            display: inline-block;
            margin-top: 10px;
            color: #007bff;
            font-weight: bold;
            text-decoration: none;
            transition: color 0.3s ease;
          }

          .read-more-link:hover {
            color: #0056b3;
          }

          .section-title h4 {
            font-weight: 600;
            font-size: 1.2rem;
          }

          .section-title h2 {
            color: #333;
            font-size: 2.5rem;
            font-weight: bold;
            margin-top: 10px;
          }

          @media (max-width: 767px) {
            .service-wrapper {
              margin-bottom: 20px;
            }

            .service-title {
              font-size: 1.25rem;
            }
          }
        `}
      </style>

      {/* Breadcrumb Section */}
      <div className="breadcrumb-banner-area ptb-120 bg-opacity" style={{ backgroundImage: 'url("assets/img/bg/6.jpg")' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb-text text-center">
                <h2>Sub-services</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subcategory Section */}
      <div className="our-service-area pt-120 pb-90">
        <div className="container">
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
