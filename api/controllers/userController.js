const jwt = require('jsonwebtoken');
const db = require('../config/connection');
const { ObjectId } = require('mongodb');
const nodemailer = require('nodemailer');
require('dotenv').config();
const cloudinary = require('../cloudImages')
const jwt_secret = process.env.JWT_SECRET;

const userController = {};

userController.UserRegistration = async (req, res) => {
  try {
    const collection = "User"
    const { email } = req.body;
    const filter = { email: email };
    const document = {
      fullName: req.body.fullName,
      email: email,
      password: req.body.password,
      mobile: req.body.mobile,
      state: new ObjectId(req.body.state),
      city: new ObjectId(req.body.city),
      pincode: req.body.pincode,
      address: req.body.address
    }
    const result = await db.collection(collection).find(filter).toArray();
    if (result.length > 0) {
      res.json({ error: true, message: 'Email Already Exists' });
    } else {
      await db.collection(collection).insertOne(document);
      res.json({ error: false, message: 'User Register Successfully' });
    }
  } catch (e) {
    res.json({ error: true, message: e.message });
  }
}

userController.UserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const collection = "User"
    const filter = { email: email, password: password }
    const result = await db.collection(collection).find(filter).toArray();
    if (result.length > 0) {
      const payload = {
        id: result[0]._id,
        email: result[0].email,
        fullName: result[0].fullName
      };
      const token = jwt.sign(payload, jwt_secret, { expiresIn: '24h' });
      // console.log(token)
      return res.json({ error: false, message: 'User Login Successfully', token: token });
    } else {
      return res.json({ error: true, message: 'Invalid Email or Password' });
    }
  } catch (e) {
    res.json({ error: true, message: e.message });
  }
}

userController.UserForgotPassword = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const filter = { email: email };
    const collection = "User";

    const result = await db.collection(collection).find(filter).toArray();

    if (result.length > 0) {
      // Update the OTP in the database
      await db.collection(collection).updateOne(filter, { $set: { otp: otp, otpExpiresAt: new Date(Date.now() + 10 * 60 * 1000) } });

      // Setup the transporter for sending emails
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.USER,
          pass: process.env.PASS,
        },
      });

      // Email options
      const mailOptions = {
        from: 'gvarun9814@gmail.com',  // Sender address
        to: email,                    // Receiver's email address
        subject: 'OTP Verify',        // Subject of the email
        text: `Your OTP is: ${otp}`,  // Email body
      };

      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          // Return error if sending email fails
          return res.json({ error: true, message: error.message });
        }

        // Return success response when email is sent successfully
        return res.json({ error: false, message: 'OTP sent successfully', info: info.response });
      });

      // Important: Prevent further response after email sending
      return;
    }

    // If no user is found with the provided email
    return res.json({ error: true, message: 'Invalid Email' });
  } catch (e) {
    // Handle any other errors
    return res.json({ error: true, message: e.message });
  }
}

userController.UserVerfiyOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const otp = parseInt(req.body.otp); // Convert database OTP to string
    // console.log(typeof (otp))
    const filter = { email: email }
    const collection = 'User'

    const result = await db.collection(collection).find(filter).toArray();
    // console.log(typeof (result[0].otp))
    if (result.length > 0) {
      if (new Date() > result[0].otpExpiresAt) {
        await db.collection(collection).updateOne(filter, { $set: { otp: "", otpExpiresAt: "" } });
        return res.json({ error: true, message: 'OTP expired' });
      }
      if (result[0].otp === otp) {
        res.json({ error: false, message: 'OTP verify successfully' })
      } else {
        res.json({ error: true, message: 'Invalid OTP' })
      }
    } else {
      res.json({ error: true, message: 'Invalid Email' })
    }
  } catch (error) {
    res.json({ error: true, message: error.message });
  }
}

userController.UserResetPassword = async (req, res) => {
  try {
    const { email, newpassword, confirmpassword } = req.body;
    const filter = { email: email }
    const collection = 'User'

    if (newpassword === confirmpassword) {
      await db.collection(collection).updateOne(filter, { $set: { password: newpassword } });
      await db.collection(collection).updateOne(filter, { $set: { otp: "" } });
      res.json({ error: false, message: 'Password Updated successfully' });
    } else {
      res.json({ error: true, message: 'Confirm Password not matched' })
    }
  } catch (error) {
    res.json({ error: true, message: error.message });
  }
}

userController.UserChangePassword = async (req, res) => {
  try {
    // console.log(req.body)
    const collection = "User"
    const filter = { _id: new ObjectId(req.userInfo.id) };
    // console.log(filter);
    const result = await db.collection(collection).find(filter).toArray();
    // console.log(result[0].password);
    if (result[0].password !== req.body.currentpassword) {
      res.json({ error: true, message: 'Incorrect current password ' });
    } else {
      if (req.body.password !== req.body.confirmpassword) {
        res.json({ error: true, message: 'New Password & confirm password not same' });
      } else {
        await db.collection(collection).updateOne(filter, { $set: { password: req.body.password } })
        res.json({ error: false, message: 'Password updated successfully' });
      }
    }
  } catch (e) {
    res.json({ error: true, message: e.message });
  }
}

userController.ViewUser = async (req, res) => {
  try {
    // console.log(req.body)
    const collection = "User"
    const filter = { _id: new ObjectId(req.userInfo.id) };
    // console.log(filter);
    const result = await db.collection(collection)
      // .find(filter).toArray();
      .aggregate(
        [{
          $match: filter
        },
        {
          $lookup: {
            from: "State",
            localField: "state",
            foreignField: "_id",
            as: "stateInfo"

          }
        }, {
          $unwind: "$stateInfo"
        },
        {
          $lookup: {
            from: "City",
            localField: "city",
            foreignField: "_id",
            as: "cityInfo"

          }
        }, {
          $unwind: "$cityInfo"
        },
        {
          $project: {
            fullName: 1,
            email: 1,
            mobile: 1,
            pincode: 1,
            address: 1,
            photo: 1,
            stateInfo: "$stateInfo.statename",
            cityInfo: "$cityInfo.cityname"
          }
        }
        ]
      ).toArray();
    // console.log(result);
    res.json({ error: false, message: 'Data fetched successfully', result: result });
  } catch (e) {
    res.json({ error: true, message: e.message });
  }
}

userController.DeleteUser = async (req, res) => {
  try {
    // const collection ="student" 
    const filter = { _id: new ObjectId(req.params._id) }
    // console.log(filter)
    collection = "User"
    let document = await db.collection(collection).deleteOne(filter);

    res.json({ error: false, message: "User deleted Successful" });


  }
  catch (e) {
    res.json({ error: true, message: e.message });

  }

}

userController.UpdatePhoto = async (req, res) => {
  try {
    // console.log(req.files)
    const filter = { _id: new ObjectId(req.userInfo.id) };
    const { photo } = req.files;

    const result = await cloudinary.uploader.upload(photo.tempFilePath, {
      folder: "DoorStepService"  // Specify the folder name here
    });
    console.log(result)
    const imageUrl = result.secure_url;
    const updateResult = await db.collection("User").updateOne(filter, {
      $set: { photo: imageUrl }
    });

    if (!updateResult.modifiedCount) {
      return res.json({ error: true, message: 'Failed to update photo.' });
    }

    res.json({ error: false, message: 'Photo uploaded and updated successfully' })

  } catch (e) {
    res.json({ error: true, message: e.message });
  }
}

userController.EditInfoUser = async (req, res) => {
  try {
    // console.log(req.body)
    const collection = "User"
    const filter = { _id: new ObjectId(req.userInfo.id) }
    // console.log(req.adminInfo.id)
    // console.log(filter)
    const document = {
      fullName: req.body.fullName,
      email: req.body.email,
      mobile: req.body.mobile,
      address: req.body.address
    }
    const result = await db.collection(collection).updateOne(filter, { $set: document });
    // console.log(result);
    res.json({ error: false, message: 'Info updated successfully', result: result });
  } catch (e) {
    res.json({ error: true, message: e.message });
  }
}

userController.ViewCategoryUser = async (req, res) => {
  try {
    const collection = "Category"
    const result = await db.collection(collection).find().toArray();
    // console.log(result);
    res.json({ error: false, message: 'Data fetched successfully', result: result });
  } catch (e) {
    res.json({ error: true, message: e.message });
  }
}

userController.UserExist = async (req, res) => {
  try {
    res.json({ error: false, message: 'User Login successfullt' });
  } catch (e) {
    res.json({ error: true, message: e.message });
  }
}

userController.ViewParticularCategoryProtected = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id)
    const collection = "Category"
    let filter = { _id: new ObjectId(id) }
    // console.log(filter)

    let result = await db.collection(collection).find(filter).toArray()
    res.json({ error: false, message: 'Data fetched successfully', result: result });
    // console.log(result)
  } catch (e) {
    res.json({ error: true, message: e.message });
  }
}

userController.ViewParticularSubCategoryProtected = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id)
    const collection = "Subcategory"
    let filter = { categoryId: new ObjectId(id) }
    // console.log(filter)

    let result = await db.collection(collection).
      // find(filter).toArray()
      aggregate(
        [
          { $match: filter },
          {
            $lookup: {
              from: "Category",
              localField: "categoryId",
              foreignField: "_id",
              as: "categoryInfo"

            }
          }, {
            $unwind: "$categoryInfo"
          },
          {
            $project: {
              _id: 1,
              subcategory: 1,
              photo: 1,
              categoryInfo: "$categoryInfo.categoryname"
            }
          }
        ]
      ).toArray();
    // console.log(result)
    res.json({ error: false, message: 'Data fetched successfully', result: result });
  } catch (e) {
    res.json({ error: true, message: e.message });
  }
}

userController.UserSubCategoryDetails = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id)
    const collection = "Subcategory"
    let filter = { _id: new ObjectId(id) }
    // console.log(filter)

    let result = await db.collection(collection).
      // find(filter).toArray()
      aggregate(
        [
          { $match: filter },
          {
            $lookup: {
              from: "Category",
              localField: "categoryId",
              foreignField: "_id",
              as: "categoryInfo"

            }
          }, {
            $unwind: "$categoryInfo"
          },
          {
            $project: {
              _id: 1,
              subcategory: 1,
              photo: 1,
              briefDescription: 1,
              categoryInfo: "$categoryInfo.categoryname"
            }
          }
        ]
      ).toArray();
    // console.log(result)
    res.json({ error: false, message: 'Data fetched successfully', result: result });
  } catch (e) {
    res.json({ error: true, message: e.message });
  }
}

userController.UserParticularPartner = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id)
    const collection = "Partner"
    let filter = { subcategory: new ObjectId(id) }
    // console.log(filter)

    let result = await db.collection(collection).
      // find(filter).toArray()
      aggregate(
        [
          { $match: filter },
          {
            $lookup: {
              from: "Category",
              localField: "category",
              foreignField: "_id",
              as: "categoryInfo"

            }
          }, {
            $unwind: "$categoryInfo"
          },
          {
            $lookup: {
              from: "Subcategory",
              localField: "subcategory",
              foreignField: "_id",
              as: "subcategoryInfo"

            }
          }, {
            $unwind: "$subcategoryInfo"
          },
          {
            $lookup: {
              from: "State",
              localField: "state",
              foreignField: "_id",
              as: "stateInfo"

            }
          }, {
            $unwind: "$stateInfo"
          },
          {
            $lookup: {
              from: "City",
              localField: "city",
              foreignField: "_id",
              as: "cityInfo"

            }
          }, {
            $unwind: "$cityInfo"
          },
          {
            $project: {
              _id: 1,
              fullname: 1,
              email: 1,
              mobile: 1,
              status: 1,
              price: 1,
              address: 1,
              starttime: 1,
              endtime: 1,
              photo: 1,
              categoryInfo: "$categoryInfo.categoryname",
              subcategoryInfo: "$subcategoryInfo.subcategory",
              stateInfo: "$stateInfo.statename",
              cityInfo: "$cityInfo.cityname"
            }
          }
        ]
      ).toArray();
    // console.log(result.status)
    res.json({ error: false, message: 'Data fetched successfully', result: result });
  } catch (e) {
    res.json({ error: true, message: e.message });
  }
}

userController.UserPartnerDetails = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id)
    const collection = "Partner"
    let filter = { _id: new ObjectId(id) }
    // console.log(filter)

    let result = await db.collection(collection).
      // find(filter).toArray()
      aggregate(
        [
          { $match: filter },
          {
            $lookup: {
              from: "Category",
              localField: "category",
              foreignField: "_id",
              as: "categoryInfo"

            }
          }, {
            $unwind: "$categoryInfo"
          },
          {
            $lookup: {
              from: "Subcategory",
              localField: "subcategory",
              foreignField: "_id",
              as: "subcategoryInfo"

            }
          }, {
            $unwind: "$subcategoryInfo"
          },
          {
            $lookup: {
              from: "State",
              localField: "state",
              foreignField: "_id",
              as: "stateInfo"

            }
          }, {
            $unwind: "$stateInfo"
          },
          {
            $lookup: {
              from: "City",
              localField: "city",
              foreignField: "_id",
              as: "cityInfo"

            }
          }, {
            $unwind: "$cityInfo"
          },
          {
            $project: {
              _id: 1,
              fullname: 1,
              email: 1,
              mobile: 1,
              status: 1,
              price: 1,
              address: 1,
              starttime: 1,
              endtime: 1,
              photo: 1,
              description: 1,
              categoryInfo: "$categoryInfo.categoryname",
              subcategoryInfo: "$subcategoryInfo.subcategory",
              stateInfo: "$stateInfo.statename",
              cityInfo: "$cityInfo.cityname"
            }
          }
        ]
      ).toArray();
    // console.log(result)
    res.json({ error: false, message: 'Data fetched successfully', result: result });
  } catch (e) {
    res.json({ error: true, message: e.message });
  }
}

userController.AddBookingDetails = async (req, res) => {

  const { date, email, mobile, state, city, pincode, address, slots, totalPrice, category, subcategory } = req.body;

  // Validate that slots were selected
  if (!slots || slots.length === 0) {
    return res.json({ error: true, message: "No slots selected. Please select at least one slot." });
  }

  const { id } = req.params;
  const filter2 = { _id1: new ObjectId(id) };
  const filter = { _id: new ObjectId(req.userInfo.id) };

  try {
    // Create the main booking document
    const bookingData = {
      date,
      email,
      mobile,
      state,
      city,
      pincode,
      address,
      total: totalPrice,
      userId: filter._id,
      partnerId: filter2._id1,
      category: new ObjectId(category),
      subcategory: new ObjectId(subcategory),
      status: 'Confirmed'

    };

    // Insert main booking data
    const result = await db.collection("Booking").insertOne(bookingData);


    const slotData = slots.map((slot) => ({
      start_time: slot.start,
      end_time: slot.end,
      booking_id: result.insertedId, // Use the insertedId from the first result 

    }));

    await db.collection("Booking-Details").insertMany(slotData);

    res.json({ error: false, message: "Booking saved successfully." });
  } catch (error) {
    console.error("Error saving booking:", error);
    res.json({ error: true, message: "Failed to save booking." });
  }
}

userController.CheckToken = async (req, res) => {
  try {
    res.json({ error: false, message: 'Token exists' });
  } catch (e) {
    res.json({ error: true, message: e.message });
  }
}

userController.UserBookingData = async (req, res) => {
  try {
    const collection = "Booking";
    const filter = { userId: new ObjectId(req.userInfo.id) };

    let result = await db.collection(collection).aggregate([
      {
        $match: filter
      },
      {
        $lookup: {
          from: "Category",
          localField: "category",
          foreignField: "_id",
          as: "categoryInfo"
        }
      },
      { $unwind: "$categoryInfo" },
      {
        $lookup: {
          from: "Subcategory",
          localField: "subcategory",
          foreignField: "_id",
          as: "subcategoryInfo"
        }
      },
      { $unwind: "$subcategoryInfo" },
      {
        $lookup: {
          from: "User",
          localField: "userId",
          foreignField: "_id",
          as: "userInfo"
        }
      },
      { $unwind: "$userInfo" },
      {
        $lookup: {
          from: "Partner",
          localField: "partnerId",
          foreignField: "_id",
          as: "partnerInfo"
        }
      },
      { $unwind: "$partnerInfo" },
      {
        $lookup: {
          from: "Booking-Details",
          let: { bookingId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$booking_id", "$$bookingId"] }
              }
            }
          ],
          as: "bookingdetailsInfo"
        }
      },
      {
        $project: {
          total: 1,
          date: 1,
          mobile: 1,
          email: 1,
          state: 1,
          city: 1,
          pincode: 1,
          address: 1,
          status: 1,
          partnerId: 1,
          userId: 1,
          bookingdetailsInfo: 1,
          partnerName: "$partnerInfo.fullname",
          partnerMobile: "$partnerInfo.mobile",
          partnerEmail: "$partnerInfo.email",
          userName: "$userInfo.fullName",
          userEmail: "$userInfo.email",
          userMobile: "$userInfo.mobile",
          categoryInfo: "$categoryInfo.categoryname",
          subcategoryInfo: "$subcategoryInfo.subcategory",
          subcategoryPhoto: "$subcategoryInfo.photo",
        }
      }
    ]).toArray();

    // console.log(result);
    res.json({ error: false, message: 'Data fetched successfully', result });
  } catch (e) {
    console.error("Error fetching partner booking data:", e);  // Log error details
    res.json({ error: true, message: e.message });
  }
}

userController.UserAddReview = async (req, res) => {
  try {
    const collection = "Review"
    const document = {
      partnerId: new ObjectId(req.body.selectedPartnerId),
      userId: new ObjectId(req.body.selectedUserId),
      star: req.body.currentValue,
      comment: req.body.reviewText,
      date: new Date().toISOString().split('T')[0],
    }
    console.log(document)
    await db.collection(collection).insertOne(document);
    res.json({ error: false, message: 'Review added successfully' })
  } catch (e) {
    res.json({ error: true, message: e.message });
  }
}

userController.UserChangeStatusCanceled = async (req, res) => {
  try {
    const bookingId = req.params.id; // Access the specific route parameter

    const filter = { _id: new ObjectId(bookingId) };
    const filter2 = { booking_id: new ObjectId(bookingId) };

    await db.collection('Booking').updateOne(filter, { $set: { status: 'Canceled' } });
    await db.collection('Booking-Details').deleteMany(filter2);  // Ensure collection name matches exactly

    res.json({ error: false, message: 'Status updated and booking details deleted successfully' });

  } catch (e) {
    console.error("Error in ChangeStatusCanceled:", e);
    res.json({ error: true, message: e.message });
  }
}

userController.UserCheckEmail = async (req, res) => {
  try {
    const collection = "User"
    const filter = { email: req.body.email }
    // console.log(filter)
    const result = await db.collection(collection).find(filter).toArray();

    res.json({ error: false, message: 'Data fetched successfully', result: result });
  } catch (e) {
    res.json({ error: true, message: e.message });
  }
}


module.exports = userController;