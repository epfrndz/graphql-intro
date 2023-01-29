import { gql } from "apollo-server-express"

const contactsArray = [
  {
    id: '1',
    firstName: 'Paul',
    lastName: 'Lam',
  },
  {
    id: '2',
    firstName: 'Elon',
    lastName: 'Musk'
  },
  {
    id: '3',
    firstName: 'Steve',
    lastName: 'Jobs'
  }
]

const typeDef = gql`
  type Contact {
    id: String!
    firstName: String
    lastName: String
  }

  type Query {
    contacts: [Contact]
  }
`

const resolvers = {
  Query: {
    contacts: () => contactsArray
  }
}

export { typeDef, resolvers }