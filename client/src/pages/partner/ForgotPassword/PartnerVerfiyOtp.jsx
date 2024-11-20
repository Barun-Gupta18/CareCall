import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect } from "react";
import { Server_URL } from "../../../utils/config";
import { useNavigate } from "react-router-dom";
import { showSuccessToast, showErrorToast } from "../../../utils/Toasthelper";

function PartnerVerifyOTP() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm();

  async function onSubmit(data) {

    const email = localStorage.getItem('email');

    try {
      const payload = { ...data, email };  // Add the OTP to form data
      // console.log(payload)
      const url = Server_URL + "partner-verify-otp";
      const response = await axios.post(url, payload);
      const { error, message } = response.data;

      if (error) {
        showErrorToast(message);
      } else {
        showSuccessToast(message);
        navigate("/partner-reset-password");
      }
    } catch (e) {
      showErrorToast(e.message);
    }
  }

  useEffect(() => {
    setFocus("otp");
  }, []);

  return (
    <div className="container py-5">
      <h3 style={{ textAlign: 'center' }}>Verify OTP</h3>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="card shadow-lg">
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label>Enter OTP</label>
                  <input
                    {...register("otp", { required: true })}
                    className="form-control"
                    type="text"
                    placeholder="Enter the OTP sent to your email"
                  />
                  <br />
                  {errors.otp && <p className="text-danger">This field is required</p>}
                </div>
                <button className="btn btn-warning mt-2">Verify OTP</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PartnerVerifyOTP;