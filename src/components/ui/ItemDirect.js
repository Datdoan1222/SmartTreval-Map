import React, { useState, useEffect } from "react";
import goongjs from "@goongmaps/goong-js";
import mapboxgl from "mapbox-gl";
import GoongGeocoder from "@goongmaps/goong-geocoder";
import axios from "axios";
import polyline from "@mapbox/polyline";
import goong from "@goongmaps/goong-sdk";

// import "../../contans/styles/HeaderLeft.scss";
import mapPin from "../../assets/img/pin.png";
// import mapPin from "../../assets/img/map-pin.png";
import restaurantItem from "../../assets/img/restaurant-item.png";
import {
  MdOutlineDirections,
  MdDirectionsWalk,
  MdOutlineDirectionsBike,
  MdOutlineAirplanemodeActive,
  MdDirectionsCar,
  MdOutlineTrain,
} from "react-icons/md";
import { IoCarOutline } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";
import { FaMotorcycle } from "react-icons/fa";
import { HiMiniArrowsUpDown } from "react-icons/hi2";
import { RxDotFilled, RxDot, RxDotsVertical } from "react-icons/rx";
import { GoClock } from "react-icons/go";
import { REACT_APP_GOONG_API_KEY } from "../../store/api";

function ItemDirect({ selectedItem, onItem, mapRef }) {
  const goongClient = require("@goongmaps/goong-sdk");
  const goongDirections = require("@goongmaps/goong-sdk/services/directions");
  const baseClient = goongClient({
    accessToken: REACT_APP_GOONG_API_KEY,
  });
  const directionService = goongDirections(baseClient);

  const [waypoints, setWaypoints] = useState([
    { name: "Point A", location: "Hanoi, Vietnam" },
    { name: "Point B", location: "Ho Chi Minh City, Vietnam" },
    { name: "Point C", location: "Da Nang, Vietnam" },
  ]);
  const [locations, setLocations] = useState([
    { name: "Hồ Chí Minh", address: "Hồ Chí Minh, Vietnam" },
    { name: "Đồng Nai", address: "Đồng Nai, Vietnam" },
    { name: "Bình Dương", address: "Bình Dương, Vietnam" },
  ]);
  const url = "https://rsapi.goong.io/geocode?address";

  // const [startPoint, setStartPoint] = useState("");
  // const [endPoint, setEndPoint] = useState("");
  const startPoint = locations[0].address;
  const endPoint = locations[1].address;

  const setOrigin = (location) => {
    // Chỉ định điểm bắt đầu (tự động)
    return startPoint;
  };

  const setDestination = (location) => {
    // Chỉ định điểm kết thúc (tự động)
    return endPoint;
  };
  // const getDirections = async () => {
  //   if (waypoints.length < 2) {
  //     alert("Please add at least two waypoints");
  //     return;
  //   }

  //   const locations = waypoints.map((waypoint) => waypoint.location);

  //   try {
  //     const response = await axios.get(
  //       `${url}=${locations.join(
  //         "&address="
  //       )}&api_key=${REACT_APP_GOONG_API_KEY}`
  //     );
  //     const points = response.data.results;

  //     if (points.length < 2) {
  //       alert("Could not retrieve location coordinates for all waypoints");
  //       return;
  //     }

  //     setWaypoints((prevWaypoints) => {
  //       const newWaypoints = [];
  //       for (let i = 0; i < points.length; i++) {
  //         const point = points[i];
  //         if (
  //           point.geometry.location &&
  //           !isNaN(point.geometry.location.lat) &&
  //           !isNaN(point.geometry.location.lng)
  //         ) {
  //           newWaypoints.push({
  //             ...prevWaypoints[i],
  //             lat: point.geometry.location.lat,
  //             lng: point.geometry.location.lng,
  //           });
  //         } else {
  //           alert("Invalid location coordinates");
  //           return;
  //         }
  //       }
  //       console.log("====================================");
  //       console.log(newWaypoints);
  //       console.log("====================================");
  //       return newWaypoints;
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    mapRef.on('load', function () {
      var layers = mapRef.getStyle().layers;

      var firstSymbolId;
      for (var i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol') {
          firstSymbolId = layers[i].id;
          break;
        }
      }
      if (startPoint) {
        var el = document.createElement('div');
        el.style.backgroundColor = "red";
        el.style.width = '20px';
        el.style.height = '20px';
        el.style.borderRadius = "50%";
        var marker = new goongjs.Marker(el)
          .setLngLat([startPoint.lng, startPoint.lat])
          .addTo(mapRef);
      }
      if (endPoint) {
        var marker = new goongjs.Marker()
          .setLngLat([endPoint.lng, endPoint.lat])
          .addTo(mapRef);
      }
      mapRef.flyTo({
        center: [startPoint.lng, startPoint.lat],
        essential: true,
      });
      directionService
        .getDirections({
          origin: `${startPoint.lat},${startPoint.lng}`,
          destination: `${endPoint.lat},${endPoint.lng}`,
          vehicle: 'car',
        })
        .send()
        .then(function (response) {
          var directions = response.body;
          var route = directions.routes[0];

          var geometry_string = route.overview_polyline.points;
          var geoJSON = polyline.toGeoJSON(geometry_string);
          mapRef.addSource('route', {
            type: 'geojson',
            data: geoJSON,
          });
          mapRef.addLayer(
            {
              id: 'route',
              type: 'line',
              source: 'route',
              layout: {
                'line-join': 'round',
                'line-cap': 'round',
              },
              paint: {
                'line-color': 'rgb(0, 153, 255)',
                'line-width': 8,
              },
            },
            firstSymbolId
          );
        });
    });
  }, [startPoint, endPoint]);


  const icons = [
    { icon: MdOutlineDirections, tooltip: "Phương tiện đi lại tốt nhất" },
    { icon: IoCarOutline, tooltip: "Lái xe" },
    { icon: MdOutlineTrain, tooltip: "Phương tiện công cộng" },
    { icon: MdDirectionsWalk, tooltip: "Đi bộ" },
    { icon: FaMotorcycle, tooltip: "Đi xe máy" },
    { icon: MdOutlineAirplanemodeActive, tooltip: "Chuyến bay" },
  ];
  const iconsAbout = [
    { icon: restaurantItem, tooltip: "Nhà hàng" },
    { icon: restaurantItem, tooltip: "Khách sạn" },
    { icon: restaurantItem, tooltip: "Đặc sản" },
    { icon: restaurantItem, tooltip: "Bệnh viện" },
    { icon: restaurantItem, tooltip: "Bảo tàng" },
    { icon: restaurantItem, tooltip: "Điểm tham quan" },
  ];
  const allLocations = [
    "Thành phố Hồ Chí Minh",
    "Hà Nội",
    "Đà Nẵng",
    "Hải Phòng",
    "Cần Thơ",
    "Nha Trang",
    // Thêm các địa điểm khác tại đây
  ];
  const [suggestions, setSuggestions] = useState([]);

  const handleInput = (e) => {
    const inputValue = e.target.value;
    const matchingLocations = allLocations.filter((location) =>
      location.toLowerCase().includes(inputValue.toLowerCase())
    );
    // Cập nhật danh sách gợi ý dựa trên dữ liệu đã lọc
    setSuggestions(matchingLocations);
  };
  const handleSuggestionClick = (selectedLocation) => {
    // setStartPoint(selectedLocation);
    // Đóng danh sách gợi ý sau khi người dùng chọn
    setSuggestions([]);
  };

  const [selectedIcon, setSelectedIcon] = useState(null);
  const VehicleItem = ({ iconName, tooltip }) => {
    const IconComponent = iconName;

    const handleItemClick = () => {
      setSelectedIcon(iconName);
    };
    return (
      <div className="vehicle-item" onClick={handleItemClick}>
        <IconComponent className="vehicle-icon" size={35} color="#000" />
        <div className="tooltip">{tooltip}</div>
      </div>
    );
  };
  return (
    <div className="item-info">
      <div className="vehicle">
        {icons.map((item, index) => (
          <VehicleItem
            key={index}
            iconName={item.icon}
            tooltip={item.tooltip}
          />
        ))}
        <div className="vehicle-item" onClick={onItem}>
          <AiOutlineClose
            className="vehicle-icon-exit"
            size={35}
            color="#000"
            style={{ paddingTop: 10 }}
          />
        </div>
      </div>
      <div className="direct">
        <div>
          <div>
            <RxDotFilled size={30} />
          </div>
          <div>
            <RxDotsVertical size={30} color="gray" />
          </div>
          <div>
            <img src={mapPin} alt="pin" style={{ width: 30 }} />
            {/* <RxDot size={30} /> */}
          </div>
        </div>
        <div className="direct-input">
          <input
            style={{
              width: 300,
              height: 50,
              borderRadius: 10,
              marginBottom: 10,
              paddingLeft: 15,
            }}
            type="text"
            placeholder="Chọn điểm bắt đầu"
            value={startPoint}
            // onChange={handleStartPointChange}
            onInput={handleInput}
          />
          <input
            style={{
              width: 300,
              height: 50,
              borderRadius: 10,
              marginTop: 10,
              paddingLeft: 15,
            }}
            type="text"
            placeholder="Chọn điểm đến"
            value={endPoint}
            // onChange={handleEndPointChange}
            onInput={handleInput}
          />
          {waypoints.map((waypoint, index) => (
            <input
              key={index}
              type="text"
              value={waypoint.location}
              onChange={(e) => updateWaypointLocation(index, e.target.value)}
              placeholder={`Điểm ${waypoint.name}`}
            />
          ))}
          <button className="btn" onClick={addWaypoint}>
            Thêm điểm
          </button>
          {/* <button onClick={() => getDirections()}>Get Directions</button> */}
        </div>
        <div>
          <HiMiniArrowsUpDown size={30} style={{ marginLeft: 10 }} />
        </div>
      </div>
      <div className="feature">
        {suggestions.map((suggestion, index) => (
          <div
            className="item-feature"
            key={index}
            onClick={() => handleSuggestionClick(suggestion)}
          >
            <div className="item-feature-icon">
              <GoClock className="item-feature-icon" size={30} />
            </div>
            <div className="item-feature-text">
              <span className="item-feature-text">{suggestion}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="about">
        <div className="item-about">
          <div className="item-about-title">
            <p>Khám phá xung quanh</p>
            <p>&nbsp;</p>
            <p>{/* {my position} */} Bửu Long</p>
          </div>
          <div className="item-about-content">
            {iconsAbout.map((item, index) => {
              return (
                <div key={index} className="item-content">
                  <img
                    src={item.icon}
                    style={{ width: 55 }}
                    alt={item.tooltip}
                  />
                  <p>{item.tooltip}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
  function addWaypoint() {
    setWaypoints((prevWaypoints) => [...prevWaypoints, { location: "" }]);
  }

  function updateWaypointLocation(index, newLocation) {
    setWaypoints((prevWaypoints) => {
      const updatedWaypoints = [...prevWaypoints];
      updatedWaypoints[index].location = newLocation;
      return updatedWaypoints;
    });
  }
}

export default ItemDirect;
