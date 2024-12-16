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

  const styles = {
    dashboard: {
      paddingTop: '120px',
      paddingBottom: '120px',
      backgroundImage: 'url("/assets/img/bg/6.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      textAlign: 'center',
    },
    statsCards: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '20px',
      marginBottom: '40px',
    },
    card: {
      backgroundColor: '#1d3557',
      color: '#fff',
      padding: '20px',
      borderRadius: '12px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      display: 'flex',
      alignItems: 'center',
      transition: 'transform 0.3s, box-shadow 0.3s',
    },
    cardHover: {
      transform: 'translateY(-5px)',
      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
    },
    icon: {
      fontSize: '2.5rem',
      marginRight: '15px',
      color: '#f1faee',
    },
    cardInfo: {
      color: '#f1faee',
    },
    bookingsTable: {
      width: '100%',
      borderCollapse: 'collapse',
    },
    tableCell: {
      textAlign: 'left',
      padding: '10px',
      border: '1px solid #ddd',
    },
    tableHeader: {
      background: '#f4f4f4',
    },
    tableRowEven: {
      background: '#f9f9f9',
    },
  };

  return (
    <>
      <div style={styles.dashboard}>
        <h2>Dashboard</h2>
      </div>

      <div style={{ padding: '20px' }}>
        <div style={styles.statsCards}>
          {[{
            icon: <FaClipboardList style={styles.icon} />,
            title: 'Total Services',
            value: category,
          }, {
            icon: <FaTools style={styles.icon} />,
            title: 'Total Sub-Services',
            value: subcategory,
          }, {
            icon: <FaUsers style={styles.icon} />,
            title: 'Total Partners',
            value: partner,
          }, {
            icon: <FaShoppingCart style={styles.icon} />,
            title: 'Total Orders',
            value: order,
          }, {
            icon: <FaDollarSign style={styles.icon} />,
            title: 'Total Income',
            value: `$${income}`,
          }].map((card, index) => (
            <div
              key={index}
              style={{ ...styles.card }}
              onMouseEnter={(e) => e.currentTarget.style = { ...styles.card, ...styles.cardHover }}
              onMouseLeave={(e) => e.currentTarget.style = styles.card}
            >
              {card.icon}
              <div>
                <h4 style={{ marginBottom: '8px', fontSize: '1.2rem', fontWeight: '500' }}>{card.title}</h4>
                <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '0' }}>{card.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div>
          <h3>Bookings</h3>
          <table style={styles.bookingsTable}>
            <thead>
              <tr>
                <th style={styles.tableCell}>S.no</th>
                <th style={styles.tableCell}>Service</th>
                <th style={styles.tableCell}>Customer</th>
                <th style={styles.tableCell}>Partner</th>
                <th style={styles.tableCell}>Date</th>
                <th style={styles.tableCell}>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length > 0 ? (
                bookings.slice(0, 10).map((booking, index) => (
                  <tr key={index} style={index % 2 === 0 ? styles.tableRowEven : {}}>
                    <td style={styles.tableCell}>{index + 1}</td>
                    <td style={styles.tableCell}>{booking.categoryInfo}</td>
                    <td style={styles.tableCell}>{booking.userName}</td>
                    <td style={styles.tableCell}>{booking.partnerName}</td>
                    <td style={styles.tableCell}>{booking.date}</td>
                    <td style={{ ...styles.tableCell, color: getStatusColor(booking.status) }}>{booking.status}</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="6" style={styles.tableCell}>No bookings available</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
