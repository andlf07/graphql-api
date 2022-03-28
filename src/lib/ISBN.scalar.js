import { GraphQLScalarType, Kind } from "graphql";

const MAX_LONG = Number.MAX_SAFE_INTEGER;

const MIN_LONG = Number.MIN_SAFE_INTEGER;

const coerceLong = (value) => {
  var num;
  if (value === "") {
    throw new TypeError(
      "Long cannot represent non 52-bit signed integer value: (empty string)"
    );
  }
  num = Number(value);
  if (num === num && num <= MAX_LONG && num >= MIN_LONG) {
    if (num < 0) {
      return Math.ceil(num);
    } else {
      return Math.floor(num);
    }
  }
  throw new TypeError(
    "Long cannot represent non 52-bit signed integer value: " + String(value)
  );
};

const parseLiteral = (ast) => {
  var num;
  if (ast.kind === Kind.INT) {
    num = parseInt(ast.value, 10);
    if (num <= MAX_LONG && num >= MIN_LONG) {
      return num;
    }
    return null;
  }
};

export const ISBNNumber = new GraphQLScalarType({
  name: "NumberISBN",
  description: "Number custom scalar type",
  serialize: coerceLong,
  parseValue: coerceLong,
  parseLiteral,
});
