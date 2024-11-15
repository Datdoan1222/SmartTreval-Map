import React, { useState } from "react";
import styled from "styled-components";
function LoginForm({ isLogin, onSubmits, setEmail, setPassword }) {
  const [localEmail, setLocalEmail] = useState("");
  const [localPassword, setLocalPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail(localEmail);
    setPassword(localPassword);
    onSubmits();
  };

  return (
    <Login>
      {isLogin && (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Điền thông tin"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            onChange={(e) => setPassword(e.target.value)}
          />
        </form>
      )}
      {!isLogin && (
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Gmail"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input placeholder="Tên tài khoản" />
          <input
            placeholder="Mật khẩu"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input placeholder="Nhập lại mật khẩu" />
        </form>
      )}
      <p>Quên mật khẩu?</p>
    </Login>
  );
}

export default LoginForm;
const Login = styled.div`
  input {
    width: 100%;
    height: 50px;
    margin-bottom: 20px;
    padding: 1.5vh 0;
    border-radius: 4px;
    border: 1px solid #f0efff;
    overflow: hidden;
    background-color: #f0efff;
    padding-left: 20px;
  }
  p {
    fontweight: "bold";
    textalign: "right";
    width: "100%";
    margin: 0;
    margintop: -8;
  }
`;
