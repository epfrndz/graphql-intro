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

  type Mutation {
    addContact(id: String!, firstName: String!, lastName: String!): Contact
  }
`

const resolvers = {
  Query: {
    contacts: () => contactsArray,
    contact: (root, args) => {
      return find(contactsArray, {id: args.id})
    }
  },
  Mutation: {
    addContact: (root, args) => {
      const newContact = {
        id: args.id,
        firstName: args.firstName,
        lastName: args.lastName
      }
      contactsArray.push(newContact)
      return newContact
    }
  }
}

export { typeDefs, resolvers }