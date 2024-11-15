import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.scss";
import SetPassword from "./log/phone/SetPassword";
import SiginScreen from "./log/SiginScreen";
import VerifyPhoneScreen from "./log/phone/VerifyPhoneScreen";
import Home from "./map/Home";
import ItineraryTips from "./map/ItineraryTips";
import SurveyScreen from "./log/SurveyScreen";
import SiginPhoneScreen from "./log/phone/SiginPhoneScreen";
import SignupEmailScreen from "./log/email/SignupEmailScreen";
import HomeAccount from "./Admin/Admin_Home/Admin_Home_Account/HomeAccount";
import HomeDanhGia from "./Admin/Admin_Home/Admin_Home_DanhGia/AdminHome_DanhGia";
import HomeDanhMuc from "./Admin/Admin_Home/Admin_Home_DanhMuc/AdminHomeDanhMuc";
import HomeDiaDiem from "./Admin/Admin_Home/Admin_Home_DiaDiem/AdminHomeDiaDiem";
import HomeTinh from "./Admin/Admin_Home/Admin_Home_Tinh/AdminHomeTinh";
// import ViewCar from "./Admin/Account/View_Acount/ViewAccount";
function Auth() {
  // return <SiginPhoneScreen />;
  // return <VerifyPhoneScreen />;
  // return <SetPassword />;
  return <Home />;
}
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SiginScreen />} />
        <Route path="/siginPhoneScreen" element={<SiginPhoneScreen />} />
        <Route path="/signupEmailScreen" element={<SignupEmailScreen />} />
        <Route path="/verifyPhoneScreen" element={<VerifyPhoneScreen />} />
        <Route path="/setPassword" element={<SetPassword />} />
        <Route path="/itineraryTips" element={<ItineraryTips />} />
        <Route path="/surveyScreen" element={<SurveyScreen />} />

        <Route path="/home" element={<Home />} />
        <Route path="/homeAccount" element={<HomeAccount />} />
        <Route path="/qldanhgia" element={<HomeDanhGia />} />
        <Route path="/qldanhmuc" element={<HomeDanhMuc />} />
        <Route path="/qldiadiem" element={<HomeDiaDiem />} />
        <Route path="/qltinh" element={<HomeTinh />} />
        {/* <Route path="/viewCar" element={<ViewCar />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
