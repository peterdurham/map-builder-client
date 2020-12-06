import React from "react";
import styled from "styled-components";
import { GiCampingTent as CampingIcon } from "react-icons/gi";
import { MdCameraAlt as AttractionIcon } from "react-icons/md";
import { BiBed as AccomodationIcon } from "react-icons/bi";
import { MdRestaurant as RestaurantIcon } from "react-icons/md";
import { FaMountain as RecreationIcon } from "react-icons/fa";
import { FiMusic as EntertainmentIcon } from "react-icons/fi";
const Locations = ({
  addingLocation,
  setAddingLocation,
  setNewLocation,
  mapName,
  activeMap,
  setFlyToLocation,
  setPopup,
}) => {
  return (
    <LocationsStyles>
      <header>
        <h2>{mapName}</h2>
        {addingLocation ? (
          <button
            onClick={() => {
              setAddingLocation(false);
              setNewLocation({name: "", locationtype: null, notes: ""});
            }}
            className="secondary-button"
          >
            Cancel
          </button>
        ) : (
          <button
              onClick={() => {
                setPopup(null)
                setAddingLocation(true)
              }}
            className="secondary-button"
          >
            Add Location +
          </button>
        )}
      </header>
      <div id="locations">
        {activeMap.locations &&
          activeMap.locations.map((location) => {
            const { locationtype: type } = location;
            return (
              <div className="location" key={location.id} onClick={() => {
                setAddingLocation(false)
                setNewLocation({name: "", locationtype: null, notes: ""})
                setFlyToLocation(location)
                setPopup(location)

              }}>
                <div>{location.name}</div>
                <div> {type === "Camping" && (
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
                  )}</div>
              </div>
            )
          })}
      </div>
    </LocationsStyles>
  );
};
export default Locations;

const LocationsStyles = styled.div`
  width: 33%;

  & header {
    display: flex;
    justify-content: space-between;
    padding: 16px;
  }
  #locations {
    max-height: calc(100vh - 150px);
    min-height: calc(100vh - 150px);
    overflow-y: auto;
    margin: 0 16px;
  }
  #locations .location {
    border: 1px solid rgb(205,209,212);
    border-radius: 4px;
    padding: 8px 16px;
    /* margin: 0 16px 8px 16px; */
    margin: 0px 8px 8px 0;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    
  }
  #locations .location:hover {
    background: rgb(232,233,234);
  }
  #locations .map-icon {
    font-size: 20px;
    transform: translateY(2px);
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
