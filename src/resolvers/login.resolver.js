import { dbManager } from "../db/dbManager.js";
import { jwtToken } from "../lib/jwt.js";
import { authorModel } from "../models/Author.js";

class Auth {
  async login(args) {
    const { firstName, lastName } = args.input;
    try {
      await dbManager.connect();
      const findAuthor = await authorModel.findOne({ firstName, lastName });
      if (!findAuthor) throw new Error("Author not exist");
      const genToken = jwtToken.createToken(findAuthor);
      await dbManager.close();
      console.log(genToken);
      return {
        token: genToken,
        firstName: findAuthor.firstName,
        lastName: findAuthor.lastName,
      };
    } catch (error) {
      console.log(error);
    }
  }
}

export const auth = new Auth();
