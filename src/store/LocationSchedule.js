import { useState } from "react";
import rainy from "../assets/img/rainy-weather.png";
import rainys from "../assets/img/rainys-weather.png";
import windy from "../assets/img/windy-weather.png";
import weather from "../assets/img/weather.png";
const initialLocationSchedule = [
  {
    name: "Miếu Trấn Biên Đồng Nai",
    address: "XR72+RH9, Bửu Long, Thành phố Biên Hòa, Đồng Nai, Việt Nam",
    img: weather,
    coord: [106.80145559337018, 10.96438893531851],
    lat: 10.96438893531851,
    lng: 106.80145559337018,
    km: 58,
    soGio: 40,
    dacSan: "Miếu đền thờ",
    danhMuc: "danhMuc Miếu",
    anh: "https://lh5.googleusercontent.com/p/AF1QipO3QqI-IfO5i9NMO_7DN2mRc932oF6UtO9_rl5u=w426-h240-k-no",
    id: "2",
  },
  {
    name: "Thành Cổ Biên Hòa",
    address:
      "XR28+5PH, Phan Chu Trinh, Quang Vinh, Thành phố Biên Hòa, Đồng Nai, Việt Nam",
    img: windy,
    coord: [106.81677437892449, 10.950895993467014],
    lat: 10.950895993467014,
    lng: 106.81677437892449,
    km: 24,
    soGio: 70,
    dacSan: "Thành cổ",
    danhMuc: "danhMuc Thành cổ",
    anh: "https://lh5.googleusercontent.com/p/AF1QipPzDcOwFQgQ4v1ZoDsKSvFrnUk9Ex_1Fz6K9ew=w408-h306-k-no",
    id: "3",
  },
  {
    name: "Nhà Thờ Biên Hòa",
    address:
      "174 Cách Mạng Tháng 8, Quyết Thắng, Thành phố Biên Hòa, Đồng Nai, Việt Nam",
    coord: [106.81853773433079, 10.945929705915788],
    lat: 10.945929705915788,
    lng: 106.81853773433079,
    km: 98,
    soGio: 93,
    dacSan: "Nhà Thờ",
    danhMuc: "danhMuc Nhà Thờ",
    anh: "https://lh5.googleusercontent.com/p/AF1QipNyDFlrYern8o8tWbF-SHDSkBp5ZdaOrGNEeU70=w408-h272-k-no",
    id: "4",
  },
  {
    name: "SVD Đồng Nai",
    address: "XV66+MRJ, Kp3, Thành phố Biên Hòa, Đồng Nai, Việt Nam",
    coord: [106.86291464748422, 10.961673968714592],
    lat: 10.961673968714592,
    lng: 106.86291464748422,
    km: 37,
    soGio: 4,
    dacSan: "SVD",
    danhMuc: "danhMuc SVD",
    anh: "https://lh5.googleusercontent.com/p/AF1QipPnaoT7kB-t2WyoarlloWgTW0EBo5R1hh6cKAqt=w408-h306-k-no",
    id: "5",
  },
  {
    name: "Tiệm cà phê HonDa",
    address: "XVFV+W9R, khu pho 8A, Thành phố Biên Hòa, Đồng Nai, Việt Nam",
    coord: [106.89321528505099, 10.974983969328107],
    lat: 10.974983969328107,
    lng: 106.89321528505099,
    km: 1,
    soGio: 88,
    dacSan: "Tiệm cà phê",
    danhMuc: "danhMuc Quán",
    anh: "https://lh5.googleusercontent.com/p/AF1QipOdLwUgxnDsdcwN65HnYHIcMPCJNjExv_RmEqvf=w426-h240-k-no",
    id: "6",
  },
];

export const useLocationSchedule = () => {
  const [locationSchedule, setLocationSchedule] = useState(
    initialLocationSchedule
  );

  return { locationSchedule, setLocationSchedule };
};
