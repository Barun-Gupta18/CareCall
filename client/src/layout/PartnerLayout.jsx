import { Outlet } from "react-router-dom";
import PartnerNavbar from "../components/PartnerNavbar";
import Footer from "../components/Footer";
import { utilityFunctions } from "../utils/module";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer } from 'react-toastify';

function PartnerLayout() {
  const [render, setRender] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (utilityFunctions.checkCookieExists('partnerAuthToken')) {
      setRender(true);
    } else {
      navigate('/partner-login');
    }
  }, []);
  return (
    <>
      {render ? <>
        <PartnerNavbar />
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

export default PartnerLayout;