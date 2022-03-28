import { ApolloServer } from "apollo-server";
import { grapSchema } from "./readTypes.js";
import { resolvers } from "./resolvers/resolvers.js";
import { dbManager } from "./db/dbManager.js";
import { jwtToken } from "./lib/jwt.js";

//schema
const typeDefs = grapSchema;

//server
class Server {
  constructor() {
    //Apollo server
    this.server = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ req }) => {
        let authToken = null;
        let user = null;
        authToken = req.headers.authorization;
        if (authToken) {
          user = jwtToken.verifyToken(authToken);
        }
        return { authToken, user };
      },
    });
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
