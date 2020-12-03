import React from "react";
import { Redirect } from "react-router-dom";
import { isLoggedIn } from "../../graphql/auth";

function PleaseSignIn({ children }) {
  const loggedIn = isLoggedIn();

  if (!loggedIn) {
    return <Redirect to="/login" />;
  }
  return children;
}

export default PleaseSignIn;