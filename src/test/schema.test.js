"use strict";

const Ajv = require("ajv");
const ajv = Ajv({ allErrors: true });

const schema = require("../schema.js");

test("describeImagesSchema is a valid schema", () => {
  expect(ajv.validateSchema(schema.describeImagesSchema)).toEqual(true);
});

test("describeImagesSchema at least 1 property is required", () => {
  const input = {};
  expect(ajv.validate(schema.describeImagesSchema, input)).toEqual(false);
});

test("describeImagesSchema additional properties are not valid", () => {
  const input = { Sandwich: "Baloney" };
  expect(ajv.validate(schema.describeImagesSchema, input)).toEqual(false);
});

test("describeImagesSchema DryRun true is valid", () => {
  const input = { DryRun: true };
  expect(ajv.validate(schema.describeImagesSchema, input)).toEqual(true);
});

test("describeImagesSchema DryRun string is not valid ", () => {
  const input = { DryRun: "Not Boolean" };
  expect(ajv.validate(schema.describeImagesSchema, input)).toEqual(false);
});

test("describeImagesSchema ExecutableUsers [] is not valid", () => {
  const input = { ExecutableUsers: [] };
  expect(ajv.validate(schema.describeImagesSchema, input)).toEqual(false);
});

test("describeImagesSchema ExecutableUsers self is valid", () => {
  const input = { ExecutableUsers: ["self"] };
  expect(ajv.validate(schema.describeImagesSchema, input)).toEqual(true);
});

test("describeImagesSchema ExecutableUsers self and all is valid", () => {
  const input = { ExecutableUsers: ["self", "all"] };
  expect(ajv.validate(schema.describeImagesSchema, input)).toEqual(true);
});

test("describeImagesSchema Filters: 'Baloney' is not valid", () => {
  const input = { Filters: "Baloney" };
  expect(ajv.validate(schema.describeImagesSchema, input)).toEqual(false);
});

test("describeImagesSchema Filters [] is not valid", () => {
  const input = { Filters: [] };
  expect(ajv.validate(schema.describeImagesSchema, input)).toEqual(false);
});

test("describeImagesSchema Filters [ { Name: 'Sandwich' } ] is not valid", () => {
  const input = { Filters: [{ Name: "Sandwich" }] };
  expect(ajv.validate(schema.describeImagesSchema, input)).toEqual(false);
});

test("describeImagesSchema Filters [ { Values: 'Baloney' } ] is not valid", () => {
  const input = { Filters: [{ Values: "Baloney" }] };
  expect(ajv.validate(schema.describeImagesSchema, input)).toEqual(false);
});

test("describeImagesSchema Filters [ { Values: [ 'Baloney' ] } ] is not valid", () => {
  const input = { Filters: [{ Values: ["Baloney"] }] };
  expect(ajv.validate(schema.describeImagesSchema, input)).toEqual(false);
});

test("describeImagesSchema Filters [ { Name: 'Sandwich', Values: 'Baloney' } ] is not valid", () => {
  const input = { Filters: [{ Name: "Sandwich", Values: "Baloney" }] };
  expect(ajv.validate(schema.describeImagesSchema, input)).toEqual(false);
});

test("describeImagesSchema Filters [ { Name: 'Sandwich', Values: [ ] } ] is not valid", () => {
  const input = { Filters: [{ Name: "Sandwich", Values: [] }] };
  expect(ajv.validate(schema.describeImagesSchema, input)).toEqual(false);
});

test("describeImagesSchema Filters [ { Name: 'Sandwich', Values: [ 'Baloney' ] } ] is valid", () => {
  const input = { Filters: [{ Name: "Sandwich", Values: ["Baloney"] }] };
  expect(ajv.validate(schema.describeImagesSchema, input)).toEqual(true);
});

test("describeImagesSchema Filters [ { Name: 'Sandwich', Values: [ 'Baloney', 'Salami' ] } ] is valid", () => {
  const input = {
    Filters: [{ Name: "Sandwich", Values: ["Baloney", "Salami"] }],
  };
  expect(ajv.validate(schema.describeImagesSchema, input)).toEqual(true);
});

test("describeImagesSchema ImageIds [] is not valid", () => {
  const input = { ImageIds: [] };
  expect(ajv.validate(schema.describeImagesSchema, input)).toEqual(false);
});

test("describeImagesSchema ImageIds 1234 is valid", () => {
  const input = { ImageIds: ["1234"] };
  expect(ajv.validate(schema.describeImagesSchema, input)).toEqual(true);
});

test("describeImagesSchema ImageIds 1234 and 2345 is valid", () => {
  const input = { ImageIds: ["1234", "2345"] };
  expect(ajv.validate(schema.describeImagesSchema, input)).toEqual(true);
});

test("describeImagesSchema Owners [] is not valid", () => {
  const input = { Owners: [] };
  expect(ajv.validate(schema.describeImagesSchema, input)).toEqual(false);
});

test("describeImagesSchema Owners amazon is valid", () => {
  const input = { Owners: ["amazon"] };
  expect(ajv.validate(schema.describeImagesSchema, input)).toEqual(true);
});

test("describeImagesSchema Owners amazon and self is valid", () => {
  const input = { Owners: ["amazon", "self"] };
  expect(ajv.validate(schema.describeImagesSchema, input)).toEqual(true);
});

test("describeImageAttributeSchema is a valid schema", () => {
  expect(ajv.validateSchema(schema.describeImageAttributeSchema)).toEqual(true);
});

test("describeImageAttributeSchema at least 1 property is required", () => {
  const input = {};
  expect(ajv.validate(schema.describeImageAttributeSchema, input)).toEqual(
    false
  );
});

test("describeImageAttributeSchema additional properties are not valid", () => {
  const input = { Sandwich: "Baloney" };
  expect(ajv.validate(schema.describeImageAttributeSchema, input)).toEqual(
    false
  );
});

test("modifyImageAttributeSchema is a valid schema", () => {
  expect(ajv.validateSchema(schema.modifyImageAttributeSchema)).toEqual(true);
});

test("modifyImageAttributeSchema empty object is invalid", () => {
  const input = {};
  expect(ajv.validate(schema.modifyImageAttributeSchema, input)).toEqual(false);
});

test("modifyImageAttributeSchema ImageId and 1 property is valid", () => {
  const input = { ImageId: "123", Description: "Foo" };
  expect(ajv.validate(schema.modifyImageAttributeSchema, input)).toEqual(true);
});

test("modifyImageAttributeSchema single add is valid", () => {
  const input = {
    ImageId: "123",
    LaunchPermission: { Add: [{ UserId: "234" }] },
  };
  expect(ajv.validate(schema.modifyImageAttributeSchema, input)).toEqual(true);
});

test("modifyImageAttributeSchema multiple add is valid", () => {
  const input = {
    ImageId: "123",
    LaunchPermission: { Add: [{ UserId: "234" }, { UserId: "345" }] },
  };
  expect(ajv.validate(schema.modifyImageAttributeSchema, input)).toEqual(true);
});

test("modifyImageAttributeSchema multiple add and remove is valid", () => {
  const input = {
    ImageId: "123",
    LaunchPermission: {
      Add: [{ UserId: "234" }, { UserId: "345" }],
      Remove: [{ UserId: "678" }, { UserId: "789" }],
    },
  };
  expect(ajv.validate(schema.modifyImageAttributeSchema, input)).toEqual(true);
});

test("modifyImageAttributeSchema complex example is valid", () => {
  const input = {
    Description: "Foo",
    DryRun: false,
    ImageId: "123",
    LaunchPermission: {
      Add: [{ UserId: "234" }, { UserId: "345" }],
      Remove: [{ UserId: "678" }, { UserId: "789" }],
    },
  };
  expect(ajv.validate(schema.modifyImageAttributeSchema, input)).toEqual(true);
});
