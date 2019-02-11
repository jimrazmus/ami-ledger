"use strict";

const commandRmv = require("../command-remove.js");

test("expect command remove to throw", () => {
  expect(commandRmv.remove).toThrow();
});
