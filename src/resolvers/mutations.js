import { bookResolver } from "./book.resolver.js";
import { auth } from "./login.resolver.js";

export default {
  //needs auth/token to create
  createBook: (parent, args, context) => bookResolver.createBook(args, context),
  //needs auth/token to update
  updateBook: (parent, args, context) => bookResolver.updateBook(args, context),
  login: (root, args) => auth.login(args),
};
