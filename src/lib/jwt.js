import jwt from "jsonwebtoken";
import { config } from "../../config.js";

class JwtToken {
  //create token with the info provide
  createToken(user) {
    const payload = {
      sub: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      expiresIn: "7d",
    };
    return jwt.sign(payload, config.JWT_SECRET);
  }
  //decode token
  verifyToken(token) {
    const payload = jwt.verify(token, config.JWT_SECRET);
    return payload.sub;
  }
}

export const jwtToken = new JwtToken();
