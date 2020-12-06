import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from 'styled-components'

import BackgroundImage from "../../images/map2.jpg";
import { registerUser } from "../../graphql/auth";

const Register = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(email, username, password);
      history.push("/");
    } catch (error) {
      setError(error);
    }
  };
  return (
    <RegisterPageStyles>
      <RegisterStyles>
        <h2>Sign up</h2>
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              name="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <button type="submit">Register</button>
          {error && <div className="error-message">{error.message}</div>}
        </form>
      </RegisterStyles>
    </RegisterPageStyles>
  );
};
const RegisterPageStyles = styled.div`
  background: url(${BackgroundImage});
  height: calc(100vh - 76px);
  background-size: cover;
  background-position: 50% 50%;
  margin: 0 16px;
  border-radius: 16px;
  position: relative;
`;

const RegisterStyles = styled.div`
  width: 240px;
  margin: 0 auto;
  color: #fff;
  h1 {
  }
  h2 {
    margin-bottom: 16px;
  }
  input {
    padding: 8px;
    border-radius: 8px;
    border: 1px solid rgb(205, 209, 212);
    line-height: 1.5;
    font-size: 16px;
    outline: none;
    color: #000;
    margin-bottom: 12px;
    width: 100%;
  }
  .auth-button {
    border-radius: 8px;
    border-width: 1px;
    border-style: solid;
    cursor: pointer;
    font-size: 16px;
    line-height: 1.5;
    padding: 8px 16px;
    font-weight: 700;
    width: 100%;
    margin-bottom: 12px;
  }
  .auth-login {
    margin-bottom: 36px;
  }
  .auth-button a {
    text-decoration: none;
    color: #000;
  }
`;
export default Register;

