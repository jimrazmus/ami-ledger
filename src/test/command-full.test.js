"use strict";

const commandFull = require("../command-full.js");

test("expect command remove to throw", () => {
  expect(commandFull.full).toThrow();
});
