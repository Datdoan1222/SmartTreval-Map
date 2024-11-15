import React, { useRef, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import goongjs from "@goongmaps/goong-js";
import mapboxgl from "mapbox-gl";
import GoongGeocoder from "@goongmaps/goong-geocoder";
import polyline from "@mapbox/polyline";
import axios from "axios";

import logo from "../../assets/img/map-pin.png";
import DHLH1 from "../../assets/img/dh-lac-hong.webp";
import DHLH2 from "../../assets/img/DHLH2.jpg";
import KDLBL from "../../assets/img/KDLBL.jpg";

import HeaderTop from "../../components/ui/HeaderTop";
import HeaderLeft from "../../components/ui/HeaderLeft";

import { MdOutlineMyLocation } from "react-icons/md";
import "../../contans/styles/goong-geocoder.scss";
import {
  REACT_APP_GOONG_API_KEY,
  REACT_APP_GOONG_MAP_KEY,
} from "../../store/api";
import { useLocationSchedules } from "../../store/LocationSchedules";

import ItineraryTips from "./ItineraryTips";
import getUserLocation from "../../components/mandates/geolocation";
import { createCustomMarker } from "../../components/mandates/markerUtils";
import LocationInfo from "../../components/mandates/LocationInfo";
import Evaluate from "../../components/mandates/Evaluate";
import { useLocationSchedule } from "../../store/LocationSchedule";

function Home() {
  const [showLocationDetails, setShowLocationDetails] = useState(false);
  const [selectedLocationInfo, setSelectedLocationInfo] = useState(null);
  const goongClient = require("@goongmaps/goong-sdk");
  const goongDirections = require("@goongmaps/goong-sdk/services/directions");
  const baseClient = goongClient({ accessToken: REACT_APP_GOONG_API_KEY });
  const directionService = goongDirections(baseClient);
  const [userLocation, setUserLocation] = useState(null);
  const [lat, setLat] = useState(10.953622495263133);
  const [lng, setLng] = useState(106.80259099346307);
  const [origin, setOrigin] = useState({});
  const [destination, setDestination] = useState({});
  const directionsUrl = "https://rsapi.goong.io/geocode?address";
  const mapContainer = useRef(null);
  const initializedMap = useRef(null);
  const [map, setMap] = useState(null);

  const { locationSchedule, setLocationSchedule } = useLocationSchedule();
  const { locationSchedules, setLocationSchedules } = useLocationSchedules([
    {
      key: "1",
      name: "my location",
      address: "my location",
      coord: [lng, lat],
      lat: lat,
      lng: lng,
      type: "position",
    },
  ]);

  const [locations, setLocations] = useState([]);
  const [location, setLocation] = useState([]);
  const [coordinates, setCoordinates] = useState(null);

  const [selectLocation, setSelectLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(locationSchedule[0]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://rsapi.goong.io/geocode?address=${selectedLocation.address}&api_key=${REACT_APP_GOONG_API_KEY}`
      );
      const points = response.data;
      setOrigin(points.results[0].geometry.location);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    goongjs.accessToken = REACT_APP_GOONG_MAP_KEY;
    mapboxgl.accessToken = REACT_APP_GOONG_API_KEY;
    initializedMap.current = new goongjs.Map({
      container: mapContainer.current,
      style: "https://tiles.goong.io/assets/goong_map_web.json",
      center: [lng, lat],
      zoom: 16,
      hash: true,
      transformRequest: (url, resourceType) => {
        if (resourceType === "Source" && url.startsWith("http://myHost")) {
          return {
            url: url.replace("http", "https"),
            headers: { "my-custom-header": true },
            credentials: "include",
          };
        }
      },
    });
    setMap(initializedMap.current);
    // Đánh dấu vị trí của tôi
    getUserLocation()
      .then((location) => {
        setLat(location.lat);
        setLng(location.lng);
        const userMarker = new goongjs.Marker({
          element: createCustomMarker("position"), // Sử dụng hàm từ file markerUtils.js
        })
          .setLngLat([location.lng, location.lat])
          .addTo(initializedMap.current);
      })
      .catch((error) => {
        console.error("Error getting user location:", error);
      });

    // thanh search địa điểm
    initializedMap.current.on("load", () => {
      setMap(initializedMap.current);
      initializedMap.current.addLayer({
        id: "points-of-interest",
        source: {
          type: "vector",
          url: "mapbox://mapbox.mapbox-streets-v8",
        },
        "source-layer": "poi_label",
        type: "circle",
        paint: {
          // Mapbox Style Specification paint properties
        },
        layout: {
          // Mapbox Style Specification layout properties
        },
      });
      initializedMap.current.addControl(
        new GoongGeocoder({
          accessToken: REACT_APP_GOONG_API_KEY,
          mapboxgl: mapboxgl,
          zoom: 9,
        })
      );
      initializedMap.current.on("result", (e) => {
        setCoordinates(e.result.geometry.coordinates);
      });
      initializedMap.current.on("click", (e) => {
        const clickedLocation = e.lngLat;
        const newLongitude = clickedLocation.lng;
        const newLatitude = clickedLocation.lat;

        setLng(newLongitude);
        setLat(newLatitude);
        console.log("====================================");
        console.log(newLongitude + "," + newLatitude);
        console.log("====================================");

        // Lấy thông tin địa điểm từ LocationSchedules dựa vào lat và lng
        const clickedLocationInfo = locationSchedules.find((location) => {
          return (
            location.coord[0] === newLongitude &&
            location.coord[1] === newLatitude
          );
        });

        // Nếu tìm thấy thông tin địa điểm, hiển thị Evaluate component
        if (clickedLocationInfo) {
          setSelectedLocationInfo(clickedLocationInfo);
        }
      });
    });
    // thêm các địa điểm
    locationSchedules.map((location) => {
      const type = location.type;
      const marker = new goongjs.Marker({
        element: createCustomMarker(type),
      })
        .setLngLat(location.coord)
        .addTo(initializedMap.current);

      // Add click event listener to each marker
      marker.getElement().addEventListener("click", () => {
        setSelectedLocationInfo(location);
      });

      return marker;
    });

    return () => {
      initializedMap.current.remove();
    };
  }, [locations, locationSchedule]);

  useEffect(() => {
    initializedMap.current.on("load", function () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            var userLocation = {
              name: "Vị trí của tôi",
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            initializedMap.current.flyTo({
              center: [userLocation.lng, userLocation.lat],
              essential: true,
            });

            var layers = initializedMap.current.getStyle().layers;

            var firstSymbolId;
            for (var i = 0; i < layers.length; i++) {
              if (layers[i].type === "symbol") {
                firstSymbolId = layers[i].id;
                break;
              }
            }
            for (let i = 0; i < locationSchedule.length - 1; i++) {
              const startPoint = i === 0 ? userLocation : locationSchedule[i];
              const endPoint = locationSchedule[i + 1];

              if (startPoint) {
                var el = document.createElement("div");
                el.style.backgroundColor = "red";
                el.style.width = "20px";
                el.style.height = "20px";
                el.style.borderRadius = "50%";

                new goongjs.Popup()
                  .setLngLat([startPoint.lng, startPoint.lat])
                  .setHTML(`
                  <div> 
                    <p> ${startPoint.name} </p>
                    <img src=${startPoint.img} alt="image">
                  </div>`)
                  .setOffset(39)
                  .addTo(initializedMap.current);
              }
              if (endPoint) {
                var marker = new goongjs.Marker()
                  .setLngLat([endPoint.lng, endPoint.lat])
                  .addTo(initializedMap.current);
                new goongjs.Popup()
                  .setLngLat([endPoint.lng, endPoint.lat])
                  .setHTML(`<p> ${endPoint.name} </p>`)
                  .setOffset(39)
                  .addTo(initializedMap.current);
              }

              // Use startPoint.lat, startPoint.lng as the origin in the directions service
              directionService
                .getDirections({
                  origin: `${startPoint.lat},${startPoint.lng}`,
                  destination: `${endPoint.lat},${endPoint.lng}`,
                  vehicle: "car",
                })
                .send()
                .then(function (response) {
                  var directions = response.body;
                  var route = directions.routes[0];

                  var geometry_string = route.overview_polyline.points;
                  var geoJSON = polyline.toGeoJSON(geometry_string);
                  initializedMap.current.addSource(`route${i}`, {
                    type: "geojson",
                    data: geoJSON,
                  });
                  initializedMap.current.addLayer(
                    {
                      id: `route${i}`,
                      type: "line",
                      source: `route${i}`,
                      layout: {
                        "line-join": "round",
                        "line-cap": "round",
                      },
                      paint: {
                        "line-color": "rgb(0, 153, 255)",
                        "line-width": 8,
                      },
                    },
                    firstSymbolId
                  );
                });
            }
          },
          function (error) {
            // Handle geolocation error
            console.error("Error getting user's location:", error.message);
          }
        );
      } else {
        // Geolocation is not supported
        console.error("Geolocation is not supported by this browser.");
      }
    });
  }, [selectedLocation]);

  return (
    <div>
      <div ref={mapContainer} style={{ height: "100vh" }} />
      {selectedLocationInfo && (
        <Evaluate
          location={selectedLocationInfo}
          onClose={() => setSelectedLocationInfo(null)}
        />
      )}
      {/* {showLocationDetails &&
        ReactDOM.createPortal(
          <LocationInfo
            latitude={lat}
            longitude={lng}
            onClose={closeLocationDetails}
          />,
          document.body
        )} */}
      <HeaderTop
        map={map}
        location={location}
        locations={locations}
        setLocation={setLocation}
        // handleAddMarker={handleAddMarker}
        // handleEditMarker={handleEdit}
        // handleDeleteMarker={handleDelete}
        // selectedLocation={selectedLocation}
      />
      <HeaderLeft
        mapRef={map}
        locations={locationSchedule}
        startPoint="Your Start Point"
        endPoint="Your End Point"
      />
      {/* {itineraryTipsVisible && (
        <ItineraryTips
          receivedDat={receivedData}
          setReceivedData={setReceivedData}
        />
      )} */}
      <div
        style={{
          width: "50px",
          height: "50px",
          backgroundColor: "white",
          position: "absolute",
          right: "20px",
          bottom: "100px",
          borderRadius: 50,
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <button onClick={handleSearch}>
          <MdOutlineMyLocation
            size={30}
            style={{
              alignItems: "center",
              lineHeight: 50,
            }}
          />
        </button>
      </div>
    </div>
  );
}

export default Home;
