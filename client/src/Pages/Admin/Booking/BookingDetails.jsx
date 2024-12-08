import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";



function BookingDetails() {
  const { register, handleSubmit, formState: { errors }, reset, setFocus } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const bookingData = location.state?.value;

  if (!bookingData) return <div>No booking data available</div>;

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        {/* Partner Details Section */}
        <h3 style={styles.sectionTitle}>Partner Details</h3>
        <table style={styles.table}>
          <tbody>
            <tr>
              <th style={styles.label}>Name :</th>
              <td style={styles.data}>{bookingData.partnerName}</td>
            </tr>
            <tr>
              <th style={styles.label}>Email :</th>
              <td style={styles.data}>{bookingData.partnerEmail}</td>
            </tr>
            <tr>
              <th style={styles.label}>Mobile :</th>
              <td style={styles.data}>{bookingData.partnerMobile}</td>
            </tr>
          </tbody>
        </table>

        {/* Customer Details Section */}
        <h3 style={styles.sectionTitle}>Customer Details</h3>
        <table style={styles.table}>
          <tbody>
            <tr>
              <th style={styles.label}>Name :</th>
              <td style={styles.data}>{bookingData.userName}</td>
            </tr>
            <tr>
              <th style={styles.label}>Email :</th>
              <td style={styles.data}>{bookingData.userEmail}</td>
            </tr>
            <tr>
              <th style={styles.label}>Mobile :</th>
              <td style={styles.data}>{bookingData.userMobile}</td>
            </tr>
            <tr>
              <th style={styles.label}>State :</th>
              <td style={styles.data}>{bookingData.state}</td>
            </tr>
            <tr>
              <th style={styles.label}>City :</th>
              <td style={styles.data}>{bookingData.city}</td>
            </tr>
          </tbody>
        </table>

        {/* Status Section */}
        <h3 style={styles.sectionTitle}>Service Status</h3>
        <table style={styles.table}>
          <tbody>
            <tr>
              <th style={styles.label}>Status :</th>
              <td style={styles.data}>{bookingData.status}</td>
            </tr>
          </tbody>
        </table>

        {/* Time Slots Section */}
        <h3 style={styles.sectionTitle}>Time Slots</h3>
        {bookingData.bookingdetailsInfo && bookingData.bookingdetailsInfo.length > 0 ? (
          <div style={styles.slotContainer}>
            <table style={styles.timeSlotTable}>
              <thead>
                <tr>
                  <th style={styles.timeSlotHeader}>Start Time</th>
                  <th style={styles.timeSlotHeader}>End Time</th>
                </tr>
              </thead>
              <tbody>
                {bookingData.bookingdetailsInfo.map((slot, i) => (
                  <tr key={i}>
                    <td style={styles.timeSlotData}>{slot.start_time}</td>
                    <td style={styles.timeSlotData}>{slot.end_time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p style={styles.noData}>No time slots available</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    padding: '40px',
    backgroundColor: '#f9f9f9',
    fontFamily: '"Roboto", sans-serif',
  },
  content: {
    width: '100%',
    maxWidth: '700px',
    padding: '30px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  sectionTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#333',
    marginBottom: '15px',
    borderBottom: '2px solid #193e40',
    paddingBottom: '8px',
  },
  table: {
    width: '100%',
    marginBottom: '20px',
    borderCollapse: 'collapse',
  },
  label: {
    textAlign: 'right',
    fontWeight: '600',
    color: '#555',
    padding: '10px 15px',
    backgroundColor: '#f1f1f1',
    borderBottom: '1px solid #ddd',
    width: '40%',
  },
  data: {
    textAlign: 'left',
    padding: '10px 15px',
    color: '#333',
    borderBottom: '1px solid #ddd',
    width: '60%',
  },
  slotContainer: {
    marginBottom: '20px',
  },
  timeSlotTable: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  timeSlotHeader: {
    fontWeight: '600',
    textAlign: 'center',
    padding: '10px',
    color: '#ffffff',
    backgroundColor: '#193e40',
  },
  timeSlotData: {
    textAlign: 'center',
    padding: '10px',
    color: '#333',
    backgroundColor: '#f9f9f9',
    borderBottom: '1px solid #ddd',
  },
  noData: {
    color: '#777',
    textAlign: 'center',
    padding: '20px',
    fontSize: '1rem',
  },
  completeButton: {
    backgroundColor: '#28a745',
    color: '#fff',
    padding: '10px 20px',
    marginRight: '10px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: '#dc3545',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: '600',
  },
};

export default BookingDetails;
