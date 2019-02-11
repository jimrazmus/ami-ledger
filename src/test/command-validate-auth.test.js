"use strict";

const cva = require("../command-validate-auth.js");

test("confirmCreds succeeds", async () => {
  const result = cva.confirmCreds("error");
  expect(result).not.toBeNull();
});
