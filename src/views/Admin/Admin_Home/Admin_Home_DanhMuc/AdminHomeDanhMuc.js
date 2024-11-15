import React, { useState } from "react";
import HeaderRow from "../../../../components/Header_Admin/Header_Row/HeaderRow";
import HeaderCol from "../../../../components/Header_Admin/Header_Col/HeaderCol";
import SlideDanhMuc from "../../DanhMuc/Slide_DanhMuc/SlideDanhMuc";
const HomeDanhMuc = () => {
  const [searchKeyword, setSearchKeyword] = useState("");

  return (
    <div>
      <HeaderRow
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
      />
      <HeaderCol category />,
      <SlideDanhMuc searchKeyword={searchKeyword} />
    </div>
  );
};
export default HomeDanhMuc;
