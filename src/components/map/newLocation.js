import React from "react";
import styled from "styled-components";

import { GiCampingTent as CampingIcon } from "react-icons/gi";
import { MdCameraAlt as AttractionIcon } from "react-icons/md";
import { BiBed as AccomodationIcon } from "react-icons/bi";
import { MdRestaurant as RestaurantIcon } from "react-icons/md";
import { FaMountain as RecreationIcon } from "react-icons/fa";
import { FiMusic as EntertainmentIcon } from "react-icons/fi";

const NewLocation = ({
  handleUpdateLocation,
  newLocation,
  setNewLocation,
  setAddingLocation,
  setUpdatingLocation,
  updatingLocation,
  errors,
  setErrors
}) => {
  return (
    <NewLocationStyles>
      <span className="popup-header">New Location:</span>
      <form onSubmit={handleUpdateLocation}>
        <input
          className="popup-name"
          placeholder="Name"
          value={newLocation.name}
          onChange={(e) =>
            setNewLocation({ ...newLocation, name: e.target.value })
          }
        />

        <div className="popup-type">
          <span
            onClick={() =>
              setNewLocation({ ...newLocation, locationtype: "Camping" })
            }
            className={
              "location-type camping-option" +
              (newLocation && newLocation.locationtype === "Camping"
                ? " camping-option-selected"
                : "")
            }
          >
            <CampingIcon />
            <span className="tooltip">Camping</span>
          </span>
          <span
            onClick={() =>
              setNewLocation({ ...newLocation, locationtype: "Attraction" })
            }
            className={
              "location-type attraction-option" +
              (newLocation && newLocation.locationtype === "Attraction"
                ? " attraction-option-selected"
                : "")
            }
          >
            <AttractionIcon />
            <span className="tooltip">Attraction</span>
          </span>
          <span
            onClick={() =>
              setNewLocation({ ...newLocation, locationtype: "Accomodation" })
            }
            className={
              "location-type accomodation-option" +
              (newLocation && newLocation.locationtype === "Accomodation"
                ? " accomodation-option-selected"
                : "")
            }
          >
            <AccomodationIcon />
            <span className="tooltip">Accomodations</span>
          </span>
          <span
            onClick={() =>
              setNewLocation({ ...newLocation, locationtype: "Restaurant" })
            }
            className={
              "location-type restaurant-option" +
              (newLocation && newLocation.locationtype === "Restaurant"
                ? " restaurant-option-selected"
                : "")
            }
          >
            <RestaurantIcon />
            <span className="tooltip">Food & Drink</span>
          </span>
          <span
            onClick={() =>
              setNewLocation({ ...newLocation, locationtype: "Recreation" })
            }
            className={
              "location-type recreation-option" +
              (newLocation && newLocation.locationtype === "Recreation"
                ? " recreation-option-selected"
                : "")
            }
          >
            <RecreationIcon />
            <span className="tooltip">Outdoor Recreation</span>
          </span>
          <span
            onClick={() =>
              setNewLocation({ ...newLocation, locationtype: "Entertainment" })
            }
            className={
              "location-type entertainment-option" +
              (newLocation && newLocation.locationtype === "Entertainment"
                ? " entertainment-option-selected"
                : "")
            }
          >
            <EntertainmentIcon />
            <span className="tooltip">Entertainment & Nightlife</span>
          </span>
        </div>
        <textarea
          className="popup-notes"
          placeholder="Notes"
          value={newLocation.notes}
          onChange={(e) =>
            setNewLocation({ ...newLocation, notes: e.target.value })
          }
        />
        <div className="popup-buttons">
          <button
            onClick={() => {
              setAddingLocation(false);
              setUpdatingLocation(false);
              setNewLocation({});
              setErrors({})
            }}
            className="secondary-button"
          >
            Cancel
          </button>
          <button type="submit" className="primary-button">
            {updatingLocation ? "Update": "Confirm"}
          </button>
        </div>
        <div className="form-errors">

        {errors.name && (<div className="form-error">{errors.name}</div>)}
        {errors.locationtype && (<div className="form-error">{errors.locationtype}</div>)}
        </div>
      </form>
    </NewLocationStyles>
  );
};
export default NewLocation;

const NewLocationStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  color: rgb(134, 144, 153);

  & .popup-header {
    margin-bottom: 8px;
  }

  & input {
    width: 100%;
    padding: 8px;
    border-radius: 8px;
    border: 1px solid rgb(205, 209, 212);
    line-height: 1.5;
    font-size: 16px;
    outline: none;
    color: #000;
  }
  & textarea {
    border-radius: 8px;
    border: 1px solid rgb(205, 209, 212);
    padding: 8px;
    font-size: 16px;
    line-height: 1.5;
    resize: none;
    outline: none;
    width: 100%;
    height: 78px;
    display: block;
    margin-bottom: 8px;
  }

  & input::placeholder,
  & textarea::placeholder {
    color: #000;
  }

  & .popup-type {
    display: flex;
    margin: 8px 0;
  }

  & .popup-type .location-type {
    margin: 0px;
    border-radius: 8px;
    cursor: pointer;
    position: relative;
    /* display: inline-block; */
    text-align: center;
    white-space: nowrap;
    font-size: 20px;
    line-height: 1.43;
    padding: 8px;
    width: 100%;
    font-weight: normal;
    /* color: rgb(59, 65, 68); */
    border: 2px solid transparent;
    box-shadow: rgb(205, 209, 212) 0px 0px 0px 1px;
  }

  & .popup-type span svg {
    transform: translateY(2px);
  }

  & .popup-type span:not(:last-child) {
    margin-right: 4px;
  }

  .tooltip {
    display: none;
    position: absolute;
    bottom: -30px;
    left: 50%;
    background: #fff;
    transform: translateX(-50%);
    font-size: 14px;
    box-shadow: rgba(59, 65, 68, 0.09) 0px 17px 21px -1px;
    padding: 4px 8px;
    border-radius: 4px;
    border: 1px solid rgb(205, 209, 212);
    font-weight: 700;
    z-index: 50;
  }

  .camping-option {
    color: #71bf43;
    position: relative;
  }
  .camping-option:hover,
  .camping-option-selected {
    background: #71bf43;
    color: #fff;
  }

  .camping-option:hover .tooltip {
    display: block;
    color: #71bf43;
  }

  .attraction-option {
    color: #00acdc;
  }
  .attraction-option:hover,
  .attraction-option-selected {
    background: #00acdc;
    color: #fff;
  }
  .attraction-option:hover .tooltip {
    display: block;
    color: #00acdc;
  }

  .accomodation-option {
    color: #00385c;
  }
  .accomodation-option:hover,
  .accomodation-option-selected {
    background: #00385c;
    color: #fff;
  }
  .accomodation-option:hover .tooltip {
    display: block;
    color: #00385c;
  }

  .restaurant-option {
    color: #fbaf17;
  }
  .restaurant-option:hover,
  .restaurant-option-selected {
    background: #fbaf17;
    color: #fff;
  }
  .restaurant-option:hover .tooltip {
    display: block;
    color: #fbaf17;
  }

  .recreation-option {
    color: #009f4f;
  }
  .recreation-option:hover,
  .recreation-option-selected {
    background: #009f4f;
    color: #fff;
  }
  .recreation-option:hover .tooltip {
    display: block;
    color: #009f4f;
  }

  .entertainment-option {
    color: #56235d;
  }
  .entertainment-option:hover,
  .entertainment-option-selected {
    background: #56235d;
    color: #fff;
  }
  .entertainment-option:hover .tooltip {
    display: block;
    color: #56235d;
  }

  & .popup-buttons button:first-child {
    margin-right: 8px;
  }

  & .popup-buttons button {
    width: calc(50% - 4px);
  }
  & .form-errors {
    margin-top: 8px;
  }
  & .form-error {
    color: rgb(217,60,35);
  }
`;
