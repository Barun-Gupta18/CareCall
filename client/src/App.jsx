import axios from 'axios';
import { useState, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

const PublicLayout = lazy(() => import("./layout/PublicLayout"));
const AdminLayout = lazy(() => import("./layout/AdminLayout"));
const NavbarLayout = lazy(() => import("./layout/NavbarLayout"));
const UserLayout = lazy(() => import("./layout/UserLayout"));
const PartnerLayout = lazy(() => import("./layout/PartnerLayout"));

const PublicHome = lazy(() => import("./pages/public/Home"));

const AdminRegistration = lazy(() => import("./pages/Admin/AdminRegister"));
const UserRegistration = lazy(() => import("./pages/User/UserRegistration"));
const PartnerRegistration = lazy(() => import("./pages/partner/PartnerRegister"));

const AdminLogin = lazy(() => import("./pages/Admin/AdminLogin"));
const UserLogin = lazy(() => import("./pages/User/UserLogin"));
const PartnerLogin = lazy(() => import("./pages/partner/PartnerLogin"));

const AdminDashboard = lazy(() => import("./pages/Admin/AdminDashboard"));
const UserDashboard = lazy(() => import("./pages/User/UserDashboard"));
const PartnerDashboard = lazy(() => import("./pages/partner/PartnerDashboard"));

const AddCategory = lazy(() => import("./pages/Admin/category/AddCategory"));
const AddSubCategory = lazy(() => import("./pages/Admin/category/AddSubCategory"));

const ViewAdmin = lazy(() => import("./pages/Admin/ViewAdmin"));
const ViewCategory = lazy(() => import("./pages/Admin/category/ViewCategory"));
const ViewSubCategory = lazy(() => import("./pages/Admin/category/ViewSubCategory"));

const ShowPartners = lazy(() => import("./pages/Admin/PartnerInfo"));
const ShowUsers = lazy(() => import("./pages/Admin/UserInfo"));

const PartnerChangePassword = lazy(() => import("./pages/partner/PartnerChangePassword"));
const PartnerViewProfile = lazy(() => import("./pages/partner/PartnerViewProfile"));

const AdminResetPassword = lazy(() => import("./pages/Admin/ForgotPassword/AdminResetPassword"));
const AdminVerifyOTP = lazy(() => import("./pages/Admin/ForgotPassword/AdminVerfiyOtp"));
const AdminForgetPassword = lazy(() => import("./pages/Admin/ForgotPassword/AdminForgotPassword"));

const PartnerResetPassword = lazy(() => import("./pages/partner/ForgotPassword/PartnerResetPassword"));
const PartnerVerifyOTP = lazy(() => import("./pages/partner/ForgotPassword/PartnerVerfiyOtp"));
const PartnerForgetPassword = lazy(() => import("./pages/partner/ForgotPassword/PartnerForgotPassword"));

const UserResetPassword = lazy(() => import("./pages/User/ForgotPassword/UserResetPassword"));
const UserVerifyOTP = lazy(() => import("./pages/User/ForgotPassword/UserVerfiyOtp"));
const UserForgetPassword = lazy(() => import("./pages/User/ForgotPassword/UserForgotPassword"));

const AddState = lazy(() => import("./pages/Admin/state/AddStates"));
const ViewState = lazy(() => import("./pages/Admin/state/ViewStates"));

const AddCity = lazy(() => import("./pages/Admin/city/AddCites"));
const ViewCity = lazy(() => import("./pages/Admin/city/ViewCites"));

const UserChangePassword = lazy(() => import("./pages/User/UserChangePassword"));
const UserViewProfile = lazy(() => import("./pages/User/UserViewProfile"));

const AdminChangePassword = lazy(() => import("./pages/Admin/AdminChangePassword"));

const EditCategory = lazy(() => import("./pages/Admin/category/CategoryUpdate"));
const EditSubcategory = lazy(() => import("./pages/Admin/category/SubcategoryUpdate"));

const Particularsubcategory = lazy(() => import("./pages/public/ParticularSubcategory"));

const ViewAllCategory = lazy(() => import("./pages/public/ViewAllCategory"));

const SubServiceDetails = lazy(() => import("./pages/public/SubServiceDetails"));

const Example = lazy(() => import("./pages/public/example"));

const CategoryDetails = lazy(() => import("./pages/public/Categorydetails"));

const AboutUs = lazy(() => import("./pages/public/AboutUs"));

const PartnerDetail = lazy(() => import("./pages/public/PartnerDetail"));

const ContactUs = lazy(() => import("./pages/public/ContactUs"));

const BookNow = lazy(() => import("./pages/User/BookNow"));

const UserHome = lazy(() => import("./pages/User/UserHome"));

const UserCategorydetails = lazy(() => import("./pages/User/UserCategoryDetail"));

const UserParticularSubCategory = lazy(() => import("./pages/User/UserParticularSubCategory"));

const UserSubcategoryDetails = lazy(() => import("./pages/User/UserSubCategoryDetails"));

const UserPartnerDetails = lazy(() => import("./pages/User/UserPartnerDetails"));

const BookingPage = lazy(() => import("./pages/User/Bookingpage"));

const BookingConfirmed = lazy(() => import("./pages/Admin/Booking/BookingConfirmed"));

const BookingCompleted = lazy(() => import("./pages/Admin/Booking/BookingCompleted"));

const BookingCanceled = lazy(() => import("./pages/Admin/Booking/BookingCanceled"));

const BookingDetails = lazy(() => import("./pages/Admin/Booking/BookingDetails"));

const PartnerBookingCompleted = lazy(() => import("./pages/partner/Booking/PartnerBookingCompleted"));

const PartnerBookingDetails = lazy(() => import("./pages/partner/Booking/PartnerBookingDetails"));

const PartnerBookingConfirmed = lazy(() => import("./pages/partner/Booking/PartnerBookingConfirmed"));

const PartnerBookingCanceled = lazy(() => import("./pages/partner/Booking/PartnerBookingCanceled"));

const MyOrders = lazy(() => import("./pages/User/Myorders"));

const MoreDetails = lazy(() => import("./pages/User/MoreDetails"));

const ThankYou = lazy(() => import("./pages/User/ThankYouPage"));

const PreLoader = lazy(() => import("./PreLoader"));

const UserCheckEmail = lazy(() => import("./pages/User/UserCheckEmail"));



import 'react-toastify/dist/ReactToastify.css';

function App() {

  axios.defaults.withCredentials = true;
  return (
    <>
      <Suspense fallback={<PreLoader />}>
        <BrowserRouter>
          <Routes>

            <Route path="/" element={<PublicLayout />}>
              <Route index element={<PublicHome />}></Route>
              <Route path='all-category' element={<ViewAllCategory />}></Route>
              <Route path='particular-subcategory' element={<Particularsubcategory />}></Route>
              <Route path='particular-partner' element={<SubServiceDetails />}></Route>
              <Route path='example' element={< Example />}></Route>
              <Route path='category-details' element={<CategoryDetails />}></Route>
              <Route path='about-us' element={<AboutUs />}></Route>
              <Route path='partner-detail' element={<PartnerDetail />}></Route>
              <Route path='contact-us' element={<ContactUs />}></Route>
            </Route>

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

            <Route path='/user' element={<UserLayout />}>
              <Route path='dashboard' element={<UserDashboard />}></Route>
              <Route path='change-password' element={<UserChangePassword />}></Route>
              <Route path='view-profile' element={<UserViewProfile />}></Route>
              <Route path='book-partner' element={<BookNow />}></Route>
              <Route path='home' element={<UserHome />}></Route>
              <Route path='single-category' element={<UserCategorydetails />}></Route>
              <Route path='sub-category' element={<UserParticularSubCategory />}></Route>
              <Route path='sub-category-details' element={<UserSubcategoryDetails />}></Route>
              <Route path='partner-details' element={<UserPartnerDetails />}></Route>
              <Route path='add-details' element={<BookingPage />}></Route>
              <Route path='my-orders' element={<MyOrders />}></Route>
              <Route path='more-details' element={<MoreDetails />}></Route>
              <Route path='thank-you' element={<ThankYou />}></Route>
            </Route>

            <Route path='/partner' element={<PartnerLayout />}>
              <Route path='dashboard' element={<PartnerDashboard />}></Route>
              <Route path='change-password' element={<PartnerChangePassword />}></Route>
              <Route path='view-profile' element={<PartnerViewProfile />}></Route>
              <Route path='complete-booking' element={<PartnerBookingCompleted />}></Route>
              <Route path='more-details' element={<PartnerBookingDetails />}></Route>
              <Route path='confirm-booking' element={<PartnerBookingConfirmed />}></Route>
              <Route path='cancele-booking' element={<PartnerBookingCanceled />}></Route>
            </Route>

            <Route path='' element={<NavbarLayout />}>
              <Route path='/email' element={<UserCheckEmail />}></Route>
              <Route path='/admin-login' element={<AdminLogin />}></Route>
              <Route path='/admin-forgot-password' element={<AdminForgetPassword />}></Route>
              <Route path='/admin-verify-otp' element={<AdminVerifyOTP />}></Route>
              <Route path='/admin-reset-password' element={<AdminResetPassword />}></Route>

              <Route path='/user-registration' element={<UserRegistration />}></Route>
              <Route path='/user-login' element={<UserLogin />}></Route>
              <Route path='/user-forgot-password' element={<UserForgetPassword />}></Route>
              <Route path='/user-verify-otp' element={<UserVerifyOTP />}></Route>
              <Route path='/user-reset-password' element={<UserResetPassword />}></Route>

              <Route path='/partner-registration' element={<PartnerRegistration />}></Route>
              <Route path='/partner-login' element={<PartnerLogin />}></Route>
              <Route path='/partner-forgot-password' element={<PartnerForgetPassword />}></Route>
              <Route path='/partner-verify-otp' element={<PartnerVerifyOTP />}></Route>
              <Route path='/partner-reset-password' element={<PartnerResetPassword />}></Route>
              <Route path='/preloader' element={<PreLoader />}></Route>
            </Route>

          </Routes>
        </BrowserRouter >
      </Suspense >
    </>
  )
}

export default App
