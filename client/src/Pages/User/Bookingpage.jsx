import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { utilityFunctions } from "../../utils/module";
import { Server_URL } from "../../utils/config";
import { showErrorToast } from "../../utils/Toasthelper";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { BsFillCalendarDateFill } from "react-icons/bs";
import { PiAddressBookFill } from "react-icons/pi";
import { Container, Row, Col } from 'react-bootstrap';
import { useRazorpay } from "react-razorpay";

function BookingPage() {

  const Razorpay = useRazorpay();

  const { register, handleSubmit, formState: { errors }, reset, setFocus } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const value = location.state?.value;

  console.log(value)

  const [user, setUser] = useState([]);
  const [slots, setSlots] = useState([]);
  const [minDate, setMinDate] = useState("");

  let [slotsSelectedByUser, setSlotsSelectedByUser] = useState([]);

  function calculateGrandTotal(e, index) {
    if (e.target.checked) {
      setSlotsSelectedByUser((prev) => [...prev, { index: index, checked: true }]);
    } else {
      const filterSlots = slotsSelectedByUser.filter(x => x.index !== index);
      setSlotsSelectedByUser(filterSlots);
    }
  }

  useEffect(() => {
    GetUserInfo();
    setFocus("FullName");

    const today = new Date();
    today.setDate(today.getDate() + 1);
    setMinDate(today.toISOString().split("T")[0]);
  }, []);

  const GetUserInfo = async () => {
    try {
      const token = utilityFunctions.getCookieValue('userAuthToken');
      const response = await axios.get(`${Server_URL}manage-user`, {
        headers: { Authorization: token ? `Bearer ${token}` : "" }
      });
      const { error, message, result } = response.data;
      if (error) {
        message === "SignIn" ? navigate('/user-login') : showErrorToast(message);
      } else {
        setUser(result);
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  const handleDateChange = async (bookingDate) => {
    try {
      let data = { bookingDate, id: value._id }
      const response = await axios.post(`${Server_URL}check-available-slots`, data);
      const { error, message, slots } = response.data;
      error ? alert(message) : setSlots(slots);
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  const handleFormSubmit = (data) => {
    const slotPrice = value.price;
    let selectedSlotsCount = 0;

    slots.forEach((slot, index) => {
      if (data[`slots${index}`]) {
        selectedSlotsCount++;
      }
    });
    const totalPrice = selectedSlotsCount * slotPrice;

    const transformedData = {
      date: data.date,
      email: data.email,
      mobile: data.mobile,
      state: data.state,
      city: data.city,
      pincode: data.pincode,
      address: data.address,
      totalPrice,
      category: value.category,
      subcategory: value.subcategory,
      slots: slots
        .map((slot, index) => ({
          start: slot.start,
          end: slot.end,
          selected: data[`slots${index}`] || false
        }))
        .filter(slot => slot.selected)
    };

    if (transformedData.slots.length === 0) {
      showErrorToast("Please select at least one slot.");
      return;
    }

    onSubmit(transformedData);
  };

  const onSubmit = async (data) => {
    try {
      localStorage.setItem("bookingData", JSON.stringify(data))

      let options = {
        key: "rzp_test_A3RM3Asww6uWvF",
        currency: "INR",
        amount: 0,
        name: "Razorpay Demo",
        description: "Testing Payment Gateway",
        image: "https://i.pinimg.com/originals/c1/92/9d/c1929d3492c2f64ab65b43808c072043.jpg",
        handler: paymentHandler,
        prefill: { name: "", email: "", contact: "" },
        theme: { color: "#F46432" },
      };

      options.amount = (slotsSelectedByUser.length * value.price) * 100;

      let rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  const paymentHandler = async (response) => {
    let { razorpay_payment_id } = response;

    if (razorpay_payment_id === "") {
      alert("Payment Failed");
    } else {
      let data = JSON.parse(localStorage.getItem("bookingData"))
      const token = utilityFunctions.getCookieValue('userAuthToken');
      const response = await axios.post(`${Server_URL}add-booking-details/${value._id}`, data, {
        headers: { Authorization: token ? `Bearer ${token}` : "" }
      });

      const { error, message } = response.data;
      if (error) {
        message === "SignIn" ? navigate('/user-login') : showErrorToast(message);
      } else {
        localStorage.removeItem("bookingData")
        navigate("/user/thank-you")
      }
    }
  };

  return (
    <>
      <style>
        {`
          .container-background {
            background: linear-gradient(135deg, #193e40, #132e4f);
            padding-top: 60px;
            padding-bottom: 60px;
            min-height: 100vh;
          }

          .form-container {
            background-color: rgba(0, 40, 72, 0.9);
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            padding: 30px;
            width: 100%;
            max-width: 600px;
          }

          .header-text {
            color: #FFFFFF;
            font-weight: bold;
            font-size: 24px;
          }

          .icon-container {
            background-color: #FFFFFF;
            border: none;
          }

          .input {
            padding-left: 10px;
          }

          .button {
            background: linear-gradient(135deg, #4E54C8, #132e4f);
            color: #FFFFFF;
            border: none;
            padding: 12px;
            font-size: 18px;
          }

          .text-area {
            height: 80px;
          }

          .available {
            color: green;
          }

          .booked {
            color: red;
          }
        `}
      </style>

      <Container fluid className="container-background d-flex justify-content-center align-items-center min-vh-100">
        <Row className="w-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} className="d-flex justify-content-center">
            <div className="form-container">
              <h3 className="text-center mb-4 header-text">Add Booking Details</h3>
              {user.map((x, index) => (
                <form onSubmit={handleSubmit(handleFormSubmit)} key={index}>
                  {/* Form Fields */}
                  <div className="mb-3">
                    <label>Contact Information:</label>
                    <div className="input-group">
                      <span className="input-group-text icon-container"><FaEnvelope /></span>
                      <input
                        {...register("email", { required: true, validate: (value) => /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(value.trim()) })}
                        className="form-control input"
                        type="email"
                        defaultValue={x.email}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label>Mobile Number:</label>
                    <div className="input-group">
                      <span className="input-group-text icon-container"><FaPhone /></span>
                      <input
                        {...register("mobile", { required: true, validate: (value) => /^[0-9]{10}$/.test(value.trim()) })}
                        className="form-control input"
                        type="tel"
                        defaultValue={x.mobile}
                      />
                    </div>
                  </div>

                  {/* Additional form fields */}

                  <button type="submit" className="btn w-100 button">Pay-Now</button>
                </form>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default BookingPage;
