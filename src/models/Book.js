import mongoose from "mongoose";
const { Schema, model } = mongoose;

const BookSchema = new Schema({
  title: {
    type: String,
    required: [true, "title is required"],
  },
  ISBN: {
    type: Number,
    required: [true, "ISBN is required"],
  },
  synopsis: {
    type: String,
  },
  genres: {
    type: String,
  },
  publicationYear: {
    type: Date,
  },
  author: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "Authors",
      },
    ],
  },
  publisher: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "Publishers",
      },
    ],
  },
});

BookSchema.methods.toJSON = function () {
  const { __v, _id, ...book } = this.toObject();

  book.id = _id;

  return book;
};

export const bookModel = model("Books", BookSchema);
