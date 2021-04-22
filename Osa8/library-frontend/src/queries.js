import { gql } from '@apollo/client'

export const BOOK_ADDED = gql`
    subscription {
        bookAdded {
            title
            author { name }
            published
            genres
        }
    }
`
export const ALL_AUTHORS = gql`
    query {
        allAuthors {
           name
           born
           bookCount
        }
        
    }
`
export const ALL_BOOKS = gql`
    query allBooks ( $name: String, $genre: String ) {
            allBooks( name: $name, genre: $genre) {
                title
                author {
                    name
                }
                published
                genres
            }
        
    }
`
export const ADD_BOOK = gql`
    mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]) {
        addBook(
            title: $title,
            author: $author,
            published: $published,
            genres: $genres
        ) {
            title
            author { name }
            published
            genres
        }
        
    }
`
export const EDIT_AUTHOR = gql`
    mutation editAuthor($name: String!, $setBornTo: Int!) {
        editAuthor(
            name: $name,
            setBornTo: $setBornTo
        ) {
            name
            born
            bookCount
        }
    }
`
export const ME = gql`
    query {
        me {
            username
            favoriteGenre
        }
    }
`
export const LOGIN = gql`
    mutation login($name: String!, $password: String!) {
        login(
            username: $name
            password: $password
        ) {
            value
        }
    }
`