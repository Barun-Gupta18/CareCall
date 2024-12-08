import { Outlet } from "react-router-dom";
import PublicNavbar from "../components/PublicNavbar";
import Footer from "../components/Footer";
import { ToastContainer } from 'react-toastify';
import { useState, useEffect } from "react";
import { utilityFunctions } from "../utils/module";
import UserNavbar from "../components/UserNavbar";

function PublicLayout() {
  const [token, setToken] = useState(utilityFunctions.checkCookieExists('userAuthToken'));

  useEffect(() => {
    const handleTokenChange = () => {
      setToken(utilityFunctions.checkCookieExists('userAuthToken'));
    };

    window.addEventListener('storage', handleTokenChange);

    return () => {
      window.removeEventListener('storage', handleTokenChange);
    };
  }, []);

  return (
    <>
      {token ? (
        <>
          <UserNavbar />
          <Outlet />
          <Footer />
        </>
      ) : (
        <>
          <PublicNavbar />
          <Outlet />
          <Footer />
        </>
      )}

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default PublicLayout;
