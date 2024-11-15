import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { LiaUserEditSolid } from "react-icons/lia";
import { MdDelete } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { format } from "date-fns";

const ViewDiaDiem = ({ searchKeyword }) => {
  const handle = () => {
    if (IsEdit) {
      handldUpdate();
    } else {
      handleAddData();
    }
  };

  const [title, setTitle] = useState([
    "STT",
    "Tên địa điểm",
    "Vị trí",
    "Mô",
    // "Tỉnh",
    // "Loại hình",
    "Tọa độ",
    "Ảnh",
    "Hành động",
  ]);
  const [data, setData] = useState([]);
  const LayAPI = () => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:3000/location?limit=10&page=1", {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MmU0OWE3NDk4NTVjNzgzMTNjYjFiNiIsInJvbGUiOiJST09UIiwiaWF0IjoxNjk5ODU5OTgwLCJleHAiOjE3MzE0MTc1ODB9.Y-cf5pyVrcxoyXaqP4R3jepwwhSJoH9_neRFillsEMw`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data.data);
      })
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    LayAPI();
  }, []);

  const [anh, setAnh] = useState();
  const [danhMuc, setDanhMuc] = useState("");
  const [diaDiem, setDiaDiem] = useState("");
  const [dacSan, setDacSan] = useState("");
  const [IsEdit, setIsEdit] = useState(false);

  //popup
  const [show, setShow] = useState(false);
  //add data

  const [editing, setEditing] = useState("");

  const HandleEdit = (id) => {
    setEditing(id);
    fetch(
      `https://653b56c92e42fd0d54d4ef90.mockapi.io/travel/diadiemgoiy/${id}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Lỗi khi tải thông tin danh mục");
        }
        return response.json();
      })
      .then((data) => {
        setDiaDiem(data.diaDiem);
        setDacSan(data.dacSan);
        setDanhMuc(data.danhMuc);
        setAnh(data.anh);
        setShow(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handldUpdate = () => {
    fetch(
      `https://653b56c92e42fd0d54d4ef90.mockapi.io/travel/diadiemgoiy/${editing}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: "Bearer ",
        },
        body: JSON.stringify({
          diaDiem,
          dacSan,
          danhMuc,
          anh,
        }),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Lỗi khi cập nhật thông tin địa điểm");
        }
        alert("Thông tin địa điểm đã được cập nhật thành công");
        return response.json();
      })
      .then(() => {
        handleExit();
        LayAPI();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleAddData = async () => {
    try {
      const response = await fetch(
        "https://653b56c92e42fd0d54d4ef90.mockapi.io/travel/diadiemgoiy",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            diaDiem,
            dacSan,
            danhMuc,
            anh,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Lỗi khi thê thông tin địa điểm");
      }

      alert("Thông tin địa điểm đã được thêm thành công");

      const result = await response.json();
      setData([...data, result]);
      handleExit();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (id) => {
    fetch(
      `https://653b56c92e42fd0d54d4ef90.mockapi.io/travel/diadiemgoiy/${id}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        if (response.ok) {
          throw new Error("Lỗi khi xóa địa điểm gợi ý");
        }
        alert("Xóa địa điểm thành công");
        return response.json();
      })
      .then(() => {
        LayAPI();
      })
      .catch((error) => {
        console.error(error);
      });
    const newDiaDiem = data.filter((DiaDiem) => DiaDiem.DiaDiem !== DiaDiem);
    setData(newDiaDiem);
  };
  //nút thoát
  const handleExitAndShow = () => {
    handleExit();
    setShow(!show);
    // setHideEditImage(true);
  };

  const handleExit = () => {
    setDiaDiem("");
    setDacSan("");
    setDanhMuc("");
    setAnh();
    setEditing("");
  };

  //xem trước ảnh
  const handlePreviewAvatar = (e) => {
    const file = e.target.files[0];
    const fileUrl = URL.createObjectURL(file);
    setAnh(fileUrl);
  };
  const filteredData = data.filter((item) => {
    const diaDiem = item.diaDiem ? item.diaDiem.toLowerCase() : "";
    const dacSan = item.dacSan ? item.dacSan.toLowerCase() : "";
    const danhMuc = item.danhMuc ? item.danhMuc.toLowerCase() : "";

    return (
      diaDiem.includes(searchKeyword.toLowerCase()) ||
      dacSan.includes(searchKeyword.toLowerCase()) ||
      danhMuc.includes(searchKeyword.toLowerCase())
      // Add more conditions for other fields as needed
    );
  });
  return (
    <ViewC>
      <div className="navContainer">
        <button
          className="navButtonAdd"
          onClick={() => {
            setIsEdit(false);
            setShow(!show);
          }}
        >
          Thêm địa điểm
        </button>
      </div>

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
                // ... (rest of the mapping logic)
                <tr
                  id="listViewData"
                  className={`user-item-${index} ${
                    index % 2 === 1 ? "even-row" : ""
                  }`}
                >
                  <td data-lable="STT" key={index}>
                    {index + 1}
                  </td>

                  <td data-lable="Tên địa điểm " key={u.name}>
                    {u.name}
                  </td>
                  <td data-lable="Vị trí" key={u.address}>
                    {u.address}
                  </td>
                  <td data-lable="Mô tả" key={u.description}>
                    {u.description}
                  </td>

                  <td data-lable="Tọa độ" key={u.coordinates}>
                    {u.coordinates}
                  </td>
                  <td className="avt-data" data-lable="Hình ảnh" key={u.img}>
                    {u.img && (
                      <img
                        className="avt"
                        src={u.img}
                        alt={"ảnh " + (index + 1)}
                        style={{ width: "60px", height: "40px" }}
                      />
                    )}
                  </td>
                  <td data-lable="Chỉnh sửa">
                    {" "}
                    <LiaUserEditSolid
                      style={{ color: "#ffab00", marginRight: "10" }}
                      className="iconEdit"
                      onClick={() => {
                        HandleEdit(u.id);
                        setIsEdit(true);
                        setShow(!show);
                      }}
                    />{" "}
                    <MdDelete
                      onClick={() => handleDelete(u.id)}
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

                  <td data-lable="Tên địa điểm " key={u.name}>
                    {u.name}
                  </td>
                  <td data-lable="Vị trí" key={u.address}>
                    {u.address}
                  </td>
                  <td data-lable="Mô tả" key={u.description}>
                    {u.description}
                  </td>

                  <td data-lable="Tọa độ" key={u.coordinates}>
                    {u.coordinates}
                  </td>
                  <td className="avt-data" data-lable="Hình ảnh" key={u.img}>
                    {u.img && (
                      <img
                        className="avt"
                        src={u.img}
                        alt={"ảnh " + (index + 1)}
                        style={{ width: "60px", height: "40px" }}
                      />
                    )}
                  </td>
                  <td data-lable="Chỉnh sửa">
                    {" "}
                    <LiaUserEditSolid
                      style={{ color: "#ffab00", marginRight: "10" }}
                      className="iconEdit"
                      onClick={() => {
                        HandleEdit(u.id);
                        setIsEdit(true);
                        setShow(!show);
                      }}
                    />{" "}
                    <MdDelete
                      onClick={() => handleDelete(u.id)}
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
          <div className="addItemInput">
            <label> Tên địa điểm: </label>
            <input
              id="inputTen"
              onChange={(e) => setDiaDiem(e.target.value)}
              value={diaDiem}
              type="text"
              name="DiaDiem"
              placeholder="Nhập địa điểm"
            />
          </div>
          <div className="addItemInput">
            <label> Tên đặc sản: </label>
            <input
              id="inputTen"
              onChange={(e) => setDacSan(e.target.value)}
              value={dacSan}
              type="text"
              name="DacSan"
              placeholder="Nhập đặc sản"
            />
          </div>
          <div className="addItemInput">
            <label> Tên danh mục: </label>
            <input
              id="inputTen"
              onChange={(e) => setDanhMuc(e.target.value)}
              value={danhMuc}
              type="text"
              name="DanhMuc"
              placeholder="Nhập danh mục"
            />
          </div>
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
                  accept="image/*" // onChange={handlePreviewAvatar}
                  style={{
                    marginTop: 8,
                    right: 0,
                    width: 93,
                    left: 0,
                    padding: 0,
                  }}
                />

                <div className="imputImage">
                  {anh && <img src={anh} alt="Preview Avatar" width="20%" />}
                </div>
              </div>
            </div>
          </div>

          {/* <div className="addItemInput">
            <label> Loại hình: </label>
            <input
              id="inputNgaySinh"
              onChange={(e) => setLoaiHinh(e.target.value)}
              value={loaiHinh}
              type="text"
              name="LoaiHinh"
              placeholder="Nhập loại hình"
            />
          </div> */}

          <div className="buttonPopup">
            <button className="addButtonAdd cancel" onClick={handleExitAndShow}>
              Thoát
            </button>

            <button onClick={handle} className="addButtonAdd add">
              Xác nhận
            </button>
          </div>
        </div>
      )}
    </ViewC>
  );
};
export default ViewDiaDiem;
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
    // white-space: nowrap;
  }

  .navContainer {
    display: flex;
    width: 100%;
    justify-content: right;
    margin: 5px 60px;
    margin-bottom: 10px;

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
    width: 15vw;
    padding: 8px 10px;
    color: #fff;
    background-color: #3eab9f;
    border-color: #0090e7;
    border-radius: 6px;
    cursor: pointer;
    text-align: center;
    overflow: hidden;

    &:hover {
      color: #fff;
      background-color: #3ac3b4;
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
