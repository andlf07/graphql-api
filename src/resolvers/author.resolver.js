import { dbManager } from "../db/dbManager.js";
import { authorModel } from "../models/Author.js";

export class AuthorResolver {
  async findAll(context) {
    //Check if login
    if (!context.user) throw new Error("You must have to login!");
    try {
      await dbManager.connect();
      const authors = await authorModel.find().populate("books");
      await dbManager.close();
      return authors;
    } catch (error) {
      console.log(error);
      throw new Error("Error getting all authors");
    }
  }
  async findOne({ id }) {
    try {
      await dbManager.connect();
      const oneAuthor = await authorModel
        .findById({ _id: id })
        .populate("books");
      await dbManager.close();
      return oneAuthor;
    } catch (error) {
      console.log(error);
      throw new Error("Error get one author");
    }
  }
}

export const authorResolver = new AuthorResolver();
