const jwt = require('jsonwebtoken');
const db = require('../config/connection');
const { ObjectId } = require('mongodb');
const nodemailer = require('nodemailer');
require('dotenv').config();
const jwt_secret = process.env.JWT_SECRET;
const cloudinary = require('../cloudImages')




const adminController = {};

adminController.AdminRegistration = async (req, res) => {
  try {
    const collection = "Admin"
    const { email } = req.body;
    const filter = { email: email }
    const result = await db.collection(collection).find(filter).toArray();
    if (result.length > 0) {
      res.json({ error: true, message: 'Email Already Exists' });
    } else {
      await db.collection(collection).insertOne(req.body);
      res.json({ error: false, message: 'Admin Register Successfully' });
    }
  } catch (e) {
    res.json({ error: true, message: e.message });
  }
}

adminController.ViewAdmin = async (req, res) => {
  try {
    const collection = "Admin"
    const filter = { _id: new ObjectId(req.adminInfo.id) }
    // console.log(req.adminInfo.id)
    // console.log(filter)
    const result = await db.collection(collection).find(filter).toArray();
    // console.log(result);
    res.json({ error: false, message: 'Data fetched successfully', result: result });
  } catch (e) {
    res.json({ error: true, message: e.message });
  }
}

adminController.EditInfoAdmin = async (req, res) => {
  try {
    // console.log(req.body)
    const collection = "Admin"
    const filter = { _id: new ObjectId(req.adminInfo.id) }
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

adminController.DeleteAdmin = async (req, res) => {
  try {
    // const collection ="student" 
    const filter = { _id: new ObjectId(req.params._id) }
    // console.log(filter)
    collection = "Admin"
    let document = await db.collection(collection).deleteOne(filter);

    res.json({ error: false, message: "Admin deleted Successful" });


  }
  catch (e) {
    res.json({ error: true, message: e.message });

  }

}

adminController.AdminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(email)
    const collection = "Admin"
    const filter = { email: email, password: password }
    const result = await db.collection(collection).find(filter).toArray();
    // console.log(result);
    if (result.length > 0) {
      const payload = {
        id: result[0]._id,
        email: result[0].email,
        fullName: result[0].fullName
      };
      const token = jwt.sign(payload, jwt_secret, { expiresIn: '24h' });
      // console.log(token)
      return res.json({ error: false, message: 'Admin Login Successfully', token: token });
    } else {
      return res.json({ error: true, message: 'Invalid Email or Password' });
    }
  } catch (e) {
    res.json({ error: true, message: e.message });
  }
}

adminController.AddCategory = async (req, res) => {
  try {
    // const { fullName, email, password, mobile, address } = req.body;
    const collection = "Category"
    const result1 = await db.collection(collection).find({ categoryname: req.body.categoryname }).toArray();
    if (result1.length > 0) {
      return res.json({ error: true, message: 'Category Already exists' })
    }
    const result = await db.collection(collection).insertOne(req.body);
    // console.log(result);
    res.json({ error: false, message: 'Category Added Successfully' });
  } catch (e) {
    res.json({ error: true, message: e.message });
  }
}

adminController.ViewCategory = async (req, res) => {
  try {
    const collection = "Category"
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

adminController.ViewCategoryPartner = async (req, res) => {
  try {
    const collection = "Category"
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

adminController.DeleteCategory = async (req, res) => {
  try {
    const filter = new ObjectId(req.params.id); // Convert to ObjectId for comparison

    // console.log(filter)

    // Check if the category exists in the Subcategory collection
    const subcategoryResult = await db.collection("Subcategory").find({ categoryId: filter }).toArray();
    // console.log(subcategoryResult)
    if (subcategoryResult.length > 0) {
      return res.json({ error: true, message: 'Cannot delete this category. It is linked to subcategories.' });
    }

    // Check if the category exists in the Partner collection
    const partnerResult = await db.collection("Partner").find({ category: filter }).toArray();
    // console.log(partnerResult)
    if (partnerResult.length > 0) {
      return res.json({ error: true, message: 'Cannot delete this category. It is linked to providers.' });
    }

    // If no linked subcategory or partner, proceed to delete
    await db.collection("Category").deleteOne({ _id: filter });

    res.json({ error: false, message: "Category deleted successfully." });
  } catch (e) {
    res.json({ error: true, message: e.message });
  }
}

adminController.AddSubCategory = async (req, res) => {
  try {
    const collection = "Subcategory"
    const document = {
      subcategory: req.body.subcategory,
      categoryId: new ObjectId(req.body.category),
      briefDescription: req.body.briefDescription,
      photo: ""
    }
    const result1 = await db.collection(collection).find({ subcategory: req.body.subcategory }).toArray();
    if (result1.length > 0) {
      return res.json({ error: true, message: 'Sub-category Already exists' });
    }
    const result = await db.collection(collection).insertOne(document);
    // console.log(result);
    res.json({ error: false, message: 'Sub-Category Added Successfully' });
  } catch (e) {
    res.json({ error: true, message: e.message });
  }
}

adminController.ViewSubCategory = async (req, res) => {

  try {

    const collections = "Subcategory"
    let result = await db.collection(collections).aggregate(
      [
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
    res.json({ error: false, message: "Document Fetched Successfully", result: result });


  } catch (error) {

    res.json({ error: true, message: error.message });

  }

}

adminController.DeleteSubCategory = async (req, res) => {
  try {
    // const collection ="student" 
    const filter = new ObjectId(req.params._id)
    // console.log(filter)

    // Check if the category exists in the Partner collection
    const partnerResult = await db.collection("Partner").find({ subcategory: filter }).toArray();
    // console.log(partnerResult)
    if (partnerResult.length > 0) {
      return res.json({ error: true, message: 'Cannot delete this category. It is linked to providers.' });
    }

    collection = "Subcategory"
    let document = await db.collection(collection).deleteOne({ _id: filter });

    res.json({ error: false, message: " Sub-Category deleted Successfully" });

  }
  catch (e) {
    res.json({ error: true, message: e.message });

  }

}

adminController.ReadSubCat = async (req, res) => {
  try {


    const { id } = req.params;
    // console.log(id)
    const collections = "Subcategory"
    let filter = { categoryId: new ObjectId(id) }
    // console.log(filter);
    let documents = await db.collection(collections).find(filter).toArray();
    // console.log(documents);
    res.json({ error: false, message: "Document Fetched Successfully", result: documents });

  } catch (error) {

    res.json({ error: true, message: error.message });

  }

}

adminController.ShowAllPartner = async (req, res) => {
  try {
    const collection = "Partner"
    // const filter = { _id: new ObjectId(req.adminInfo.id) }
    // console.log(req.adminInfo.id)
    // console.log(filter)
    const result = await db.collection(collection).aggregate(
      [
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
            city: 1,
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
    // console.log(result);
    res.json({ error: false, message: 'Data fetched successfully', result: result });
  } catch (e) {
    res.json({ error: true, message: e.message });
  }
}

adminController.ShowAllPartnerPublic = async (req, res) => {
  try {
    const collection = "Partner"
    // const filter = { _id: new ObjectId(req.adminInfo.id) }
    // console.log(req.adminInfo.id)
    // console.log(filter)
    const result = await db.collection(collection).aggregate(
      [
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
            city: 1,
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
    // console.log(result);
    res.json({ error: false, message: 'Data fetched successfully', result: result });
  } catch (e) {
    res.json({ error: true, message: e.message });
  }
}

adminController.AdminDeletePartner = async (req, res) => {
  try {
    // const collection ="student" 
    const filter = { _id: new ObjectId(req.params._id) }
    // console.log(filter)
    collection = "Partner"
    await db.collection(collection).deleteOne(filter);

    res.json({ error: false, message: " Partner deleted by admin" });

  }
  catch (e) {
    res.json({ error: true, message: e.message });

  }

}

adminController.AdminStatusUpdate = async (req, res) => {
  try {
    const filter = { _id: new ObjectId(req.params._id) }
    // console.log(filter)
    const { status } = req.body; // Expecting new status in the request body
    // console.log(status)
    collection = "Partner"

    await db.collection(collection).updateOne(filter, { $set: { status: status } });
    res.json({ error: false, message: `Status updated to ${status}` });
  }
  catch (e) {
    res.json({ error: true, message: e.message });

  }

}

adminController.ShowAllUser = async (req, res) => {
  try {
    const collection = "User"
    const result = await db.collection(collection).find().toArray();
    // console.log(result);
    res.json({ error: false, message: 'Data fetched successfully', result: result });
  } catch (e) {
    res.json({ error: true, message: e.message });
  }
}

adminController.AdminDeleteUser = async (req, res) => {
  try {
    // const collection ="student" 
    const filter = { _id: new ObjectId(req.params._id) }
    // console.log(filter)
    collection = "User"
    await db.collection(collection).deleteOne(filter);

    res.json({ error: false, message: " User deleted by admin" });

  }
  catch (e) {
    res.json({ error: true, message: e.message });

  }

}

adminController.AdminForgotPassword = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const filter = { email: email };
    const collection = "Admin";

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

adminController.AdminVerfiyOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const otp = parseInt(req.body.otp); // Convert database OTP to string
    // console.log(typeof (otp))
    const filter = { email: email }
    const collection = 'Admin'

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
        res.json({ error: true, message: 'Invalid OTP ' })
      }
    } else {
      res.json({ error: true, message: 'Invalid Email' })
    }
  } catch (error) {
    res.json({ error: true, message: error.message });
  }
}

adminController.AdminResetPassword = async (req, res) => {
  try {
    const { email, newpassword, confirmpassword } = req.body;
    const filter = { email: email }
    const collection = 'Admin'

    if (newpassword === confirmpassword) {
      await db.collection(collection).updateOne(filter, { $set: { password: newpassword } });
      await db.collection(collection).updateOne(filter, { $set: { otp: "", otpExpiresAt: "" } });
      res.json({ error: false, message: 'Password Updated successfully' });
    } else {
      res.json({ error: true, message: 'Confirm Password not matched' })
    }
  } catch (error) {
    res.json({ error: true, message: error.message });
  }
}

adminController.AdminState = async (req, res) => {
  try {
    const collection = "State"
    const filter = { statename: req.body.statename }
    // console.log(filter)
    const result = await db.collection(collection).find(filter).toArray();
    if (result.length > 0) {
      return res.json({ error: true, message: 'State Already Exists' })
    }
    await db.collection(collection).insertOne(req.body);
    res.json({ error: false, message: 'state added Successfully' });

  } catch (e) {
    res.json({ error: true, message: e.message });
  }
}

adminController.ViewState = async (req, res) => {
  try {
    const collection = "State"
    // console.log(req.adminInfo.id)
    // console.log(filter)
    const result = await db.collection(collection).find().toArray();
    // console.log(result);
    res.json({ error: false, message: 'Data fetched successfully', result: result });
  } catch (e) {
    res.json({ error: true, message: e.message });
  }
}

adminController.DeleteState = async (req, res) => {
  try {

    const filter = new ObjectId(req.params._id)
    // console.log(filter)

    // Check if the state exists in the City collection
    const cityResult = await db.collection("City").find({ stateId: filter }).toArray();
    // console.log(cityResult)
    if (cityResult.length > 0) {
      return res.json({ error: true, message: 'Cannot delete this state. It is linked to cites...' });
    }

    // Check if the state exists in the Partner collection
    const partnerResult = await db.collection("Partner").find({ state: filter }).toArray();
    // console.log(partnerResult)
    if (partnerResult.length > 0) {
      return res.json({ error: true, message: 'Cannot delete this category. It is linked to partners...' });
    }

    await db.collection(collection).deleteOne({ _id: filter });

    res.json({ error: false, message: " State deleted " });

  }
  catch (e) {
    res.json({ error: true, message: e.message });

  }

}

adminController.AdminAddCity = async (req, res) => {
  try {
    const collection = "City"
    const filter = { cityname: req.body.cityname }
    // console.log(filter)
    const document = {
      cityname: req.body.cityname,
      stateId: new ObjectId(req.body.stateId),
      pincode: req.body.pincode
    }
    const result = await db.collection(collection).find(filter).toArray();
    if (result.length > 0) {
      return res.json({ error: true, message: 'City Already Exists' })
    }
    await db.collection(collection).insertOne(document);
    res.json({ error: false, message: 'city added Successfully' });
  } catch (e) {
    res.json({ error: true, message: e.message });
  }
}

adminController.Viewcity = async (req, res) => {
  try {
    const collection = "City"
    let result = await db.collection(collection).aggregate(
      [
        {
          $lookup: {
            from: "State",
            localField: "stateId",
            foreignField: "_id",
            as: "stateInfo"

          }
        }, {
          $unwind: "$stateInfo"
        },
        {
          $project: {
            _id: 1,
            cityname: 1,
            pincode: 1,
            stateInfo: "$stateInfo.statename"
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

adminController.DeleteCity = async (req, res) => {
  try {
    // const collection ="student" 
    const filter = new ObjectId(req.params._id)
    // console.log(filter)

    const partnerResult = await db.collection("Partner").find({ city: filter }).toArray();
    // console.log(partnerResult)
    if (partnerResult.length > 0) {
      return res.json({ error: true, message: 'Cannot delete this city. It is linked to partners...' });
    }

    collection = "City"
    await db.collection(collection).deleteOne({ _id: filter });

    res.json({ error: false, message: " City deleted " });

  }
  catch (e) {
    res.json({ error: true, message: e.message });

  }

}

adminController.AdminChangePassword = async (req, res) => {
  try {
    // console.log(req.body)
    const collection = "Admin"
    const filter = { _id: new ObjectId(req.adminInfo.id) };
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

adminController.UpdatePhoto = async (req, res) => {
  try {
    // console.log(req.files)
    const filter = { _id: new ObjectId(req.adminInfo.id) };
    const { photo } = req.files;
    const result = await cloudinary.uploader.upload(photo.tempFilePath, {
      folder: "DoorStepService"  // Specify the folder name here
    });
    console.log(result)
    const imageUrl = result.secure_url;
    const updateResult = await db.collection("Admin").updateOne(filter, {
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

adminController.ViewSingleCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const collection = "Category"
    let filter = { _id: new ObjectId(id) }

    let result = await db.collection(collection).find(filter).toArray();
    // console.log(result)
    res.json({ error: false, message: 'Data fetched successfully', result: result });
  } catch (e) {
    res.json({ error: true, message: e.message });
  }
}

adminController.CategoryUpdatePhoto = async (req, res) => {
  try {
    // console.log(req.files)
    const { id } = req.params;
    const filter = { _id: new ObjectId(id) };
    const { photo } = req.files;
    const result = await cloudinary.uploader.upload(photo.tempFilePath, {
      folder: "DoorStepService"  // Specify the folder name here
    });
    console.log(result)
    const imageUrl = result.secure_url;
    const updateResult = await db.collection("Category").updateOne(filter, {
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

adminController.ViewSingleSubcategory = async (req, res) => {
  try {
    const { id } = req.params;
    const collection = "Subcategory"
    let filter = { _id: new ObjectId(id) }

    let result = await db.collection(collection).aggregate(
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

adminController.SubcategoryUpdatePhoto = async (req, res) => {
  try {
    // console.log(req.files)
    const { id } = req.params;
    const filter = { _id: new ObjectId(id) };
    const { photo } = req.files;
    const result = await cloudinary.uploader.upload(photo.tempFilePath, {
      folder: "DoorStepService"  // Specify the folder name here
    });
    console.log(result)
    const imageUrl = result.secure_url;
    const updateResult = await db.collection("Subcategory").updateOne(filter, {
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

adminController.ViewParticularSubcategory = async (req, res) => {
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

adminController.ViewParticularPartner = async (req, res) => {
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
              category: 1,
              subcategory: 1,
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

adminController.ViewPartnerDetail = async (req, res) => {
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
              category: 1,
              subcategory: 1,
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

adminController.ViewSingleSubcategoryData = async (req, res) => {
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

adminController.ViewParticularCategoryData = async (req, res) => {
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

adminController.AdminBookingData = async (req, res) => {
  try {
    const collection = "Booking"
    let result = await db.collection(collection)
      // find(filter).toArray()
      .aggregate([
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
            from: "Booking-Details",  // Ensure the correct collection name
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

    // console.log(result[0]);  // Log the full structure of the result 
    res.json({ error: false, message: 'Data fetched successfully', result: result });
  }
  catch (e) {
    res.json({ error: true, message: e.message });
  }
}

adminController.ViewAllReviews = async (req, res) => {
  try {
    const collection = "Review"
    const result = await db.collection(collection)
      // .find().toArray();
      .aggregate([
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
          $project: {
            star: 1,
            comment: 1,
            date: 1,
            userName: "$userInfo.fullName",
            userPhoto: "$userInfo.photo",
          }
        }
      ]).toArray();
    // console.log(result);
    res.json({ error: false, message: 'Data fetched successfully', result: result });
  } catch (e) {
    res.json({ error: true, message: e.message });
  }
}

adminController.ViewParticularReviews = async (req, res) => {
  try {
    const collection = "Review"
    const filter = { partnerId: new ObjectId(req.params.id) }
    const result = await db.collection(collection)
      // .find().toArray();
      .aggregate([
        { $match: filter },
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
          $project: {
            star: 1,
            comment: 1,
            date: 1,
            userName: "$userInfo.fullName",
            userPhoto: "$userInfo.photo",
          }
        }
      ]).toArray();
    // console.log(result);
    res.json({ error: false, message: 'Data fetched successfully', result: result });
  } catch (e) {
    res.json({ error: true, message: e.message });
  }
}

adminController.AddContactUs = async (req, res) => {
  try {
    const collection = "Contact-us"

    await db.collection(collection).insertOne(req.body);

    res.json({ error: false, message: 'Contact-us Added Successfully', });
  } catch (e) {
    res.json({ error: true, message: e.message });
  }
}


module.exports = adminController;  