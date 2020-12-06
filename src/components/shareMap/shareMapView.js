import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import PleaseSignIn from "../auth/pleaseSignIn";
import { getMap } from "../../graphql/map";
import ShareMapLocations from "./shareMapLocations";
import ShareMap from "./shareMap";
import { addLocation, updateLocation } from "../../graphql/map";

const ShareMapView = () => {
  const [maps, setMaps] = useState([]);
  const [activeMap, setActiveMap] = useState(null);
  const [flyToLocation, setFlyToLocation] = useState(null);
  const [popup, setPopup] = useState(null);
  const [errors, setErrors] = useState({});
  let { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      const response = await getMap(id);
      setActiveMap(response.getMap);
    }

    fetchData();
  }, []);

  console.log(activeMap);

  if (!activeMap) return <div>Loading...</div>;
  else {
    if (activeMap.share) {
      return (
        <MapViewStyles>
          <ShareMapLocations
            mapName={activeMap.name}
            activeMap={activeMap}
            setFlyToLocation={setFlyToLocation}
            setPopup={setPopup}
          />
          <ShareMap
            activeMap={activeMap}
            flyToLocation={flyToLocation}
            id={id}
            popup={popup}
            setPopup={setPopup}
            errors={errors}
            setErrors={setErrors}
          />
        </MapViewStyles>
      );
    } else {
      return (
        <PleaseSignIn>
          <MapViewStyles>
            <ShareMapLocations
              mapName={activeMap.name}
              activeMap={activeMap}
              setFlyToLocation={setFlyToLocation}
              setPopup={setPopup}
            />
            <ShareMap
              activeMap={activeMap}
              flyToLocation={flyToLocation}
              id={id}
              popup={popup}
              setPopup={setPopup}
              errors={errors}
              setErrors={setErrors}
            />
          </MapViewStyles>
        </PleaseSignIn>
      );
    }
  }
};
export default ShareMapView;

const MapViewStyles = styled.div`
  display: flex;
  width: 100vw;
  height: calc(100vh - 60px);
`;
