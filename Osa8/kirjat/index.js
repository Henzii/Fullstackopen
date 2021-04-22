const { ApolloServer, gql, UserInputError, AuthenticationError, PubSub } = require('apollo-server')
const uuid = require('uuid').v4
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const jwt = require('jsonwebtoken')
const JWT_SECRET = 'FSDVNVn3F@£F!"FQD133fj3gLWDKF"klg132£13€@µµ£1ÖL2R13GFqlköfM23E'

const MONGODB_URI = 'SALAINEN'

const pubsub = new PubSub()

console.log(`Yhdistetään mongoon: ${MONGODB_URI}...`)
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('Yhdistetty MongoDB!')
  }).catch((error) => {
    console.log(`Virhe yhdistettäessä Mongoon: ${error.message}`)
  })

const typeDefs = gql`
    type User {
      username: String!
      favoriteGenre: String!
      id: ID!
    }
    type Token {
      value: String!
    }

    type Book {
        title: String!
        author: Author!
        published: Int!
        genres: [String!]!
        id: ID!
    }
    type Author {
        name: String!
        born: Int
        bookCount: Int
    }
    type Query {
        me: User
        bookCount: Int!
        authorCount: Int!
        allBooks (name: String, genre: String): [Book!]!
        allAuthors: [Author!]!
    }
    type Subscription {
        bookAdded: Book!
    }
    type Mutation {
        addBook (
            title: String!
            author: String!
            published: Int!
            genres: [String!]
        ):Book
        editAuthor (
            name: String!
            setBornTo: Int!
        ): Author
        createUser(
            username: String!
            favoriteGenre: String!
        ): User
        login(
          username: String!
          password: String!
        ): Token
    }
`
const resolvers = {
  Author: {
    bookCount: (root) => {
      return root.books.length
    }
  },
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.genre) {
        return await Book.find({ genres: { $in: [args.genre] } }).populate('author')
      }
      return await Book.find({}).populate('author')
    },
    allAuthors: async () => {
      const authors = await Author.find({})
      return authors
    },
    me: async (root, args, context) => {
      return await User.findById(context.id)
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.id || !context.username) {
        throw new AuthenticationError("Access denied!")
      }
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author })
        try {
          await author.save()
        } catch (error) {
          throw new UserInputError(error.message, { invalidArgs: args.author })
        }
      }

      const uusiKirja = new Book({ ...args, author: author._id })
      await uusiKirja.populate('author').execPopulate()

      pubsub.publish('BOOK_ADDED', { bookAdded: uusiKirja })

      await uusiKirja.save().catch(error => {
        console.log('Error uusiKirja.save()')
        throw new UserInputError(error.message, { invalidArgs: args })
      })

      author.books = author.books.concat(uusiKirja._id)
      await author.save()

      return uusiKirja

    },
    editAuthor: async (root, args, context) => {

      if (!context.id || !context.username) {
        throw new AuthenticationError("Access denied!")
      }

      const author = await Author.findOne({ name: args.name })
      if (!author) {
        throw new UserInputError('Nimeä ei löydy', { invalidArgs: args.name })
      }
      author.born = args.setBornTo
      await author.save()
      return author
    },
    createUser: async (root, args) => {
      const user = new User({ ...args })
      return user.save().catch(error => {
        throw new UserInputError(`Virhe käyttäjän luonnissa: ${error.message}`, { invalidArgs: args.username })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      console.log(user)
      if (!user || args.password != 'salasana') {
        throw new UserInputError("Väärä tunnus tai salasana")
      }
      const userToken = {
        username: user.username,
        id: user._id
      }
      return { value: jwt.sign(userToken, JWT_SECRET) }
    }
  }
}
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodeToken = jwt.verify(auth.substring(7), JWT_SECRET)
      return { id: decodeToken.id, username: decodeToken.username }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})