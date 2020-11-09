const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Log {
    _id: ID!
    mare: Mare!
    user: User!
    createdAt: String!
    updatedAt: String!
}

type Mare {
  _id: ID!
  name: String!
  camera: String!
  age: Float!
  dueDate: String!
  status: String
  creator: User!
}

type User {
  _id: ID!
  name: String
  email: String!
  password: String!
  phoneNumber: String
  status: String
  createdLog: [Log!]
}

type AuthData {
  userId: ID!
  token: String!
  tokenExpiration: Int!
}

input MareInput {
  name: String!
  camera: String!
  age: Int!
  dueDate: String!
  status: String
}

input UserInput {
  name: String
  email: String!
  password: String!
  phoneNumber: String
  status: String
}

type RootQuery {
    mares: [Mare!]!
    logs: [Log!]!
    login(email: String!, password: String!): AuthData!
}

type RootMutation {
    createMare(mareInput: MareInput): Mare
    createUser(userInput: UserInput): User
    createLog(mareId: ID!): Log!
    deleteLog(LogId: ID!): Mare!
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
