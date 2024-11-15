import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { LiaUserEditSolid } from "react-icons/lia";
import { MdDelete } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { format } from "date-fns";

const ViewTinh = ({ searchKeyword }) => {
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
    "Mô tả",

    "Hành động",
  ]);
  const LayAPI = () => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:3005/province", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  };
  const [data, setData] = useState([]);
  useEffect(() => {
    LayAPI();
  }, []);

  const [name, setName] = useState("");
  const [moTa, setMoTa] = useState("");

  const [IsEdit, setIsEdit] = useState(false);

  //popup
  const [show, setShow] = useState(false);
  //add data

  const [editing, setEditing] = useState("");

  const HandleEdit = (_id) => {
    setEditing(_id);
    const token = localStorage.getItem("token");

    fetch(`http://localhost:3005/province/${_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Lỗi khi tải thông tin danh mục");
        }
        return response.json();
      })
      .then((data) => {
        setName(data.name);
        setMoTa(data.describe);

        setShow(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handldUpdate = () => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:3005/province/${editing}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        describe: moTa,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Lỗi khi cập nhật thông tin tỉnh");
        }
        alert("Thông tin tỉnh đã được cập nhật thành công");
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
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:3005/province", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: name,
          describe: moTa,
        }),
      });

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

  const handleDelete = (_id) => {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:3005/province/${_id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
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
    const newTinh = data.filter((Tinh) => Tinh.Tinh !== Tinh);
    setData(newTinh);
  };
  //nút thoát
  const handleExitAndShow = () => {
    handleExit();
    setShow(!show);
    // setHideEditImage(true);
  };

  const handleExit = () => {
    setName("");
    setMoTa("");
    setEditing("");
  };

  //xem trước ảnh
  //   const handlePreviewAvatar = (e) => {
  //     const file = e.target.files[0];
  //     const fileUrl = URL.createObjectURL(file);
  //     setAnh(fileUrl);
  //   };
  const showData = (showData) => {
    return showData.map((u, index) => (
      <tr
        id="listViewData"
        className={`user-item-${index} ${index % 2 === 1 ? "even-row" : ""}`}
      >
        <td data-lable="STT" key={index}>
          {index + 1}
        </td>

        <td data-lable="Loại hình" key={u.name}>
          {u.name}
        </td>
        <td data-lable="Loại hình" key={u.describe}>
          {u.describe}
        </td>

        <td data-lable="Chỉnh sửa">
          {" "}
          <LiaUserEditSolid
            style={{ color: "#ffab00", marginRight: "10" }}
            className="iconEdit"
            onClick={() => {
              HandleEdit(u._id);
              setIsEdit(true);
              setShow(!show);
            }}
          />{" "}
          <MdDelete
            onClick={() => handleDelete(u._id)}
            style={{ color: "#fc424a" }}
            className="iconDelete"
          />{" "}
        </td>
      </tr>
    ));
  };
  const filteredData = data.filter((item) => {
    return (
      item.Ten.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.TaiKhoan.toLowerCase().includes(searchKeyword.toLowerCase())
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
          Thêm tỉnh
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
              showData(filteredData)
            : // Display the entire dataset if there is no search keyword
              showData(data)}
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
            <label> Tên tỉnh: </label>
            <input
              id="inputTen"
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              name="Tinh"
              placeholder="Nhập tỉnh"
            />
          </div>
          <div className="addItemInput">
            <label>Mô tả: </label>
            <input
              id="inputTen"
              onChange={(e) => setMoTa(e.target.value)}
              value={moTa}
              type="text"
              name="moTa"
              placeholder="Nhập mô tả"
            />
          </div>

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
export default ViewTinh;
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
    white-space: nowrap;
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
