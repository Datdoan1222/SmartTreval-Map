export const handleFirebaseError = (code) => {
  switch (code) {
    case "auth/email-already-in-use":
      return "Email này đã được sử dụng!";
    case "auth/invalid-email":
      return "Email không hợp lệ!";
    case "auth/weak-password":
      return "Mật khẩu quá yếu!";
    case "auth/user-not-found":
      return "Người dùng không tồn tại!";
    case "auth/wrong-password":
      return "Mật khẩu không đúng!";
    // Thêm các trường hợp khác nếu cần
    default:
      return "Đã xảy ra lỗi!";
  }
};
