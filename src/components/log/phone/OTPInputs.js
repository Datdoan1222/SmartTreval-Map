import React, { useState } from "react";
import "../../../contans/styles/otp.scss";
// function OTPInput({ length, onComplete }) {
//   const [otp, setOtp] = useState(["", "", "", ""]);
//   const [message, setMessage] = useState("");
//   const handleChange = (e, index) => {
//     const updatedOtp = [...otp];
//     updatedOtp[index] = e.target.value;

//     setOtp(updatedOtp);

//     if (updatedOtp.every((digit) => digit !== "")) {
//       const enteredOTP = updatedOtp.join("");
//       onComplete(enteredOTP);
//     }
//   };
//   return (
//     <div className="OTPInput">
//       {otp.map((digit, index) => (
//         <input
//           key={index}
//           type="text"
//           maxLength="1"
//           value={digit}
//           onChange={(e) => handleChange(e, index)}
//         />
//       ))}
//       <p className="message">{message}</p>
//     </div>
//   );
// }
function OTPInputs({ otpHandler }) {
  const [otp, setOtp] = useState("");
  const [cursorPosition, setCursorPosition] = useState();
  const inputChangeHandler = (e) => {
    setCursorPosition(e.target.selectionStart - 1);
    if (!isNaN(e.target.value)) {
      setOtp(e.target.value);
      otpHandler(otp);
    }
  };

  const caretHandler = (e) => {
    if (Array.from(String(otp), Number).length > e.target.selectionStart)
      setCursorPosition(e.target.selectionStart);
  };

  const backspaceHandler = (e) => {
    if (e.keyCode == 8) {
      e.preventDefault();

      const numberArray = Array.from(String(otp), Number);
      numberArray.splice(cursorPosition, 1);
      if (numberArray.length !== 0) {
        const newOTP = Number(numberArray.join(""));
        setOtp(newOTP);
        otpHandler(otp);
        setCursorPosition(cursorPosition - 1);
      }
      if (numberArray.length === 0) {
        setOtp("");
        otpHandler(otp);
      }
    }
  };
  const itemOtp = (number, index) => {
    return (
      <div
        key={index}
        className={"fakeView" + (cursorPosition === index ? " caret" : "")}
      >
        {number}
      </div>
    );
  };
  return (
    <div>
      <div className="otpError">
        <p>Mã OTP sẽ hết hiệu lực trong 1 phút.</p>
      </div>
      <div className="otp">
        <input
          className="input"
          type="tel"
          minLength="1"
          maxLength="4"
          size="4"
          value={otp}
          onKeyDown={backspaceHandler}
          onSelect={caretHandler}
          pattern="[1-9]{4}"
          onChange={inputChangeHandler}
        />
        <div className="item-view">
          <div className="item-fakeView">
            <div className={"fakeView" + " caret"}></div>
            <div className="fakeView"></div>
            <div className="fakeView"></div>
            <div className="fakeView"></div>
          </div>
          <div className="item-fakeView">
            {otp &&
              Array.from(otp.toString()).map((number, index) =>
                itemOtp(number, index)
              )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OTPInputs;
