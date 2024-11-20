import { Outlet } from "react-router-dom";
import UserNavbar from "../components/UserNavbar";
import Footer from "../components/Footer";
import { utilityFunctions } from "../utils/module";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer } from 'react-toastify';

function UserLayout() {
  const [render, setRender] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (utilityFunctions.checkCookieExists('userAuthToken')) {
      setRender(true);
    } else {
      navigate('/user-login');
    }
  }, []);
  return (
    <>
      {render ? <>
        <UserNavbar />
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

export default UserLayout;