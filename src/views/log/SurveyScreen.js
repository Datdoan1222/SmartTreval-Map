import styled from "styled-components";
import React, { useState, useEffect, useRef } from "react";
import bachgroundLog from "../../assets/img/bachgroundLog.png";
import { ImMobile } from "react-icons/im";
import { FcGoogle } from "react-icons/fc";
import VanHoa from "../../assets/img/vanhoa.jpg";
import LeoNui from "../../assets/img/leonui.jpg";
import TamBien from "../../assets/img/tambien.png";
import CamTrai from "../../assets/img/camtrai.jpg";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";

// import logoItem from "../../assets/img/logoItem.png";

const SurveyScreen = () => {
  const navigate = useNavigate();
  const [isDarkened, setIsDarkened] = useState(false);
  const [isDarkened2, setIsDarkened2] = useState(false);
  const [isDarkened3, setIsDarkened3] = useState(false);
  const [isDarkened4, setIsDarkened4] = useState(false);

  const handleClick = () => {
    setIsDarkened(!isDarkened);
  };
  const handleClick2 = () => {
    setIsDarkened2(!isDarkened2);
  };

  const handleClick3 = () => {
    setIsDarkened3(!isDarkened3);
  };

  const handleClick4 = () => {
    setIsDarkened4(!isDarkened4);
  };

  const handleStart = () => {
    navigate("/trangchu");
  };
  return (
    <Survey>
      <div className="Container-survey">
        <div className="Container-change">
          <h1>Bạn muốn đi đâu?</h1>
          <div className="image-change">
            <div
              className={`item-change ${isDarkened ? "darkened" : ""}`}
              onClick={handleClick}
            >
              <img
                src={CamTrai}
                alt="Cắm trại"
                className={isDarkened ? "darkened-image" : ""}
              />
              <h3>Cắm trại</h3>
            </div>
            <div
              className={`item-change ${isDarkened2 ? "darkened" : ""}`}
              onClick={handleClick2}
            >
              <img
                src={TamBien}
                alt="Tắm biển"
                className={isDarkened2 ? "darkened-image" : ""}
              />
              <h3>Tắm biển</h3>
            </div>
            <div
              className={`item-change ${isDarkened3 ? "darkened" : ""}`}
              onClick={handleClick3}
            >
              <img
                src={LeoNui}
                alt="Leo núi"
                className={isDarkened3 ? "darkened-image" : ""}
              />
              <h3>Leo núi</h3>
            </div>
            <div
              className={`item-change ${isDarkened4 ? "darkened" : ""}`}
              onClick={handleClick4}
            >
              <img
                src={VanHoa}
                alt="Văn hoa"
                className={isDarkened4 ? "darkened-image" : ""}
              />
              <h3>Văn hóa</h3>
            </div>
          </div>

          <Link style={{ justifyContent: "center" }} to="/home">
            <Button className="navButtonAdd">Bắt đầu</Button>
          </Link>
        </div>
        <div className="background">
          <img
            src={bachgroundLog}
            className="Image-background"
            alt="bachground"
          />
        </div>
      </div>
    </Survey>
  );
};

export default SurveyScreen;
const Survey = styled.div`
  .background {
    bottom: 0;
    width: 100vw;
    position: fixed;
  }
  .Image-background {
    position: absolute;
    opacity: 0.9;
    width: 100vw;
    bottom: 0px;
    left: 0;
  }
  h1 {
    margin-bottom: 4vh;
  }
  h3 {
    text-align: center;
    width: 73%;
  }
  .Container-survey {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .Container-change {
    width: 40vw;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 5vh;
    z-index: 9999;
  }
  .Container-change img {
    width: 200px;
    height: 150px;
  }
  .image-change {
    display: flex;
    flex-wrap: wrap;
  }

  .item-change {
    flex-basis: 50%;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    position: relative;
    align-items: center;
  }

  .item-change img::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Màu đen với độ mờ 0.5 */
    opacity: 0; /* Mặc định là không hiển thị */
    transition: opacity 0.3s ease;
    borderwidth: 10;
    bordercolor: "red";
  }

  .item-change.darkened::before {
    opacity: 1; /* Hiển thị bảng màu đen với độ mờ */
  }

  .darkened-image {
    filter: brightness(50%); /* Áp dụng hiệu ứng làm tối ảnh */
  }
  .navButtonAdd {
    display: inline-block;
    font-size: 1em;
    font-weight: bold;
    width: 10vw;
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
`;
