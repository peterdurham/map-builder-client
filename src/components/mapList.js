import React from "react";
import { useQuery } from "@apollo/client";
import { useHistory, Link } from "react-router-dom";
import styled from "styled-components";

import { getMapsQuery } from "../graphql/map";
import { createMap } from "../graphql/map";

const MapList = () => {
  const { data, loading } = useQuery(getMapsQuery);
  const history = useHistory();

  async function submitCreateMap(e) {
    try {
      e.preventDefault();
      const response = await createMap(e.target.name.value);
      history.push("map/" + response.createMap.id);
    } catch (e) {
      console.error(e);
    }
  }
 
  
  if (loading) return <div>...loading</div>;

  return (
    <div>
      <MapsFormStyles onSubmit={submitCreateMap}>
        <input type="text" id="name" placeholder="Enter new map name" />
        <button className="secondary-button">Create new map</button>
      </MapsFormStyles>
      {data.getMaps.map((item, index) => (
        <MapListItemStyles key={index}>
          <Link to={`map/${item.id}`}>
            <div>{item.name}</div>
          </Link>
          <div>{item.locations.length} locations</div>
        </MapListItemStyles>
      ))}
    </div>
  );
};

const MapsFormStyles = styled.form`
  display: flex;

  input {
    padding: 8px;
    border-radius: 8px;
    border: 1px solid rgb(205, 209, 212);
    line-height: 1.5;
    font-size: 16px;
    outline: none;
    color: #000;
    flex-grow: 1;
    margin-right: 16px;
  }
`;

const MapListItemStyles = styled.div`
  display: flex;
  border: 1px solid rgb(205, 209, 212);
  border-radius: 8px;
  justify-content: space-between;
  padding: 16px;
  margin: 8px 0;
`;

export default MapList;
