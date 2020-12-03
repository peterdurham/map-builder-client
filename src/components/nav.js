import React from "react";
import styled from "styled-components";
import { useLocation, useHistory, Link, NavLink } from "react-router-dom";
import { ApolloConsumer } from "@apollo/client";
import { isLoggedIn, logoutUser } from "../graphql/auth";
import {BsArrowLeft} from 'react-icons/bs'

const Nav = () => {
  const location = useLocation();
  const history = useHistory();

  console.log(location)
  return (
    <NavbarStyles>
      {isLoggedIn() && location.pathname.includes("/map") ? (
        <div className="nav-left">
        <Link to="/"><span className="back-arrow">&#x2190;</span> Back to Map List</Link>
        </div>
      ) : (<div className="nav-left"></div>)}
      <div id="title">Map Builder</div>
      <div className="nav-right">
        {isLoggedIn() ? (
          <ApolloConsumer>
            {(client) => (
              <button
                onClick={() => {
                  logoutUser();
                  client.cache.reset();
                  history.push("/login");
                }}
              >
                Logout
              </button>
            )}
          </ApolloConsumer>
        ) : (
          <></>
        )}
      </div>
    </NavbarStyles>
  );
};
export default Nav;

const NavbarStyles = styled.nav`
  height: 60px;
  width: 100vw;
  background: #fff;
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .back-arrow {
    font-weight: 700;
    font-size: 20px;
  }
  #title {
    font-weight: 700;
    font-size: 24px;
    display: flex;
    align-items: center;
  }
  .nav-left {
    width: 138px;
  }
  .nav-right {
    width: 138px;
    text-align: right;
  }

`;
