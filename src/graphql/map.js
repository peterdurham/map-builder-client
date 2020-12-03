import { gql } from "@apollo/client";
import client from "./client";

export const addLocationMutation = gql`
  mutation addLocation(
    $id: ID
    $name: String
    $locationtype: String
    $notes: String
    $lng: Float
    $lat: Float
  ) {
    addLocation(
      id: $id
      name: $name
      locationtype: $locationtype
      notes: $notes
      lng: $lng
      lat: $lat
    ) {
      name
      locationtype
      notes
      lng
      lat
    }
  }
`;

export const createMapMutation = gql`
  mutation createMap($name: String) {
    createMap(name: $name) {
      name
      id
    }
  }
`;

export const getMapsQuery = gql`
  query getMaps {
    getMaps {
      name
      id
      locations {
        id
      }
    }
  }
`;

export const getMapQuery = gql`
  query getMap($id: ID) {
    getMap(id: $id) {
      name
      id
      locations {
        id
        name
        notes
        locationtype
        lng
        lat
      }
    }
  }
`;

export async function addLocation(id, name, locationtype, notes, lng, lat) {
  const { data } = await client.mutate({
    mutation: addLocationMutation,
    variables: { id, name, locationtype, notes, lng, lat },
  });
  return data;
}

export async function createMap(name) {
  const { data } = await client.mutate({
    mutation: createMapMutation,
    variables: { name },
  });

  return data;
}

export async function getMap(id) {
  const { data } = await client.query({
    query: getMapQuery,
    variables: { id },
  });
  return data;
}
