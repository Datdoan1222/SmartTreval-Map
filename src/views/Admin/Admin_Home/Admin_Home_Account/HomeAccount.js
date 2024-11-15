import React, { useState } from "react";
import HeaderRow from "../../../../components/Header_Admin/Header_Row/HeaderRow";
import HeaderCol from "../../../../components/Header_Admin/Header_Col/HeaderCol";
import SlideAcount from "../../Account/Slide_Acount/SlideAcount";
const HomeAccount = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  return (
    <div>
      <HeaderRow
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
      />
      <HeaderCol account />

      <SlideAcount searchKeyword={searchKeyword} />
    </div>
  );
};
export default HomeAccount;
