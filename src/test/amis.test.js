"use strict";

const amis = require("../amis.js");
const flags = require("../flags.js");

const ALL = flags.ADD | flags.REMOVE;

const awsAcctId = process.env.AWS_ACCT_ID;
const dummyAmiID = process.env.TEST_AMI_ID;
const list1 = [awsAcctId];
const list2 = [awsAcctId, "123456789012", "234567890123"];
const list3 = [awsAcctId, "234567890123", "345678901234"];
const list4 = [awsAcctId, "123456789012", "234567890123", "345678901234"];
const list5 = [];
const list6 = ["0"];

test("fetchAmiIds returns one element array", async () => {
  expect.assertions(1);

  const params = {
    Owners: ["amazon"],
    Filters: [
      {
        Name: "name",
        Values: [
          "aws-elasticbeanstalk-amzn-2015.03.0.x86_64-tomcat8java8-hvm-201507300439",
        ],
      },
    ],
  };

  const ids = await amis.fetchAmiIds(params);
  expect(ids).toEqual(["ami-0d61c466"]);
});

test("fetchAmiIds returns multiple element array", async () => {
  expect.assertions(1);

  const params = {
    Owners: ["amazon"],
    Filters: [
      {
        Name: "name",
        Values: [
          "aws-elasticbeanstalk-amzn-2015.03.0.x86_64-tomcat8java8-hvm-*",
        ],
      },
    ],
  };

  const ids = await amis.fetchAmiIds(params);
  expect(ids).toEqual([
    "ami-0c6f5f64",
    "ami-0d61c466",
    "ami-3332c258",
    "ami-51933f3a",
    "ami-643c220c",
    "ami-68969100",
    "ami-ffa1d79a",
  ]);
});

test("fetchAmiIds returns empty array", async () => {
  expect.assertions(1);

  const params = {
    Owners: ["amazon"],
    Filters: [
      {
        Name: "name",
        Values: ["aws-DOESNOTEXIST"],
      },
    ],
  };

  const ids = await amis.fetchAmiIds(params);
  expect(ids).toEqual([]);
});

test("fetchLaunchPermissions returns true", async () => {
  expect.assertions(1);
  const uids = await amis.fetchLaunchPermissions(dummyAmiID);
  expect(uids).toEqual([awsAcctId]);
});

test("setLaunchPermissions returns true", async () => {
  expect.assertions(1);
  const params = {
    ImageId: dummyAmiID,
    LaunchPermission: {
      Add: [{ UserId: "123456789012" }, { UserId: "234567890123" }],
    },
  };
  const setResult = await amis.setLaunchPermissions(params);
  expect(setResult).toEqual(true);
});

test("buildParams list1 list2", () => {
  expect(amis.buildLaunchPermission(dummyAmiID, list1, list2, ALL)).toEqual({
    ImageId: dummyAmiID,
    LaunchPermission: {
      Add: [{ UserId: "123456789012" }, { UserId: "234567890123" }],
    },
  });
});

test("buildParams list2 list3", () => {
  expect(amis.buildLaunchPermission(dummyAmiID, list2, list3, ALL)).toEqual({
    ImageId: dummyAmiID,
    LaunchPermission: {
      Add: [{ UserId: "345678901234" }],
      Remove: [{ UserId: "123456789012" }],
    },
  });
});

test("buildParams list3 list4", () => {
  expect(amis.buildLaunchPermission(dummyAmiID, list3, list4, ALL)).toEqual({
    ImageId: dummyAmiID,
    LaunchPermission: { Add: [{ UserId: "123456789012" }] },
  });
});

test("buildParams list4 list5", () => {
  expect(amis.buildLaunchPermission(dummyAmiID, list4, list5, ALL)).toEqual({
    ImageId: dummyAmiID,
    LaunchPermission: {
      Remove: [
        { UserId: awsAcctId },
        { UserId: "123456789012" },
        { UserId: "234567890123" },
        { UserId: "345678901234" },
      ],
    },
  });
});

test("buildParams list4 list6", () => {
  expect(amis.buildLaunchPermission(dummyAmiID, list4, list6, ALL)).toEqual({
    ImageId: dummyAmiID,
    LaunchPermission: {
      Add: [{ UserId: "0" }],
      Remove: [
        { UserId: awsAcctId },
        { UserId: "123456789012" },
        { UserId: "234567890123" },
        { UserId: "345678901234" },
      ],
    },
  });
});

test("buildParams list1 list1", () => {
  expect(amis.buildLaunchPermission(dummyAmiID, list1, list1, ALL)).toEqual(
    null
  );
});

test("buildParams list2 list2", () => {
  expect(amis.buildLaunchPermission(dummyAmiID, list2, list2, ALL)).toEqual(
    null
  );
});

test("buildParams list3 list3", () => {
  expect(amis.buildLaunchPermission(dummyAmiID, list3, list3, ALL)).toEqual(
    null
  );
});

test("buildParams list4 list4", () => {
  expect(amis.buildLaunchPermission(dummyAmiID, list4, list4, ALL)).toEqual(
    null
  );
});

test("buildParams list5 list5", () => {
  expect(amis.buildLaunchPermission(dummyAmiID, list5, list5, ALL)).toEqual(
    null
  );
});

test("buildParams list6 list4", () => {
  expect(amis.buildLaunchPermission(dummyAmiID, list6, list4, ALL)).toEqual({
    ImageId: dummyAmiID,
    LaunchPermission: {
      Add: [
        { UserId: awsAcctId },
        { UserId: "123456789012" },
        { UserId: "234567890123" },
        { UserId: "345678901234" },
      ],
      Remove: [{ UserId: "0" }],
    },
  });
});

test("buildParams list5 list4", () => {
  expect(amis.buildLaunchPermission(dummyAmiID, list5, list4, ALL)).toEqual({
    ImageId: dummyAmiID,
    LaunchPermission: {
      Add: [
        { UserId: awsAcctId },
        { UserId: "123456789012" },
        { UserId: "234567890123" },
        { UserId: "345678901234" },
      ],
    },
  });
});

test("buildParams list4 list3", () => {
  expect(amis.buildLaunchPermission(dummyAmiID, list4, list3, ALL)).toEqual({
    ImageId: dummyAmiID,
    LaunchPermission: { Remove: [{ UserId: "123456789012" }] },
  });
});

test("buildParams list3 list2", () => {
  expect(amis.buildLaunchPermission(dummyAmiID, list3, list2, ALL)).toEqual({
    ImageId: dummyAmiID,
    LaunchPermission: {
      Add: [{ UserId: "123456789012" }],
      Remove: [{ UserId: "345678901234" }],
    },
  });
});

test("buildParams list2 list1", () => {
  expect(amis.buildLaunchPermission(dummyAmiID, list2, list1, ALL)).toEqual({
    ImageId: dummyAmiID,
    LaunchPermission: {
      Remove: [{ UserId: "123456789012" }, { UserId: "234567890123" }],
    },
  });
});
