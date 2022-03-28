import mongoose from "mongoose";
import { config } from "../../config.js";

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = config;

export class DBManager {
  constructor() {
    this.dbName = DB_NAME;
  }
  async connect() {
    //If we dont have a connection to db, connect
    if (mongoose.connection.readyState == 0) {
      try {
        await mongoose.connect(
          `mongodb+srv://${DB_USER}:${DB_PASSWORD}${DB_HOST}/${this.dbName}?retryWrites=true&w=majority`,
          {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          }
        );
        console.log("DB connection OK");
      } catch (error) {
        console.log(error);
        throw new Error("DB connection ERROR");
      }
    }
  }
  async close() {
    try {
      await mongoose.connection.close().then(() => console.log("DB close"));
    } catch (error) {
      console.log(error);
      throw new Error("Error closing the connection to the DB");
    }
  }
}

export const dbManager = new DBManager();
