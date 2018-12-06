"use strict";

const amis = require("../amis.js");

const awsAcctId = process.env.AWS_ACCT_ID;
const dummyAmiID = process.env.DUMMY_AMI_ID;
const list1 = [awsAcctId];
const list2 = [awsAcctId,"123456789012","234567890123"];
const list3 = [awsAcctId,"234567890123","345678901234"];
const list4 = [awsAcctId,"123456789012","234567890123","345678901234"];
const list5 = [];
const list6 = ["0"]

test("fetchAmiIds returns one element array", async () => {
  expect.assertions(1);

  const params = {
    Owners: ["amazon"],
    Filters: [
      {
        Name: "name",
        Values: [
          "aws-elasticbeanstalk-amzn-2015.03.0.x86_64-tomcat8java8-hvm-201507300439"
        ]
      }
    ]
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
          "aws-elasticbeanstalk-amzn-2015.03.0.x86_64-tomcat8java8-hvm-*"
        ]
      }
    ]
  };

  const ids = await amis.fetchAmiIds(params);
  expect(ids).toEqual([
    "ami-0c6f5f64",
    "ami-0d61c466",
    "ami-3332c258",
    "ami-51933f3a",
    "ami-643c220c",
    "ami-68969100",
    "ami-ffa1d79a"
  ]);
});

test("fetchAmiIds returns empty array", async () => {
  expect.assertions(1);

  const params = {
    Owners: ["amazon"],
    Filters: [
      {
        Name: "name",
        Values: ["aws-DOESNOTEXIST"]
      }
    ]
  };

  const ids = await amis.fetchAmiIds(params);
  expect(ids).toEqual([]);
});

test("fetchLaunchPermissions returns true", async () => {
  expect.assertions(1);
  const uids = await amis.fetchLaunchPermissions(dummyAmiID);
  expect(uids).toEqual([awsAcctId]);
});

test("setLaunchPermissions returns empty array", () => {
  expect(amis.setLaunchPermissions("", "")).toEqual(true);
});


test("buildParams list1 list2", () => {
  expect(amis.buildLauchPermission(dummyAmiID,list1,list2)).toEqual({"ImageId": dummyAmiID, "LaunchPermission": {"Add": ["123456789012", "234567890123"]}});
});

test("buildParams list2 list3", () => {
  expect(amis.buildLauchPermission(dummyAmiID,list2,list3)).toEqual({"ImageId": dummyAmiID, "LaunchPermission": {"Add": ["345678901234"], "Remove": ["123456789012"]}});
});

test("buildParams list3 list4", () => {
  expect(amis.buildLauchPermission(dummyAmiID,list3,list4)).toEqual({"ImageId": dummyAmiID, "LaunchPermission": {"Add": ["123456789012"]}});
});

test("buildParams list4 list5", () => {
  expect(amis.buildLauchPermission(dummyAmiID,list4,list5)).toEqual({"ImageId": dummyAmiID, "LaunchPermission": {"Remove": [awsAcctId, "123456789012", "234567890123", "345678901234"]}});
});

test("buildParams list4 list6", () => {
  expect(amis.buildLauchPermission(dummyAmiID,list4,list6)).toEqual({"ImageId": dummyAmiID, "LaunchPermission": {"Add": ["0"], "Remove": [awsAcctId, "123456789012", "234567890123", "345678901234"]}});
});


test("buildParams list1 list1", () => {
  expect(amis.buildLauchPermission(dummyAmiID,list1,list1)).toEqual(null);
});

test("buildParams list2 list2", () => {
  expect(amis.buildLauchPermission(dummyAmiID,list2,list2)).toEqual(null);
});

test("buildParams list3 list3", () => {
  expect(amis.buildLauchPermission(dummyAmiID,list3,list3)).toEqual(null);
});

test("buildParams list4 list4", () => {
  expect(amis.buildLauchPermission(dummyAmiID,list4,list4)).toEqual(null);
});

test("buildParams list5 list5", () => {
  expect(amis.buildLauchPermission(dummyAmiID,list5,list5)).toEqual(null);
});


test("buildParams list6 list4", () => {
  expect(amis.buildLauchPermission(dummyAmiID,list6,list4)).toEqual({"ImageId": dummyAmiID, "LaunchPermission": {"Add": [awsAcctId, "123456789012", "234567890123", "345678901234"], "Remove": ["0"]}});
});

test("buildParams list5 list4", () => {
  expect(amis.buildLauchPermission(dummyAmiID,list5,list4)).toEqual({"ImageId": dummyAmiID, "LaunchPermission": {"Add": [awsAcctId, "123456789012", "234567890123", "345678901234"]}});
});

test("buildParams list4 list3", () => {
  expect(amis.buildLauchPermission(dummyAmiID,list4,list3)).toEqual({"ImageId": dummyAmiID, "LaunchPermission": {"Remove": ["123456789012"]}});
});

test("buildParams list3 list2", () => {
  expect(amis.buildLauchPermission(dummyAmiID,list3,list2)).toEqual({"ImageId": dummyAmiID, "LaunchPermission": {"Add": ["123456789012"], "Remove": ["345678901234"]}});
});

test("buildParams list2 list1", () => {
  expect(amis.buildLauchPermission(dummyAmiID,list2,list1)).toEqual({"ImageId": dummyAmiID, "LaunchPermission": {"Remove": ["123456789012", "234567890123"]}});
});

