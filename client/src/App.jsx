import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layouts
const PublicLayout = lazy(() => import("./layout/PublicLayout.jsx"));
const AdminLayout = lazy(() => import("./layout/AdminLayout.jsx"));
const NavbarLayout = lazy(() => import("./layout/NavbarLayout.jsx"));
const UserLayout = lazy(() => import("./layout/UserLayout.jsx"));
const PartnerLayout = lazy(() => import("./layout/PartnerLayout.jsx"));

// Public Pages
const PublicHome = lazy(() => import("./Pages/Public/Home.jsx"));
const ViewAllCategory = lazy(() => import("./Pages/Public/ViewAllCategory.jsx"));
const Particularsubcategory = lazy(() => import("./Pages/Public/ParticularSubcategory.jsx"));
const SubServiceDetails = lazy(() => import("./Pages/Public/SubServiceDetails.jsx"));
const CategoryDetails = lazy(() => import("./Pages/Public/Categorydetails.jsx"));
const AboutUs = lazy(() => import("./Pages/Public/AboutUs.jsx"));
const PartnerDetail = lazy(() => import("./Pages/Public/PartnerDetail.jsx"));
const ContactUs = lazy(() => import("./Pages/Public/ContactUs.jsx"));

// Admin Pages
const AdminRegistration = lazy(() => import("./Pages/Admin/AdminRegister.jsx"));
const AdminLogin = lazy(() => import("./Pages/Admin/AdminLogin.jsx"));
const AdminDashboard = lazy(() => import("./Pages/Admin/AdminDashboard.jsx"));
const AddCategory = lazy(() => import("./Pages/Admin/Category/AddCategory.jsx"));
const AddSubCategory = lazy(() => import("./Pages/Admin/Category/AddSubCategory.jsx"));
const ViewCategory = lazy(() => import("./Pages/Admin/Category/ViewCategory.jsx"));
const ViewSubCategory = lazy(() => import("./Pages/Admin/Category/ViewSubCategory.jsx"));
const EditCategory = lazy(() => import("./Pages/Admin/Category/CategoryUpdate.jsx"));
const EditSubcategory = lazy(() => import("./Pages/Admin/Category/SubcategoryUpdate.jsx"));
const BookingConfirmed = lazy(() => import("./Pages/Admin/Booking/BookingConfirmed.jsx"));
const BookingCompleted = lazy(() => import("./Pages/Admin/Booking/BookingCompleted.jsx"));
const BookingCanceled = lazy(() => import("./Pages/Admin/Booking/BookingCanceled.jsx"));
const BookingDetails = lazy(() => import("./Pages/Admin/Booking/BookingDetails.jsx"));
const AddState = lazy(() => import("./Pages/Admin/State/AddStates.jsx"));
const ViewState = lazy(() => import("./Pages/Admin/State/ViewStates.jsx"));
const AddCity = lazy(() => import("./Pages/Admin/City/AddCites.jsx"));
const ViewCity = lazy(() => import("./Pages/Admin/City/ViewCites.jsx"));
const ShowPartners = lazy(() => import("./Pages/Admin/PartnerInfo.jsx"));
const ShowUsers = lazy(() => import("./Pages/Admin/UserInfo.jsx"));
const AdminChangePassword = lazy(() => import("./Pages/Admin/AdminChangePassword.jsx"));
const AdminForgotPassword = lazy(() => import("./Pages/Admin/ForgotPassword/AdminForgotPassword.jsx"));
const AdminVerifyOTP = lazy(() => import("./Pages/Admin/ForgotPassword/AdminVerfiyOtp.jsx"));
const AdminResetPassword = lazy(() => import("./Pages/Admin/ForgotPassword/AdminResetPassword.jsx"));
const ViewAdmin = lazy(() => import("./Pages/Admin/ViewAdmin.jsx"));

// User Pages
const UserRegistration = lazy(() => import("./Pages/User/UserRegistration.jsx"));
const UserLogin = lazy(() => import("./Pages/User/UserLogin.jsx"));
const UserDashboard = lazy(() => import("./Pages/User/UserDashboard.jsx"));
const UserChangePassword = lazy(() => import("./Pages/User/UserChangePassword.jsx"));
const UserViewProfile = lazy(() => import("./Pages/User/UserViewProfile.jsx"));
const UserForgotPassword = lazy(() => import("./Pages/User/ForgotPassword/UserForgotPassword.jsx"));
const UserVerifyOTP = lazy(() => import("./Pages/User/ForgotPassword/UserVerfiyOtp.jsx"));
const UserResetPassword = lazy(() => import("./Pages/User/ForgotPassword/UserResetPassword.jsx"));
const MyOrders = lazy(() => import("./Pages/User/Myorders.jsx"));
const BookingPage = lazy(() => import("./Pages/User/Bookingpage.jsx"));
const MoreDetails = lazy(() => import("./Pages/User/MoreDetails.jsx"));
const ThankYou = lazy(() => import("./Pages/User/ThankYouPage.jsx"));

// Partner Pages
const PartnerRegistration = lazy(() => import("./Pages/Partner/PartnerRegister.jsx"));
const PartnerLogin = lazy(() => import("./Pages/Partner/PartnerLogin.jsx"));
const PartnerDashboard = lazy(() => import("./Pages/Partner/PartnerDashboard.jsx"));
const PartnerChangePassword = lazy(() => import("./Pages/Partner/PartnerChangePassword.jsx"));
const PartnerViewProfile = lazy(() => import("./Pages/Partner/PartnerViewProfile.jsx"));
const PartnerBookingCompleted = lazy(() => import("./Pages/Partner/Booking/PartnerBookingCompleted.jsx"));
const PartnerBookingDetails = lazy(() => import("./Pages/Partner/Booking/PartnerBookingDetails.jsx"));
const PartnerBookingConfirmed = lazy(() => import("./Pages/Partner/Booking/PartnerBookingConfirmed.jsx"));
const PartnerBookingCanceled = lazy(() => import("./Pages/Partner/Booking/PartnerBookingCanceled.jsx"));
const PartnerForgotPassword = lazy(() => import("./Pages/Partner/ForgotPassword/PartnerForgotPassword.jsx"));
const PartnerVerifyOTP = lazy(() => import("./Pages/Partner/ForgotPassword/PartnerVerfiyOtp.jsx"));
const PartnerResetPassword = lazy(() => import("./Pages/Partner/ForgotPassword/PartnerResetPassword.jsx"));

// Components
const PreLoader = lazy(() => import("./PreLoader.jsx"));
const UserCheckEmail = lazy(() => import("./Pages/User/UserCheckEmail.jsx"));

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Suspense fallback={<PreLoader />}>
      <BrowserRouter>
        <Routes>
          {/* Public Layout */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<PublicHome />}></Route>
            <Route path='all-category' element={<ViewAllCategory />}></Route>
            <Route path='particular-subcategory' element={<Particularsubcategory />}></Route>
            <Route path='particular-partner' element={<SubServiceDetails />}></Route>
            <Route path='category-details' element={<CategoryDetails />}></Route>
            <Route path='about-us' element={<AboutUs />}></Route>
            <Route path='partner-detail' element={<PartnerDetail />}></Route>
            <Route path='contact-us' element={<ContactUs />}></Route>
          </Route>

          {/* Admin Layout */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path='registration' element={<AdminRegistration />}></Route>
            <Route path='dashboard' element={<AdminDashboard />}></Route>
            <Route path='view' element={<ViewAdmin />}></Route>
            <Route path='add-category' element={<AddCategory />}></Route>
            <Route path='view-category' element={<ViewCategory />}></Route>
            <Route path='add-subcategory' element={<AddSubCategory />}></Route>
            <Route path='view-subcategory' element={<ViewSubCategory />}></Route>
            <Route path='show-all-partner' element={<ShowPartners />}></Route>
            <Route path='show-all-user' element={<ShowUsers />}></Route>
            <Route path='add-state' element={<AddState />}></Route>
            <Route path='view-state' element={<ViewState />}></Route>
            <Route path='add-city' element={<AddCity />}></Route>
            <Route path='view-city' element={<ViewCity />}></Route>
            <Route path='change-password' element={<AdminChangePassword />}></Route>
            <Route path='edit-category' element={<EditCategory />}></Route>
            <Route path='edit-subcategory' element={<EditSubcategory />}></Route>
            <Route path='confirm-booking' element={<BookingConfirmed />}></Route>
            <Route path='complete-booking' element={<BookingCompleted />}></Route>
            <Route path='cancele-booking' element={<BookingCanceled />}></Route>
            <Route path='more-details' element={<BookingDetails />}></Route>
          </Route>

          {/* User Layout */}
          <Route path="/user" element={<UserLayout />}>
            <Route path='dashboard' element={<UserDashboard />}></Route>
            <Route path='change-password' element={<UserChangePassword />}></Route>
            <Route path='view-profile' element={<UserViewProfile />}></Route>
            <Route path='add-details' element={<BookingPage />}></Route>
            <Route path='my-orders' element={<MyOrders />}></Route>
            <Route path='more-details' element={<MoreDetails />}></Route>
            <Route path='thank-you' element={<ThankYou />}></Route>
          </Route>

          {/* Partner Layout */}
          <Route path="/partner" element={<PartnerLayout />}>
            <Route path='dashboard' element={<PartnerDashboard />}></Route>
            <Route path='change-password' element={<PartnerChangePassword />}></Route>
            <Route path='view-profile' element={<PartnerViewProfile />}></Route>
            <Route path='complete-booking' element={<PartnerBookingCompleted />}></Route>
            <Route path='more-details' element={<PartnerBookingDetails />}></Route>
            <Route path='confirm-booking' element={<PartnerBookingConfirmed />}></Route>
            <Route path='cancele-booking' element={<PartnerBookingCanceled />}></Route>
          </Route>

          {/* Navbar Layout */}
          <Route path="" element={<NavbarLayout />}>
            <Route path='/email' element={<UserCheckEmail />}></Route>
            <Route path='/admin-login' element={<AdminLogin />}></Route>
            <Route path='/admin-forgot-password' element={<AdminForgotPassword />}></Route>
            <Route path='/admin-verify-otp' element={<AdminVerifyOTP />}></Route>
            <Route path='/admin-reset-password' element={<AdminResetPassword />}></Route>

            <Route path='/user-registration' element={<UserRegistration />}></Route>
            <Route path='/user-login' element={<UserLogin />}></Route>
            <Route path='/user-forgot-password' element={<UserForgotPassword />}></Route>
            <Route path='/user-verify-otp' element={<UserVerifyOTP />}></Route>
            <Route path='/user-reset-password' element={<UserResetPassword />}></Route>

            <Route path='/partner-registration' element={<PartnerRegistration />}></Route>
            <Route path='/partner-login' element={<PartnerLogin />}></Route>
            <Route path='/partner-forgot-password' element={<PartnerForgotPassword />}></Route>
            <Route path='/partner-verify-otp' element={<PartnerVerifyOTP />}></Route>
            <Route path='/partner-reset-password' element={<PartnerResetPassword />}></Route>
            <Route path='/preloader' element={<PreLoader />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;

