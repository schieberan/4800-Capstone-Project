/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getNeigh = /* GraphQL */ `
  query GetNeigh($id: ID!) {
    getNeigh(id: $id) {
      id
      camera
      present
      number
      status
      createdAt
      updatedAt
    }
  }
`;
export const listNeighs = /* GraphQL */ `
  query ListNeighs(
    $filter: ModelNeighFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNeighs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        camera
        present
        number
        status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
