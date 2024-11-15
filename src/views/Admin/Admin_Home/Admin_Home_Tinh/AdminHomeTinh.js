import React, { useState } from "react";
import HeaderRow from "../../../../components/Header_Admin/Header_Row/HeaderRow";
import HeaderCol from "../../../../components/Header_Admin/Header_Col/HeaderCol";
import SlideTinh from "../../Tinh/SlideTinh/SlideTinh";
const HomeDanhMuc = () => {
  const [searchKeyword, setSearchKeyword] = useState("");

  return (
    <div>
      <HeaderRow
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
      />
      ,
      <HeaderCol province />,
      <SlideTinh searchKeyword={searchKeyword} />
    </div>
  );
};
export default HomeDanhMuc;
