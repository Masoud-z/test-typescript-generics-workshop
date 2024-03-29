import { expect, it } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";

const array = [
  {
    name: "John",
  },
  {
    name: "Steve",
  },
];

type Arr = (typeof array)[number];

type Accumulator = {
  [K in keyof Arr as Arr[K]]: Record<K, Arr[K]>;
};

const obj = array.reduce<Accumulator>((accum, item) => {
  accum[item.name] = item;
  return accum;
}, {});

//Course solution
// const obj = array.reduce<Record<string, { name: string }>>((accum, item) => {
//   accum[item.name] = item;
//   return accum;
// }, {});

it("Should resolve to an object where name is the key", () => {
  expect(obj).toEqual({
    John: {
      name: "John",
    },
    Steve: {
      name: "Steve",
    },
  });

  type tests = [Expect<Equal<typeof obj, Record<string, { name: string }>>>];
});
