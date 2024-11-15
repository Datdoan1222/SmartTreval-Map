import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Button from "../../ui/Button";
import "../../../contans/styles/log.scss";
import OTPInputs from "./OTPInputs";
function VerifyOTP() {
  const [message, setMessage] = useState("");
  const handleOTPComplete = async (enteredOTP) => {
    try {
      // Send entered OTP to the server for verification
      const response = await axios.post("/api/verify-otp", { otp: enteredOTP });

      if (response.data.success) {
        setMessage("OTP is valid. Access granted.");
      } else {
        setMessage("OTP is invalid. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setMessage("An error occurred while verifying OTP.");
    }
  };
  const OTP = () => {};
  return (
    <div className="item-right-form">
      <OTPInputs otpHandler={handleOTPComplete} />
      <Link to="/setPassword">
        <Button>Tiếp Tục</Button>
      </Link>
      <div className="otpError">
        <div className="color-OtpError">Không nhận được mã..</div>
        <div>
          <Link to="/verifyPhoneScreen">Gửi lại mã</Link>
        </div>
      </div>
    </div>
  );
}

export default VerifyOTP;
