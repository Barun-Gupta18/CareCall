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
import './BookingPage.css';
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

  /* Handle Grand Total... */
  let [slotsSelectedByUser, setSlotsSelectedByUser] = useState([]);

  function calculateGrandTotal(e, index) {
    // console.log(index, e.target.checked)
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
        // console.log(result)
        setUser(result);
        // console.log(user);
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  const handleDateChange = async (bookingDate) => {
    try {
      let data = {
        bookingDate,
        id: value._id
      }
      const response = await axios.post(`${Server_URL}check-available-slots`, data);
      const { error, message, slots } = response.data;
      error ? alert(message) : setSlots(slots);
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  const handleFormSubmit = (data) => {
    // console.log(value._id);
    const slotPrice = value.price;
    let selectedSlotsCount = 0;

    // Calculate selected slots count
    slots.forEach((slot, index) => {
      if (data[`slots${index}`]) {
        selectedSlotsCount++; // Increment count for each selected slot
      }
    });
    const totalPrice = selectedSlotsCount * slotPrice;

    // Transform data to include only selected slots
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
        .filter(slot => slot.selected) // Include only true slots
    };

    // Check if at least one slot is selected
    if (transformedData.slots.length === 0) {
      showErrorToast("Please select at least one slot.");
      return;
    }

    // Call the async onSubmit function with transformed data
    onSubmit(transformedData);
  };

  // Define the async onSubmit function outside handleFormSubmit
  const onSubmit = async (data) => {
    try {

      localStorage.setItem("bookingData", JSON.stringify(data))

      // RAZORPAY Options
      let options = {
        key: "rzp_test_A3RM3Asww6uWvF",
        currency: "INR",
        amount: 0,
        name: "Razorpay Demo",
        description: "Testing Payment Gateway",
        image: "https://i.pinimg.com/originals/c1/92/9d/c1929d3492c2f64ab65b43808c072043.jpg",
        handler: paymentHandler,
        prefill: {
          name: "",
          email: "",
          // email: "user@yahoo.in",
          // contact: "1234567890",
          contact: "",
        },
        theme: {
          color: "#F46432",
        },
      };

      options.amount = (slotsSelectedByUser.length * value.price) * 100;

      let rzp = new window.Razorpay(options);
      rzp.open(); // Display Razorpay
    } catch (error) {
      showErrorToast(error.message);
    }
  };


  const paymentHandler = async (response) => {
    // console.log(response)
    let { razorpay_payment_id } = response;
    // console.log(payment_id);

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
        // showSuccessToast(message);
      }
    }
  };


  return (
    <Container fluid className="container-background d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100 d-flex justify-content-center align-items-center">
        <Col md={8} lg={6} className="d-flex justify-content-center">
          <div className="form-container">
            <h3 className="text-center mb-4 header-text">Add Booking Details</h3>

            {user.map((x, index) => (
              <form onSubmit={handleSubmit(handleFormSubmit)} key={index}>
                <div className="mb-3">
                  <label>Contact Information:</label>
                  <div className="input-group">
                    <span className="input-group-text icon-container"><FaEnvelope /></span>
                    <input
                      {...register("email", {
                        required: true, validate: (value) => {
                          const trimmedValue = value.trim();
                          return /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(trimmedValue)
                            ? true
                            : "Only @gmail.com is allowed";
                        },
                        onChange: (e) => {
                          e.target.value = e.target.value.trimStart();
                        },
                      })}
                      className="form-control input"
                      type="email"
                      defaultValue={x.email}
                    />
                  </div>
                  {errors.email && <p className="text-danger">This field is required</p>}
                </div>

                <div className="mb-3">
                  <label>Mobile Number:</label>
                  <div className="input-group">
                    <span className="input-group-text icon-container"><FaPhone /></span>
                    <input
                      {...register("mobile", {
                        required: true, validate: (value) => {
                          const trimmedValue = value.trim();
                          return /^[0-9]{10}$/.test(trimmedValue)
                            ? true
                            : "Enter a valid 10-digit mobile number without spaces";
                        },
                        onChange: (e) => {
                          e.target.value = e.target.value.trimStart();
                        },
                      })}
                      className="form-control input"
                      type="tel"
                      defaultValue={x.mobile}
                    />
                  </div>
                  {errors.mobile && <p className="text-danger">This field is required</p>}
                </div>

                <div className="mb-3">
                  <label>State:</label>
                  <div className="input-group">
                    <span className="input-group-text icon-container"><FaMapMarkerAlt /></span>
                    <input
                      {...register("state", { required: true })}
                      className="form-control input"
                      type="text"
                      value={x.stateInfo}
                      readOnly
                    />
                  </div>
                  {errors.state && <p className="text-danger">This field is required</p>}
                </div>

                <div className="mb-3">
                  <label>City:</label>
                  <div className="input-group">
                    <span className="input-group-text icon-container"><FaMapMarkerAlt /></span>
                    <input
                      {...register("city", { required: true })}
                      className="form-control input"
                      type="text"
                      value={x.cityInfo}
                      readOnly
                    />
                  </div>
                  {errors.city && <p className="text-danger">This field is required</p>}
                </div>

                <div className="mb-3">
                  <label>Pincode:</label>
                  <div className="input-group">
                    <span className="input-group-text icon-container"><FaMapMarkerAlt /></span>
                    <input
                      {...register("pincode", { required: true })}
                      className="form-control input"
                      type="text"
                      value={x.pincode}
                      readOnly
                    />
                  </div>
                  {errors.pincode && <p className="text-danger">This field is required</p>}
                </div>

                <div className="mb-3">
                  <label>Address:</label>
                  <div className="input-group">
                    <span className="input-group-text icon-container"><PiAddressBookFill /></span>
                    <textarea
                      {...register('address', {
                        required: "Address is required",
                        validate: (value) => {
                          const trimmedValue = value.trim().replace(/\s+/g, " ");
                          if (trimmedValue.length < 5) return "Address must be at least 5 characters";
                          if (trimmedValue.length > 100) return "Address must not exceed 100 characters";
                          return true;
                        },
                        onChange: (e) => {
                          e.target.value = e.target.value.trimStart().replace(/\s+/g, " ");
                        },
                      })}
                      className="form-control shadow text-area"
                      defaultValue={x.address}
                    ></textarea>
                  </div>
                  {errors.address && <p className="text-danger">This field is required</p>}
                </div>

                <div className="mb-3">
                  <label>Select Booking Date</label>
                  <div className="input-group">
                    <span className="input-group-text icon-container"><BsFillCalendarDateFill /></span>
                    <input
                      type="date"
                      min={minDate}
                      className="form-control p-3"
                      {...register("date", { required: true })}
                      onChange={(e) => handleDateChange(e.target.value)}
                    />
                  </div>
                  {errors.date && <p className="text-danger">This field is required</p>}
                </div>

                {slots.length > 0 && (
                  <div className="mb-3">
                    <hr />
                    <h3 className="text-white">SlotAmount: {value.price}</h3>
                    <label>Select Slots</label>
                    <table className="table table-bordered">
                      <thead>
                        <tr className="text-capitalize">
                          <th></th>
                          <th className="text-white">Start Time</th>
                          <th className="text-white">End Time</th>
                          <th className="text-white">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {slots.map((slot, i) => (
                          <tr key={slot.start}>
                            <td className="text-center text-white">
                              {slot.available && (
                                <input type="checkbox" {...register(`slots${i}`)} onChange={(e) => {
                                  calculateGrandTotal(e, i)
                                }} />
                              )}
                            </td>
                            <td className="text-white">{slot.start}</td>
                            <td className="text-white">{slot.end}</td>
                            <td>
                              {slot.available ? (
                                <span className="badge bg-success">Available</span>
                              ) : (
                                <span className="badge bg-danger">Not Available</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <h3 className="text-end">
                      Total Amount: <span className="badge bg-primary">{value.price * slotsSelectedByUser.length}</span>
                    </h3>
                  </div>
                )}

                <button type="submit" className="btn w-100 button">Pay-Now</button>
              </form>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
}


export default BookingPage;
