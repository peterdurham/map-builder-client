import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import ReactMapGL, { Marker, Popup, FlyToInterpolator } from "react-map-gl";
import mapboxgl from "mapbox-gl";

import NewLocation from "./newLocation";

import AttractionsIcon from "../../images/attractions.svg";

import { GiCampingTent as CampingIcon } from "react-icons/gi";
import { MdCameraAlt as AttractionIcon } from "react-icons/md";
import { BiBed as AccomodationIcon } from "react-icons/bi";
import { MdRestaurant as RestaurantIcon } from "react-icons/md";
import { FaMountain as RecreationIcon } from "react-icons/fa";
import { FiMusic as EntertainmentIcon } from "react-icons/fi";

const styles = [
  "mapbox://styles/mapbox/streets-v11",
  "mapbox://styles/mapbox/outdoors-v11",
  "mapbox://styles/mapbox/light-v10",
  "mapbox://styles/mapbox/dark-v10",
  "mapbox://styles/mapbox/satellite-v9",
  "mapbox://styles/mapbox/satellite-streets-v11",
];

const API_KEY = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

mapboxgl.accessToken = API_KEY;

const Map = ({
  addingLocation,
  setAddingLocation,
  newLocation,
  setNewLocation,
  activeMap,
  handleAddLocation,
  flyToLocation,
  popup,
  setPopup,
  id,
}) => {
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  });

 

  useEffect(() => {
    window.addEventListener("resize", () => {
      console.log("resizing")
    
    })
  }, [])

  React.useEffect(() => {
    if (flyToLocation) {
      setViewport({
        width: viewport.width,
        height: viewport.height,
        latitude: flyToLocation.lat,
        longitude: flyToLocation.lng,
        zoom: viewport.zoom,
        transitionDuration: 300,
        transitionInterpolator: new FlyToInterpolator(),
      });
      console.log("FLY TO LOCATION", flyToLocation);
    }
  }, [flyToLocation]);

  return (
    <MapStyles>
      {addingLocation && (
        <div id="map-message">Click the map to add a location</div>
      )}
      <ReactMapGL
        {...viewport}
        height="100%"
        width="100%"
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapStyle={"mapbox://styles/mapbox/outdoors-v11"}
        onClick={(e) => {
          if (addingLocation && newLocation && !newLocation.lngLat) {
            const location = { lngLat: e.lngLat };
            setNewLocation(location);
          } else {
            console.log("dont add location");
            setPopup(null)
          }
        }}
      >
        {newLocation && newLocation.lngLat && (
          <Marker
            key={2}
            offsetTop={-48}
            offsetLeft={-24}
            latitude={newLocation.lngLat[1]}
            longitude={newLocation.lngLat[0]}
          >
            <img src="https://img.icons8.com/color/48/000000/marker.png" />
          </Marker>
        )}
        <Marker
          key={1}
          offsetTop={-48}
          offsetLeft={-24}
          latitude={37.78}
          longitude={-122.41}
        >
          <img src={AttractionsIcon} />
        </Marker>
        {activeMap.locations.map((location) => {
          const { locationtype: type } = location;

          return (
            <Marker
              key={location.id}
              offsetTop={-28}
              offsetLeft={-12}
              latitude={location.lat}
              longitude={location.lng}
            >
              <div className="marker-container" onClick={() => setPopup(location)}>
              {type === "Camping" && (
                <CampingIcon className="map-icon camping-icon" />
              )}
              {type === "Attraction" && (
                <AttractionIcon className="map-icon attraction-icon" />
              )}
              {type === "Accomodation" && (
                <AccomodationIcon className="map-icon accomodation-icon" />
              )}
              {type === "Restaurant" && (
                <RestaurantIcon className="map-icon restaurant-icon" />
              )}
              {type === "Recreation" && (
                <RecreationIcon className="map-icon recreation-icon" />
              )}
              {type === "Entertainment" && (
                <EntertainmentIcon className="map-icon entertainment-icon" />
              )}
              </div>
            </Marker>
          );
        })}
        {addingLocation && newLocation && newLocation.lngLat && (
          <Popup
            latitude={newLocation.lngLat[1]}
            longitude={newLocation.lngLat[0]}
            closeButton={false}
            closeOnClick={false}
            onClose={() => newLocation({})}
            anchor="top"
          >
            <NewLocation
              handleAddLocation={handleAddLocation}
              newLocation={newLocation}
              setNewLocation={setNewLocation}
              setAddingLocation={setAddingLocation}
            />
          </Popup>
        )}
        {popup && (
          <Popup
          latitude={popup.lat}
          longitude={popup.lng}
          closeButton={false}
          closeOnClick={false}
          onClose={() => setPopup(null)}
          anchor="top"
          >
            Popup here
            </Popup>
        )}
      </ReactMapGL>
    </MapStyles>
  );
};

export default Map;

const MapStyles = styled.div`
  width: 66%;
  position: relative;
  margin-right: 16px;
  margin-bottom: 16px;

  & #map-message {
    position: absolute;
    top: 16px;
    left: 16px;
    z-index: 20;
    padding: 8px 16px;
    background: #fff;
    border-radius: 8px;
    font-size: 16px;
    line-height: 1.5;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(205, 209, 212);
    box-shadow: rgba(59, 65, 68, 0.09) 0px 17px 21px -1px;
  }

  .marker-container {
    cursor: pointer;
  }
  .map-icon {
    font-size: 24px;
    background: white;
    border-radius: 50%;
    border: 1px solid rgb(77, 77, 77);
    font-size: 32px;
    padding: 4px;
  }
  .camping-icon {
    color: #71bf43;
  }
  .attraction-icon {
    color: #00acdc;
  }
  .accomodation-icon {
    color: #00385c;
  }
  .restaurant-icon {
    color: #fbaf17;
  }
  .recreation-icon {
    color: #009f4f;
  }
  .entertainment-icon {
    color: #56235d;
  }
`;
