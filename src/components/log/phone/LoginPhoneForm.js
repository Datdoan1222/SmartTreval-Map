import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import "../../../contans/styles/log.scss";
import Button from "../../ui/Button";
// import Button from "../../ui/Button";

function LoginPhoneForm() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [valid, setValid] = useState(false);

  const handleChange = (value) => {
    setPhoneNumber(value);
    setValid(validatePhoneNumber(value));
  };
  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberPattern = /^\+?[1-9]\d{1,11}$/;

    return phoneNumberPattern.test(phoneNumber);
  };
  const buttonClick = () => {
    if (valid) {
      console.log(phoneNumber);
    } else {
      alert("Please enter a 10-digit phone number.");
    }
    if (phoneNumber.length > 10) {
      alert("Please enter a 10-digit phone number.");
    }
  };

  return (
    <div className="item-right-form">
      <div className="form-item">
        <PhoneInput
          country={"vn"}
          value={phoneNumber}
          onChange={handleChange}
          inputProps={{
            required: true,
          }}
        />
        {!valid && "Please enter a valid phone number."}
        <Link to="/verifyPhoneScreen">
          <Button>Lấy Mã OTP</Button>
        </Link>
      </div>
    </div>
  );
}

export default LoginPhoneForm;
