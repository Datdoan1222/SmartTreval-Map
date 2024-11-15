import styled from "styled-components";
import { BiUser } from "react-icons/bi";
import { BsFillCarFrontFill } from "react-icons/bs";
import { AiFillBook } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

function HeaderCol({ account, assessment, category, place, province }) {
  return (
    <Navigation>
      <Link to="/homeAccount">
        <NavItem style={account && { backgroundColor: "#f1f1f1" }}>
          Người dùng
        </NavItem>
      </Link>
      <Link to="/qldanhgia">
        <NavItem style={assessment && { backgroundColor: "#f1f1f1" }}>
          Đánh giá
        </NavItem>
      </Link>
      <Link to="/qldanhmuc">
        <NavItem style={category && { backgroundColor: "#f1f1f1" }}>
          Danh Mục
        </NavItem>
      </Link>
      <Link to="/qldiadiem">
        <NavItem style={place && { backgroundColor: "#f1f1f1" }}>
          Địa điểm
        </NavItem>
      </Link>
      <Link to="/qltinh">
        <NavItem style={province && { backgroundColor: "#f1f1f1" }}>
          Tỉnh
        </NavItem>
      </Link>
      <ItemLogout
        className="logout-link"
        style={province && { color: "red" }}
        href="#"
      >
        Đăng xuất
      </ItemLogout>
    </Navigation>
  );
}

export default HeaderCol;

const Navigation = styled.div`
  display: block;
  position: fixed;
  top: 0;
  bottom: 0;
  max-width: 20vw;
  max-height: 100vh;
  padding: 0;
  box-shadow: 5px 0px 5px rgba(0, 0, 0, 0.1);
  transition: margin 0.25s ease-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100px; /* Khoảng cách từ trên xuống */
  margin-top: 72px;
`;

const NavItem = styled.div`
  cursor: pointer;
  color: #000; /* Màu chữ của các mục trong thanh header */
  text-decoration: none;
  transition: color 0.3s;
  width: 20vw;
  height: 50px;
  padding: 15px 20px;
  &:hover {
    color: #ffd700; /* Màu chữ khi di chuột qua */
    background-color: #f1f1f1;
  }
  .logout-link:hover {
    color: red;
  }
`;
const ItemLogout = styled.div`
  cursor: pointer;
  color: #000; /* Màu chữ của các mục trong thanh header */
  text-decoration: none;
  transition: color 0.3s;
  width: 20vw;
  height: 50px;
  padding: 15px 20px;
  &:hover {
    color: #ffd700; /* Màu chữ khi di chuột qua */
    background-color: red;
  }
  .logout-link:hover {
    color: red;
  }
`;
// const Navigation = styled.div
//   display: block;
//   position: fixed;
//   top: 0;
//   bottom: 0;
//   width: 100%;
//   max-width: 250px;
//   padding: 0;
//   box-shadow: 5px 0px 5px rgba(0, 0, 0, 0.1);
//   transition: margin 0.25s ease-out;
//   max-height: 100vh;
//   margin-top: 10vh;
//   padding-top: 20px;

//   .head-logo {
//     width: 100%;
//     margin: 0 auto;
//     text-align: center;
//     margin-bottom: 40px;
//   }
//   .nav-item {
//     font-weight: 500;
//     font-size: 18px;
//     line-height: 1.8;
//     cursor: pointer;
//     padding: 8px 18px;
//     display: flex;
//     align-items: center;
//     margin-bottom: 25px;
//   }
//   a {
//     color: #000;
//     text-decoration: none;
//     transition: color 0.25s ease-in-out;
//     width: 100%;
//     position: relative;
//     display: flex;
//   }
//   a:hover {
//     opacity: 0.8;
//   }
//   .iconSearch {
//     cursor: pointer;
//   }
//   .account {
//     color: #8f5fe8;
//   }
//   .car {
//     color: #ffab00;
//   }
//   .status {
//     color: #fc424a;
//   }
//   .title {
//     display: inline-block;
//   }
//   .list-item {
//     padding: 0;
//     width: 100%;
//     margin-left: 20px;
//   }
//   .handleHeader {
//     cursor: pointer;
//   }

//   .nav-item.active {
//     background-color: #0f1015;
//     position: relative;
//   }
// `;
