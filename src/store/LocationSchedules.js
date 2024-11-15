import { useState } from "react";

import logo from "../assets/img/map-pin.png";
import DHLH1 from "../assets/img/dh-lac-hong.webp";
import DHLH2 from "../assets/img/DHLH2.jpg";
import KDLBL from "../assets/img/KDLBL.jpg";
const initialLocationSchedules = [
  {
    name: "Trường Đại học Lạc Hồng (Cơ sở 1)",
    address:
      "10 Huỳnh Văn Nghệ, Bửu Long, Thành phố Biên Hòa, Đồng Nai, Việt Nam",
    img: DHLH1,
    coord: [106.80259099346307, 10.953622495263133],
    lat: 10.953622495263133,
    lng: 106.80259099346307,
    type: "school",
  },
  {
    name: "Trường Đại học Lạc Hồng (Cơ sở 2)",
    address: "15/3B Huỳnh Văn Nghệ, P, Thành phố Biên Hòa, Đồng Nai, Việt Nam",
    img: DHLH2,
    coord: [106.8019764806304, 10.955168472216116],
    lat: 10.955168472216116,
    lng: 106.8019764806304,
    type: "school",
  },
  {
    name: "Trường Đại học Lạc Hồng (Cơ sở 3)",
    address:
      "XQ7Q+F73, Huỳnh Văn Nghệ, Bửu Long, Thành phố Biên Hòa, Đồng Nai, Việt Nam",
    coord: [106.7880358410543, 10.963631660380344],
    lat: 10.963631660380344,
    lng: 106.7880358410543,
    type: "school",
  },
  {
    name: "Khu du lịch Bửu Long",
    address:
      "Huỳnh Văn Nghệ, Khu phố 4, Thành phố Biên Hòa, Đồng Nai, Việt Nam",
    img: KDLBL,
    coord: [106.79046896189277, 10.962601315715261],
    lat: 10.962601315715261,
    lng: 106.79046896189277,
    type: "tourist",
  },
];



export const useLocationSchedules = () => {
  const [locationSchedules, setLocationSchedules] = useState(
    initialLocationSchedules
  );

  return { locationSchedules, setLocationSchedules };
};
