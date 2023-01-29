import { gql } from "apollo-server-express"
import { find, remove } from "lodash"

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
    updateContact(id: String!, firstName: String, lastName: String): Contact
    deleteContact(id: String!): Contact
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
    },
    updateContact: (root, args) => {
      let contact = find(contactsArray, {id: args.id})
      if (!contact) throw new Error(`Couldn't find contact with id ${args.id}`)

      contact.firstName = args.firstName || contact.firstName
      contact.lastName = args.lastName || contact.lastName

      // ⬇️ this doesn't work
      // contact = {...contact, ...args}

      return contact
    },
    deleteContact: (root, args) => {
      const removedContact = find(contactsArray, {id: args.id})

      if (!removedContact) throw new Error(`Couldn't find contact with id ${args.id}`)
      remove(contactsArray, c => {
        return c.id === removedContact.id
      })

      return removedContact
    }
  }
}

export { typeDefs, resolvers }