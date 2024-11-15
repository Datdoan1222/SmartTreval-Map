// import styled from "styled-components";
// import TimKiem from "../../components/ui/ItemSearch";
// import React, { useState, useEffect } from "react";
// import { BsSearch } from "react-icons/bs";
// import { BsBookmark } from "react-icons/bs";
// import { AiOutlineClose } from "react-icons/ai";

// const ItineraryTips = ({ location }) => {
//   const [title, setTitle] = useState([
//     "STT",
//     "Địa điểm",
//     "Số Km",
//     "Số giờ",
//     "Lưu",
//     "Hành động",
//   ]);
//   const LayAPI = () => {
//     const token = localStorage.getItem("token");
//     fetch("http://localhost:3000/location?limit=10&page=1", {
//       headers: {
//         Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MmU0OWE3NDk4NTVjNzgzMTNjYjFiNiIsInJvbGUiOiJST09UIiwiaWF0IjoxNjk5ODU5OTgwLCJleHAiOjE3MzE0MTc1ODB9.Y-cf5pyVrcxoyXaqP4R3jepwwhSJoH9_neRFillsEMw`,
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         setData(data.data);
//       })
//       .catch((error) => console.error(error));
//   };
//   const [showList, setShowList] = useState(false);
//   const [hiddenItems, setHiddenItems] = useState([]);

//   //ẩn item
//   const handleHide = (index) => {
//     setHiddenItems([...hiddenItems, index]);
//   };
//   const handleAdd = () => {
//     setShowList(true);
//   };
//   const handleThoat = () => {
//     setShowList(false);
//   };
//   const handleLuu = () => {
//     setShowList(false);
//   };
//   const [data, setData] = useState([]);
//   useEffect(() => {
//     LayAPI();
//   }, []);
//   return (
//     <Itinerary>
//       <div className="container">
//         <div className="navContainer">
//           <button className="navButtonAdd" onClick={handleAdd}>
//             Thêm
//           </button>
//         </div>

//         <div className="viewContainer">
//           <table className="tbl">
//             <tr className="title-data">
//               {title.map((t) => {
//                 return <th key={t}>{t}</th>;
//               })}
//             </tr>

//             {data.map((u, index) => (
//               <tr
//                 id="listViewData"
//                 className={`user-item-${index} ${
//                   index % 2 === 1 ? "even-row" : ""
//                 }`}
//               >
//                 <td data-lable="STT" key={index}>
//                   {index + 1}
//                 </td>

//                 <td data-lable="Địa điểm" key={u.diaDiem}>
//                   {u.diaDiem}
//                 </td>

//                 <td data-lable="Số Km" key={u.km}>
//                   {u.km}
//                 </td>
//                 <td data-lable="Số giờ" key={u.soGio}>
//                   {u.soGio}
//                 </td>

//                 <td data-lable="Lưu">
//                   {" "}
//                   <BsBookmark
//                     style={{ color: "#ffab00", marginRight: "10" }}
//                     className="iconEdit"
//                     onClick={() => {
//                       // HandleEdit(u.id);
//                       // setShow(!show)
//                     }}
//                   />
//                 </td>
//                 <td data-lable="Xóa">
//                   {" "}
//                   <AiOutlineClose
//                     style={{ color: "#fc424a" }}
//                     className="iconDelete"
//                   />{" "}
//                 </td>
//               </tr>
//             ))}
//           </table>

//           {showList && (
//             <div className="listContainer">
//               <div className="vien"></div>
//               <h2 style={{ marginTop: "10px" }}>Gợi ý lịch trình mới</h2>
//               <table className="tbl">
//                 {data.map((u, index) => (
//                   <tr
//                     id="listViewData"
//                     className={`user-item-${index} ${
//                       index % 2 === 1 ? "even-row" : ""
//                     } ${hiddenItems.includes(index) ? "hidden-row" : ""}`}
//                     key={index}
//                   >
//                     <td>
//                       <input
//                         type="checkbox"
//                         // checked={checkedItems[u.id]}
//                         // onChange={() => handleCheckboxChange(u.id)}
//                       />
//                     </td>
//                     <td data-lable="STT" key={index}>
//                       {index + 1}
//                     </td>

//                     <td data-lable="Địa điểm" key={u.diaDiem}>
//                       {u.diaDiem}
//                     </td>

//                     <td data-lable="Số Km" key={u.km}>
//                       {u.km}
//                     </td>
//                     <td data-lable="Số giờ" key={u.soGio}>
//                       {u.soGio}
//                     </td>

//                     <td data-lable="Xóa">
//                       {" "}
//                       <AiOutlineClose
//                         onClick={() => handleHide(index)}
//                         style={{ color: "#fc424a" }}
//                         className="iconDelete"
//                       />{" "}
//                     </td>
//                   </tr>
//                 ))}
//               </table>
//               <div className="navButton">
//                 <button onClick={handleThoat} className="navButtonExit">
//                   Hủy
//                 </button>
//                 <button onClick={handleLuu} className="navButtonAdd">
//                   Lưu
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </Itinerary>
//   );
// };

// export default ItineraryTips;

// const Itinerary = styled.div`
//   margin-left: 80px;
//   padding-right: 10px;
//   width: 47vw;
//   transform: translateX(0px) translateY(0px);
//   display: flex;
//   position: fixed;
//   top: 0;
//   bottom: 0;
//   transition: margin 0.25s ease-out;
//   max-height: 100vh;
//   box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1);

//   transition: width 0.25s ease;
//   transition: width 0.25s ease-in;
//   background-color: #ffffff;
//   .navButtonAdd {
//     display: inline-block;
//     font-size: 1em;
//     font-weight: bold;
//     width: 10vw;
//     height: 40px;
//     padding: 8px 10px;
//     color: #fff;
//     background-color: #0090e7;
//     border-color: #0090e7;
//     border-radius: 6px;
//     cursor: pointer;
//     text-align: center;
//     overflow: hidden;

//     &:hover {
//       color: #fff;
//       background-color: #0078c1;
//       border-color: #0070b4;
//     }
//   }
//   .navButtonExit {
//     display: inline-block;
//     font-size: 1em;
//     font-weight: bold;
//     width: 10vw;
//     height: 40px;
//     padding: 8px 10px;
//     color: #000;
//     background-color: #fff;
//     border-color: #000;
//     border-radius: 6px;
//     cursor: pointer;
//     text-align: center;
//     overflow: hidden;

//     &:hover {
//       color: #000;
//       background-color: #f4f2f2;
//       border-color: #000;
//     }
//   }
//   .navContainer {
//     margin-top: 20px;
//     display: flex;
//     flex-direction: row;
//     align-items: center;
//     justify-content: flex-end;
//   }
//   input {
//     border-radius: 10px;
//   }

//   .iconSearch {
//     width: 20px;
//     height: 20px;
//     cursor: pointer;
//     color: #000;
//     transform: translateX(280px) translateY(-10px);
//   }
//   .tbl {
//     margin-top: 40px;
//     border-radius: 20px;
//     width: 100%;
//   }
//   tr {
//     border-bottom: 1px solid #ccc;
//   }
//   table {
//     border-collapse: collapse;
//   }
//   tr,
//   th,
//   td {
//     text-align: center;
//     padding: 15px;
//   }

//   td {
//     vertical-align: middle;
//     font-size: 0.875rem;
//     line-height: 1.5;
//     white-space: nowrap;
//   }
//   .viewContainer {
//     height: 100vh;
//     overflow-y: auto;
//   }
//   .vien {
//     height: 1px;
//     background-color: #000;
//     width: 90%;
//     margin: 0 auto;
//   }
//   input[type="checkbox"] {
//     transform: scale(1.5); /* Tăng kích thước nút checkbox lên 1.5 lần */
//     vertical-align: middle;
//     margin-top: 20px;
//   }
//   .navButton {
//     height: 10vh;
//     width: 100%;
//     margin-bottom: 10vh;
//     display: flex;
//     justify-content: space-around;
//     flex-direction: row;
//   }
//   .hidden-row {
//     display: none; /* Ẩn hàng */
//   }
// `;

import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { BsBookmark } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";

import ReactSelect from "react-select";
import ItemSearch from "../../components/ui/ItemSearch";
import SearchItineraryTips from "../../components/ui/SearchItineraryTips";
import { Link } from "react-router-dom";

const ItineraryTips = ({ onClick, receivedData, locations }) => {
  const [title, setTitle] = useState([
    "STT",
    "Địa điểm",
    "Số Km",
    "Số giờ",
    "Lưu",
    "Hành động",
  ]);
  const LayAPI = () => {
    fetch("https://653b56c92e42fd0d54d4ef90.mockapi.io/travel/diadiemgoiy")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  };
  const [options, setOptions] = useState([]);
  useEffect(() => {
    // Gọi API endpoint để lấy danh sách tùy chọn
    fetch("https://653b56c92e42fd0d54d4ef90.mockapi.io/travel/diadiemgoiy")
      .then((response) => response.json())
      .then((data) => {
        // Tạo mảng options từ dữ liệu API
        const apiOptions = data.map((item) => ({
          value: item.diaDiem,
          label: item.diaDiem,
        }));
        // Gán mảng options vào state options
        setOptions(apiOptions);
      })
      .catch((error) => {
        console.error("Error fetching options:", error);
      });
  }, []);

  //hàm exit
  const handleExit = () => {
    setDiaDiem("");
    setSoGio("");
  };
  //hàm sửa
  const HandleEdit = (id) => {
    fetch(
      `https://653b56c92e42fd0d54d4ef90.mockapi.io/travel/diadiemgoiy/${id}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Lỗi khi tải thông tin người dùng");
        }
        return response.json();
      })
      .then((data) => {
        setDiaDiem(data.diaDiem);
        setSoGio(data.soGio);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleChange = (selectedOption) => {
    // Xử lý sự kiện thay đổi giá trị
    setDiaDiem(selectedOption.value);
  };
  const [showList, setShowList] = useState(false);
  const [hiddenItems, setHiddenItems] = useState([]);
  const [hideButton, setHideButton] = useState(true);
  const [showInput, setShowInput] = useState(false);
  const [isTabOpen, setIsTabOpen] = useState(false); //hiển thị lịch trình chi tiết
  const [diaDiem, setDiaDiem] = useState("");
  const [soGio, setSoGio] = useState("");

  //ẩn item
  const handleHide = (index) => {
    setHiddenItems([...hiddenItems, index]);
  };
  const [data, setData] = useState([]);
  useEffect(() => {
    LayAPI();
  }, []);
  // Add this at the beginning of your component
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const handleAdd = () => {
    setHideButton(false);
    setShowList(true);
    setSuggestions([]); // Clear suggestions when opening the list
    setIsShow(true);
  };

  const handleThoat = () => {
    setShowList(false);
    setHideButton(true);
    setSearchTerm(""); // Clear search term when closing the list
  };
  const handleLuu = () => {
    setShowList(false);
    setHideButton(true);
  };
  const handleStart = () => {
    setIsTabOpen(true);
  };
  console.log(locations);
  console.log(data);
  return (
    <LichTrinh>
      <div className="container">
        <div className="navContainer">
          <SearchItineraryTips isTest />
          <button className="navButtonAdd" onClick={handleAdd}>
            Thêm
          </button>
        </div>

        <div className="viewContainer">
          {isShow && (
            <table className="tbl">
              <tr className="title-data">
                {title.map((t) => {
                  return <th key={t}>{t}</th>;
                })}
              </tr>

              {locations.map((u, index) => (
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

                  <td data-lable="Số Km" key={u.km}>
                    {u.km}
                  </td>
                  <td data-lable="Số giờ" key={u.soGio}>
                    {u.soGio}
                  </td>

                  <td data-lable="Lưu">
                    {" "}
                    <BsBookmark
                      style={{ color: "#ffab00", marginRight: "10" }}
                      className="iconEdit"
                      onClick={() => {
                        // HandleEdit(u.id);
                        // setShow(!show)
                      }}
                    />
                  </td>
                  <td data-lable="Xóa">
                    {" "}
                    <AiOutlineClose
                      style={{ color: "#fc424a" }}
                      className="iconDelete"
                    />{" "}
                  </td>
                </tr>
              ))}
            </table>
          )}

          {hideButton && (
            <button onClick={handleStart} className="navButtonAdd navStart">
              Bắt đầu
            </button>
          )}

          {showList && (
            <div className="listContainer">
              <div className="vien"></div>
              <h2 style={{ marginTop: "10px" }}>Gợi ý lịch trình mới</h2>
              <table className="tbl">
                {locations.map((u, index) => (
                  <tr
                    id="listViewData"
                    className={`user-item-${index} ${
                      index % 2 === 1 ? "even-row" : ""
                    } ${hiddenItems.includes(index) ? "hidden-row" : ""}`}
                    key={index}
                  >
                    <td>
                      <input
                        type="checkbox"
                        // checked={checkedItems[u.id]}
                        // onChange={() => handleCheckboxChange(u.id)}
                      />
                    </td>
                    <td data-lable="STT" key={index}>
                      {index + 1}
                    </td>

                    <td data-lable="Địa điểm" key={u.diaDiem}>
                      {u.diaDiem}
                    </td>

                    <td data-lable="Số Km" key={u.km}>
                      {u.km}
                    </td>
                    <td data-lable="Số giờ" key={u.soGio}>
                      {u.soGio}
                    </td>

                    <td data-lable="Xóa">
                      {" "}
                      <AiOutlineClose
                        onClick={() => handleHide(index)}
                        style={{ color: "#fc424a" }}
                        className="iconDelete"
                      />{" "}
                    </td>
                  </tr>
                ))}
              </table>
              <div className="navButton">
                <button onClick={handleThoat} className="navButtonExit">
                  Hủy
                </button>
                <button onClick={handleLuu} className="navButtonAdd">
                  Lưu
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {isTabOpen && (
        <div className="containerLichTrinhChiTiet">
          <div className="navContainerChiTiet">
            <div
              className="buttonExit"
              onClick={() => {
                setIsTabOpen(false);
              }}
            >
              <AiOutlineCloseCircle />
            </div>
            <div className="titleChiTiet" style={{ marginBottom: 15 }}>
              <h1>Lịch trình du lịch </h1>
            </div>
            <div className="navButtonChiTiet">
              <button
                className="navButtonAdd"
                onClick={() => {
                  setIsTabOpen(false);
                }}
              >
                Chỉnh sửa
              </button>
              <button
                className="navButtonStart"
                onClick={() => {
                  // setShowInput(false);
                  setIsTabOpen(false);
                }}
              >
                Bắt đầu di chuyển
              </button>
            </div>

            <div className="containerLichTrinhItem">
              <div className="itemLichTrinh">
                {locations.map((u, index) => (
                  <div
                    id="listViewDataLichTrinh"
                    className={`user-item-${index} ${
                      index % 2 === 1 ? "even-row" : ""
                    }`}
                  >
                    <p>{u.diaDiem}</p>
                    <h4>{u.diaDiem}</h4>
                    <p>{u.diaDiem}</p>
                    <p>{u.diaDiem}</p>
                  </div>
                ))}
              </div>
            </div>

            {showInput && (
              <div className="containerInputAdd">
                <div
                  className="buttonExitInput"
                  onClick={() => {
                    setShowInput(false);
                  }}
                >
                  <AiOutlineCloseCircle
                    onClick={() => {
                      handleExit();
                    }}
                  />
                </div>
                <div className="titleChiTiet" style={{ marginBottom: 15 }}>
                  <h3>Thông tin lịch trình du lịch</h3>
                </div>
                <div className="containerInput">
                  <div className="addItemInput">
                    <label>Chọn địa điểm: </label>
                    <ReactSelect
                      className="cbQuyen"
                      options={options}
                      value={{ value: diaDiem, label: diaDiem }}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="addItemInput">
                    <label>Thời gian ngày đi: </label>
                    <input
                      id="inputThoiGian"
                      onChange={(e) => setSoGio(e.target.value)}
                      value={soGio}
                      type="text"
                      name="ThoiGian"
                      placeholder="Thời gian ngày đi"
                    />
                  </div>
                  <div className="addItemInput">
                    <label>Giờ lịch trình: </label>
                    <input
                      id="inputSoGio"
                      onChange={(e) => setSoGio(e.target.value)}
                      value={soGio}
                      type="text"
                      name="SoGio"
                      placeholder="Giờ lịch trình"
                    />
                  </div>
                </div>

                <div className="navButton">
                  <button className="navButtonAdd">Lưu lịch trình</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </LichTrinh>
  );
};

export default ItineraryTips;

const LichTrinh = styled.div`
  padding-right: 10px;
  width: 47vw;
  transform: translateX(0px) translateY(0px);
  display: flex;
  top: 0;
  bottom: 0;
  transition: margin 0.25s ease-out;
  max-height: 100vh;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1);

  transition: width 0.25s ease;
  transition: width 0.25s ease-in;

  .navButtonAdd {
    display: inline-block;
    font-size: 1em;
    font-weight: bold;
    margin-right: 10px;
    width: 13vw;
    height: 40px;
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
  .navStart {
    margin-top: 20px;
  }
  .navButtonStart {
    display: inline-block;
    font-size: 1em;
    font-weight: bold;
    margin-right: 10px;
    width: 13vw;
    height: 40px;
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
  .navButtonExit {
    display: inline-block;
    font-size: 1em;
    font-weight: bold;
    width: 10vw;
    height: 40px;
    padding: 8px 10px;
    color: #000;
    background-color: #fff;
    border-color: #000;
    border-radius: 6px;
    cursor: pointer;
    text-align: center;
    overflow: hidden;

    &:hover {
      color: #000;
      background-color: #f4f2f2;
      border-color: #000;
    }
  }
  .navContainer {
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
  }
  input {
    border-radius: 10px;
  }
  .navSearch {
    width: 400px;
    height: 60px;
    display: flex;
    align-items: center;
    margin-top: 15px;
  }
  .iconSearch {
    width: 20px;
    height: 20px;
    cursor: pointer;
    color: #000;
    transform: translateX(280px) translateY(-10px);
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
  .viewContainer {
    height: 100vh;
    overflow-y: auto;
  }
  .vien {
    height: 1px;
    background-color: #000;
    width: 90%;
    margin: 0 auto;
  }
  input[type="checkbox"] {
    transform: scale(1.5); /* Tăng kích thước nút checkbox lên 1.5 lần */
    vertical-align: middle;
    margin-top: 20px;
  }
  .navButton {
    height: 10vh;
    width: 100%;
    margin-bottom: 10vh;
    display: flex;
    justify-content: space-around;
    flex-direction: row;
  }
  .hidden-row {
    display: none; /* Ẩn hàng */
  }
  .containerLichTrinhChiTiet {
    position: absolute;
    width: calc(100vw - 100px);
    z-index: 9999999;
    top: 0;
    background-color: #fff;
    height: 100vh;
    display: flex;
    justify-content: center;
  }
  .navContainerChiTiet {
    position: absolute;
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    margin-top: 20px;
  }
  .buttonExit {
    font-size: 30px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    cursor: pointer;
    margin-bottom: 15px;
    margin-right: 10px;
    margin-top: 10px;
  }
  .buttonExitInput {
    font-size: 30px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    cursor: pointer;
    margin-bottom: 15px;
    margin-right: 20px;
    margin-top: 10px;
  }
  .navButtonChiTiet {
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin-bottom: 15px;
  }
  .itemLichTrinh {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    background-color: #ccc;
    margin: 20px;
    border-radius: 10px;
    justify-content: center;
  }
  .containerLichTrinhItem {
    width: 80%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  #listViewDataLichTrinh {
    width: 20%;
    box-sizing: border-box;
    padding: 10px;
    margin: 20px 15px;
    background-color: #fff;
    border-radius: 10px;
  }
  .containerInputAdd {
    width: 55vw;
    height: 50vh;
    z-index: 999999999;
    position: absolute;

    background-color: #ccc;
    margin-top: 15vh;
  }
  .containerInput .cbQuyen {
    font-size: 19px;
    width: 30vw;
    border: 1px solid #ccd9;
    border-radius: 10px;

    cursor: text;
    margin-bottom: 20px;
  }
  .containerInput {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  .containerInput input {
    font-size: 19px;
    width: 30vw;
    border: 1px solid #ccd9;
    border-radius: 10px;
    padding-left: 10px;
    cursor: text;
    margin-bottom: 20px;
  }
  .addItemInput {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .addItemInput label {
    width: 10vw;
    margin-bottom: 23px;
    margin-right: 20px;
    left: 0;
    text-align: left !important;
    font-weight: bold;
  }
  .buttonLichTrinhItem {
    display: flex;
    justify-content: flex-end;
    cursor: pointer;
  }
`;
