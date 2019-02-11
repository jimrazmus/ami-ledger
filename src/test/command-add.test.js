"use strict";

const commandAdd = require("../command-add.js");

test("expect command add to throw", () => {
  expect(commandAdd.add).toThrow();
});
