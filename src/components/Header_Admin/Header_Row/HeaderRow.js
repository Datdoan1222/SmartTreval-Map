import logo from "../../../assets/img/logo.jpg";
import user from "../../../assets/img/user.png";
import { BsSearch } from "react-icons/bs";
import styled from "styled-components";
import ItemSearch from "../../ui/ItemSearch";

const HeaderRow = ({ searchKeyword, setSearchKeyword }) => {
  return (
    <HeadRow>
      <div className="main-header">
        <div className="item-left">
          <div className="logo-container">
            <img src={logo} atl="logo" className="image" />
          </div>
        </div>
        <div className="item-right">
          <div className="right">
            <ItemSearch
              searchKeyword={searchKeyword}
              setSearchKeyword={setSearchKeyword}
            />
            <div className="user-info-container">
              <span className="user-info image">Admin</span>
              <img src={user} />
            </div>
          </div>
        </div>
      </div>
    </HeadRow>
  );
};

export default HeaderRow;

const HeadRow = styled.div`
  top: 0;
  position: fixed;
  img {
    width: 60px;
  }

  .main-header {
    display: flex;
    justify-content: space-between;
    width: 100vw;
    height: 72px;
    align-items: center;
    background-color: #fff;
    padding: 16px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .item-left {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
  }

  .logo-container {
    margin-right: 16px;
  }

  .image {
    width: 80px;
  }

  .item-right {
    display: flex;
    flex: 4;
    justify-content: flex-end;
    flex-direction: row;
    align-items: center;
  }
  .right {
    display: flex;
    width: 30vw;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .user-info-container {
    display: flex;
    align-items: center;
  }

  .user-info {
    margin-right: 8px;
  }

  .user-image {
    width: 30px;
    border-radius: 50%;
  }
`;
