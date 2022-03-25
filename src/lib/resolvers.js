//Here we add all the resolvers

export const resolvers = {
  Query: {
    getAllBooks: () => console.log("Getting all books"),
    getAllAuthors: () => console.log("Getting all author"),
    getAllPublishers: () => console.log("Getting all publisher"),
    getOneBook: (root, args) => console.log("Getting one book"),
    getOneAuthor: (root, args) => console.log("Getting one author"),
    getOnePublisher: (root, args) => console.log("Getting One publisher"),
  },
};
