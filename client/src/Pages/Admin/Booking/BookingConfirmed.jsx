import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { utilityFunctions } from "../../../utils/module";
import { Server_URL } from "../../../utils/config";
import { showErrorToast } from "../../../utils/Toasthelper";

function Bookingconfirmed() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
  } = useForm();

  const navigate = useNavigate();
  const [booking, setBooking] = useState([]);

  async function getbookingdata() {
    try {
      const token = utilityFunctions.getCookieValue("adminAuthToken");
      const url = `${Server_URL}admin-booking-data`;
      const { data } = await axios.get(url, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      if (data.error) {
        if (data.message === "SignIn") navigate("/admin-login");
        else showErrorToast(data.message);
      } else {
        // Filter results to include only bookings with status "confirmed"
        const confirmedBookings = data.result.filter(
          (booking) => booking.status === "Confirmed"
        );
        setBooking(confirmedBookings);
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  }

  useEffect(() => {
    getbookingdata();
  }, []);

  async function goMoreDetails(value) {
    navigate("/admin/more-details", { state: { value } });
  }

  const styles = {
    container: {
      padding: "40px",
      backgroundColor: "#f9f9f9",
      fontFamily: '"Roboto", sans-serif',
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      overflowX: "auto",
      whiteSpace: "nowrap",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      backgroundColor: "#ffffff",
      color: "#333",
      textAlign: "left",
    },
    tableHead: {
      backgroundColor: "#193e40",
      color: "#ffffff",
    },
    tableHeader: {
      padding: "12px 15px",
      fontWeight: "600",
    },
    tableRow: {
      borderBottom: "1px solid #ddd",
    },
    tableData: {
      padding: "10px 15px",
    },
    actionButton: {
      backgroundColor: "#17a2b8",
      color: "#ffffff",
      padding: "8px 12px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontWeight: "600",
      transition: "background-color 0.3s",
    },
    actionButtonHover: {
      backgroundColor: "#138496",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={{ color: "#333", marginBottom: "20px", fontWeight: "700" }}>Confirmed Bookings</h2>
      <table style={styles.table}>
        <thead style={styles.tableHead}>
          <tr>
            <th style={styles.tableHeader}>Category</th>
            <th style={styles.tableHeader}>Sub-category</th>
            <th style={styles.tableHeader}>Total</th>
            <th style={styles.tableHeader}>Date</th>
            <th style={styles.tableHeader}>Partner Name</th>
            <th style={styles.tableHeader}>Partner Email</th>
            <th style={styles.tableHeader}>User Name</th>
            <th style={styles.tableHeader}>User Email</th>
            <th style={styles.tableHeader}>Action</th>
          </tr>
        </thead>
        <tbody>
          {booking.map((value, index) => (
            <tr key={index} style={styles.tableRow}>
              <td style={styles.tableData}>{value.categoryInfo}</td>
              <td style={styles.tableData}>{value.subcategoryInfo}</td>
              <td style={styles.tableData}>{value.total}</td>
              <td style={styles.tableData}>{value.date}</td>
              <td style={styles.tableData}>{value.partnerName}</td>
              <td style={styles.tableData}>{value.partnerEmail}</td>
              <td style={styles.tableData}>{value.userName}</td>
              <td style={styles.tableData}>{value.userEmail}</td>
              <td style={styles.tableData}>
                <button
                  style={styles.actionButton}
                  onMouseOver={(e) => e.target.style.backgroundColor = styles.actionButtonHover.backgroundColor}
                  onMouseOut={(e) => e.target.style.backgroundColor = styles.actionButton.backgroundColor}
                  onClick={() => goMoreDetails(value)}
                >
                  More Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Bookingconfirmed;
