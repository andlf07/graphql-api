import { dbManager } from "../db/dbManager.js";
import { bookModel } from "../models/Book.js";

class BookResolver {
  //We will find all books
  async findAll(args) {
    const {
      author,
      publisher,
      order = "asc",
      min = 0,
      max = 5,
      ...rest
    } = args;

    try {
      await dbManager.connect();
      // If author or publisher was recieve filter the data from the model
      if (author || publisher) {
        const filterBook = await bookModel
          .find()
          .populate(["author", "publisher"])
          .sort({ title: order, publicationYea: order });
        const filter = filterBook.filter((book) => {
          console.log(filter);
          let authorBook = book.author[0].firstName.includes(author);
          let publisherBook = book.publisher[0].name.includes(publisher);
          return authorBook || publisherBook;
        });
        return filter;
      }
      const books = await bookModel
        .find(rest)
        .populate(["author", "publisher"])
        .skip(min)
        .limit(max)
        .sort({ title: order });
      await dbManager.close();
      return books;
    } catch (error) {
      console.log(error);
      throw new Error("Error getting all books");
    }
  }
  //find just one book
  async findOne({ id }) {
    try {
      await dbManager.connect();
      const oneBook = await bookModel
        .findById({ _id: id })
        .populate(["author", "publisher"]);
      await dbManager.close();
      return oneBook;
    } catch (error) {
      console.log(error);
      throw new Error("Error get one book");
    }
  }
  //create book in the db
  async createBook({ input }, context) {
    //Check if login
    if (!context.user) throw new Error("You must have to login!");
    //prevent null/undefined data
    const {
      title,
      ISBN,
      synopsis = "",
      genres = "",
      publicationYear = 0,
      author = [],
      publisher = {},
    } = input;
    const book = {
      title,
      ISBN,
      synopsis,
      genres,
      publicationYear,
      author,
      publisher,
    };
    try {
      await dbManager.connect();
      const createBook = await bookModel.create(book);
      await dbManager.close();
      return createBook;
    } catch (error) {
      console.log(error);
      throw new Error("Error creating book");
    }
  }
  async updateBook({ input, id }) {
    //Check if login
    if (!context.user) throw new Error("You must have to login!");
    try {
      await dbManager.connect();
      const createBook = await bookModel.findByIdAndUpdate(id, input, {
        new: true,
      });
      await dbManager.close();
      return createBook;
    } catch (error) {
      console.log(error);
      throw new Error("Error creating book");
    }
  }
}

export const bookResolver = new BookResolver();
