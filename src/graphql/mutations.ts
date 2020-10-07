/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createNeigh = /* GraphQL */ `
  mutation CreateNeigh(
    $input: CreateNeighInput!
    $condition: ModelNeighConditionInput
  ) {
    createNeigh(input: $input, condition: $condition) {
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
export const updateNeigh = /* GraphQL */ `
  mutation UpdateNeigh(
    $input: UpdateNeighInput!
    $condition: ModelNeighConditionInput
  ) {
    updateNeigh(input: $input, condition: $condition) {
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
export const deleteNeigh = /* GraphQL */ `
  mutation DeleteNeigh(
    $input: DeleteNeighInput!
    $condition: ModelNeighConditionInput
  ) {
    deleteNeigh(input: $input, condition: $condition) {
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
