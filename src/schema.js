"use strict";

const describeImagesSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  additionalProperties: false,
  id: "describeImages",
  minProperties: 1,
  properties: {
    DryRun: { type: "boolean" },
    ExecutableUsers: { items: { type: "string" }, minItems: 1, type: "array" },
    Filters: {
      items: {
        properties: {
          Name: { type: "string" },
          Values: { items: { type: "string" }, minItems: 1, type: "array" }
        },
        required: ["Name", "Values"],
        type: "object"
      },
      minItems: 1,
      type: "array"
    },
    ImageIds: { items: { type: "string" }, minItems: 1, type: "array" },
    Owners: { items: { type: "string" }, minItems: 1, type: "array" }
  },
  type: "object"
};

const describeImageAttributeSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  additionalProperties: false,
  id: "describeImageAttribute",
  properties: {
    Attribute: { type: "string" },
    DryRun: { type: "boolean" },
    ImageId: { type: "string" }
  },
  required: ["Attribute", "ImageId"],
  type: "object"
};

const modifyImageAttributeSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  additionalProperties: false,
  definitions: {
    targetSpec: {
      additionalProperties: false,
      properties: {
        Group: { type: "string" },
        UserId: { type: "string" }
      },
      type: "object"
    }
  },
  id: "modifyImageAttribute",
  minProperties: 2,
  properties: {
    Attribute: { type: "string" },
    Description: { type: "string" },
    DryRun: { type: "boolean" },
    ImageId: { type: "string" },
    LaunchPermission: {
      additionalProperties: false,
      properties: {
        Add: {
          items: { $ref: "#/definitions/targetSpec" },
          minItems: 1,
          type: "array"
        },
        Remove: {
          items: { $ref: "#/definitions/targetSpec" },
          minItems: 1,
          type: "array"
        }
      },
      type: "object"
    },
    OperationType: { type: "string" },
    ProductCodes: { items: { type: "string" }, minItems: 1, type: "array" },
    UserGroups: { items: { type: "string" }, minItems: 1, type: "array" },
    UserIds: { items: { type: "string" }, minItems: 1, type: "array" },
    Value: { type: "string" }
  },
  required: ["ImageId"],
  type: "object"
};

module.exports = {
  describeImagesSchema,
  describeImageAttributeSchema,
  modifyImageAttributeSchema
};
