import React, { useState } from "react";

import { useHistory, Link } from "react-router-dom";
import styled from "styled-components";
import BackgroundImage from "../../images/home.jpg";

import { loginUser, registerGuest } from "../../graphql/auth";

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
      history.push("/");
    } catch (error) {
      setError(error);
    }
  };

  return (
    <LoginPageStyles>
      <LoginHeader>Build and save maps worldwide</LoginHeader>
      <LoginStyles>
        <div className="auth-login">
          <h2>Log in:</h2>
          <form onSubmit={onSubmit}>
            <div className="auth-option">
              {/* <label htmlFor="email">Email:</label> */}
              <input
                type="text"
                name="email"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="auth-option">
              {/* <label htmlFor="password">Password:</label> */}
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <button type="submit" className="primary-button">
              Login
            </button>
            {error && <div className="error-message">{error.message}</div>}
          </form>
        </div>
        <div className="auth-register">
          <h2>Not signed up yet?</h2>{" "}
          <div className="auth-button secondary-button">
            <Link to="/register">Sign up here</Link>
          </div>
          <div className="auth-button primary-button">
            <div
              onClick={async () => {
                await registerGuest();
                history.push("/");
              }}
            >
              Continue as guest
            </div>
          </div>
        </div>
      </LoginStyles>
    </LoginPageStyles>
  );
};

const LoginPageStyles = styled.div`
  background: url(${BackgroundImage});
  height: calc(100vh - 76px);
  background-size: cover;
  background-position: 50% 50%;
  margin: 0 16px;
  border-radius: 16px;
`;

const LoginHeader = styled.h1`
  width: 500px;
  margin: 0 auto;
  color: #fff;
  font-size: 60px;
  line-height: 72px;
  text-align: center;
  margin-bottom: 24px;
  padding-top: 60px;
`;

const LoginStyles = styled.div`
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

export default Login;
