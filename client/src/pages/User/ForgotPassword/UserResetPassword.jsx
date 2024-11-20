import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect } from "react";
import { Server_URL } from "../../../../utils/config";
import { useNavigate } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../../../utils/Toasthelper";

function UserResetPassword() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
  } = useForm();

  async function onSubmit(data) {

    const email = localStorage.getItem('email');

    try {
      const payload = { ...data, email };  // Add the OTP to form data
      // console.log(payload)

      const url = Server_URL + "user-reset-password";
      const response = await axios.post(url, payload);
      const { error, message } = response.data;

      if (error) {
        showErrorToast(message);
      } else {
        showSuccessToast(message);
        reset();
        localStorage.removeItem('email');
        navigate("/user-login");
      }
    } catch (e) {
      showErrorToast(e.message);
    }
  }

  useEffect(() => {
    setFocus("newpassword");
  }, []);

  return (
    <div className="container py-5">
      <h3 style={{ textAlign: 'center' }}>Reset Password</h3>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="card shadow-lg">
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label>New Password</label>
                  <input
                    {...register("newpassword", { required: true })}
                    className="form-control"
                    type="password"
                    placeholder="Enter your New Password"
                  />
                  <br />
                  {errors.newpassword && <p className="text-danger">This field is required</p>}
                </div>
                <div className="mb-3">
                  <label>Confirm Password</label>
                  <input
                    {...register("confirmpassword", { required: true })}
                    className="form-control"
                    type="password"
                    placeholder="Confirm your New Password"
                  />
                  <br />
                  {errors.confirmpassword && <p className="text-danger">This field is required</p>}
                </div>
                <button className="btn btn-warning mt-2">Reset Password</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UserResetPassword;