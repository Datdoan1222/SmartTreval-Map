import React from "react";

function ItemHeaderLeft({ onClick, title, iconName }) {
  const IconComponent = iconName;
  return (
    <div>
      <li className="nav-item" onClick={onClick}>
        <a className="handleHeader">
          <span className="icon">
            <IconComponent className="iconSearch" />
          </span>
          <span className="title">{title}</span>
        </a>
      </li>
    </div>
  );
}

export default ItemHeaderLeft;
