import React from "react";
import "../../contans/styles/log.scss";
function HeaderLog({ logo }) {
  return (
    <div className="header">
      <div className="header-logo">
        <img src={logo} className="image-logo" alt="logo" />
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default HeaderLog;
