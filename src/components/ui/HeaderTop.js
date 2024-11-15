import React, { useState } from "react";
import { Link } from "react-router-dom";

import "../../contans/styles/headerTop.scss";
import { FiSearch } from "react-icons/fi";
import { IoMdRestaurant } from "react-icons/io";
import { FaHotel } from "react-icons/fa6";
import { BiSolidDish, BiSolidBank } from "react-icons/bi";
import { FaHospital } from "react-icons/fa";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";

import userImg from "../../assets/img/user.png";

function HeaderTop({
  location,
  locations,
  setLocation,
  handleAddMarker,
  handleEditMarker,
  handleDeleteMarker,
  selectedLocation,
}) {
  const [locationsData, setLocationsData] = useState([
    { place: "Đặc sản Phú Thọ", km: 50, hours: 2 },
    { place: "Bến Vũng Tàu", km: 35, hours: 3 },
  ]);
  const [saveStates, setSaveStates] = useState(locations.map(() => false));
  const handleSave = (index) => {
    // Thêm xử lý tại đây để lưu dữ liệu khi nút "Lưu" được nhấn
    // Ví dụ: console.log("Lưu dữ liệu tại vị trí " + index);
    const newSaveStates = [...saveStates];
    newSaveStates[index] = !newSaveStates[index];
    setSaveStates(newSaveStates);
  };
  const [isSearchInfoVisible, setIsSearchInfoVisible] = useState(false);

  const handleInputClick = () => {
    setIsSearchInfoVisible(true);
  };

  const handleHideDiv = () => {
    setIsSearchInfoVisible(false);
  };
  return (
    <div className="container-headerTop">
      {/* <div className="headerTop">
        <div className="search">
          <input
            className="input-search"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Tìm kiếm"
            onClick={handleInputClick}
          />
          <button onClick={handleAddMarker} className="btn-search">
            <FiSearch className="icon-search" size={24} color="gray" />
          </button>
        </div>
        <ul>
          {locations.map((location) => (
            <li key={location.key}>
              {location.coord[1]},{location.coord[0]}
              <button onClick={() => handleEditMarker(location.key)}>
                Edit
              </button>
              <button
                onClick={() =>
                  handleDeleteMarker(
                    locations.findIndex((l) => l.key === location.key)
                  )
                }
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

        <div>
          <h3>Selected Location:</h3>
          {selectedLocation && (
            <p>
              Latitude: {selectedLocation._lngLat.lat}, Longitude:{" "}
              {selectedLocation._lngLat.lng}
            </p>
          )}
        </div>
        {isSearchInfoVisible && (
          <div className="search-info">
            <div className="search-content">
              <div className="content">
                <table>
                  <thead>
                    <tr>
                      <th>Địa điểm</th>
                      <th>Số km</th>
                      <th>Số giờ</th>
                      <th>Lưu</th>
                    </tr>
                  </thead>
                  <tbody>
                    {locationsData.map((location, index) => (
                      <tr key={index}>
                        <td>{location.place}</td>
                        <td>{location.km}</td>
                        <td>{location.hours}</td>
                        <td>
                          <button onClick={() => handleSave(index)}>
                            {saveStates[index] ? (
                              <BsBookmarkFill size={20} />
                            ) : (
                              <BsBookmark size={20} />
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="hide">
              <button className="btn-hide" onClick={handleHideDiv}>
                <MdKeyboardArrowLeft size={20} />
              </button>
            </div>
          </div>
        )}
      </div> */}

      <div className="nofiti-container">
        <div className="nofiti-Suggest">
          <div className="item-Suggest">
            <IoMdRestaurant className="icon-search" size={20} color="black" />
            <span>Nhà Hàng</span>
          </div>
          <div className="item-Suggest">
            <FaHotel className="icon-search" size={20} color="black" />
            <span>Khách Sạn</span>
          </div>
          <div className="item-Suggest">
            <BiSolidDish className="icon-search" size={20} color="black" />
            <span>Đặc Sản</span>
          </div>
          <div className="item-Suggest">
            <FaHospital className="icon-search" size={20} color="black" />
            <span>Bệnh Viện</span>
          </div>
          <div className="item-Suggest">
            <BiSolidBank className="icon-search" size={20} color="black" />
            <span>Bảo Tàng</span>
          </div>
        </div>
        <Link to="/homeAccount">
          <div className="user-header">
            <img src={userImg} alt="Your Image" className="image-user" />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default HeaderTop;
