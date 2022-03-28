import { dbManager } from "../db/dbManager.js";
import { publisherSchema } from "../models/Publisher.js";

export class PublisherResolver {
  async findAll() {
    try {
      await dbManager.connect();
      const authors = await publisherSchema.find().populate("books");
      await dbManager.close();
      return authors;
    } catch (error) {
      console.log(error);
      throw new Error("Error getting all publisher");
    }
  }
  async findOne({ id }) {
    try {
      await dbManager.connect();
      const oneAuthor = await publisherSchema
        .findById({ _id: id })
        .populate("books");
      await dbManager.close();
      return oneAuthor;
    } catch (error) {
      console.log(error);
      throw new Error("Error get one publisher");
    }
  }
}

export const publisherResolver = new PublisherResolver();
