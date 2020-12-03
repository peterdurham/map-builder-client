import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from 'styled-components'

import { getMap } from "../../graphql/map";
import Locations from "./locations";
import Map from "./map";
import { addLocation } from "../../graphql/map";

const MapView = () => {
  const [addingLocation, setAddingLocation] = useState(false);
  const [newLocation, setNewLocation] = useState({});
  const [maps, setMaps] = useState([]);
  const [activeMap, setActiveMap] = useState(null);
  const [flyToLocation, setFlyToLocation] = useState(null);
  const [popup, setPopup] = useState(null);
  let { id } = useParams();

 

  useEffect(() => {
    
    async function fetchData() {
      const response = await getMap(id);
      setActiveMap(response.getMap);
    }
    if (!addingLocation) {
      fetchData();
    }
  }, [addingLocation]);

  
  async function handleAddLocation(e) {
    try {
      e.preventDefault();

      const response = await addLocation(
        id,
        newLocation.name,
        newLocation.locationtype,
        newLocation.notes,
        newLocation.lngLat[0],
        newLocation.lngLat[1]
      );
        

      setAddingLocation(false);
      setNewLocation({});
    } catch (e) {
      console.error(e);
    }
  }

  if (!activeMap) return <div>Loading...</div>;
  else {
    return (
      <MapViewStyles>
        <Locations
          addingLocation={addingLocation}
          setAddingLocation={setAddingLocation}
          setNewLocation={setNewLocation}
          mapName={activeMap.name}
          activeMap={activeMap}
          setFlyToLocation={setFlyToLocation}
          setPopup={setPopup}
        />
        <Map
          addingLocation={addingLocation}
          setAddingLocation={setAddingLocation}
          newLocation={newLocation}
          setNewLocation={setNewLocation}
          activeMap={activeMap}
          handleAddLocation={handleAddLocation}
          flyToLocation={flyToLocation}
          id={id}
          popup={popup}
          setPopup={setPopup}
        />
      </MapViewStyles>
    );
  }
};
export default MapView;

const MapViewStyles = styled.div`

  display: flex;
  width: 100vw;
  height: calc(100vh - 60px);


`