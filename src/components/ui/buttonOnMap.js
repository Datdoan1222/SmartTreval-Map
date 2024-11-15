import React, { useState } from "react";
import { BsPinMap } from "react-icons/bs";

function ButtonOnMap() {
  const [isHovered, setHovered] = useState(false);

  return (
    <div
      style={{
        width: "50px",
        height: "50px",
        backgroundColor: isHovered ? "#e0e0e0" : "white",
        position: "absolute",
        right: "20px",
        bottom: "100px",
        borderRadius: 50,
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        transition: "background-color 0.3s ease", // Thêm transition cho hiệu ứng mượt mà
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button onClick={() => {}}>
        <BsPinMap
          size={30}
          style={{
            alignItems: "center",
            lineHeight: 50,
          }}
        />
      </button>
    </div>
  );
}

export default ButtonOnMap;
