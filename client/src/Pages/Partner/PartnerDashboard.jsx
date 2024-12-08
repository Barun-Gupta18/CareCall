import axios from "axios";
import { useState, useEffect } from "react";
import { Server_URL } from "../../utils/config";
import { utilityFunctions } from "../../utils/module";
import { FaClipboardList, FaTools, FaUsers, FaShoppingCart, FaDollarSign } from 'react-icons/fa';
import { showErrorToast } from "../../utils/Toasthelper";
import '../css/AdminDashboard.css';



function PartnerDashboard() {

  const [confirm, setConfirm] = useState([]);
  const [cancel, setCancel] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [booking, setBooking] = useState([]);
  const [income, setIncome] = useState(0);

  async function getbookingdata() {
    try {
      const token = utilityFunctions.getCookieValue("partnerAuthToken");
      const url = `${Server_URL}partner-booking-data`;
      const { data } = await axios.get(url, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      if (data.error) {
        if (data.message === "SignIn") navigate("/partner-login");
        else showErrorToast(data.message);
      } else {
        const confirmedBookings = data.result.filter(
          (booking) => booking.status === "Confirmed"
        );
        setConfirm(confirmedBookings.length);

        const canceledBookings = data.result.filter(
          (booking) => booking.status === "Canceled"
        );
        setCancel(canceledBookings.length);

        const completedBookings = data.result.filter(
          (booking) => booking.status === "Completed"
        );
        const incomeTotal = completedBookings.reduce((acc, booking) => acc + (booking.total || 0), 0);
        setCompleted(completedBookings.length);
        setIncome(incomeTotal);
        setBooking(data.result);
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  }

  useEffect(() => {
    getbookingdata();
  }, []);

  // Function to return status color based on booking status
  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "green";
      case "Canceled":
        return "red";
      case "Confirmed":
        return "blue";
      default:
        return "black";
    }
  };

  return (
    <>
      <div className="breadcrumb-banner-area ptb-120 bg-opacity" style={{ backgroundImage: 'url("/assets/img/bg/6.jpg")' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb-text text-center">
                <h2>Dashboard</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="admin-dashboard">
        <div className="stats-cards">
          <div className="card">
            <FaClipboardList className="icon" />
            <div className="card-info">
              <h4>Total Sub-services</h4>
              <p>{'1'}</p>
            </div>
          </div>
          <div className="card">
            <FaTools className="icon" />
            <div className="card-info">
              <h4>Confirmed orders</h4>
              <p>{confirm}</p>
            </div>
          </div>
          <div className="card">
            <FaUsers className="icon" />
            <div className="card-info">
              <h4>Canceled orders</h4>
              <p>{cancel}</p>
            </div>
          </div>
          <div className="card">
            <FaShoppingCart className="icon" />
            <div className="card-info">
              <h4>Completed Orders</h4>
              <p>{completed}</p>
            </div>
          </div>
          <div className="card">
            <FaDollarSign className="icon" />
            <div className="card-info">
              <h4>Total Profit</h4>
              <p>${income}</p>
            </div>
          </div>
        </div>

        <div className="bookings-table">
          <h3>Bookings</h3>
          <table>
            <thead>
              <tr>
                <th>S.no</th>
                <th>Service</th>
                <th>Customer</th>
                <th>Payment</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {booking.length > 0 ? (
                booking.slice(0, 10).map((bookings, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{bookings.categoryInfo}</td>
                    <td>{bookings.userName}</td>
                    <td>{'Online'}</td>
                    <td>{bookings.date}</td>
                    <td style={{ color: getStatusColor(bookings.status) }}>{bookings.status}</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="6">No bookings available</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default PartnerDashboard;