import React from "react";
import "../../../contans/styles/log.scss";
import bachgroundLog from "../../../assets/img/bachgroundLog.png";
import logo from "../../../assets/img/logo.jpg";
import HeaderLog from "../../../components/log/HeaderLog";
import ItemLeft from "../../../components/log/ItemLeft";
import ItemRight from "../../../components/log/ItemRight";
import SetPassForm from "../../../components/log/phone/SetPassForm";

const SetPassword = () => {
  return (
    <div className="container">
      <HeaderLog logo={logo} />
      <div className="body">
        <img src={bachgroundLog} className="image" alt="bachground" />
        <div className="body-item">
          <ItemLeft title="Du Lịch Thông Minh" />
          <ItemRight
            title="Tạo Mật Khẩu"
            textTitle="Nhập 10 chữ số có kí tự in hoa"
          >
            <SetPassForm />
          </ItemRight>
        </div>
      </div>
    </div>
  );
};

export default SetPassword;
