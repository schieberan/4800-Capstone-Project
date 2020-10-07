/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateNeighInput = {
  id?: string | null,
  camera: string,
  present: string,
  number: string,
  status: string,
};

export type ModelNeighConditionInput = {
  camera?: ModelStringInput | null,
  present?: ModelStringInput | null,
  number?: ModelStringInput | null,
  status?: ModelStringInput | null,
  and?: Array< ModelNeighConditionInput | null > | null,
  or?: Array< ModelNeighConditionInput | null > | null,
  not?: ModelNeighConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type UpdateNeighInput = {
  camera?: string | null,
  present?: string | null,
  number?: string | null,
  status?: string | null,
};

export type DeleteNeighInput = {
  id?: string | null,
};

export type ModelNeighFilterInput = {
  camera?: ModelStringInput | null,
  present?: ModelStringInput | null,
  number?: ModelStringInput | null,
  status?: ModelStringInput | null,
  and?: Array< ModelNeighFilterInput | null > | null,
  or?: Array< ModelNeighFilterInput | null > | null,
  not?: ModelNeighFilterInput | null,
};

export type CreateNeighMutationVariables = {
  input: CreateNeighInput,
  condition?: ModelNeighConditionInput | null,
};

export type CreateNeighMutation = {
  createNeigh:  {
    __typename: "Neigh",
    id: string,
    camera: string,
    present: string,
    number: string,
    status: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateNeighMutationVariables = {
  input: UpdateNeighInput,
  condition?: ModelNeighConditionInput | null,
};

export type UpdateNeighMutation = {
  updateNeigh:  {
    __typename: "Neigh",
    id: string,
    camera: string,
    present: string,
    number: string,
    status: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteNeighMutationVariables = {
  input: DeleteNeighInput,
  condition?: ModelNeighConditionInput | null,
};

export type DeleteNeighMutation = {
  deleteNeigh:  {
    __typename: "Neigh",
    id: string,
    camera: string,
    present: string,
    number: string,
    status: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetNeighQueryVariables = {
  id: string,
};

export type GetNeighQuery = {
  getNeigh:  {
    __typename: "Neigh",
    id: string,
    camera: string,
    present: string,
    number: string,
    status: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListNeighsQueryVariables = {
  filter?: ModelNeighFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListNeighsQuery = {
  listNeighs:  {
    __typename: "ModelNeighConnection",
    items:  Array< {
      __typename: "Neigh",
      id: string,
      camera: string,
      present: string,
      number: string,
      status: string,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateNeighSubscription = {
  onCreateNeigh:  {
    __typename: "Neigh",
    id: string,
    camera: string,
    present: string,
    number: string,
    status: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateNeighSubscription = {
  onUpdateNeigh:  {
    __typename: "Neigh",
    id: string,
    camera: string,
    present: string,
    number: string,
    status: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteNeighSubscription = {
  onDeleteNeigh:  {
    __typename: "Neigh",
    id: string,
    camera: string,
    present: string,
    number: string,
    status: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};
