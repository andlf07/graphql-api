import { readFileSync } from "fs";
import path from "path";
import { join } from "path";

const __dirname = path.resolve();

export const grapSchema = readFileSync(
  join(`${__dirname}/src`, "graphql", "schema.graphql"),
  "utf-8"
);
