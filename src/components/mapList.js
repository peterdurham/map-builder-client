import React from "react";
import { useQuery } from "@apollo/client";
import { useHistory, Link } from "react-router-dom";
import styled from "styled-components";

import { getMapsQuery } from "../graphql/map";
import { createMap } from "../graphql/map";

import { GiCampingTent as CampingIcon } from "react-icons/gi";
import { MdCameraAlt as AttractionIcon } from "react-icons/md";
import { BiBed as AccomodationIcon } from "react-icons/bi";
import { MdRestaurant as RestaurantIcon } from "react-icons/md";
import { FaMountain as RecreationIcon } from "react-icons/fa";
import { FiMusic as EntertainmentIcon } from "react-icons/fi";

const MapList = () => {
  const { data, loading } = useQuery(getMapsQuery, { fetchPolicy: "no-cache" });
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
      {data.getMaps.map((item, index) => {
        const itemTypes = {
          Recreation: 0,
          Camping: 0,
          Attraction: 0,
          Restaurant: 0,
          Entertainment: 0,
          Accomodation: 0,
        };

        item.locations.forEach((location) => {
          itemTypes[location.locationtype] =
            itemTypes[location.locationtype] + 1;
        });

        return (
          <MapListItemStyles key={index}>
            <Link to={`map/${item.id}`}>
              <div>{item.name}</div>

              <div className="map-icons">
                {Object.keys(itemTypes).map((key, index, array) => {
                  if (itemTypes[key] > 0) {
                    return (
                      <span key={key} className="map-icon-count">
                        {" "}
                        {key === "Camping" && (
                          <CampingIcon className="map-icon camping-icon" />
                        )}
                        {key === "Attraction" && (
                          <AttractionIcon className="map-icon attraction-icon" />
                        )}
                        {key === "Accomodation" && (
                          <AccomodationIcon className="map-icon accomodation-icon" />
                        )}
                        {key === "Restaurant" && (
                          <RestaurantIcon className="map-icon restaurant-icon" />
                        )}
                        {key === "Recreation" && (
                          <RecreationIcon className="map-icon recreation-icon" />
                        )}
                        {key === "Entertainment" && (
                          <EntertainmentIcon className="map-icon entertainment-icon" />
                        )}
                        {itemTypes[key]}{" "}
                        {index < array.length - 1 && (
                          <span class="map-icon-separator">|</span>
                        )}
                      </span>
                    );
                  } else {
                    return null
                  }
                })}
                {item.locations.length === 0 && <span>0 locations</span>}
              </div>
            </Link>
          </MapListItemStyles>
        );
      })}
    </div>
  );
};

const MapsFormStyles = styled.form`
  display: flex;
  margin-top: 20px;
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
  border: 1px solid rgb(205, 209, 212);
  border-radius: 8px;
  padding: 16px;
  margin: 8px 0;

  & a {
    display: flex;
    justify-content: space-between;
  }

  & .map-icons {
    display: flex;
  }
  & .map-icon-count:not(:last-child) {
    display: flex;
    align-items: center;
    margin-right: 8px;
  }
  & .map-icon-count svg {
    margin-right: 4px;
  }
  & .map-icon-separator {
    margin-left: 4px;
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

export default MapList;
