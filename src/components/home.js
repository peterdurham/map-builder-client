import React from "react";
import styled from "styled-components";

import PleaseSignIn from "./auth/pleaseSignIn";
import { useQuery } from "@apollo/client";
import { getUserQuery } from "../graphql/auth";
import MapList from "./mapList";

const Home = () => {
  const { data, loading } = useQuery(getUserQuery);

  if (loading) return <div>...loading</div>;

  return (
    <PleaseSignIn>
      <MapListContainer>
        <h2>{data && data.getUser && data.getUser.username}'s Maps:</h2>
        <MapList />
      </MapListContainer>
    </PleaseSignIn>
  );
};
const MapListContainer = styled.div`
  width: 600px;
  margin: 0 auto;

  h2 {
    margin-bottom: 16px;
    margin-top: 20px;
    text-align: center;
  }
`;

export default Home;
