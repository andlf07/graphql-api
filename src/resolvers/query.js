import { authorResolver } from "./author.resolver.js";
import { bookResolver } from "./book.resolver.js";
import { publisherResolver } from "./publisher.resolver.js";

export default {
  books: (root, args) => bookResolver.findAll(args),
  authors: (parent, args, context) => authorResolver.findAll(context),
  publishers: publisherResolver.findAll,
  oneBook: (root, args) => bookResolver.findOne(args),
  oneAuthor: (root, args) => authorResolver.findOne(args),
  onePublisher: (root, args) => publisherResolver.findOne(args),
};

// bookResolver.findAll(args, context)
