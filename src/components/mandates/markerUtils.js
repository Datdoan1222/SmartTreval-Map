import myPosition from "../../assets/img/myPosition.png";
import school from "../../assets/img/university.png";
import tourist from "../../assets/img/university.png";
import pin from "../../assets/img/map-pin.png";
const markerImages = {
  position: myPosition,
  school: school,
  tourist: tourist,
  default: pin,
};
export function createCustomMarker(type) {
  const imagePath = markerImages[type] || markerImages.default;

  const customMarker = document.createElement("div");
  customMarker.innerHTML = `<img src='${imagePath}' alt='Custom Marker' />`; // Sử dụng biểu tượng từ myPosition
  customMarker.style.width = "30px"; // Điều chỉnh chiều rộng của biểu tượng
  customMarker.style.height = "30px"; // Điều chỉnh chiều cao của biểu tượng
  return customMarker;
}
