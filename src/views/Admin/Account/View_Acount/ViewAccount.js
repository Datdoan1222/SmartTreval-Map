import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { LiaUserEditSolid } from "react-icons/lia";
import { MdDelete } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { format } from "date-fns";

const ViewCar = ({ searchKeyword }) => {
  //popup
  const [show, setShow] = useState(false);
  //add data

  const [editing, setEditing] = useState("");

  const [title, setTitle] = useState([
    "STT",
    "Ảnh",
    "Tên",
    "Ngày sinh",
    "Tài khoản",
    "Ngày tạo",
    "Hành động",
  ]);

  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("https://64f195d50e1e60602d23f89d.mockapi.io/qlailap/thietbi")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }, []);

  const [Anh, setAnh] = useState("");
  const [Ten, setTen] = useState("");
  const [NgaySinh, setNgaySinh] = useState("");
  const [TaiKhoan, setTaiKhoan] = useState("");
  const [NgayTao, setNgayTao] = useState("");

  const HandleEdit = (id) => {
    fetch(`https://64f195d50e1e60602d23f89d.mockapi.io/qlailap/thietbi/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Lỗi khi tải thông tin người dùng");
        }
        return response.json();
      })
      .then((data) => {
        setAnh();
        setTen(data.Ten);
        setNgaySinh(data.NgaySinh);
        setTaiKhoan(data.TaiKhoan);
        setNgayTao(data.NgayTao);
        setShow(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleUpdate = (event) => {
    event.preventDefault();
    Promise.all([
      fetch(`https://64f195d50e1e60602d23f89d.mockapi.io/qlailap/thietbi`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Anh,
          Ten,
          NgaySinh,
          TaiKhoan,
          NgayTao,
        }),
      }),
      fetch("https://64f195d50e1e60602d23f89d.mockapi.io/qlailap/thietbi"),
    ])
      .then((responses) => {
        const [updateResponse, usersResponse] = responses;
        if (!updateResponse.ok) {
          throw new Error("Lỗi khi cập nhật thông tin người dùng");
        }
        if (!usersResponse.ok) {
          throw new Error("Lỗi khi tải danh sách người dùng");
        }
        alert("Thông tin người dùng đã được cập nhật thành công");
        return Promise.all([updateResponse.json(), usersResponse.json()]);
      })
      .then((data) => {
        const [updatedUser, updatedData] = data;
        setData(updatedData);
      })
      .then(() => {
        // Đặt lại giá trị mặc định cho các trường nhập liệu

        setAnh();
        setTen("");
        setNgaySinh("");
        setTaiKhoan("");
        setNgayTao("");
        setEditing("");

        // Lấy lại dữ liệu mới từ server và cập nhật lại state của ứng dụng
        fetch("https://64f195d50e1e60602d23f89d.mockapi.io/qlailap/thietbi")
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            setData(data);
          })
          .then(() => {
            setAnh();
            setTen("");
            setNgaySinh("");
            setTaiKhoan("");
            setNgayTao("");

            setEditing("");
          })
          .catch((error) => {
            console.error("Error fetching records:", error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  //nút thoát
  const handleExitAndShow = () => {
    // handleExit();
    setShow(!show);
    // setHideEditImage(true);
  };

  //xem trước ảnh
  const handlePreviewAvatar = (e) => {
    const file = e.target.files[0];
    const fileUrl = URL.createObjectURL(file);
    setAnh(fileUrl);
  };
  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "dd/MM/yyyy");
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid Date";
    }
  };
  const filteredData = data.filter((item) => {
    return (
      item.Ten.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.TaiKhoan.toLowerCase().includes(searchKeyword.toLowerCase())
      // Add more conditions for other fields as needed
      // Example: item.NgaySinh.includes(searchKeyword)
    );
  });
  return (
    <ViewC>
      <div className="viewContainer">
        <table className="tbl">
          <tr className="title-data">
            {title.map((t) => {
              return <th key={t}>{t}</th>;
            })}
          </tr>
          {searchKeyword.length > 0
            ? // Display filtered data if there is a search keyword
              filteredData.map((u, index) => (
                <tr
                  id="listViewData"
                  className={`user-item-${index} ${
                    index % 2 === 1 ? "even-row" : ""
                  }`}
                >
                  <td data-lable="STT" key={index}>
                    {index + 1}
                  </td>
                  <td className="avt-data" data-lable="Hình ảnh" key={u.Anh}>
                    {u.Anh && (
                      <img
                        className="avt"
                        src={u.Anh}
                        alt={"ảnh " + (index + 1)}
                        style={{ width: "40px", height: "40px" }}
                      />
                    )}
                  </td>
                  <td data-lable="Tên" key={u.Ten}>
                    {u.Ten}
                  </td>
                  <td data-label="Ngày sinh" key={u.NgaySinh}>
                    {formatDate(u.NgaySinh)}
                  </td>
                  <td data-lable="Tài khoản" key={u.TaiKhoan}>
                    {u.TaiKhoan}
                  </td>
                  <td data-lable="Ngày tạo" key={u.NgayTao}>
                    {formatDate(u.NgayTao)}
                  </td>
                  {/* <td data-lable='Email' key={u.email}>{u.email}</td> */}

                  <td data-lable="Chỉnh sửa">
                    {" "}
                    <LiaUserEditSolid
                      style={{ color: "#ffab00", marginRight: "10" }}
                      className="iconEdit"
                      onClick={() => {
                        HandleEdit(u.id);
                        setShow(!show);
                      }}
                    />{" "}
                    <MdDelete
                      style={{ color: "#fc424a" }}
                      className="iconDelete"
                    />{" "}
                  </td>
                </tr>
              ))
            : // Display the entire dataset if there is no search keyword
              data.map((u, index) => (
                <tr
                  id="listViewData"
                  className={`user-item-${index} ${
                    index % 2 === 1 ? "even-row" : ""
                  }`}
                >
                  <td data-lable="STT" key={index}>
                    {index + 1}
                  </td>
                  <td className="avt-data" data-lable="Hình ảnh" key={u.Anh}>
                    {u.Anh && (
                      <img
                        className="avt"
                        src={u.Anh}
                        alt={"ảnh " + (index + 1)}
                        style={{ width: "40px", height: "40px" }}
                      />
                    )}
                  </td>
                  <td data-lable="Tên" key={u.Ten}>
                    {u.Ten}
                  </td>
                  <td data-label="Ngày sinh" key={u.NgaySinh}>
                    {formatDate(u.NgaySinh)}
                  </td>
                  <td data-lable="Tài khoản" key={u.TaiKhoan}>
                    {u.TaiKhoan}
                  </td>
                  <td data-lable="Ngày tạo" key={u.NgayTao}>
                    {formatDate(u.NgayTao)}
                  </td>
                  {/* <td data-lable='Email' key={u.email}>{u.email}</td> */}

                  <td data-lable="Chỉnh sửa">
                    {" "}
                    <LiaUserEditSolid
                      style={{ color: "#ffab00", marginRight: "10" }}
                      className="iconEdit"
                      onClick={() => {
                        HandleEdit(u.id);
                        setShow(!show);
                      }}
                    />{" "}
                    <MdDelete
                      style={{ color: "#fc424a" }}
                      className="iconDelete"
                    />{" "}
                  </td>
                </tr>
              ))}
        </table>
      </div>

      {show && (
        <div className="addContainer">
          {editing ? (
            <h1 style={{ marginBottom: "50px", fontSize: "1.5em" }}>{}</h1>
          ) : (
            <h1
              style={{
                marginBottom: "50px",
                fontSize: "2.5em",
                fontWeight: "bold",
                color: "#8f5fe8",
              }}
            >
              Thông tin
            </h1>
          )}

          <div className="inputAvt">
            <div
              className="addItemInput"
              style={{ justifyContent: "space-between" }}
            >
              <label>Hình ảnh:</label>

              <div className="iteamInputImage" style={{ width: "100" }}>
                <input
                  id="anhInput"
                  type="file"
                  onChange={handlePreviewAvatar}
                  accept="image/*"
                  // onChange={handlePreviewAvatar}
                  style={{
                    marginTop: 8,
                    right: 0,
                    width: 93,
                    left: 0,
                    padding: 0,
                  }}
                />

                <div className="imputImage">
                  {Anh && <img src={Anh} alt="Preview Avatar" width="20%" />}
                </div>
              </div>
            </div>
          </div>

          <div className="addItemInput">
            <label> Tên: </label>
            <input
              id="inputTen"
              onChange={(e) => setTen(e.target.value)}
              value={Ten}
              type="text"
              name="Ten"
              placeholder="Nhập tên"
            />
          </div>
          <div className="addItemInput">
            <label> Ngày Sinh: </label>
            <input
              id="inputNgaySinh"
              onChange={(e) => setNgaySinh(e.target.value)}
              value={NgaySinh}
              type="date"
              name="NgaySinh"
              placeholder="Nhập Ngày Sinh"
            />
          </div>
          <div className="addItemInput">
            <label> Tài khoản: </label>
            <input
              id="inputTaiKhoan"
              onChange={(e) => setTaiKhoan(e.target.value)}
              value={TaiKhoan}
              type="text"
              name="TaiKhoan"
              placeholder="Nhập Tài Khoản"
            />
          </div>
          <div className="addItemInput">
            <label> Ngày Tạo: </label>
            <input
              id="inputNgayTao"
              onChange={(e) => setNgayTao(e.target.value)}
              value={NgayTao}
              type="date"
              name="NgayTao"
              placeholder="Nhập Ngày Tạo"
            />
          </div>

          <div className="buttonPopup">
            <button className="addButtonAdd cancel" onClick={handleExitAndShow}>
              Thoát
            </button>

            <button className="addButtonAdd add">Xác nhận</button>
          </div>
        </div>
      )}
    </ViewC>
  );
};
export default ViewCar;
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
