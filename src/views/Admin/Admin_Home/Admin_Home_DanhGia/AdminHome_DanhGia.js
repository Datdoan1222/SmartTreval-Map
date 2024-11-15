import React, { useState } from "react";
import HeaderRow from "../../../../components/Header_Admin/Header_Row/HeaderRow";
import HeaderCol from "../../../../components/Header_Admin/Header_Col/HeaderCol";
import SlideDanhGia from "../../DanhGia/Slide_DanhGia/SlideDanhGia";
const HomeDanhGia = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  return (
    <div>
      <HeaderRow
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
      />
      
      <HeaderCol assessment />,
      <SlideDanhGia searchKeyword={searchKeyword} />
    </div>
  );
};
export default HomeDanhGia;
