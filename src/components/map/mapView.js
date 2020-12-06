import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import PleaseSignIn from '../auth/pleaseSignIn'
import { getMap } from "../../graphql/map";
import Locations from "./locations";
import Map from "./map";
import { addLocation, updateLocation } from "../../graphql/map";

const MapView = () => {
  const [addingLocation, setAddingLocation] = useState(false);
  const [updatingLocation, setUpdatingLocation] = useState(false)
  const [newLocation, setNewLocation] = useState({name: "", locationtype: null, notes: ""});
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
    if (!addingLocation && !updatingLocation) {
      fetchData();
    }
  }, [addingLocation, updatingLocation, id]);

  async function handleUpdateLocation(e) {
    try {
      e.preventDefault();


      let newErrors = {};

      if (!newLocation.name) {
        newErrors.name = "Please choose a location name";
      }
      if (!newLocation.locationtype) {
        newErrors.locationtype = "Please choose a location type";
      }


      if (newLocation.name && newLocation.locationtype) {

        if (addingLocation) {
          await addLocation(
            id,
            newLocation.name,
            newLocation.locationtype,
            newLocation.notes,
            newLocation.lngLat[0],
            newLocation.lngLat[1]
          );
          setAddingLocation(false);
          setNewLocation({name: "", locationtype: null, notes: ""});
          setErrors({});
        } else if (updatingLocation) {
      
          await updateLocation(
            id,
            newLocation.id,
            newLocation.name,
            newLocation.locationtype,
            newLocation.notes,
          )
          setUpdatingLocation(false);
          setNewLocation({name: "", locationtype: null, notes: ""});
          setErrors({});
        }

       
      } else {
        setErrors(newErrors);
      }
    } catch (e) {
      console.error(e);
    }
  }



  if (!activeMap) return <div>Loading...</div>;
  else {
    return (
      <PleaseSignIn>
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
          updatingLocation={updatingLocation}
          setUpdatingLocation={setUpdatingLocation}
          newLocation={newLocation}
          setNewLocation={setNewLocation}
          activeMap={activeMap}
          handleUpdateLocation={handleUpdateLocation}
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
};
export default MapView;

const MapViewStyles = styled.div`
  display: flex;
  width: 100vw;
  height: calc(100vh - 60px);

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;
