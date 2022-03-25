import { ApolloServer } from "apollo-server";
import { grapSchema } from "./readTypes.js";
import { resolvers } from "./lib/resolvers.js";

//schema
const typeDefs = grapSchema;

//server
class Server {
  constructor() {
    this.server = new ApolloServer({ typeDefs, resolvers });
  }
  async start() {
    this.server.listen().then(({ url }) => console.log(`Server runing ${url}`));
  }
}

export const appServer = new Server();
