import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import {
  BsBookmark,
  BsClockHistory,
  BsFillSignTurnRightFill,
} from "react-icons/bs";
import { IoAddCircleOutline } from "react-icons/io5";
import { GrSchedules } from "react-icons/gr";
import { MdOutlineDirections } from "react-icons/md";

import "../../contans/styles/HeaderLeft.scss";
import ItemHeaderLeft from "./ItemHeaderLeft";
import ItemDirect from "./ItemDirect";
import ItineraryTips from "../../views/map/ItineraryTips";

function HeaderLeft({ mapRef, locations, startPoint, endPoint }) {
  const [isClosed, setIsClosed] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [ItemNameInfo, setItemNameInfo] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleClickToggle = () => {
    setIsClosed(!isClosed);
  };

  const handleClickOverlay = () => {
    if (!isClosed) {
      setIsClosed(true);
    }
  };

  const handleItemClick = (title) => {
    if (selectedItem === title) {
      setSelectedItem(null);
      setShowInfo(false);
    } else {
      setSelectedItem(title);
      setShowInfo(true);
    }
  };
  const ItemInfo = () => {
    setItemNameInfo(selectedItem);
    if (ItemNameInfo === "Chỉ đường") {
      return (
        <ItemDirect
          mapRef={mapRef}
          onItem={() => handleItemClick()}
          selectedItem={selectedItem}
          startPoint={startPoint}
          endPoint={endPoint}
        />
      );
    } else if (ItemNameInfo === "Lịch trình") {
      return <ItineraryTips locations={locations} />;
    }
    return null;
  };

  const ItemDirectClick = () => {
    return (
      <div style={{ width: 500, height: 500, backgroundColor: "black" }}>
        <h1>s</h1>
      </div>
    );
  };
  return (
    <div className={`Container ${isClosed ? "closed" : ""}`}>
      <div className={`nav-head ${isClosed ? "closed" : ""}`}>
        <div
          className="nav-close nav-item"
          style={
            isClosed
              ? { justifyContent: "flex-end" }
              : { justifyContent: "center" }
          }
          onClick={handleClickToggle}
        >
          <span className=" icon-status" style={{ marginRight: 0 }}>
            {isClosed ? (
              <AiOutlineClose size={25} />
            ) : (
              <AiOutlineMenu size={30} />
            )}
          </span>
        </div>
        <div
          className={`overlay ${isClosed ? "show-overlay" : ""}`}
          onClick={handleClickOverlay}
        ></div>
        <ul className={`list-item ${isClosed ? "closed" : ""}`}>
          <ItemHeaderLeft
            onClick={() => handleItemClick("Đã lưu")}
            title="Đã lưu"
            iconName={BsBookmark}
          />
          <ItemHeaderLeft
            onClick={() => handleItemClick("Gần đây")}
            title="Gần đây"
            iconName={BsClockHistory}
          />
          <ItemHeaderLeft
            onClick={() => handleItemClick("Chỉ đường")}
            title="Chỉ đường"
            iconName={MdOutlineDirections}
          />
          <ItemHeaderLeft
            onClick={() => handleItemClick("Lịch trình")}
            title="Lịch trình"
            iconName={GrSchedules}
          />
          <ItemHeaderLeft
            onClick={() => handleItemClick("Thêm chuyến đi")}
            title="Thêm chuyến đi"
            iconName={IoAddCircleOutline}
          />
        </ul>
      </div>
      <ItemInfo />
    </div>
  );
}

export default HeaderLeft;
