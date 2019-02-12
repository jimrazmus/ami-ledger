"use strict";

const flags = require("../flags.js");

test("Add flag is on with just ADD", () => {
  var flag = flags.ADD;
  expect(flags.isAddSet(flag)).toBe(true);
});

test("Add flag is on when with both ADD and REMOVE", () => {
  var flag = flags.ADD | flags.REMOVE;
  expect(flags.isAddSet(flag)).toBe(true);
});

test("Add flag is off", () => {
  var flag = 0;
  expect(flags.isAddSet(flag)).toBe(false);
});

test("Add flag is off though REMOVE is on", () => {
  var flag = flags.REMOVE;
  expect(flags.isAddSet(flag)).toBe(false);
});

test("Remove flag is on with just REMOVE", () => {
  var flag = flags.REMOVE;
  expect(flags.isRemoveSet(flag)).toBe(true);
});

test("Remove flag is on when with both ADD and REMOVE", () => {
  var flag = flags.ADD | flags.REMOVE;
  expect(flags.isRemoveSet(flag)).toBe(true);
});

test("Remove flag is off", () => {
  var flag = 0;
  expect(flags.isRemoveSet(flag)).toBe(false);
});

test("Remove flag is off though ADD is on", () => {
  var flag = flags.ADD;
  expect(flags.isRemoveSet(flag)).toBe(false);
});

test("All flags are on", () => {
  var flag = flags.ADD | flags.REMOVE;
  expect(flags.isAllSet(flag)).toBe(true);
});

test("All flags are not on", () => {
  var flag = 0;
  expect(flags.isAllSet(flag)).toBe(false);
});

test("All flags are not on with just ADD", () => {
  var flag = flags.ADD;
  expect(flags.isAllSet(flag)).toBe(false);
});

test("All flags are not on with just REMOVE", () => {
  var flag = flags.REMOVE;
  expect(flags.isAllSet(flag)).toBe(false);
});
