import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import Footer from "../components/Footer";
import { utilityFunctions } from "../utils/module";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer } from 'react-toastify';

function AdminLayout() {
  const [render, setRender] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (utilityFunctions.checkCookieExists('adminAuthToken')) {
      setRender(true);
    } else {
      navigate('/admin-login');
    }
  }, []);
  return (
    <>
      {render ? <>
        <AdminNavbar />
        <Outlet />
        <Footer />

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition:Bounce />
        {/* Same as */}
        <ToastContainer />
      </> : null}
    </>
  );
}

export default AdminLayout;