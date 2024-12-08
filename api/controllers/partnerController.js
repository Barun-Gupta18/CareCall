const jwt = require('jsonwebtoken');
// const db = require('../config/db');
const db = require('../config/connection');
const { ObjectId } = require('mongodb');
const nodemailer = require('nodemailer');
require('dotenv').config();
const jwt_secret = process.env.JWT_SECRET
const cloudinary = require('../cloudImages')

const partnerController = {};

function generateHourlySlots(starttime, endtime) {
  const slots = [];
  let start = new Date(`1970-01-01T${starttime}Z`);
  const end = new Date(`1970-01-01T${endtime}Z`);

  while (start < end) {
    const nextHour = new Date(start);
    nextHour.setHours(start.getHours() + 1);

    slots.push({
      start: start.toISOString().substr(11, 8),
      end: nextHour.toISOString().substr(11, 8),
      available: true  // Initial availability set to true
    });

    start = nextHour;
  }

  return slots;
}

function markSlotAvailability(slots, bookedSlots) {
  return slots.map(slot => {
    // Check if this slot overlaps with any booked slot
    const isUnavailable = bookedSlots.some(bookedSlot =>
      (slot.start < bookedSlot.end_time && slot.end > bookedSlot.start_time) ||
      (slot.start >= bookedSlot.start_time && slot.end <= bookedSlot.end_time)
    );

    // Set availability based on overlap
    return {
      start: slot.start,
      end: slot.end,
      available: !isUnavailable
    };
  });
}

partnerController.PartnerRegistration = async (req, res) => {
  try {
    // console.log(req.body)
    const { email } = req.body;
    const collection = "Partner"
    const filter = { email: email }
    const result = await db.collection(collection).find(filter).toArray();
    if (result.length > 0) {
      res.json({ error: true, message: 'Email Already Exists' });
    } else {
      const document = {
        fullname: req.body.fullname,
        email: req.body.email,
        password: req.body.password,
        mobile: req.body.mobile,
        state: new ObjectId(req.body.state),
        city: new ObjectId(req.body.city),
        pincode: req.body.pincode,
        category: new ObjectId(req.body.category),
        subcategory: new ObjectId(req.body.subcategory),
        status: req.body.status,
        price: req.body.price,
        description: req.body.description,
        address: req.body.address,
        starttime: req.body.starttime,
        endtime: req.body.endtime,
        photo: "",
        otp: "00000"
      }
      await db.collection(collection).insertOne(document);
      res.json({ error: false, message: 'Partner Register Successfully' });
    }
  } catch (e) {
    res.json({ error: true, message: e.message });
  }
}

partnerController.PartnerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const collection = "Partner"
    const filter = { email: email, password: password }
    const result = await db.collection(collection).find(filter).toArray();
    if (result.length > 0) {
      if (result[0].status === 'In-active') {
        return res.json({ error: true, message: 'Your account was In-activate' });
      }
      const payload = {
        id: result[0]._id,
        email: result[0].email,
        fullName: result[0].fullname
      };
      const token = jwt.sign(payload, jwt_secret, { expiresIn: '24h' });
      // console.log(token)
      return res.json({ error: false, message: 'Partner Login Successfully', token: token });
    } else {
      return res.json({ error: true, message: 'Invalid Email or Password' });
    }
  } catch (e) {
    res.json({ error: true, message: e.message });
  }
}

partnerController.PartnerChangePassword = async (req, res) => {
  try {
    // console.log(req.body)
    const collection = "Partner"
    const filter = { _id: new ObjectId(req.partnerInfo.id) };
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

partnerController.ViewPartner = async (req, res) => {
  try {
    // console.log(req.body)
    const collection = "Partner"
    const filter = { _id: new ObjectId(req.partnerInfo.id) };
    // console.log(filter);
    const result = await db.collection(collection).aggregate(
      [{
        $match: filter
      },

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
          fullname: 1,
          email: 1,
          mobile: 1,
          state: 1,
          city: 1,
          category: 1,
          subcategory: 1,
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
    // console.log(result[0].password);
    res.json({ error: false, message: 'Data fetched successfully', result: result });
  } catch (e) {
    res.json({ error: true, message: e.message });
  }
}

partnerController.PartnerForgotPassword = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const filter = { email: email };
    const collection = "Partner";

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

partnerController.PartnerVerfiyOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const otp = parseInt(req.body.otp); // Convert database OTP to string
    // console.log(typeof (otp))
    const filter = { email: email }
    const collection = 'Partner'

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

partnerController.PartnerResetPassword = async (req, res) => {
  try {
    const { email, newpassword, confirmpassword } = req.body;
    const filter = { email: email }
    const collection = 'Partner'

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

partnerController.PartnerViewState = async (req, res) => {
  try {
    const collection = "State"
    // const filter = { _id: new ObjectId(req.adminInfo.id) }
    // console.log(req.adminInfo.id)
    // console.log(filter)
    const result = await db.collection(collection).find().toArray();
    // console.log(result);
    res.json({ error: false, message: 'Data fetched successfully', result: result });
  } catch (e) {
    res.json({ error: true, message: e.message });
  }
}

partnerController.PartnerViewCity = async (req, res) => {
  try {


    const { id } = req.params;
    // console.log(id)
    const collections = "City"
    let filter = { stateId: new ObjectId(id) }
    // console.log(filter);
    let documents = await db.collection(collections).find(filter).toArray();
    // console.log(documents);
    res.json({ error: false, message: "Document Fetched Successfully", result: documents });

  } catch (error) {

    res.json({ error: true, message: error.message });

  }

}

partnerController.DeletePartner = async (req, res) => {
  try {
    // const collection ="student" 
    const filter = { _id: new ObjectId(req.params._id) }
    // console.log(filter)
    collection = "Partner"
    let document = await db.collection(collection).deleteOne(filter);

    res.json({ error: false, message: "Partner deleted Successful" });

  }
  catch (e) {
    res.json({ error: true, message: e.message });

  }

}

partnerController.UpdatePhoto = async (req, res) => {
  try {
    // console.log(req.files)
    const filter = { _id: new ObjectId(req.partnerInfo.id) };
    const { photo } = req.files;

    const result = await cloudinary.uploader.upload(photo.tempFilePath, {
      folder: "DoorStepService"  // Specify the folder name here
    });
    console.log(result)
    const imageUrl = result.secure_url;
    const updateResult = await db.collection("Partner").updateOne(filter, {
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

partnerController.EditInfoPartner = async (req, res) => {
  try {
    // console.log(req.body)
    const collection = "Partner"
    const filter = { _id: new ObjectId(req.partnerInfo.id) }
    // console.log(req.adminInfo.id)
    // console.log(filter)
    const document = {
      fullName: req.body.fullname,
      email: req.body.email,
      mobile: req.body.mobile,
      price: req.body.price,
      address: req.body.address
    }
    const result = await db.collection(collection).updateOne(filter, { $set: document });
    // console.log(result);
    res.json({ error: false, message: 'Info updated successfully', result: result });
  } catch (e) {
    res.json({ error: true, message: e.message });
  }
}

partnerController.ReadAvailableSlots = async (req, res) => {
  try {
    let { id, bookingDate } = req.body;
    bookingDate = new Date(bookingDate);
    bookingDate = bookingDate.toISOString().slice(0, 10);
    // bookingDate = new Date("2024-11-05");
    // console.log('sp')
    // console.log(id)

    const collection = "Partner";
    const filter = { _id: new ObjectId(id) };
    const result = await db.collection(collection).find(filter).toArray()

    // Step 1: Find all bookings for the service provider on the specified date
    const bookings = await db.collection("Booking").find({
      partnerId: new ObjectId(id),
      date: bookingDate
    }).toArray();

    // console.log('bi')
    // console.log(bookings)


    // Get booking IDs for the found bookings
    const bookingIds = bookings.map(booking => booking._id);

    // console.log('bids')
    // console.log(bookingIds)

    // Step 2: Retrieve booking details for these booking IDs
    const bookedSlots = await db.collection("Booking-Details").find({
      booking_id: { $in: bookingIds }
    }).toArray();
    // console.log('3')
    // console.log(bookedSlots)

    const { starttime, endtime } = result[0];

    const generatedSlots = generateHourlySlots(starttime, endtime);
    const availableSlots = markSlotAvailability(generatedSlots, bookedSlots);

    res.json({ error: false, message: 'Data Fetched Successfully.', slots: availableSlots });
  } catch (e) {
    res.json({ error: true, message: e.message });
  }
}

partnerController.PartnerBookingData = async (req, res) => {
  try {
    const collection = "Booking";
    const filter = { partnerId: new ObjectId(req.partnerInfo.id) };

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
          bookingdetailsInfo: 1,
          partnerName: "$partnerInfo.fullname",
          partnerMobile: "$partnerInfo.mobile",
          partnerEmail: "$partnerInfo.email",
          userName: "$userInfo.fullName",
          userEmail: "$userInfo.email",
          userMobile: "$userInfo.mobile",
          categoryInfo: "$categoryInfo.categoryname",
          subcategoryInfo: "$subcategoryInfo.subcategory",
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

partnerController.ChangeStatusCompleted = async (req, res) => {
  try {
    // console.log(req.body)
    const collection = "Booking"
    const filter = { _id: new ObjectId(req.params) };
    // console.log(filter);
    await db.collection(collection).updateOne(filter, { $set: { status: 'Completed' } })
    res.json({ error: false, message: 'Status updated successfully' });
  } catch (e) {
    res.json({ error: true, message: e.message });
  }
}

partnerController.ChangeStatusCanceled = async (req, res) => {
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


module.exports = partnerController;