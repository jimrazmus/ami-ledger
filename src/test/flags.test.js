"use strict";

const flags = require("../flags.js");

const ALL = flags.ADD | flags.REMOVE;

test("Add flag is on", () => {
  var flag = 0 | flags.ADD;
  expect(flags.isAddSet(flag)).toBe(true);
});

test("Add flag is off", () => {
  var flag = 0;
  expect(flags.isAddSet(flag)).toBe(false);
});

test("Remove flag is on", () => {
  var flag = 0 | flags.REMOVE;
  expect(flags.isRemoveSet(flag)).toBe(true);
});

test("Remove flag is off", () => {
  var flag = 0;
  expect(flags.isRemoveSet(flag)).toBe(false);
});

test("All flags are on", () => {
  var flag = 0 | flags.ADD | flags.REMOVE;
  expect(flags.isAllSet(flag)).toBe(true);
});

test("All flags are not on", () => {
  var flag = 0;
  expect(flags.isAllSet(flag)).toBe(false);
});
