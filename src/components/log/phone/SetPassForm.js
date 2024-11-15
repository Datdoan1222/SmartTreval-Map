import React from "react";
import "../../../contans/styles/log.scss";
import Button from "../../ui/Button";
import { Link } from "react-router-dom";
function SetPassForm() {
  return (
    <form className="item-right-form">
      <div className="form-input">
        <input
          className="item-form-input"
          type="text"
          name="Mật khẩu"
          placeholder="Mật khẩu"
        />
      </div>
      <div className="form-input">
        <input
          className="item-form-input"
          type="text"
          name="Nhập lại mật khẩu"
          placeholder="Nhập lại mật khẩu"
        />
      </div>
      <Link to="/home">
        <Button>Tiếp Tục</Button>
      </Link>
    </form>
  );
}

export default SetPassForm;
