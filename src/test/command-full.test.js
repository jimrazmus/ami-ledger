"use strict";

const commandFull = require("../command-full.js");

test("expect command full to throw", () => {
  expect(commandFull.full).toThrow();
});
