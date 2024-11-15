import React from "react";
import { Link } from "react-router-dom";

import "../../contans/styles/log.scss";
import bachgroundLog from "../../assets/img/bachgroundLog.png";
import { ImMobile } from "react-icons/im";
import { FcGoogle } from "react-icons/fc";
import logo from "../../assets/img/logo.jpg";
import LoginPhoneForm from "../../components/log/phone/LoginPhoneForm";
import HeaderLog from "../../components/log/HeaderLog";
import ItemLeft from "../../components/log/ItemLeft";
import ItemRight from "../../components/log/ItemRight";
import LoginForm from "../../components/log/email/LoginForm";
import Button from "../../components/ui/Button";
// import logoItem from "../../assets/img/logoItem.png";

const SiginScreen = () => {
  function onClickForgotPass() {}
  return (
    <div className="container">
      <HeaderLog logo={logo} />
      <div className="body">
        <img src={bachgroundLog} className="image" alt="bachground" />
        <div className="body-item">
          <ItemLeft title="Du Lịch Thông Minh" />
          <ItemRight title="Đăng nhập">
            <LoginForm isLogin onClick={onClickForgotPass} />
            <Link to="/surveyScreen">
              <Button>Đăng nhập</Button>
            </Link>

            <p
              style={{
                marginTop: 10,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Hoặc
            </p>

            <div className="register">
              <div className="register_button">
                <Link to="/siginPhoneScreen">
                  <ImMobile size={30} />
                </Link>
              </div>
              <div className="register_button">
                <Link to="/signupEmailScreen">
                  <FcGoogle size={30} />
                </Link>
              </div>
            </div>
            <div className="line"></div>
          </ItemRight>
        </div>
      </div>
    </div>
  );
};

export default SiginScreen;
