import React from "react";

const LocationInfo = ({ latitude, longitude, onClose }) => {
  return (
    <div
      style={{
        alignItems: "center",
        position: "absolute",
        bottom: 0,
        // left: 0,
        width: 400,
        background: "white",
        padding: "10px",
      }}
    >
      <h3>Thông tin vị trí</h3>
      <p>Latitude: {latitude}</p>
      <p>Longitude: {longitude}</p>
      {/* Thêm các thông tin khác bạn muốn hiển thị */}
      <button onClick={onClose}>Đóng</button>
    </div>
  );
};

export default LocationInfo;
