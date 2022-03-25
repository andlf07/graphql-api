import { ApolloServer } from "apollo-server";
import { grapSchema } from "./readTypes.js";
import { resolvers } from "./lib/resolvers.js";
import { dbManager } from "./db/dbManager.js";

//schema
const typeDefs = grapSchema;

//server
class Server {
  constructor() {
    //Apollo server
    this.server = new ApolloServer({ typeDefs, resolvers });
    //Db connection manager
    this.db = dbManager;
  }
  async start() {
    //start server
    this.server.listen().then(({ url }) => console.log(`Server runing ${url}`));
    //DB connection at start server
    await this.db.connect();
  }
}

export const appServer = new Server();
