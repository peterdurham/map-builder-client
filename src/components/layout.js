import React from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";

import Nav from './nav'

const theme = {};

const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  color: rgb(59,65,68);
}
a {
  color: rgb(59,65,68);
  text-decoration: none;
  transition: all .3s;
}
a:hover {
  color: rgb(217, 60, 35);
  
}
button {
  border-radius: 8px;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(205,209,212);
  cursor: pointer;
  font-size: 16px;
  line-height: 1.5;
  padding: 8px 16px;
  font-weight: 700;
  background: #fff;
}
button:focus {
  outline: none;
}
button:hover {
  background: rgb(232,233,234);
}
.primary-button {
  color: rgb(255, 255, 255);
  background-color: rgb(217, 60, 35);
}
.primary-button:hover {
  background: #fff;
  color: rgb(217, 60, 35);
  border: 1px solid rgb(217, 60, 35);
}
.secondary-button {
  background: #fff;
  color: rgb(59, 65, 68);
  border-color: rgb(205, 209, 212);
}

.mapboxgl-map {
  border-radius: 16px;
}

.map-container {
  height: 100%;
}
.overlays {
  cursor: pointer;
}

div.mapboxgl-popup-content {
  padding: 16px 16px 24px;
}
`;

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Nav />
      {children}
    </ThemeProvider>
  );
};
export default Layout;
