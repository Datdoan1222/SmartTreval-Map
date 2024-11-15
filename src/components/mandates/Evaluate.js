import styled from "styled-components";
import userImg from "../../assets/img/user.png";
import { FaWindowClose } from "react-icons/fa";
import { IoCameraOutline } from "react-icons/io5";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useState } from "react";
function Evaluate({ onClose, location }) {
  const [rating, setRating] = useState(0);

  const handleStarClick = (starIndex) => {
    setRating(starIndex);
  };

  const [images, setImages] = useState([]);

  const handleImageUpload = (e) => {
    const files = e.target.files;
    const newImages = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = (event) => {
        newImages.push(event.target.result);
        if (newImages.length === files.length) {
          setImages([...images, ...newImages]);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };
  return (
    <DanhGia>
      <div className="container-evaluate">
        <div className="header-evaluate">
          <div className="title-header">
            <h1>{location.name}</h1>
          </div>
          <div className="button-exit">
            <button onClick={onClose}>
              <FaWindowClose className="btn-exit" />
            </button>
          </div>
        </div>
        <div className="user-evaluate">
          <img src={location.img} alt="Your Image" className="image-user" />
        </div>
        <div className="start-evaluate">
          {[1, 2, 3, 4, 5].map((index) => (
            <span
              key={index}
              className={`star-icon ${index <= rating ? "filled" : ""}`}
              onClick={() => handleStarClick(index)}
            >
              &#9733;
            </span>
          ))}
        </div>
        <div className="describe-evaluate">
          <textarea
            rows="4"
            placeholder="Nhập bình luận hoặc mô tả trải nghiệm của bạn về địa điểm này..."
          ></textarea>
        </div>
        <div className="image-upload">
          <input
            type="file"
            id="upload-input"
            accept="image/*, video/*"
            multiple
            onChange={handleImageUpload}
          />
          <label htmlFor="upload-input">
            <IoCameraOutline className="icon-camera" />
            Thêm hình ảnh/video
          </label>

          <div className="image-preview">
            {images.map((image, index) => (
              <div className="preview-item" key={index}>
                {image.startsWith("data:image") ? (
                  <img src={image} alt={`Preview ${index}`} />
                ) : (
                  <video src={image} alt={`Preview ${index}`} controls />
                )}
                <button
                  className="remove-button"
                  onClick={() => handleImageRemove(index)}
                >
                  <IoMdCloseCircleOutline style={{ fontSize: "20px" }} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="button-confirm">
          <button className="navButtonHuy" onClick={onClose}>
            Hủy
          </button>
          <button className="navButtonAdd">Đăng</button>
        </div>
      </div>
    </DanhGia>
  );
}
export default Evaluate;
const DanhGia = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  .container-evaluate {
    width: 40vw;
    height: 90vh;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    z-index: 9999999;
    background-color: #fff;
    flex-direction: column;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }
  .title-header {
    h1 {
      color: black;
    }
  }
  .star-rating-container {
    display: flex;
    align-items: center;
  }

  .star-icon {
    font-size: 28px;
    color: gray;
    cursor: pointer;
  }

  .star-icon.filled {
    color: yellow;
  }
  .header-evaluate {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 90%;
  }

  .title-header {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
  }

  .button-exit {
    display: flex;
    align-items: center;
  }
  .btn-exit {
    font-size: 30px;
    transform: translateY(18px);
    cursor: pointer;
    border-radius: 8px;
  }
  .user-evaluate {
    display: flex;
    justify-content: center;
    width: 90%;
  }
  .image-user {
    margin-top: 40px;
    max-width: 90%;
    max-height: 90%;
  }
  .describe-evaluate {
    width: 90%;

    display: flex;
    justify-content: center;
    margin: 20px 0;

    textarea {
      width: 100%;
      height: 100px;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      resize: vertical;
    }
  }
  .image-upload {
    margin-bottom: 10px;
    height: 15vh;
  }

  .image-upload input[type="file"] {
    display: none;
  }

  .image-upload label {
    display: inline-block;
    padding: 8px 50px;
    border: solid 1px #007bff;
    border-radius: 20px;
    color: #007bff;
    cursor: pointer;
  }

  .image-preview {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
  }

  .image-preview .preview-item {
    position: relative;
    margin-right: 10px;
    margin-bottom: 10px;
  }

  .image-preview .preview-item img,
  .image-preview .preview-item video {
    width: 100px;
    height: 100px;
    object-fit: cover;
  }

  .image-preview .preview-item .remove-button {
    position: absolute;
    top: 5px;
    right: 5px;
    background-color: transparent;
    cursor: pointer;
  }
  .icon-camera {
    font-size: 20px;
    margin-right: 10px;
    transform: translateY(3px);
  }
  .navButtonAdd {
    padding: 12px 24px;
    border-radius: 4px;
    background-color: #ccc;
    cursor: pointer;
  }
  .navButtonHuy {
    padding: 12px 24px;
    margin-right: 30px;
    border-radius: 4px;
    border: solid 1px #ccc;
    cursor: pointer;
  }
  .button-confirm {
    width: 90%;
    display: flex;
    justify-content: right;
    margin: 15px 0px;
  }
`;
