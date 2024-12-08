const express = require('express'); // Import Express
const app = express(); // Initialize the Express app
const cors = require('cors'); // Import mysql2 package
const adminController = require('./controllers/adminController');
const userController = require('./controllers/userController');
const partnerController = require('./controllers/partnerController');
const { userAuthMiddleware, adminAuthMiddleware, partnerAuthMiddleware } = require('./middlewares/authMiddleware');
const fileUpload = require('express-fileupload');
require('dotenv').config();

const corsOptions = {
  origin: 'https://care-call-frontend.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};


app.use(cors(corsOptions));
// app.use(cors());
app.use(fileUpload({ useTempFiles: true, tempFileDir: '/tmp/' }));
app.use(express.json());
app.use(express.static("public"));

// Admin Routes 

app.post('/manage-admin', adminController.AdminRegistration);

app.post('/admin-login', adminController.AdminLogin);

app.get('/manage-admin', adminAuthMiddleware, adminController.ViewAdmin);

app.put('/manage-admin', adminAuthMiddleware, adminController.EditInfoAdmin);

app.delete('/manage-admin/:_id', adminAuthMiddleware, adminController.DeleteAdmin);

app.post('/manage-category', adminAuthMiddleware, adminController.AddCategory);

app.get('/manage-category', adminAuthMiddleware, adminController.ViewCategory);

app.get('/view-category-partner', adminController.ViewCategoryPartner);

app.delete('/manage-category/:id', adminAuthMiddleware, adminController.DeleteCategory);

app.post('/manage-subcategory', adminAuthMiddleware, adminController.AddSubCategory);

app.get('/manage-subcategory', adminAuthMiddleware, adminController.ViewSubCategory);

app.delete('/manage-subcategory/:_id', adminAuthMiddleware, adminController.DeleteSubCategory);

app.get('/manage-subcategory/:id', adminController.ReadSubCat);

app.get('/show-all-partner', adminAuthMiddleware, adminController.ShowAllPartner);

app.get('/show-all-partner-public', adminController.ShowAllPartnerPublic);

app.delete('/admin-manage-partner/:_id', adminAuthMiddleware, adminController.AdminDeletePartner);

app.put('/admin-status-update/:_id', adminAuthMiddleware, adminController.AdminStatusUpdate);

app.get('/show-all-user', adminAuthMiddleware, adminController.ShowAllUser);

app.delete('/admin-manage-user/:_id', adminAuthMiddleware, adminController.AdminDeleteUser);

app.post('/admin-forgot-password', adminController.AdminForgotPassword);

app.post('/admin-verify-otp', adminController.AdminVerfiyOtp);

app.post('/admin-reset-password', adminController.AdminResetPassword);

app.post('/manage-add-state', adminAuthMiddleware, adminController.AdminState);

app.get('/view-state', adminAuthMiddleware, adminController.ViewState);

app.delete('/delete-state/:_id', adminAuthMiddleware, adminController.DeleteState);

app.post('/admin-add-city', adminAuthMiddleware, adminController.AdminAddCity);

app.get('/admin-view-city', adminAuthMiddleware, adminController.Viewcity);

app.delete('/admin-delete-city/:_id', adminAuthMiddleware, adminController.DeleteCity);

app.put('/admin-change-password', adminAuthMiddleware, adminController.AdminChangePassword);

app.post('/admin-manage-photo', adminAuthMiddleware, adminController.UpdatePhoto);

app.get('/view-single-category/:id', adminAuthMiddleware, adminController.ViewSingleCategory);

app.post('/category-photo-update/:id', adminAuthMiddleware, adminController.CategoryUpdatePhoto);

app.get('/view-single-subcategory/:id', adminAuthMiddleware, adminController.ViewSingleSubcategory);

app.post('/subcategory-photo-update/:id', adminAuthMiddleware, adminController.SubcategoryUpdatePhoto);

app.get('/view-particular-subcategory/:id', adminController.ViewParticularSubcategory);

app.get('/view-particular-partner/:id', adminController.ViewParticularPartner);

app.get('/view-subcategory-data/:id', adminController.ViewSingleSubcategoryData);

app.get('/view-Particular-Category-Data/:id', adminController.ViewParticularCategoryData);

app.get('/view-partner-detail/:id', adminController.ViewPartnerDetail);

app.get('/admin-booking-data', adminAuthMiddleware, adminController.AdminBookingData);

app.get('/view-all-reviews', adminController.ViewAllReviews);

app.get('/view-particular-reviews/:id', adminController.ViewParticularReviews);

app.post('/add-contant-us', adminController.AddContactUs);









// Users Routes

app.post('/manage-user', userController.UserRegistration);

app.post('/user-login', userController.UserLogin);

app.post('/user-forgot-password', userController.UserForgotPassword);

app.post('/user-verify-otp', userController.UserVerfiyOtp);

app.post('/user-reset-password', userController.UserResetPassword);

app.put('/user-change-password', userAuthMiddleware, userController.UserChangePassword);

app.get('/manage-user', userAuthMiddleware, userController.ViewUser);

app.delete('/manage-user/:_id', userAuthMiddleware, userController.DeleteUser);

app.post('/user-manage-photo', userAuthMiddleware, userController.UpdatePhoto);

app.put('/manage-user', userAuthMiddleware, userController.EditInfoUser);

app.get('/user-exist', userAuthMiddleware, userController.UserExist);

app.get('/view-category-user', userAuthMiddleware, userController.ViewCategoryUser);

app.get('/view-Particular-Category-Data-Protected/:id', userAuthMiddleware, userController.ViewParticularCategoryProtected);

app.get('/user-particular-subcategory/:id', userAuthMiddleware, userController.ViewParticularSubCategoryProtected);

app.get('/user-subcategory-details/:id', userAuthMiddleware, userController.UserSubCategoryDetails);

app.get('/user-particular-partner/:id', userAuthMiddleware, userController.UserParticularPartner);

app.get('/user-partner-detail/:id', userAuthMiddleware, userController.UserPartnerDetails);

app.post('/add-booking-details/:id', userAuthMiddleware, userController.AddBookingDetails);

app.get('/check-token', userAuthMiddleware, userController.CheckToken);

app.get('/user-booking-data', userAuthMiddleware, userController.UserBookingData);

app.post('/user-add-review', userAuthMiddleware, userController.UserAddReview);

app.put('/user-booking-cancle/:id', userAuthMiddleware, userController.UserChangeStatusCanceled);

app.post('/user-check-email', userController.UserCheckEmail);











// Partner Routes

app.post('/manage-partner', partnerController.PartnerRegistration);

app.post('/partner-login', partnerController.PartnerLogin);

app.put('/partner-change-password', partnerAuthMiddleware, partnerController.PartnerChangePassword);

app.get('/manage-partner', partnerAuthMiddleware, partnerController.ViewPartner);

app.delete('/manage-partner/:_id', partnerAuthMiddleware, partnerController.DeletePartner);

app.post('/partner-forgot-password', partnerController.PartnerForgotPassword);

app.post('/partner-verify-otp', partnerController.PartnerVerfiyOtp);

app.post('/partner-reset-password', partnerController.PartnerResetPassword);

app.get('/partner-view-state', partnerController.PartnerViewState);

app.get('/partner-view-city/:id', partnerController.PartnerViewCity);

app.post('/partner-manage-photo', partnerAuthMiddleware, partnerController.UpdatePhoto);

app.put('/manage-partner', partnerAuthMiddleware, partnerController.EditInfoPartner);

app.post('/check-available-slots', partnerController.ReadAvailableSlots);

app.get('/partner-booking-data', partnerAuthMiddleware, partnerController.PartnerBookingData);

app.put('/change-status-complete/:id', partnerAuthMiddleware, partnerController.ChangeStatusCompleted);

app.put('/change-status-cancle/:id', partnerAuthMiddleware, partnerController.ChangeStatusCanceled);

app.get('/', (req, res) => {
  res.send('Hello World! Welcome to your Express server.');
});

//Barun

const port = process.env.PORT || 5001; // Define the port the server will listen on 

// console.log(port)

// Start the server and listen on the specified port  
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
}); 
