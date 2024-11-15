import React from "react";
import "../../contans/styles/log.scss";
function Button({ children, onClick }) {
  return (
    <div className="button-container">
      <button onClick={onClick} className="button" type="submit">
        {children}
      </button>
    </div>
  );
}

export default Button;
