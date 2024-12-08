import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ToastContainer } from 'react-toastify';

function NavbarLayout() {
  return (
    <>
      <Navbar />
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
    </>
  );
}

export default NavbarLayout;