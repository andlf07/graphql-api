import { Schema, model } from "mongoose";

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
        ref: "Book",
      },
    ],
  },
});

PublisherSchema.methods.toJSON = function () {
  const { __v, _id, ...publisher } = this.toObject();

  publisher.id = _id;

  return publisher;
};

export const publisherSchema = model("Publisher", PublisherSchema);
