import mongoose from "mongoose";
const { Schema, model } = mongoose;

const PublisherSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  foundationYear: {
    type: Date,
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

PublisherSchema.methods.toJSON = function () {
  const { __v, _id, ...publisher } = this.toObject();

  publisher.id = _id;

  return publisher;
};

export const publisherSchema = model("Publishers", PublisherSchema);
