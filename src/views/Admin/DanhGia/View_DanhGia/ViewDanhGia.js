import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { LiaUserEditSolid } from "react-icons/lia";
import { MdDelete } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { format } from "date-fns";

const ViewDanhGia = () => {
  //popup
  const [show, setShow] = useState(false);
  //add data

  const [editing, setEditing] = useState("");

  const [title, setTitle] = useState([
    "STT",
    "Địa điểm",
    "Ảnh",
    "Tên",
    "Thời gian",
    "Đánh giá",
    "Bình luận",
    "Hành động",
  ]);

  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("https://64f195d50e1e60602d23f89d.mockapi.io/qlailap/danhgia")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }, []);
  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "dd/MM/yyyy");
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid Date";
    }
  };
  return (
    <ViewC>
      <div className="viewContainer">
        <table className="tbl">
          <tr className="title-data">
            {title.map((t) => {
              return <th key={t}>{t}</th>;
            })}
          </tr>

          {data.map((u, index) => (
            <tr
              id="listViewData"
              className={`user-item-${index} ${
                index % 2 === 1 ? "even-row" : ""
              }`}
            >
              <td data-lable="STT" key={index}>
                {index + 1}
              </td>
              <td data-lable="Địa điểm" key={u.diaDiem}>
                {u.diaDiem}
              </td>
              <td className="avt-data" data-lable="Hình ảnh" key={u.anh}>
                {u.anh && (
                  <img
                    className="avt"
                    src={u.anh}
                    alt={"ảnh " + (index + 1)}
                    style={{ width: "40px", height: "40px" }}
                  />
                )}
              </td>
              <td data-lable="Tên" key={u.ten}>
                {u.ten}
              </td>
              <td data-label="Thời gian" key={u.thoiGian}>
                {formatDate(u.thoiGian)}
              </td>
              <td data-lable="Đánh giá" key={u.danhGia}>
                <div className="rating-stars">
                  {[...Array(5)].map((_, index) => (
                    <FaStar
                      key={index}
                      className={index < u.danhGia ? "star filled" : "star"}
                      style={{ color: index < u.danhGia ? "gold" : "black" }}
                    />
                  ))}
                </div>
              </td>
              <td data-lable="Bình luận" key={u.binhLuan}>
                {u.binhLuan}
              </td>
              {/* <td data-lable='Email' key={u.email}>{u.email}</td> */}

              <td data-lable="Chỉnh sửa">
                {" "}
                <MdDelete
                  style={{ color: "#fc424a" }}
                  className="iconDelete"
                />{" "}
              </td>
            </tr>
          ))}
        </table>
      </div>
    </ViewC>
  );
};
export default ViewDanhGia;
const ViewC = styled.div`
  margin-left: 330px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 70vw;
  margin-top: 12vh;

  .viewContainer {
    padding: 0 2vw;
    border-radius: 20px;

    width: 100%;
    display: flex;
    justify-content: center;
  }
  .title-data {
    background-color: #f4f4f4;
    width: 100%;
  }
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  .tbl {
    border-radius: 20px;
    width: 100%;
  }
  tr {
    border-bottom: 1px solid #ccc;
  }
  table {
    border-collapse: collapse;
  }
  tr,
  th,
  td {
    text-align: center;
    padding: 15px;
  }

  td {
    vertical-align: middle;
    font-size: 0.875rem;
    line-height: 1.5;
    white-space: nowrap;
  }

  .navContainer {
    display: flex;
    width: 100%;
    justify-content: space-around;
    margin: 5px 60px;
    margin-bottom: 40px;
    background-color: #191c24;
    padding: 12px 0;
    border-radius: 20px;
  }
  .navSearch {
    margin-right: 5vw;
    display: flex;
    justify-content: flex-end;
  }
  .navButtonAdd {
    display: inline-block;
    font-size: 1em;
    font-weight: bold;
    width: 20vw;
    padding: 8px 10px;
    color: #fff;
    background-color: #0090e7;
    border-color: #0090e7;
    border-radius: 6px;
    cursor: pointer;
    text-align: center;
    overflow: hidden;

    &:hover {
      color: #fff;
      background-color: #0078c1;
      border-color: #0070b4;
    }
  }
  .iconSearch {
    width: 20px;
    height: 20px;
    cursor: pointer;
    color: #000;
    transform: translateX(34px) translateY(10px);
  }
  .navContainer input {
    font-size: 18px;
    width: 20vw;
    border: 2px solid black;
    border-radius: 20px;
    padding-left: 40px;
    &:focus {
      padding-left: 40px;
      cursor: text;
    }
  }

  .addContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 80vh;
    width: 80vw;
    background-color: #ccc;
    z-index: 999999;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    border: 2px solid #ccc;
    color: #000;
  }
  .addInput {
    display: flex;
    justify-content: center;
    margin: 5px 80px;
    flex-direction: column;
  }
  .addContainer input {
    font-size: 19px;
    width: 30vw;
    border: 1px solid #ccd9;
    border-radius: 10px;
    padding-left: 10px;
    cursor: text;
    margin-bottom: 20px;
  }
  .addContainer label {
    text-align: left !important;
    width: 5vw;
    font-weight: bold;
  }

  .addItemInput {
    display: flex;
    align-items: flex-start;

    flex-direction: row;
  }
  .addItemInput label {
    width: 20vw;
  }

  .addButtonAdd {
    font-size: 20px;
    font-weight: bold;
    padding: 10px 50px;
    background-color: #f05123;
    color: #fff;
    border-radius: 10px;
    cursor: pointer;
    text-align: center;
    margin-right: 80px;
  }
  .add {
    background-color: #0090e7;
    border-color: #0090e7;
    &:hover {
      background-color: #0078c1;
      border-color: #0078c1;
    }
  }
  .cancel {
    background-color: #0d0d0d;
    border-color: #0d0d0d;
    &:hover {
      background-color: black;
      border-color: black;
    }
  }
  .addButtonAdd:last-of-type {
    margin-right: 0;
  }

  .inputAvt {
    display: flex;

    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }
  .imputImage {
    width: 60px;
    height: 60px;
    cursor: pointer;
    border-radius: 50%;
    border: 2px solid;
    margin-left: 5vw;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }

  .iteamInputImage {
    width: 30vw;
    display: flex;
  }
  .iteamInputImage input {
    margintop: 8;
    right: 0;
    width: 93;
    left: 0;
    padding: 0;
  }
`;
