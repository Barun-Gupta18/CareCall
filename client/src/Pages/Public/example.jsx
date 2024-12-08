import React, { useState, useEffect } from 'react';
import { FaClipboardList, FaTools, FaUsers, FaShoppingCart, FaDollarSign } from 'react-icons/fa';
import './example.css';

const AdminDashboard = () => {
  const [data, setData] = useState({
    totalServices: 0,
    totalSubServices: 0,
    totalPartners: 0,
    totalOrders: 0,
    totalIncome: 0,
    bookings: []
  });

  useEffect(() => {
    // Fetch dashboard data from API (replace with your actual API endpoint)
    const fetchData = async () => {
      try {
        const response = await fetch('/api/admin/dashboard-data');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {/* <!-- breadcrumb-banner-area --> */}
      <div className="breadcrumb-banner-area ptb-120 bg-opacity" style={{ backgroundImage: 'url("assets/img/bg/6.jpg")' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb-text text-center">
                <h2>sub-service details</h2>
                {/* <ul className="breadcrumb-menu">
                         <li><a href="#">service</a></li>
                         <li><a href="#">about us</a></li>
                     </ul> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- breadcrumb-banner-area-end --> */}

      <div className="admin-dashboard">
        <div className="stats-cards">
          <div className="card">
            <FaClipboardList className="icon" />
            <div className="card-info">
              <h4>Total Services</h4>
              <p>{data.totalServices}</p>
            </div>
          </div>
          <div className="card">
            <FaTools className="icon" />
            <div className="card-info">
              <h4>Total Sub-Services</h4>
              <p>{data.totalSubServices}</p>
            </div>
          </div>
          <div className="card">
            <FaUsers className="icon" />
            <div className="card-info">
              <h4>Total Partners</h4>
              <p>{data.totalPartners}</p>
            </div>
          </div>
          <div className="card">
            <FaShoppingCart className="icon" />
            <div className="card-info">
              <h4>Total Orders</h4>
              <p>{data.totalOrders}</p>
            </div>
          </div>
          <div className="card">
            <FaDollarSign className="icon" />
            <div className="card-info">
              <h4>Total Income</h4>
              <p>${data.totalIncome}</p>
            </div>
          </div>
        </div>

        <div className="bookings-table">
          <h3>Bookings</h3>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Service</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.bookings.length > 0 ? data.bookings.map((booking, index) => (
                <tr key={index}>
                  <td>{booking.id}</td>
                  <td>{booking.service}</td>
                  <td>{booking.customer}</td>
                  <td>{booking.date}</td>
                  <td>{booking.time}</td>
                  <td>{booking.status}</td>
                </tr>
              )) : (
                <tr><td colSpan="6">No bookings available</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>


    </>
  );
};

export default AdminDashboard;
