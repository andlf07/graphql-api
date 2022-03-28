import mongoose from "mongoose";
const { Schema, model } = mongoose;

const AuthorSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "firstName is required"],
  },
  lastName: {
    type: String,
    required: [true, "lastName is required"],
  },
  country: {
    type: String,
  },
  books: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "Books",
      },
    ],
  },
});

AuthorSchema.methods.toJSON = function () {
  const { __v, _id, ...author } = this.toObject();

  author.id = _id;

  return author;
};

export const authorModel = model("Authors", AuthorSchema);
