import { useEffect, useState } from 'react';
import axios from "axios";
import { FaClipboardList, FaTools, FaUsers, FaShoppingCart, FaDollarSign } from 'react-icons/fa';
import { showErrorToast } from "../../utils/Toasthelper";
import { utilityFunctions } from "../../utils/module";
import { Server_URL } from "../../utils/config";
// import '../css/AdminDashboard.css';

function AdminDashboard() {
  const [category, setCategory] = useState(0);
  const [subcategory, setSubcategory] = useState(0);
  const [partner, setPartner] = useState(0);
  const [order, setOrder] = useState(0);
  const [bookings, setBookings] = useState([]);
  const [income, setIncome] = useState(0);

  async function getCategory() {
    try {
      const response = await axios.get(`${Server_URL}view-category-partner`);
      if (response.data.error) showErrorToast(response.data.message);
      else setCategory(response.data.result.length);
    } catch (error) {
      showErrorToast(error.message);
    }
  }

  async function getSubcategory() {
    try {
      const token = utilityFunctions.getCookieValue('adminAuthToken');
      const response = await axios.get(`${Server_URL}manage-subcategory`, {
        headers: { Authorization: token ? `Bearer ${token}` : "" }
      });
      if (response.data.error) showErrorToast(response.data.message);
      else setSubcategory(response.data.result.length);
    } catch (error) {
      showErrorToast(error.message);
    }
  }

  async function getPartnerData() {
    try {
      const token = utilityFunctions.getCookieValue('adminAuthToken');
      const response = await axios.get(`${Server_URL}show-all-partner`, {
        headers: { Authorization: token ? `Bearer ${token}` : "" }
      });
      if (response.data.error) showErrorToast(response.data.message);
      else setPartner(response.data.result.length);
    } catch (error) {
      showErrorToast(error.message);
    }
  }

  async function getbookingdata() {
    try {
      const token = utilityFunctions.getCookieValue("adminAuthToken");
      const response = await axios.get(`${Server_URL}admin-booking-data`, {
        headers: { Authorization: token ? `Bearer ${token}` : "" }
      });
      if (response.data.error) showErrorToast(response.data.message);
      else {
        setOrder(response.data.result.length);
        setBookings(response.data.result);
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  }

  async function getbookingtotal() {
    try {
      const token = utilityFunctions.getCookieValue("adminAuthToken");
      const response = await axios.get(`${Server_URL}admin-booking-data`, {
        headers: { Authorization: token ? `Bearer ${token}` : "" }
      });
      if (response.data.error) showErrorToast(response.data.message);
      else {
        const confirmedBookings = response.data.result.filter(
          booking => booking.status === "Completed"
        );
        const incomeTotal = confirmedBookings.reduce((acc, booking) => acc + (booking.total || 0), 0);
        setIncome(incomeTotal);
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  }

  useEffect(() => {
    getCategory();
    getSubcategory();
    getPartnerData();
    getbookingdata();
    getbookingtotal();
  }, []);

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
              <h4>Total Services</h4>
              <p>{category}</p>
            </div>
          </div>
          <div className="card">
            <FaTools className="icon" />
            <div className="card-info">
              <h4>Total Sub-Services</h4>
              <p>{subcategory}</p>
            </div>
          </div>
          <div className="card">
            <FaUsers className="icon" />
            <div className="card-info">
              <h4>Total Partners</h4>
              <p>{partner}</p>
            </div>
          </div>
          <div className="card">
            <FaShoppingCart className="icon" />
            <div className="card-info">
              <h4>Total Orders</h4>
              <p>{order}</p>
            </div>
          </div>
          <div className="card">
            <FaDollarSign className="icon" />
            <div className="card-info">
              <h4>Total Income</h4>
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
                <th>Partner</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length > 0 ? (
                bookings.slice(0, 10).map((booking, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{booking.categoryInfo}</td>
                    <td>{booking.userName}</td>
                    <td>{booking.partnerName}</td>
                    <td>{booking.date}</td>
                    <td style={{ color: getStatusColor(booking.status) }}>{booking.status}</td>
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

export default AdminDashboard;
