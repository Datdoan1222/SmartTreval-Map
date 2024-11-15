import React from "react";
import "../../../contans/styles/log.scss";
import bachgroundLog from "../../../assets/img/bachgroundLog.png";
import logo from "../../../assets/img/logo.jpg";
import HeaderLog from "../../../components/log/HeaderLog";
import ItemLeft from "../../../components/log/ItemLeft";
import ItemRight from "../../../components/log/ItemRight";
import VerifyOTP from "../../../components/log/phone/VerifyOTP";

function VerifyPhoneScreen() {
  return (
    <div className="container">
      <HeaderLog logo={logo} />
      <div className="body">
        <img src={bachgroundLog} className="image" alt="bachground" />
        <div className="body-item">
          <ItemLeft title="Du Lịch Thông Minh" />
          <ItemRight
            title="Nhập OTP"
            textTitle="Chúng tôi vừa gửi cho bạn mã gồm 4 chữ số qua số điện thoại"
          >
            <VerifyOTP />
          </ItemRight>
        </div>
      </div>
    </div>
  );
}

export default VerifyPhoneScreen;
