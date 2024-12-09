import { useEffect, useState } from 'react';
import axios from "axios";
import { FaClipboardList, FaTools, FaUsers, FaShoppingCart, FaDollarSign } from 'react-icons/fa';
import { showErrorToast } from "../../utils/Toasthelper";
import { utilityFunctions } from "../../utils/module";
import { Server_URL } from "../../utils/config";

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
      <div style={{
        paddingTop: '120px',
        paddingBottom: '120px',
        backgroundImage: 'url("/assets/img/bg/6.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        textAlign: 'center',
      }}>
        <h2>Dashboard</h2>
      </div>

      <div style={{ padding: '20px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '40px',
        }}>
          <div style={{
            backgroundColor: '#1d3557',
            color: '#fff',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            display: 'flex',
            alignItems: 'center',
            transition: 'transform 0.3s, box-shadow 0.3s',
          }}>
            <FaClipboardList style={{ fontSize: '2.5rem', marginRight: '15px', color: '#f1faee' }} />
            <div>
              <h4 style={{ marginBottom: '8px', color: '#f1faee', fontSize: '1.2rem', fontWeight: '500' }}>Total Services</h4>
              <p style={{ fontSize: '1.5rem', color: '#f1faee', fontWeight: 'bold', margin: '0' }}>{category}</p>
            </div>
          </div>
          <div style={{
            backgroundColor: '#1d3557',
            color: '#fff',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            display: 'flex',
            alignItems: 'center',
            transition: 'transform 0.3s, box-shadow 0.3s',
          }}>
            <FaTools style={{ fontSize: '2.5rem', marginRight: '15px', color: '#f1faee' }} />
            <div>
              <h4 style={{ marginBottom: '8px', color: '#f1faee', fontSize: '1.2rem', fontWeight: '500' }}>Total Sub-Services</h4>
              <p style={{ fontSize: '1.5rem', color: '#f1faee', fontWeight: 'bold', margin: '0' }}>{subcategory}</p>
            </div>
          </div>
          <div style={{
            backgroundColor: '#1d3557',
            color: '#fff',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            display: 'flex',
            alignItems: 'center',
            transition: 'transform 0.3s, box-shadow 0.3s',
          }}>
            <FaUsers style={{ fontSize: '2.5rem', marginRight: '15px', color: '#f1faee' }} />
            <div>
              <h4 style={{ marginBottom: '8px', color: '#f1faee', fontSize: '1.2rem', fontWeight: '500' }}>Total Partners</h4>
              <p style={{ fontSize: '1.5rem', color: '#f1faee', fontWeight: 'bold', margin: '0' }}>{partner}</p>
            </div>
          </div>
          <div style={{
            backgroundColor: '#1d3557',
            color: '#fff',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            display: 'flex',
            alignItems: 'center',
            transition: 'transform 0.3s, box-shadow 0.3s',
          }}>
            <FaShoppingCart style={{ fontSize: '2.5rem', marginRight: '15px', color: '#f1faee' }} />
            <div>
              <h4 style={{ marginBottom: '8px', color: '#f1faee', fontSize: '1.2rem', fontWeight: '500' }}>Total Orders</h4>
              <p style={{ fontSize: '1.5rem', color: '#f1faee', fontWeight: 'bold', margin: '0' }}>{order}</p>
            </div>
          </div>
          <div style={{
            backgroundColor: '#1d3557',
            color: '#fff',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            display: 'flex',
            alignItems: 'center',
            transition: 'transform 0.3s, box-shadow 0.3s',
          }}>
            <FaDollarSign style={{ fontSize: '2.5rem', marginRight: '15px', color: '#f1faee' }} />
            <div>
              <h4 style={{ marginBottom: '8px', color: '#f1faee', fontSize: '1.2rem', fontWeight: '500' }}>Total Income</h4>
              <p style={{ fontSize: '1.5rem', color: '#f1faee', fontWeight: 'bold', margin: '0' }}>${income}</p>
            </div>
          </div>
        </div>

        <div>
          <h3>Bookings</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '10px', border: '1px solid #ddd' }}>S.no</th>
                <th style={{ textAlign: 'left', padding: '10px', border: '1px solid #ddd' }}>Service</th>
                <th style={{ textAlign: 'left', padding: '10px', border: '1px solid #ddd' }}>Customer</th>
                <th style={{ textAlign: 'left', padding: '10px', border: '1px solid #ddd' }}>Partner</th>
                <th style={{ textAlign: 'left', padding: '10px', border: '1px solid #ddd' }}>Date</th>
                <th style={{ textAlign: 'left', padding: '10px', border: '1px solid #ddd' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length > 0 ? (
                bookings.slice(0, 10).map((booking, index) => (
                  <tr key={index}>
                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{index + 1}</td>
                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{booking.categoryInfo}</td>
                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{booking.userName}</td>
                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{booking.partnerName}</td>
                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{booking.date}</td>
                    <td style={{ padding: '10px', border: '1px solid #ddd', color: getStatusColor(booking.status) }}>{booking.status}</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="6" style={{ padding: '10px', border: '1px solid #ddd' }}>No bookings available</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
