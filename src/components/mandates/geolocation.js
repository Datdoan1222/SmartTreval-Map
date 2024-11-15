const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ lat: latitude, lng: longitude });
        },
        (error) => {
          reject("Không thể lấy vị trí của bạn");
        }
      );
    } else {
      reject("Geolocation is not available in this browser.");
    }
  });
};

export default getUserLocation;
