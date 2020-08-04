// DUMMY DATA SOURCE
const data = require('./data');

// code to get data from db / other source
// book.id

const booksByAuthor = (args, context, info) => {
  const booksRawData = args ? data.books.filter(i => i.authorId === args) : 'null';
  console.log(args, 'BOO')

  // convert to GQL type format
  const booksToReturn = booksRawData.map(i => ({
    id: i.id,
    name: i.name,
    genre: i.genre,
    authorId: i.authorId,
  }))
  return booksToReturn;

}

const authorDetails = (args, context, info) => {
  const authorsRawData = args ? data.authors.filter(i => i.id === args) : data.authors;
  console.log(args)
  // convert to GQL type format
  const authorsToReturn = authorsRawData.map(i => ({
    id: i.id,
    name: i.name,
    age: i.age
  }))
  return authorsToReturn;
}

const authors = ({ id }, context, info) => {
  const authorsRawData = id ? data.authors.filter(i => i.id === id) : data.authors;
  // convert to GQL type format
  const authorsToReturn = authorsRawData.map(i => ({
    id: i.id,
    name: i.name,
    age: i.age,
    books: booksByAuthor(i.id)
  }))
  return authorsToReturn;
}

const books = ({ id }, context, info) => {
  const booksRawData = id ? data.books.filter(i => i.id === id) : data.books;

  // convert to GQL type format
  const booksToReturn = booksRawData.map(i => ({
    id: i.id,
    name: i.name,
    genre: i.genre,
    authorId: i.authorId,
    author: authorDetails(i.authorId)
  }))
  return booksToReturn;

}





// const instructors = ({ name }, context, info) => {
//   const instructorsRawData = name ? data.instructors.filter(i => i.name === name) : data.instructors;

//   // convert to GQL type format
//   const instructorsToReturn = instructorsRawData.map(i => ({
//     id: i.id,
//     name: i.name,
//     favoriteFood: i.favoriteTypeOfFood,
//     address: {
//       street: i.street,
//       postalCode: i.postalCode
//     }
//   }))
//   return instructorsToReturn;

// }

// const restaurants = ({ name }, context, info) => {
//   const restaurantsRawData = name ? data.restaurants.filter(i => i.name === name) : data.restaurants;

//   // convert to GQL type format
//   const restaurantsToReturn = restaurantsRawData.map(i => ({
//     id: i.id,
//     name: i.name,
//     typeOfFood: i.typeOfFood,
//     postalCode: i.postalCode
//   }))
//   return restaurantsToReturn;
// }

// const restaurantAddresses = ({ postalCode }, context, info) => {
//   const restaurantsRawData = postalCode ? data.restaurants.filter(i => i.postalCode === postalCode) : data.restaurants;

//   // convert to GQL type format
//   const restaurantsToReturn = restaurantsRawData.map(i => ({
//     // id: i.id,
//     name: i.name,
//     // typeOfFood: i.typeOfFood,
//     // postalCode: i.postalCode
//   }))
//   return restaurantsToReturn;
// }


const root = {
  books,
  authors,
};

module.exports = {
  root
}