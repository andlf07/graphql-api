import query from "./query.js";
import mutations from "./mutations.js";
import { ISBNNumber } from "../lib/ISBN.scalar.js";

//Here we add all the resolvers
export const resolvers = {
  ISBNNumber,
  Query: query,
  Mutation: mutations,
};
