import DataLoader from "dataloader";
import { authorModel } from "../models/Author.js";

const batchBooks = async (ids) => {
  const allAuthor = await authorModel.find();
  console.log(ids[0].valueOf());
  const authors = ids.map((authorId) => {
    allAuthor.filter(({ _id }) => console.log(_id.toString() == authorId));
  });
  return authors;
};

export const bookLoader = new DataLoader(batchBooks);
