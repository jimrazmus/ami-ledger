"use strict";

const sts = require("../cmd-validate-auth.js");

test("confirmCreds succeeds", async () => {
  const result = sts.confirmCreds("error");
  expect(result).not.toBeNull();
});
