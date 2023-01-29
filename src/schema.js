import { gql } from "apollo-server-express"
import { find } from "lodash"

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

const typeDefs = gql`
  type Contact {
    id: String!
    firstName: String
    lastName: String
  }

  type Query {
    contact(id: String!): Contact 
    contacts: [Contact]
  }
`

const resolvers = {
  Query: {
    contacts: () => contactsArray,
    contact: (root, args) => {
      return find(contactsArray, {id: args.id})
    }
  }
}

export { typeDefs, resolvers }