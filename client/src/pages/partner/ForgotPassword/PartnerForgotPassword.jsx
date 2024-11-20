import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { Server_URL } from "../../../utils/config";
import { useNavigate } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../../../utils/Toasthelper";

function PartnerForgetPassword() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [otp, setOtp] = useState(null);

  // Function to generate and set OTP
  const generateOTP = () => {
    const generatedOtp = Math.floor(100000 + Math.random() * 900000);
    setOtp(generatedOtp);
  };

  // Submit form with OTP
  const onSubmit = async (data) => {
    if (!otp) {
      showErrorToast("Please generate the OTP first.");
      return;
    }

    const payload = { ...data, otp };  // Add the OTP to form data
    // console.log(payload)
    try {
      const url = `${Server_URL}partner-forgot-password`;
      const response = await axios.post(url, payload);
      const { error, message } = response.data;

      if (error) {
        showErrorToast(message);
      } else {
        localStorage.setItem('email', data.email);
        navigate("/partner-verify-otp");
        reset();
      }
    } catch (e) {
      showErrorToast(e.message);  // Corrected to show error for failed requests
    }
  };

  return (
    <div className="container py-5">
      <h3 style={{ textAlign: 'center' }}>Partner Forget Password</h3>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="card shadow-lg">
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label>Email</label>
                  <input
                    {...register("email", { required: true })}
                    className="form-control"
                    type="email"
                    placeholder="Enter your Email"
                  />
                  {errors.email && <p className="text-danger">This field is required</p>}
                </div>
                <button type="submit" onClick={generateOTP} className="btn btn-primary mt-2">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PartnerForgetPassword;
